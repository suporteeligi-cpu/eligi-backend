import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import routes from './routes'; // Rotas gerais (/api)
import businessRoutes from "./routes/businessRoutes";
import businessHoursRoutes from "./routes/businessHoursRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import appointmentRoutes from "./routes/appointmentRoutes";

import { errorHandler } from './middlewares/errorHandler';
import { loggerMiddleware } from './middlewares/loggerMiddleware';

dotenv.config();

const app = express();

// Segurança
app.use(helmet());

// CORS
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
  })
);

//  Parser + Logger
app.use(express.json());
app.use(loggerMiddleware);

/* ============================================================
   💡 IMPORTANTE — ORDEM CORRETA DAS ROTAS
   Primeiro rotas genéricas, depois rotas específicas.
   Isso evita conflito e impede que /api engula subrotas.
   ============================================================ */

// ROTAS GERAIS (/api/*)
app.use('/api', routes);

// ROTAS DE NEGÓCIO (/api/business/*)
app.use("/api/business", businessRoutes);
console.log("🔥 app.ts carregado");
console.log("📌 businessRoutes importado é:", businessRoutes.toString().slice(0, 50));


// ROTAS DE HORÁRIOS (/api/business-hours/*)
app.use("/api/business-hours", businessHoursRoutes);

// ROTAS DO DASHBOARD (/api/dashboard/*)
app.use("/api/dashboard", dashboardRoutes);

// ROTAS DE AGENDAMENTOS (/api/appointments/*)
app.use("/api/appointments", appointmentRoutes);

// Health Check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Middleware de erros (sempre por último)
app.use(errorHandler);

export default app;
