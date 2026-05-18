// Router Express — análogo a un Blueprint en Flask o un APIRouter en FastAPI.
// Define qué middleware corre antes del controlador (aquí: multer para el archivo cv).

import { Router, Request, Response, NextFunction } from 'express';
import { upload } from '../middleware/upload.middleware';
import { createCandidate } from '../controllers/candidates.controller';

const router = Router();

// Multer procesa el campo 'cv' (archivo único) antes de que llegue al controlador.
// Si el archivo supera 5MB o tiene tipo inválido, multer lanza un error que
// capturamos aquí antes de pasarlo al error middleware.
router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    upload.single('cv')(req, res, (err) => {
      if (err) {
        // Errores de multer: tipo inválido o tamaño excedido
        const message =
          err.message === 'INVALID_MIME_TYPE'
            ? 'Tipo de archivo no permitido. Solo se aceptan PDF y DOCX.'
            : err.message.includes('File too large')
              ? 'El archivo excede el tamaño máximo permitido de 5 MB.'
              : err.message;

        res.status(400).json({
          success: false,
          error: 'INVALID_FILE',
          message,
        });
        return;
      }
      next();
    });
  },
  createCandidate,
);

export default router;
