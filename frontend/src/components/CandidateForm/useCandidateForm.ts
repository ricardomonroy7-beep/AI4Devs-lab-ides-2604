// Custom hook — equivalente a una clase de servicio en Python que mantiene estado
// interno. Separa la lógica del componente visual (CandidateForm.tsx).

import { useState, useCallback } from 'react';
import { CandidateFormData, FormErrors, ToastType } from '../../types/candidate';
import { submitCandidate } from '../../services/api';

const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_FORM: CandidateFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  education: '',
  workExperience: '',
};

function validateField(name: keyof CandidateFormData, value: string): string | undefined {
  switch (name) {
    case 'firstName':
      if (!value.trim()) return 'El nombre es obligatorio';
      if (value.length > 100) return 'Máximo 100 caracteres';
      break;
    case 'lastName':
      if (!value.trim()) return 'El apellido es obligatorio';
      if (value.length > 100) return 'Máximo 100 caracteres';
      break;
    case 'email':
      if (!value.trim()) return 'El email es obligatorio';
      if (!EMAIL_REGEX.test(value)) return 'Ingresa un email válido';
      break;
    case 'phone':
      if (value.trim() && (value.trim().length < 7 || value.trim().length > 30))
        return 'Teléfono: entre 7 y 30 caracteres';
      break;
    case 'address':
      if (value.length > 500) return 'Máximo 500 caracteres';
      break;
    case 'education':
    case 'workExperience':
      if (value.length > 5000) return 'Máximo 5000 caracteres';
      break;
    default:
      break;
  }
  return undefined;
}

function validateFile(file: File | null): string | undefined {
  if (!file) return undefined;
  if (!ALLOWED_FILE_TYPES.includes(file.type)) return 'Solo PDF o DOCX, máximo 5 MB';
  if (file.size > MAX_FILE_SIZE) return 'El archivo excede el tamaño máximo de 5 MB';
  return undefined;
}

export interface ToastState {
  message: string;
  type: ToastType;
}

export function useCandidateForm(onSuccess: () => void) {
  const [formData, setFormData] = useState<CandidateFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  // Rastrear campos que el usuario ya tocó — validación inline solo en campos tocados
  const [touched, setTouched] = useState<Partial<Record<keyof CandidateFormData, boolean>>>({});

  // Calcula si el form es válido (solo campos obligatorios)
  const isFormValid =
    !validateField('firstName', formData.firstName) &&
    !validateField('lastName', formData.lastName) &&
    !validateField('email', formData.email) &&
    !validateFile(cvFile);

  const handleChange = useCallback(
    (name: keyof CandidateFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Validación inline: solo si el campo ya fue tocado
      if (touched[name]) {
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [touched],
  );

  const handleBlur = useCallback((name: keyof CandidateFormData) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, formData[name]),
    }));
  }, [formData]);

  const handleFileChange = useCallback((file: File | null) => {
    setCvFile(file);
    const error = validateFile(file);
    setErrors((prev) => ({ ...prev, cv: error }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setCvFile(null);
    setTouched({});
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Validar todos los campos antes de enviar
      const allErrors: FormErrors = {};
      (Object.keys(formData) as (keyof CandidateFormData)[]).forEach((key) => {
        const err = validateField(key, formData[key]);
        if (err) allErrors[key] = err;
      });
      const cvError = validateFile(cvFile);
      if (cvError) allErrors.cv = cvError;

      if (Object.keys(allErrors).length > 0) {
        setErrors(allErrors);
        return;
      }

      setIsSubmitting(true);
      try {
        const response = await submitCandidate(formData, cvFile ?? undefined);

        if (response.success) {
          setToast({ message: 'Candidato añadido exitosamente', type: 'success' });
          resetForm();
          // Volver al dashboard después de 1.5s (toast dura 4s)
          setTimeout(onSuccess, 1500);
          return;
        }

        // Errores del backend
        if (response.error === 'EMAIL_ALREADY_EXISTS') {
          setErrors({ email: 'Este correo ya está registrado' });
          return;
        }

        if (response.error === 'VALIDATION_ERROR' && response.details) {
          const backendErrors: FormErrors = {};
          response.details.forEach((d) => {
            backendErrors[d.field as keyof FormErrors] = d.message;
          });
          setErrors(backendErrors);
          return;
        }

        // Error genérico del servidor
        setToast({
          message: response.message ?? 'Error al guardar el candidato',
          type: 'error',
        });
      } catch (_err) {
        // Error de red / servidor caído
        setToast({
          message: 'No pudimos guardar el candidato. Verifica tu conexión e inténtalo de nuevo.',
          type: 'error',
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, cvFile, resetForm, onSuccess],
  );

  return {
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
  };
}
