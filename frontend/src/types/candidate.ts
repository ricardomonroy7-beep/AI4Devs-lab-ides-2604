// Tipos TypeScript para el dominio de candidatos.
// Equivalente a un dataclass en Python: define el shape de los objetos
// que fluyen entre componentes, hooks y el servicio API.

export interface CandidateFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  education: string;
  workExperience: string;
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  education?: string;
  workExperience?: string;
  cv?: string;
}

export interface ApiSuccessResponse {
  success: true;
  data: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    document: { id: number; fileName: string } | null;
  };
}

export interface ApiErrorDetail {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  error: 'VALIDATION_ERROR' | 'EMAIL_ALREADY_EXISTS' | 'INVALID_FILE' | 'INTERNAL_ERROR';
  details?: ApiErrorDetail[];
  message?: string;
}

export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

export type ToastType = 'success' | 'error';
