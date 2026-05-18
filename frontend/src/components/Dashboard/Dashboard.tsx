import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import CandidateForm from '../CandidateForm/CandidateForm';

const Dashboard: React.FC = () => {
  // showForm controla la visibilidad del formulario — equivale a una variable
  // de estado booleana en Python que dispara re-renders del componente.
  const [showForm, setShowForm] = useState(false);

  const handleAddCandidate = () => setShowForm(true);

  const handleCancel = () => setShowForm(false);

  const handleSuccess = () => {
    // El toast ya se muestra desde CandidateForm; aquí solo ocultamos el form
    setShowForm(false);
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Dashboard del Reclutador</h1>
          <p className={styles.subtitle}>Sistema de seguimiento de candidatos — LTI ATS</p>
        </div>

        {!showForm && (
          <button
            className={styles.addBtn}
            onClick={handleAddCandidate}
            aria-label="Abrir formulario para añadir candidato"
          >
            + Añadir candidato
          </button>
        )}
      </header>

      {/* Formulario con transición fade-in */}
      <section
        className={`${styles.formSection} ${showForm ? styles.formVisible : ''}`}
        aria-live="polite"
        aria-label="Sección de nuevo candidato"
      >
        {showForm && (
          <CandidateForm onCancel={handleCancel} onSuccess={handleSuccess} />
        )}
      </section>

      {!showForm && (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>
            Haz clic en <strong>"+ Añadir candidato"</strong> para registrar un nuevo candidato en el sistema.
          </p>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
