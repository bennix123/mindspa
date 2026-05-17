require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
  console.error('\n✗ Missing MySQL credentials.');
  console.error('  Copy backend/.env.example to backend/.env and fill in DB_HOST, DB_USER, DB_PASSWORD, DB_NAME.\n');
  process.exit(1);
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4',
  dateStrings: false,
});

// ── Query helpers (mimic better-sqlite3 API but async) ──────────────
const db = {
  pool,
  async run(sql, params = []) {
    const [result] = await pool.execute(sql, params);
    return { lastInsertRowid: result.insertId, changes: result.affectedRows };
  },
  async get(sql, params = []) {
    const [rows] = await pool.execute(sql, params);
    return rows[0] || null;
  },
  async all(sql, params = []) {
    const [rows] = await pool.execute(sql, params);
    return rows;
  },
  async query(sql, params = []) {
    const [rows] = await pool.query(sql, params);
    return rows;
  },
};

// ── Schema ──────────────────────────────────────────────────────────
const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    created_at BIGINT NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS instructors (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    bio TEXT,
    avatar TEXT,
    expertise TEXT,
    students INT DEFAULT 0,
    courses INT DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS courses (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    icon VARCHAR(20),
    category VARCHAR(50),
    instructor_id VARCHAR(100),
    duration VARCHAR(50),
    lessons_count INT DEFAULT 0,
    level VARCHAR(30),
    price DECIMAL(10,2) DEFAULT 0,
    enrolled INT DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0,
    image TEXT,
    description TEXT,
    what_you_learn TEXT,
    created_at BIGINT NOT NULL,
    FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE SET NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS modules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    order_index INT DEFAULT 0,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS lessons (
    id VARCHAR(100) PRIMARY KEY,
    module_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(20) DEFAULT 'video',
    duration VARCHAR(50),
    video_url TEXT,
    content MEDIUMTEXT,
    order_index INT DEFAULT 0,
    FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS quizzes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    module_id INT NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    passing_score INT DEFAULT 60,
    FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS quiz_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,
    question TEXT NOT NULL,
    options TEXT NOT NULL,
    correct_answer INT NOT NULL,
    explanation TEXT,
    order_index INT DEFAULT 0,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS resources (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lesson_id VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    size VARCHAR(20),
    url TEXT,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id VARCHAR(100) NOT NULL,
    enrolled_at BIGINT NOT NULL,
    UNIQUE KEY uniq_user_course (user_id, course_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS lesson_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id VARCHAR(100) NOT NULL,
    lesson_id VARCHAR(100) NOT NULL,
    completed_at BIGINT NOT NULL,
    UNIQUE KEY uniq_user_lesson (user_id, lesson_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id VARCHAR(100) NOT NULL,
    rating INT NOT NULL,
    comment TEXT,
    created_at BIGINT NOT NULL,
    UNIQUE KEY uniq_user_course_review (user_id, course_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS certificates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id VARCHAR(100) NOT NULL,
    certificate_id VARCHAR(100) UNIQUE NOT NULL,
    issued_at BIGINT NOT NULL,
    UNIQUE KEY uniq_user_course_cert (user_id, course_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content MEDIUMTEXT,
    category VARCHAR(100),
    image TEXT,
    author VARCHAR(100) DEFAULT 'MindSpa Team',
    published_at BIGINT NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
];

// ── Init + seed ─────────────────────────────────────────────────────
async function init() {
  try {
    // Verify connection
    const conn = await pool.getConnection();
    conn.release();
    console.log(`✓ Connected to MySQL at ${process.env.DB_HOST}:${process.env.DB_PORT || 3306}/${process.env.DB_NAME}`);
  } catch (err) {
    console.error('\n✗ Could not connect to MySQL:', err.message);
    console.error('  Check your .env credentials and that your IP is whitelisted in Hostinger → Remote MySQL.\n');
    process.exit(1);
  }

  // Create tables
  for (const sql of SCHEMA) {
    await pool.query(sql);
  }
  console.log('✓ Schema ready');

  // Seed if empty
  const [[{ n }]] = await pool.query('SELECT COUNT(*) AS n FROM courses');
  if (n === 0) {
    console.log('Seeding initial data...');
    await seed();
    console.log('✓ Seed complete. Admin login: admin@mindspa.in / admin123');
  }
}

async function seed() {
  const now = Date.now();

  // Admin user
  const adminHash = bcrypt.hashSync('admin123', 10);
  await db.run(
    'INSERT IGNORE INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, ?, ?)',
    ['Admin', 'admin@mindspa.in', adminHash, 'admin', now]
  );

  // Instructors
  const instructors = [
    {
      id: 'priya-sharma',
      name: 'Dr. Priya Sharma',
      title: 'Lead Psychologist & Hypnotherapist',
      bio: 'Dr. Priya Sharma has over 15 years of experience in clinical psychology and certified hypnotherapy. She founded MindSpa India to bring accessible mental wellness to every corner of the country.',
      avatar: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=300',
      expertise: 'Clinical Psychology,Hypnotherapy,CBT,Counselling',
      students: 1132,
      courses: 4,
      rating: 4.8,
    },
    {
      id: 'mindspa-team',
      name: 'MindSpa Team',
      title: 'Wellness Specialists',
      bio: 'A collective of certified wellness practitioners, meditation guides, and corporate trainers dedicated to evidence-based mental health education.',
      avatar: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=300',
      expertise: 'Mindfulness,Corporate Wellness,Stress Management',
      students: 510,
      courses: 2,
      rating: 4.6,
    },
    {
      id: 'manju-agrawal',
      name: 'Prof (Dr) Manju Agrawal',
      title: 'CHI-(USA) Certified Hypnotherapy Trainer',
      bio: 'Internationally Certified (IMDHA) Hypnotherapy Practitioner and CHI-(USA) Certified Hypnotherapy Trainer. Prof (Dr) Manju Agrawal leads MindSpa\'s flagship Diploma in Clinical Hypnotherapy and specialized training programs.',
      avatar: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=300',
      expertise: 'Clinical Hypnotherapy,NLP,Past Life Regression,Dream Therapy,Handwriting Analysis',
      students: 0,
      courses: 7,
      rating: 5.0,
    },
  ];

  for (const i of instructors) {
    await db.run(
      `INSERT INTO instructors (id, name, title, bio, avatar, expertise, students, courses, rating)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [i.id, i.name, i.title, i.bio, i.avatar, i.expertise, i.students, i.courses, i.rating]
    );
  }

  // Courses with modules, lessons, quizzes
  const { courses } = require('./seedData');
  for (const c of courses) {
    await db.run(
      `INSERT INTO courses (id, title, icon, category, instructor_id, duration, lessons_count, level, price, enrolled, rating, image, description, what_you_learn, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        c.id, c.title, c.icon, c.category, c.instructor_id, c.duration,
        c.lessons_count, c.level, c.price, c.enrolled, c.rating, c.image,
        c.description, JSON.stringify(c.whatYouLearn), now,
      ]
    );

    for (let mi = 0; mi < c.modules.length; mi++) {
      const mod = c.modules[mi];
      const modResult = await db.run(
        'INSERT INTO modules (course_id, title, order_index) VALUES (?, ?, ?)',
        [c.id, mod.title, mi]
      );
      const moduleId = modResult.lastInsertRowid;

      for (let li = 0; li < mod.lessons.length; li++) {
        const lesson = mod.lessons[li];
        await db.run(
          `INSERT INTO lessons (id, module_id, title, type, duration, video_url, content, order_index)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [lesson.id, moduleId, lesson.title, lesson.type, lesson.duration, lesson.videoUrl || null, lesson.content, li]
        );
      }

      if (mod.quiz) {
        const quizResult = await db.run(
          'INSERT INTO quizzes (module_id, title, passing_score) VALUES (?, ?, ?)',
          [moduleId, mod.quiz.title, mod.quiz.passingScore]
        );
        const quizId = quizResult.lastInsertRowid;

        for (let qi = 0; qi < mod.quiz.questions.length; qi++) {
          const q = mod.quiz.questions[qi];
          await db.run(
            `INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, explanation, order_index)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [quizId, q.question, JSON.stringify(q.options), q.correctAnswer, q.explanation || '', qi]
          );
        }
      }
    }
  }

  // Blogs
  const blogs = [
    {
      title: 'What Is Hypnotherapy?',
      excerpt: 'Hypnotherapy might sound mysterious, but in reality it is quite simple and very human.',
      content: 'Hypnotherapy might sound mysterious, like something out of a movie, but in reality it is quite simple and very human. At its core, hypnotherapy is a guided process that helps you relax deeply and focus your mind so you can work on thoughts, habits, or emotions that are hard to change when you are stressed or distracted.',
      category: 'Hypnotherapy',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'Dr. Priya Sharma',
    },
    {
      title: 'The Rise of Holistic Mental Health',
      excerpt: 'Understanding the interconnected relationship between mind, body, and social environment.',
      content: 'In recent years, the concept of holistic mental health has been redefining the way we approach well-being. Mental wellness in 2025 is about understanding the interconnected relationship between the mind, body, and social environment.',
      category: 'Holistic Health',
      image: 'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'MindSpa Team',
    },
    {
      title: 'Stress, Anxiety & Depression – Self-Help Strategies',
      excerpt: 'Science-backed, actionable self-help strategies tailored for everyday life.',
      content: 'India stands at the crossroads of ancient wisdom and modern living. As urbanisation rises and digital life accelerates, stress, anxiety, and depression have become common mental health challenges for millions.',
      category: 'Self-Help',
      image: 'https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'Dr. Priya Sharma',
    },
  ];

  for (const b of blogs) {
    await db.run(
      'INSERT INTO blogs (title, excerpt, content, category, image, author, published_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [b.title, b.excerpt, b.content, b.category, b.image, b.author, now]
    );
  }
}

module.exports = { db, init };
