import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense, useState } from 'react';
import { Homepage } from './components/Homepage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { AuthModal } from './components/AuthModal';

// Lazy load heavy components for better performance
const Dashboard = lazy(() => import('./components/Dashboard').then(module => ({ default: module.Dashboard })));
const Quiz = lazy(() => import('./components/Quiz').then(module => ({ default: module.Quiz })));
const Login = lazy(() => import('./components/Login').then(module => ({ default: module.Login })));
const SubscriptionPlans = lazy(() => import('./components/SubscriptionPlans').then(module => ({ default: module.SubscriptionPlans })));
const DashboardHome = lazy(() => import('./components/DashboardHome').then(module => ({ default: module.DashboardHome })));
const Terms = lazy(() => import('./components/Terms').then(module => ({ default: module.Terms })));
const ShippingPolicy = lazy(() => import('./components/ShippingPolicy').then(module => ({ default: module.ShippingPolicy })));
const RefundPolicy = lazy(() => import('./components/RefundPolicy').then(module => ({ default: module.RefundPolicy })));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy').then(module => ({ default: module.PrivacyPolicy })));

// Loading Component
import { PageLoader } from './components/PageLoader';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');

  const openAuthModal = (tab: 'login' | 'signup') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            defaultTab={authModalTab}
          />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Login defaultTab="signup" />} />

              {/* Subscription Plans - Public page with navbar */}
              <Route path="/subscribe" element={
                <div className="min-h-screen bg-white dark:bg-black">
                  <Navbar onOpenAuthModal={openAuthModal} />
                  <main role="main" className="fade-in">
                    <SubscriptionPlans />
                  </main>
                  <Footer />
                </div>
              } />

              {/* Dashboard - Main landing page after login */}
              <Route path="/dashboard" element={
                <ProtectedRoute requireSubscription={false}>
                  <div className="min-h-screen bg-white dark:bg-black">
                    <Navbar onOpenAuthModal={openAuthModal} />
                    <main role="main" className="fade-in">
                      <DashboardHome />
                    </main>
                    <Footer />
                  </div>
                </ProtectedRoute>
              } />

              {/* Formulas - Requires subscription */}
              <Route path="/formulas" element={
                <ProtectedRoute requireSubscription={true}>
                  <div className="min-h-screen bg-white dark:bg-black">
                    <Navbar onOpenAuthModal={openAuthModal} />
                    <main role="main" className="fade-in">
                      <Dashboard />
                    </main>
                    <Footer />
                  </div>
                </ProtectedRoute>
              } />

              {/* Quiz - Requires subscription */}
              <Route path="/quiz" element={
                <ProtectedRoute requireSubscription={true}>
                  <div className="min-h-screen bg-white dark:bg-black">
                    <Navbar onOpenAuthModal={openAuthModal} />
                    <main role="main" className="fade-in">
                      <Quiz />
                    </main>
                    <Footer />
                  </div>
                </ProtectedRoute>
              } />

              {/* Terms & Conditions - Public page */}
              <Route path="/terms" element={
                <div className="min-h-screen bg-white dark:bg-black">
                  <Navbar onOpenAuthModal={openAuthModal} />
                  <Terms />
                  <Footer />
                </div>
              } />

              {/* Privacy Policy - Public page */}
              <Route path="/privacy" element={
                <div className="min-h-screen bg-white dark:bg-black">
                  <Navbar onOpenAuthModal={openAuthModal} />
                  <PrivacyPolicy />
                  <Footer />
                </div>
              } />

              {/* Shipping & Delivery Policy - Public page */}
              <Route path="/shipping" element={
                <div className="min-h-screen bg-white dark:bg-black">
                  <Navbar onOpenAuthModal={openAuthModal} />
                  <ShippingPolicy />
                  <Footer />
                </div>
              } />

              {/* Refund & Cancellation Policy - Public page */}
              <Route path="/refund" element={
                <div className="min-h-screen bg-white dark:bg-black">
                  <Navbar onOpenAuthModal={openAuthModal} />
                  <RefundPolicy />
                  <Footer />
                </div>
              } />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
