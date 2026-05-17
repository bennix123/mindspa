// Add the EFT blog post via admin API.
const API = 'http://localhost:4000/api';
const ADMIN = { email: 'admin@mindspa.in', password: 'admin123' };

const blog = {
  title: 'Emotional Freedom Technique (EFT): Unlocking Emotional Balance with your Fingertips',
  excerpt:
    'A simple yet powerful self-help method that combines psychology and acupressure — gentle tapping on meridian points to release emotional stress, anxiety, and unresolved feelings.',
  category: 'Self-Help',
  image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800',
  author: 'MindSpa Team',
  content: `Emotional Freedom Technique (EFT), also referred to as tapping, is a self-help technique that involves gently tapping on specific points on the body — primarily on the face and upper torso — while focusing on a particular issue or emotion. These tapping points correspond to meridian endpoints used in traditional Chinese medicine, like acupuncture but without needles.

EFT was developed in the 1990s by Gary Craig, a Stanford-trained engineer with a deep interest in personal development and healing practices. Craig studied under psychologist Roger Callahan, who created a precursor method known as Thought Field Therapy (TFT).

## The Basic EFT Tapping Process

**1. Identify the issue.** Choose something specific that is affecting you (e.g., "I feel anxious about my presentation.").

**2. Rate the intensity.** On a scale from 0 to 10, rate how strong the feeling is.

**3. Setup statement.** While tapping the side of your hand (karate chop point), repeat: "Even though I feel [issue], I deeply and completely accept myself."

**4. Tapping sequence.** Tap 6–8 times on each of these points while repeating the setup statement:

- **Karate Chop** — Side of the hand (used for setup statement)
- **Top of the Head** — Centre of the skull
- **Eyebrow** — Beginning of the eyebrow (near the nose)
- **Side of the Eye** — On the bone beside the outer eye
- **Under Eye** — Directly below the eye
- **Under Nose** — Between nose and upper lip
- **Chin** — Between lower lip and chin
- **Collarbone** — Just below the collarbone (either side)
- **Under Arm** — About 4 inches below the armpit

## How It Works

EFT follows the principle of mind-body connection — that emotional stress isn't just in the mind but also reflected in the body's energy flow. At its core, EFT works on the idea that unresolved emotions can disrupt the body's energy system. Tapping on specific meridian points while acknowledging what one feels sends calming signals to the brain. This helps reset the system, easing tension and relieving negative emotional intensity.

Emotional Freedom Technique (EFT) is a simple yet powerful method that combines elements of psychology and acupressure. Whether you're dealing with daily stress or deeper emotional challenges, tapping might be a valuable tool to add to your self-care routine.`,
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
  console.log('1. Login as admin...');
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
