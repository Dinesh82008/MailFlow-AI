import React, { useState } from 'react';
import { Globe, Plus, Check, AlertCircle, RefreshCw, ShieldCheck, X, Save } from 'lucide-react';
import { SendingDomain } from '../types';

const INITIAL_DOMAINS: SendingDomain[] = [
  { id: '1', domain: 'marketing.acme.com', spfStatus: 'Verified', dkimStatus: 'Verified', dmarcStatus: 'Verified', status: 'Active', createdAt: '2023-02-10' },
  { id: '2', domain: 'news.startups.io', spfStatus: 'Verified', dkimStatus: 'Missing', dmarcStatus: 'Missing', status: 'Pending Verification', createdAt: '2023-10-01' },
  { id: '3', domain: 'offers.shop.com', spfStatus: 'Missing', dkimStatus: 'Missing', dmarcStatus: 'Missing', status: 'Pending Verification', createdAt: '2023-11-12' },
];

export const Domains: React.FC = () => {
  const [domains, setDomains] = useState<SendingDomain[]>(INITIAL_DOMAINS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDomain, setNewDomain] = useState('');
  const [isVerifying, setIsVerifying] = useState<string | null>(null);

  const handleAddDomain = () => {
    if (!newDomain) return;
    
    const domain: SendingDomain = {
      id: Date.now().toString(),
      domain: newDomain,
      spfStatus: 'Missing',
      dkimStatus: 'Missing',
      dmarcStatus: 'Missing',
      status: 'Pending Verification',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setDomains([domain, ...domains]);
    setNewDomain('');
    setIsModalOpen(false);
  };

  const handleVerify = (id: string) => {
    setIsVerifying(id);
    // Simulate verification process
    setTimeout(() => {
      setDomains(prev => prev.map(d => 
        d.id === id 
          ? { ...d, status: 'Active', spfStatus: 'Verified', dkimStatus: 'Verified', dmarcStatus: 'Verified' } 
          : d
      ));
      setIsVerifying(null);
    }, 1500);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Sending Domains</h1>
          <p className="text-slate-500">Authenticate your domains with SPF and DKIM to improve deliverability.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center space-x-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
        >
          <Plus size={20} />
          <span>Add Domain</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Domain</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">SPF</th>
              <th className="px-6 py-4">DKIM</th>
              <th className="px-6 py-4">DMARC</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {domains.map((domain) => (
              <tr key={domain.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                        <Globe size={18} />
                    </div>
                    <div>
                        <h3 className="font-medium text-slate-900">{domain.domain}</h3>
                        <p className="text-xs text-slate-500">Added on {domain.createdAt}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                       domain.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                   }`}>
                       {domain.status}
                   </span>
                </td>
                <td className="px-6 py-4">
                    <StatusBadge status={domain.spfStatus} />
                </td>
                <td className="px-6 py-4">
                    <StatusBadge status={domain.dkimStatus} />
                </td>
                <td className="px-6 py-4">
                    <StatusBadge status={domain.dmarcStatus} />
                </td>
                <td className="px-6 py-4 text-right">
                   {domain.status !== 'Active' && (
                       <button 
                         onClick={() => handleVerify(domain.id)}
                         disabled={isVerifying === domain.id}
                         className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center justify-end w-full disabled:opacity-50"
                       >
                           <RefreshCw size={14} className={`mr-1 ${isVerifying === domain.id ? 'animate-spin' : ''}`} /> 
                           {isVerifying === domain.id ? 'Verifying...' : 'Verify'}
                       </button>
                   )}
                   {domain.status === 'Active' && (
                       <button className="text-slate-400 hover:text-slate-600 text-sm font-medium flex items-center justify-end w-full">
                           <ShieldCheck size={14} className="mr-1" /> View DNS
                       </button>
                   )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Add Domain Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">Add Sending Domain</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Domain Name</label>
                <input 
                  type="text" 
                  value={newDomain}
                  onChange={e => setNewDomain(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                  placeholder="e.g. mail.yourdomain.com"
                />
                <p className="text-xs text-slate-400 mt-2">
                  Enter the domain or subdomain you want to use for sending emails.
                </p>
              </div>

              <div className="pt-4 flex space-x-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddDomain}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium flex justify-center items-center"
                >
                  <Save size={18} className="mr-2" /> Save Domain
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-6 flex items-start gap-4">
          <AlertCircle className="text-blue-600 shrink-0 mt-0.5" size={20} />
          <div>
              <h4 className="font-semibold text-blue-900">Why verify your domain?</h4>
              <p className="text-blue-800 text-sm mt-1">
                  Verifying your sending domain with SPF and DKIM significantly improves your email deliverability rates and prevents your emails from landing in the spam folder.
                  Major providers like Gmail and Yahoo require these authentications.
              </p>
          </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
    if (status === 'Verified') {
        return (
            <div className="flex items-center text-xs text-green-600 font-medium">
                <Check size={14} className="mr-1" /> OK
            </div>
        );
    }
    return (
        <div className="flex items-center text-xs text-red-500 font-medium">
            <AlertCircle size={14} className="mr-1" /> Missing
        </div>
    );
};