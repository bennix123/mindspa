// Centralized API client for the MindSpa LMS backend.

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';
const API_ROOT = API_BASE.replace(/\/api$/, '');
export const FILE_BASE = API_ROOT;
const TOKEN_KEY = 'mindspa_lms_token';

export const fileUrl = (urlOrPath) => {
  if (!urlOrPath) return '';
  if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) return urlOrPath;
  if (urlOrPath.startsWith('/uploads/')) return API_ROOT + urlOrPath;
  return urlOrPath;
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
};

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(data?.error || `Request failed: ${res.status}`);
  }
  return data;
}

// ── Auth ──────────────────────────────────────────────────────────
export const api = {
  // Auth
  register: (name, email, password) =>
    request('/auth/register', { method: 'POST', body: { name, email, password } }),
  login: (email, password) =>
    request('/auth/login', { method: 'POST', body: { email, password } }),
  me: () => request('/auth/me', { auth: true }),

  // Courses
  getCourses: () => request('/courses'),
  getCourse: (id) => request(`/courses/${id}`),
  createCourse: (data) => request('/courses', { method: 'POST', body: data, auth: true }),
  updateCourse: (id, data) =>
    request(`/courses/${id}`, { method: 'PUT', body: data, auth: true }),
  deleteCourse: (id) => request(`/courses/${id}`, { method: 'DELETE', auth: true }),

  // Modules
  createModule: (courseId, data) =>
    request(`/courses/${courseId}/modules`, { method: 'POST', body: data, auth: true }),
  updateModule: (id, data) =>
    request(`/modules/${id}`, { method: 'PUT', body: data, auth: true }),
  deleteModule: (id) => request(`/modules/${id}`, { method: 'DELETE', auth: true }),

  // Lessons
  createLesson: (moduleId, data) =>
    request(`/modules/${moduleId}/lessons`, { method: 'POST', body: data, auth: true }),
  updateLesson: (id, data) =>
    request(`/lessons/${id}`, { method: 'PUT', body: data, auth: true }),
  deleteLesson: (id) => request(`/lessons/${id}`, { method: 'DELETE', auth: true }),

  // Quizzes
  saveQuiz: (moduleId, data) =>
    request(`/modules/${moduleId}/quiz`, { method: 'POST', body: data, auth: true }),

  // Instructors
  getInstructors: () => request('/instructors'),
  createInstructor: (data) =>
    request('/instructors', { method: 'POST', body: data, auth: true }),
  updateInstructor: (id, data) =>
    request(`/instructors/${id}`, { method: 'PUT', body: data, auth: true }),
  deleteInstructor: (id) =>
    request(`/instructors/${id}`, { method: 'DELETE', auth: true }),

  // Blogs
  getBlogs: () => request('/blogs'),
  getBlog: (id) => request(`/blogs/${id}`),
  createBlog: (data) => request('/blogs', { method: 'POST', body: data, auth: true }),
  updateBlog: (id, data) =>
    request(`/blogs/${id}`, { method: 'PUT', body: data, auth: true }),
  deleteBlog: (id) => request(`/blogs/${id}`, { method: 'DELETE', auth: true }),

  // Enrollments
  getEnrollments: () => request('/enrollments', { auth: true }),
  enroll: (courseId) =>
    request('/enrollments', { method: 'POST', body: { courseId }, auth: true }),
  unenroll: (courseId) =>
    request(`/enrollments/${courseId}`, { method: 'DELETE', auth: true }),

  // Progress
  getProgress: () => request('/progress', { auth: true }),
  toggleLesson: (courseId, lessonId) =>
    request('/progress', { method: 'POST', body: { courseId, lessonId }, auth: true }),

  // Reviews
  getReviews: (courseId) => request(`/courses/${courseId}/reviews`),
  addReview: (courseId, rating, comment) =>
    request(`/courses/${courseId}/reviews`, {
      method: 'POST',
      body: { rating, comment },
      auth: true,
    }),

  // Certificates
  getCertificates: () => request('/certificates', { auth: true }),

  // Admin
  getUsers: () => request('/admin/users', { auth: true }),
  deleteUser: (id) => request(`/admin/users/${id}`, { method: 'DELETE', auth: true }),
  getStats: () => request('/admin/stats', { auth: true }),

  // Uploads (admin)
  uploadFile: async (file, onProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    const token = getToken();

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${API_BASE}/upload`);
      if (token) xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && onProgress) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      });
      xhr.onload = () => {
        try {
          const data = JSON.parse(xhr.responseText);
          if (xhr.status >= 200 && xhr.status < 300) resolve(data);
          else reject(new Error(data.error || `Upload failed (${xhr.status})`));
        } catch (e) {
          reject(new Error('Upload failed'));
        }
      };
      xhr.onerror = () => reject(new Error('Network error during upload'));
      xhr.send(formData);
    });
  },
  listUploads: () => request('/uploads', { auth: true }),
  deleteUpload: (filename) => request(`/upload/${filename}`, { method: 'DELETE', auth: true }),
};

export default api;
