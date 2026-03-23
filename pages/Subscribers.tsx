import React, { useState } from 'react';
import { Search, Upload, Download, UserPlus, Filter, MoreHorizontal, CheckCircle, XCircle, List, Users, ShieldAlert, PieChart, MousePointer, Eye, ShoppingCart, Zap, Plus, X, Save, Trash2 } from 'lucide-react';
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

const BEHAVIORAL_SEGMENTS = [
  { id: 1, name: 'High Intent Browsers', description: 'Users who viewed > 3 products in 24h', count: 1245, icon: Eye, color: 'blue' },
  { id: 2, name: 'Cart Abandoners (High Value)', description: 'Cart > $200 abandoned in last 4h', count: 342, icon: ShoppingCart, color: 'orange' },
  { id: 3, name: 'Frequent Clickers', description: 'Clicked > 5 links in last 3 campaigns', count: 2105, icon: MousePointer, color: 'purple' },
  { id: 4, name: 'Churn Risk', description: 'No activity in last 60 days', count: 890, icon: ShieldAlert, color: 'red' },
];

export const Subscribers: React.FC = () => {
  const [lists, setLists] = useState<SubscriberList[]>(MOCK_LISTS);
  const [subscribers, setSubscribers] = useState<Subscriber[]>(MOCK_SUBSCRIBERS);
  const [activeTab, setActiveTab] = useState<'lists' | 'subscribers' | 'segments' | 'behavioral' | 'blacklist'>('lists');
  const [filter, setFilter] = useState('');

  // Modal States
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isSubscriberModalOpen, setIsSubscriberModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [isBlacklistModalOpen, setIsBlacklistModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'list' | 'subscriber', id: string } | null>(null);
  const [editingList, setEditingList] = useState<SubscriberList | null>(null);

  const [listFormData, setListFormData] = useState({
    name: '',
    description: ''
  });

  const [subFormData, setSubFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    status: 'Subscribed' as Subscriber['status'],
    listId: ''
  });

  const filteredSubscribers = subscribers.filter(sub => 
    sub.email.toLowerCase().includes(filter.toLowerCase()) || 
    sub.firstName.toLowerCase().includes(filter.toLowerCase()) ||
    sub.lastName.toLowerCase().includes(filter.toLowerCase())
  );

  const handleCreateList = () => {
    if (!listFormData.name) return;
    
    if (editingList) {
      setLists(prev => prev.map(l => l.id === editingList.id ? { ...l, ...listFormData } : l));
    } else {
      const newList: SubscriberList = {
        id: Date.now().toString(),
        name: listFormData.name,
        description: listFormData.description,
        subscriberCount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setLists(prev => [newList, ...prev]);
    }
    setIsListModalOpen(false);
    setEditingList(null);
    setListFormData({ name: '', description: '' });
  };

  const handleAddSubscriber = () => {
    if (!subFormData.email || !subFormData.firstName) return;

    const newSub: Subscriber = {
      id: Date.now().toString(),
      email: subFormData.email,
      firstName: subFormData.firstName,
      lastName: subFormData.lastName,
      status: subFormData.status,
      tags: [],
      joinedAt: new Date().toISOString().split('T')[0],
      listId: subFormData.listId || lists[0]?.id
    };

    setSubscribers(prev => [newSub, ...prev]);
    
    // Update subscriber count in the list
    if (newSub.listId) {
      setLists(prev => prev.map(l => l.id === newSub.listId ? { ...l, subscriberCount: l.subscriberCount + 1 } : l));
    }

    setIsSubscriberModalOpen(false);
    setSubFormData({ email: '', firstName: '', lastName: '', status: 'Subscribed', listId: '' });
  };

  const openListSettings = (list: SubscriberList) => {
    setEditingList(list);
    setListFormData({ name: list.name, description: list.description });
    setIsListModalOpen(true);
  };

  const openDeleteConfirm = (type: 'list' | 'subscriber', id: string) => {
    setDeleteTarget({ type, id });
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === 'list') {
      setLists(prev => prev.filter(l => l.id !== deleteTarget.id));
      setSubscribers(prev => prev.filter(s => s.listId !== deleteTarget.id));
    } else {
      setSubscribers(prev => prev.filter(s => s.id !== deleteTarget.id));
    }
    setIsDeleteConfirmOpen(false);
    setDeleteTarget(null);
  };

  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate import
    setIsImportModalOpen(false);
  };

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate rule creation
    setIsRuleModalOpen(false);
  };

  const handleAddToBlacklist = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate blacklist addition
    setIsBlacklistModalOpen(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
       <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Audience Management</h1>
          <p className="text-slate-500">Manage your subscribers and advanced behavioral segments.</p>
        </div>
        <div className="flex space-x-3">
             {activeTab === 'lists' && (
                 <button 
                  onClick={() => { setEditingList(null); setListFormData({ name: '', description: '' }); setIsListModalOpen(true); }}
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-lg shadow-indigo-600/20"
                 >
                    <List size={18} className="mr-2" /> Create New List
                </button>
             )}
             {activeTab === 'behavioral' && (
                 <button 
                  onClick={() => setIsRuleModalOpen(true)}
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-lg shadow-indigo-600/20"
                 >
                    <Zap size={18} className="mr-2" /> New Behavioral Rule
                </button>
             )}
            {activeTab === 'subscribers' && (
                <>
                    <button 
                      onClick={() => setIsImportModalOpen(true)}
                      className="flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 font-medium shadow-sm"
                    >
                        <Upload size={18} className="mr-2" /> Import
                    </button>
                    <button 
                      onClick={() => { setSubFormData({ email: '', firstName: '', lastName: '', status: 'Subscribed', listId: lists[0]?.id || '' }); setIsSubscriberModalOpen(true); }}
                      className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-lg shadow-indigo-600/20"
                    >
                        <UserPlus size={18} className="mr-2" /> Add Subscriber
                    </button>
                </>
            )}
            {activeTab === 'blacklist' && (
                 <button 
                  onClick={() => setIsBlacklistModalOpen(true)}
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-lg shadow-indigo-600/20"
                 >
                    <Plus size={18} className="mr-2" /> Add Email to Blacklist
                </button>
             )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg w-fit mb-8 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('lists')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center whitespace-nowrap ${activeTab === 'lists' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
              <List size={16} className="mr-2" /> Lists
          </button>
          <button 
             onClick={() => setActiveTab('subscribers')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center whitespace-nowrap ${activeTab === 'subscribers' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
              <Users size={16} className="mr-2" /> All Subscribers
          </button>
           <button 
             onClick={() => setActiveTab('segments')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center whitespace-nowrap ${activeTab === 'segments' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
              <PieChart size={16} className="mr-2" /> Static Segments
          </button>
          <button 
             onClick={() => setActiveTab('behavioral')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center whitespace-nowrap ${activeTab === 'behavioral' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
              <Zap size={16} className="mr-2" /> Behavioral Segments
          </button>
           <button 
             onClick={() => setActiveTab('blacklist')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center whitespace-nowrap ${activeTab === 'blacklist' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
              <ShieldAlert size={16} className="mr-2" /> Global Blacklist
          </button>
      </div>

      {activeTab === 'lists' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lists.map(list => (
                  <div key={list.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                          <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                              <List size={20} />
                          </div>
                          <div className="relative group/dropdown">
                              <button className="text-slate-400 hover:text-slate-600">
                                  <MoreHorizontal size={20} />
                              </button>
                              <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-slate-200 rounded-lg shadow-xl z-10 py-1 hidden group-hover/dropdown:block">
                                  <button 
                                    onClick={() => openListSettings(list)}
                                    className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                                  >
                                      Edit
                                  </button>
                                  <button 
                                    onClick={() => openDeleteConfirm('list', list.id)}
                                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center"
                                  >
                                      <Trash2 size={14} className="mr-2" /> Delete
                                  </button>
                              </div>
                          </div>
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
                          <button 
                            onClick={() => openListSettings(list)}
                            className="px-3 py-2 text-sm font-medium text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                          >
                              Settings
                          </button>
                      </div>
                  </div>
              ))}
          </div>
      )}

      {activeTab === 'behavioral' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BEHAVIORAL_SEGMENTS.map(segment => {
                  const Icon = segment.icon;
                  return (
                      <div key={segment.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-start space-x-4">
                          <div className={`w-12 h-12 bg-${segment.color}-50 text-${segment.color}-600 rounded-lg flex items-center justify-center shrink-0`}>
                              <Icon size={24} />
                          </div>
                          <div className="flex-1">
                              <div className="flex justify-between items-start">
                                  <h3 className="text-lg font-bold text-slate-800">{segment.name}</h3>
                                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded uppercase tracking-wider">Real-time</span>
                              </div>
                              <p className="text-sm text-slate-500 mt-1">{segment.description}</p>
                              <div className="mt-4 flex items-center justify-between">
                                  <div className="flex items-center text-sm font-medium text-slate-700">
                                      <Users size={14} className="mr-1.5 text-slate-400" />
                                      {segment.count.toLocaleString()} subscribers
                                  </div>
                                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Edit Rules</button>
                              </div>
                          </div>
                      </div>
                  );
              })}
              <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-slate-100 transition-colors">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 group-hover:text-indigo-600 shadow-sm mb-3">
                      <Plus size={20} />
                  </div>
                  <h3 className="font-bold text-slate-700">Create Behavioral Segment</h3>
                  <p className="text-xs text-slate-500 mt-1">Group subscribers based on real-time actions and interactions.</p>
              </div>
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
                                    {lists.find(l => l.id === sub.listId)?.name || 'Unknown List'}
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
                                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                                       <button 
                                         onClick={() => openDeleteConfirm('subscriber', sub.id)}
                                         className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-slate-200"
                                         title="Delete Subscriber"
                                       >
                                           <Trash2 size={18} />
                                       </button>
                                       <button className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-200">
                                           <MoreHorizontal size={18} />
                                       </button>
                                    </div>
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

      {/* List Modal */}
      {isListModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">
                {editingList ? 'List Settings' : 'Create New List'}
              </h2>
              <button onClick={() => setIsListModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">List Name</label>
                <input 
                  type="text" 
                  value={listFormData.name}
                  onChange={e => setListFormData({...listFormData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                  placeholder="e.g. Weekly Newsletter"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea 
                  value={listFormData.description}
                  onChange={e => setListFormData({...listFormData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none" 
                  placeholder="What is this list for?"
                />
              </div>

              <div className="pt-4 flex space-x-3">
                <button 
                  onClick={() => setIsListModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleCreateList}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium flex justify-center items-center shadow-lg shadow-indigo-600/20"
                >
                  <Save size={18} className="mr-2" /> {editingList ? 'Save Changes' : 'Create List'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subscriber Modal */}
      {isSubscriberModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">Add New Subscriber</h2>
              <button onClick={() => setIsSubscriberModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                  <input 
                    type="text" 
                    value={subFormData.firstName}
                    onChange={e => setSubFormData({...subFormData, firstName: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                  <input 
                    type="text" 
                    value={subFormData.lastName}
                    onChange={e => setSubFormData({...subFormData, lastName: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={subFormData.email}
                  onChange={e => setSubFormData({...subFormData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Add to List</label>
                <select 
                  value={subFormData.listId}
                  onChange={e => setSubFormData({...subFormData, listId: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="">Select a list...</option>
                  {lists.map(l => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex space-x-3">
                <button 
                  onClick={() => setIsSubscriberModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddSubscriber}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium flex justify-center items-center shadow-lg shadow-indigo-600/20"
                >
                  <UserPlus size={18} className="mr-2" /> Add Subscriber
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isImportModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">Import Subscribers</h2>
              <button onClick={() => setIsImportModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleImport} className="space-y-4">
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-indigo-300 transition-colors cursor-pointer">
                <Upload className="mx-auto text-slate-400 mb-3" size={32} />
                <p className="text-sm text-slate-600 mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-slate-400">CSV, XLS up to 10MB</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Target List</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                  {lists.map(l => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </select>
              </div>
              <div className="pt-4 flex space-x-3">
                <button type="button" onClick={() => setIsImportModalOpen(false)} className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-lg shadow-indigo-600/20">Start Import</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isRuleModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">New Behavioral Rule</h2>
              <button onClick={() => setIsRuleModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddRule} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Rule Name</label>
                <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. High Engagement" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Trigger Event</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option>Email Opened</option>
                  <option>Link Clicked</option>
                  <option>Subscription Canceled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Action</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option>Add Tag: Engaged</option>
                  <option>Move to List: VIP</option>
                  <option>Send Automation: Welcome</option>
                </select>
              </div>
              <div className="pt-4 flex space-x-3">
                <button type="button" onClick={() => setIsRuleModalOpen(false)} className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-lg shadow-indigo-600/20">Create Rule</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isBlacklistModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">Add to Blacklist</h2>
              <button onClick={() => setIsBlacklistModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddToBlacklist} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input type="email" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="spam@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Reason</label>
                <textarea className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none" placeholder="Reason for blacklisting..." />
              </div>
              <div className="pt-4 flex space-x-3">
                <button type="button" onClick={() => setIsBlacklistModalOpen(false)} className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-lg shadow-red-600/20">Add to Blacklist</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 animate-fade-in text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Are you sure?</h2>
            <p className="text-slate-500 mb-6">
              This will permanently delete the {deleteTarget?.type}. This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button onClick={() => setIsDeleteConfirmOpen(false)} className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium shadow-lg shadow-red-600/20">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
