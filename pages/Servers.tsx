import React, { useState } from 'react';
import { Server, Plus, CheckCircle, XCircle, Settings, Shield, X, Save, Trash2 } from 'lucide-react';
import { DeliveryServer } from '../types';

const INITIAL_SERVERS: DeliveryServer[] = [
    { id: '1', name: 'System SMTP', type: 'SMTP', host: 'smtp.mailflow.com', status: 'Active', hourlyQuota: 500, currentUsage: 120 },
    { id: '2', name: 'Amazon SES (East)', type: 'Amazon SES', status: 'Active', hourlyQuota: 10000, currentUsage: 4500 },
    { id: '3', name: 'Mailgun Backup', type: 'Mailgun', status: 'Inactive', hourlyQuota: 2000, currentUsage: 0 },
];

export const Servers: React.FC = () => {
  const [servers, setServers] = useState<DeliveryServer[]>(INITIAL_SERVERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingServer, setEditingServer] = useState<DeliveryServer | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'SMTP' as DeliveryServer['type'],
    host: '',
    status: 'Active' as 'Active' | 'Inactive',
    hourlyQuota: 1000
  });

  const handleAddServer = () => {
    const newServer: DeliveryServer = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      host: formData.host,
      status: formData.status,
      hourlyQuota: formData.hourlyQuota,
      currentUsage: 0
    };
    setServers([newServer, ...servers]);
    resetForm();
    setIsModalOpen(false);
  };

  const handleUpdateServer = () => {
    if (!editingServer) return;
    setServers(prev => prev.map(s => 
      s.id === editingServer.id 
        ? { ...s, name: formData.name, type: formData.type, host: formData.host, status: formData.status, hourlyQuota: formData.hourlyQuota } 
        : s
    ));
    setIsSettingsOpen(false);
    setEditingServer(null);
  };

  const handleDeleteServer = (id: string) => {
    setServers(prev => prev.filter(s => s.id !== id));
    setIsSettingsOpen(false);
    setEditingServer(null);
  };

  const openSettings = (server: DeliveryServer) => {
    setEditingServer(server);
    setFormData({
      name: server.name,
      type: server.type,
      host: server.host || '',
      status: server.status,
      hourlyQuota: server.hourlyQuota
    });
    setIsSettingsOpen(true);
  };

  const resetForm = () => {
    setFormData({ name: '', type: 'SMTP', host: '', status: 'Active', hourlyQuota: 1000 });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Delivery Servers</h1>
          <p className="text-slate-500">Manage SMTP and API servers for email delivery rotation.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center justify-center space-x-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
        >
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
            {servers.map((server) => (
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
                    <button 
                      onClick={() => openSettings(server)}
                      className="text-slate-400 hover:text-indigo-600 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
                    >
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

      {/* Add/Edit Server Modal */}
      {(isModalOpen || isSettingsOpen) && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">
                {isModalOpen ? 'Add Delivery Server' : 'Server Settings'}
              </h2>
              <button onClick={() => { setIsModalOpen(false); setIsSettingsOpen(false); }} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Server Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                    placeholder="e.g. Main SMTP Cluster"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Connection Type</label>
                  <select 
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value as DeliveryServer['type']})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="SMTP">SMTP Relay</option>
                    <option value="Amazon SES">Amazon SES</option>
                    <option value="Mailgun">Mailgun</option>
                    <option value="SendGrid">SendGrid</option>
                    <option value="PHP Mail">PHP Mail</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select 
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value as 'Active' | 'Inactive'})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Hourly Quota</label>
                  <input 
                    type="number" 
                    value={formData.hourlyQuota}
                    onChange={e => setFormData({...formData, hourlyQuota: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Host / Endpoint URL</label>
                  <input 
                    type="text" 
                    value={formData.host}
                    onChange={e => setFormData({...formData, host: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                    placeholder="e.g. smtp.provider.com"
                  />
                </div>
              </div>

              <div className="pt-6 flex items-center justify-between border-t border-slate-100">
                {isSettingsOpen && (
                  <button 
                    onClick={() => editingServer && handleDeleteServer(editingServer.id)}
                    className="flex items-center text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    <Trash2 size={16} className="mr-1" /> Delete Server
                  </button>
                )}
                <div className="flex space-x-3 ml-auto">
                  <button 
                    onClick={() => { setIsModalOpen(false); setIsSettingsOpen(false); }}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={isModalOpen ? handleAddServer : handleUpdateServer}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium flex items-center"
                  >
                    <Save size={18} className="mr-2" /> 
                    {isModalOpen ? 'Create Server' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
