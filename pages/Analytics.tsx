import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const DATA = [
  { name: 'Mon', opens: 4000, clicks: 2400, sends: 12000 },
  { name: 'Tue', opens: 3000, clicks: 1398, sends: 10000 },
  { name: 'Wed', opens: 2000, clicks: 9800, sends: 15000 },
  { name: 'Thu', opens: 2780, clicks: 3908, sends: 11000 },
  { name: 'Fri', opens: 1890, clicks: 4800, sends: 9000 },
  { name: 'Sat', opens: 2390, clicks: 3800, sends: 8500 },
  { name: 'Sun', opens: 3490, clicks: 4300, sends: 10500 },
];

export const Analytics: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Performance Analytics</h1>
        <p className="text-slate-500">Deep dive into your campaign metrics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
             <h3 className="text-sm font-medium text-slate-500 uppercase">Total Sends</h3>
             <p className="text-3xl font-bold text-slate-900 mt-1">76,000</p>
         </div>
         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
             <h3 className="text-sm font-medium text-slate-500 uppercase">Avg Open Rate</h3>
             <p className="text-3xl font-bold text-indigo-600 mt-1">32.4%</p>
         </div>
         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
             <h3 className="text-sm font-medium text-slate-500 uppercase">Avg Click Rate</h3>
             <p className="text-3xl font-bold text-purple-600 mt-1">4.2%</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Engagement Over Time</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DATA}>
                <defs>
                  <linearGradient id="colorOpens" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={value => `${value / 1000}k`} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="opens" stroke="#6366f1" fillOpacity={1} fill="url(#colorOpens)" />
                <Area type="monotone" dataKey="clicks" stroke="#a855f7" fillOpacity={1} fill="url(#colorClicks)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Daily Sends vs Interactions</h3>
          <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={value => `${value / 1000}k`} />
                <Tooltip 
                   cursor={{fill: '#f8fafc'}}
                   contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Bar dataKey="sends" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="opens" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};