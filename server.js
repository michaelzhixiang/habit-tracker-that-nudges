/**
 * Optional backend for personalized AI suggestions.
 * Run with: ANTHROPIC_API_KEY=your_key node server.js
 * Then open http://localhost:3001
 * Without this server, "完成不了" will show a fallback message.
 */

const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.ANTHROPIC_API_KEY;

app.use(express.json());
app.use(express.static(__dirname));

async function callClaude(systemPrompt, userPrompt, maxTokens = 150) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  });
  if (!response.ok) throw new Error('API error');
  const data = await response.json();
  return data.content && data.content[0] && data.content[0].text ? data.content[0].text.trim() : '';
}

app.post('/api/emoji', async (req, res) => {
  if (!API_KEY) return res.status(503).json({ error: 'ANTHROPIC_API_KEY not set' });
  const { names = [], nudge = false } = req.body || {};
  if (!Array.isArray(names) || (names.length === 0 && !nudge)) {
    return res.status(400).json({ error: 'names array required (or nudge: true)' });
  }
  const lang = (req.body && req.body.lang) || 'en';
  const isZh = String(lang).toLowerCase().startsWith('zh');
  const systemPrompt = isZh
    ? '你只输出 emoji，不要任何解释。针对每个习惯名称，输出一个最贴切、最能代表该习惯的单一 emoji（例如跑步→🏃，读书→📚，冥想→🧘）。每个 emoji 单独一行。如果还需要一个「推我一把」按钮的 emoji，最后多一行输出一个适合「提醒/轻推」的 emoji（如👋🤏💡）。只输出 emoji，一行一个。'
    : 'Output only emojis, no explanation. For each habit name, output exactly one emoji that best fits that habit (e.g. running→🏃, reading→📚). One emoji per line. If a nudge-button emoji is needed, output one more line with one emoji for "nudge/remind" (e.g. 👋🤏💡). Only emojis, one per line.';
  const userPrompt = names.length
    ? (isZh ? '习惯名称（每行一个）：\n' + names.join('\n') : 'Habit names (one per line):\n' + names.join('\n'))
    : (isZh ? '只输出「推我一把」按钮用的一个 emoji。' : 'Output only one emoji for a "Nudge me" button.');
  const nudgeSuffix = (nudge && names.length > 0) ? (isZh ? '\n推我一把按钮' : '\nnudge button') : '';
  try {
    const text = await callClaude(systemPrompt, userPrompt + nudgeSuffix, 80);
    const lines = text.split(/\n/).map((s) => s.trim()).filter((s) => s.length > 0);
    const emojis = lines.slice(0, names.length);
    while (emojis.length < names.length) emojis.push('✨');
    const nudgeEmoji = nudge && lines.length > names.length ? lines[names.length] : (nudge ? '👋' : null);
    return res.json({ emojis, nudgeEmoji: nudgeEmoji || '👋' });
  } catch (e) {
    console.error('Emoji error', e);
    const fallback = names.map(() => '✨');
    return res.json({ emojis: fallback, nudgeEmoji: '👋' });
  }
});

app.post('/api/suggest', async (req, res) => {
  if (!API_KEY) return res.status(503).json({ error: 'ANTHROPIC_API_KEY not set' });
  const { habitName, lang } = req.body || {};
  if (!habitName || typeof habitName !== 'string') {
    return res.status(400).json({ error: 'habitName required' });
  }

  const isZh = (lang || 'en').toLowerCase().startsWith('zh');
  const systemPrompt = isZh
    ? '你是一个懂他的朋友，不是心灵鸡汤导师。用户说「推我一把」、今天做不到某个习惯时，用 exactly 两句话回复。第一句：5–10 个字，简短有力，可以带点幽默或调侃（例如「懂了，躺平时刻」「没事，先喘口气」「今天放过自己」这种 tone）。第二句：针对这个习惯的一句话 5 分钟小建议，直接、具体，不要啰嗦。整体像朋友在说话，不要温暖共情、不要励志。不要加引号或前缀。'
    : "You're a friend who gets it, not a life coach. When the user asks for a nudge and can't do a habit today, reply in exactly two short lines. Line 1: 5–10 words, punchy, a bit of humor or tease. Line 2: One concrete 5-minute suggestion for this habit. Direct, no fluff. No quotes or prefix.";

  const userPrompt = isZh
    ? `习惯名称：${habitName}\n第一句：5–10 字，带点调侃/幽默。第二句：一句话 5 分钟小建议。`
    : `Habit: ${habitName}. First line: 5–10 words, a bit teasing/funny. Second line: one 5-min suggestion.`;

  try {
    const text = await callClaude(systemPrompt, userPrompt);
    return res.json({ suggestion: text || (isZh ? '今天先做最小一步即可。' : 'Just do the smallest step today.') });
  } catch (e) {
    console.error('Suggest error', e);
    return res.status(500).json({ error: 'Request failed' });
  }
});

// 所有其他请求返回 index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log('Habit tracker server at http://localhost:' + PORT);
  if (!API_KEY) console.log('Set ANTHROPIC_API_KEY for AI suggestions.');
});