import React from 'react';
import { DollarSign, Users, Layout, Plus, MoreVertical, TrendingUp, CreditCard, PieChart } from 'lucide-react';

export const Monetization: React.FC = () => {
  const subscriptions = [
    { id: 1, name: 'Premium Weekly', price: '$9.99/mo', subscribers: '1,245', revenue: '$12,437', status: 'Active' },
    { id: 2, name: 'Daily Insights', price: '$19.99/mo', subscribers: '452', revenue: '$9,035', status: 'Active' },
    { id: 3, name: 'Free Tier', price: '$0.00', subscribers: '12,890', revenue: '$0', status: 'Active' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Newsletter Monetization</h1>
          <p className="text-slate-500">Manage paid subscriptions, ad placements, and creator networks.</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium flex items-center shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all">
          <Plus size={18} className="mr-2" />
          Create Plan
        </button>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-4">
            <DollarSign size={24} />
          </div>
          <h3 className="font-bold text-slate-800 mb-2">Paid Subscriptions</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Integrated tools for managing paid subscriptions, ad placements, and creator networks to generate revenue directly from email content.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
            <Layout size={24} />
          </div>
          <h3 className="font-bold text-slate-800 mb-2">Ad Placements</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Easily manage ad placements in your newsletters. Track impressions and clicks to optimize your revenue.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-4">
            <Users size={24} />
          </div>
          <h3 className="font-bold text-slate-800 mb-2">Creator Networks</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Connect with other creators and cross-promote each other's newsletters to grow your audience and revenue.
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase">Monthly Revenue</p>
          <p className="text-2xl font-bold text-slate-800">$21,472</p>
          <p className="text-xs text-green-500 font-medium mt-1 flex items-center"><TrendingUp size={12} className="mr-1" /> +15.2%</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase">Total Paid Subscribers</p>
          <p className="text-2xl font-bold text-slate-800">1,697</p>
          <p className="text-xs text-green-500 font-medium mt-1 flex items-center"><TrendingUp size={12} className="mr-1" /> +8.4%</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase">Avg. Revenue Per User</p>
          <p className="text-2xl font-bold text-slate-800">$12.65</p>
          <p className="text-xs text-green-500 font-medium mt-1 flex items-center"><TrendingUp size={12} className="mr-1" /> +2.1%</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase">Churn Rate</p>
          <p className="text-2xl font-bold text-slate-800">1.2%</p>
          <p className="text-xs text-green-500 font-medium mt-1">Healthy</p>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-bold text-slate-800">Subscription Plans</h2>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View Analytics</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50">
              <tr>
                <th className="px-6 py-4">Plan Name</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Subscribers</th>
                <th className="px-6 py-4">Total Revenue</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subscriptions.map((plan) => (
                <tr key={plan.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-800">{plan.name}</td>
                  <td className="px-6 py-4 text-slate-600">{plan.price}</td>
                  <td className="px-6 py-4 text-slate-600">{plan.subscribers}</td>
                  <td className="px-6 py-4 font-medium text-green-600">{plan.revenue}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium">
                      {plan.status}
                    </span>
                  </td>
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
