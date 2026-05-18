// Singleton PrismaClient — análogo a un módulo Python con estado de módulo compartido.
// Se instancia una sola vez al cargar el módulo; Express reutiliza esa instancia
// en todas las peticiones, evitando agotar las conexiones del pool.

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
