// Capa de acceso a BD — análogo a un repositorio/DAO en arquitecturas Python.
// Toda la lógica de Prisma vive aquí; el controlador no toca prisma directamente.

import prisma from '../lib/prisma';
import { CandidateInput } from '../schemas/candidate.schema';
import { Prisma } from '@prisma/client';

export interface DocumentData {
  fileName: string;
  filePath: string;
  mimeType: string;
  fileSize: number;
}

// prisma.$transaction garantiza atomicidad: si la inserción del Document falla,
// el Candidate también se revierte — equivalente a un bloque with db.begin() en Python.
export async function createCandidateWithDocument(
  candidateData: CandidateInput,
  documentData?: DocumentData,
) {
  return prisma.$transaction(async (tx) => {
    const candidate = await tx.candidate.create({
      data: {
        firstName: candidateData.firstName,
        lastName: candidateData.lastName,
        email: candidateData.email,
        phone: candidateData.phone || null,
        address: candidateData.address || null,
        education: candidateData.education || null,
        workExperience: candidateData.workExperience || null,
      },
    });

    let document = null;
    if (documentData) {
      document = await tx.document.create({
        data: {
          candidateId: candidate.id,
          fileName: documentData.fileName,
          filePath: documentData.filePath,
          mimeType: documentData.mimeType,
          fileSize: documentData.fileSize,
        },
      });
    }

    return { candidate, document };
  });
}

// Detecta si el error de Prisma es por email duplicado (código P2002 = unique constraint)
export function isUniqueConstraintError(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2002'
  );
}
