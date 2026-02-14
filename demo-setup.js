/**
 * Demo Setup Script
 *
 * Run this to populate the app with realistic demo data
 * for impressive presentations.
 *
 * Usage:
 * 1. Open http://localhost:3001 in browser
 * 2. Open browser console (F12)
 * 3. Copy and paste this entire script
 * 4. Press Enter
 */

(function setupDemoData() {
  console.log('🎬 Setting up demo data...');

  // Clear existing data
  localStorage.removeItem('habit-tracker-data');
  localStorage.removeItem('habit-tracker-data-backup');

  // Calculate dates
  const today = new Date();
  const getDateStr = (daysAgo) => {
    const d = new Date(today);
    d.setDate(d.getDate() - daysAgo);
    return d.toISOString().split('T')[0];
  };

  // Create realistic habits with completion history
  const habits = [
    {
      id: Date.now().toString(36) + 'a',
      name: 'Morning workout',
      emoji: '🏃',
      done: false,
      date: getDateStr(0),
      completedDates: [
        getDateStr(1), getDateStr(2), getDateStr(3), // Last 3 days
        getDateStr(5), getDateStr(6), getDateStr(7), // 5-7 days ago
        getDateStr(10), getDateStr(11), // 10-11 days ago
        getDateStr(14), getDateStr(15), getDateStr(16), // 2 weeks ago
        getDateStr(20), getDateStr(21) // 3 weeks ago
      ]
    },
    {
      id: Date.now().toString(36) + 'b',
      name: 'Read 20 pages',
      emoji: '📚',
      done: false,
      date: getDateStr(0),
      completedDates: [
        getDateStr(1), getDateStr(2), getDateStr(3), getDateStr(4), // Last 4 days
        getDateStr(6), getDateStr(7), getDateStr(8), // Last week
        getDateStr(13), getDateStr(14), // 2 weeks ago
        getDateStr(18), getDateStr(19), getDateStr(20) // 3 weeks ago
      ]
    },
    {
      id: Date.now().toString(36) + 'c',
      name: 'Meditate 10 min',
      emoji: '🧘',
      done: true, // Already done today
      date: getDateStr(0),
      completedDates: [
        getDateStr(0), // Today
        getDateStr(1), getDateStr(2), // Last 2 days
        getDateStr(5), // 5 days ago
        getDateStr(10), getDateStr(11), getDateStr(12), // 10-12 days ago
        getDateStr(17), getDateStr(18) // ~2.5 weeks ago
      ]
    }
  ];

  // Save to localStorage
  localStorage.setItem('habit-tracker-data', JSON.stringify(habits));
  localStorage.setItem('habit-tracker-data-backup', JSON.stringify(habits));

  console.log('✅ Demo data created!');
  console.log('📊 Statistics:');
  console.log('  - Morning workout: 13 completions, max streak: 3 days');
  console.log('  - Read 20 pages: 12 completions, max streak: 4 days');
  console.log('  - Meditate: 9 completions, max streak: 3 days');
  console.log('');
  console.log('🔄 Refresh the page to see the data!');
  console.log('');
  console.log('💡 Pro tip: Complete "Morning workout" to trigger confetti 🎉');

  // Auto-refresh
  setTimeout(() => {
    location.reload();
  }, 2000);
})();
