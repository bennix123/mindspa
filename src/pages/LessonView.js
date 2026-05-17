import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useLMS } from '../context/LMSContext';
import { fileUrl } from '../utils/api';
import Notes from '../components/LMS/Notes';
import Discussion from '../components/LMS/Discussion';
import '../styles/LMS.css';

function LessonView() {
  const { courseId, lessonId } = useParams();
  const {
    getCourse,
    fetchCourseDetail,
    isEnrolled,
    isLessonCompleted,
    toggleLessonComplete,
    getAllLessonsFlat,
    getCourseProgress,
    isBookmarked,
    toggleBookmark,
    getResources,
    loading,
  } = useLMS();

  const [detailLoaded, setDetailLoaded] = useState(false);

  useEffect(() => {
    fetchCourseDetail(courseId).then(() => setDetailLoaded(true));
  }, [courseId, fetchCourseDetail]);

  if (loading || !detailLoaded) {
    return (
      <section className="lms-lesson">
        <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-light)' }}>Loading lesson...</p>
        </div>
      </section>
    );
  }

  const course = getCourse(courseId);

  if (!course || !isEnrolled(courseId)) {
    return <Navigate to={`/courses/${courseId || ''}`} replace />;
  }

  const allLessons = getAllLessonsFlat(courseId);
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const lesson = allLessons[currentIndex];

  if (!lesson) return <Navigate to={`/courses/${courseId}`} replace />;

  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const done = isLessonCompleted(courseId, lessonId);
  const progress = getCourseProgress(courseId);
  const bookmarked = isBookmarked(courseId, lessonId);
  const resources = getResources(lessonId);

  let moduleName = '';
  for (const mod of course.modules) {
    if (mod.lessons.some((l) => l.id === lessonId)) {
      moduleName = mod.title;
      break;
    }
  }

  return (
    <section className="lms-lesson">
      <div className="container">
        <div style={{ marginBottom: 20, fontSize: 13, color: 'var(--text-light)' }}>
          <Link to="/courses" style={{ color: 'var(--accent)' }}>Courses</Link>{' '}
          /{' '}
          <Link to={`/courses/${courseId}`} style={{ color: 'var(--accent)' }}>
            {course.title}
          </Link>{' '}
          / {lesson.title}
        </div>

        <div className="lms-lesson__layout">
          <div className="lms-lesson__main">
            {lesson.type === 'video' && lesson.videoUrl && (
              <div className="lms-lesson__video">
                {(() => {
                  const url = lesson.videoUrl;
                  const isUpload = url.startsWith('/uploads/') || /\.(mp4|webm|mov|m4v|mkv)$/i.test(url);
                  const isDrive = url.includes('drive.google.com');
                  if (isUpload) {
                    return (
                      <video
                        src={fileUrl(url)}
                        controls
                        controlsList="nodownload"
                        style={{ width: '100%', height: '100%' }}
                      >
                        Your browser does not support video playback.
                      </video>
                    );
                  }
                  return (
                    <iframe
                      src={url}
                      title={lesson.title}
                      allow={isDrive ? 'autoplay' : 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'}
                      allowFullScreen
                    />
                  );
                })()}
              </div>
            )}

            <div className="lms-lesson__header">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <div>
                  <h1>{lesson.title}</h1>
                  <p>
                    {moduleName} &middot; {lesson.duration} &middot;{' '}
                    {lesson.type === 'video' ? 'Video Lesson' : 'Reading'}
                  </p>
                </div>
                <button
                  className="lms-bookmark-btn"
                  onClick={() => toggleBookmark(courseId, lessonId)}
                  title={bookmarked ? 'Remove bookmark' : 'Bookmark this lesson'}
                >
                  {bookmarked ? '🔖' : '📑'}
                </button>
              </div>
            </div>

            <div className="lms-lesson__text-content">{lesson.content}</div>

            {/* Resources */}
            {resources.length > 0 && (
              <div className="lms-resources">
                <h4>📂 Resources</h4>
                <ul>
                  {resources.map((r, i) => (
                    <li key={i}>
                      <a href={r.url} download>
                        📄 {r.name} <span>({r.size})</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="lms-lesson__actions">
              <div style={{ display: 'flex', gap: 10 }}>
                {prevLesson && (
                  <Link
                    to={`/courses/${courseId}/learn/${prevLesson.id}`}
                    className="lms-lesson__nav-btn lms-lesson__nav-btn--prev"
                  >
                    ← Previous
                  </Link>
                )}
                {nextLesson && (
                  <Link
                    to={`/courses/${courseId}/learn/${nextLesson.id}`}
                    className="lms-lesson__nav-btn lms-lesson__nav-btn--next"
                  >
                    Next →
                  </Link>
                )}
              </div>

              <button
                className={`lms-lesson__complete-btn ${
                  done ? 'lms-lesson__complete-btn--undo' : 'lms-lesson__complete-btn--done'
                }`}
                onClick={() => toggleLessonComplete(courseId, lessonId)}
              >
                {done ? '✓ Completed' : 'Mark as Complete'}
              </button>
            </div>

            {/* Notes */}
            <Notes courseId={courseId} lessonId={lessonId} />

            {/* Discussion */}
            <Discussion lessonId={lessonId} />
          </div>

          <div className="lms-lesson__sidebar">
            <div className="lms-lesson__sidebar-header">
              <h3>{course.title}</h3>
              <span>{progress}% complete</span>
              <div className="lms-progress" style={{ marginTop: 8 }}>
                <div className="lms-progress__fill" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {allLessons.map((l) => {
              const isActive = l.id === lessonId;
              const isDone = isLessonCompleted(courseId, l.id);
              return (
                <Link
                  key={l.id}
                  to={`/courses/${courseId}/learn/${l.id}`}
                  className={`lms-sidebar-lesson ${isActive ? 'active' : ''}`}
                >
                  <span className={`lms-sidebar-lesson__check ${isDone ? 'done' : ''}`}>
                    {isDone ? '✓' : ''}
                  </span>
                  <div className="lms-sidebar-lesson__info">
                    <div className="lms-sidebar-lesson__title">{l.title}</div>
                    <div className="lms-sidebar-lesson__dur">{l.duration}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LessonView;
