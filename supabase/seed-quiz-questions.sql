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
  'PMS is regulated by _____.',
  'SEBI',
  'easy',
  '{"regulator"}',
  'Portfolio Management Services are regulated by SEBI.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'Minimum investment amount in PMS is Rs _____.',
  '50 lakh',
  'easy',
  '{"threshold"}',
  'SEBI mandates minimum ₹50 lakh.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'PMS can be offered in discretionary and _____ modes.',
  'non-discretionary',
  'easy',
  '{"types"}',
  'Two types of PMS accounts.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'Portfolio manager cannot _____ client securities.',
  'pledge',
  'easy',
  '{"restriction"}',
  'Client securities cannot be pledged.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'PMS investment rationale must be disclosed under Regulation _____.',
  '27',
  'medium',
  '{"SEBI rule"}',
  'Regulation 27 covers disclosures.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'PMS operating expenses cannot exceed _____% per annum.',
  '0.50',
  'hard',
  '{"expense limit"}',
  'Expense cap excluding brokerage.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'Client funds in PMS are held in a _____ account.',
  'bank',
  'easy',
  '{"custody"}',
  'Client money held in bank account.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'PMS cannot borrow funds on behalf of the _____.',
  'client',
  'easy',
  '{"restriction"}',
  'Borrowing on client behalf prohibited.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'Custom benchmarks are more accurate but more _____.',
  'expensive',
  'easy',
  '{"cost"}',
  'Custom benchmarks cost more.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'PMS returns must be shown in the _____ used.',
  'currency',
  'easy',
  '{"GIPS"}',
  'Currency disclosure mandatory.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'NRIs can open PMS account without _____ permission.',
  'RBI',
  'easy',
  '{"NRI"}',
  'No RBI permission needed.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'PMS must align investments with client _____ profile.',
  'risk',
  'easy',
  '{"suitability"}',
  'Risk profiling required.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'Portfolio beta is the _____ average of individual betas.',
  'weighted',
  'easy',
  '{"formula"}',
  'Weighted average method.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'Market risk cannot be removed through _____.',
  'diversification',
  'easy',
  '{"systematic"}',
  'Systematic risk persists.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'Nominal rate includes expected _____.',
  'inflation',
  'easy',
  '{"returns"}',
  'Nominal = real + inflation.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'Real rate ignores the effect of _____.',
  'inflation',
  'easy',
  '{"purchasing power"}',
  'Real return adjusts inflation.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'PMS advertisements must show at least _____ years of returns.',
  'five',
  'easy',
  '{"GIPS"}',
  'Minimum 5-year disclosure.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'PMS is not allowed to invest in _____ shares.',
  'unlisted',
  'medium',
  '{"restriction"}',
  'Unlisted shares prohibited.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'Client grievances must be addressed through proper _____ mechanism.',
  'redressal',
  'easy',
  '{"SEBI"}',
  'Grievance redressal required.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'PMS registration requires disclosure of accounting _____.',
  'systems',
  'easy',
  '{"infrastructure"}',
  'Accounting systems checked.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'Risk-free rate adjusted for inflation is called _____ rate.',
  'real',
  'medium',
  '{"returns"}',
  'Real risk-free rate.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'PMS fees are charged as a percentage of _____.',
  'AUM',
  'easy',
  '{"assets"}',
  'Assets Under Management.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'PMS investment decisions must be properly _____.',
  'documented',
  'easy',
  '{"records"}',
  'Documentation mandatory.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'PMS cannot guarantee _____ to clients.',
  'returns',
  'easy',
  '{"risk"}',
  'Returns not guaranteed.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'PMS',
  'PMS is suitable for _____ net-worth investors.',
  'high',
  'easy',
  '{"HNIs"}',
  'PMS targets HNIs.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Saving always _____ investing.',
  'precedes',
  'easy',
  '{"order"}',
  'Saving comes before investing.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'A mutual fund is structured as a _____.',
  'trust',
  'easy',
  '{"structure"}',
  'MF operates as trust.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'NAV of open-ended schemes is calculated _____ daily.',
  'once',
  'easy',
  '{"frequency"}',
  'NAV disclosed daily.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'ELSS schemes have a lock-in of _____ years.',
  'three',
  'easy',
  '{"tax"}',
  'Statutory lock-in.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Mutual funds pass risk and return to _____.',
  'investors',
  'easy',
  '{"ownership"}',
  'MF is pass-through.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Market risk cannot be eliminated by _____.',
  'diversification',
  'easy',
  '{"systematic"}',
  'Market risk remains.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'SIP stands for Systematic _____ Plan.',
  'Investment',
  'easy',
  '{"abbreviation"}',
  'SIP expands to Investment.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'SWP provides _____ income to investors.',
  'regular',
  'easy',
  '{"withdrawal"}',
  'Systematic withdrawals.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'STP transfers money between _____ schemes.',
  'two',
  'easy',
  '{"movement"}',
  'Source to target scheme.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Close-ended schemes have fixed _____.',
  'maturity',
  'easy',
  '{"tenure"}',
  'Fixed maturity.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'ETF units are traded on the _____.',
  'exchange',
  'easy',
  '{"stock market"}',
  'ETFs trade like stocks.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Passive funds aim to track an _____.',
  'index',
  'easy',
  '{"benchmark"}',
  'Index tracking.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Expense ratio represents cost of managing the _____.',
  'fund',
  'easy',
  '{"TER"}',
  'Total Expense Ratio.'
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
  'PAN is compulsory except for _____ SIPs.',
  'micro',
  'medium',
  '{"limit"}',
  'Micro SIP exemption.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Mutual fund distributor earns income through _____.',
  'commission',
  'easy',
  '{"earnings"}',
  'Commission based.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Entry load in mutual funds is currently _____.',
  'nil',
  'easy',
  '{"charges"}',
  'Entry load abolished.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Exit load is charged on _____ before time.',
  'redemption',
  'easy',
  '{"fees"}',
  'Charged on early exit.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Gilt funds invest in _____ securities.',
  'government',
  'easy',
  '{"risk-free"}',
  'Government bonds.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Corporate bond funds invest mainly in _____ rated bonds.',
  'AA+',
  'medium',
  '{"credit"}',
  'High-rated bonds.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'NAV for equity funds is calculated up to _____ decimals.',
  'two',
  'hard',
  '{"precision"}',
  'SEBI guideline.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Fund factsheet is published on a _____ basis.',
  'monthly',
  'easy',
  '{"report"}',
  'Monthly disclosure.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Index funds have _____ running costs.',
  'low',
  'easy',
  '{"expenses"}',
  'Low cost structure.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Riskometer shows _____ level of scheme.',
  'risk',
  'easy',
  '{"indicator"}',
  'Risk classification.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'MFD',
  'Children’s fund has minimum lock-in of _____ years.',
  'five',
  'easy',
  '{"solution fund"}',
  'Child investment.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'A call option gives the right to _____ the underlying.',
  'buy',
  'easy',
  '{"rights"}',
  'Call option buy right.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'A put option gives the right to _____ the underlying.',
  'sell',
  'easy',
  '{"rights"}',
  'Put option sell right.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'All equity options in India are of _____ style.',
  'European',
  'easy',
  '{"exercise"}',
  'European options.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Option premium is paid by the option _____.',
  'buyer',
  'easy',
  '{"premium"}',
  'Buyer pays premium.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Time decay benefits the option _____.',
  'seller',
  'medium',
  '{"theta"}',
  'Seller gains from decay.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Delta measures sensitivity to _____ price.',
  'spot',
  'medium',
  '{"greeks"}',
  'Underlying price.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Gamma measures change in _____.',
  'delta',
  'medium',
  '{"greeks"}',
  'Change in delta.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Theta measures sensitivity to _____.',
  'time',
  'easy',
  '{"decay"}',
  'Time decay.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Vega measures sensitivity to _____.',
  'volatility',
  'easy',
  '{"greeks"}',
  'Volatility impact.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Rho measures sensitivity to _____ rates.',
  'interest',
  'hard',
  '{"greeks"}',
  'Interest rate effect.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Futures contracts have _____ payoff.',
  'linear',
  'easy',
  '{"payoff"}',
  'Linear payoff.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Index futures in India are settled in _____.',
  'cash',
  'easy',
  '{"settlement"}',
  'Cash settlement.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Stock options are settled by _____ delivery.',
  'physical',
  'medium',
  '{"shares"}',
  'Physical settlement.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Difference between spot and future price is _____.',
  'basis',
  'easy',
  '{"pricing"}',
  'Basis definition.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Higher volatility leads to higher option _____.',
  'premium',
  'easy',
  '{"pricing"}',
  'Volatility effect.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'ITM call option delta approaches _____.',
  '1',
  'hard',
  '{"expiry"}',
  'Delta near +1.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'ITM put option delta approaches _____.',
  '-1',
  'hard',
  '{"expiry"}',
  'Delta near -1.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'OTM options have _____ intrinsic value.',
  'zero',
  'easy',
  '{"value"}',
  'No intrinsic value.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Leverage allows high exposure with low _____.',
  'margin',
  'easy',
  '{"capital"}',
  'Margin trading.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Speculators primarily _____ risk.',
  'take',
  'easy',
  '{"participants"}',
  'Speculators take risk.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Hedgers aim to _____ risk.',
  'reduce',
  'easy',
  '{"participants"}',
  'Risk reduction.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'IOC order cancels unexecuted portion _____.',
  'immediately',
  'easy',
  '{"order"}',
  'Immediate-or-cancel.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'Market order is placed without specifying _____.',
  'price',
  'easy',
  '{"order"}',
  'Market price execution.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'STT stands for Security Transaction _____.',
  'Tax',
  'easy',
  '{"charges"}',
  'Transaction tax.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Equity Derivatives',
  'On expiry, spot and futures prices converge to be _____.',
  'same',
  'easy',
  '{"expiry"}',
  'Price convergence.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Derivatives are mainly used for managing _____.',
  'risk',
  'easy',
  '{"purpose"}',
  'Primary objective.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Difference between two futures prices is called _____.',
  'basis',
  'easy',
  '{"pricing"}',
  'Basis definition.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'When future price exceeds spot price it is called _____.',
  'contango',
  'medium',
  '{"market"}',
  'Normal market.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'When spot price exceeds future price it is called _____.',
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
  'Minimum price movement is called _____.',
  'tick size',
  'easy',
  '{"pricing"}',
  'Exchange defined.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Clearing corporation acts as legal _____.',
  'counterparty',
  'medium',
  '{"settlement"}',
  'Guarantees trades.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Initial margin is collected to cover _____ risk.',
  'default',
  'easy',
  '{"margin"}',
  'Risk mitigation.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Forward contracts are _____ contracts.',
  'customized',
  'easy',
  '{"OTC"}',
  'Not standardized.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Futures contracts are _____ contracts.',
  'standardized',
  'easy',
  '{"exchange"}',
  'Exchange traded.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Bid price is price at which market is ready to _____.',
  'buy',
  'easy',
  '{"quotes"}',
  'Bid definition.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Ask price is price at which market is ready to _____.',
  'sell',
  'easy',
  '{"quotes"}',
  'Ask definition.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Higher liquidity leads to lower _____ cost.',
  'impact',
  'medium',
  '{"spread"}',
  'Impact cost.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Speculators provide market _____.',
  'liquidity',
  'easy',
  '{"role"}',
  'Liquidity providers.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Hedging limits both losses and _____.',
  'profits',
  'easy',
  '{"tradeoff"}',
  'Hedging trade-off.'
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
  'Derivative market shifts risk to _____.',
  'speculators',
  'easy',
  '{"participants"}',
  'Risk transfer.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Settlement guarantee fund is maintained by _____.',
  'clearing corporation',
  'hard',
  '{"regulation"}',
  'Settlement safety.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Higher margin requirement makes trading more _____.',
  'expensive',
  'easy',
  '{"cost"}',
  'Cost of carry.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Market with more participants has higher _____.',
  'liquidity',
  'easy',
  '{"volume"}',
  'Liquidity concept.'
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
  'Basis risk arises due to change in _____.',
  'basis',
  'hard',
  '{"hedging"}',
  'Hedging risk.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Exchange traded derivatives are _____.',
  'transparent',
  'easy',
  '{"screen-based"}',
  'Transparency.'
);

INSERT INTO quiz_questions (topic, question_text, answer, difficulty, hints, explanation)
VALUES (
  'Common Derivatives',
  'Derivative losses on exchanges are treated as _____.',
  'non-speculative',
  'medium',
  '{"tax"}',
  'Income tax rule.'
);


-- Verify insertion
SELECT 
  topic, 
  COUNT(*) as question_count
FROM quiz_questions 
GROUP BY topic
ORDER BY topic;

SELECT COUNT(*) as total_questions FROM quiz_questions;
