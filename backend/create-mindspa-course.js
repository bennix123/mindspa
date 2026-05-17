// One-shot script: create the "Mind Spa Wellness Workshops" course with 11 video lessons.
// Run with: node create-mindspa-course.js

const API = 'http://localhost:4000/api';
const ADMIN_EMAIL = 'admin@mindspa.in';
const ADMIN_PASSWORD = 'admin123';

const COURSE = {
  id: 'mindspa-wellness-workshops',
  title: 'Mind Spa Wellness Workshops — Happiness, Self-Talk & Meditation',
  icon: '🌿',
  category: 'wellness',
  instructorId: 'manju-agrawal',
  duration: '11 Sessions',
  level: 'Beginner',
  price: 0,
  image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=600',
  description:
    'A curated collection of MindSpa workshop sessions covering the science of happiness, self-talk, mental health, pranayama, meditation, and chakra activation. Featuring Prof (Dr) Manju Agrawal and other MindSpa wellness practitioners.',
  whatYouLearn: [
    'The science of happiness and how to cultivate it',
    'Decoding self-talk and reshaping inner dialogue',
    'Practical techniques to reduce stress and improve mental health',
    'Pranayama and emotional intelligence',
    'Guided meditations: earth, breathing, and chakra activation',
    'Releasing pain and emotional hurt',
  ],
};

const LESSONS = [
  { id: 'mw-1',  title: 'Unveiling the Science of Happiness — Ft Dr Manju Agrawal', vid: 'BllgRA6hOfk' },
  { id: 'mw-2',  title: 'Psychology of Self-Talk (with Shri Rahul Dutt)',           vid: 'BJn-5LLckvc' },
  { id: 'mw-3',  title: 'Psychology of Self-Talk — Decoding the Science',           vid: 'KpTwv2wGfwk' },
  { id: 'mw-4',  title: 'How to Improve Mental Health & Reduce Stress',             vid: 'd4ic_gnB9qU' },
  { id: 'mw-5',  title: 'Pranayam is Emotional Intelligence',                       vid: 'A7plLVbJEmE' },
  { id: 'mw-6',  title: 'Achieving Happiness in Life — by Alok Ranjan',             vid: 'Qb9cimJ2bLQ' },
  { id: 'mw-7',  title: 'Workshop Session — Mind Spa',                              vid: 'cn52Y-5XDzA' },
  { id: 'mw-8',  title: 'Releasing Pain & Hurt',                                    vid: '-dRapeeFGFs' },
  { id: 'mw-9',  title: 'Healthy Breathing and Earth Meditation',                   vid: '9wMP-BjSZ20' },
  { id: 'mw-10', title: 'Workshop: Hello to Happiness!',                            vid: 'qdCNwEzI-jU' },
  { id: 'mw-11', title: 'Solar Chakra Activation & Meditation',                     vid: 'nlVV58g6EUM' },
];

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
  console.log('1. Logging in...');
  const { token } = await call('/auth/login', { method: 'POST', body: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD } });
  console.log('   ✓ Got admin token');

  console.log(`2. Creating course "${COURSE.id}"...`);
  await call('/courses', {
    method: 'POST',
    token,
    body: { ...COURSE, lessons_count: LESSONS.length },
  });
  console.log('   ✓ Course created');

  console.log('3. Creating module "Workshops & Sessions"...');
  const { id: moduleId } = await call(`/courses/${COURSE.id}/modules`, {
    method: 'POST',
    token,
    body: { title: 'Workshops & Sessions' },
  });
  console.log(`   ✓ Module id = ${moduleId}`);

  console.log('4. Creating 11 lessons...');
  for (const l of LESSONS) {
    await call(`/modules/${moduleId}/lessons`, {
      method: 'POST',
      token,
      body: {
        id: l.id,
        title: l.title,
        type: 'video',
        duration: '',
        videoUrl: `https://www.youtube.com/embed/${l.vid}`,
        content: '',
      },
    });
    console.log(`   ✓ ${l.id} — ${l.title}`);
  }

  console.log('5. Updating course lessons_count...');
  await call(`/courses/${COURSE.id}`, {
    method: 'PUT',
    token,
    body: { ...COURSE, lessons_count: LESSONS.length },
  });
  console.log('   ✓ Done');

  console.log('\n✓ All done. Course ID: ' + COURSE.id);
})().catch((err) => {
  console.error('\n✗ Failed:', err.message);
  process.exit(1);
});
