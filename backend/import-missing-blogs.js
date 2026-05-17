// Imports the 3 fallback WordPress posts that weren't seeded into MySQL.
// Usage: node import-missing-blogs.js
require('dotenv').config();
const { db, init } = require('./db');

const FALLBACK_IMAGES = [
  'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/6957667/pexels-photo-6957667.jpeg?auto=compress&cs=tinysrgb&w=600',
];

const missing = [
  {
    title: 'Unlocking Unexpected Lessons from My Certification in Hypnotherapy',
    excerpt:
      'The journey to becoming a certified hypnotherapist unveiled lessons that went beyond textbooks and into realms of unexpected wisdom.',
    content:
      "The journey to becoming a certified hypnotherapist unveiled lessons that went beyond textbooks and into realms of unexpected wisdom.\n\n**1. The Power of Listening** — Listening transcends hearing words; it is about tuning into unsaid emotions.\n\n**2. Embracing Patience** — Progress is the gentle unfolding of layers.\n\n**3. Adaptability is Strength** — No session is alike, just as life demands flexibility.\n\n**4. Harnessing Emotional Intelligence** — Tapping into someone else's world needs empathy and insight.\n\n**5. Self-Compassion Matters** — Hypnotherapy taught me to grant myself grace.",
    category: 'Hypnotherapy',
    image: FALLBACK_IMAGES[1],
    author: 'Dr. Priya Sharma',
    published_at: new Date('2024-11-18').getTime(),
  },
  {
    title: 'The Silent Drain: How Youngsters Waste Money',
    excerpt:
      'Many young people don\'t realize how quietly money slips away from their hands — it\'s more psychology than math.',
    content:
      "Money is one of the most powerful resources we have in life. Yet, many young people don't realize how quietly money slips away from their hands.\n\nAs a psychologist, I see money habits as reflections of emotions, peer pressure, and lifestyle choices. The trap of instant gratification means the latest gadgets, trendy clothes, and endless subscriptions feel like small, harmless spends — but they accumulate.\n\nThe real work is emotional: recognizing when a purchase is soothing anxiety vs. filling a real need, learning to sit with discomfort instead of spending past it, and redefining status in a way that doesn't hinge on what you can buy.\n\nEvery big financial success begins with small, conscious steps today.",
    category: 'Personal Growth',
    image: FALLBACK_IMAGES[2],
    author: 'Dr. Priya Sharma',
    published_at: new Date('2024-08-29').getTime(),
  },
  {
    title: 'Time Management: Zindagi ko Balance karne ki Kala',
    excerpt:
      'Everyone has 24 hours — some manage work, family, and hobbies seamlessly. That\'s the art of balance.',
    content:
      "Everyone has only 24 hours in a day, yet some people manage work, family, health and hobbies seamlessly. This is the difference between managing time and chasing it.\n\nTime management is a habit — understanding your priorities and designing your day accordingly. Common mistakes include treating everything as equally urgent, losing focus through multitasking, and procrastinating.\n\n**Practical steps:**\n- Start with three daily priorities, not ten.\n- Use the Pomodoro Technique — 25 minutes of focused work, then a 5-minute break.\n- Batch similar tasks together (emails, calls, deep work).\n- Build a \"shutdown ritual\" at the end of the day so work doesn't bleed into rest.\n\nBalance isn't about doing more — it's about protecting what matters.",
    category: 'Personal Growth',
    image: FALLBACK_IMAGES[3],
    author: 'Dr. Priya Sharma',
    published_at: new Date('2024-08-29').getTime() + 3600000,
  },
];

(async () => {
  await init();

  for (const b of missing) {
    // Skip if title already exists
    const existing = await db.get('SELECT id FROM blogs WHERE title = ?', [b.title]);
    if (existing) {
      console.log('Skipping (exists):', b.title);
      continue;
    }
    const result = await db.run(
      'INSERT INTO blogs (title, excerpt, content, category, image, author, published_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [b.title, b.excerpt, b.content, b.category, b.image, b.author, b.published_at]
    );
    console.log('Inserted id=' + result.lastInsertRowid + ': ' + b.title);
  }

  console.log('\n✓ Done.');
  process.exit(0);
})();
