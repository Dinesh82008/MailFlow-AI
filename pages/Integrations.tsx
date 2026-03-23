import React from 'react';
import { Share2, Database, Link as LinkIcon, Plus, MoreVertical, CheckCircle2, RefreshCw, ExternalLink } from 'lucide-react';

export const Integrations: React.FC = () => {
  const integrations = [
    { id: 1, name: 'Salesforce', type: 'CRM', status: 'Connected', lastSync: '2 mins ago', icon: 'https://cdn.worldvectorlogo.com/logos/salesforce-2.svg' },
    { id: 2, name: 'HubSpot', type: 'CRM', status: 'Connected', lastSync: '15 mins ago', icon: 'https://cdn.worldvectorlogo.com/logos/hubspot.svg' },
    { id: 3, name: 'Shopify', type: 'E-commerce', status: 'Connected', lastSync: '1 hour ago', icon: 'https://cdn.worldvectorlogo.com/logos/shopify.svg' },
    { id: 4, name: 'Zapier', type: 'Automation', status: 'Not Connected', lastSync: '-', icon: 'https://cdn.worldvectorlogo.com/logos/zapier.svg' },
    { id: 5, name: 'Slack', type: 'Notifications', status: 'Not Connected', lastSync: '-', icon: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Native CRM & Integrations</h1>
          <p className="text-slate-500">Deep synchronization with CRM tools to align marketing efforts with sales data.</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium flex items-center shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all">
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
              <button className={`text-sm font-medium ${
                integration.status === 'Connected' ? 'text-indigo-600 hover:text-indigo-700' : 'text-slate-600 hover:text-slate-800'
              }`}>
                {integration.status === 'Connected' ? 'Manage' : 'Connect'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
