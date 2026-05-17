import React, { useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import { useLMS } from '../context/LMSContext';
import '../styles/LMS.css';

function Certificate() {
  const { courseId } = useParams();
  const { getCourse, getCertificate, user } = useLMS();
  const certRef = useRef(null);

  const course = getCourse(courseId);
  const cert = getCertificate(courseId);

  if (!course || !cert) {
    return <Navigate to="/dashboard" replace />;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <PageBanner title="Certificate of Completion" />
      <section className="lms-catalog">
        <div className="container">
          <div className="lms-cert-page">
            <div className="lms-cert" ref={certRef}>
              <div className="lms-cert__border">
                <div className="lms-cert__inner">
                  <div className="lms-cert__seal">🏆</div>
                  <h4 className="lms-cert__heading">Certificate of Completion</h4>
                  <div className="lms-cert__divider" />
                  <p className="lms-cert__presented">This certificate is presented to</p>
                  <h1 className="lms-cert__name">{user?.name || 'Student'}</h1>
                  <p className="lms-cert__for">for successfully completing the course</p>
                  <h2 className="lms-cert__course">{course.title}</h2>
                  <div className="lms-cert__details">
                    <div>
                      <small>Instructor</small>
                      <strong>{course.instructor}</strong>
                    </div>
                    <div>
                      <small>Date</small>
                      <strong>
                        {new Date(cert.completedAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </strong>
                    </div>
                    <div>
                      <small>Duration</small>
                      <strong>{course.duration}</strong>
                    </div>
                  </div>
                  <div className="lms-cert__footer">
                    <div className="lms-cert__signature">
                      <div className="lms-cert__sig-line">MindSpa India</div>
                      <small>Authorized Signature</small>
                    </div>
                    <div className="lms-cert__id">
                      <small>Certificate ID</small>
                      <strong>{cert.certificateId}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lms-cert-actions">
              <button onClick={handlePrint} className="btn-primary">
                Print / Save PDF
              </button>
              <Link to="/dashboard" className="btn-outline">
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Certificate;
