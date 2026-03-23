import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell, PieChart, Pie } from 'recharts';
import { DollarSign, TrendingUp, ShoppingBag, Target } from 'lucide-react';

const DATA = [
  { name: 'Mon', opens: 4000, clicks: 2400, sends: 12000, revenue: 2400 },
  { name: 'Tue', opens: 3000, clicks: 1398, sends: 10000, revenue: 1800 },
  { name: 'Wed', opens: 2000, clicks: 9800, sends: 15000, revenue: 4200 },
  { name: 'Thu', opens: 2780, clicks: 3908, sends: 11000, revenue: 2900 },
  { name: 'Fri', opens: 1890, clicks: 4800, sends: 9000, revenue: 3100 },
  { name: 'Sat', opens: 2390, clicks: 3800, sends: 8500, revenue: 1500 },
  { name: 'Sun', opens: 3490, clicks: 4300, sends: 10500, revenue: 2100 },
];

const REVENUE_BY_SOURCE = [
  { name: 'Email Campaigns', value: 45000, color: '#6366f1' },
  { name: 'Automated Flows', value: 32000, color: '#a855f7' },
  { name: 'Transactional', value: 12000, color: '#10b981' },
  { name: 'SMS/Omnichannel', value: 8000, color: '#f59e0b' },
];

export const Analytics: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Performance & Revenue Analytics</h1>
        <p className="text-slate-500">Track engagement and verify exact revenue attribution from your campaigns.</p>
      </div>

      {/* Revenue Attribution Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
             <div className="flex items-center justify-between mb-2">
               <h3 className="text-xs font-bold text-slate-400 uppercase">Total Revenue</h3>
               <div className="p-2 bg-green-50 text-green-600 rounded-lg"><DollarSign size={16} /></div>
             </div>
             <p className="text-2xl font-bold text-slate-900">$97,000</p>
             <p className="text-xs text-green-500 font-medium mt-1">+12.4% from last month</p>
         </div>
         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
             <div className="flex items-center justify-between mb-2">
               <h3 className="text-xs font-bold text-slate-400 uppercase">Avg. Order Value</h3>
               <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><ShoppingBag size={16} /></div>
             </div>
             <p className="text-2xl font-bold text-slate-900">$84.50</p>
             <p className="text-xs text-blue-500 font-medium mt-1">+2.1% from last month</p>
         </div>
         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
             <div className="flex items-center justify-between mb-2">
               <h3 className="text-xs font-bold text-slate-400 uppercase">Conversion Rate</h3>
               <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Target size={16} /></div>
             </div>
             <p className="text-2xl font-bold text-slate-900">3.8%</p>
             <p className="text-xs text-purple-500 font-medium mt-1">+0.5% from last month</p>
         </div>
         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
             <div className="flex items-center justify-between mb-2">
               <h3 className="text-xs font-bold text-slate-400 uppercase">ROI</h3>
               <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><TrendingUp size={16} /></div>
             </div>
             <p className="text-2xl font-bold text-slate-900">12.5x</p>
             <p className="text-xs text-indigo-500 font-medium mt-1">Highly Profitable</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Revenue Attribution by Source</h3>
          <div className="h-[300px] flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={REVENUE_BY_SOURCE}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {REVENUE_BY_SOURCE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Revenue Over Time</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DATA}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={value => `$${value / 1000}k`} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
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
