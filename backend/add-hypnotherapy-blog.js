// Add the Hypnotherapy blog post via admin API.
const API = 'http://localhost:4000/api';
const ADMIN = { email: 'admin@mindspa.in', password: 'admin123' };

const blog = {
  title: 'Hypnotherapy: Awakening the Healing Intelligence Within You',
  excerpt:
    'Hypnotherapy is not magic — it is a customised, personalised form of meditation that gently guides you into the subconscious mind, where your emotions, habits, and the keys to healing already reside.',
  category: 'Hypnotherapy',
  image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800',
  author: 'MindSpa Team',
  content: `Have you ever noticed that sometimes even when you understand your problems logically, you still feel stuck? You know what is right, yet something inside resists change. That "something" lies deeper than the conscious mind. This is where the powerful work of hypnotherapy begins.

Hypnotherapy is neither magic, nor something mysterious. It is a customised and personalised form of meditation — a guided process that gently takes you into the deeper layers of your mind, known as the subconscious and the unconscious. These are the layers where your emotions, habits, beliefs, fears, as well as your body responses are stored. The interesting thing is, not only your problems but also their solutions lie in these layers.

Think of the mind as an iceberg. The conscious mind is just the tip of the iceberg — the part we are aware of. But the larger part, hidden beneath the surface, controls your reactions, decisions, and even your health. Hypnotherapy provides access to this deeper part, safely and effectively.

## Your Body's Built-in Intelligence

What's fascinating to know is the fact that your body is designed to heal itself. Nature has made the human system incredibly intelligent. Your body produces all the necessary chemicals, hormones, and neurotransmitters that regulate mood, immunity, healing, and overall well-being.

But here's the interesting part — your thoughts and emotions directly influence your body chemistry. Continuous stress, fear, anger, or negative thinking disturb this delicate balance. Over time, this disturbance may show up as anxiety, sleep issues, lifestyle disorders, or even physical illnesses.

This is where the power of hypnotherapy lies. Through personalised guided relaxation and focused suggestions, it helps to shift your thoughts and emotional patterns. And when thoughts change, body chemistry begins to restore itself naturally.

## How It Works in Real Life

For example, a person suffering from chronic anxiety — despite knowing "there is nothing to worry about" — still experiences the physical reactions like palpitations, tension, and restlessness. Through hypnotherapy, when the subconscious mind is guided to feel safe and calm, the body starts reducing stress hormones like cortisol and begins releasing calming chemicals. The outcome is that the person doesn't just think calm, they feel calm.

Another example is of a woman dealing with psoriasis, who noticed her flare-ups increased during emotional stress. With hypnotherapy, she worked on releasing suppressed emotions and building inner relaxation. Gradually, along with her medical care, her symptoms reduced significantly. Her body responded as her inner state changed.

## A Complement to Medical Science

This is not about rejecting medical science. Doctors and psychiatrists often prescribe medicines that help regulate hormones and neurotransmitters. These medicines can be essential and lifesaving. However, what hypnotherapy offers is a complementary inner pathway — helping the body activate its own healing mechanisms.

Modern science supports the idea of neuroplasticity — the brain's ability to change and rewire itself. Hypnotherapy facilitates this process by creating new patterns of thinking, feeling, and responding. Over time, these new patterns become natural, improving both mental and physical health.

## Where Hypnotherapy Helps

Hypnotherapy is not limited to stress relief. It also supports:

- Personal growth and peak performance
- Emotional healing and release of suppressed feelings
- Lifestyle disorders
- Pain management
- Improving habits and behaviours
- Enhancing overall well-being

It is also a valuable tool for counsellors, psychologists, coaches, and doctors, as it allows them to go beyond the symptoms and work at the root level of issues. At the same time, it is equally powerful for anyone seeking self-growth, inner peace, and a healthier life.

## A Profound Truth

In essence, hypnotherapy reminds us of a profound truth:

**The mind and body are not separate; they are deeply connected.**

When you learn to access your inner world and gently guide it, you are not just changing thoughts — you are transforming your entire being.

And perhaps, the most beautiful part is… the healing you are searching for outside may already exist within you.`,
};

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

  console.log('2. Posting blog...');
  await call('/blogs', { method: 'POST', token, body: blog });

  console.log('3. Verifying...');
  const all = await call('/blogs');
  const found = all.find((b) => b.title === blog.title);
  if (found) console.log(`   ✓ Created: id=${found.id}`);
  else console.log('   ✗ Not found in list');

  console.log(`\n✓ Done. Total blogs: ${all.length}`);
})().catch((e) => {
  console.error('\n✗', e.message);
  process.exit(1);
});
