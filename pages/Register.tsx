import React, { useState } from 'react';
import { Mail, Lock, Loader2, Send, User, CheckCircle } from 'lucide-react';
import { AuthUser } from '../types';

interface RegisterProps {
  onRegister: (user: AuthUser) => void;
  onSwitchToLogin: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onRegister, onSwitchToLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Mock successful registration
      onRegister({
        id: Date.now().toString(),
        name: name,
        email: email,
        role: 'Admin',
        avatar: name.substring(0, 2).toUpperCase()
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      <div className="mb-8 flex items-center space-x-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/20">
          <Send size={24} className="text-white" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-slate-800">MailFlow AI</span>
      </div>

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 w-full max-w-md p-8 border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Create Account</h2>
          <p className="text-slate-500 mt-2">Start your email marketing journey today.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
           <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                placeholder="Create a strong password"
              />
            </div>
            <div className="mt-2 text-xs text-slate-500 flex items-center">
                <CheckCircle size={12} className="text-green-500 mr-1" /> Must be at least 8 characters
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <span>Get Started</span>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            Already have an account?{' '}
            <button onClick={onSwitchToLogin} className="text-indigo-600 font-semibold hover:underline">
              Sign in
            </button>
          </p>
        </div>
      </div>
      
      <div className="mt-8 text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} MailFlow AI. All rights reserved.
      </div>
    </div>
  );
};