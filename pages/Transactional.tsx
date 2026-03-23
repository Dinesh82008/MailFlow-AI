import React from 'react';
import { ShieldCheck, Mail, Zap, Clock, AlertCircle, Plus, MoreVertical, CheckCircle2, XCircle } from 'lucide-react';

export const Transactional: React.FC = () => {
  const transactionalEmails = [
    { id: 1, name: 'Order Confirmation', type: 'E-commerce', status: 'Active', delivery: '99.9%', open: '78.2%', click: '12.5%' },
    { id: 2, name: 'Password Reset', type: 'Account', status: 'Active', delivery: '100%', open: '92.1%', click: '85.4%' },
    { id: 3, name: 'Account Alert', type: 'Security', status: 'Active', delivery: '99.8%', open: '65.4%', click: '5.2%' },
    { id: 4, name: 'Shipping Update', type: 'E-commerce', status: 'Paused', delivery: '99.7%', open: '82.1%', click: '15.8%' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Transactional Email Support</h1>
          <p className="text-slate-500">Automated, non-marketing messages like order confirmations and password resets.</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium flex items-center shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all">
          <Plus size={18} className="mr-2" />
          Create Template
        </button>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-4">
            <ShieldCheck size={24} />
          </div>
          <h3 className="font-bold text-slate-800 mb-2">High Deliverability</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Specialized infrastructure for sending automated, non-marketing messages like order confirmations, password resets, and account alerts.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
            <Zap size={24} />
          </div>
          <h3 className="font-bold text-slate-800 mb-2">Real-time Delivery</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Optimized for immediate delivery. Ensure your users receive their critical alerts and confirmations within seconds.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-4">
            <Clock size={24} />
          </div>
          <h3 className="font-bold text-slate-800 mb-2">Detailed Tracking</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Track every delivery, open, and click for your transactional messages. Monitor your system's health in real-time.
          </p>
        </div>
      </div>

      {/* Transactional Emails Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-bold text-slate-800">Transactional Templates</h2>
          <div className="flex space-x-2">
            <button className="text-xs font-bold text-slate-500 uppercase hover:text-indigo-600">All</button>
            <button className="text-xs font-bold text-slate-500 uppercase hover:text-indigo-600">E-commerce</button>
            <button className="text-xs font-bold text-slate-500 uppercase hover:text-indigo-600">Account</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50">
              <tr>
                <th className="px-6 py-4">Template Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Delivery</th>
                <th className="px-6 py-4">Open Rate</th>
                <th className="px-6 py-4">Click Rate</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactionalEmails.map((email) => (
                <tr key={email.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-800">{email.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      email.type === 'E-commerce' ? 'bg-blue-100 text-blue-700' : 
                      email.type === 'Account' ? 'bg-indigo-100 text-indigo-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {email.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {email.status === 'Active' ? <CheckCircle2 size={16} className="text-green-500 mr-2" /> : <XCircle size={16} className="text-orange-500 mr-2" />}
                      <span className="text-slate-600">{email.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{email.delivery}</td>
                  <td className="px-6 py-4 text-slate-600">{email.open}</td>
                  <td className="px-6 py-4 text-slate-600">{email.click}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-200 transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
