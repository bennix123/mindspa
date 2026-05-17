import React, { useRef, useState } from 'react';
import api, { fileUrl } from '../../utils/api';

/**
 * Reusable file upload field for admin forms.
 *
 * Props:
 *  - value: current URL string (uploaded path or external URL)
 *  - onChange: called with the new URL string
 *  - accept: 'image' | 'video' | 'image,video'
 *  - label: field label
 */
function FileUpload({ value, onChange, accept = 'image', label = 'Upload File' }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const acceptString = (() => {
    const parts = [];
    if (accept.includes('image')) parts.push('image/*');
    if (accept.includes('video')) parts.push('video/*');
    return parts.join(',');
  })();

  const handleFile = async (file) => {
    if (!file) return;
    setError('');
    setUploading(true);
    setProgress(0);
    try {
      const result = await api.uploadFile(file, setProgress);
      onChange(result.url);
    } catch (e) {
      setError(e.message);
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

  const isVideo = value && /\.(mp4|webm|mov|m4v|mkv)$/i.test(value);
  const isImage = value && (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(value) || value.includes('pexels.com') || value.includes('unsplash.com'));
  const isYoutube = value && /youtube\.com\/embed/.test(value);

  return (
    <div className="admin-upload">
      <label className="admin-upload__label">{label}</label>

      {value && (
        <div className="admin-upload__preview">
          {isVideo ? (
            <video src={fileUrl(value)} controls style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 6 }} />
          ) : isYoutube ? (
            <div className="admin-upload__youtube">
              <span>📹</span> YouTube embed: {value}
            </div>
          ) : isImage ? (
            <img src={fileUrl(value)} alt="" style={{ maxWidth: 200, maxHeight: 140, borderRadius: 6, objectFit: 'cover' }} />
          ) : (
            <div className="admin-upload__url">{value}</div>
          )}
          <button
            type="button"
            className="admin-upload__remove"
            onClick={() => onChange('')}
          >
            ✕ Remove
          </button>
        </div>
      )}

      <div
        className="admin-upload__dropzone"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
        onDrop={handleDrop}
      >
        {uploading ? (
          <div className="admin-upload__progress">
            <div className="admin-upload__bar">
              <div className="admin-upload__bar-fill" style={{ width: `${progress}%` }} />
            </div>
            <span>Uploading... {progress}%</span>
          </div>
        ) : (
          <>
            <span className="admin-upload__icon">{accept.includes('video') ? '🎬' : '🖼️'}</span>
            <span className="admin-upload__text">
              <strong>Click to upload</strong> or drag and drop
            </span>
            <span className="admin-upload__hint">
              {accept === 'image' && 'JPG, PNG, GIF, WebP, SVG (max 200MB)'}
              {accept === 'video' && 'MP4, WebM, MOV, MKV (max 200MB)'}
              {accept.includes('image') && accept.includes('video') && 'Image or video (max 200MB)'}
            </span>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={acceptString}
        onChange={(e) => handleFile(e.target.files?.[0])}
        style={{ display: 'none' }}
      />

      <div className="admin-upload__or">— or paste a URL —</div>
      <input
        type="text"
        className="admin-upload__url-input"
        placeholder="https://... (image URL or YouTube embed link)"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />

      {error && <div className="admin-upload__error">{error}</div>}
    </div>
  );
}

export default FileUpload;
