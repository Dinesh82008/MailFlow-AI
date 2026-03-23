import React, { useState } from 'react';
import { Share2, Database, Link as LinkIcon, Plus, MoreVertical, CheckCircle2, RefreshCw, ExternalLink, X, Settings, Shield, Activity, Zap } from 'lucide-react';

export const Integrations: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);

  const integrations = [
    { id: 1, name: 'Salesforce', type: 'CRM', status: 'Connected', lastSync: '2 mins ago', icon: 'https://www.vectorlogo.zone/logos/salesforce/salesforce-icon.svg' },
    { id: 2, name: 'HubSpot', type: 'CRM', status: 'Connected', lastSync: '15 mins ago', icon: 'https://www.vectorlogo.zone/logos/hubspot/hubspot-icon.svg' },
    { id: 3, name: 'Shopify', type: 'E-commerce', status: 'Connected', lastSync: '1 hour ago', icon: 'https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg' },
    { id: 4, name: 'Zapier', type: 'Automation', status: 'Not Connected', lastSync: '-', icon: 'https://www.vectorlogo.zone/logos/zapier/zapier-icon.svg' },
    { id: 5, name: 'Slack', type: 'Notifications', status: 'Not Connected', lastSync: '-', icon: 'https://www.vectorlogo.zone/logos/slack/slack-icon.svg' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Native CRM & Integrations</h1>
          <p className="text-slate-500">Deep synchronization with CRM tools to align marketing efforts with sales data.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium flex items-center shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all"
        >
          <Plus size={18} className="mr-2" />
          Add Integration
        </button>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
            <Database size={24} />
          </div>
          <h3 className="font-bold text-slate-800 mb-2">Native CRM Integration</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Built-in or deep synchronization with Customer Relationship Management tools to align marketing efforts with sales data and lead scoring.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
            <Share2 size={24} />
          </div>
          <h3 className="font-bold text-slate-800 mb-2">Omnichannel Sync</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Synchronize your data across all your marketing channels. Ensure your customers have a consistent experience everywhere.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-4">
            <LinkIcon size={24} />
          </div>
          <h3 className="font-bold text-slate-800 mb-2">Real-time Data Flow</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Data flows seamlessly between your CRM and MailFlow AI. No more manual exports or imports.
          </p>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <div key={integration.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center p-2 border border-slate-100">
                <img src={integration.icon} alt={integration.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                integration.status === 'Connected' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
              }`}>
                {integration.status}
              </div>
            </div>
            <h3 className="font-bold text-slate-800 mb-1">{integration.name}</h3>
            <p className="text-xs text-slate-400 uppercase font-bold mb-4">{integration.type}</p>
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
              <div className="flex items-center text-xs text-slate-500">
                <RefreshCw size={12} className="mr-1" />
                {integration.lastSync}
              </div>
              <button 
                onClick={() => {
                  setSelectedIntegration(integration);
                  setIsManageModalOpen(true);
                }}
                className={`text-sm font-medium ${
                integration.status === 'Connected' ? 'text-indigo-600 hover:text-indigo-700' : 'text-slate-600 hover:text-slate-800'
              }`}>
                {integration.status === 'Connected' ? 'Manage' : 'Connect'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Integration Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">Add New Integration</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                { name: 'Microsoft Dynamics', icon: 'https://www.vectorlogo.zone/logos/microsoft_dynamics/microsoft_dynamics-icon.svg', type: 'CRM' },
                { name: 'Pipedrive', icon: 'https://cdn.worldvectorlogo.com/logos/pipedrive.svg', type: 'CRM' },
                { name: 'Mailchimp', icon: 'https://www.vectorlogo.zone/logos/mailchimp/mailchimp-icon.svg', type: 'Marketing' },
                { name: 'ActiveCampaign', icon: 'https://www.vectorlogo.zone/logos/activecampaign/activecampaign-icon.svg', type: 'Marketing' },
                { name: 'Google Analytics', icon: 'https://www.vectorlogo.zone/logos/google_analytics/google_analytics-icon.svg', type: 'Analytics' },
                { name: 'WooCommerce', icon: 'https://www.vectorlogo.zone/logos/woocommerce/woocommerce-icon.svg', type: 'E-commerce' }
              ].map((item) => (
                <div key={item.name} className="flex items-center p-4 border border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 cursor-pointer transition-all group">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1 border border-slate-100 mr-4">
                    <img src={item.icon} alt={item.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                    <p className="text-xs text-slate-500">{item.type}</p>
                  </div>
                  <Plus size={16} className="text-slate-400 group-hover:text-indigo-600" />
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-slate-600 font-medium hover:text-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Integration Modal */}
      {isManageModalOpen && selectedIntegration && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center p-1 border border-slate-100 mr-3">
                  <img src={selectedIntegration.icon} alt={selectedIntegration.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{selectedIntegration.name}</h2>
                  <p className="text-xs text-slate-500">Integration Settings</p>
                </div>
              </div>
              <button onClick={() => setIsManageModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center">
                  <Activity size={16} className="text-indigo-600 mr-2" />
                  <span className="text-sm font-medium text-slate-700">Sync Status</span>
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">Active</span>
              </div>
              
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-500 uppercase">Sync Frequency</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option>Real-time</option>
                  <option>Every 15 minutes</option>
                  <option>Hourly</option>
                  <option>Daily</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-500 uppercase">Data Mapping</label>
                <div className="p-3 border border-slate-200 rounded-lg space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Email Field</span>
                    <span className="font-medium text-slate-800">Email (Standard)</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">First Name</span>
                    <span className="font-medium text-slate-800">First_Name__c</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button 
                onClick={() => setIsManageModalOpen(false)}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsManageModalOpen(false)}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-lg shadow-indigo-600/20"
              >
                Save Changes
              </button>
            </div>
            
            <button className="w-full mt-4 py-2 text-xs font-bold text-red-600 hover:text-red-700 uppercase tracking-wider">
              Disconnect Integration
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
