import React, { useState } from 'react';
import { 
  Plus, Search, MoreVertical, Edit2, Trash2, Send, Sparkles, Loader2, 
  Clock, ArrowLeft 
} from 'lucide-react';
import { Campaign, CampaignStatus, EmailBlock } from '../types';
import { generateEmailContent } from '../services/geminiService';
import { EmailEditor, compileBlocksToHtml } from '../components/EmailEditor';

const MOCK_CAMPAIGNS: Campaign[] = [
  { id: '1', name: 'Summer Product Launch', subject: 'Meet the new collection', content: '...', status: CampaignStatus.Sent, sentCount: 1500, openRate: 25.5, clickRate: 4.2, createdAt: '2023-10-01', audience: 'All Subscribers', type: 'Regular' },
  { id: '2', name: 'Black Friday Teaser', subject: 'Something big is coming...', content: '...', status: CampaignStatus.Draft, sentCount: 0, openRate: 0, clickRate: 0, createdAt: '2023-10-15', audience: 'VIP Customers', type: 'Regular' },
  { id: '3', name: 'Welcome Automation', subject: 'Welcome to the club!', content: '...', status: CampaignStatus.Sending, sentCount: 450, openRate: 55.2, clickRate: 12.5, createdAt: '2023-09-01', audience: 'New Signups', type: 'Autoresponder' },
];

export const Campaigns: React.FC = () => {
  const [view, setView] = useState<'list' | 'create'>('list');
  const [campaigns, setCampaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Editor State
  const [editorMode, setEditorMode] = useState<'visual' | 'code'>('visual');
  const [blocks, setBlocks] = useState<EmailBlock[]>([
    { id: '1', type: 'text', content: { text: '<h2>Hello there!</h2><p>Welcome to our latest newsletter.</p>', align: 'left' } }
  ]);
  const [htmlContent, setHtmlContent] = useState<string>('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    audience: 'All Subscribers',
    topic: '',
    tone: 'Professional',
    subject: '',
    body: '',
  });

  // Handle HTML syncing from Editor component
  const handleHtmlChange = (newHtml: string) => {
    setFormData(prev => ({ ...prev, body: newHtml }));
    setHtmlContent(newHtml);
  };

  // --- AI Generation ---

  const handleGenerateAI = async () => {
    if (!formData.topic) return;
    
    setIsGenerating(true);
    try {
      const result = await generateEmailContent(formData.topic, formData.audience, formData.tone);
      setFormData(prev => ({
        ...prev,
        subject: result.subject,
      }));
      
      // Insert AI content as a new text block
      const newBlock: EmailBlock = {
        id: Date.now().toString(),
        type: 'text',
        content: { text: result.body, align: 'left' }
      };
      
      if (editorMode === 'visual') {
        setBlocks([...blocks, newBlock]);
      } else {
        // In code mode, append to HTML body
        const currentHtml = htmlContent || formData.body;
        const newHtml = currentHtml + result.body;
        setHtmlContent(newHtml);
        setFormData(prev => ({ ...prev, body: newHtml }));
      }
      
    } catch (error) {
      alert("Failed to generate content. Please check your API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    const finalHtml = editorMode === 'visual' ? compileBlocksToHtml(blocks) : htmlContent;
    
    const newCampaign: Campaign = {
      id: Date.now().toString(),
      name: formData.name || 'Untitled Campaign',
      subject: formData.subject,
      content: finalHtml,
      status: CampaignStatus.Draft,
      sentCount: 0,
      openRate: 0,
      clickRate: 0,
      createdAt: new Date().toLocaleDateString(),
      audience: formData.audience,
      type: 'Regular'
    };
    setCampaigns([newCampaign, ...campaigns]);
    setView('list');
    
    // Reset form
    setFormData({ name: '', audience: 'All Subscribers', topic: '', tone: 'Professional', subject: '', body: '' });
    setBlocks([{ id: '1', type: 'text', content: { text: '<p>Start writing...</p>', align: 'left' } }]);
    setHtmlContent('');
  };

  // --- Render Views ---

  if (view === 'create') {
    return (
      <div className="p-4 md:p-8 max-w-[1600px] mx-auto animate-fade-in h-[calc(100vh-64px)] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 shrink-0">
          <div className="flex items-center space-x-4">
             <button onClick={() => setView('list')} className="text-slate-500 hover:text-slate-800 font-medium flex items-center">
               <ArrowLeft size={18} className="mr-1" /> Back
             </button>
             <h1 className="text-2xl font-bold text-slate-800">Create Campaign</h1>
          </div>
          <div className="flex space-x-3">
             <button className="text-slate-600 hover:text-slate-800 font-medium px-4">Send Test</button>
             <button onClick={handleSave} className="bg-slate-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-slate-800 transition-colors shadow-lg">
               Save Campaign
             </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 h-full overflow-hidden pb-4">
          {/* Left: Configuration & AI */}
          <div className="col-span-12 lg:col-span-3 flex flex-col gap-6 overflow-y-auto pr-2 pb-20">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-4">Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Name</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Subject</label>
                  <input type="text" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Audience</label>
                  <select value={formData.audience} onChange={e => setFormData({...formData, audience: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                    <option>All Subscribers</option>
                    <option>VIP Customers</option>
                  </select>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Predictive Sending</label>
                    <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded uppercase tracking-tighter">AI Powered</span>
                  </div>
                  <div className="flex items-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <input type="checkbox" id="predictive" className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500" />
                    <label htmlFor="predictive" className="ml-2 text-xs text-slate-600 font-medium leading-tight">
                      Optimize delivery time for each individual subscriber.
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-xl border border-indigo-100">
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="text-indigo-600" size={18} />
                <h3 className="font-semibold text-indigo-900 text-sm">AI Copilot</h3>
              </div>
              <div className="space-y-3">
                <textarea 
                  value={formData.topic}
                  onChange={e => setFormData({...formData, topic: e.target.value})}
                  placeholder="Describe your email content..."
                  className="w-full px-3 py-2 border border-indigo-200 rounded-lg text-sm min-h-[80px]"
                />
                <button 
                  onClick={handleGenerateAI}
                  disabled={isGenerating || !formData.topic}
                  className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition-all"
                >
                  {isGenerating ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                  <span>Generate Content</span>
                </button>
              </div>
            </div>
          </div>

          {/* Center: Builder Canvas (Using Shared Component) */}
          <div className="col-span-12 lg:col-span-9 h-full">
             <EmailEditor 
                blocks={blocks} 
                setBlocks={setBlocks}
                editorMode={editorMode}
                setEditorMode={setEditorMode}
                htmlContent={htmlContent}
                setHtmlContent={setHtmlContent}
                onHtmlChange={handleHtmlChange}
              />
          </div>
        </div>
      </div>
    );
  }

  // LIST VIEW
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Campaigns</h1>
          <p className="text-slate-500">Manage, schedule and track your email marketing campaigns.</p>
        </div>
        <button 
          onClick={() => setView('create')}
          className="flex items-center justify-center space-x-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
        >
          <Plus size={20} />
          <span>Create New</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search campaigns..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Campaign Info</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Stats</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <h3 className="font-medium text-slate-900">{campaign.name}</h3>
                    <p className="text-sm text-slate-500 truncate max-w-xs">{campaign.subject}</p>
                    <p className="text-xs text-slate-400 mt-1">Created: {campaign.createdAt} • List: {campaign.audience}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center text-sm text-slate-600">
                    {campaign.type === 'Autoresponder' ? <Clock size={16} className="mr-2 text-indigo-500" /> : <Send size={16} className="mr-2 text-slate-400" />}
                    {campaign.type || 'Regular'}
                  </span>
                </td>
                <td className="px-6 py-4">
                   <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      campaign.status === CampaignStatus.Sent ? 'bg-green-100 text-green-700' : 
                      campaign.status === CampaignStatus.Draft ? 'bg-gray-100 text-gray-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {campaign.status}
                    </span>
                </td>
                <td className="px-6 py-4">
                  {campaign.status === CampaignStatus.Sent || campaign.status === CampaignStatus.Sending ? (
                    <div className="flex items-center space-x-4 text-sm">
                      <div>
                        <span className="block font-bold text-slate-800">{campaign.openRate}%</span>
                        <span className="text-slate-400 text-xs">Open Rate</span>
                      </div>
                      <div>
                        <span className="block font-bold text-slate-800">{campaign.clickRate}%</span>
                        <span className="text-slate-400 text-xs">Click Rate</span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-slate-400 text-sm italic">No data yet</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                      <Trash2 size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-700">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};