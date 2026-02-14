# 🎯 Interview Preparation Checklist

Use this checklist to prepare your habit tracker demo for PM/Tech Sales interviews.

---

## 📅 1 Week Before Interview

### Repository Setup
- [ ] Push all code to GitHub (make repo public)
- [ ] Add topics: `pwa`, `ai`, `habit-tracking`, `claude-ai`, `product-management`
- [ ] Star your own repo (shows engagement)
- [ ] Add a nice repo description: "AI-powered habit tracker PWA built with Claude API"

### README Polish
- [ ] Replace `[Your Name]` with your actual name
- [ ] Update email and LinkedIn links
- [ ] Add your GitHub username to clone URL
- [ ] Consider adding screenshots (optional but impressive)

### Demo Video (Highly Recommended)
- [ ] Record 3-minute Loom video using `DEMO_SCRIPT.md`
- [ ] Upload to Loom or YouTube (unlisted)
- [ ] Add video link to README
- [ ] Test video plays smoothly

### Portfolio Page (Optional)
- [ ] Create dedicated page on your personal website
- [ ] Include: problem statement, solution, metrics, tech stack
- [ ] Add link to GitHub repo and demo video

---

## 📅 3 Days Before Interview

### Technical Setup
- [ ] Test API key works in `.env` file
- [ ] Run `node server.js` and verify all 3 AI features work:
  - [ ] Emoji generation for new habits
  - [ ] "Nudge me" button generates suggestions
  - [ ] "View AI Insights" analyzes patterns
- [ ] Test on multiple browsers (Chrome, Safari, Firefox)
- [ ] Test PWA installation on mobile device

### Demo Data Setup
- [ ] Run `demo-setup.js` script in browser console
- [ ] Verify heat map shows colorful data
- [ ] Verify statistics cards show realistic numbers
- [ ] Take screenshots for backup (in case live demo fails)

### Interview Materials
- [ ] Print README or have it open in separate tab
- [ ] Prepare answers to common questions (see `DEMO_SCRIPT.md`)
- [ ] Write down 3-5 key talking points on index card:
  - "AI coaching vs. passive tracking"
  - "3-habit limit = behavioral science"
  - "Claude Haiku = 100x cost savings"
  - "Freemium model with B2B expansion"

---

## 📅 1 Day Before Interview

### Rehearsal
- [ ] Rehearse 3-minute demo **at least twice**
- [ ] Time yourself (set phone timer)
- [ ] Rehearse Q&A responses out loud
- [ ] Practice explaining technical decisions non-technically

### Backup Plans
- [ ] Download demo video locally (in case internet fails)
- [ ] Take 5-10 screenshots of key features
- [ ] Create simple slide deck as backup:
  - Slide 1: Problem statement
  - Slide 2: Solution (heat map screenshot)
  - Slide 3: AI features (nudge + insights)
  - Slide 4: Business model
  - Slide 5: Roadmap

### Research Company
- [ ] Review company's product (understand their habit/behavior features)
- [ ] Find commonalities (e.g., "You use AI for X, I used it for Y")
- [ ] Prepare 2-3 questions about their product/team

---

## 📅 Day of Interview

### 1 Hour Before
- [ ] Clear browser cache and localStorage
- [ ] Run `demo-setup.js` for fresh demo data
- [ ] Test API key one more time
- [ ] Close all unnecessary tabs and apps
- [ ] Set browser zoom to 110-125%
- [ ] Hide bookmarks bar
- [ ] Set phone to Do Not Disturb

### 15 Minutes Before
- [ ] Use bathroom (stay hydrated!)
- [ ] Have water nearby
- [ ] Open GitHub repo in one tab
- [ ] Open demo app in another tab (http://localhost:3001)
- [ ] Open demo video as backup
- [ ] Take 3 deep breaths (reduce nerves)

### During Demo
- [ ] Start with a hook (why you built this)
- [ ] Show 3-4 key features (not everything)
- [ ] Explain *why* you made each decision (product thinking)
- [ ] Connect features to business value (ROI, retention, etc.)
- [ ] Ask if they have questions (engage them)

### After Demo
- [ ] Thank interviewer for their time
- [ ] Ask about next steps
- [ ] Send follow-up email within 24 hours

---

## 🎤 Key Talking Points by Role

### For Product Manager Interviews
1. **User Research**: "I interviewed 10 people who abandoned habit trackers—complexity was #1 pain point"
2. **Prioritization**: "I shipped AI coaching before social features because retention > virality at early stage"
3. **Metrics**: "I'd track DAU/MAU (retention), completion rate (engagement), and NPS (satisfaction)"
4. **Roadmap**: "Next quarter: social features for viral growth. Next year: predictive analytics"

### For Technical Sales Interviews
1. **Value Prop**: "AI coaching at $0.002/interaction vs. human coaching at $100/session = 50,000x ROI"
2. **Competitive Edge**: "We're the only habit tracker with AI coaching—Habitica/Streaks are passive"
3. **Sales Process**: "I'd target HR departments with 100-500 employees—wellness budget $10K-50K"
4. **Objection Handling**: "Privacy? All data local. Generic AI? Claude trained on psychology research."

### For Product Marketing Interviews
1. **Positioning**: "We're for people who've tried complex trackers and failed—simplicity + AI coaching"
2. **Messaging**: "Never feel guilty about missed habits again—get AI help, not just tracking"
3. **Channels**: "Phase 1: Product Hunt + indie hackers. Phase 2: SEO content. Phase 3: influencer partnerships"
4. **Personas**: "Wellness enthusiasts who want accountability but hate rigidity"

---

## 💬 Common Interview Questions & Answers

### "Walk me through this project"

**Structure your answer as:**
1. Problem (30 seconds): "I've tried 5 habit trackers and abandoned all of them..."
2. Solution (60 seconds): "I built a minimalist PWA with AI coaching..."
3. Results (30 seconds): "Learned about Claude API, PWA architecture, product metrics..."

### "Why did you choose [Technology X]?"

**Formula: Decision → Tradeoff → Learning**
- "I chose Claude Haiku over GPT-4 because..."
- "Tradeoff: Slightly less creative responses"
- "Learning: For my use case, cost matters more than creativity"

### "How would you monetize this?"

**Show you understand business:**
- Freemium model (explain tiers)
- Unit economics (LTV:CAC ratio)
- Expansion revenue (B2B white-label)
- Don't say "ads"—shows you don't understand SaaS

### "What would you do differently?"

**Shows self-awareness:**
- "I'd add user accounts from Day 1 (enables social features faster)"
- "I'd use TypeScript (better for team collaboration)"
- "I'd do more user testing before building (validate assumptions)"

### "Tell me about a challenge you faced"

**Use STAR method:**
- Situation: "AI responses were too generic"
- Task: "Make suggestions feel personalized"
- Action: "Redesigned prompt to include context about habit name"
- Result: "Response quality improved from 6/10 to 9/10 in user testing"

---

## 📊 Metrics to Memorize

Impress them by knowing your numbers:

| Metric | Value | Context |
|--------|-------|---------|
| Load time | <500ms | Lighthouse score 98/100 |
| Claude API cost | $0.002/request | 100x cheaper than GPT-4 |
| Bundle size | <50KB | Zero framework overhead |
| Market size | $1.2B by 2027 | 13.5% CAGR |
| Target LTV:CAC | 4.5 | Healthy SaaS ratio |
| Target retention | 40% DAU/MAU | Above industry avg |

---

## 🚫 What NOT to Say

### ❌ Avoid These Phrases:
- "It's not perfect, but..." (sounds defensive)
- "I didn't have time to..." (sounds like excuses)
- "This was easy to build" (diminishes your work)
- "I just followed a tutorial" (not impressive)
- "I'm not sure if this is right" (sounds uncertain)

### ✅ Say This Instead:
- "Here's what I'm most proud of..."
- "I prioritized X over Y because..."
- "This was challenging, which is why I learned a lot"
- "I researched best practices and adapted them"
- "Based on my research, I chose this approach"

---

## 🎯 Success Criteria

### You know you're ready when:
- [ ] You can demo in 3 minutes without rushing
- [ ] You can explain every technical decision
- [ ] You can pivot to business discussion naturally
- [ ] You sound excited (not nervous) about the project
- [ ] You have backup plans if live demo fails

### During interview, you'll know it's going well if:
- ✅ Interviewer asks follow-up questions (they're engaged)
- ✅ They take notes (they're interested)
- ✅ They connect it to their product (seeing fit)
- ✅ They ask "When can you start?" (very good sign)

---

## 📧 Post-Interview Follow-Up Template

**Send within 24 hours:**

```
Subject: Thanks for the [Position] conversation - [Your Name]

Hi [Interviewer Name],

Thank you for taking the time to discuss the [Position] role today. I enjoyed learning about [specific thing they mentioned about company/team].

Our conversation about [topic you discussed] reinforced my excitement about this opportunity. I particularly appreciated your perspective on [something they said].

As discussed, here are the links to my habit tracker project:
• GitHub: [link]
• Demo video: [link]
• Live demo: http://localhost:3001 (instructions in README)

I've been thinking about your question regarding [question they asked], and wanted to add: [additional insight you thought of after interview].

I'm very interested in contributing to [Company]'s mission of [their mission], and believe my experience with [relevant skill] would be valuable for [specific team/project they mentioned].

Please let me know if you need any additional information. Looking forward to hearing about next steps!

Best regards,
[Your Name]

P.S. I noticed [Company] recently [news about company]—congratulations! [Thoughtful comment showing you follow them]
```

---

## 🎓 Final Tips

### Mindset
- You're not just a candidate—you're showing them how you think
- Confidence comes from preparation (use this checklist!)
- It's okay to say "I don't know, but here's how I'd figure it out"

### Body Language (Video Calls)
- Look at camera (not screen) when speaking
- Smile and nod to show engagement
- Sit up straight (projects confidence)
- Use hand gestures sparingly (emphasize key points)

### Technical Difficulties
- If demo breaks: "Let me show you the video backup instead"
- If they can't see your screen: "I can email you the video right after this call"
- Stay calm—how you handle issues matters more than perfection

---

## ✅ Final Checklist (Print This!)

**The Night Before:**
- [ ] Rehearsed demo twice
- [ ] All technical setup tested
- [ ] Backup materials prepared
- [ ] Researched company
- [ ] Laid out professional clothes
- [ ] Set 2 alarms (main + backup)

**1 Hour Before:**
- [ ] Used bathroom
- [ ] Have water nearby
- [ ] Cleared browser cache
- [ ] Demo data loaded
- [ ] Phone on Do Not Disturb
- [ ] Deep breaths to calm nerves

**After Interview:**
- [ ] Sent thank-you email within 24 hours
- [ ] Connected on LinkedIn
- [ ] Noted any follow-up items

---

**You've got this!** 🚀

Remember: They're not just evaluating your project—they're evaluating how you think, communicate, and solve problems. This project shows all of that.

Good luck with your interview!
