// Servicio de comunicación con el backend.
// Análogo a un cliente HTTP en Python (requests/httpx):
// encapsula el fetch, construye el FormData y tipifica la respuesta.

import { ApiResponse, CandidateFormData } from '../types/candidate';

const API_BASE_URL = 'http://localhost:3010';

export async function submitCandidate(
  formData: CandidateFormData,
  cvFile?: File,
): Promise<ApiResponse> {
  const body = new FormData();

  // Añadir todos los campos de texto — FormData es el equivalente a requests.post(data=...)
  body.append('firstName', formData.firstName.trim());
  body.append('lastName', formData.lastName.trim());
  body.append('email', formData.email.trim());
  if (formData.phone.trim()) body.append('phone', formData.phone.trim());
  if (formData.address.trim()) body.append('address', formData.address.trim());
  if (formData.education.trim()) body.append('education', formData.education.trim());
  if (formData.workExperience.trim()) body.append('workExperience', formData.workExperience.trim());
  if (cvFile) body.append('cv', cvFile);

  // Timeout de 15 segundos usando AbortController
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(`${API_BASE_URL}/api/candidates`, {
      method: 'POST',
      body,
      signal: controller.signal,
      // No poner Content-Type: fetch lo setea automáticamente con el boundary correcto
    });

    clearTimeout(timeoutId);

    const json: ApiResponse = await response.json();
    return json;
  } catch (error) {
    clearTimeout(timeoutId);
    // Error de red (servidor caído, timeout, CORS) → lanza para que el hook lo capture
    throw error;
  }
}
