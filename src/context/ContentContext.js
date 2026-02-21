import React, { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEYS = {
  reels: 'mindspa_reels',
  podcasts: 'mindspa_podcasts',
};

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

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.reels, reels);
  }, [reels]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.podcasts, podcasts);
  }, [podcasts]);

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

  const value = {
    reels,
    podcasts,
    addReel,
    updateReel,
    deleteReel,
    addPodcast,
    updatePodcast,
    deletePodcast,
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};
