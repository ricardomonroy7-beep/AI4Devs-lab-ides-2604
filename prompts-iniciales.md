# Prompts iniciales — Entrega B Módulo 3 AI4Devs

## Asistente IDE usado
Claude Code en VS Code, modelo Claude Sonnet 4.6.

---

## Contexto: Cómo se generó el Prompt #1 para Claude Code

Antes de escribir el prompt para Claude Code, se usó **Claude Opus 4.6 en claude.ai (chat)** para construirlo a partir de la siguiente instrucción de meta-prompting:

---

```
ANALIZA LA TAREA, LA INFORMACIÓN DISPONIBLE, EL ESTATUS ACTUAL DEL SISTEMA Y A PARTIR DE ESTA
INFORMACIÓN CREA UN PROMPT DRASTIC CON LA ESTRUCTURA DE TRABAJO PARA RESOLVER EL PROBLEMA,
PARA QUE CLAUDE CODE COMPLETE EL OBJETIVO:
PRIMERO LEA LA CARPETA DEL PROYECTO Y COMPRUEBE EL PLAN DE IMPLEMENTACIÓN, PARA DESPUÉS CREAR
LOS PRIMEROS TICKETS DE TRABAJO A FONDO Y CONTINUAR EL DESARROLLO A PARTIR DE AHÍ.

---

ANÁLISIS DEL PROCESO REALIZADO POR UN CHAT PREVIO (ANÁLISIS EN CURSOR CON AUTO):

🕐 Fase 2 — Entrega B: Ticket "Añadir Candidato" (3-4 horas)
Esta sí es PR sobre AI4Devs-lab-ides (el repo base de los mentores, no tu repo de LTI).

Hacer fork del repo AI4Devs-lab-ides → clonarlo aparte.
Leer su README para entender el stack que ya trae.
Definir los 3 tickets técnicos a fondo (BD, backend, frontend) ANTES de pedirle código a Claude Code.
La GUIA del módulo lo recomienda "encarecidamente": esto es Spec-Driven Development light.
Implementar en orden: BD → backend → frontend.
prompts-iniciales.md en la raíz con todos los prompts usados (igual que en los ejercicios anteriores).
Crear rama solved-RGD, commit, push, abrir PR con el prompt consolidado en la descripción.

Lo que vamos a usar de las skills tuyas:
drastic-prompt-optimizer → para construir el prompt consolidado de la Entrega B.

---

CONTEXTO DE TRASPASO — Entrega B Módulo 3 AI4Devs (PR Añadir Candidato)

Soy Ricardo, ingeniero estructural senior (9 años, Zapopan MX).
Vengo de un chat previo de preparación. Ya tengo todo instalado (Node.js,
Docker, Claude Code, Git, GitHub Desktop, VS Code). Voy directo a
trabajar la Entrega B porque tengo presión de tiempo y A la dejo para
después (orden invertido respecto al plan original).

## La tarea

Repo base provisto por LIDR: AI4Devs-lab-ides (NO es vacío, los
mentores ya configuraron un esqueleto fullstack).

Historia de usuario: "Añadir Candidato al Sistema"
- Como reclutador, quiero añadir candidatos al ATS para gestionar sus datos.

Criterios de aceptación (resumen del enunciado oficial):
1. Botón visible en dashboard del reclutador para "Añadir candidato"
2. Formulario con: nombre, apellido, email, teléfono, dirección,
   educación, experiencia laboral
3. Validación: email formato válido, campos obligatorios no vacíos
4. Carga de CV en PDF o DOCX
5. Mensaje de confirmación al guardar
6. Manejo de errores (fallo de conexión, etc.)
7. Accesible y compatible multi-dispositivo

Tareas técnicas implícitas: backend (endpoint POST + upload),
frontend (form + validaciones + upload), BD (tabla candidatos + tabla
educación + tabla experiencia + tabla documentos, con relaciones).

## Entregable

(SOLO LOS ARCHIVOS)
- Pull Request al repo AI4Devs-lab-ides
- Rama: solved-RMA
- Archivo prompts-iniciales.md en la raíz con todos los prompts usados
- En descripción del PR: pegar el prompt consolidado final
- Recordatorio: usar mis iniciales (RMA = Ricardo) en el nombre del PR

## Mis decisiones tomadas (no las re-cuestiones)

- Agente IA único: Claude Code (en VS Code o terminal, ya está instalado y autenticado). No Cursor, no OpenCode todavía.
- Filosofía: aprendo en demanda, no por adelantado.
- No soy dev nativo: ETABS, STAAD, Mathcad, Python sí. JS/React/SQL no.
  Trátame como ingeniero técnico competente aprendiendo dominio nuevo.

## Sobre lidr-specboot + OpenSpec

LIDR provee lidr-specboot como kit oficial para spec-driven dev en este máster.
Incluye agentes (backend, frontend, analista), skills (enrich-us, commit,
code-auditing, using-git-worktrees) y estándares para LTI/ATS.
Flujo recomendado por LIDR: /enrich-us → /ff → /apply → /verify → /archive → /commit

OpenSpec se instala con npm install -g @fission-ai/openspec@latest (requiere Node 20.19+).
Specboot se importa aparte.

Workflow del día:
   a. Fork del repo AI4Devs-lab-ides en mi GitHub
   b. Clone con GitHub Desktop a C:\Users\Ricardo\Documents\GitHub\
   c. Leer su README + estructura para entender qué ya viene hecho
   d. Levantar el proyecto local (backend + frontend + BD) y validar
      que arranca antes de tocar nada
   e. Definir los 3 tickets técnicos a fondo ANTES de pedir código
      (BD → backend → frontend). Esto es lo que el módulo recomienda "encarecidamente".
   f. Implementar en orden, cada ticket con Claude Code, validando que
      pasa antes de seguir al siguiente
   g. Tests manuales end-to-end
   h. Commit, push, PR con descripción que incluya prompt consolidado
   i. Redactar prompts-iniciales.md

Restricciones:
   - NO me des solución completa de golpe, vamos por partes
   - Documentar honestamente: TODOS los prompts en prompts-iniciales.md,
     incluido cuando uso IA para consolidar el prompt final

---

YA SE TIENE NODE JS Y DOCKER.
YA SE REALIZÓ EL FORK Y NEW BRANCH, SE ANEXAN LOS READ ME.MD.
COMPOSER EN CURSOR LEYÓ LOS FICHEROS DEL FORK Y CREÓ EL DOCUMENTO QUE ANEXÉ CON SU REVISIÓN PARA EL ARRANQUE.
EL ÚLTIMO ARCHIVO ANEXO ES EL EJERCICIO A REALIZAR DE LIDR.

SE DEBE ASEGURAR QUE SE CUMPLAN TODOS LOS PUNTOS QUE SOLICITA LA ACTIVIDAD.
PREGUNTA TODA INFORMACIÓN QUE NECESITES ANTES DE REALIZAR EL PROMPT
```

---
## Prompt #1 — Inicial (Claude Code, IDE)

> Enviado con los archivos `prompt_claude_code_entrega_B_RMA.md` y `spec-driven-development_slides.pdf` adjuntos como contexto en Claude Code. La instrucción de activación fue:
> `COMPLETA EL OBJETIVO CUIDANDO TENER TAREAS ATÓMICAS EN CADA TICKET. TÚ NO VAS A REALIZAR NADA DE GITHUB, SOLO TRABAJAR CON FICHEROS. USA FILOSOFÍA SPEC DRIVEN DEVELOPMENT`
>
> El contenido completo del archivo de especificación es el siguiente:

```
# PROMPT — Claude Code — Entrega B AI4Devs Módulo 3

## 0. Tu rol y restricciones

Eres mi pair-programmer senior en este repositorio. Yo soy Ricardo, ingeniero estructural con 9 años
de experiencia, fuerte en Python para automatización de software de ingeniería (ETABS, STAAD, Mathcad).
No soy desarrollador web nativo: JS/TS, React, Express, Prisma y SQL son territorio nuevo para mí.
Trátame como ingeniero técnico competente aprendiendo dominio nuevo, no como junior.

Reglas no negociables:

1. No me des la solución completa de golpe. Vamos ticket por ticket, validando cada uno antes de
   pasar al siguiente.
2. Antes de escribir código de un ticket, muéstrame el plan (archivos a tocar, qué va en cada uno,
   qué decisiones tomas y por qué). Espera mi "ok" antes de implementar.
3. Explica conceptos nuevos de JS/TS/React/Prisma con una frase de analogía a Python o ingeniería
   cuando sea natural. No me hagas leer documentación externa.
4. Cero alucinaciones de paquetes o APIs. Si dudas si algo existe en una versión, dilo y verifica
   con el package.json/schema.prisma antes de usarlo.
5. Documenta cada paso destructivo (migraciones, instalaciones, comandos). Voy a copiar/pegar tus
   comandos uno por uno.

## 1. Contexto del proyecto

- Repo: fork de AI4Devs-lab-ides (LIDR-academy), ya clonado en
  C:\Users\Ricardo\Documents\GitHub\AI4Devs-lab-ides.
- Rama de trabajo: solved-RMA (ya creada, ya estoy en ella).
- Stack heredado del repo base (NO cambiar):
  - Backend: Node.js + Express + TypeScript + Prisma ORM.
  - Frontend: React (Create React App) + TypeScript.
  - BD: PostgreSQL 15 en Docker (docker-compose.yml en raíz).
  - Backend corre en http://localhost:3010, frontend en http://localhost:3000.
- Estado actual del repo (verificado por revisión previa):
  - Estructura base presente: backend/, frontend/, docker-compose.yml, README.md.
  - backend/src/index.ts expone GET / devolviendo "Hola LTI!".
  - backend/prisma/schema.prisma tiene un modelo User mínimo (placeholder, no se usa).
  - Credenciales en backend/.env: usuario LTIdbUser, DB LTIdb, puerto 5432.
  - Bloqueos conocidos a resolver antes de codificar:
    - node_modules no instalados en ninguno de los dos paquetes.
    - frontend/src/App.tsx importa ./logo.svg y el archivo no existe → rompe el build.
    - DATABASE_URL en .env usa interpolación ${DB_USER} que dotenv no expande → Prisma falla al conectar.
    - No hay migraciones Prisma generadas.

## 2. Historia de usuario a implementar

Como reclutador, quiero añadir candidatos al sistema ATS para gestionar sus datos y procesos
de selección de manera eficiente.

Criterios de aceptación oficiales (AC-1 a AC-7):

1. Botón visible "Añadir candidato" en página principal del dashboard del reclutador.
2. Formulario con: nombre, apellido, email, teléfono, dirección, educación, experiencia laboral.
3. Validación: email con formato válido, campos obligatorios no vacíos.
4. Carga de CV en PDF o DOCX.
5. Mensaje de confirmación al guardar exitosamente.
6. Manejo de errores con mensaje al usuario (ej. fallo de conexión).
7. Accesibilidad y compatibilidad multi-dispositivo/navegador.

Nota del enunciado (opcional pero la incluimos): autocompletado en campos de educación y
experiencia laboral.

## 3. Decisiones de alcance ya tomadas (NO re-cuestionar)

- Modelo de datos simple: una sola tabla Candidate con educación y experiencia como strings de texto
  libre largo (TextArea en UI) + tabla Document para el CV. NO crear tablas relacionales Education[]
  ni WorkExperience[].
- Autocompletado: sugerencias locales en frontend desde listas estáticas hardcodeadas en un módulo
  frontend/src/data/suggestions.ts (instituciones educativas comunes en México y puestos típicos).
  NO requiere endpoint de backend ni tabla de sugerencias. Solo input con datalist HTML5 o componente
  de autosuggest ligero.
- UX extra a incluir: estados de carga (spinner durante submit), toast/banner de éxito y error,
  transiciones suaves en aparición del formulario, validación inline mientras escribe (no solo al
  hacer submit), botón de submit deshabilitado hasta que el form sea válido.
- Stack: respetar el del repo base (Express puro, no Nest; CRA, no Vite). NO instalar Tailwind ni
  framework de UI. CSS plano o CSS modules.
- Validación: usar zod en backend para validar el payload. En frontend, validación nativa con React
  state + helpers propios (sin react-hook-form, mantener simple).
- Upload de archivos: multer en backend. Almacenar en backend/uploads/ (carpeta local, añadir al
  .gitignore). En BD guardar solo la ruta relativa y metadata (nombre original, mime type, tamaño).
- Iniciales para todo: RMA. Rama solved-RMA. PR titulado con RMA incluido.

## 4. Entregable final esperado

Al repo original AI4Devs-lab-ides desde mi fork, rama solved-RMA, que contenga:

1. Todo el código nuevo en su lugar correspondiente (backend/src/..., frontend/src/...,
   backend/prisma/schema.prisma, migraciones).
2. Archivo prompts-iniciales.md en la raíz del repo (no en subcarpeta) con:
   - Lista ordenada de todos los prompts que use con Claude Code, marcando chatbot/IDE usado.
   - Al final: prompt consolidado DRASTIC (este mismo cuenta como prompt inicial, documentarlo así).
   - Nota honesta de que partes del prompt fueron consolidadas con asistencia de Claude (chat).
3. README del repo: añadir sección al final con los pasos extra que faltaban (instalar deps, fix
   de .env, Prisma generate/push, levantar Docker antes que backend, añadir logo.svg).
4. Descripción del PR: pegar el prompt consolidado final + breve resumen de la feature.

## 5. Plan de los 3 tickets técnicos

Ejecuta en este orden. Después de cada ticket, hazme una pausa de validación. No avances al
siguiente ticket sin mi confirmación.

### Fase 0 — Arranque del entorno (~20 min)

Antes del Ticket T-001, prepara el entorno. Tu primer mensaje debe ser un plan que cubra estos pasos:

- Fix de backend/.env: reemplazar DATABASE_URL interpolada por URL literal con las credenciales reales.
- Crear frontend/src/logo.svg mínimo (SVG válido vacío de 100x100) o eliminar el import en App.tsx
  y la referencia al <img>. Elige tú la opción más limpia y justifícalo.
- cd backend && npm install.
- cd ../frontend && npm install.
- docker-compose up -d desde la raíz.
- cd backend && npx prisma generate.
- Verificación: npm run dev en backend, abrir http://localhost:3010, esperar "Hola LTI!".
  npm start en frontend, abrir http://localhost:3000, esperar la página por defecto.
- No avances hasta que yo confirme que veo ambas pantallas funcionando.

### Ticket T-001 — Base de datos: modelo Candidate + Document (~30 min)

Objetivo: definir el esquema Prisma, generar la migración, validar que las tablas existen en PostgreSQL.

Archivos a tocar:
- backend/prisma/schema.prisma (añadir modelos, conservar User existente).
- Nueva carpeta backend/prisma/migrations/ (la genera Prisma).

Esquema a implementar (es el contrato; síguelo literalmente):

  model Candidate {
    id              Int       @id @default(autoincrement())
    firstName       String    @db.VarChar(100)
    lastName        String    @db.VarChar(100)
    email           String    @unique @db.VarChar(255)
    phone           String?   @db.VarChar(30)
    address         String?   @db.VarChar(500)
    education       String?   @db.Text
    workExperience  String?   @db.Text
    createdAt       DateTime  @default(now())
    updatedAt       DateTime  @updatedAt
    documents       Document[]
  }

  model Document {
    id           Int       @id @default(autoincrement())
    candidateId  Int
    fileName     String    @db.VarChar(255)
    filePath     String    @db.VarChar(500)
    mimeType     String    @db.VarChar(100)
    fileSize     Int
    uploadedAt   DateTime  @default(now())
    candidate    Candidate @relation(fields: [candidateId], references: [id], onDelete: Cascade)

    @@index([candidateId])
  }

Comandos a ejecutar:
1. cd backend
2. npx prisma migrate dev --name add_candidate_and_document
3. npx prisma generate

Criterios de aceptación del ticket:
- La migración existe en backend/prisma/migrations/<timestamp>_add_candidate_and_document/migration.sql.
- Conectarse a PostgreSQL con docker exec -it <container> psql -U LTIdbUser -d LTIdb y ejecutar \dt:
  deben aparecer Candidate, Document, User, _prisma_migrations.
- El cliente Prisma compila sin errores: npx tsc --noEmit en backend/ pasa.

Pausa de validación: muéstrame el SQL generado de la migración y la salida de \dt antes de avanzar.

### Ticket T-002 — Backend: endpoint POST /api/candidates con upload de CV (~1.5h)

Objetivo: crear endpoint que reciba multipart/form-data con los campos del candidato + archivo CV,
valide, guarde el archivo en disco y persista candidato + documento en BD en una transacción.

Dependencias a instalar:
  cd backend
  npm install multer zod cors
  npm install -D @types/multer @types/cors

Estructura de archivos a crear/modificar:
  backend/
  ├── src/
  │   ├── index.ts                        ← modificar: añadir middleware cors, json, montar router
  │   ├── routes/
  │   │   └── candidates.routes.ts       ← nuevo
  │   ├── controllers/
  │   │   └── candidates.controller.ts   ← nuevo
  │   ├── services/
  │   │   └── candidates.service.ts      ← nuevo
  │   ├── middleware/
  │   │   ├── upload.middleware.ts       ← nuevo: configuración de multer
  │   │   └── error.middleware.ts        ← nuevo: handler de errores global
  │   ├── schemas/
  │   │   └── candidate.schema.ts        ← nuevo: validación zod del payload
  │   └── lib/
  │       └── prisma.ts                  ← nuevo: instancia singleton de PrismaClient
  └── uploads/                            ← nueva carpeta (vacía, añadir .gitkeep)

Contrato del endpoint:
- Método: POST /api/candidates
- Content-Type: multipart/form-data
- Campos: firstName (req), lastName (req), email (req, único), phone (opt), address (opt),
  education (opt), workExperience (opt), cv (archivo opt, PDF/DOCX, max 5 MB)
- Respuesta éxito (201): { "success": true, "data": { id, firstName, lastName, email, createdAt, document } }
- Error validación (400): { "success": false, "error": "VALIDATION_ERROR", "details": [...] }
- Error email duplicado (409): { "success": false, "error": "EMAIL_ALREADY_EXISTS" }
- Error servidor (500): { "success": false, "error": "INTERNAL_ERROR", "message": "..." }

Reglas de implementación:
- Multer: dest: 'uploads/', filename con UUID/timestamp, fileFilter solo PDF y DOCX,
  limits: { fileSize: 5 * 1024 * 1024 }.
- Creación Candidate + Document transaccional (prisma.$transaction).
- Si validación falla DESPUÉS de que multer guardó el archivo, eliminar el archivo (fs.unlinkSync).
- CORS habilitado solo para http://localhost:3000.
- Sin console.log regados.

Criterios de aceptación del ticket:
- curl con todos los campos válidos + PDF → 201 con candidato persistido.
- Sin email → 400 con mensaje de validación.
- Email duplicado → 409.
- Archivo .txt → 400 "Tipo de archivo no permitido".
- Archivo de 10 MB → 400 mensaje de tamaño excedido.
- Tras POST exitoso: SELECT * FROM "Candidate"; y SELECT * FROM "Document"; muestran registros.
- backend/uploads/ en .gitignore (.gitkeep se commitea).

Pausa de validación: muéstrame los 5 casos de prueba con curl antes de avanzar al frontend.

### Ticket T-003 — Frontend: dashboard con botón "Añadir candidato" + formulario + upload (~2h)

Objetivo: UI funcional, validada, accesible, con UX cuidada que cumple los 7 criterios de aceptación.

Dependencias a instalar: ninguna nueva (CRA ya trae lo necesario).

Estructura de archivos a crear/modificar:
  frontend/
  ├── src/
  │   ├── App.tsx                          ← modificar: dashboard con botón
  │   ├── App.css                          ← modificar o reescribir limpio
  │   ├── components/
  │   │   ├── Dashboard/
  │   │   │   ├── Dashboard.tsx
  │   │   │   └── Dashboard.module.css
  │   │   ├── CandidateForm/
  │   │   │   ├── CandidateForm.tsx
  │   │   │   ├── CandidateForm.module.css
  │   │   │   └── useCandidateForm.ts      ← custom hook con estado + validación
  │   │   ├── FileUpload/
  │   │   │   ├── FileUpload.tsx
  │   │   │   └── FileUpload.module.css
  │   │   ├── Toast/
  │   │   │   ├── Toast.tsx
  │   │   │   └── Toast.module.css
  │   │   └── AutocompleteInput/
  │   │       ├── AutocompleteInput.tsx
  │   │       └── AutocompleteInput.module.css
  │   ├── data/
  │   │   └── suggestions.ts               ← listas estáticas de instituciones y puestos
  │   ├── services/
  │   │   └── api.ts                       ← fetch al backend
  │   └── types/
  │       └── candidate.ts                 ← tipos TypeScript compartidos

Flujo de UX:
1. Vista inicial (Dashboard): título "Dashboard del Reclutador", botón grande "+ Añadir candidato".
2. Click en botón: transición suave → aparece el formulario.
3. Formulario: nombre, apellido, email, teléfono, dirección, educación (textarea + autocomplete
   instituciones), experiencia laboral (textarea + autocomplete puestos), upload CV.
   - Validación inline (mientras escribe): asterisco en obligatorios, mensaje bajo input cuando pierde foco.
   - Botón "Guardar candidato" deshabilitado hasta form válido.
   - Botón "Cancelar" con confirmación si hay datos escritos.
4. Submit: spinner en botón, form deshabilitado, llamada POST /api/candidates.
5. Éxito: toast verde "Candidato añadido exitosamente" 4 segundos, form limpio, vuelve dashboard.
6. Error validación backend (400): mensajes inline en campos correspondientes.
7. Error email duplicado (409): "Este correo ya está registrado" bajo campo email.
8. Error de red: toast rojo "No pudimos guardar el candidato. Verifica tu conexión e inténtalo de nuevo."

Reglas de implementación:
- TypeScript estricto: sin any.
- Accesibilidad: label por htmlFor/id, aria-invalid en error, aria-describedby al mensaje,
  aria-required en obligatorios, navegación teclado completa, foco visible.
- Responsive: mobile-first, form bien a 360px, flex + max-width sin anchos fijos.
- AutocompleteInput: al menos 15 instituciones mexicanas (UNAM, Tec de Monterrey, IPN, etc.)
  y 15 puestos comunes. Sugerencias complementan el texto libre, no lo restringen.
- Upload: input type="file" accept=".pdf,.docx" con nombre del archivo seleccionado + botón quitar.
- CSS modules. Botón primario azul, secundario gris, error rojo, éxito verde. Tipografía sans-serif.

Criterios de aceptación (mapeados a los 7 oficiales):
- AC-1: Botón "Añadir candidato" visible al cargar /.
- AC-2: Form muestra los 7 campos requeridos.
- AC-3: Validación funciona: email mal formado bloquea submit; campos obligatorios vacíos bloquean submit.
- AC-4: Upload acepta PDF y DOCX, rechaza .txt y .jpg con mensaje.
- AC-5: Toast verde aparece tras submit exitoso.
- AC-6: Apagar Docker (docker-compose down) y enviar form → toast rojo de error de conexión.
- AC-7: Probar en Chrome y Firefox a 360px, 768px, 1280px. Lighthouse Accessibility ≥ 90.

Pausa de validación final: caminar conmigo por los 7 AC uno por uno, ejecutando cada prueba en vivo.

## 6. Workflow y entrega

Una vez los 3 tickets pasan los AC:

1. Crear prompts-iniciales.md en la raíz del repo.
2. Actualizar README.md: añadir sección "## Pasos extra para arrancar (no documentados originalmente)"
   con la corrección de .env, prisma generate, etc.

## 7. Tu primer mensaje de respuesta

No empieces a codificar. Tu primer mensaje debe ser exclusivamente:

1. Confirmación de que entendiste el alcance y las 3 reglas de oro.
2. Lista de preguntas que tengas sobre el plan (si hay alguna).
3. Plan detallado de la Fase 0 — Arranque del entorno.
4. Espera mi "ok, procede" antes de tocar nada.
```

---

## Prompt #2 — Aprobación del plan

```
KEEP GOING
```

---

## Prompt #3 — Continuación tras pausa

```
Continue from where you left off.
```

---

## Prompt #4 — Soporte durante validación

```
NO SE COMO CONTINUAR
```

---

## Prompt #5 — Recuperación de error en frontend

```
[imagen del navegador con ERR_CONNECTION_REFUSED]
YA HICE AC-3, AC-4, AC-6, AC-7. FUNCIONÓ.
PERO LUEGO QUISE VOLVER A HACER EL AC-6 Y PASÓ LO DE LA IMAGEN
```

---

## Resumen de iteraciones y problemas resueltos (Claude Code)

| # | Problema | Causa | Solución |
|---|----------|-------|----------|
| 1 | `DATABASE_URL` no se expandía | `dotenv` no interpola `${VAR}` | URL literal en `.env` |
| 2 | `npx tsc --noEmit` fallaba en Zod | Zod v4 requiere TS5+; el proyecto usa TS 4.9.5 | Downgrade a `zod@3` |
| 3 | `<textarea list="...">` no compilaba en TS | `list` no es atributo tipado de `<textarea>` | Dropdown custom con `useState` en `AutocompleteInput` |
| 4 | `EADDRINUSE :::3010` al relanzar backend | El servidor ya estaba corriendo desde las pruebas de Claude Code | No relanzar; usar instancia existente |
| 5 | `ERR_CONNECTION_REFUSED` en `:3000` | Frontend detenido al cerrar terminal + Docker parado para AC-6 | `docker start <container>` + `npm start` en frontend |

---

## Prompt final consolidado (DRASTIC)

```
Eres mi pair-programmer senior en un ATS (Applicant Tracking System) con
Node.js + Express + TypeScript + Prisma + React CRA + PostgreSQL (Docker).

CONTEXTO: fork AI4Devs-lab-ides, rama solved-RMA.
Backend localhost:3010 · Frontend localhost:3000 · DB: LTIdbUser / LTIdb

HISTORIA: "Como reclutador, quiero añadir candidatos al ATS."
AC-1 botón visible · AC-2 formulario 7 campos · AC-3 validación email
AC-4 upload PDF/DOCX · AC-5 toast éxito · AC-6 toast error red · AC-7 responsive+a11y

DECISIONES (no re-cuestionar):
- Candidate + Document (strings Text, no tablas relacionales)
- Autocompletado: listas estáticas en data/suggestions.ts (20 MX + 20 puestos)
- multer → backend/uploads/ · zod@3 (TS 4.9.5 incompatible con zod v4)
- CSS modules · sin Tailwind · sin react-hook-form · sin react-router

METODOLOGÍA: Spec-Driven Development
Spec → Implementación atómica → Validación → Pausa humana → siguiente ticket

TICKETS:
F0: fix .env (URL literal) · npm install · docker up · prisma generate
T-001: schema.prisma (Candidate+Document) → migrate dev → verificar \dt
T-002: POST /api/candidates (multer+zod+$transaction) → 5 casos curl
T-003: Dashboard+CandidateForm+FileUpload+Toast+AutocompleteInput → 7 AC
PD: prompts-iniciales.md + README sección "Pasos extra"

REGLAS: tsc --noEmit 0 errores · sin any · aria-* en inputs · foco visible
```

---

## Notas de honestidad

- El handoff inicial fue redactado con asistencia de Claude Opus 4.6 (chat) a partir
  de una nota de traspaso que Ricardo escribió con CURSOR. Los criterios técnicos y las decisiones
  de alcance fueron de la IA, aprobados por Ricardo.
- Se usó Claude Sonnet 4.6 dentro de Claude Code (IDE) para todo el desarrollo.
- Todos los prompts subsecuentes durante el desarrollo se documentan tal cual fueron escritos,
  incluyendo los más cortos ("KEEP GOING", "Continue from where you left off").
- Los errores encontrados y sus soluciones se documentan de forma transparente en la tabla
  de iteraciones.
