# 习惯追踪 Habit Tracker (PWA)

轻量习惯追踪 PWA：最多 3 个习惯、编辑/删除、连续天数与月度日历、可选的 AI 个性化建议。

## 快速使用

**仅前端（无 AI 建议）：**
```bash
npx serve .
# 打开 http://localhost:3000
```

**带 AI 建议（需 Anthropic API Key）：**
```bash
npm install
ANTHROPIC_API_KEY=your_key node server.js
# 打开 http://localhost:3001
```

点击「完成不了」时，会调用 Anthropic API 根据习惯名称生成一条 5 分钟内可执行的最小行动建议。未配置 API 时会显示提示信息。

## 功能

- 最多 3 个习惯，支持编辑名称、删除
- 每日勾选完成，连续天数（streak）与当月日历视图（绿色块）
- 完成不了 → 个性化 AI 建议（需运行 `server.js` 并设置 `ANTHROPIC_API_KEY`）
- 中英文切换、localStorage 持久化、响应式、可添加到主屏幕与离线使用
