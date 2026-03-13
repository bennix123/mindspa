import React, { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEYS = {
  reels: 'mindspa_reels',
  podcasts: 'mindspa_podcasts',
};

const WP_API_URL = 'https://mindspaindia.in/wp-json/wp/v2/posts?per_page=100&_embed';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const FALLBACK_IMAGES = [
  'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/6957667/pexels-photo-6957667.jpeg?auto=compress&cs=tinysrgb&w=600',
];

const detectCategory = (title) => {
  const t = title.toLowerCase();
  if (t.includes('hypnotherapy') || t.includes('hypnosis')) return 'Hypnotherapy';
  if (t.includes('gen z') || t.includes('breakup')) return 'Gen Z Wellness';
  if (t.includes('technology') || t.includes('digital therapy') || t.includes('ai in')) return 'Technology';
  if (t.includes('holistic')) return 'Holistic Health';
  if (t.includes('student')) return 'Student Wellness';
  if (t.includes('time management') || t.includes('money') || t.includes('youngster')) return 'Personal Growth';
  if (t.includes('stress') || t.includes('anxiety') || t.includes('self-help')) return 'Self-Help';
  return 'Mental Health';
};

const decodeHtml = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || '';
};

const transformWPPost = (wpPost, index) => {
  const d = new Date(wpPost.date);

  // Featured image from _embedded data
  let image = '';
  try {
    const media = wpPost._embedded?.['wp:featuredmedia']?.[0];
    image = media?.media_details?.sizes?.medium_large?.source_url
      || media?.media_details?.sizes?.large?.source_url
      || media?.source_url
      || '';
  } catch {}
  if (!image) {
    image = FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
  }

  // Category from _embedded terms
  let category = '';
  try {
    const terms = wpPost._embedded?.['wp:term']?.[0] || [];
    const cat = terms.find((t) => t.name !== 'Uncategorized');
    category = cat?.name || '';
  } catch {}
  if (!category) {
    category = detectCategory(wpPost.title?.rendered || '');
  }

  // Plain text excerpt
  const excerpt = decodeHtml(wpPost.excerpt?.rendered || '');

  return {
    id: String(wpPost.id),
    date: String(d.getDate()).padStart(2, '0'),
    month: MONTHS[d.getMonth()],
    year: String(d.getFullYear()),
    category,
    title: decodeHtml(wpPost.title?.rendered || ''),
    image,
    content: wpPost.content?.rendered || '',
    excerpt,
    isHtml: true,
    externalUrl: wpPost.link || '',
  };
};

// Fallback posts shown when WordPress API is unavailable
const defaultPosts = [
  {
    id: '1', date: '02', month: 'Feb', category: 'Hypnotherapy',
    title: 'What Is Hypnotherapy?',
    image: FALLBACK_IMAGES[0],
    content: 'Hypnotherapy might sound mysterious, like something out of a movie, but in reality it is quite simple and very human. At its core, hypnotherapy is a guided process that helps you relax deeply and focus your mind so you can work on thoughts, habits, or emotions that are hard to change when you are stressed or distracted.\n\nThink about moments when you are so absorbed in a book or scrolling on your phone that you don\'t hear someone calling your name. You are awake, aware, and in control—but deeply focused. Hypnotherapy uses a similar mental state.\n\nPeople use hypnotherapy for many reasons: managing stress, improving sleep, boosting confidence, or breaking unwanted habits. It works because it helps you connect with your subconscious mind in a kinder, quieter way.',
  },
  {
    id: '2', date: '18', month: 'Nov', category: 'Hypnotherapy',
    title: 'Unlocking Unexpected Lessons from My Certification in Hypnotherapy',
    image: FALLBACK_IMAGES[1],
    content: 'The journey to becoming a certified hypnotherapist unveiled lessons that went beyond textbooks and into realms of unexpected wisdom.\n\n1. The Power of Listening — Listening transcends hearing words; it is about tuning into unsaid emotions.\n\n2. Embracing Patience — Progress is the gentle unfolding of layers.\n\n3. Adaptability is Strength — No session is alike, just as life demands flexibility.\n\n4. Harnessing Emotional Intelligence — Tapping into someone else\'s world needs empathy and insight.\n\n5. Self-Compassion Matters — Hypnotherapy taught me to grant myself grace.',
  },
  {
    id: '3', date: '29', month: 'Aug', category: 'Personal Growth',
    title: 'The Silent Drain: How Youngsters Waste Money',
    image: FALLBACK_IMAGES[2],
    content: 'Money is one of the most powerful resources we have in life. Yet, many young people don\'t realize how quietly money slips away from their hands.\n\nAs a psychologist, I see money habits as reflections of emotions, peer pressure, and lifestyle choices. The trap of instant gratification means the latest gadgets, trendy clothes, and endless subscriptions feel like small, harmless spends—but they accumulate.\n\nEvery big financial success begins with small, conscious steps today.',
  },
  {
    id: '4', date: '29', month: 'Aug', category: 'Personal Growth',
    title: 'Time Management: Zindagi ko Balance karne ki Kala',
    image: FALLBACK_IMAGES[3],
    content: 'Everyone has only 24 hours in a day, yet some people manage work, family, health and hobbies seamlessly. This is the difference between managing time and chasing it.\n\nTime management is a habit—understanding your priorities and designing your day accordingly. Common mistakes include treating everything as equally urgent, losing focus through multitasking, and procrastinating.\n\nStart with three daily priorities. Use the Pomodoro Technique—25 minutes of focused work, then a 5-minute break.',
  },
  {
    id: '5', date: '15', month: 'Aug', category: 'Holistic Health',
    title: 'The Rise of Holistic Mental Health – Blending Mind, Body, and Social Well-being',
    image: FALLBACK_IMAGES[4],
    content: 'In recent years, the concept of holistic mental health has been redefining the way we approach well-being. Mental wellness in 2025 is about understanding the interconnected relationship between the mind, body, and social environment.\n\nIn India, where traditional healing practices meet modern mental health science, this approach is gaining massive momentum. Mind Spa India champions this philosophy—empowering individuals to create harmony across every dimension of life.',
  },
  {
    id: '6', date: '15', month: 'Aug', category: 'Self-Help',
    title: 'Stress, Anxiety & Depression – Practical Self-Help Strategies That Work',
    image: FALLBACK_IMAGES[5],
    content: 'India stands at the crossroads of ancient wisdom and modern living. As urbanisation rises and digital life accelerates, stress, anxiety, and depression have become common mental health challenges for millions.\n\nAccording to recent surveys, more than 14% of Indians have experienced some form of mental health issue. This guide empowers you with science-backed, actionable self-help strategies tailored for everyday life.',
  },
];

const defaultReels = [
  { id: '1', title: 'Stress Relief Tips', link: 'https://example.com/reel1', thumbnail: '🎬', description: 'Quick tips for daily stress relief.' },
  { id: '2', title: 'Mindfulness Basics', link: 'https://example.com/reel2', thumbnail: '🧘', description: 'Introduction to mindfulness practice.' },
];

const defaultPodcasts = [
  { id: '1', title: 'Understanding Anxiety', episode: 'Ep 1', link: 'https://example.com/podcast1', description: 'A deep dive into anxiety and coping strategies.', thumbnail: '🎙️' },
  { id: '2', title: 'Sleep & Mental Health', episode: 'Ep 2', link: 'https://example.com/podcast2', description: 'How sleep affects your mind and mood.', thumbnail: '🌙' },
];

const loadFromStorage = (key, defaultValue) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('Failed to save to localStorage', e);
  }
};

const ContentContext = createContext(null);

export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
};

export const ContentProvider = ({ children }) => {
  const [reels, setReels] = useState(() => loadFromStorage(STORAGE_KEYS.reels, defaultReels));
  const [podcasts, setPodcasts] = useState(() => loadFromStorage(STORAGE_KEYS.podcasts, defaultPodcasts));
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);

  // Fetch posts from WordPress REST API
  useEffect(() => {
    let cancelled = false;

    fetch(WP_API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setPosts(data.map(transformWPPost));
          setPostsLoading(false);
        }
      })
      .catch((err) => {
        console.warn('WordPress API unavailable, using fallback posts:', err);
        if (!cancelled) {
          setPosts(defaultPosts);
          setPostsLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, []);

  useEffect(() => { saveToStorage(STORAGE_KEYS.reels, reels); }, [reels]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.podcasts, podcasts); }, [podcasts]);

  const addReel = (reel) => {
    const id = String(Date.now());
    setReels((prev) => [...prev, { ...reel, id }]);
  };
  const updateReel = (id, updates) => {
    setReels((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  };
  const deleteReel = (id) => {
    setReels((prev) => prev.filter((r) => r.id !== id));
  };

  const addPodcast = (podcast) => {
    const id = String(Date.now());
    setPodcasts((prev) => [...prev, { ...podcast, id }]);
  };
  const updatePodcast = (id, updates) => {
    setPodcasts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };
  const deletePodcast = (id) => {
    setPodcasts((prev) => prev.filter((p) => p.id !== id));
  };

  const addPost = (post) => {
    const id = String(Date.now());
    setPosts((prev) => [...prev, { ...post, id }]);
  };
  const updatePost = (id, updates) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };
  const deletePost = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const value = {
    reels, podcasts, posts, postsLoading,
    addReel, updateReel, deleteReel,
    addPodcast, updatePodcast, deletePodcast,
    addPost, updatePost, deletePost,
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};
