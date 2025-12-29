import React, { useState } from 'react';
import { Search, UserPlus, MoreVertical, LogIn, CheckCircle, XCircle, X, Save } from 'lucide-react';
import { Customer } from '../types';

const INITIAL_CUSTOMERS: Customer[] = [
  { id: '1', name: 'Acme Corp', email: 'admin@acme.com', plan: 'Enterprise', status: 'Active', quotaUsed: 45000, quotaLimit: 100000, joinedAt: '2023-01-12' },
  { id: '2', name: 'John Smith Designs', email: 'john@smith.com', plan: 'Starter', status: 'Active', quotaUsed: 1200, quotaLimit: 5000, joinedAt: '2023-05-20' },
  { id: '3', name: 'Global Marketing', email: 'support@global.com', plan: 'Professional', status: 'Inactive', quotaUsed: 0, quotaLimit: 50000, joinedAt: '2023-08-15' },
];

export const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New Customer Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    plan: 'Starter',
    quotaLimit: 5000
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quotaLimit' ? parseInt(value) : value
    }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      alert("Name and Email are required");
      return;
    }

    const newCustomer: Customer = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      plan: formData.plan,
      quotaLimit: formData.quotaLimit,
      quotaUsed: 0,
      status: 'Active',
      joinedAt: new Date().toISOString().split('T')[0]
    };

    setCustomers([newCustomer, ...customers]);
    setIsModalOpen(false);
    setFormData({ name: '', email: '', plan: 'Starter', quotaLimit: 5000 }); // Reset form
  };

  return (
    <div className="p-8 max-w-7xl mx-auto relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Customers</h1>
          <p className="text-slate-500">Manage user accounts, plans, and sending quotas.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center space-x-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
        >
          <UserPlus size={20} />
          <span>Create Customer</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none">
            <option>All Plans</option>
            <option>Starter</option>
            <option>Professional</option>
            <option>Enterprise</option>
          </select>
        </div>

        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Plan</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Quota Usage</th>
              <th className="px-6 py-4">Joined</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                      {customer.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">{customer.name}</h3>
                      <p className="text-sm text-slate-500">{customer.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-md text-xs font-medium border border-indigo-100">
                    {customer.plan}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {customer.status === 'Active' ? <CheckCircle size={14} className="text-green-500 mr-2" /> : <XCircle size={14} className="text-slate-400 mr-2" />}
                    <span className={`text-sm ${customer.status === 'Active' ? 'text-green-700 font-medium' : 'text-slate-600'}`}>
                      {customer.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                   <div className="w-32">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-500">{Math.round((customer.quotaUsed / customer.quotaLimit) * 100)}%</span>
                        <span className="text-slate-400">{customer.quotaUsed / 1000}k/{customer.quotaLimit / 1000}k</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full" 
                          style={{ width: `${(customer.quotaUsed / customer.quotaLimit) * 100}%` }}
                        ></div>
                      </div>
                   </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {customer.joinedAt}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg" title="Login as Customer">
                      <LogIn size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">Add New Customer</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company / Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                  placeholder="e.g. Acme Corp"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                  placeholder="admin@example.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Plan</label>
                    <select 
                      name="plan"
                      value={formData.plan}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option value="Starter">Starter</option>
                      <option value="Professional">Professional</option>
                      <option value="Enterprise">Enterprise</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Quota Limit</label>
                    <input 
                      type="number" 
                      name="quotaLimit"
                      value={formData.quotaLimit}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                    />
                 </div>
              </div>

              <div className="pt-4 flex space-x-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium flex justify-center items-center"
                >
                  <Save size={18} className="mr-2" /> Save Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
