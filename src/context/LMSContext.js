import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api, { getToken, setToken, fileUrl } from '../utils/api';

// Convert any /uploads/... path on a record's image fields into an absolute URL
const normalizeImages = (obj) => {
  if (!obj) return obj;
  const result = { ...obj };
  if (result.image) result.image = fileUrl(result.image);
  if (result.avatar) result.avatar = fileUrl(result.avatar);
  return result;
};

const CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: '📚' },
  { id: 'psychology', name: 'Psychology', icon: '🧠' },
  { id: 'therapy', name: 'Therapy & Healing', icon: '🌀' },
  { id: 'wellness', name: 'Wellness', icon: '🧘' },
  { id: 'coaching', name: 'Coaching', icon: '🎯' },
  { id: 'corporate', name: 'Corporate', icon: '💼' },
];

// Local-only state (UI bits that don't need a backend)
const LOCAL_KEY = 'mindspa_lms_local';
const loadLocal = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY)) || { notes: {}, bookmarks: [], wishlist: [], cart: [], discussions: {}, quizAttempts: {}, streak: { lastDate: null, current: 0, longest: 0 } };
  } catch {
    return { notes: {}, bookmarks: [], wishlist: [], cart: [], discussions: {}, quizAttempts: {}, streak: { lastDate: null, current: 0, longest: 0 } };
  }
};

const LMSContext = createContext(null);

export const useLMS = () => {
  const ctx = useContext(LMSContext);
  if (!ctx) throw new Error('useLMS must be used within LMSProvider');
  return ctx;
};

export const LMSProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [courseDetails, setCourseDetails] = useState({}); // cache of full course detail
  const [enrollments, setEnrollments] = useState([]);     // [{course_id, enrolled_at}]
  const [progress, setProgress] = useState([]);           // [{course_id, lesson_id}]
  const [certificates, setCertificates] = useState([]);   // [{course_id, certificate_id, issued_at}]
  const [reviewsCache, setReviewsCache] = useState({});   // { courseId: [reviews] }
  const [loading, setLoading] = useState(true);
  const [local, setLocal] = useState(loadLocal);

  // Persist local-only state
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(local));
  }, [local]);

  // ── Initial load: courses + instructors + (if logged in) user data ──
  const refreshCourses = useCallback(async () => {
    try {
      const list = await api.getCourses();
      setCourses(list.map(normalizeImages));
    } catch (e) {
      console.warn('Failed to load courses', e);
    }
  }, []);

  const refreshInstructors = useCallback(async () => {
    try {
      const list = await api.getInstructors();
      setInstructors(list.map(normalizeImages));
    } catch (e) {
      console.warn('Failed to load instructors', e);
    }
  }, []);

  const refreshUserData = useCallback(async () => {
    if (!getToken()) return;
    try {
      const [enrollData, progressData, certData] = await Promise.all([
        api.getEnrollments(),
        api.getProgress(),
        api.getCertificates(),
      ]);
      setEnrollments(enrollData);
      setProgress(progressData);
      setCertificates(certData);
    } catch (e) {
      console.warn('Failed to load user data', e);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await Promise.all([refreshCourses(), refreshInstructors()]);
      if (getToken()) {
        try {
          const u = await api.me();
          if (!cancelled) setUser(u);
          await refreshUserData();
        } catch {
          setToken(null);
        }
      }
      if (!cancelled) setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [refreshCourses, refreshInstructors, refreshUserData]);

  // ── Course helpers ────────────────────────────────────────────────
  const getCourse = (id) => {
    // Use cached detail if available, otherwise fall back to summary from list
    return courseDetails[id] || courses.find((c) => c.id === id);
  };

  const fetchCourseDetail = useCallback(async (id) => {
    try {
      const detail = await api.getCourse(id);
      const normalized = normalizeImages(detail);
      setCourseDetails((prev) => ({ ...prev, [id]: normalized }));
      return normalized;
    } catch (e) {
      console.warn('Failed to load course detail', e);
      return null;
    }
  }, []);

  const getInstructor = (id) => instructors.find((i) => i.id === id);

  const getQuiz = (courseId, moduleIdx) => {
    const course = courseDetails[courseId];
    return course?.modules?.[moduleIdx]?.quiz || null;
  };

  const getResources = () => []; // Resources can be added later

  const getAllLessonsFlat = (courseId) => {
    const course = courseDetails[courseId];
    if (!course?.modules) return [];
    return course.modules.flatMap((m) => m.lessons);
  };

  const searchCourses = (query) => {
    if (!query) return courses;
    const q = query.toLowerCase();
    return courses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.instructor?.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );
  };

  const getCoursesByCategory = (catId) =>
    catId === 'all' ? courses : courses.filter((c) => c.category === catId);

  // ── Auth ──────────────────────────────────────────────────────────
  const login = async (email, password) => {
    try {
      const { token, user: u } = await api.login(email, password);
      setToken(token);
      setUser(u);
      await refreshUserData();
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const { token, user: u } = await api.register(name, email, password);
      setToken(token);
      setUser(u);
      await refreshUserData();
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setEnrollments([]);
    setProgress([]);
    setCertificates([]);
  };

  // ── Streak ────────────────────────────────────────────────────────
  const trackActivity = useCallback(() => {
    setLocal((prev) => {
      const t = new Date().toISOString().slice(0, 10);
      if (prev.streak.lastDate === t) return prev;
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const isContinuous = prev.streak.lastDate === yesterday;
      const current = isContinuous ? prev.streak.current + 1 : 1;
      return {
        ...prev,
        streak: { lastDate: t, current, longest: Math.max(prev.streak.longest, current) },
      };
    });
  }, []);

  // ── Enrollment ────────────────────────────────────────────────────
  const isEnrolled = (courseId) => enrollments.some((e) => e.course_id === courseId);

  const enroll = async (courseId) => {
    if (!user) {
      // Soft enroll: open in-memory enrollment for guests so navigation works
      setEnrollments((prev) => [...prev, { course_id: courseId, enrolled_at: Date.now() }]);
      setLocal((prev) => ({
        ...prev,
        cart: prev.cart.filter((id) => id !== courseId),
        wishlist: prev.wishlist.filter((id) => id !== courseId),
      }));
      return;
    }
    try {
      await api.enroll(courseId);
      setEnrollments((prev) => [...prev, { course_id: courseId, enrolled_at: Date.now() }]);
      setLocal((prev) => ({
        ...prev,
        cart: prev.cart.filter((id) => id !== courseId),
        wishlist: prev.wishlist.filter((id) => id !== courseId),
      }));
      trackActivity();
    } catch (e) {
      console.warn('Enroll failed', e);
    }
  };

  const unenroll = async (courseId) => {
    if (user) {
      try { await api.unenroll(courseId); } catch {}
    }
    setEnrollments((prev) => prev.filter((e) => e.course_id !== courseId));
    setProgress((prev) => prev.filter((p) => p.course_id !== courseId));
  };

  const getEnrolledCourses = () =>
    enrollments
      .map((e) => courses.find((c) => c.id === e.course_id))
      .filter(Boolean);

  // ── Lesson progress ───────────────────────────────────────────────
  const isLessonCompleted = (courseId, lessonId) =>
    progress.some((p) => p.course_id === courseId && p.lesson_id === lessonId);

  const toggleLessonComplete = async (courseId, lessonId) => {
    const isDone = isLessonCompleted(courseId, lessonId);
    if (user) {
      try {
        await api.toggleLesson(courseId, lessonId);
      } catch (e) {
        console.warn('Toggle progress failed', e);
        return;
      }
    }
    setProgress((prev) =>
      isDone
        ? prev.filter((p) => !(p.course_id === courseId && p.lesson_id === lessonId))
        : [...prev, { course_id: courseId, lesson_id: lessonId }]
    );
    if (!isDone && user) {
      // Refresh certificates after potential issuance
      try {
        const certs = await api.getCertificates();
        setCertificates(certs);
      } catch {}
    }
    trackActivity();
  };

  const getCourseProgress = (courseId) => {
    const course = courseDetails[courseId];
    if (!course?.modules) {
      // Fallback to lessons_count from summary
      const summary = courses.find((c) => c.id === courseId);
      const total = summary?.lessons || 0;
      const done = progress.filter((p) => p.course_id === courseId).length;
      return total > 0 ? Math.round((done / total) * 100) : 0;
    }
    const total = course.modules.reduce((s, m) => s + m.lessons.length, 0);
    const done = progress.filter((p) => p.course_id === courseId).length;
    return total > 0 ? Math.round((done / total) * 100) : 0;
  };

  // ── Notes ─────────────────────────────────────────────────────────
  const getNote = (courseId, lessonId) =>
    local.notes[`${courseId}::${lessonId}`] || '';

  const saveNote = (courseId, lessonId, text) => {
    setLocal((prev) => ({
      ...prev,
      notes: { ...prev.notes, [`${courseId}::${lessonId}`]: text },
    }));
  };

  const getAllNotes = () =>
    Object.entries(local.notes)
      .filter(([_, v]) => v.trim())
      .map(([k, content]) => {
        const [courseId, lessonId] = k.split('::');
        return { courseId, lessonId, content };
      });

  // ── Bookmarks ─────────────────────────────────────────────────────
  const isBookmarked = (courseId, lessonId) =>
    local.bookmarks.some((b) => b.courseId === courseId && b.lessonId === lessonId);

  const toggleBookmark = (courseId, lessonId) => {
    setLocal((prev) => {
      const exists = prev.bookmarks.some(
        (b) => b.courseId === courseId && b.lessonId === lessonId
      );
      return {
        ...prev,
        bookmarks: exists
          ? prev.bookmarks.filter((b) => !(b.courseId === courseId && b.lessonId === lessonId))
          : [...prev.bookmarks, { courseId, lessonId, addedAt: Date.now() }],
      };
    });
  };

  // ── Reviews ───────────────────────────────────────────────────────
  const fetchReviews = useCallback(async (courseId) => {
    try {
      const list = await api.getReviews(courseId);
      setReviewsCache((prev) => ({ ...prev, [courseId]: list }));
      return list;
    } catch (e) {
      return [];
    }
  }, []);

  const getReviews = (courseId) => reviewsCache[courseId] || [];

  const addReview = async (courseId, rating, comment) => {
    if (!user) return { success: false, error: 'Please log in to review' };
    try {
      await api.addReview(courseId, rating, comment);
      await fetchReviews(courseId);
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  const getAverageRating = (courseId) => {
    const reviews = reviewsCache[courseId] || [];
    if (reviews.length === 0) {
      return courses.find((c) => c.id === courseId)?.rating || 0;
    }
    return (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  };

  // ── Wishlist ──────────────────────────────────────────────────────
  const isInWishlist = (courseId) => local.wishlist.includes(courseId);

  const toggleWishlist = (courseId) => {
    setLocal((prev) => ({
      ...prev,
      wishlist: prev.wishlist.includes(courseId)
        ? prev.wishlist.filter((id) => id !== courseId)
        : [...prev.wishlist, courseId],
    }));
  };

  const getWishlistCourses = () =>
    local.wishlist.map((id) => courses.find((c) => c.id === id)).filter(Boolean);

  // ── Cart ──────────────────────────────────────────────────────────
  const isInCart = (courseId) => local.cart.includes(courseId);

  const addToCart = (courseId) => {
    setLocal((prev) =>
      prev.cart.includes(courseId) ? prev : { ...prev, cart: [...prev.cart, courseId] }
    );
  };

  const removeFromCart = (courseId) => {
    setLocal((prev) => ({ ...prev, cart: prev.cart.filter((id) => id !== courseId) }));
  };

  const getCartCourses = () =>
    local.cart.map((id) => courses.find((c) => c.id === id)).filter(Boolean);

  const getCartTotal = () => getCartCourses().reduce((s, c) => s + (c.price || 0), 0);

  const checkout = async () => {
    for (const id of local.cart) {
      await enroll(id);
    }
    setLocal((prev) => ({ ...prev, cart: [] }));
    return { success: true };
  };

  // ── Quiz attempts (local) ─────────────────────────────────────────
  const submitQuiz = (quizKey, answers) => {
    // quizKey format: `${courseId}-m${moduleIdx}`
    const [courseId, modIdxStr] = quizKey.split('-m');
    const moduleIdx = parseInt(modIdxStr);
    const course = courseDetails[courseId];
    const quiz = course?.modules?.[moduleIdx]?.quiz;
    if (!quiz) return null;

    const score = quiz.questions.reduce(
      (sum, q, i) => (answers[i] === q.correctAnswer ? sum + 1 : sum),
      0
    );
    const total = quiz.questions.length;
    const percent = Math.round((score / total) * 100);
    const passed = percent >= quiz.passingScore;

    setLocal((prev) => ({
      ...prev,
      quizAttempts: {
        ...prev.quizAttempts,
        [quizKey]: [
          ...(prev.quizAttempts[quizKey] || []),
          { score, total, percent, passed, timestamp: Date.now() },
        ],
      },
    }));
    trackActivity();
    return { score, total, percent, passed };
  };

  const getQuizAttempts = (quizKey) => local.quizAttempts[quizKey] || [];

  const getBestQuizScore = (quizKey) => {
    const attempts = local.quizAttempts[quizKey] || [];
    return attempts.length > 0 ? Math.max(...attempts.map((a) => a.percent)) : null;
  };

  // ── Discussions (local) ───────────────────────────────────────────
  const getDiscussions = (lessonId) => local.discussions[lessonId] || [];

  const addDiscussion = (lessonId, content) => {
    if (!user) return { success: false, error: 'Please log in to post' };
    setLocal((prev) => ({
      ...prev,
      discussions: {
        ...prev.discussions,
        [lessonId]: [
          {
            id: `d_${Date.now()}`,
            userId: user.id,
            userName: user.name,
            content,
            timestamp: Date.now(),
            replies: [],
          },
          ...(prev.discussions[lessonId] || []),
        ],
      },
    }));
    return { success: true };
  };

  const addReply = (lessonId, discussionId, content) => {
    if (!user) return { success: false, error: 'Please log in' };
    setLocal((prev) => ({
      ...prev,
      discussions: {
        ...prev.discussions,
        [lessonId]: (prev.discussions[lessonId] || []).map((d) =>
          d.id === discussionId
            ? {
                ...d,
                replies: [
                  ...d.replies,
                  {
                    id: `r_${Date.now()}`,
                    userId: user.id,
                    userName: user.name,
                    content,
                    timestamp: Date.now(),
                  },
                ],
              }
            : d
        ),
      },
    }));
    return { success: true };
  };

  // ── Certificates ──────────────────────────────────────────────────
  const getCertificate = (courseId) => {
    const cert = certificates.find((c) => c.course_id === courseId);
    if (!cert) return null;
    return {
      courseId: cert.course_id,
      certificateId: cert.certificate_id,
      completedAt: cert.issued_at,
    };
  };

  const getAllCertificates = () =>
    certificates
      .map((c) => ({
        certificateId: c.certificate_id,
        courseId: c.course_id,
        completedAt: c.issued_at,
        course: courses.find((cc) => cc.id === c.course_id),
      }))
      .filter((c) => c.course);

  const value = {
    // Loading state
    loading,

    // Data
    courses,
    categories: CATEGORIES,
    instructors,

    // Course helpers
    getCourse,
    fetchCourseDetail,
    getInstructor,
    getQuiz,
    getResources,
    getAllLessonsFlat,
    searchCourses,
    getCoursesByCategory,
    refreshCourses,

    // Auth
    user,
    login,
    register,
    logout,

    // Enrollment
    isEnrolled,
    enroll,
    unenroll,
    getEnrolledCourses,

    // Progress
    isLessonCompleted,
    toggleLessonComplete,
    getCourseProgress,

    // Notes
    getNote,
    saveNote,
    getAllNotes,

    // Bookmarks
    isBookmarked,
    toggleBookmark,
    bookmarks: local.bookmarks,

    // Reviews
    getReviews,
    fetchReviews,
    addReview,
    getAverageRating,

    // Wishlist
    isInWishlist,
    toggleWishlist,
    getWishlistCourses,
    wishlist: local.wishlist,

    // Cart
    isInCart,
    addToCart,
    removeFromCart,
    getCartCourses,
    getCartTotal,
    checkout,
    cart: local.cart,

    // Quiz
    submitQuiz,
    getQuizAttempts,
    getBestQuizScore,

    // Discussions
    getDiscussions,
    addDiscussion,
    addReply,

    // Certificates
    getCertificate,
    getAllCertificates,

    // Streak
    streak: local.streak,
  };

  return <LMSContext.Provider value={value}>{children}</LMSContext.Provider>;
};
