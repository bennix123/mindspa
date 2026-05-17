import React from 'react';
import PageBanner from '../components/PageBanner';
import CurriculumContent from '../components/CurriculumContent';

function CurriculumPage() {
  return (
    <>
      <PageBanner
        title="Diploma in Clinical Hypnotherapy"
        subtitle="CHI-USA Certified · Full Course Curriculum"
      />

      <section style={{ padding: '60px 0 100px', background: '#fff' }}>
        <div className="container">
          <CurriculumContent showHeading={true} ctaTo="/contact" />
        </div>
      </section>
    </>
  );
}

export default CurriculumPage;
