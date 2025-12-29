import React, { useState } from 'react';
import { Search, Upload, Download, UserPlus, Filter, MoreHorizontal, CheckCircle, XCircle, List, Users, ShieldAlert, PieChart } from 'lucide-react';
import { Subscriber, SubscriberList } from '../types';

const MOCK_LISTS: SubscriberList[] = [
    { id: '1', name: 'Main Newsletter', subscriberCount: 14502, description: 'General subscribers', createdAt: '2023-01-10' },
    { id: '2', name: 'VIP Customers', subscriberCount: 2304, description: 'High value customers > $500', createdAt: '2023-03-15' },
    { id: '3', name: 'Black Friday 2023', subscriberCount: 5600, description: 'Temporary list for promotion', createdAt: '2023-11-01' },
];

const MOCK_SUBSCRIBERS: Subscriber[] = [
  { id: '1', email: 'alice@example.com', firstName: 'Alice', lastName: 'Johnson', status: 'Subscribed', tags: ['VIP', 'US'], joinedAt: '2023-09-12', listId: '1' },
  { id: '2', email: 'bob@example.com', firstName: 'Bob', lastName: 'Smith', status: 'Subscribed', tags: ['New'], joinedAt: '2023-10-05', listId: '1' },
  { id: '3', email: 'charlie@domain.net', firstName: 'Charlie', lastName: 'Brown', status: 'Bounced', tags: [], joinedAt: '2023-08-20', listId: '2' },
  { id: '4', email: 'david@corp.org', firstName: 'David', lastName: 'Lee', status: 'Unsubscribed', tags: ['Lead'], joinedAt: '2023-01-15', listId: '1' },
  { id: '5', email: 'emma@studio.io', firstName: 'Emma', lastName: 'Wilson', status: 'Subscribed', tags: ['VIP', 'EU'], joinedAt: '2023-11-01', listId: '2' },
];

export const Subscribers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lists' | 'subscribers' | 'segments' | 'blacklist'>('lists');
  const [filter, setFilter] = useState('');

  const filteredSubscribers = MOCK_SUBSCRIBERS.filter(sub => 
    sub.email.toLowerCase().includes(filter.toLowerCase()) || 
    sub.firstName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
       <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Lists & Subscribers</h1>
          <p className="text-slate-500">Manage your audience, segments, and suppression lists.</p>
        </div>
        <div className="flex space-x-3">
             {activeTab === 'lists' && (
                 <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-lg shadow-indigo-600/20">
                    <List size={18} className="mr-2" /> Create New List
                </button>
             )}
            {activeTab === 'subscribers' && (
                <>
                    <button className="flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 font-medium shadow-sm">
                        <Upload size={18} className="mr-2" /> Import
                    </button>
                    <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-lg shadow-indigo-600/20">
                        <UserPlus size={18} className="mr-2" /> Add Subscriber
                    </button>
                </>
            )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg w-fit mb-8">
          <button 
            onClick={() => setActiveTab('lists')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center ${activeTab === 'lists' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
              <List size={16} className="mr-2" /> Lists
          </button>
          <button 
             onClick={() => setActiveTab('subscribers')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center ${activeTab === 'subscribers' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
              <Users size={16} className="mr-2" /> All Subscribers
          </button>
           <button 
             onClick={() => setActiveTab('segments')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center ${activeTab === 'segments' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
              <PieChart size={16} className="mr-2" /> Segments
          </button>
           <button 
             onClick={() => setActiveTab('blacklist')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center ${activeTab === 'blacklist' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
              <ShieldAlert size={16} className="mr-2" /> Global Blacklist
          </button>
      </div>

      {activeTab === 'lists' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_LISTS.map(list => (
                  <div key={list.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                          <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                              <List size={20} />
                          </div>
                          <button className="text-slate-400 hover:text-slate-600">
                              <MoreHorizontal size={20} />
                          </button>
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 mb-1">{list.name}</h3>
                      <p className="text-sm text-slate-500 mb-4 h-10 overflow-hidden">{list.description}</p>
                      
                      <div className="flex items-center justify-between text-sm pt-4 border-t border-slate-100">
                          <span className="text-slate-500">Subscribers</span>
                          <span className="font-bold text-slate-800">{list.subscriberCount.toLocaleString()}</span>
                      </div>
                      
                      <div className="mt-4 flex space-x-2">
                          <button 
                            onClick={() => setActiveTab('subscribers')}
                            className="flex-1 px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                          >
                              View Subscribers
                          </button>
                          <button className="px-3 py-2 text-sm font-medium text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                              Settings
                          </button>
                      </div>
                  </div>
              ))}
          </div>
      )}

      {activeTab === 'subscribers' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            {/* Toolbar */}
            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative max-w-md w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search by email or name..." 
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                </div>
                <div className="flex space-x-2">
                    <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500">
                        <Filter size={18} />
                    </button>
                    <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500">
                        <Download size={18} />
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4 rounded-tl-lg">
                                <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                            </th>
                            <th className="px-6 py-4">Subscriber</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">List</th>
                            <th className="px-6 py-4">Tags</th>
                            <th className="px-6 py-4">Joined</th>
                            <th className="px-6 py-4 rounded-tr-lg"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredSubscribers.map((sub) => (
                            <tr key={sub.id} className="hover:bg-slate-50 group">
                                <td className="px-6 py-4">
                                    <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                            {sub.firstName[0]}{sub.lastName[0]}
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900">{sub.firstName} {sub.lastName}</p>
                                            <p className="text-sm text-slate-500">{sub.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        {sub.status === 'Subscribed' && <CheckCircle size={16} className="text-green-500 mr-2" />}
                                        {sub.status === 'Unsubscribed' && <XCircle size={16} className="text-gray-400 mr-2" />}
                                        {sub.status === 'Bounced' && <XCircle size={16} className="text-red-500 mr-2" />}
                                        <span className={`text-sm font-medium ${
                                            sub.status === 'Subscribed' ? 'text-green-700' : 
                                            sub.status === 'Bounced' ? 'text-red-700' : 'text-gray-600'
                                        }`}>
                                            {sub.status}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    {MOCK_LISTS.find(l => l.id === sub.listId)?.name || 'Unknown List'}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-2">
                                        {sub.tags.map(tag => (
                                            <span key={tag} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-full border border-indigo-100">
                                                {tag}
                                            </span>
                                        ))}
                                        {sub.tags.length === 0 && <span className="text-xs text-slate-400">-</span>}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500">
                                    {sub.joinedAt}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-200 opacity-0 group-hover:opacity-100 transition-all">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredSubscribers.length === 0 && (
                    <div className="p-12 text-center text-slate-500">
                        No subscribers found matching your search.
                    </div>
                )}
            </div>
        </div>
      )}

      {activeTab === 'segments' && (
          <div className="bg-white p-12 rounded-xl border border-slate-200 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <PieChart size={32} />
              </div>
              <h3 className="text-lg font-medium text-slate-800">No segments created yet</h3>
              <p className="text-slate-500 max-w-md mx-auto mt-2">Segments allow you to send targeted emails based on subscriber behavior and data.</p>
              <button className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">Create Segment</button>
          </div>
      )}

      {activeTab === 'blacklist' && (
           <div className="bg-white rounded-xl shadow-sm border border-slate-200">
               <div className="p-6 border-b border-slate-100">
                   <h3 className="text-lg font-bold text-slate-800">Global Email Blacklist</h3>
                   <p className="text-sm text-slate-500">Emails listed here will never receive campaigns from any list.</p>
               </div>
               <div className="p-8 text-center text-slate-500">
                   <ShieldAlert size={48} className="mx-auto text-slate-300 mb-4" />
                   <p>Your suppression list is currently empty.</p>
                   <button className="mt-4 text-indigo-600 font-medium hover:underline">Add Email to Blacklist</button>
               </div>
           </div>
      )}
    </div>
  );
};
