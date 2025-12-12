# NISM Research Analyst (XV) Formula Tutor & Readiness Tool

A comprehensive MVP web application for practicing NISM Research Analyst (XV) exam formulas with instant feedback, progressive hints, and personalized readiness assessment.

## Features

### Core Functionality
- **Formula Library**: 25+ formulas across multiple categories (Valuation, Returns, Risk Metrics, CAPM, DCF, Ratios, etc.)
- **Interactive Problem Solver**: Auto-generate values or enter custom inputs
- **Progressive Hints System**: Up to 3 hints per problem with score penalties (10%, 20%, 30%)
- **Instant Grading**: Real-time evaluation with step-by-step solutions
- **Session Tracking**: Track attempts across your practice session
- **Readiness Report**: AI-powered recommendation on exam readiness

### Recommendation Engine
- **Book Exam**: Score ≥ 75% & Confidence ≥ 70%
- **Borderline**: Score 50-75% or Confidence 50-70%
- **Not Ready**: Score < 50% or Confidence < 50%

## Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS + Vite
- **Backend**: Supabase Edge Functions (TypeScript/Deno)
- **Database**: Supabase Postgres
- **Authentication**: Supabase Auth (Email/Password)
- **Icons**: Lucide React

## Database Schema

### Tables
- `formulas` - Formula definitions with inputs, tolerances, difficulty
- `problems` - Pre-seeded practice problems
- `attempts` - User attempt records with grading details
- `sessions` - Session aggregations with recommendations
- `user_profiles` - Extended user information

## API Endpoints

### Edge Functions

#### `/formulas`
- `GET /formulas/categories` - List all categories
- `GET /formulas?category=X` - List formulas (filtered by category)
- `GET /formulas/:id` - Get specific formula details

#### `/grade-attempt`
- `POST /grade-attempt` - Submit attempt and receive grading
  ```json
  {
    "userId": "uuid",
    "formulaId": "uuid",
    "inputs": { "variable": value },
    "userAnswer": 123.45,
    "hintsUsed": 1,
    "timeSpentMs": 45000
  }
  ```

#### `/session-report`
- `POST /session-report` - Generate readiness report
- `GET /session-report?sessionId=X` - Retrieve session report
- `GET /session-report?userId=X` - List user sessions

## Setup Instructions

### Prerequisites
- Node.js 18+
- Supabase account (credentials already configured)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Environment variables are already configured in `.env`

3. Database is already initialized with:
   - Schema migrations
   - 25+ formulas seeded from NISM formula sheet
   - 10 sample problems

4. Edge Functions are deployed:
   - `formulas` - Formula retrieval
   - `grade-attempt` - Grading logic
   - `session-report` - Report generation

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage Guide

### Getting Started

1. **Sign Up/Sign In**: Create an account or sign in with email/password
2. **Select Category**: Browse categories in the left panel
3. **Choose Formula**: Click on a formula to start practicing
4. **Solve Problem**:
   - Auto-generate values or enter custom inputs
   - Calculate the answer
   - Request hints if needed (with score penalties)
   - Submit your answer
5. **Review Results**: See instant feedback with step-by-step solution
6. **Generate Report**: After 3+ attempts, generate readiness assessment

### Hints System

- **Hint 1** (Conceptual): -10% penalty
- **Hint 2** (Step Suggestion): -20% penalty
- **Hint 3** (Numeric Substitution): -30% penalty

Penalties are cumulative.

### Scoring Formula

```
Final Score = Base Score × (1 - Hint Penalty) × Difficulty Weight
```

- Base Score: 100 if correct, 0 if incorrect
- Difficulty Weight: formula.difficulty / 3

## Formula Categories

1. **Valuation**: EV, Market Cap, EPS, DPS, P/S Ratio, P/E Ratio, PEG Ratio, Dividend Yield
2. **Time Value of Money**: Future Value, Present Value
3. **Profitability Ratios**: EBITDA Margin, PAT Margin
4. **Return Ratios**: ROE, ROCE
5. **Leverage Ratios**: D/E Ratio, Interest Coverage
6. **Liquidity Ratios**: Current Ratio, Quick Ratio, Working Capital
7. **Efficiency Ratios**: Asset Turnover, Inventory Turnover
8. **CAPM**: Capital Asset Pricing Model
9. **Cost of Capital**: WACC
10. **Returns**: HPR, CAGR, Simple ROI
11. **Risk Metrics**: Sharpe Ratio

## Deployment

### Vercel (Recommended for Frontend)
```bash
npm run build
# Deploy dist/ folder to Vercel
```

### Environment Variables for Production
Already configured in Supabase - no additional setup needed.

## Testing

### Manual Testing Checklist
- [ ] User can sign up and sign in
- [ ] Categories load correctly
- [ ] Formulas can be selected
- [ ] Values can be auto-generated
- [ ] Hints work with proper penalties
- [ ] Grading returns correct results
- [ ] Step-by-step solution displays
- [ ] Session report generates after 3+ attempts
- [ ] Recommendation logic works correctly

## Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── Auth.tsx              # Authentication UI
│   │   ├── Dashboard.tsx         # Main dashboard
│   │   ├── CategoryList.tsx      # Formula categories
│   │   ├── ProblemSolver.tsx     # Problem input & solving
│   │   ├── ResultsPanel.tsx      # Results & step-by-step
│   │   └── SessionManager.tsx    # Readiness report
│   ├── contexts/
│   │   └── AuthContext.tsx       # Auth state management
│   ├── lib/
│   │   └── supabase.ts           # Supabase client
│   ├── types/
│   │   └── index.ts              # TypeScript types
│   ├── App.tsx                   # Root component
│   └── main.tsx                  # Entry point
├── supabase/
│   └── functions/
│       ├── formulas/             # Formula API
│       ├── grade-attempt/        # Grading logic
│       └── session-report/       # Report generation
└── README.md
```

## Key Implementation Details

### Grading Logic
- Evaluates formulas using JavaScript eval with input substitution
- Supports absolute and relative tolerance checking
- Generates step-by-step derivation
- Applies hint penalties to final score

### Recommendation Engine
- Analyzes category performance
- Identifies weak areas (accuracy < 60%)
- Calculates confidence level based on:
  - Accuracy percentage (60%)
  - Hint usage (20%)
  - Weak category count (20%)
- Provides actionable improvements

### Security
- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Formulas and problems are publicly readable
- JWT-based authentication

## Support

For issues or questions, refer to the Supabase dashboard for backend logs and database queries.

## License

MIT
