// One-shot: reassign 3 courses (life-coaching, intro-psychology, hypnotherapy-cert)
// from priya-sharma → manju-agrawal, then delete priya-sharma instructor.

const API = 'http://localhost:4000/api';
const ADMIN = { email: 'admin@mindspa.in', password: 'admin123' };
const COURSES_TO_UPDATE = ['life-coaching', 'intro-psychology', 'hypnotherapy-cert'];
const NEW_INSTRUCTOR = 'manju-agrawal';
const OLD_INSTRUCTOR = 'priya-sharma';

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
  console.log('1. Login as admin...');
  const { token } = await call('/auth/login', { method: 'POST', body: ADMIN });

  for (const id of COURSES_TO_UPDATE) {
    console.log(`2. Fetching ${id}...`);
    const c = await call(`/courses/${id}`);
    console.log(`   currently: instructor_id = ${c.instructor_id}`);

    console.log(`   PUT with instructor_id = ${NEW_INSTRUCTOR}`);
    await call(`/courses/${id}`, {
      method: 'PUT',
      token,
      body: {
        title: c.title,
        icon: c.icon,
        category: c.category,
        instructorId: NEW_INSTRUCTOR,
        duration: c.duration,
        lessons_count: c.lessons_count || c.lessons || 0,
        level: c.level,
        price: c.price,
        image: c.image,
        description: c.description,
        whatYouLearn: c.whatYouLearn || [],
      },
    });
    console.log(`   ✓ ${id} reassigned`);
  }

  console.log(`3. Deleting instructor "${OLD_INSTRUCTOR}"...`);
  await call(`/instructors/${OLD_INSTRUCTOR}`, { method: 'DELETE', token });
  console.log('   ✓ Instructor deleted');

  console.log('\n4. Verifying...');
  const all = await call('/courses');
  for (const c of all) {
    console.log(`   ${c.id} → instructor_id = ${c.instructor_id}`);
  }
  const instructors = await call('/instructors');
  console.log('\n   Remaining instructors:');
  for (const i of instructors) console.log(`   - ${i.id}: ${i.name}`);

  console.log('\n✓ Done');
})().catch((e) => {
  console.error('\n✗', e.message);
  process.exit(1);
});
