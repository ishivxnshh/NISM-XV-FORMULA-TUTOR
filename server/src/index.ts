import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import formulasRouter from './routes/formulas.js';
import gradeAttemptRouter from './routes/grade-attempt.js';
import sessionReportRouter from './routes/session-report.js';
import quizRouter from './routes/quiz.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Supabase client
export const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
);

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/formulas', formulasRouter);
app.use('/api/grade-attempt', gradeAttemptRouter);
app.use('/api/session-report', sessionReportRouter);
app.use('/api/quiz', quizRouter);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
