import React, { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEYS = {
  reels: 'mindspa_reels',
  podcasts: 'mindspa_podcasts',
  posts: 'mindspa_posts',
};

const defaultReels = [
  { id: '1', title: 'Stress Relief Tips', link: 'https://example.com/reel1', thumbnail: '🎬', description: 'Quick tips for daily stress relief.' },
  { id: '2', title: 'Mindfulness Basics', link: 'https://example.com/reel2', thumbnail: '🧘', description: 'Introduction to mindfulness practice.' },
];

const defaultPodcasts = [
  { id: '1', title: 'Understanding Anxiety', episode: 'Ep 1', link: 'https://example.com/podcast1', description: 'A deep dive into anxiety and coping strategies.', thumbnail: '🎙️' },
  { id: '2', title: 'Sleep & Mental Health', episode: 'Ep 2', link: 'https://example.com/podcast2', description: 'How sleep affects your mind and mood.', thumbnail: '🌙' },
];

const defaultPosts = [
  { id: '1', date: '15', month: 'Aug', category: 'Holistic Health', title: 'The Rise of Holistic Mental Health – Blending Mind, Body, and Social Well-being', image: '🧘', content: 'Holistic mental health approaches consider the whole person—mind, body, and social context. At MindSpa we blend evidence-based therapy with wellness practices to support lasting change. This article explores how integrating physical health, relationships, and mindfulness can improve mental well-being.' },
  { id: '2', date: '15', month: 'Aug', category: 'Self-Help', title: 'Stress, Anxiety & Depression – Practical Self-Help Strategies That Work', image: '💆', content: 'Practical, day-to-day strategies can make a real difference for stress, anxiety, and low mood. We share evidence-based self-help techniques: breathing exercises, routine, sleep, and when to seek professional support. Small steps add up to better mental health.' },
  { id: '3', date: '15', month: 'Aug', category: 'Technology', title: 'Embracing Technology for Better Mental Health: Digital Therapy & AI in 2025', image: '💻', content: 'Digital tools and AI are changing how we support mental health—from apps to teletherapy. We look at what works, what to watch for, and how technology can complement in-person care at MindSpa.' },
  { id: '4', date: '14', month: 'Aug', category: 'Gen Z Wellness', title: 'Navigating Breakups and Emotional Wellness for Gen Z – Coping, Growth, and Healing', image: '❤️', content: 'Breakups are tough at any age. For Gen Z, social media and changing norms add extra layers. This piece offers compassionate, practical advice on coping, setting boundaries, and growing through relationship endings.' },
  { id: '5', date: '12', month: 'Aug', category: 'Hypnotherapy', title: 'Top 7 Myths About Hypnotherapy, Debunking the Misconceptions', image: '🔮', content: 'Hypnotherapy is often misunderstood. We bust seven common myths: you stay in control, it is not sleep, it is used by qualified practitioners, and it can support real change for habits, anxiety, and more.' },
  { id: '6', date: '12', month: 'Aug', category: 'Hypnotherapy', title: "No, Hypnotherapy Won't Control Your Mind, But It Might Change Your Life", image: '✨', content: 'Hypnotherapy works with your subconscious to reinforce positive change—you remain in control. Learn how it can help with confidence, stress, and breaking unhelpful patterns when done with a trained professional.' },
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
  const [posts, setPosts] = useState(() => loadFromStorage(STORAGE_KEYS.posts, defaultPosts));

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.reels, reels);
  }, [reels]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.podcasts, podcasts);
  }, [podcasts]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.posts, posts);
  }, [posts]);

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
    reels,
    podcasts,
    posts,
    addReel,
    updateReel,
    deleteReel,
    addPodcast,
    updatePodcast,
    deletePodcast,
    addPost,
    updatePost,
    deletePost,
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};
