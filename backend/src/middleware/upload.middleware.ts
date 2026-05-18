// Multer es el equivalente a werkzeug FileStorage en Flask/Python:
// intercepta multipart/form-data y pone el archivo en req.file.

import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB en bytes

// Almacenamiento en disco: carpeta uploads/ relativa al proceso (backend/)
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (_req, file, cb) => {
    // Nombre único: timestamp-random + extensión original → evita colisiones
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

// Filtro de tipo MIME: rechaza todo lo que no sea PDF o DOCX
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('INVALID_MIME_TYPE'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
});
