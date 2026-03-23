import React, { useState } from 'react';
import { Save, Terminal, DollarSign, Globe, Lock, Bell, CheckCircle, AlertCircle } from 'lucide-react';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'monetization' | 'cron' | 'api'>('general');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [generalSettings, setGeneralSettings] = useState({
    appName: 'MailFlow AI',
    supportEmail: 'support@mailflow.ai',
    timezone: 'UTC',
    dateFormat: 'YYYY-MM-DD'
  });

  const [monetizationSettings, setMonetizationSettings] = useState({
    enablePayments: true,
    stripeConnected: true,
    paypalConnected: false
  });

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
       <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
          <p className="text-slate-500">Configure global application settings and preferences.</p>
        </div>
        <div className="flex items-center space-x-4">
          {showSuccess && (
            <div className="flex items-center text-green-600 text-sm font-medium animate-fade-in">
              <CheckCircle size={16} className="mr-2" />
              Settings saved successfully!
            </div>
          )}
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center space-x-2 bg-slate-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition-colors ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Save size={18} />
            )}
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
          {/* Settings Navigation */}
          <div className="w-full md:w-64 shrink-0">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <nav className="flex flex-col p-2 space-y-1">
                      <button 
                        onClick={() => setActiveTab('general')}
                        className={`text-left px-4 py-3 rounded-lg flex items-center space-x-3 text-sm font-medium ${activeTab === 'general' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
                      >
                          <Globe size={18} />
                          <span>General</span>
                      </button>
                      <button 
                        onClick={() => setActiveTab('monetization')}
                        className={`text-left px-4 py-3 rounded-lg flex items-center space-x-3 text-sm font-medium ${activeTab === 'monetization' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
                      >
                          <DollarSign size={18} />
                          <span>Monetization</span>
                      </button>
                      <button 
                        onClick={() => setActiveTab('cron')}
                        className={`text-left px-4 py-3 rounded-lg flex items-center space-x-3 text-sm font-medium ${activeTab === 'cron' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
                      >
                          <Terminal size={18} />
                          <span>Cron Jobs</span>
                      </button>
                      <button 
                        onClick={() => setActiveTab('api')}
                        className={`text-left px-4 py-3 rounded-lg flex items-center space-x-3 text-sm font-medium ${activeTab === 'api' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
                      >
                          <Lock size={18} />
                          <span>API & Security</span>
                      </button>
                  </nav>
              </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1">
              {activeTab === 'general' && (
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
                      <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4">General Configuration</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Application Name</label>
                              <input 
                                type="text" 
                                value={generalSettings.appName} 
                                onChange={e => setGeneralSettings({...generalSettings, appName: e.target.value})}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                              />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Support Email</label>
                              <input 
                                type="email" 
                                value={generalSettings.supportEmail} 
                                onChange={e => setGeneralSettings({...generalSettings, supportEmail: e.target.value})}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                              />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Timezone</label>
                              <select 
                                value={generalSettings.timezone}
                                onChange={e => setGeneralSettings({...generalSettings, timezone: e.target.value})}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                              >
                                  <option value="UTC">UTC</option>
                                  <option value="America/New_York">America/New_York</option>
                                  <option value="Europe/London">Europe/London</option>
                              </select>
                          </div>
                           <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Date Format</label>
                              <select 
                                value={generalSettings.dateFormat}
                                onChange={e => setGeneralSettings({...generalSettings, dateFormat: e.target.value})}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                              >
                                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                                  <option value="DD-MM-YYYY">DD-MM-YYYY</option>
                                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                              </select>
                          </div>
                      </div>
                  </div>
              )}

              {activeTab === 'monetization' && (
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
                       <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                           <h2 className="text-lg font-bold text-slate-800">Monetization</h2>
                           <div className="flex items-center space-x-2">
                               <span className="text-sm text-slate-600">Enable Payments</span>
                               <div 
                                onClick={() => setMonetizationSettings({...monetizationSettings, enablePayments: !monetizationSettings.enablePayments})}
                                className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${monetizationSettings.enablePayments ? 'bg-indigo-600' : 'bg-slate-300'}`}
                               >
                                   <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 shadow-sm transition-all ${monetizationSettings.enablePayments ? 'right-0.5' : 'left-0.5'}`}></div>
                               </div>
                           </div>
                       </div>
                       
                       <div className="space-y-4">
                           <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                               <h3 className="font-semibold text-slate-800">Payment Gateways</h3>
                               <div className="mt-3 space-y-2">
                                   <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded">
                                       <span className="font-medium text-slate-700">Stripe</span>
                                       {monetizationSettings.stripeConnected ? (
                                         <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded font-medium">Connected</span>
                                       ) : (
                                         <button onClick={() => setMonetizationSettings({...monetizationSettings, stripeConnected: true})} className="text-xs text-indigo-600 font-medium hover:underline">Connect</button>
                                       )}
                                   </div>
                                   <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded">
                                       <span className="font-medium text-slate-700">PayPal</span>
                                       {monetizationSettings.paypalConnected ? (
                                         <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded font-medium">Connected</span>
                                       ) : (
                                         <button onClick={() => setMonetizationSettings({...monetizationSettings, paypalConnected: true})} className="text-xs text-indigo-600 font-medium hover:underline">Connect</button>
                                       )}
                                   </div>
                               </div>
                           </div>

                           <div className="p-4 border border-slate-200 rounded-lg">
                               <h3 className="font-semibold text-slate-800 mb-2">Pricing Plans</h3>
                               <p className="text-sm text-slate-500 mb-4">Define quotas and limits for your customers.</p>
                               <button className="text-sm text-indigo-600 font-medium hover:underline">+ Add New Plan</button>
                           </div>
                       </div>
                  </div>
              )}

              {activeTab === 'cron' && (
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
                      <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4">Cron Job Status</h2>
                      
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                          <CheckCircle className="text-green-600 mt-0.5" size={20} />
                          <div>
                              <h4 className="font-bold text-green-800">System Healthy</h4>
                              <p className="text-green-700 text-sm">All cron jobs are running as expected. Last execution: 1 minute ago.</p>
                          </div>
                      </div>

                      <div className="overflow-hidden border border-slate-200 rounded-lg">
                          <table className="w-full text-left text-sm">
                              <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                                  <tr>
                                      <th className="px-4 py-3">Job Name</th>
                                      <th className="px-4 py-3">Schedule</th>
                                      <th className="px-4 py-3">Last Run</th>
                                      <th className="px-4 py-3">Status</th>
                                  </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                  <tr>
                                      <td className="px-4 py-3 font-medium">Campaign Sender</td>
                                      <td className="px-4 py-3 text-slate-500">Every 1 min</td>
                                      <td className="px-4 py-3 text-slate-500">1 min ago</td>
                                      <td className="px-4 py-3 text-green-600 font-medium">Success</td>
                                  </tr>
                                  <tr>
                                      <td className="px-4 py-3 font-medium">Bounce Handler</td>
                                      <td className="px-4 py-3 text-slate-500">Every 10 min</td>
                                      <td className="px-4 py-3 text-slate-500">5 min ago</td>
                                      <td className="px-4 py-3 text-green-600 font-medium">Success</td>
                                  </tr>
                                  <tr>
                                      <td className="px-4 py-3 font-medium">Daily Report</td>
                                      <td className="px-4 py-3 text-slate-500">Every 24h</td>
                                      <td className="px-4 py-3 text-slate-500">14h ago</td>
                                      <td className="px-4 py-3 text-green-600 font-medium">Success</td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
              )}

              {activeTab === 'api' && (
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
                      <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4">API Settings</h2>
                      
                      <div className="space-y-4">
                          <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">API Endpoint</label>
                              <div className="flex">
                                  <input type="text" readOnly value="https://api.mailflow.ai/v1" className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-l-lg text-slate-600 font-mono text-sm" />
                                  <button className="px-4 py-2 bg-slate-100 border border-l-0 border-slate-300 rounded-r-lg hover:bg-slate-200 text-slate-600 font-medium text-sm">Copy</button>
                              </div>
                          </div>

                          <div className="pt-4">
                              <h3 className="font-semibold text-slate-800 mb-3">Your API Keys</h3>
                              <div className="border border-slate-200 rounded-lg overflow-hidden">
                                  <table className="w-full text-left text-sm">
                                      <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                                          <tr>
                                              <th className="px-4 py-3">Key Name</th>
                                              <th className="px-4 py-3">Prefix</th>
                                              <th className="px-4 py-3">Created</th>
                                              <th className="px-4 py-3 text-right">Action</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          <tr>
                                              <td className="px-4 py-3 font-medium">Default Key</td>
                                              <td className="px-4 py-3 font-mono text-slate-500">pk_live_...48f2</td>
                                              <td className="px-4 py-3 text-slate-500">2 months ago</td>
                                              <td className="px-4 py-3 text-right">
                                                  <button className="text-red-600 hover:text-red-800 text-xs font-medium">Revoke</button>
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>
                              <button className="mt-3 text-sm text-indigo-600 font-medium hover:underline">+ Generate New API Key</button>
                          </div>
                      </div>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};
