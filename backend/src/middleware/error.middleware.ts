// Handler de errores global de Express.
// La firma de 4 parámetros (err, req, res, next) es lo que Express usa
// para identificarlo como error handler — equivalente a @app.errorhandler en Flask.

import { Request, Response, NextFunction } from 'express';

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  console.error('[ErrorMiddleware]', err.message);

  res.status(500).json({
    success: false,
    error: 'INTERNAL_ERROR',
    message: err.message ?? 'Error interno del servidor',
  });
}
