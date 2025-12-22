-- =====================================================
-- QUIZ QUESTIONS SEED DATA
-- Generated from QUIZ.csv
-- =====================================================

-- Clear existing quiz questions
DELETE FROM quiz_questions;

-- Insert quiz questions
INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'GIPS advertisement guidelines require disclosure of appropriate composite _____ return.',
  'benchmark',
  'easy',
  '{"comparison"}',
  'Benchmark return must be disclosed.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'GIPS advertisements must specify the _____ used to express performance.',
  'currency',
  'easy',
  '{"clarity"}',
  'Currency disclosure is mandatory.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'PMS advertisements must show at least _____ years of performance.',
  'five',
  'easy',
  '{"history"}',
  'Minimum five years or since inception.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'Assets are broadly classified into financial and _____ assets.',
  'physical',
  'easy',
  '{"classification"}',
  'Assets are financial or physical.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'Shares and debentures are examples of _____ assets.',
  'financial',
  'easy',
  '{"investment"}',
  'These are financial instruments.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'Gold and real estate are examples of _____ assets.',
  'physical',
  'easy',
  '{"tangible"}',
  'They are physical assets.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'NRIs can open a Demat account in India without _____ permission.',
  'RBI',
  'easy',
  '{"NRI"}',
  'No RBI approval needed.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'PMS registration focuses on grievance redressal and _____ systems.',
  'accounting',
  'easy',
  '{"compliance"}',
  'Accounting systems are evaluated.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'PMS registration does not require disclosure of _____ models.',
  'forecasting',
  'medium',
  '{"investment"}',
  'Forecasting models are not asked.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'If a client fails to meet _____ requirements, transactions cannot be carried out.',
  'PMLA',
  'easy',
  '{"compliance"}',
  'PMLA compliance is mandatory.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'A portfolio manager cannot borrow or _____ client securities.',
  'pledge',
  'easy',
  '{"restriction"}',
  'Client securities cannot be pledged.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'Any funding shortfall must be met using PMS’s _____ resources.',
  'own',
  'easy',
  '{"liability"}',
  'PMS uses own resources.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'Compensation for postponement of consumption is called the _____ rate.',
  'real risk-free',
  'medium',
  '{"returns"}',
  'Pure time value of money.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'Nominal risk-free rate includes expected _____.',
  'inflation',
  'easy',
  '{"returns"}',
  'Nominal = real + inflation.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'Required rate of return includes risk _____.',
  'premium',
  'easy',
  '{"returns"}',
  'Risk premium added.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'A guaranteed future payment is considered a _____ investment.',
  'risk-free',
  'easy',
  '{"certainty"}',
  'No uncertainty involved.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'The return on a risk-free investment is called the _____ rate.',
  'risk-free',
  'easy',
  '{"returns"}',
  'Risk-free rate definition.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'Personal financial statements help assess ability to _____.',
  'invest',
  'easy',
  '{"planning"}',
  'Used to judge investibility.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'If income exceeds expenses, the investor has surplus to _____.',
  'invest',
  'easy',
  '{"planning"}',
  'Surplus allows investing.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'Nominal rate of return ignores change in purchasing _____.',
  'power',
  'easy',
  '{"inflation"}',
  'Purchasing power ignored.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'Real rate of return is calculated by subtracting _____ from nominal rate.',
  'inflation',
  'easy',
  '{"formula"}',
  'Real = nominal − inflation.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'Investment rationale of PMS is governed under Regulation _____.',
  '27',
  'medium',
  '{"SEBI"}',
  'SEBI PMS Regulations.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'Portfolio managers must align investments with client risk _____.',
  'profile',
  'easy',
  '{"suitability"}',
  'Risk profiling required.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'Custom benchmarks are more accurate but more _____.',
  'expensive',
  'easy',
  '{"cost"}',
  'Higher maintenance cost.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'Client funds in PMS are maintained in a _____ account.',
  'bank',
  'easy',
  '{"custody"}',
  'Bank account maintained.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'SEBI may seek business information during PMS _____.',
  'registration',
  'easy',
  '{"process"}',
  'Registration scrutiny.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'Portfolio beta is the _____ average of stock betas.',
  'weighted',
  'easy',
  '{"formula"}',
  'Weighted beta calculation.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'Active and passive funds are classified based on management _____.',
  'style',
  'easy',
  '{"funds"}',
  'Management approach.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'Portfolio manager cannot invest in _____ shares under discretionary PMS.',
  'unlisted',
  'medium',
  '{"restriction"}',
  'Unlisted shares prohibited.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'PMS operating expenses cannot exceed _____% per annum.',
  '0.50',
  'hard',
  '{"limit"}',
  'Expense cap excluding brokerage.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Saving always _____ investing.',
  'precedes',
  'easy',
  '{"order"}',
  'Saving must happen before investing.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'The three key factors to evaluate investments are safety, liquidity and _____.',
  'returns',
  'easy',
  '{"evaluation"}',
  'Core investment factors.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'The minimum amount required for investment is known as _____.',
  'ticket size',
  'easy',
  '{"minimum"}',
  'Ticket size definition.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'An asset class groups investments with similar _____.',
  'characteristics',
  'easy',
  '{"classification"}',
  'Asset class meaning.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Real estate is considered a _____ asset.',
  'illiquid',
  'easy',
  '{"liquidity"}',
  'Real estate is not easily sellable.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Equity is also known as _____ capital.',
  'risk',
  'easy',
  '{"nature"}',
  'Equity involves higher risk.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Inflation erodes the _____ power of money.',
  'purchasing',
  'easy',
  '{"value"}',
  'Inflation effect.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Real rate of return is calculated after adjusting for taxes and _____.',
  'inflation',
  'easy',
  '{"returns"}',
  'Real return meaning.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'A return ignoring taxes and inflation is called _____ return.',
  'nominal',
  'easy',
  '{"definition"}',
  'Nominal return.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Market risk cannot be eliminated through _____.',
  'diversification',
  'easy',
  '{"systematic"}',
  'Systematic risk.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Bond prices and interest rates have an _____ relationship.',
  'inverse',
  'easy',
  '{"pricing"}',
  'Interest rate effect.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Asset allocation means distributing money across different _____ classes.',
  'asset',
  'easy',
  '{"allocation"}',
  'Asset allocation meaning.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Risk profiling determines an investor’s risk _____.',
  'appetite',
  'easy',
  '{"profile"}',
  'Risk appetite assessment.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Strategic asset allocation is aligned with financial _____.',
  'goals',
  'easy',
  '{"planning"}',
  'Goal-based allocation.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Tactical asset allocation aims to improve risk-adjusted _____.',
  'returns',
  'easy',
  '{"performance"}',
  'Tactical objective.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'A mutual fund is a professionally managed investment _____.',
  'vehicle',
  'easy',
  '{"definition"}',
  'MF definition.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'A mutual fund is structured in the form of a _____.',
  'trust',
  'easy',
  '{"structure"}',
  'MF legal structure.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Fund and scheme are used _____ in the mutual fund industry.',
  'interchangeably',
  'easy',
  '{"terminology"}',
  'Common usage.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Every mutual fund scheme has a pre-announced investment _____.',
  'objective',
  'easy',
  '{"planning"}',
  'Scheme objective.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Mutual funds pass risk and return directly to the _____.',
  'investors',
  'easy',
  '{"ownership"}',
  'Pass-through vehicle.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Mutual funds are not _____ return products.',
  'guaranteed',
  'easy',
  '{"disclaimer"}',
  'No assured returns.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Open-ended schemes allow investors to enter or exit at _____ time.',
  'any',
  'easy',
  '{"flexibility"}',
  'Anytime entry-exit.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Close-ended schemes have a fixed _____.',
  'maturity',
  'easy',
  '{"tenure"}',
  'Fixed life.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Listing of close-ended schemes is _____ to provide liquidity.',
  'compulsory',
  'medium',
  '{"exchange"}',
  'Liquidity requirement.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Interval funds combine features of open-ended and _____ schemes.',
  'close-ended',
  'easy',
  '{"hybrid"}',
  'Interval fund structure.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'The open period in an interval fund is called the _____ period.',
  'transaction',
  'medium',
  '{"interval"}',
  'Transaction window.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'ETFs are traded throughout the day on the stock _____.',
  'exchange',
  'easy',
  '{"trading"}',
  'ETF trading.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'A demat account is required to invest in _____.',
  'ETFs',
  'easy',
  '{"requirement"}',
  'ETF requirement.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Passive funds aim to replicate a market _____.',
  'index',
  'easy',
  '{"tracking"}',
  'Index tracking.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Passive funds generally have lower running _____.',
  'costs',
  'easy',
  '{"expenses"}',
  'Low expense ratio.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'ELSS schemes have a statutory lock-in of _____ years.',
  'three',
  'easy',
  '{"tax"}',
  'ELSS lock-in.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Overnight funds invest in securities with maturity of _____ day.',
  'one',
  'easy',
  '{"tenure"}',
  'Overnight duration.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Liquid funds invest in securities up to _____ days maturity.',
  '91',
  'easy',
  '{"duration"}',
  'Liquid fund rule.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Corporate bond funds invest mainly in _____ rated bonds.',
  'AA+',
  'medium',
  '{"credit"}',
  'Credit quality.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Gilt funds invest in _____ securities.',
  'government',
  'easy',
  '{"sovereign"}',
  'G-Secs.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Aggressive hybrid funds invest predominantly in _____.',
  'equity',
  'easy',
  '{"allocation"}',
  'Equity-heavy hybrid.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Children’s funds have a minimum lock-in of _____ years.',
  'five',
  'easy',
  '{"solution"}',
  'Child fund rule.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'NAV of open-ended schemes is disclosed on a _____ basis.',
  'daily',
  'easy',
  '{"frequency"}',
  'Daily NAV.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'NAV of close-ended schemes is calculated at least once a _____.',
  'week',
  'medium',
  '{"frequency"}',
  'Weekly NAV.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'KIM is a summary of SID and _____.',
  'SAI',
  'medium',
  '{"documents"}',
  'Key Information Memorandum.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Risk disclosure in SID is shown using the _____.',
  'Riskometer',
  'easy',
  '{"indicator"}',
  'Risk indicator.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'SIP allows investors to invest at _____ intervals.',
  'regular',
  'easy',
  '{"discipline"}',
  'Systematic investment.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'SWP provides _____ income to investors.',
  'regular',
  'easy',
  '{"withdrawal"}',
  'Systematic withdrawal.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Units are redeemed on _____ basis.',
  'FIFO',
  'medium',
  '{"accounting"}',
  'First-in-first-out.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'PAN is compulsory except for _____ SIPs.',
  'micro',
  'medium',
  '{"exemption"}',
  'Micro SIP exemption.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Cash investment in mutual funds is allowed up to Rs _____ per year.',
  '50000',
  'medium',
  '{"limit"}',
  'Cash transaction limit.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Fund factsheets are published on a _____ basis.',
  'monthly',
  'easy',
  '{"report"}',
  'Monthly disclosure.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'An option is a contract that gives the right but not the _____ to buy or sell.',
  'obligation',
  'easy',
  '{"rights"}',
  'Options give rights without obligation.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'The buyer of an option pays the option _____.',
  'premium',
  'easy',
  '{"cost"}',
  'Buyer pays premium upfront.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'The seller of an option receives premium and has the _____ to perform.',
  'obligation',
  'easy',
  '{"duty"}',
  'Option writer is obligated.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Intrinsic value of a call option is calculated as spot price minus _____.',
  'strike price',
  'easy',
  '{"formula"}',
  'Call intrinsic value formula.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'An in-the-money option has _____ intrinsic value.',
  'positive',
  'easy',
  '{"value"}',
  'ITM options have value.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'A call option is in-the-money when strike price is _____ than spot price.',
  'lower',
  'easy',
  '{"ITM"}',
  'ITM call condition.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'A trader bearish on the market may use a bearish vertical spread using _____.',
  'put',
  'medium',
  '{"strategy"}',
  'Bearish put spread.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Hedging intention is confirmed when there exists a related _____ position.',
  'commercial',
  'medium',
  '{"risk"}',
  'Commercial exposure check.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Net worth requirement of a clearing member is _____ than non-clearing member.',
  'higher',
  'easy',
  '{"membership"}',
  'Higher capital needed.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Dow Jones Industrial Average consists of _____ stocks.',
  '30',
  'easy',
  '{"index"}',
  'DJIA composition.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'S&P 500 is considered a _____ index than Dow Jones.',
  'broader',
  'easy',
  '{"comparison"}',
  'Covers more stocks.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Entire contribution of equity shares is not allowed as _____ assets for margin.',
  'liquid',
  'medium',
  '{"margin"}',
  'Liquid asset definition.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Margins in derivative trading depend on volatility and _____ movement.',
  'price',
  'easy',
  '{"risk"}',
  'Margin determinants.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Declining futures price with rising open interest indicates a _____ trend.',
  'bearish',
  'easy',
  '{"market"}',
  'Bearish signal.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'ETFs can be traded on exchange on an _____ basis.',
  'intraday',
  'easy',
  '{"trading"}',
  'Intraday trading allowed.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'A trading member can trade on behalf of clients or on own _____.',
  'account',
  'easy',
  '{"roles"}',
  'Proprietary trading.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'A swap is an agreement to exchange _____ flows in the future.',
  'cash',
  'easy',
  '{"definition"}',
  'Swap definition.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'High volatility generally causes the bid-ask spread to _____.',
  'widen',
  'easy',
  '{"liquidity"}',
  'Spread behavior.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Derivative income on recognised exchanges is treated as _____ income.',
  'non-speculative',
  'medium',
  '{"tax"}',
  'Finance Act 2005.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Natural gas future is a derivative on _____ resources.',
  'energy',
  'easy',
  '{"commodity"}',
  'Energy derivative.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Risk management focuses on maintaining _____ in derivative markets.',
  'stability',
  'easy',
  '{"objective"}',
  'Market stability.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Initial margin is shown under _____ assets in balance sheet.',
  'current',
  'hard',
  '{"accounting"}',
  'Accounting treatment.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'American options are valued higher due to early _____ feature.',
  'exercise',
  'easy',
  '{"rights"}',
  'Early exercise benefit.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Stock options in India are settled by _____ delivery.',
  'physical',
  'medium',
  '{"settlement"}',
  'Physical settlement.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Index options are settled in _____.',
  'cash',
  'easy',
  '{"settlement"}',
  'Cash settlement.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Equity shares deposited as margin are marked to market on a _____ basis.',
  'regular',
  'medium',
  '{"valuation"}',
  'MTM valuation.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Indian derivative market follows a _____ driven trading system.',
  'order',
  'easy',
  '{"market"}',
  'Order-driven market.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Clearing corporations maintain a Core Settlement _____ Fund.',
  'Guarantee',
  'medium',
  '{"safety"}',
  'Settlement protection.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Outstanding liability of a member includes all client open _____.',
  'positions',
  'medium',
  '{"risk"}',
  'Cannot be netted.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Debit balance in MTM margin account represents anticipated _____.',
  'loss',
  'easy',
  '{"prudence"}',
  'Anticipated loss.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Higher margins restrict derivative trading to financially _____ traders.',
  'strong',
  'easy',
  '{"risk"}',
  'Risk control.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Forward contracts are _____ contracts.',
  'customized',
  'easy',
  '{"OTC"}',
  'Negotiated contracts.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'UCC stands for Unique _____ Code.',
  'Client',
  'easy',
  '{"onboarding"}',
  'Client identification.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Speculators _____ risk while hedgers reduce it.',
  'take',
  'easy',
  '{"roles"}',
  'Market participants.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'A limit order executes only at the specified or _____ price.',
  'better',
  'easy',
  '{"orders"}',
  'Limit order rule.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'A professional clearing member is not a _____ member.',
  'trading',
  'medium',
  '{"membership"}',
  'Clearing-only role.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Option price depends on spot price, strike price, volatility, time and _____ rates.',
  'interest',
  'hard',
  '{"pricing"}',
  'Option pricing factors.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Covered call strategy restricts upside but leaves _____ loss potential.',
  'unlimited',
  'medium',
  '{"risk"}',
  'Covered call risk.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Bid price is the price at which market is prepared to _____.',
  'buy',
  'easy',
  '{"quotes"}',
  'Bid definition.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Ask price is the price at which market is prepared to _____.',
  'sell',
  'easy',
  '{"quotes"}',
  'Ask definition.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Initial margin is based on VaR while MTM is calculated on _____ basis.',
  'daily',
  'easy',
  '{"margin"}',
  'MTM frequency.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Immediate-or-cancel order cancels unmatched portion _____.',
  'immediately',
  'easy',
  '{"IOC"}',
  'Order behavior.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Difference between spot and futures price is called _____.',
  'basis',
  'easy',
  '{"pricing"}',
  'Basis definition.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Market maker provides _____ way quotes.',
  'two',
  'easy',
  '{"liquidity"}',
  'Bid and ask.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Impact cost differs for the buyer and the _____.',
  'seller',
  'medium',
  '{"liquidity"}',
  'Impact cost asymmetry.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Contract month refers to the _____ month of futures contract.',
  'maturity',
  'easy',
  '{"expiry"}',
  'Contract month meaning.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Seller of a put option prefers the spot price to _____.',
  'rise',
  'medium',
  '{"view"}',
  'Bullish view.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'If trading member reaches position limit, only _____ transactions are allowed.',
  'squaring-off',
  'hard',
  '{"risk"}',
  'Exposure reduction.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'The primary objective of derivatives is to manage _____.',
  'risk',
  'easy',
  '{"hedging"}',
  'Derivatives are mainly risk management tools.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Derivative market mainly consists of hedgers and _____.',
  'speculators',
  'easy',
  '{"participants"}',
  'Two main participants.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'The minimum price movement in a contract is called _____.',
  'tick size',
  'easy',
  '{"pricing"}',
  'Defined by exchange.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Forward contracts are _____ contracts.',
  'customized',
  'easy',
  '{"OTC"}',
  'Terms are negotiated.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Futures contracts are _____ contracts.',
  'standardized',
  'easy',
  '{"exchange"}',
  'Exchange traded contracts.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Difference between spot price and futures price is called _____.',
  'basis',
  'easy',
  '{"pricing"}',
  'Basis definition.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'When futures price is higher than spot price, market is in _____.',
  'contango',
  'medium',
  '{"market"}',
  'Normal market condition.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'When spot price is higher than futures price, market is in _____.',
  'backwardation',
  'medium',
  '{"market"}',
  'Inverted market.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Mark-to-market settlement is done on a _____ basis.',
  'daily',
  'easy',
  '{"MTM"}',
  'Daily settlement.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Initial margin is collected to cover _____ risk.',
  'default',
  'easy',
  '{"margin"}',
  'Protects against default.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Clearing corporation acts as a legal _____.',
  'counterparty',
  'medium',
  '{"settlement"}',
  'Guarantees settlement.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Higher volatility leads to higher margin _____.',
  'requirement',
  'easy',
  '{"risk"}',
  'Volatility-based margins.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Bid price is the price at which market is prepared to _____.',
  'buy',
  'easy',
  '{"quotes"}',
  'Bid definition.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Ask price is the price at which market is prepared to _____.',
  'sell',
  'easy',
  '{"quotes"}',
  'Ask definition.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'The difference between bid and ask price is called _____.',
  'spread',
  'easy',
  '{"liquidity"}',
  'Bid-ask spread.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Cost arising due to bid-ask spread is called _____.',
  'impact cost',
  'medium',
  '{"liquidity"}',
  'Impact cost meaning.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Speculators provide market _____.',
  'liquidity',
  'easy',
  '{"role"}',
  'Speculators add liquidity.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Hedgers aim to _____ risk.',
  'reduce',
  'easy',
  '{"purpose"}',
  'Risk reduction.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Leverage allows large exposure with small _____.',
  'margin',
  'easy',
  '{"capital"}',
  'Margin trading.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Systematic risk affects the entire _____.',
  'market',
  'easy',
  '{"risk"}',
  'Market-wide risk.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Unsystematic risk can be reduced by _____.',
  'diversification',
  'easy',
  '{"portfolio"}',
  'Diversifiable risk.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Derivative trading in India is done through an online _____ system.',
  'screen-based',
  'medium',
  '{"trading"}',
  'Screen based trading.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Settlement guarantee fund is maintained by the _____ corporation.',
  'clearing',
  'hard',
  '{"safety"}',
  'Guarantees settlement.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Price limits restrict daily price _____.',
  'movement',
  'easy',
  '{"volatility"}',
  'Circuit limits.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Derivative losses on recognised exchanges are treated as _____ income.',
  'non-speculative',
  'medium',
  '{"tax"}',
  'Income tax rule.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'On expiry day, spot price and futures price should ideally be _____.',
  'same',
  'easy',
  '{"convergence"}',
  'Price convergence.'
);


-- Verify insertion
SELECT 
  topic, 
  COUNT(*) as question_count
FROM quiz_questions 
GROUP BY topic
ORDER BY topic;

SELECT COUNT(*) as total_questions FROM quiz_questions;