import React, { useState, useEffect } from 'react';
import { useLMS } from '../../context/LMSContext';

function Notes({ courseId, lessonId }) {
  const { getNote, saveNote } = useLMS();
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setText(getNote(courseId, lessonId));
    setSaved(false);
  }, [courseId, lessonId, getNote]);

  const handleSave = () => {
    saveNote(courseId, lessonId, text);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="lms-notes">
      <div className="lms-notes__header">
        <h4>📝 My Notes</h4>
        {saved && <span className="lms-notes__saved">Saved ✓</span>}
      </div>
      <textarea
        className="lms-notes__textarea"
        placeholder="Type your notes here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
      />
      <button className="lms-notes__save" onClick={handleSave}>
        Save Notes
      </button>
    </div>
  );
}

export default Notes;
