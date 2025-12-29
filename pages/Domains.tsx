import React from 'react';
import { Globe, Plus, Check, AlertCircle, RefreshCw, ShieldCheck } from 'lucide-react';
import { SendingDomain } from '../types';

const MOCK_DOMAINS: SendingDomain[] = [
  { id: '1', domain: 'marketing.acme.com', spfStatus: 'Verified', dkimStatus: 'Verified', dmarcStatus: 'Verified', status: 'Active', createdAt: '2023-02-10' },
  { id: '2', domain: 'news.startups.io', spfStatus: 'Verified', dkimStatus: 'Missing', dmarcStatus: 'Missing', status: 'Pending Verification', createdAt: '2023-10-01' },
  { id: '3', domain: 'offers.shop.com', spfStatus: 'Missing', dkimStatus: 'Missing', dmarcStatus: 'Missing', status: 'Pending Verification', createdAt: '2023-11-12' },
];

export const Domains: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Sending Domains</h1>
          <p className="text-slate-500">Authenticate your domains with SPF and DKIM to improve deliverability.</p>
        </div>
        <button className="flex items-center justify-center space-x-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20">
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
            {MOCK_DOMAINS.map((domain) => (
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
                       <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center justify-end w-full">
                           <RefreshCw size={14} className="mr-1" /> Verify
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