// Zod es el equivalente a Pydantic en Python: define y valida el shape del objeto.
// Cada campo refleja exactamente el contrato del endpoint POST /api/candidates.

import { z } from 'zod';

export const candidateSchema = z.object({
  firstName: z
    .string({ required_error: 'El nombre es obligatorio' })
    .min(1, 'El nombre es obligatorio')
    .max(100, 'El nombre no puede exceder 100 caracteres'),

  lastName: z
    .string({ required_error: 'El apellido es obligatorio' })
    .min(1, 'El apellido es obligatorio')
    .max(100, 'El apellido no puede exceder 100 caracteres'),

  email: z
    .string({ required_error: 'El email es obligatorio' })
    .min(1, 'El email es obligatorio')
    .email('Email inválido'),

  phone: z
    .string()
    .min(7, 'El teléfono debe tener al menos 7 caracteres')
    .max(30, 'El teléfono no puede exceder 30 caracteres')
    .optional()
    .or(z.literal('')),

  address: z
    .string()
    .max(500, 'La dirección no puede exceder 500 caracteres')
    .optional()
    .or(z.literal('')),

  education: z
    .string()
    .max(5000, 'La educación no puede exceder 5000 caracteres')
    .optional()
    .or(z.literal('')),

  workExperience: z
    .string()
    .max(5000, 'La experiencia laboral no puede exceder 5000 caracteres')
    .optional()
    .or(z.literal('')),
});

export type CandidateInput = z.infer<typeof candidateSchema>;
