import React, { useEffect } from 'react';
import styles from './Toast.module.css';
import { ToastType } from '../../types/candidate';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  /** Duración en ms antes de cerrar automáticamente (default: 4000) */
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer); // limpia si el componente se desmonta antes
  }, [onClose, duration]);

  return (
    <div
      className={`${styles.toast} ${type === 'success' ? styles.success : styles.error}`}
      role="alert"
      aria-live="assertive"
    >
      <span className={styles.icon}>{type === 'success' ? '✓' : '✕'}</span>
      <span className={styles.message}>{message}</span>
      <button
        className={styles.closeBtn}
        onClick={onClose}
        aria-label="Cerrar notificación"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
