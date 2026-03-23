import React from 'react';
import { Cpu, GitBranch, ShoppingCart, Zap, Play, Plus, MoreVertical, MessageSquare, Smartphone, Mail } from 'lucide-react';

export const Automation: React.FC = () => {
  const workflows = [
    { id: 1, name: 'AI Welcome Series', type: 'AI-Driven', status: 'Active', triggers: 'New Subscriber', steps: 5, performance: '42% Open' },
    { id: 2, name: 'Abandoned Cart Recovery', type: 'E-commerce', status: 'Active', triggers: 'Cart Abandoned', steps: 3, performance: '12% Recovery' },
    { id: 3, name: 'Omnichannel Onboarding', type: 'Omnichannel', status: 'Draft', triggers: 'User Signup', steps: 8, performance: '-' },
    { id: 4, name: 'Post-Purchase Follow-up', type: 'E-commerce', status: 'Paused', triggers: 'Order Completed', steps: 4, performance: '28% Open' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Automation & Journeys</h1>
          <p className="text-slate-500">Build AI-driven workflows and omnichannel customer journeys.</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium flex items-center shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all">
          <Plus size={18} className="mr-2" />
          Create Workflow
        </button>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-4">
            <Cpu size={24} />
          </div>
          <h3 className="font-bold text-slate-800 mb-2">AI-Driven Automation</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Systems that use machine learning to autonomously build workflows, write personalized copy, and predict customer behavior.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
            <GitBranch size={24} />
          </div>
          <h3 className="font-bold text-slate-800 mb-2">Omnichannel Orchestration</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Unified visual journey builder that synchronizes messaging across Email, SMS, WhatsApp, and Web Push.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-4">
            <ShoppingCart size={24} />
          </div>
          <h3 className="font-bold text-slate-800 mb-2">E-commerce Workflows</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Pre-built templates for retail: abandoned cart recovery, browse abandonment, and post-purchase follow-ups.
          </p>
        </div>
      </div>

      {/* Visual Journey Builder Preview (Conceptual) */}
      <div className="bg-slate-900 rounded-2xl p-8 mb-8 text-white relative overflow-hidden border border-slate-800">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-4">
            <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded uppercase tracking-wider">New Feature</span>
            <h2 className="text-xl font-bold">Visual Journey Builder</h2>
          </div>
          <p className="text-slate-400 mb-8 max-w-lg">Drag and drop nodes to create complex, multi-step customer experiences across all channels.</p>
          
          <div className="flex flex-wrap gap-4 items-center">
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center space-x-3 w-48">
              <div className="w-8 h-8 bg-green-500/20 text-green-400 rounded flex items-center justify-center"><Zap size={16} /></div>
              <span className="text-sm font-medium">Trigger: Signup</span>
            </div>
            <div className="h-px w-8 bg-slate-700"></div>
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center space-x-3 w-48">
              <div className="w-8 h-8 bg-indigo-500/20 text-indigo-400 rounded flex items-center justify-center"><Mail size={16} /></div>
              <span className="text-sm font-medium">Send Email</span>
            </div>
            <div className="h-px w-8 bg-slate-700"></div>
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center space-x-3 w-48">
              <div className="w-8 h-8 bg-blue-500/20 text-blue-400 rounded flex items-center justify-center"><Smartphone size={16} /></div>
              <span className="text-sm font-medium">Send SMS</span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none"></div>
      </div>

      {/* Workflows Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-bold text-slate-800">Active Workflows</h2>
          <div className="flex space-x-2">
            <button className="text-xs font-bold text-slate-500 uppercase hover:text-indigo-600">All</button>
            <button className="text-xs font-bold text-slate-500 uppercase hover:text-indigo-600">AI-Driven</button>
            <button className="text-xs font-bold text-slate-500 uppercase hover:text-indigo-600">E-commerce</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50">
              <tr>
                <th className="px-6 py-4">Workflow Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Trigger</th>
                <th className="px-6 py-4">Steps</th>
                <th className="px-6 py-4">Performance</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {workflows.map((wf) => (
                <tr key={wf.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-800">{wf.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      wf.type === 'AI-Driven' ? 'bg-purple-100 text-purple-700' : 
                      wf.type === 'Omnichannel' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {wf.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        wf.status === 'Active' ? 'bg-green-500' : 
                        wf.status === 'Paused' ? 'bg-orange-500' : 'bg-slate-300'
                      }`}></div>
                      <span className="text-slate-600">{wf.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{wf.triggers}</td>
                  <td className="px-6 py-4 text-slate-600">{wf.steps} steps</td>
                  <td className="px-6 py-4 font-medium text-indigo-600">{wf.performance}</td>
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
