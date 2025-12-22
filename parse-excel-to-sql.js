/**
 * Script to parse QUIZ.csv and generate SQL seed file
 * Run: node parse-excel-to-sql.js
 */

const fs = require('fs');
const path = require('path');

// Simple CSV parser that handles quoted fields
function parseCSV(text) {
  const lines = text.split('\n');
  const result = [];
  const headers = parseCSVLine(lines[0]);
  
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const values = parseCSVLine(lines[i]);
    if (values.length === 0) continue;
    
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    result.push(row);
  }
  
  return result;
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

// Read the CSV file
const csvContent = fs.readFileSync('QUIZ.csv', 'utf-8');
const data = parseCSV(csvContent);

console.log(`Found ${data.length} questions`);
console.log('Sample question:', data[0]);

// Generate SQL INSERT statements
let sql = `-- =====================================================
-- QUIZ QUESTIONS SEED DATA
-- Generated from QUIZ.csv
-- =====================================================

-- Clear existing quiz questions
DELETE FROM quiz_questions;

-- Insert quiz questions
`;

data.forEach((row, index) => {
  // Map CSV columns to database fields
  const topic = row.topic || row.Topic || row.category || row.Category || 'General';
  const questionText = row.question_text || row.Question || row['Question Text'] || '';
  const answer = row.answer || row.Answer || row['Correct Answer'] || '';
  const difficulty = (row.difficulty || row.Difficulty || 'medium').toLowerCase();
  const hint = row.hints || row.Hints || row.hint || row.Hint || '';
  const explanation = row.explanation || row.Explanation || row.Description || '';

  // Skip if no question or answer
  if (!questionText || !answer) {
    console.log(`Skipping row ${index + 2}: Missing question or answer`);
    return;
  }

  // Escape single quotes for SQL
  const escapeSql = (str) => {
    if (!str) return '';
    return String(str).replace(/'/g, "''").replace(/\n/g, ' ').replace(/\r/g, '');
  };

  // Build hints array - properly format for PostgreSQL
  let hints;
  if (hint && hint.trim()) {
    // If hints are comma-separated, split them
    const hintArray = hint.includes(',') 
      ? hint.split(',').map(h => h.trim()).filter(h => h)
      : [hint.trim()];
    
    // Format as PostgreSQL array literal
    hints = `'{${hintArray.map(h => `"${escapeSql(h)}"`).join(',')}}'`;
  } else {
    hints = `'{}'`; // Empty array
  }

  sql += `INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  '${escapeSql(topic)}',
  '${escapeSql(questionText)}',
  '${escapeSql(answer)}',
  '${escapeSql(difficulty)}',
  ${hints},
  '${escapeSql(explanation)}'
);

`;
});

sql += `
-- Verify insertion
SELECT 
  topic, 
  COUNT(*) as question_count
FROM quiz_questions 
GROUP BY topic
ORDER BY topic;

SELECT COUNT(*) as total_questions FROM quiz_questions;
`;

// Write to file
const outputPath = path.join('supabase', 'seed-quiz-questions.sql');
fs.writeFileSync(outputPath, sql);

console.log(`✅ SQL file generated: ${outputPath}`);
console.log('Run this file in your Supabase SQL Editor to seed the quiz questions');
