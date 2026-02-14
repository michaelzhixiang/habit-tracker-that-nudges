/**
 * Optional backend for personalized AI suggestions.
 * Run with: ANTHROPIC_API_KEY=your_key node server.js
 * Then open http://localhost:3001
 * Without this server, "完成不了" will show a fallback message.
 */

require('dotenv').config();
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

app.post('/api/insights', async (req, res) => {
  if (!API_KEY) return res.status(503).json({ error: 'ANTHROPIC_API_KEY not set' });
  const { habits, lang } = req.body || {};
  if (!Array.isArray(habits) || habits.length === 0) {
    return res.status(400).json({ error: 'habits array required' });
  }

  const isZh = (lang || 'en').toLowerCase().startsWith('zh');

  // Analyze habit data
  const today = new Date();
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weekdaysZh = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  let analysis = '';
  habits.forEach((habit, idx) => {
    const completedDates = habit.completedDates || [];
    const totalDays = completedDates.length;

    // Analyze day-of-week patterns
    const dayCount = [0, 0, 0, 0, 0, 0, 0];
    completedDates.forEach(dateStr => {
      const d = new Date(dateStr);
      dayCount[d.getDay()]++;
    });

    const bestDay = dayCount.indexOf(Math.max(...dayCount));

    // Calculate streak
    const sortedDates = [...completedDates].sort().reverse();
    let currentStreak = 0;
    const todayStr = today.toISOString().split('T')[0];
    if (sortedDates[0] === todayStr) {
      currentStreak = 1;
      for (let i = 1; i < sortedDates.length; i++) {
        const prev = new Date(sortedDates[i - 1]);
        const curr = new Date(sortedDates[i]);
        prev.setDate(prev.getDate() - 1);
        if (prev.toISOString().split('T')[0] !== curr.toISOString().split('T')[0]) break;
        currentStreak++;
      }
    }

    const habitName = habit.name || `Habit ${idx + 1}`;
    const bestDayName = isZh ? weekdaysZh[bestDay] : weekdays[bestDay];

    if (isZh) {
      analysis += `【${habitName}】完成 ${totalDays} 天，当前连续 ${currentStreak} 天。`;
      if (totalDays > 3) {
        analysis += `${bestDayName}完成率最高（${dayCount[bestDay]}次）。`;
      }
    } else {
      analysis += `【${habitName}】Completed ${totalDays} days, current streak ${currentStreak} days.`;
      if (totalDays > 3) {
        analysis += ` Best on ${bestDayName} (${dayCount[bestDay]} times).`;
      }
    }
    analysis += '\n';
  });

  const systemPrompt = isZh
    ? '你是一个数据分析助手，分析用户的习惯追踪数据，给出简洁、实用的洞察。用 2-4 个要点总结模式和建议。每个要点一句话，直接、具体，不要啰嗦。用友好、鼓励的语气，但不要过度励志。使用 emoji 让建议更生动。'
    : 'You are a data analyst assistant. Analyze user habit tracking data and provide concise, actionable insights. Summarize patterns and suggestions in 2-4 bullet points. Each point: one sentence, direct and specific. Friendly and encouraging tone, but not overly motivational. Use emojis to make suggestions vivid.';

  const userPrompt = isZh
    ? `分析以下习惯数据，给出 2-4 个洞察要点（用 • 开头）：\n\n${analysis}\n\n要点格式：\n• [emoji] [一句话洞察/建议]\n只输出要点，不要前言或总结。`
    : `Analyze the following habit data and provide 2-4 insight bullet points (start with •):\n\n${analysis}\n\nFormat:\n• [emoji] [one-sentence insight/suggestion]\nOutput only bullet points, no intro or conclusion.`;

  try {
    const text = await callClaude(systemPrompt, userPrompt, 300);
    return res.json({ insights: text || (isZh ? '继续保持，你做得很好！' : 'Keep going, you\'re doing great!') });
  } catch (e) {
    console.error('Insights error', e);
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