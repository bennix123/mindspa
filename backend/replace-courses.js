// One-shot: delete all existing courses, create 7 official MindSpa courses
// (free, beginner, manju-agrawal, generic descriptions, 1 empty module each).

const API = 'http://localhost:4000/api';
const ADMIN = { email: 'admin@mindspa.in', password: 'admin123' };
const INSTRUCTOR = 'manju-agrawal';

const NEW_COURSES = [
  {
    id: 'clinical-hypnotherapy-diploma',
    title: 'California Hypnosis Institute–USA Certified Diploma Course in Clinical Hypnotherapy',
    icon: '🎓',
    category: 'hypnotherapy',
    duration: 'Self-paced',
    description: 'A comprehensive diploma-level program in clinical hypnotherapy, certified by the California Hypnosis Institute (USA). Learn the science, theory, and practice of hypnotherapy from foundational concepts through advanced therapeutic techniques.',
    whatYouLearn: [
      'Foundations of clinical hypnotherapy',
      'Induction techniques and trance management',
      'Therapeutic applications across common issues',
      'Ethics, professional practice, and client safety',
    ],
  },
  {
    id: 'psychology-of-self-talk',
    title: 'Psychology of Self-Talk for Health, Happiness and Success',
    icon: '🧠',
    category: 'psychology',
    duration: 'Self-paced',
    description: 'Explore the science of inner dialogue and how the words you speak to yourself shape your health, happiness, and success. Learn practical tools to reshape negative self-talk into supportive, empowering inner conversations.',
    whatYouLearn: [
      'How self-talk influences mood, behavior, and outcomes',
      'Identifying and interrupting negative thought patterns',
      'Building empowering inner dialogue habits',
      'Practical techniques for daily self-coaching',
    ],
  },
  {
    id: 'pranayams-for-emotional-healing',
    title: 'Pranayams for Emotional Healing',
    icon: '🌬️',
    category: 'wellness',
    duration: 'Self-paced',
    description: 'A guided journey through breathwork practices (pranayama) designed to release stored emotions, balance the nervous system, and support deep emotional healing.',
    whatYouLearn: [
      'Foundational pranayama techniques and their effects',
      'Using breath to regulate emotions and release stress',
      'Daily breathwork routines for emotional balance',
      'Pairing breath with mindfulness for healing',
    ],
  },
  {
    id: 'chakra-energy-balancing',
    title: 'Chakra and Energy Balancing',
    icon: '🌀',
    category: 'wellness',
    duration: 'Self-paced',
    description: 'Understand the seven-chakra energy system and learn practical techniques to identify, clear, and balance blocked energy centers for whole-person wellness.',
    whatYouLearn: [
      'The seven chakras and their psychological associations',
      'Recognizing energy blocks and imbalances',
      'Meditation and visualization for chakra clearing',
      'Daily practices to maintain energetic balance',
    ],
  },
  {
    id: 'unlimited-rocking-life',
    title: 'Unlimited Rocking Life',
    icon: '🚀',
    category: 'coaching',
    duration: 'Self-paced',
    description: 'A high-energy life-design program that helps you break self-imposed limits, design empowering goals, and live a vibrant, fulfilling life on your own terms.',
    whatYouLearn: [
      'Identifying and dissolving limiting beliefs',
      'Designing goals aligned with your authentic self',
      'Creating sustainable high-performance habits',
      'Building momentum toward an extraordinary life',
    ],
  },
  {
    id: 'self-hypnosis',
    title: 'Self Hypnosis',
    icon: '🌙',
    category: 'hypnotherapy',
    duration: 'Self-paced',
    description: 'Learn safe, effective self-hypnosis techniques you can use at home to manage stress, build confidence, change habits, and access the power of your subconscious mind.',
    whatYouLearn: [
      'Principles of self-hypnosis and how it works',
      'Inducing your own trance state safely',
      'Designing suggestions for personal change',
      'Daily self-hypnosis routines for transformation',
    ],
  },
  {
    id: 'law-of-attraction',
    title: 'Law of Attraction',
    icon: '✨',
    category: 'coaching',
    duration: 'Self-paced',
    description: 'A practical, grounded course on the Law of Attraction — moving past the hype to genuinely understand how mindset, focus, and aligned action shape the reality you experience.',
    whatYouLearn: [
      'The science and philosophy behind the Law of Attraction',
      'Clarifying intentions and emotional alignment',
      'Daily practices to shift mindset and focus',
      'Inspired action — the missing piece most miss',
    ],
  },
];

const DEFAULT_IMAGE = 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=600';

async function call(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(API + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${data?.error || text}`);
  return data;
}

(async () => {
  console.log('1. Login...');
  const { token } = await call('/auth/login', { method: 'POST', body: ADMIN });

  console.log('2. Fetching existing courses...');
  const existing = await call('/courses');
  console.log(`   Found ${existing.length}: ${existing.map((c) => c.id).join(', ')}`);

  console.log('3. Deleting all existing courses...');
  for (const c of existing) {
    await call(`/courses/${c.id}`, { method: 'DELETE', token });
    console.log(`   ✗ deleted ${c.id}`);
  }

  console.log('4. Creating 7 official MindSpa courses...');
  for (const c of NEW_COURSES) {
    await call('/courses', {
      method: 'POST',
      token,
      body: {
        id: c.id,
        title: c.title,
        icon: c.icon,
        category: c.category,
        instructorId: INSTRUCTOR,
        duration: c.duration,
        lessons_count: 0,
        level: 'Beginner',
        price: 0,
        image: DEFAULT_IMAGE,
        description: c.description,
        whatYouLearn: c.whatYouLearn,
      },
    });
    const { id: moduleId } = await call(`/courses/${c.id}/modules`, {
      method: 'POST',
      token,
      body: { title: 'Course Content' },
    });
    console.log(`   ✓ ${c.id} (module ${moduleId})`);
  }

  console.log('\n5. Verifying...');
  const final = await call('/courses');
  for (const c of final) {
    console.log(`   ${c.id} | ${c.title.slice(0, 50)}... | ${c.instructor_id}`);
  }

  console.log(`\n✓ Done — ${final.length} courses live`);
})().catch((e) => {
  console.error('\n✗', e.message);
  process.exit(1);
});
