require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { db, init } = require('./db');

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'mindspa-dev-secret-change-in-production';

const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));

// ── Static file serving for uploads ─────────────────────────────────
const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
app.use('/uploads', express.static(UPLOAD_DIR));

// ── Multer storage ──────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path
      .basename(file.originalname, ext)
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase()
      .slice(0, 40);
    cb(null, `${Date.now()}-${base}${ext}`);
  },
});

const ALLOWED = {
  image: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
  video: ['.mp4', '.webm', '.mov', '.m4v', '.mkv'],
};

const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ALLOWED.image.includes(ext) || ALLOWED.video.includes(ext)) cb(null, true);
    else cb(new Error('File type not allowed'));
  },
});

// ── Async route wrapper (forwards errors to error middleware) ───────
const a = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// ── Helpers ─────────────────────────────────────────────────────────
const sign = (user) =>
  jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
    expiresIn: '30d',
  });

const auth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'No token' });
  try {
    const token = header.replace('Bearer ', '');
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin')
    return res.status(403).json({ error: 'Admin access required' });
  next();
};

const buildCourse = async (course) => {
  if (!course) return null;
  const modules = await db.all(
    'SELECT * FROM modules WHERE course_id = ? ORDER BY order_index',
    [course.id]
  );

  const fullModules = await Promise.all(
    modules.map(async (mod) => {
      const lessons = await db.all(
        'SELECT * FROM lessons WHERE module_id = ? ORDER BY order_index',
        [mod.id]
      );

      const quiz = await db.get('SELECT * FROM quizzes WHERE module_id = ?', [mod.id]);
      let quizFull = null;
      if (quiz) {
        const questions = await db.all(
          'SELECT * FROM quiz_questions WHERE quiz_id = ? ORDER BY order_index',
          [quiz.id]
        );
        quizFull = {
          id: quiz.id,
          title: quiz.title,
          passingScore: quiz.passing_score,
          questions: questions.map((q) => ({
            id: q.id,
            question: q.question,
            options: JSON.parse(q.options),
            correctAnswer: q.correct_answer,
            explanation: q.explanation,
          })),
        };
      }

      return {
        id: mod.id,
        title: mod.title,
        lessons: lessons.map((l) => ({
          id: l.id,
          title: l.title,
          type: l.type,
          duration: l.duration,
          videoUrl: l.video_url,
          content: l.content,
        })),
        quiz: quizFull,
      };
    })
  );

  return {
    ...course,
    instructorId: course.instructor_id,
    whatYouLearn: course.what_you_learn ? JSON.parse(course.what_you_learn) : [],
    modules: fullModules,
  };
};

// ─────────────────────────────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────────────────────────────
app.post('/api/auth/register', a(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
  if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

  const existing = await db.get('SELECT id FROM users WHERE email = ?', [email]);
  if (existing) return res.status(400).json({ error: 'Email already registered' });

  const hash = bcrypt.hashSync(password, 10);
  const now = Date.now();
  const result = await db.run(
    'INSERT INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, ?, ?)',
    [name, email, hash, 'user', now]
  );

  const user = await db.get(
    'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
    [result.lastInsertRowid]
  );
  res.json({ token: sign(user), user });
}));

app.post('/api/auth/login', a(async (req, res) => {
  const { email, password } = req.body;
  const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
  if (!user || !bcrypt.compareSync(password, user.password))
    return res.status(401).json({ error: 'Invalid email or password' });

  const { password: _, ...safeUser } = user;
  res.json({ token: sign(user), user: safeUser });
}));

app.get('/api/auth/me', auth, a(async (req, res) => {
  const user = await db.get(
    'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
    [req.user.id]
  );
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
}));

// ─────────────────────────────────────────────────────────────────────
// COURSES
// ─────────────────────────────────────────────────────────────────────
app.get('/api/courses', a(async (req, res) => {
  const courses = await db.all('SELECT * FROM courses ORDER BY created_at DESC');
  const withInstructor = await Promise.all(courses.map(async (c) => {
    const inst = await db.get('SELECT name FROM instructors WHERE id = ?', [c.instructor_id]);
    return {
      ...c,
      instructorId: c.instructor_id,
      whatYouLearn: c.what_you_learn ? JSON.parse(c.what_you_learn) : [],
      lessons: c.lessons_count,
      instructor: inst?.name || 'Unknown',
    };
  }));
  res.json(withInstructor);
}));

app.get('/api/courses/:id', a(async (req, res) => {
  const course = await db.get('SELECT * FROM courses WHERE id = ?', [req.params.id]);
  if (!course) return res.status(404).json({ error: 'Course not found' });
  const instructor = await db.get('SELECT name FROM instructors WHERE id = ?', [course.instructor_id]);
  const full = await buildCourse(course);
  full.instructor = instructor?.name || 'Unknown';
  full.lessons = course.lessons_count;
  res.json(full);
}));

app.post('/api/courses', auth, adminOnly, a(async (req, res) => {
  const c = req.body;
  await db.run(
    `INSERT INTO courses (id, title, icon, category, instructor_id, duration, lessons_count, level, price, image, description, what_you_learn, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      c.id, c.title, c.icon || '📚', c.category || 'psychology',
      c.instructorId || c.instructor_id || null, c.duration || '',
      c.lessons_count || 0, c.level || 'Beginner', c.price || 0,
      c.image || '', c.description || '', JSON.stringify(c.whatYouLearn || []),
      Date.now(),
    ]
  );
  res.json({ success: true, id: c.id });
}));

app.put('/api/courses/:id', auth, adminOnly, a(async (req, res) => {
  const c = req.body;
  await db.run(
    `UPDATE courses SET title=?, icon=?, category=?, instructor_id=?, duration=?, lessons_count=?, level=?, price=?, image=?, description=?, what_you_learn=? WHERE id=?`,
    [
      c.title, c.icon, c.category, c.instructorId || c.instructor_id || null,
      c.duration, c.lessons_count || 0, c.level, c.price || 0,
      c.image, c.description, JSON.stringify(c.whatYouLearn || []), req.params.id,
    ]
  );
  res.json({ success: true });
}));

app.delete('/api/courses/:id', auth, adminOnly, a(async (req, res) => {
  await db.run('DELETE FROM courses WHERE id = ?', [req.params.id]);
  res.json({ success: true });
}));

// ─────────────────────────────────────────────────────────────────────
// MODULES
// ─────────────────────────────────────────────────────────────────────
app.post('/api/courses/:courseId/modules', auth, adminOnly, a(async (req, res) => {
  const { title } = req.body;
  const max = await db.get(
    'SELECT MAX(order_index) AS m FROM modules WHERE course_id = ?',
    [req.params.courseId]
  );
  const result = await db.run(
    'INSERT INTO modules (course_id, title, order_index) VALUES (?, ?, ?)',
    [req.params.courseId, title, (max?.m || 0) + 1]
  );
  res.json({ success: true, id: result.lastInsertRowid });
}));

app.put('/api/modules/:id', auth, adminOnly, a(async (req, res) => {
  await db.run('UPDATE modules SET title = ? WHERE id = ?', [req.body.title, req.params.id]);
  res.json({ success: true });
}));

app.delete('/api/modules/:id', auth, adminOnly, a(async (req, res) => {
  await db.run('DELETE FROM modules WHERE id = ?', [req.params.id]);
  res.json({ success: true });
}));

// ─────────────────────────────────────────────────────────────────────
// LESSONS
// ─────────────────────────────────────────────────────────────────────
app.post('/api/modules/:moduleId/lessons', auth, adminOnly, a(async (req, res) => {
  const l = req.body;
  const max = await db.get(
    'SELECT MAX(order_index) AS m FROM lessons WHERE module_id = ?',
    [req.params.moduleId]
  );
  await db.run(
    `INSERT INTO lessons (id, module_id, title, type, duration, video_url, content, order_index)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [l.id, req.params.moduleId, l.title, l.type || 'video', l.duration || '', l.videoUrl || null, l.content || '', (max?.m || 0) + 1]
  );
  res.json({ success: true });
}));

app.put('/api/lessons/:id', auth, adminOnly, a(async (req, res) => {
  const l = req.body;
  await db.run(
    `UPDATE lessons SET title=?, type=?, duration=?, video_url=?, content=? WHERE id=?`,
    [l.title, l.type, l.duration, l.videoUrl || null, l.content || '', req.params.id]
  );
  res.json({ success: true });
}));

app.delete('/api/lessons/:id', auth, adminOnly, a(async (req, res) => {
  await db.run('DELETE FROM lessons WHERE id = ?', [req.params.id]);
  res.json({ success: true });
}));

// ─────────────────────────────────────────────────────────────────────
// QUIZZES
// ─────────────────────────────────────────────────────────────────────
app.post('/api/modules/:moduleId/quiz', auth, adminOnly, a(async (req, res) => {
  const { title, passingScore, questions } = req.body;
  const existing = await db.get('SELECT id FROM quizzes WHERE module_id = ?', [req.params.moduleId]);
  if (existing) await db.run('DELETE FROM quizzes WHERE id = ?', [existing.id]);

  const result = await db.run(
    'INSERT INTO quizzes (module_id, title, passing_score) VALUES (?, ?, ?)',
    [req.params.moduleId, title, passingScore || 60]
  );
  const quizId = result.lastInsertRowid;
  for (let i = 0; i < (questions || []).length; i++) {
    const q = questions[i];
    await db.run(
      `INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, explanation, order_index) VALUES (?, ?, ?, ?, ?, ?)`,
      [quizId, q.question, JSON.stringify(q.options), q.correctAnswer, q.explanation || '', i]
    );
  }
  res.json({ success: true, id: quizId });
}));

// ─────────────────────────────────────────────────────────────────────
// INSTRUCTORS
// ─────────────────────────────────────────────────────────────────────
app.get('/api/instructors', a(async (req, res) => {
  const list = await db.all('SELECT * FROM instructors');
  res.json(list.map((i) => ({ ...i, expertise: i.expertise ? i.expertise.split(',') : [] })));
}));

app.post('/api/instructors', auth, adminOnly, a(async (req, res) => {
  const i = req.body;
  await db.run(
    `INSERT INTO instructors (id, name, title, bio, avatar, expertise, students, courses, rating)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      i.id, i.name, i.title || '', i.bio || '', i.avatar || '',
      Array.isArray(i.expertise) ? i.expertise.join(',') : (i.expertise || ''),
      i.students || 0, i.courses || 0, i.rating || 0,
    ]
  );
  res.json({ success: true });
}));

app.put('/api/instructors/:id', auth, adminOnly, a(async (req, res) => {
  const i = req.body;
  await db.run(
    `UPDATE instructors SET name=?, title=?, bio=?, avatar=?, expertise=?, students=?, courses=?, rating=? WHERE id=?`,
    [
      i.name, i.title, i.bio, i.avatar,
      Array.isArray(i.expertise) ? i.expertise.join(',') : i.expertise,
      i.students || 0, i.courses || 0, i.rating || 0, req.params.id,
    ]
  );
  res.json({ success: true });
}));

app.delete('/api/instructors/:id', auth, adminOnly, a(async (req, res) => {
  await db.run('DELETE FROM instructors WHERE id = ?', [req.params.id]);
  res.json({ success: true });
}));

// ─────────────────────────────────────────────────────────────────────
// BLOGS
// ─────────────────────────────────────────────────────────────────────
app.get('/api/blogs', a(async (req, res) => {
  const blogs = await db.all('SELECT * FROM blogs ORDER BY published_at DESC');
  res.json(blogs);
}));

app.get('/api/blogs/:id', a(async (req, res) => {
  const blog = await db.get('SELECT * FROM blogs WHERE id = ?', [req.params.id]);
  if (!blog) return res.status(404).json({ error: 'Not found' });
  res.json(blog);
}));

app.post('/api/blogs', auth, adminOnly, a(async (req, res) => {
  const b = req.body;
  const result = await db.run(
    `INSERT INTO blogs (title, excerpt, content, category, image, author, published_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [b.title, b.excerpt || '', b.content || '', b.category || '', b.image || '', b.author || 'MindSpa Team', Date.now()]
  );
  res.json({ success: true, id: result.lastInsertRowid });
}));

app.put('/api/blogs/:id', auth, adminOnly, a(async (req, res) => {
  const b = req.body;
  await db.run(
    `UPDATE blogs SET title=?, excerpt=?, content=?, category=?, image=?, author=? WHERE id=?`,
    [b.title, b.excerpt, b.content, b.category, b.image, b.author, req.params.id]
  );
  res.json({ success: true });
}));

app.delete('/api/blogs/:id', auth, adminOnly, a(async (req, res) => {
  await db.run('DELETE FROM blogs WHERE id = ?', [req.params.id]);
  res.json({ success: true });
}));

// ─────────────────────────────────────────────────────────────────────
// ENROLLMENTS / PROGRESS / REVIEWS / CERTIFICATES
// ─────────────────────────────────────────────────────────────────────
app.get('/api/enrollments', auth, a(async (req, res) => {
  const list = await db.all('SELECT * FROM enrollments WHERE user_id = ?', [req.user.id]);
  res.json(list);
}));

app.post('/api/enrollments', auth, a(async (req, res) => {
  const { courseId } = req.body;
  await db.run(
    'INSERT IGNORE INTO enrollments (user_id, course_id, enrolled_at) VALUES (?, ?, ?)',
    [req.user.id, courseId, Date.now()]
  );
  res.json({ success: true });
}));

app.delete('/api/enrollments/:courseId', auth, a(async (req, res) => {
  await db.run('DELETE FROM enrollments WHERE user_id = ? AND course_id = ?', [req.user.id, req.params.courseId]);
  await db.run('DELETE FROM lesson_progress WHERE user_id = ? AND course_id = ?', [req.user.id, req.params.courseId]);
  res.json({ success: true });
}));

app.get('/api/progress', auth, a(async (req, res) => {
  const list = await db.all('SELECT * FROM lesson_progress WHERE user_id = ?', [req.user.id]);
  res.json(list);
}));

app.post('/api/progress', auth, a(async (req, res) => {
  const { courseId, lessonId } = req.body;
  const existing = await db.get(
    'SELECT id FROM lesson_progress WHERE user_id = ? AND lesson_id = ?',
    [req.user.id, lessonId]
  );

  if (existing) {
    await db.run('DELETE FROM lesson_progress WHERE id = ?', [existing.id]);
    return res.json({ success: true, completed: false });
  }

  await db.run(
    'INSERT INTO lesson_progress (user_id, course_id, lesson_id, completed_at) VALUES (?, ?, ?, ?)',
    [req.user.id, courseId, lessonId, Date.now()]
  );

  // Certificate on 100% completion
  const course = await db.get('SELECT * FROM courses WHERE id = ?', [courseId]);
  if (course) {
    const total = await db.get(
      `SELECT COUNT(*) AS n FROM lessons l JOIN modules m ON l.module_id = m.id WHERE m.course_id = ?`,
      [courseId]
    );
    const done = await db.get(
      'SELECT COUNT(*) AS n FROM lesson_progress WHERE user_id = ? AND course_id = ?',
      [req.user.id, courseId]
    );
    if (total.n > 0 && done.n === total.n) {
      const certId = `MS-${courseId.toUpperCase().slice(0, 4)}-${Date.now().toString().slice(-6)}`;
      try {
        await db.run(
          'INSERT INTO certificates (user_id, course_id, certificate_id, issued_at) VALUES (?, ?, ?, ?)',
          [req.user.id, courseId, certId, Date.now()]
        );
      } catch {}
    }
  }

  res.json({ success: true, completed: true });
}));

app.get('/api/certificates', auth, a(async (req, res) => {
  const certs = await db.all('SELECT * FROM certificates WHERE user_id = ?', [req.user.id]);
  res.json(certs);
}));

app.get('/api/courses/:id/reviews', a(async (req, res) => {
  const reviews = await db.all(
    `SELECT r.*, u.name AS user_name FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.course_id = ? ORDER BY r.created_at DESC`,
    [req.params.id]
  );
  res.json(reviews);
}));

app.post('/api/courses/:id/reviews', auth, a(async (req, res) => {
  const { rating, comment } = req.body;
  await db.run(
    `INSERT INTO reviews (user_id, course_id, rating, comment, created_at) VALUES (?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE rating = VALUES(rating), comment = VALUES(comment), created_at = VALUES(created_at)`,
    [req.user.id, req.params.id, rating, comment, Date.now()]
  );
  res.json({ success: true });
}));

// ─────────────────────────────────────────────────────────────────────
// ADMIN: Users & Stats
// ─────────────────────────────────────────────────────────────────────
app.get('/api/admin/users', auth, adminOnly, a(async (req, res) => {
  const users = await db.all('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC');
  res.json(users);
}));

app.delete('/api/admin/users/:id', auth, adminOnly, a(async (req, res) => {
  if (parseInt(req.params.id) === req.user.id)
    return res.status(400).json({ error: 'Cannot delete yourself' });
  await db.run('DELETE FROM users WHERE id = ?', [req.params.id]);
  res.json({ success: true });
}));

app.get('/api/admin/stats', auth, adminOnly, a(async (req, res) => {
  const count = async (table) => (await db.get(`SELECT COUNT(*) AS n FROM ${table}`)).n;
  res.json({
    users: await count('users'),
    courses: await count('courses'),
    blogs: await count('blogs'),
    instructors: await count('instructors'),
    enrollments: await count('enrollments'),
    certificates: await count('certificates'),
    reviews: await count('reviews'),
  });
}));

// ─────────────────────────────────────────────────────────────────────
// FILE UPLOAD
// ─────────────────────────────────────────────────────────────────────
app.post('/api/upload', auth, adminOnly, (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const ext = path.extname(req.file.originalname).toLowerCase();
    const type = ALLOWED.video.includes(ext) ? 'video' : 'image';

    res.json({
      success: true,
      url: `/uploads/${req.file.filename}`,
      fullUrl: `http://localhost:${PORT}/uploads/${req.file.filename}`,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      type,
    });
  });
});

app.delete('/api/upload/:filename', auth, adminOnly, (req, res) => {
  const filepath = path.join(UPLOAD_DIR, req.params.filename);
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
    return res.json({ success: true });
  }
  res.status(404).json({ error: 'File not found' });
});

app.get('/api/uploads', auth, adminOnly, (req, res) => {
  const files = fs.readdirSync(UPLOAD_DIR).map((filename) => {
    const stat = fs.statSync(path.join(UPLOAD_DIR, filename));
    const ext = path.extname(filename).toLowerCase();
    return {
      filename,
      url: `/uploads/${filename}`,
      size: stat.size,
      modified: stat.mtimeMs,
      type: ALLOWED.video.includes(ext) ? 'video' : 'image',
    };
  });
  res.json(files.sort((a, b) => b.modified - a.modified));
});

// ─────────────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'ok', db: 'mysql' }));

// Global error handler — catches anything the route wrappers forward
app.use((err, req, res, next) => {
  console.error('API error:', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

// ─────────────────────────────────────────────────────────────────────
// Bootstrap
// ─────────────────────────────────────────────────────────────────────
(async () => {
  await init();
  app.listen(PORT, () => {
    console.log(`✓ MindSpa backend running on http://localhost:${PORT}`);
    console.log(`  Admin login: admin@mindspa.in / admin123`);
  });
})();
