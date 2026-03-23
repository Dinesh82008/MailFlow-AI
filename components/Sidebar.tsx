import React from 'react';
import { LayoutDashboard, Mail, Users, BarChart2, Settings, Send, Server, FileText, Globe, UserCheck, ShieldCheck, LogOut, Cpu, Zap, DollarSign, Share2 } from 'lucide-react';
import { AuthUser } from '../types';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  currentUser?: AuthUser | null;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, currentUser, onLogout }) => {
  const menuGroups = [
    {
      label: 'Main',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'customers', label: 'Customers', icon: UserCheck },
        { id: 'integrations', label: 'Integrations', icon: Share2 },
      ]
    },
    {
      label: 'Campaigns',
      items: [
        { id: 'campaigns', label: 'All Campaigns', icon: Mail },
        { id: 'automation', label: 'Automation', icon: Cpu },
        { id: 'transactional', label: 'Transactional', icon: Zap },
        { id: 'templates', label: 'Email Templates', icon: FileText },
      ]
    },
    {
      label: 'Lists & Subscribers',
      items: [
        { id: 'subscribers', label: 'Lists & Segments', icon: Users },
      ]
    },
    {
      label: 'Monetization',
      items: [
        { id: 'monetization', label: 'Monetization', icon: DollarSign },
      ]
    },
    {
      label: 'Infrastructure',
      items: [
        { id: 'servers', label: 'Delivery Servers', icon: Server },
        { id: 'domains', label: 'Sending Domains', icon: Globe },
        { id: 'analytics', label: 'Reporting', icon: BarChart2 },
      ]
    },
    {
      label: 'Configuration',
      items: [
        { id: 'settings', label: 'Settings', icon: Settings },
      ]
    }
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 z-10 shadow-xl">
      <div className="p-6 flex items-center space-x-3 border-b border-slate-800 shrink-0">
        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Send size={20} className="text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">MailFlow AI</span>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
        {menuGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              {group.label}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-medium text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 shrink-0">
        <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
           <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-indigo-500 flex items-center justify-center text-xs font-bold shrink-0">
              {currentUser?.avatar || 'JD'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">{currentUser?.name || 'John Doe'}</p>
              <p className="text-xs text-slate-400 truncate">{currentUser?.role || 'Super Admin'}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-700 transition-colors"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};