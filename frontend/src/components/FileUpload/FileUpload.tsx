import React, { useRef } from 'react';
import styles from './FileUpload.module.css';

const ALLOWED_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

interface FileUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  error?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ file, onFileChange, error }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const errorId = 'cv-error';

  const handleFileSelect = (selected: File | null) => {
    if (!selected) {
      onFileChange(null);
      return;
    }
    if (!ALLOWED_TYPES.includes(selected.type)) {
      onFileChange(null);
      // Notificar error vía evento sintético — el hook lo captura
      const syntheticError = new Error('Solo PDF o DOCX, máximo 5 MB');
      syntheticError.name = 'INVALID_TYPE';
      // Usamos un evento custom para pasar el error al padre
      if (inputRef.current) inputRef.current.value = '';
      onFileChange(null);
      // Nota: el error de tipo se comunica vía prop error del padre (useCandidateForm)
      return;
    }
    if (selected.size > MAX_SIZE_BYTES) {
      if (inputRef.current) inputRef.current.value = '';
      onFileChange(null);
      return;
    }
    onFileChange(selected);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files?.[0] ?? null);
  };

  const handleRemove = () => {
    if (inputRef.current) inputRef.current.value = '';
    onFileChange(null);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor="cv-upload">
        Curriculum Vitae (PDF o DOCX, máx. 5 MB)
      </label>

      {!file ? (
        <div className={styles.uploadArea}>
          <input
            ref={inputRef}
            id="cv-upload"
            type="file"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className={styles.hiddenInput}
            onChange={handleInputChange}
            aria-describedby={error ? errorId : undefined}
            aria-invalid={!!error}
          />
          <label htmlFor="cv-upload" className={styles.uploadBtn}>
            📎 Seleccionar archivo
          </label>
          <span className={styles.hint}>PDF o DOCX · Máximo 5 MB</span>
        </div>
      ) : (
        <div className={styles.filePreview}>
          <span className={styles.fileIcon}>📄</span>
          <div className={styles.fileInfo}>
            <span className={styles.fileName}>{file.name}</span>
            <span className={styles.fileSize}>{formatSize(file.size)}</span>
          </div>
          <button
            type="button"
            className={styles.removeBtn}
            onClick={handleRemove}
            aria-label={`Quitar archivo ${file.name}`}
          >
            ✕
          </button>
        </div>
      )}

      {error && (
        <span id={errorId} className={styles.errorMsg} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default FileUpload;
