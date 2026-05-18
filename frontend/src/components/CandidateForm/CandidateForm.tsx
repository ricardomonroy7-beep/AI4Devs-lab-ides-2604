import React from 'react';
import styles from './CandidateForm.module.css';
import { useCandidateForm } from './useCandidateForm';
import AutocompleteInput from '../AutocompleteInput/AutocompleteInput';
import FileUpload from '../FileUpload/FileUpload';
import Toast from '../Toast/Toast';
import { EDUCATION_SUGGESTIONS, WORK_EXPERIENCE_SUGGESTIONS } from '../../data/suggestions';

interface CandidateFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

const CandidateForm: React.FC<CandidateFormProps> = ({ onCancel, onSuccess }) => {
  const {
    formData,
    errors,
    cvFile,
    isSubmitting,
    isFormValid,
    toast,
    handleChange,
    handleBlur,
    handleFileChange,
    handleSubmit,
    resetForm,
    dismissToast,
  } = useCandidateForm(onSuccess);

  const handleCancel = () => {
    const hasDirtyData =
      Object.values(formData).some((v) => v.trim() !== '') || cvFile !== null;
    if (hasDirtyData) {
      if (window.confirm('¿Seguro que deseas cancelar? Se perderán los datos ingresados.')) {
        resetForm();
        onCancel();
      }
    } else {
      onCancel();
    }
  };

  // Helper para renderizar campos de texto simples (reutilizable)
  const renderField = (
    name: keyof typeof formData,
    label: string,
    type: string = 'text',
    required: boolean = false,
  ) => {
    const id = name;
    const errorId = `${id}-error`;
    return (
      <div className={styles.fieldGroup}>
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.required} aria-hidden="true"> *</span>}
        </label>
        <input
          id={id}
          name={id}
          type={type}
          className={`${styles.input} ${errors[name] ? styles.invalid : ''}`}
          value={formData[name]}
          onChange={(e) => handleChange(name, e.target.value)}
          onBlur={() => handleBlur(name)}
          aria-required={required}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? errorId : undefined}
          disabled={isSubmitting}
          autoComplete={type === 'email' ? 'email' : undefined}
        />
        {errors[name] && (
          <span id={errorId} className={styles.errorMsg} role="alert">
            {errors[name]}
          </span>
        )}
      </div>
    );
  };

  return (
    <>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={dismissToast} />
      )}

      <form
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate
        aria-label="Formulario de nuevo candidato"
      >
        <h2 className={styles.title}>Nuevo candidato</h2>

        <div className={styles.row}>
          {renderField('firstName', 'Nombre', 'text', true)}
          {renderField('lastName', 'Apellido', 'text', true)}
        </div>

        {renderField('email', 'Correo electrónico', 'email', true)}
        {renderField('phone', 'Teléfono')}
        {renderField('address', 'Dirección')}

        <AutocompleteInput
          id="education"
          label="Educación"
          value={formData.education}
          onChange={(v) => handleChange('education', v)}
          suggestions={EDUCATION_SUGGESTIONS}
          placeholder="Ej: UNAM — Facultad de Ingeniería, Ingeniería Civil, 2015"
          error={errors.education}
          rows={3}
        />

        <AutocompleteInput
          id="workExperience"
          label="Experiencia laboral"
          value={formData.workExperience}
          onChange={(v) => handleChange('workExperience', v)}
          suggestions={WORK_EXPERIENCE_SUGGESTIONS}
          placeholder="Ej: Software Engineer en Empresa X, 2018–2022"
          error={errors.workExperience}
          rows={4}
        />

        <FileUpload
          file={cvFile}
          onFileChange={handleFileChange}
          error={errors.cv}
        />

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className={styles.btnPrimary}
            disabled={!isFormValid || isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className={styles.spinner} aria-hidden="true" />
                Guardando...
              </>
            ) : (
              'Guardar candidato'
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default CandidateForm;
