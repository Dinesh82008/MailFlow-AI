import React from 'react';
import { Users, Mail, MousePointer, TrendingUp, ArrowUpRight, ArrowDownRight, Activity, Server, Clock } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Total Subscribers', value: '24,592', change: '+12.5%', trend: 'up', icon: Users, color: 'blue' },
    { label: 'Emails Sent (30d)', value: '142.3k', change: '+8.2%', trend: 'up', icon: Mail, color: 'indigo' },
    { label: 'Avg. Open Rate', value: '24.8%', change: '-1.2%', trend: 'down', icon: TrendingUp, color: 'green' },
    { label: 'Avg. Click Rate', value: '3.4%', change: '+0.8%', trend: 'up', icon: MousePointer, color: 'purple' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">System Dashboard</h1>
          <p className="text-slate-500">Overview of your email marketing performance and system health.</p>
        </div>
        <div className="flex items-center space-x-4 text-sm">
           <div className="flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full">
             <Activity size={14} className="mr-2" />
             <span className="font-medium">Cron Jobs: Running</span>
           </div>
           <div className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
             <Clock size={14} className="mr-2" />
             <span className="font-medium">Version: 2.1.0</span>
           </div>
        </div>
      </div>

      {/* System Health / Quota */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
           <div>
             <p className="text-xs font-bold text-slate-400 uppercase">Sending Quota (Hourly)</p>
             <p className="text-lg font-bold text-slate-800">4,200 / 10,000</p>
           </div>
           <div className="h-10 w-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
             <Server size={20} />
           </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
           <div>
             <p className="text-xs font-bold text-slate-400 uppercase">Bounce Rate (Global)</p>
             <p className="text-lg font-bold text-slate-800">0.8% <span className="text-xs text-green-500 font-normal">Healthy</span></p>
           </div>
           <div className="h-10 w-10 bg-green-50 rounded-full flex items-center justify-center text-green-600">
             <Activity size={20} />
           </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
           <div>
             <p className="text-xs font-bold text-slate-400 uppercase">Pending Delivery</p>
             <p className="text-lg font-bold text-slate-800">145 <span className="text-xs text-slate-400 font-normal">Emails in queue</span></p>
           </div>
           <div className="h-10 w-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
             <Clock size={20} />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isUp = stat.trend === 'up';
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-indigo-50 text-indigo-600`}>
                  <Icon size={24} />
                </div>
                <div className={`flex items-center text-sm font-medium ${isUp ? 'text-green-600' : 'text-red-600'}`}>
                  {isUp ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
              <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">Recent Campaigns</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                <tr>
                  <th className="px-4 py-3">Campaign</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Opens</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Summer Sale Blast', status: 'Sent', opens: '32.1%' },
                  { name: 'Weekly Newsletter #42', status: 'Sent', opens: '28.4%' },
                  { name: 'Product Update: v2.0', status: 'Sending', opens: '12.5%' },
                  { name: 'Welcome Series: Day 1', status: 'Active', opens: '45.2%' },
                  { name: 'Re-engagement Q3', status: 'Draft', opens: '-' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-800">{row.name}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        row.status === 'Sent' ? 'bg-green-100 text-green-700' : 
                        row.status === 'Sending' ? 'bg-blue-100 text-blue-700' : 
                        row.status === 'Active' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-slate-600">{row.opens}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Activity size={80} />
            </div>
            <h3 className="font-bold mb-4 flex items-center">
              <TrendingUp size={18} className="mr-2 text-amber-400" />
              AI Insights
            </h3>
            <div className="space-y-4 relative z-10">
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/10">
                <p className="text-xs text-indigo-100 mb-1 font-medium">Best Time to Send</p>
                <p className="text-sm font-bold">Tuesday at 10:45 AM</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/10">
                <p className="text-xs text-indigo-100 mb-1 font-medium">Top Subject Line</p>
                <p className="text-sm font-bold">"Exclusive: Your personalized offer inside..."</p>
              </div>
              <button className="w-full py-2 bg-white text-indigo-600 rounded-lg text-sm font-bold hover:bg-indigo-50 transition-colors">
                View Full Report
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4">System Health</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-slate-600">API Gateway</span>
                </div>
                <span className="text-xs font-medium text-slate-400">99.9%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-slate-600">SMTP Cluster</span>
                </div>
                <span className="text-xs font-medium text-slate-400">99.8%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-slate-600">AI Engine</span>
                </div>
                <span className="text-xs font-medium text-slate-400">98.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
