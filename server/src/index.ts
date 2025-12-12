import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import formulasRouter from './routes/formulas.js';
import gradeAttemptRouter from './routes/grade-attempt.js';
import sessionReportRouter from './routes/session-report.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase client
export const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
);

// Routes
app.use('/api/formulas', formulasRouter);
app.use('/api/grade-attempt', gradeAttemptRouter);
app.use('/api/session-report', sessionReportRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
