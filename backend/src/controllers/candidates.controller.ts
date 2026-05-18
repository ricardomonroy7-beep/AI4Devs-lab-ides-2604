// Controlador — análogo al view en Django o al endpoint en FastAPI.
// Orquesta: valida payload con Zod → persiste con el servicio → responde JSON.

import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import { candidateSchema } from '../schemas/candidate.schema';
import {
  createCandidateWithDocument,
  isUniqueConstraintError,
} from '../services/candidates.service';

export async function createCandidate(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const uploadedFilePath = req.file?.path;

  try {
    // Validación Zod del payload de texto (los campos del form, no el archivo)
    const parseResult = candidateSchema.safeParse(req.body);

    if (!parseResult.success) {
      // Si multer ya subió un archivo y la validación falla → limpiarlo del disco
      if (uploadedFilePath) {
        fs.unlinkSync(uploadedFilePath);
      }
      const details = parseResult.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      res.status(400).json({
        success: false,
        error: 'VALIDATION_ERROR',
        details,
      });
      return;
    }

    // Preparar datos del documento si se subió un archivo
    const documentData = req.file
      ? {
          fileName: req.file.originalname,
          filePath: req.file.path.replace(/\\/g, '/'), // normalizar rutas en Windows
          mimeType: req.file.mimetype,
          fileSize: req.file.size,
        }
      : undefined;

    const { candidate, document } = await createCandidateWithDocument(
      parseResult.data,
      documentData,
    );

    res.status(201).json({
      success: true,
      data: {
        id: candidate.id,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        email: candidate.email,
        createdAt: candidate.createdAt,
        document: document
          ? { id: document.id, fileName: document.fileName }
          : null,
      },
    });
  } catch (error) {
    // Email duplicado → 409 Conflict
    if (isUniqueConstraintError(error)) {
      if (uploadedFilePath && fs.existsSync(uploadedFilePath)) {
        fs.unlinkSync(uploadedFilePath);
      }
      res.status(409).json({
        success: false,
        error: 'EMAIL_ALREADY_EXISTS',
      });
      return;
    }
    // Cualquier otro error → delegar al error middleware global
    next(error);
  }
}
