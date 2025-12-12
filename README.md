# NISM Research Analyst (XV) Formula Tutor & Readiness Tool

<div align="center">

![NISM Formula Tutor](https://img.shields.io/badge/NISM-XV%20Certification-blue)
![Status](https://img.shields.io/badge/Status-Production%20Ready-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

**A comprehensive full-stack web application for mastering NISM Research Analyst (XV) exam formulas**

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [API](#-api-reference) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Formula Categories](#-formula-categories-50-total)
- [API Reference](#-api-reference)
- [Architecture](#-architecture)
- [Development](#-development)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## Overview

The **NISM Formula Tutor** is an interactive learning platform designed specifically for NISM Research Analyst (XV) exam preparation. Practice 50+ financial formulas across 15 categories with instant feedback, progressive hints, and personalized readiness assessments.

### Why This Tool?

- ✅ **Comprehensive Coverage**: All major formulas from the NISM Research Analyst syllabus
- ✅ **Instant Feedback**: Real-time grading with detailed step-by-step solutions
- ✅ **Adaptive Learning**: Progressive hints system with smart penalty calculations
- ✅ **Readiness Assessment**: AI-powered recommendations on exam preparedness
- ✅ **No Barriers**: Free to use, no authentication required, start practicing immediately

---

## 🚀 Features

### 🎯 Core Functionality

| Feature | Description |
|---------|-------------|
| **50+ Formula Library** | Complete collection across 15 categories including Valuation, Returns, Risk Metrics, CAPM, DCF, and Financial Ratios |
| **Interactive Problem Solver** | Auto-generate realistic values or manually input custom scenarios |
| **Progressive Hints (3 Levels)** | Get conceptual, step-by-step, and numeric hints with transparent penalty system |
| **Instant Grading Engine** | Real-time evaluation with absolute/relative tolerance checking |
| **Step-by-Step Solutions** | Detailed breakdown of formula calculations for deep learning |
| **Session Tracking** | Monitor your progress across multiple practice attempts |
| **Readiness Report** | Comprehensive assessment with category-wise performance analysis |
| **Zero Authentication** | Start practicing immediately without signup or login |

### 📊 Intelligent Assessment System

**Readiness Recommendations:**

| Status | Criteria | Recommendation |
|--------|----------|----------------|
| 🟢 **Book Exam** | Score ≥75% AND Confidence ≥70% | You're ready! Book your exam with confidence |
| 🟡 **Borderline** | Score 50-75% OR Confidence 50-70% | More practice needed on weak areas |
| 🔴 **Not Ready** | Score <50% OR Confidence <50% | Focus on fundamentals before attempting exam |

**Scoring Algorithm:**
```
Final Score = Base Score × (1 - Hint Penalty) × Difficulty Multiplier

Where:
- Base Score: 100 (correct) or 0 (incorrect)
- Hint Penalty: 0.10 (1st), 0.20 (2nd), 0.30 (3rd) - cumulative
- Difficulty Multiplier: formula.difficulty / 3
```

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Lightning-fast build tool
- **Lucide React** - Beautiful icon library

### Backend
- **Express.js** - Fast, minimalist web framework
- **TypeScript** - Type-safe server code
- **Node.js 18+** - JavaScript runtime

### Database
- **PostgreSQL** - Robust relational database
- **Supabase** - Managed PostgreSQL with APIs
- **50+ Seeded Formulas** - Production-ready data

### Development Tools
- **ESLint** - Code linting
- **tsx** - TypeScript execution
- **Vite Dev Server** - Hot module replacement

---

## ⚡ Quick Start

### Prerequisites

```bash
# Check Node.js version (requires 18+)
node --version

# Check npm version
npm --version
```

### Installation (5 minutes)

```bash
# 1. Clone repository
git clone <your-repo-url>
cd NISM-XV-FORMULA-TUTOR

# 2. Install all dependencies
npm install       # Server
cd client && npm install && cd ..

# 3. Set up database (see Database Setup below)

# 4. Configure environment variables
# Server: server/.env
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key

# Client: client/.env (already configured)
VITE_API_URL=http://localhost:3000/api

# 5. Start development servers
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd client && npm run dev
```

### Database Setup

1. **Create Supabase Project** at https://supabase.com (free tier)
2. **Run Schema**: Copy `supabase/schema.sql` → Supabase SQL Editor → Execute
3. **Seed Data**: Copy `supabase/seed.sql` → Supabase SQL Editor → Execute
4. **Verify**: Run `SELECT COUNT(*) FROM formulas;` → Should return 50+

**📖 Detailed Setup Guide**: See [`QUICKSTART.md`](QUICKSTART.md) for step-by-step instructions with screenshots

---

## 📁 Project Structure

```
NISM-XV-FORMULA-TUTOR/
│
├── 📱 client/                      # React Frontend Application
│   ├── src/
│   │   ├── components/            # React Components
│   │   │   ├── Dashboard.tsx              # Main application layout
│   │   │   ├── CategoryList.tsx           # Formula category browser
│   │   │   ├── ProblemSolver.tsx          # Interactive problem interface
│   │   │   ├── ResultsPanel.tsx           # Results & step-by-step display
│   │   │   └── SessionManager.tsx         # Readiness report generator
│   │   ├── contexts/              # React Context (Auth, etc.)
│   │   ├── lib/
│   │   │   └── supabase.ts                # API configuration
│   │   ├── types/
│   │   │   └── index.ts                   # TypeScript type definitions
│   │   ├── App.tsx                        # Root component
│   │   ├── main.tsx                       # Entry point
│   │   └── index.css                      # Global styles
│   ├── public/                    # Static assets
│   ├── .env                       # Environment variables
│   ├── .env.example               # Environment template
│   ├── index.html                 # HTML template
│   ├── package.json               # Dependencies & scripts
│   ├── tailwind.config.js         # Tailwind configuration
│   ├── tsconfig.json              # TypeScript config
│   └── vite.config.ts             # Vite configuration
│
├── 🔧 server/                      # Express Backend API
│   ├── src/
│   │   ├── routes/                # API Route Handlers
│   │   │   ├── formulas.ts                # Formula CRUD operations
│   │   │   ├── grade-attempt.ts           # Grading engine & logic
│   │   │   └── session-report.ts          # Report generation
│   │   └── index.ts               # Express server entry point
│   ├── dist/                      # Compiled JavaScript (build output)
│   ├── .env                       # Environment variables
│   ├── .env.example               # Environment template
│   ├── package.json               # Dependencies & scripts
│   └── tsconfig.json              # TypeScript config
│
├── 🗄️ supabase/                    # Database Schema & Data
│   ├── schema.sql                 # Table definitions & indexes
│   ├── seed.sql                   # 50+ formula seed data
│   └── README.md                  # Database documentation
│
├── 📚 Documentation
│   ├── README.md                  # This file (main documentation)
│   ├── QUICKSTART.md              # Step-by-step setup guide
│   └── SETUP_GUIDE.md             # Complete setup & deployment guide
│
└── ⚙️ Configuration
    └── package.json               # Root workspace config
```

### Key Files Explained

| File | Purpose |
|------|---------|
| `client/src/components/Dashboard.tsx` | Main app layout, manages routing & state |
| `server/src/routes/grade-attempt.ts` | Core grading logic with tolerance checking |
| `server/src/routes/session-report.ts` | Readiness assessment algorithm |
| `supabase/seed.sql` | 50+ formulas with metadata & hints |
| `client/.env` | Frontend API endpoint configuration |
| `server/.env` | Backend Supabase credentials |

---

## 📊 Formula Categories (50+ Total)

<details>
<summary><strong>1. Market Valuation (5 formulas)</strong></summary>

- Enterprise Value (EV)
- Market Capitalization
- Earnings Per Share (EPS)
- Dividend Per Share (DPS)
- Price to Sales Ratio (P/S)
</details>

<details>
<summary><strong>2. Bond Metrics (3 formulas)</strong></summary>

- Coupon Payment Per Period
- Holding Period Return (HPR)
- Current Yield (Bond)
</details>

<details>
<summary><strong>3. Time Value of Money (2 formulas)</strong></summary>

- Future Value (FV)
- Present Value (PV)
</details>

<details>
<summary><strong>4. Working Capital & Liquidity (3 formulas)</strong></summary>

- Working Capital
- Current Ratio
- Quick Ratio
</details>

<details>
<summary><strong>5. Profitability Ratios (2 formulas)</strong></summary>

- EBITDA Margin
- PAT Margin
</details>

<details>
<summary><strong>6. Return Ratios (5 formulas)</strong></summary>

- Return on Equity (ROE)
- Du Pont ROE (3-Factor)
- Return on Capital Employed (ROCE)
- Return on Invested Capital (ROIC)
</details>

<details>
<summary><strong>7. Leverage Ratios (2 formulas)</strong></summary>

- Debt to Equity Ratio (D/E)
- Interest Coverage Ratio
</details>

<details>
<summary><strong>8. Efficiency Ratios (4 formulas)</strong></summary>

- Accounts Receivable Turnover
- Accounts Payable Turnover
- Asset Turnover
- Inventory Turnover
</details>

<details>
<summary><strong>9. DCF Models (3 formulas)</strong></summary>

- Dividend Discount Model Price
- Free Cash Flow to Equity (FCFE)
- Free Cash Flow to Firm (FCFF)
</details>

<details>
<summary><strong>10. CAPM & WACC (2 formulas)</strong></summary>

- Capital Asset Pricing Model (CAPM)
- Weighted Average Cost of Capital (WACC)
</details>

<details>
<summary><strong>11. Valuation Multiples (9 formulas)</strong></summary>

- Price to Earnings Ratio (P/E)
- PEG Ratio
- Dividend Yield
- Earning Yield
- Price to Book Ratio (P/B)
- EV to EBITDA
- EV to EBIT
- EV to Sales
- EV to Capital Employed
</details>

<details>
<summary><strong>12. Returns Calculation (2 formulas)</strong></summary>

- Simple Return on Investment (ROI)
- Compound Annual Growth Rate (CAGR)
</details>

<details>
<summary><strong>13. Risk Metrics (1 formula)</strong></summary>

- Standard Deviation
</details>

<details>
<summary><strong>14. Risk-Adjusted Returns (3 formulas)</strong></summary>

- Jensen's Alpha
- Sharpe Ratio
- Treynor Ratio
</details>

<details>
<summary><strong>15. Other Metrics (1 formula)</strong></summary>

- Loan to Value Ratio (LTV)
</details>

---

## 🔌 API Reference

### Base URL
```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

### Endpoints

#### 📚 Formulas API

**Get All Categories**
```http
GET /api/formulas/categories
```
Response:
```json
{
  "categories": [
    { "category": "Market Valuation", "count": 5 },
    { "category": "Bond Metrics", "count": 3 }
  ]
}
```

**Get Formulas by Category**
```http
GET /api/formulas?category=Market%20Valuation
```
Response:
```json
{
  "formulas": [
    {
      "id": "uuid",
      "title": "Enterprise Value (EV)",
      "category": "Market Valuation",
      "expression": "equity + debt - cash",
      "variables": {
        "equity": { "label": "Equity Value", "min": 1000000, "max": 10000000, "unit": "currency" }
      },
      "difficulty": 2,
      "tolerance_type": "absolute",
      "tolerance_value": 1000,
      "description": "Enterprise Value represents...",
      "hints": ["Hint 1", "Hint 2", "Hint 3"]
    }
  ]
}
```

**Get Single Formula**
```http
GET /api/formulas/:id
```

#### ✅ Grading API

**Submit Attempt for Grading**
```http
POST /api/grade-attempt
Content-Type: application/json

{
  "userId": "anonymous",
  "formulaId": "uuid",
  "inputs": {
    "equity": 5000000,
    "debt": 2000000,
    "cash": 500000
  },
  "userAnswer": 6500000,
  "hintsUsed": 1,
  "timeSpentMs": 45000
}
```

Response:
```json
{
  "attemptId": "uuid",
  "isCorrect": true,
  "correctAnswer": 6500000,
  "percentageError": 0.0,
  "baseScore": 100,
  "hintPenalty": 0.10,
  "finalScore": 90.0,
  "stepByStep": [
    { "step": 1, "description": "Formula: EV = Equity + Debt - Cash" },
    { "step": 2, "description": "Substitute: 5000000 + 2000000 - 500000", "value": 6500000 }
  ]
}
```

#### 📊 Session Report API

**Generate Readiness Report**
```http
POST /api/session-report
Content-Type: application/json

{
  "userId": "anonymous",
  "attemptIds": ["uuid1", "uuid2", "uuid3"]
}
```

Response:
```json
{
  "sessionId": "uuid",
  "totalAttempts": 10,
  "correctAttempts": 7,
  "aggregatedScore": 72.5,
  "confidenceLevel": 70.0,
  "recommendation": "borderline",
  "rationale": "You show good foundational knowledge...",
  "improvements": [
    "Focus on these weak categories: Risk Metrics, DCF Models",
    "Try to solve problems independently without hints",
    "Work on improving your speed"
  ],
  "categoryPerformance": [
    {
      "category": "Market Valuation",
      "accuracy": 80.0,
      "avgScore": 85.5,
      "avgTime": 35000,
      "attempts": 4
    }
  ],
  "avgHintsUsed": 1.2,
  "avgTimeSpent": 42000
}
```

**Get Session History**
```http
GET /api/session-report?userId=anonymous
```

---

## 🏗️ Architecture

### System Overview

```
┌─────────────────┐
│   User Browser  │
│   (React SPA)   │
└────────┬────────┘
         │ HTTP/JSON
         ▼
┌─────────────────┐
│  Express Server │
│   (TypeScript)  │
└────────┬────────┘
         │ REST API
         ▼
┌─────────────────┐
│    Supabase     │
│   PostgreSQL    │
└─────────────────┘
```

### Component Flow

**Frontend Data Flow:**
```
Dashboard
    ├── CategoryList (fetch categories)
    ├── ProblemSolver (submit attempts)
    │       ↓
    ├── ResultsPanel (display results)
    └── SessionManager (generate reports)
```

**Backend Processing:**
```
Request → Route Handler → Business Logic → Database Query → Response
```

### Key Design Patterns

| Pattern | Implementation | Purpose |
|---------|---------------|---------|
| **MVC** | Routes → Controllers → Models | Separation of concerns |
| **RESTful API** | Standard HTTP methods | Predictable endpoints |
| **Component Composition** | React component hierarchy | Reusable UI elements |
| **Type Safety** | TypeScript throughout | Catch errors at compile time |

### Database Schema

**Tables:**
- `formulas` - Formula definitions (50+ rows)
- `attempts` - User practice attempts
- `sessions` - Aggregated session reports

**Key Relationships:**
```sql
attempts.formula_id → formulas.id
sessions.user_id → attempts.user_id (many-to-many)
```

---

## 💻 Development

### Available Scripts

**Server:**
```bash
cd server

npm run dev      # Start dev server with hot reload (tsx watch)
npm run build    # Compile TypeScript to JavaScript
npm start        # Run production build
```

**Client:**
```bash
cd client

npm run dev          # Start Vite dev server (HMR enabled)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run typecheck    # Check TypeScript types
```

### Development Workflow

1. **Feature Development**
   ```bash
   git checkout -b feature/your-feature
   # Make changes
   npm run dev  # Test locally
   git commit -m "feat: description"
   ```

2. **Testing Changes**
   - Frontend: Check browser console (F12)
   - Backend: Check terminal logs
   - Database: Verify in Supabase dashboard

3. **Type Checking**
   ```bash
   # Server
   cd server && npx tsc --noEmit
   
   # Client
   cd client && npm run typecheck
   ```

### Code Style

- **TypeScript**: Strict mode enabled
- **Formatting**: ESLint + Prettier (recommended)
- **Naming**:
  - Components: PascalCase (`Dashboard.tsx`)
  - Files: kebab-case (`grade-attempt.ts`)
  - Variables: camelCase (`userAnswer`)
  - Constants: UPPER_SNAKE_CASE (`API_URL`)

### Environment Variables

**Required for Development:**

`.env` files should never be committed. Use `.env.example` as template.

**Server (`server/.env`):**
```bash
PORT=3000                                    # Server port
SUPABASE_URL=https://xxx.supabase.co        # Supabase project URL
SUPABASE_ANON_KEY=xxx                       # Supabase anon/public key
```

**Client (`client/.env`):**
```bash
VITE_API_URL=http://localhost:3000/api      # Backend API endpoint
```

---

## 🚀 Deployment

### Frontend (Vercel/Netlify)

```bash
cd client
npm run build        # Creates dist/ folder
# Deploy dist/ folder to hosting
```

**Environment Variables:**
- `VITE_API_URL` → Production API URL

### Backend (Railway/Heroku/Render)

```bash
cd server
npm run build        # Creates dist/ folder
npm start           # Runs dist/index.js
```

**Environment Variables:**
- `PORT`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`

### Database (Supabase)

Already managed! Just ensure:
- Schema is applied (`schema.sql`)
- Formulas are seeded (`seed.sql`)
- RLS policies configured (if needed)

### Production Checklist

- [ ] Environment variables set correctly
- [ ] Database schema applied
- [ ] Formulas seeded (50+ rows)
- [ ] CORS configured for production domain
- [ ] HTTPS enabled
- [ ] Error logging configured
- [ ] Build succeeds without errors

---

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use npx
npx kill-port 3000
npx kill-port 5173
```

#### Cannot Connect to Backend
1. Verify server is running: http://localhost:3000/health
2. Check `VITE_API_URL` in `client/.env`
3. Check CORS settings in `server/src/index.ts`

#### Database Connection Failed
1. Verify Supabase credentials in `server/.env`
2. Check Supabase project is active
3. Test connection: Run query in Supabase SQL Editor

#### Formulas Not Loading
```sql
-- Check formula count
SELECT COUNT(*) FROM formulas;

-- Should return 50+. If 0:
-- Re-run supabase/seed.sql
```

#### TypeScript Errors
```bash
# Clear cache and rebuild
cd server
rm -rf node_modules dist
npm install
npm run build

cd ../client
rm -rf node_modules dist
npm install
npm run build
```

### Debug Mode

**Enable verbose logging:**

Server:
```typescript
// server/src/index.ts
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});
```

Client:
```typescript
// client/src/lib/supabase.ts
console.log('API_URL:', API_URL);
```

---

## 🤝 Contributing

We welcome contributions! Here's how:

### Getting Started

1. **Fork** the repository
2. **Clone** your fork
   ```bash
   git clone https://github.com/YOUR_USERNAME/NISM-XV-FORMULA-TUTOR
   cd NISM-XV-FORMULA-TUTOR
   ```
3. **Create branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Make changes** and test locally
5. **Commit** with clear message
   ```bash
   git commit -m "feat: add amazing feature"
   ```
6. **Push** to your fork
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open Pull Request** on GitHub

### Contribution Guidelines

- ✅ Write clear, concise commit messages
- ✅ Follow existing code style
- ✅ Test your changes thoroughly
- ✅ Update documentation if needed
- ✅ Add comments for complex logic
- ❌ Don't commit `.env` files
- ❌ Don't commit `node_modules` or `dist`

### Areas for Contribution

- 🐛 Bug fixes
- ✨ New formula categories
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- ⚡ Performance optimizations
- 🧪 Test coverage
- 🌐 Internationalization

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 NISM Formula Tutor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Support & Contact

### Documentation
- **Quick Start**: [`QUICKSTART.md`](QUICKSTART.md) - Step-by-step setup
- **Setup Guide**: [`SETUP_GUIDE.md`](SETUP_GUIDE.md) - Complete deployment guide
- **Database**: [`supabase/README.md`](supabase/README.md) - Database documentation

### Get Help
- 🐛 **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/NISM-XV-FORMULA-TUTOR/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/YOUR_USERNAME/NISM-XV-FORMULA-TUTOR/discussions)
- 📧 **Email**: your-email@example.com

### Resources
- [NISM Official Website](https://www.nism.ac.in/)
- [Research Analyst Certification](https://www.nism.ac.in/research-analyst/)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [Supabase Docs](https://supabase.com/docs)

---

## 🎓 About NISM Research Analyst (XV)

The **NISM-Series-XV: Research Analyst Certification Examination** is conducted by the National Institute of Securities Markets (NISM) for individuals aspiring to become Research Analysts in India.

### Exam Coverage
This application covers the **Quantitative Methods and Financial Analysis** section, which includes:
- Valuation techniques (DCF, relative valuation)
- Financial ratio analysis
- Risk and return metrics
- Time value of money
- Capital budgeting
- Portfolio theory (CAPM, Sharpe ratio)

---

## 🙏 Acknowledgments

- **NISM** for the Research Analyst certification program
- **React** and **Express.js** communities for excellent documentation
- **Supabase** for managed PostgreSQL infrastructure
- **Tailwind CSS** for utility-first styling
- **Lucide** for beautiful open-source icons

---

## 📈 Roadmap

### Current Version (v1.0)
- ✅ 50+ formulas across 15 categories
- ✅ Interactive problem solver
- ✅ Progressive hints system
- ✅ Instant grading with step-by-step solutions
- ✅ Session reports and readiness assessment

### Planned Features
- 🔄 User authentication and progress tracking
- 📱 Mobile app (React Native)
- 📊 Advanced analytics dashboard
- 🎯 Personalized learning paths
- 🏆 Gamification (badges, leaderboards)
- 📚 Formula flashcards
- 🧪 Mock exams
- 🌐 Multi-language support

---

## ⭐ Show Your Support

If this project helped you prepare for your NISM exam, please:

- ⭐ **Star** the repository
- 🍴 **Fork** and contribute
- 📢 **Share** with fellow NISM aspirants
- 📝 **Leave feedback** via Issues

---

<div align="center">

**Built with ❤️ for NISM Research Analyst exam preparation**

[⬆ Back to Top](#nism-research-analyst-xv-formula-tutor--readiness-tool)

</div>
