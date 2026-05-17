import React, { useRef, useState, useEffect } from 'react';
import api, { fileUrl } from '../../utils/api';

// ── URL helpers ─────────────────────────────────────────────────────
const YT_REGEX = /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
const DRIVE_REGEX = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;

const detectSource = (url) => {
  if (!url) return 'upload';
  if (url.startsWith('/uploads/') || /\.(mp4|webm|mov|m4v|mkv)$/i.test(url)) return 'upload';
  if (YT_REGEX.test(url) || url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  if (DRIVE_REGEX.test(url) || url.includes('drive.google.com')) return 'drive';
  return 'upload';
};

const normalizeYouTube = (url) => {
  const match = url.match(YT_REGEX);
  if (match) return `https://www.youtube.com/embed/${match[1]}`;
  return null;
};

const normalizeDrive = (url) => {
  const match = url.match(DRIVE_REGEX);
  if (match) return `https://drive.google.com/file/d/${match[1]}/preview`;
  return null;
};

// ── Component ───────────────────────────────────────────────────────
function VideoSourceInput({ value, onChange }) {
  const [source, setSource] = useState(() => detectSource(value));
  const [ytInput, setYtInput] = useState(
    detectSource(value) === 'youtube' ? value : ''
  );
  const [driveInput, setDriveInput] = useState(
    detectSource(value) === 'drive' ? value : ''
  );
  const [ytError, setYtError] = useState('');
  const [driveError, setDriveError] = useState('');

  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');

  // Keep local state in sync when switching lessons
  useEffect(() => {
    const detected = detectSource(value);
    setSource(detected);
    if (detected === 'youtube') setYtInput(value || '');
    if (detected === 'drive') setDriveInput(value || '');
  }, [value]);

  // ── Upload handlers ───────────────────────────────────────────
  const handleFile = async (file) => {
    if (!file) return;
    setUploadError('');
    setUploading(true);
    setProgress(0);
    try {
      const result = await api.uploadFile(file, setProgress);
      onChange(result.url);
      setSource('upload');
    } catch (e) {
      setUploadError(e.message);
    } finally {
      setUploading(false);
      setProgress(0);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  // ── YouTube handlers ──────────────────────────────────────────
  const applyYouTube = () => {
    setYtError('');
    if (!ytInput.trim()) {
      onChange('');
      return;
    }
    const embed = normalizeYouTube(ytInput.trim());
    if (!embed) {
      setYtError('Invalid YouTube URL. Paste a watch or share link.');
      return;
    }
    onChange(embed);
  };

  const applyDrive = () => {
    setDriveError('');
    if (!driveInput.trim()) {
      onChange('');
      return;
    }
    const embed = normalizeDrive(driveInput.trim());
    if (!embed) {
      setDriveError('Invalid Google Drive URL. Paste a file share link.');
      return;
    }
    onChange(embed);
  };

  const clearValue = () => {
    onChange('');
    setYtInput('');
    setDriveInput('');
  };

  // ── Preview ───────────────────────────────────────────────────
  const renderPreview = () => {
    if (!value) return null;
    const currentSource = detectSource(value);

    return (
      <div className="video-src__preview">
        {currentSource === 'upload' && (
          <video
            src={fileUrl(value)}
            controls
            style={{ width: '100%', maxHeight: 240, borderRadius: 6, background: '#000' }}
          />
        )}
        {currentSource === 'youtube' && (
          <iframe
            title="YouTube preview"
            src={value}
            allowFullScreen
            style={{ width: '100%', height: 240, border: 'none', borderRadius: 6 }}
          />
        )}
        {currentSource === 'drive' && (
          <iframe
            title="Drive preview"
            src={value}
            allow="autoplay"
            allowFullScreen
            style={{ width: '100%', height: 240, border: 'none', borderRadius: 6 }}
          />
        )}
        <div className="video-src__preview-meta">
          <span className="video-src__badge">
            {currentSource === 'upload' && '📁 Uploaded File'}
            {currentSource === 'youtube' && '▶ YouTube'}
            {currentSource === 'drive' && '☁ Google Drive'}
          </span>
          <code>{value}</code>
          <button type="button" className="video-src__clear" onClick={clearValue}>
            Remove
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="video-src">
      <label className="video-src__label">Lesson Video</label>

      {renderPreview()}

      <div className="video-src__tabs">
        <button
          type="button"
          className={`video-src__tab ${source === 'upload' ? 'active' : ''}`}
          onClick={() => setSource('upload')}
        >
          <span>🎬</span> Upload File
        </button>
        <button
          type="button"
          className={`video-src__tab ${source === 'youtube' ? 'active' : ''}`}
          onClick={() => setSource('youtube')}
        >
          <span>▶</span> YouTube
        </button>
        <button
          type="button"
          className={`video-src__tab ${source === 'drive' ? 'active' : ''}`}
          onClick={() => setSource('drive')}
        >
          <span>☁</span> Google Drive
        </button>
      </div>

      <div className="video-src__panel">
        {source === 'upload' && (
          <>
            <div
              className="video-src__dropzone"
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
              onDrop={handleDrop}
            >
              {uploading ? (
                <div className="video-src__progress">
                  <div className="video-src__bar">
                    <div className="video-src__bar-fill" style={{ width: `${progress}%` }} />
                  </div>
                  <span>Uploading... {progress}%</span>
                </div>
              ) : (
                <>
                  <span className="video-src__icon">🎬</span>
                  <span>
                    <strong>Click to upload</strong> or drag and drop
                  </span>
                  <span className="video-src__hint">
                    MP4, WebM, MOV, MKV · Max 200 MB
                  </span>
                </>
              )}
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="video/*"
              style={{ display: 'none' }}
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            {uploadError && <div className="video-src__error">{uploadError}</div>}
          </>
        )}

        {source === 'youtube' && (
          <div className="video-src__url-panel">
            <div className="video-src__url-row">
              <input
                type="text"
                placeholder="https://www.youtube.com/watch?v=..."
                value={ytInput}
                onChange={(e) => setYtInput(e.target.value)}
                onBlur={applyYouTube}
              />
              <button type="button" className="video-src__apply" onClick={applyYouTube}>
                Apply
              </button>
            </div>
            <p className="video-src__help">
              Paste any YouTube link (watch, share, or embed). It will be converted
              automatically to the embed format.
            </p>
            {ytError && <div className="video-src__error">{ytError}</div>}
          </div>
        )}

        {source === 'drive' && (
          <div className="video-src__url-panel">
            <div className="video-src__url-row">
              <input
                type="text"
                placeholder="https://drive.google.com/file/d/FILE_ID/view?usp=sharing"
                value={driveInput}
                onChange={(e) => setDriveInput(e.target.value)}
                onBlur={applyDrive}
              />
              <button type="button" className="video-src__apply" onClick={applyDrive}>
                Apply
              </button>
            </div>
            <p className="video-src__help">
              Paste a Google Drive share link. <strong>Important:</strong> The file
              must be set to <em>"Anyone with the link → Viewer"</em> in Drive's
              share settings for students to watch it.
            </p>
            {driveError && <div className="video-src__error">{driveError}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoSourceInput;
