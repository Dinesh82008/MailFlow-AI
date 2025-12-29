import React from 'react';
import { Server, Plus, CheckCircle, XCircle, Settings, Shield } from 'lucide-react';
import { DeliveryServer } from '../types';

const MOCK_SERVERS: DeliveryServer[] = [
    { id: '1', name: 'System SMTP', type: 'SMTP', host: 'smtp.mailflow.com', status: 'Active', hourlyQuota: 500, currentUsage: 120 },
    { id: '2', name: 'Amazon SES (East)', type: 'Amazon SES', status: 'Active', hourlyQuota: 10000, currentUsage: 4500 },
    { id: '3', name: 'Mailgun Backup', type: 'Mailgun', status: 'Inactive', hourlyQuota: 2000, currentUsage: 0 },
];

export const Servers: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Delivery Servers</h1>
          <p className="text-slate-500">Manage SMTP and API servers for email delivery rotation.</p>
        </div>
        <button className="flex items-center justify-center space-x-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20">
          <Plus size={20} />
          <span>Add New Server</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Name / Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Hourly Quota</th>
              <th className="px-6 py-4">Usage</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_SERVERS.map((server) => (
              <tr key={server.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                     <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                         <Server size={20} />
                     </div>
                     <div>
                        <h3 className="font-medium text-slate-900">{server.name}</h3>
                        <p className="text-sm text-slate-500">{server.type} {server.host ? `(${server.host})` : ''}</p>
                     </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                   <div className="flex items-center">
                       {server.status === 'Active' ? <CheckCircle size={16} className="text-green-500 mr-2" /> : <XCircle size={16} className="text-slate-400 mr-2" />}
                       <span className={`text-sm font-medium ${server.status === 'Active' ? 'text-green-700' : 'text-slate-600'}`}>
                           {server.status}
                       </span>
                   </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-800">
                    {server.hourlyQuota.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                    <div className="w-full max-w-[140px]">
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-500">Used</span>
                            <span className="font-bold text-slate-700">{Math.round((server.currentUsage / server.hourlyQuota) * 100)}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div 
                                className={`h-full rounded-full ${server.status === 'Active' ? 'bg-indigo-500' : 'bg-slate-300'}`} 
                                style={{ width: `${(server.currentUsage / server.hourlyQuota) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-indigo-600 p-2 rounded-lg hover:bg-indigo-50 transition-colors">
                        <Settings size={18} />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Bounce Servers Section */}
        <div className="bg-slate-50 p-6 border-t border-slate-200 mt-0">
             <div className="flex items-center justify-between mb-4">
                 <div>
                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide flex items-center">
                        <Shield size={16} className="mr-2" /> Bounce Servers
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">Servers configured to handle bounce reports.</p>
                 </div>
                 <button className="text-sm text-indigo-600 font-medium hover:underline">Manage Bounce Servers</button>
             </div>
             <div className="flex items-center space-x-2 text-sm text-slate-600">
                 <span className="w-2 h-2 rounded-full bg-green-500"></span>
                 <span>System IMAP (Active)</span>
                 <span className="mx-2 text-slate-300">|</span>
                 <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                 <span>Pop3 Backup (Inactive)</span>
             </div>
        </div>
      </div>
    </div>
  );
};
