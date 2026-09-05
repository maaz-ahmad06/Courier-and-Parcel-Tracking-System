import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Context Providers
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { ParcelProvider } from './context/ParcelContext';

// Components
import Preloader from './components/common/Preloader';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <ParcelProvider>
            
            {/* Full-screen Logistics Preloader */}
            <AnimatePresence mode="wait">
              {isLoading && (
                <Preloader onFinish={() => setIsLoading(false)} />
              )}
            </AnimatePresence>

            {/* Main Application Container */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoading ? 0 : 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="min-h-screen bg-[#0b0f19] text-slate-100"
            >
              <AppRoutes />
            </motion.div>

          </ParcelProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
