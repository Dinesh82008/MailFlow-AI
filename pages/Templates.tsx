
import React, { useState } from 'react';
import { Plus, Search, MoreVertical, Save, ArrowLeft, Eye, X, Edit2, Trash2 } from 'lucide-react';
import { EmailTemplate, EmailBlock } from '../types';
import { EmailEditor, compileBlocksToHtml } from '../components/EmailEditor';

const MOCK_TEMPLATES: EmailTemplate[] = [
    { 
      id: '1', 
      name: 'Modern Newsletter', 
      category: 'Newsletter', 
      updatedAt: '2 days ago', 
      thumbnail: 'https://via.placeholder.com/300x200/f1f5f9/94a3b8?text=Newsletter',
      html: '<div style="text-align: center; padding: 20px 0;"><div style="font-size: 24px; font-weight: bold;">Weekly Digest</div><p>Here is your weekly update.</p></div>',
      blocks: [
        { id: '1', type: 'text', content: { text: '<div style="font-size: 24px; font-weight: bold; margin-bottom: 10px;">Weekly Digest</div><p>Here is your weekly update regarding our platform.</p>', align: 'center' } },
        { id: '2', type: 'divider', content: {} },
        { id: '3', type: 'button', content: { label: 'Read More', url: '#', backgroundColor: '#4f46e5', color: '#ffffff', align: 'center' } }
      ]
    },
    { 
      id: '2', 
      name: 'E-commerce Sale', 
      category: 'Promotional', 
      updatedAt: '1 week ago', 
      thumbnail: 'https://via.placeholder.com/300x200/e0e7ff/6366f1?text=Sale+Promo',
      html: '<div style="text-align: center;"><h1>Flash Sale!</h1><p>50% off everything.</p></div>',
      blocks: [
        { id: '1', type: 'text', content: { text: '<h1>Flash Sale!</h1><p>Get 50% off everything this weekend only.</p>', align: 'center' } },
        { id: '2', type: 'image', content: { src: 'https://via.placeholder.com/600x300', alt: 'Sale Banner', width: '100%', align: 'center' } },
        { id: '3', type: 'button', content: { label: 'Shop Now', url: '#', backgroundColor: '#ef4444', color: '#ffffff', align: 'center' } }
      ]
    },
    { id: '3', name: 'Welcome Email', category: 'Transactional', updatedAt: '1 month ago', thumbnail: 'https://via.placeholder.com/300x200/f0fdf4/22c55e?text=Welcome' },
    { id: '4', name: 'Simple Text', category: 'Basic', updatedAt: '3 months ago', thumbnail: 'https://via.placeholder.com/300x200/f8fafc/64748b?text=Simple' },
];

export const Templates: React.FC = () => {
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
  const [templates, setTemplates] = useState<EmailTemplate[]>(MOCK_TEMPLATES);
  const [previewTemplate, setPreviewTemplate] = useState<EmailTemplate | null>(null);
  
  // Editor State
  const [activeTemplateId, setActiveTemplateId] = useState<string | null>(null);
  const [editorMode, setEditorMode] = useState<'visual' | 'code'>('visual');
  const [blocks, setBlocks] = useState<EmailBlock[]>([]);
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [templateMeta, setTemplateMeta] = useState({ name: '', category: 'Newsletter' });

  // Handle opening the editor
  const handleOpenEditor = (templateId?: string) => {
    if (templateId) {
      // Load existing template data
      const tmpl = templates.find(t => t.id === templateId);
      if (tmpl) {
        setTemplateMeta({ name: tmpl.name, category: tmpl.category });
        
        // IMPORTANT: Load blocks if they exist, otherwise fallback to default
        if (tmpl.blocks && tmpl.blocks.length > 0) {
            setBlocks(tmpl.blocks);
        } else {
            // Fallback for templates without block data (legacy/mock)
            setBlocks([{ id: '1', type: 'text', content: { text: `<h1>${tmpl.name}</h1><p>Start customizing this template...</p>`, align: 'center' } }]);
        }
        
        setHtmlContent(tmpl.html || '');
        setActiveTemplateId(templateId);
        setView('edit');
      }
    } else {
      // Create new template
      setTemplateMeta({ name: 'Untitled Template', category: 'Newsletter' });
      setBlocks([{ id: '1', type: 'text', content: { text: '<h1>New Template</h1><p>Drag blocks from the sidebar to build your email.</p>', align: 'center' } }]);
      setHtmlContent('');
      setActiveTemplateId(null);
      setView('create');
    }
  };

  const handleSave = () => {
    // Compile final HTML based on current mode
    const finalHtml = editorMode === 'visual' ? compileBlocksToHtml(blocks) : htmlContent;
    // For code mode, we can't easily reverse-engineer blocks, so we save a special HTML block
    const finalBlocks = editorMode === 'visual' ? blocks : [{ id: '1', type: 'html', content: { html: htmlContent } } as EmailBlock];
    
    if (view === 'create') {
      const newTemplate: EmailTemplate = {
        id: Date.now().toString(),
        name: templateMeta.name,
        category: templateMeta.category,
        updatedAt: 'Just now',
        thumbnail: 'https://via.placeholder.com/300x200/f1f5f9/94a3b8?text=' + encodeURIComponent(templateMeta.name),
        blocks: finalBlocks,
        html: finalHtml
      };
      setTemplates([newTemplate, ...templates]);
    } else if (view === 'edit' && activeTemplateId) {
      setTemplates(templates.map(t => t.id === activeTemplateId ? { 
          ...t, 
          name: templateMeta.name, 
          category: templateMeta.category, 
          updatedAt: 'Just now',
          blocks: finalBlocks,
          html: finalHtml
      } : t));
    }
    
    setView('list');
  };

  const handleDelete = (id: string) => {
      if(window.confirm('Are you sure you want to delete this template?')) {
          setTemplates(templates.filter(t => t.id !== id));
      }
  };

  if (view === 'create' || view === 'edit') {
    return (
      <div className="p-4 md:p-8 max-w-[1600px] mx-auto h-[calc(100vh-64px)] flex flex-col animate-fade-in">
         {/* Header */}
         <div className="flex items-center justify-between mb-6 shrink-0">
          <div className="flex items-center space-x-4">
             <button onClick={() => setView('list')} className="text-slate-500 hover:text-slate-800 font-medium flex items-center transition-colors">
               <ArrowLeft size={18} className="mr-1" /> Back
             </button>
             <h1 className="text-2xl font-bold text-slate-800">{view === 'create' ? 'Create Template' : 'Edit Template'}</h1>
          </div>
          <button onClick={handleSave} className="bg-slate-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-slate-800 transition-colors shadow-lg flex items-center">
             <Save size={18} className="mr-2" /> Save Template
          </button>
        </div>

        <div className="grid grid-cols-12 gap-6 h-full overflow-hidden pb-4">
           {/* Sidebar: Meta */}
           <div className="col-span-12 lg:col-span-3">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-semibold text-slate-800 mb-4">Template Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Template Name</label>
                    <input type="text" value={templateMeta.name} onChange={e => setTemplateMeta({...templateMeta, name: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category</label>
                    <select value={templateMeta.category} onChange={e => setTemplateMeta({...templateMeta, category: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                      <option>Newsletter</option>
                      <option>Promotional</option>
                      <option>Transactional</option>
                      <option>Basic</option>
                    </select>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg text-xs text-slate-500">
                    <p className="mb-2"><strong>Tips:</strong></p>
                    <ul className="list-disc pl-4 space-y-1">
                        <li>Use the Visual Builder for easy drag-and-drop design.</li>
                        <li>Switch to HTML Code for fine-grained control.</li>
                        <li>Changes are auto-synced between views.</li>
                    </ul>
                  </div>
                </div>
              </div>
           </div>

           {/* Editor */}
           <div className="col-span-12 lg:col-span-9 h-full">
              <EmailEditor 
                blocks={blocks} 
                setBlocks={setBlocks}
                editorMode={editorMode}
                setEditorMode={setEditorMode}
                htmlContent={htmlContent}
                setHtmlContent={setHtmlContent}
                onHtmlChange={(html) => setHtmlContent(html)}
              />
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Email Templates</h1>
          <p className="text-slate-500">Create, manage, and customize your email designs.</p>
        </div>
        <button 
          onClick={() => handleOpenEditor()}
          className="flex items-center justify-center space-x-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
        >
          <Plus size={20} />
          <span>Create Template</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search templates..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <select className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 focus:outline-none bg-white">
              <option>All Categories</option>
              <option>Newsletter</option>
              <option>Promotional</option>
              <option>Transactional</option>
          </select>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Create New Card */}
          <div 
            onClick={() => handleOpenEditor()}
            className="border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-8 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all group min-h-[250px]"
          >
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-indigo-200 group-hover:text-indigo-600 mb-4 transition-colors">
                  <Plus size={24} />
              </div>
              <h3 className="font-semibold text-slate-600 group-hover:text-indigo-700">Blank Template</h3>
              <p className="text-sm text-slate-400 mt-1">Start from scratch</p>
          </div>

          {templates.map((template) => (
              <div key={template.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                  <div className="h-40 bg-slate-100 relative overflow-hidden shrink-0">
                      <img src={template.thumbnail} alt={template.name} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300" />
                      {/* Hover Actions */}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setPreviewTemplate(template); }} 
                            className="p-2 bg-white text-slate-800 rounded-full hover:bg-slate-100 shadow-lg"
                            title="Preview"
                          >
                            <Eye size={16} />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleOpenEditor(template.id); }}
                            className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 shadow-lg"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                             onClick={(e) => { e.stopPropagation(); handleDelete(template.id); }}
                             className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg"
                             title="Delete"
                          >
                             <Trash2 size={16} />
                          </button>
                      </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-slate-800 truncate" title={template.name}>{template.name}</h3>
                            <button className="text-slate-400 hover:text-slate-600">
                                <MoreVertical size={16} />
                            </button>
                        </div>
                        <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full inline-block mb-2">{template.category}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-2">Updated {template.updatedAt}</p>
                  </div>
              </div>
          ))}
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
             <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden">
                <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
                   <div>
                       <h3 className="font-bold text-slate-800">{previewTemplate.name}</h3>
                       <p className="text-xs text-slate-500">Preview Mode</p>
                   </div>
                   <button 
                     onClick={() => setPreviewTemplate(null)}
                     className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
                   >
                       <X size={20} />
                   </button>
                </div>
                <div className="flex-1 overflow-auto bg-slate-200 p-4 md:p-8 flex justify-center">
                   <div 
                      className="bg-white shadow-lg mx-auto w-full max-w-[600px] min-h-[500px] h-fit animate-slide-up"
                      dangerouslySetInnerHTML={{__html: previewTemplate.html || '<div class="p-12 text-center text-slate-400">Empty Template</div>'}}
                   ></div>
                </div>
             </div>
          </div>
      )}
    </div>
  );
};
