import React, { useEffect, useState, useCallback } from 'react';
import { Navigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { useLMS } from '../context/LMSContext';
import FileUpload from '../components/admin/FileUpload';
import VideoSourceInput from '../components/admin/VideoSourceInput';
import '../styles/LMS.css';
import '../styles/Admin.css';

const TABS = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'courses', label: 'Courses', icon: '📚' },
  { id: 'instructors', label: 'Instructors', icon: '👤' },
  { id: 'blogs', label: 'Blogs', icon: '📝' },
  { id: 'users', label: 'Users', icon: '👥' },
];

function AdminLMS() {
  const { user, loading } = useLMS();
  const [tab, setTab] = useState('overview');

  if (loading) return <div className="admin-loading">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') {
    return (
      <div className="admin-no-access">
        <h2>🔒 Admin access required</h2>
        <p>Only administrators can access this panel. You're signed in as <strong>{user.email}</strong>.</p>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <span>🎓</span>
          <div>
            <strong>MindSpa LMS</strong>
            <small>Admin Panel</small>
          </div>
        </div>

        <nav>
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`admin-sidebar__link ${tab === t.id ? 'active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <div className="admin-sidebar__user">
            <div className="admin-sidebar__avatar">{user.name.charAt(0).toUpperCase()}</div>
            <div>
              <strong>{user.name}</strong>
              <small>Admin</small>
            </div>
          </div>
          <Link to="/" className="admin-sidebar__back">← Back to site</Link>
        </div>
      </aside>

      <main className="admin-main">
        {tab === 'overview' && <OverviewTab />}
        {tab === 'courses' && <CoursesTab />}
        {tab === 'instructors' && <InstructorsTab />}
        {tab === 'blogs' && <BlogsTab />}
        {tab === 'users' && <UsersTab />}
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Overview
// ─────────────────────────────────────────────────────
function OverviewTab() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.getStats().then(setStats).catch(console.error);
  }, []);

  if (!stats) return <div className="admin-loading">Loading stats...</div>;

  const items = [
    { label: 'Total Users', value: stats.users, icon: '👥', color: '#00d084' },
    { label: 'Courses', value: stats.courses, icon: '📚', color: '#fcb900' },
    { label: 'Enrollments', value: stats.enrollments, icon: '🎓', color: '#00d084' },
    { label: 'Certificates', value: stats.certificates, icon: '🏆', color: '#fcb900' },
    { label: 'Reviews', value: stats.reviews, icon: '⭐', color: '#00d084' },
    { label: 'Blog Posts', value: stats.blogs, icon: '📝', color: '#fcb900' },
    { label: 'Instructors', value: stats.instructors, icon: '👤', color: '#00d084' },
  ];

  return (
    <div>
      <h1 className="admin-page-title">Dashboard Overview</h1>
      <p className="admin-page-sub">Quick stats across the platform</p>

      <div className="admin-stats-grid">
        {items.map((s) => (
          <div key={s.label} className="admin-stat" style={{ borderLeftColor: s.color }}>
            <div className="admin-stat__icon">{s.icon}</div>
            <div>
              <div className="admin-stat__value">{s.value}</div>
              <div className="admin-stat__label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-card" style={{ marginTop: 30 }}>
        <h3>Quick Actions</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 12 }}>
          <Link to="/admin/lms" onClick={(e) => { e.preventDefault(); window.location.hash = '#courses'; }} className="admin-btn">
            + Add Course
          </Link>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-light)', marginTop: 12 }}>
          Use the sidebar tabs to manage courses, blogs, instructors, and users.
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Courses Tab
// ─────────────────────────────────────────────────────
function CoursesTab() {
  const [courses, setCourses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [managingCourse, setManagingCourse] = useState(null);

  const refresh = useCallback(async () => {
    const list = await api.getCourses();
    setCourses(list);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course and all its modules/lessons?')) return;
    await api.deleteCourse(id);
    refresh();
  };

  if (managingCourse) {
    return (
      <CourseModulesEditor
        courseId={managingCourse}
        onBack={() => {
          setManagingCourse(null);
          refresh();
        }}
      />
    );
  }

  if (showForm || editing) {
    return (
      <CourseForm
        course={editing}
        onCancel={() => {
          setShowForm(false);
          setEditing(null);
        }}
        onSaved={() => {
          setShowForm(false);
          setEditing(null);
          refresh();
        }}
      />
    );
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Courses</h1>
          <p className="admin-page-sub">{courses.length} total courses</p>
        </div>
        <button className="admin-btn" onClick={() => setShowForm(true)}>
          + New Course
        </button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Level</th>
              <th>Price</th>
              <th>Lessons</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.id}>
                <td>
                  <strong>{c.icon} {c.title}</strong>
                  <small style={{ display: 'block', color: 'var(--text-light)' }}>{c.id}</small>
                </td>
                <td>{c.category}</td>
                <td>{c.level}</td>
                <td>{c.price === 0 ? 'Free' : `₹${c.price}`}</td>
                <td>{c.lessons || c.lessons_count || 0}</td>
                <td>
                  <button className="admin-btn admin-btn--sm" onClick={() => setManagingCourse(c.id)}>
                    Modules
                  </button>
                  <button
                    className="admin-btn admin-btn--sm admin-btn--ghost"
                    onClick={() => setEditing(c)}
                  >
                    Edit
                  </button>
                  <button
                    className="admin-btn admin-btn--sm admin-btn--danger"
                    onClick={() => handleDelete(c.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CourseForm({ course, onCancel, onSaved }) {
  const [form, setForm] = useState({
    id: course?.id || '',
    title: course?.title || '',
    icon: course?.icon || '📚',
    category: course?.category || 'psychology',
    instructorId: course?.instructorId || course?.instructor_id || '',
    duration: course?.duration || '',
    lessons_count: course?.lessons_count || course?.lessons || 0,
    level: course?.level || 'Beginner',
    price: course?.price || 0,
    image: course?.image || '',
    description: course?.description || '',
    whatYouLearn: (course?.whatYouLearn || []).join('\n'),
  });
  const [instructors, setInstructors] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getInstructors().then(setInstructors);
  }, []);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    setError('');
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price) || 0,
        lessons_count: parseInt(form.lessons_count) || 0,
        whatYouLearn: form.whatYouLearn.split('\n').filter((l) => l.trim()),
      };
      if (course) {
        await api.updateCourse(course.id, payload);
      } else {
        await api.createCourse(payload);
      }
      onSaved();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <h1 className="admin-page-title">{course ? 'Edit Course' : 'New Course'}</h1>

      {error && <div className="admin-error">{error}</div>}

      <div className="admin-form">
        {!course && (
          <Field label="Course ID (URL slug)">
            <input
              value={form.id}
              onChange={(e) => set('id', e.target.value.toLowerCase().replace(/\s/g, '-'))}
              placeholder="e.g. intro-psychology"
            />
          </Field>
        )}
        <Field label="Title">
          <input value={form.title} onChange={(e) => set('title', e.target.value)} />
        </Field>
        <div className="admin-form__row">
          <Field label="Icon">
            <input value={form.icon} onChange={(e) => set('icon', e.target.value)} />
          </Field>
          <Field label="Category">
            <select value={form.category} onChange={(e) => set('category', e.target.value)}>
              <option value="psychology">Psychology</option>
              <option value="therapy">Therapy & Healing</option>
              <option value="wellness">Wellness</option>
              <option value="coaching">Coaching</option>
              <option value="corporate">Corporate</option>
            </select>
          </Field>
          <Field label="Level">
            <select value={form.level} onChange={(e) => set('level', e.target.value)}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </Field>
        </div>
        <Field label="Instructor">
          <select
            value={form.instructorId}
            onChange={(e) => set('instructorId', e.target.value)}
          >
            <option value="">-- Select --</option>
            {instructors.map((i) => (
              <option key={i.id} value={i.id}>{i.name}</option>
            ))}
          </select>
        </Field>
        <div className="admin-form__row">
          <Field label="Duration">
            <input value={form.duration} onChange={(e) => set('duration', e.target.value)} placeholder="e.g. 6 Weeks" />
          </Field>
          <Field label="Price (₹, 0 for free)">
            <input
              type="number"
              value={form.price}
              onChange={(e) => set('price', e.target.value)}
            />
          </Field>
          <Field label="Lessons Count">
            <input
              type="number"
              value={form.lessons_count}
              onChange={(e) => set('lessons_count', e.target.value)}
            />
          </Field>
        </div>
        <FileUpload
          label="Course Image"
          accept="image"
          value={form.image}
          onChange={(url) => set('image', url)}
        />
        <Field label="Description">
          <textarea
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            rows={4}
          />
        </Field>
        <Field label="What You'll Learn (one per line)">
          <textarea
            value={form.whatYouLearn}
            onChange={(e) => set('whatYouLearn', e.target.value)}
            rows={5}
          />
        </Field>

        <div className="admin-form__actions">
          <button className="admin-btn admin-btn--ghost" onClick={onCancel}>Cancel</button>
          <button className="admin-btn" onClick={handleSave}>Save Course</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Course Modules Editor
// ─────────────────────────────────────────────────────
function CourseModulesEditor({ courseId, onBack }) {
  const [course, setCourse] = useState(null);
  const [editingLesson, setEditingLesson] = useState(null);
  const [editingQuiz, setEditingQuiz] = useState(null);

  const refresh = useCallback(async () => {
    const c = await api.getCourse(courseId);
    setCourse(c);
  }, [courseId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (!course) return <div className="admin-loading">Loading course...</div>;

  const addModule = async () => {
    const title = window.prompt('Module title:');
    if (!title) return;
    await api.createModule(courseId, { title });
    refresh();
  };

  const renameModule = async (mod) => {
    const title = window.prompt('Rename module:', mod.title);
    if (!title) return;
    await api.updateModule(mod.id, { title });
    refresh();
  };

  const deleteModule = async (mod) => {
    if (!window.confirm(`Delete module "${mod.title}" and all its lessons?`)) return;
    await api.deleteModule(mod.id);
    refresh();
  };

  const deleteLesson = async (lesson) => {
    if (!window.confirm(`Delete lesson "${lesson.title}"?`)) return;
    await api.deleteLesson(lesson.id);
    refresh();
  };

  if (editingLesson) {
    return (
      <LessonForm
        lesson={editingLesson.lesson}
        moduleId={editingLesson.moduleId}
        onCancel={() => setEditingLesson(null)}
        onSaved={() => {
          setEditingLesson(null);
          refresh();
        }}
      />
    );
  }

  if (editingQuiz) {
    return (
      <QuizForm
        moduleId={editingQuiz.moduleId}
        existingQuiz={editingQuiz.quiz}
        onCancel={() => setEditingQuiz(null)}
        onSaved={() => {
          setEditingQuiz(null);
          refresh();
        }}
      />
    );
  }

  return (
    <div>
      <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={onBack}>
        ← Back to courses
      </button>
      <h1 className="admin-page-title" style={{ marginTop: 16 }}>{course.title}</h1>
      <p className="admin-page-sub">Manage modules, lessons, and quizzes</p>

      <div style={{ marginBottom: 20 }}>
        <button className="admin-btn" onClick={addModule}>+ Add Module</button>
      </div>

      {course.modules.map((mod, mi) => (
        <div key={mod.id} className="admin-module-card">
          <div className="admin-module-card__header">
            <div>
              <strong>Module {mi + 1}: {mod.title}</strong>
              <small style={{ display: 'block', color: 'var(--text-light)' }}>
                {mod.lessons.length} lessons {mod.quiz ? '· has quiz' : ''}
              </small>
            </div>
            <div>
              <button className="admin-btn admin-btn--sm admin-btn--ghost" onClick={() => renameModule(mod)}>Rename</button>
              <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => deleteModule(mod)}>Delete</button>
            </div>
          </div>

          <div className="admin-lesson-list">
            {mod.lessons.map((lesson) => (
              <div key={lesson.id} className="admin-lesson-row">
                <span>{lesson.type === 'video' ? '▶' : '📄'}</span>
                <div className="admin-lesson-row__info">
                  <strong>{lesson.title}</strong>
                  <small>{lesson.duration} · {lesson.id}</small>
                </div>
                <button
                  className="admin-btn admin-btn--sm admin-btn--ghost"
                  onClick={() => setEditingLesson({ lesson, moduleId: mod.id })}
                >
                  Edit
                </button>
                <button
                  className="admin-btn admin-btn--sm admin-btn--danger"
                  onClick={() => deleteLesson(lesson)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="admin-module-card__actions">
            <button
              className="admin-btn admin-btn--sm"
              onClick={() => setEditingLesson({ lesson: null, moduleId: mod.id })}
            >
              + Add Lesson
            </button>
            <button
              className="admin-btn admin-btn--sm admin-btn--ghost"
              onClick={() => setEditingQuiz({ moduleId: mod.id, quiz: mod.quiz })}
            >
              {mod.quiz ? 'Edit Quiz' : '+ Add Quiz'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function LessonForm({ lesson, moduleId, onCancel, onSaved }) {
  const [form, setForm] = useState({
    id: lesson?.id || '',
    title: lesson?.title || '',
    type: lesson?.type || 'video',
    duration: lesson?.duration || '',
    videoUrl: lesson?.videoUrl || '',
    content: lesson?.content || '',
  });
  const [error, setError] = useState('');

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    setError('');
    try {
      if (lesson) {
        await api.updateLesson(lesson.id, form);
      } else {
        if (!form.id) {
          setError('Lesson ID is required');
          return;
        }
        await api.createLesson(moduleId, form);
      }
      onSaved();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <h1 className="admin-page-title">{lesson ? 'Edit Lesson' : 'New Lesson'}</h1>
      {error && <div className="admin-error">{error}</div>}
      <div className="admin-form">
        {!lesson && (
          <Field label="Lesson ID (unique)">
            <input value={form.id} onChange={(e) => set('id', e.target.value)} placeholder="e.g. ip-1" />
          </Field>
        )}
        <Field label="Title">
          <input value={form.title} onChange={(e) => set('title', e.target.value)} />
        </Field>
        <div className="admin-form__row">
          <Field label="Type">
            <select value={form.type} onChange={(e) => set('type', e.target.value)}>
              <option value="video">Video</option>
              <option value="text">Text/Reading</option>
            </select>
          </Field>
          <Field label="Duration">
            <input value={form.duration} onChange={(e) => set('duration', e.target.value)} placeholder="e.g. 12 min" />
          </Field>
        </div>
        {form.type === 'video' && (
          <VideoSourceInput
            value={form.videoUrl}
            onChange={(url) => set('videoUrl', url)}
          />
        )}
        <Field label="Content / Description">
          <textarea
            value={form.content}
            onChange={(e) => set('content', e.target.value)}
            rows={8}
          />
        </Field>
        <div className="admin-form__actions">
          <button className="admin-btn admin-btn--ghost" onClick={onCancel}>Cancel</button>
          <button className="admin-btn" onClick={handleSave}>Save Lesson</button>
        </div>
      </div>
    </div>
  );
}

function QuizForm({ moduleId, existingQuiz, onCancel, onSaved }) {
  const [title, setTitle] = useState(existingQuiz?.title || 'Module Quiz');
  const [passingScore, setPassingScore] = useState(existingQuiz?.passingScore || 60);
  const [questions, setQuestions] = useState(
    existingQuiz?.questions || [
      { question: '', options: ['', '', '', ''], correctAnswer: 0, explanation: '' },
    ]
  );

  const updateQuestion = (i, field, value) => {
    setQuestions((qs) => qs.map((q, idx) => (idx === i ? { ...q, [field]: value } : q)));
  };

  const updateOption = (qi, oi, value) => {
    setQuestions((qs) =>
      qs.map((q, idx) =>
        idx === qi
          ? { ...q, options: q.options.map((o, j) => (j === oi ? value : o)) }
          : q
      )
    );
  };

  const addQuestion = () =>
    setQuestions((qs) => [
      ...qs,
      { question: '', options: ['', '', '', ''], correctAnswer: 0, explanation: '' },
    ]);

  const removeQuestion = (i) => setQuestions((qs) => qs.filter((_, idx) => idx !== i));

  const handleSave = async () => {
    await api.saveQuiz(moduleId, { title, passingScore: parseInt(passingScore), questions });
    onSaved();
  };

  return (
    <div>
      <h1 className="admin-page-title">{existingQuiz ? 'Edit Quiz' : 'New Quiz'}</h1>
      <div className="admin-form">
        <div className="admin-form__row">
          <Field label="Quiz Title">
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Field>
          <Field label="Passing Score (%)">
            <input
              type="number"
              value={passingScore}
              onChange={(e) => setPassingScore(e.target.value)}
            />
          </Field>
        </div>

        {questions.map((q, qi) => (
          <div key={qi} className="admin-question-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <strong>Question {qi + 1}</strong>
              <button
                className="admin-btn admin-btn--sm admin-btn--danger"
                onClick={() => removeQuestion(qi)}
              >
                Remove
              </button>
            </div>
            <Field label="Question">
              <input
                value={q.question}
                onChange={(e) => updateQuestion(qi, 'question', e.target.value)}
              />
            </Field>
            {q.options.map((opt, oi) => (
              <Field key={oi} label={`Option ${oi + 1}${q.correctAnswer === oi ? ' ✓ correct' : ''}`}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    value={opt}
                    onChange={(e) => updateOption(qi, oi, e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <button
                    type="button"
                    className={`admin-btn admin-btn--sm ${q.correctAnswer === oi ? '' : 'admin-btn--ghost'}`}
                    onClick={() => updateQuestion(qi, 'correctAnswer', oi)}
                  >
                    Mark correct
                  </button>
                </div>
              </Field>
            ))}
            <Field label="Explanation">
              <textarea
                value={q.explanation}
                onChange={(e) => updateQuestion(qi, 'explanation', e.target.value)}
                rows={2}
              />
            </Field>
          </div>
        ))}

        <button className="admin-btn admin-btn--ghost" onClick={addQuestion}>+ Add Question</button>

        <div className="admin-form__actions">
          <button className="admin-btn admin-btn--ghost" onClick={onCancel}>Cancel</button>
          <button className="admin-btn" onClick={handleSave}>Save Quiz</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Instructors Tab
// ─────────────────────────────────────────────────────
function InstructorsTab() {
  const [list, setList] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const refresh = async () => setList(await api.getInstructors());

  useEffect(() => { refresh(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this instructor?')) return;
    await api.deleteInstructor(id);
    refresh();
  };

  if (showForm || editing) {
    return (
      <InstructorForm
        instructor={editing}
        onCancel={() => { setShowForm(false); setEditing(null); }}
        onSaved={() => { setShowForm(false); setEditing(null); refresh(); }}
      />
    );
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Instructors</h1>
          <p className="admin-page-sub">{list.length} instructors</p>
        </div>
        <button className="admin-btn" onClick={() => setShowForm(true)}>+ New Instructor</button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Students</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((i) => (
              <tr key={i.id}>
                <td><strong>{i.name}</strong><small style={{ display: 'block', color: 'var(--text-light)' }}>{i.id}</small></td>
                <td>{i.title}</td>
                <td>{i.students}</td>
                <td>⭐ {i.rating}</td>
                <td>
                  <button className="admin-btn admin-btn--sm admin-btn--ghost" onClick={() => setEditing(i)}>Edit</button>
                  <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => handleDelete(i.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InstructorForm({ instructor, onCancel, onSaved }) {
  const [form, setForm] = useState({
    id: instructor?.id || '',
    name: instructor?.name || '',
    title: instructor?.title || '',
    bio: instructor?.bio || '',
    avatar: instructor?.avatar || '',
    expertise: (instructor?.expertise || []).join(', '),
    students: instructor?.students || 0,
    courses: instructor?.courses || 0,
    rating: instructor?.rating || 0,
  });
  const [error, setError] = useState('');

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    setError('');
    try {
      const payload = {
        ...form,
        expertise: form.expertise.split(',').map((s) => s.trim()).filter(Boolean),
        students: parseInt(form.students) || 0,
        courses: parseInt(form.courses) || 0,
        rating: parseFloat(form.rating) || 0,
      };
      if (instructor) {
        await api.updateInstructor(instructor.id, payload);
      } else {
        await api.createInstructor(payload);
      }
      onSaved();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <h1 className="admin-page-title">{instructor ? 'Edit Instructor' : 'New Instructor'}</h1>
      {error && <div className="admin-error">{error}</div>}
      <div className="admin-form">
        {!instructor && (
          <Field label="ID (slug)">
            <input value={form.id} onChange={(e) => set('id', e.target.value.toLowerCase().replace(/\s/g, '-'))} />
          </Field>
        )}
        <Field label="Name">
          <input value={form.name} onChange={(e) => set('name', e.target.value)} />
        </Field>
        <Field label="Title">
          <input value={form.title} onChange={(e) => set('title', e.target.value)} />
        </Field>
        <FileUpload
          label="Avatar"
          accept="image"
          value={form.avatar}
          onChange={(url) => set('avatar', url)}
        />
        <Field label="Bio">
          <textarea value={form.bio} onChange={(e) => set('bio', e.target.value)} rows={4} />
        </Field>
        <Field label="Expertise (comma-separated)">
          <input value={form.expertise} onChange={(e) => set('expertise', e.target.value)} />
        </Field>
        <div className="admin-form__row">
          <Field label="Students">
            <input type="number" value={form.students} onChange={(e) => set('students', e.target.value)} />
          </Field>
          <Field label="Courses">
            <input type="number" value={form.courses} onChange={(e) => set('courses', e.target.value)} />
          </Field>
          <Field label="Rating">
            <input type="number" step="0.1" value={form.rating} onChange={(e) => set('rating', e.target.value)} />
          </Field>
        </div>
        <div className="admin-form__actions">
          <button className="admin-btn admin-btn--ghost" onClick={onCancel}>Cancel</button>
          <button className="admin-btn" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Blogs Tab
// ─────────────────────────────────────────────────────
function BlogsTab() {
  const [list, setList] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const refresh = async () => setList(await api.getBlogs());

  useEffect(() => { refresh(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog post?')) return;
    await api.deleteBlog(id);
    refresh();
  };

  if (showForm || editing) {
    return (
      <BlogForm
        blog={editing}
        onCancel={() => { setShowForm(false); setEditing(null); }}
        onSaved={() => { setShowForm(false); setEditing(null); refresh(); }}
      />
    );
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Blog Posts</h1>
          <p className="admin-page-sub">{list.length} posts</p>
        </div>
        <button className="admin-btn" onClick={() => setShowForm(true)}>+ New Post</button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Published</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((b) => (
              <tr key={b.id}>
                <td><strong>{b.title}</strong></td>
                <td>{b.category}</td>
                <td>{b.author}</td>
                <td>{new Date(b.published_at).toLocaleDateString()}</td>
                <td>
                  <button className="admin-btn admin-btn--sm admin-btn--ghost" onClick={() => setEditing(b)}>Edit</button>
                  <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => handleDelete(b.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BlogForm({ blog, onCancel, onSaved }) {
  const [form, setForm] = useState({
    title: blog?.title || '',
    excerpt: blog?.excerpt || '',
    content: blog?.content || '',
    category: blog?.category || '',
    image: blog?.image || '',
    author: blog?.author || 'MindSpa Team',
  });
  const [error, setError] = useState('');

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    setError('');
    try {
      if (blog) await api.updateBlog(blog.id, form);
      else await api.createBlog(form);
      onSaved();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <h1 className="admin-page-title">{blog ? 'Edit Blog Post' : 'New Blog Post'}</h1>
      {error && <div className="admin-error">{error}</div>}
      <div className="admin-form">
        <Field label="Title">
          <input value={form.title} onChange={(e) => set('title', e.target.value)} />
        </Field>
        <div className="admin-form__row">
          <Field label="Category">
            <input value={form.category} onChange={(e) => set('category', e.target.value)} />
          </Field>
          <Field label="Author">
            <input value={form.author} onChange={(e) => set('author', e.target.value)} />
          </Field>
        </div>
        <FileUpload
          label="Featured Image"
          accept="image"
          value={form.image}
          onChange={(url) => set('image', url)}
        />
        <Field label="Excerpt">
          <textarea value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} rows={3} />
        </Field>
        <Field label="Content">
          <textarea value={form.content} onChange={(e) => set('content', e.target.value)} rows={12} />
        </Field>
        <div className="admin-form__actions">
          <button className="admin-btn admin-btn--ghost" onClick={onCancel}>Cancel</button>
          <button className="admin-btn" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Users Tab
// ─────────────────────────────────────────────────────
function UsersTab() {
  const [users, setUsers] = useState([]);

  const refresh = async () => setUsers(await api.getUsers());

  useEffect(() => { refresh(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await api.deleteUser(id);
      refresh();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div>
      <h1 className="admin-page-title">Users</h1>
      <p className="admin-page-sub">{users.length} registered users</p>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td><strong>{u.name}</strong></td>
                <td>{u.email}</td>
                <td>
                  <span className={`admin-badge ${u.role === 'admin' ? 'admin-badge--admin' : ''}`}>
                    {u.role}
                  </span>
                </td>
                <td>{new Date(u.created_at).toLocaleDateString()}</td>
                <td>
                  <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => handleDelete(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Shared
// ─────────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div className="admin-field">
      <label>{label}</label>
      {children}
    </div>
  );
}

export default AdminLMS;
