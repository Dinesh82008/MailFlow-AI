import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Campaigns } from './pages/Campaigns';
import { Subscribers } from './pages/Subscribers';
import { Analytics } from './pages/Analytics';
import { Templates } from './pages/Templates';
import { Servers } from './pages/Servers';
import { Customers } from './pages/Customers';
import { Domains } from './pages/Domains';
import { Settings } from './pages/Settings';
import { Automation } from './pages/Automation';
import { Transactional } from './pages/Transactional';
import { Monetization } from './pages/Monetization';
import { Integrations } from './pages/Integrations';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AuthUser } from './types';

const App: React.FC = () => {
  // Landing State
  const [showLanding, setShowLanding] = useState(true);

  // Auth State
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authPage, setAuthPage] = useState<'login' | 'register'>('login');

  // App Navigation State
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = (loggedInUser: AuthUser) => {
    setUser(loggedInUser);
    setCurrentPage('dashboard');
  };

  const handleRegister = (newUser: AuthUser) => {
    setUser(newUser);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setAuthPage('login');
    setShowLanding(true);
  };

  // If showing landing page
  if (showLanding && !user) {
    return <Landing onEnterApp={() => setShowLanding(false)} />;
  }

  // If not authenticated, show Auth Pages
  if (!user) {
    if (authPage === 'register') {
      return <Register onRegister={handleRegister} onSwitchToLogin={() => setAuthPage('login')} />;
    }
    return <Login onLogin={handleLogin} onSwitchToRegister={() => setAuthPage('register')} />;
  }

  // Main App Content
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'campaigns': return <Campaigns />;
      case 'automation': return <Automation />;
      case 'transactional': return <Transactional />;
      case 'subscribers': return <Subscribers />;
      case 'analytics': return <Analytics />;
      case 'templates': return <Templates />;
      case 'servers': return <Servers />;
      case 'customers': return <Customers />;
      case 'domains': return <Domains />;
      case 'monetization': return <Monetization />;
      case 'integrations': return <Integrations />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex animate-fade-in">
      {/* Sidebar */}
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        currentUser={user}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen">
        {renderPage()}
      </main>

      {/* Mobile/API Key Warning Overlay (Optional Polish) */}
      {!process.env.API_KEY && (
        <div className="fixed bottom-4 right-4 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg shadow-lg max-w-sm z-50 text-sm">
           <strong>Note:</strong> API_KEY is missing. The AI generation feature will not function without a valid Gemini API key in the environment variables.
        </div>
      )}
    </div>
  );
};

export default App;