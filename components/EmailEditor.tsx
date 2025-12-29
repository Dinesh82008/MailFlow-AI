import React, { useEffect, useState } from 'react';
import { 
  Layout, Code, Type, Image as ImageIcon, Clock, Link, 
  MoveUp, MoveDown, Trash, AlignLeft, AlignCenter, AlignRight 
} from 'lucide-react';
import { EmailBlock, BlockContent } from '../types';

interface EmailEditorProps {
  blocks: EmailBlock[];
  setBlocks: (blocks: EmailBlock[]) => void;
  editorMode: 'visual' | 'code';
  setEditorMode: (mode: 'visual' | 'code') => void;
  htmlContent: string;
  setHtmlContent: (html: string) => void;
  onHtmlChange?: (html: string) => void;
}

// Helper to compile blocks to HTML
export const compileBlocksToHtml = (blocks: EmailBlock[]): string => {
  const html = blocks.map(block => {
    switch (block.type) {
      case 'text':
        return `<div style="text-align: ${block.content.align || 'left'}; padding: 10px 0;">${block.content.text}</div>`;
      case 'image':
        return `<div style="text-align: ${block.content.align || 'center'}; padding: 10px 0;"><img src="${block.content.src}" alt="${block.content.alt || ''}" style="max-width: 100%; height: auto; width: ${block.content.width || 'auto'};" /></div>`;
      case 'button':
        return `<div style="text-align: ${block.content.align || 'center'}; padding: 20px 0;">
          <a href="${block.content.url}" style="background-color: ${block.content.backgroundColor || '#4f46e5'}; color: ${block.content.color || '#ffffff'}; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">${block.content.label}</a>
        </div>`;
      case 'divider':
        return `<hr style="margin: 20px 0; border: 0; border-top: 1px solid #e2e8f0;" />`;
      case 'social':
        return `<div style="text-align: center; padding: 20px 0;">
          <a href="#" style="margin: 0 10px; text-decoration: none; color: #4f46e5; font-family: sans-serif;">Facebook</a>
          <a href="#" style="margin: 0 10px; text-decoration: none; color: #4f46e5; font-family: sans-serif;">Twitter</a>
          <a href="#" style="margin: 0 10px; text-decoration: none; color: #4f46e5; font-family: sans-serif;">Instagram</a>
        </div>`;
      case 'html':
        return block.content.html || '';
      default:
        return '';
    }
  }).join('\n');

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="font-family: sans-serif; line-height: 1.5; color: #333; margin: 0; padding: 0; background-color: #f8fafc;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px;">
    ${html}
  </div>
</body>
</html>`;
};

export const EmailEditor: React.FC<EmailEditorProps> = ({
  blocks,
  setBlocks,
  editorMode,
  setEditorMode,
  htmlContent,
  setHtmlContent,
  onHtmlChange
}) => {
  // Track selected block to keep controls visible
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  // Auto-compile HTML when blocks change in visual mode
  useEffect(() => {
    if (editorMode === 'visual') {
      const compiled = compileBlocksToHtml(blocks);
      if (onHtmlChange) {
        onHtmlChange(compiled);
      } else {
        setHtmlContent(compiled);
      }
    }
  }, [blocks, editorMode, setHtmlContent, onHtmlChange]);

  const handleModeSwitch = (mode: 'visual' | 'code') => {
    if (mode === 'visual' && editorMode === 'code') {
      // If switching back to visual, wrap raw HTML in a block to preserve it
      if (htmlContent.trim()) {
         const newId = Date.now().toString();
         setBlocks([{ id: newId, type: 'html', content: { html: htmlContent } }]);
         setSelectedBlockId(newId);
      }
    }
    setEditorMode(mode);
  };

  // --- Builder Actions ---

  const addBlock = (type: EmailBlock['type']) => {
    const newId = Date.now().toString();
    const newBlock: EmailBlock = {
      id: newId,
      type,
      content: {
        text: type === 'text' ? '<p>Write your content here...</p>' : undefined,
        label: type === 'button' ? 'Click Here' : undefined,
        url: type === 'button' || type === 'image' ? '#' : undefined,
        src: type === 'image' ? 'https://via.placeholder.com/600x300' : undefined,
        align: 'center',
        backgroundColor: '#4f46e5',
        color: '#ffffff',
        width: '100%'
      }
    };
    setBlocks([...blocks, newBlock]);
    setSelectedBlockId(newId); // Auto-select new block
  };

  const updateBlock = (id: string, content: Partial<BlockContent>) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content: { ...b.content, ...content } } : b));
  };

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
    if (selectedBlockId === id) setSelectedBlockId(null);
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    // Boundary checks
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;

    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    
    setBlocks(newBlocks);
    // Selection stays with the moved block automatically because ID doesn't change
  };

  // --- Renderers ---

  const ToolButton = ({ icon: Icon, label, onClick }: { icon: any, label: string, onClick: () => void }) => (
    <button onClick={onClick} className="flex flex-col items-center justify-center p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg w-14 h-14 transition-colors group">
      <Icon size={20} className="mb-1" />
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );

  const renderBlockEditor = (block: EmailBlock) => {
    const onChange = (c: Partial<BlockContent>) => updateBlock(block.id, c);
    const commonStyles = "w-full p-2 border border-transparent hover:border-slate-300 focus:border-indigo-500 rounded outline-none transition-colors";
    
    switch (block.type) {
      case 'text':
        return (
          <div className="relative">
            {selectedBlockId === block.id && (
              <div className="flex gap-2 mb-2 absolute -top-10 left-0 bg-white p-1 shadow-md rounded border border-slate-200 z-30 animate-fade-in">
                <button onClick={(e) => { e.stopPropagation(); onChange({ align: 'left' }); }} className={`p-1.5 rounded hover:bg-slate-100 ${block.content.align === 'left' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500'}`}><AlignLeft size={16} /></button>
                <button onClick={(e) => { e.stopPropagation(); onChange({ align: 'center' }); }} className={`p-1.5 rounded hover:bg-slate-100 ${block.content.align === 'center' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500'}`}><AlignCenter size={16} /></button>
                <button onClick={(e) => { e.stopPropagation(); onChange({ align: 'right' }); }} className={`p-1.5 rounded hover:bg-slate-100 ${block.content.align === 'right' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500'}`}><AlignRight size={16} /></button>
              </div>
            )}
            <textarea 
              value={block.content.text}
              onChange={e => onChange({ text: e.target.value })}
              className={`${commonStyles} min-h-[100px] resize-none bg-transparent focus:ring-0`}
              style={{ textAlign: block.content.align }}
            />
          </div>
        );
      case 'image':
        return (
          <div className="text-center">
             {block.content.src ? (
               <img src={block.content.src} alt="Preview" className="max-w-full h-auto mx-auto mb-2 rounded" style={{ width: block.content.width || 'auto' }} />
             ) : (
               <div className="h-32 bg-slate-100 flex items-center justify-center text-slate-400 mb-2 rounded border border-dashed border-slate-300">No Image</div>
             )}
             {selectedBlockId === block.id && (
                <div className="grid grid-cols-2 gap-2 mt-2 p-2 bg-slate-50 rounded border border-slate-200">
                  <input type="text" value={block.content.src} onChange={e => onChange({ src: e.target.value })} placeholder="Image URL" className="text-xs p-2 border border-slate-300 rounded focus:border-indigo-500 outline-none" />
                  <input type="text" value={block.content.width} onChange={e => onChange({ width: e.target.value })} placeholder="Width (e.g. 100%)" className="text-xs p-2 border border-slate-300 rounded focus:border-indigo-500 outline-none" />
                </div>
             )}
          </div>
        );
      case 'button':
        return (
          <div className="py-4 text-center" style={{ textAlign: block.content.align }}>
             <span className="inline-block px-6 py-3 rounded font-bold text-white transition-opacity hover:opacity-90 shadow-sm" style={{ backgroundColor: block.content.backgroundColor, color: block.content.color }}>
               {block.content.label}
             </span>
             {selectedBlockId === block.id && (
                <div className="mt-3 flex flex-col gap-2 p-3 bg-slate-50 rounded border border-slate-200 text-left">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-500 uppercase font-bold">Label</label>
                        <input type="text" value={block.content.label} onChange={e => onChange({ label: e.target.value })} className="w-full text-xs p-2 border border-slate-300 rounded outline-none focus:border-indigo-500" />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 uppercase font-bold">URL</label>
                        <input type="text" value={block.content.url} onChange={e => onChange({ url: e.target.value })} className="w-full text-xs p-2 border border-slate-300 rounded outline-none focus:border-indigo-500" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                         <input type="color" value={block.content.backgroundColor} onChange={e => onChange({ backgroundColor: e.target.value })} className="h-8 w-8 rounded cursor-pointer border-0" />
                         <span className="text-xs text-slate-600">Background</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <input type="color" value={block.content.color} onChange={e => onChange({ color: e.target.value })} className="h-8 w-8 rounded cursor-pointer border-0" />
                         <span className="text-xs text-slate-600">Text Color</span>
                      </div>
                    </div>
                </div>
             )}
          </div>
        );
      case 'divider':
        return <hr className="my-4 border-slate-200" />;
      case 'social':
         return (
           <div className="flex justify-center gap-4 py-4">
              <div className="w-8 h-8 bg-[#1877F2] rounded-full flex items-center justify-center text-white text-xs">f</div>
              <div className="w-8 h-8 bg-[#1DA1F2] rounded-full flex items-center justify-center text-white text-xs">t</div>
              <div className="w-8 h-8 bg-[#E4405F] rounded-full flex items-center justify-center text-white text-xs">i</div>
           </div>
         );
      case 'html':
        return (
          <div className="bg-slate-900 text-slate-300 p-3 font-mono text-xs rounded border border-slate-700">
            <div className="flex justify-between mb-2 text-slate-400 uppercase font-bold tracking-wider">Custom HTML</div>
            <textarea 
              value={block.content.html}
              onChange={e => onChange({ html: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 outline-none h-24 resize-y focus:border-indigo-500 text-slate-200"
            />
          </div>
        )
      default:
        return <div>Unknown Block</div>;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Toolbar */}
      <div className="h-14 border-b border-slate-100 flex items-center justify-between px-4 bg-slate-50 shrink-0">
        <div className="flex bg-slate-200 rounded-lg p-1">
            <button 
            onClick={() => handleModeSwitch('visual')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center space-x-2 transition-all ${editorMode === 'visual' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Layout size={16} /> <span>Visual Builder</span>
            </button>
            <button 
            onClick={() => handleModeSwitch('code')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center space-x-2 transition-all ${editorMode === 'code' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Code size={16} /> <span>HTML Code</span>
            </button>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Auto-synced
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-hidden relative" onClick={() => setSelectedBlockId(null)}>
        {editorMode === 'code' ? (
          <textarea 
            value={htmlContent}
            onChange={e => {
              setHtmlContent(e.target.value);
              if (onHtmlChange) onHtmlChange(e.target.value);
            }}
            className="w-full h-full p-6 font-mono text-sm text-slate-700 resize-none focus:outline-none"
            placeholder="<html>...</html>"
          />
        ) : (
          <div className="flex h-full">
            {/* Blocks Sidebar */}
            <div className="w-20 bg-slate-50 border-r border-slate-200 flex flex-col items-center py-6 space-y-4 shrink-0 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <ToolButton icon={Type} label="Text" onClick={() => addBlock('text')} />
                <ToolButton icon={ImageIcon} label="Image" onClick={() => addBlock('image')} />
                <ToolButton icon={Clock} label="Button" onClick={() => addBlock('button')} />
                <ToolButton icon={Layout} label="Divider" onClick={() => addBlock('divider')} />
                <ToolButton icon={Link} label="Social" onClick={() => addBlock('social')} />
            </div>

            {/* Canvas */}
            <div className="flex-1 bg-slate-100 overflow-y-auto p-4 md:p-8">
                <div className="max-w-[600px] mx-auto bg-white min-h-[600px] shadow-sm relative rounded-lg" onClick={(e) => e.stopPropagation()}>
                    {blocks.length === 0 && (
                      <div className="p-12 text-center text-slate-400 border-2 border-dashed border-slate-200 m-8 rounded-xl flex flex-col items-center justify-center h-64">
                        <Layout size={48} className="text-slate-200 mb-4" />
                        <p>Your canvas is empty.</p>
                        <p className="text-sm">Click a tool on the left to add blocks.</p>
                      </div>
                    )}
                    
                    {blocks.map((block, index) => {
                      const isSelected = selectedBlockId === block.id;
                      return (
                        <div 
                          key={block.id} 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBlockId(block.id);
                          }}
                          className={`group relative border-2 transition-all cursor-pointer ${isSelected ? 'border-indigo-500 ring-4 ring-indigo-500/10 z-10 rounded-lg my-2' : 'border-transparent hover:border-slate-200'}`}
                        >
                            {/* Block Actions Overlay - Visible if Selected OR Hovered */}
                            <div className={`absolute -right-12 top-0 flex flex-col gap-1.5 z-50 ${isSelected ? 'opacity-100 pointer-events-auto' : 'opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto'} transition-opacity duration-200`}>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); moveBlock(index, 'up'); }} 
                                  disabled={index === 0}
                                  className={`p-2 bg-white border border-slate-200 shadow-md rounded-lg transition-colors ${index === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50'}`}
                                  title="Move Up"
                                >
                                  <MoveUp size={18} />
                                </button>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); moveBlock(index, 'down'); }} 
                                  disabled={index === blocks.length - 1}
                                  className={`p-2 bg-white border border-slate-200 shadow-md rounded-lg transition-colors ${index === blocks.length - 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50'}`}
                                  title="Move Down"
                                >
                                  <MoveDown size={18} />
                                </button>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); deleteBlock(block.id); }} 
                                  className="p-2 bg-white border border-slate-200 shadow-md text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-1"
                                  title="Delete Block"
                                >
                                  <Trash size={18} />
                                </button>
                            </div>

                            {/* Render Block Content */}
                            <div className="p-2 relative">
                              {renderBlockEditor(block)}
                              {/* Overlay to prevent interaction with internal elements unless selected (optional UX choice, keeps dragging easier) */}
                              {!isSelected && <div className="absolute inset-0 z-0 bg-transparent"></div>}
                            </div>
                        </div>
                      );
                    })}
                </div>
                <div className="max-w-[600px] mx-auto text-center text-xs text-slate-400 mt-8 mb-8">
                  &copy; {new Date().getFullYear()} Company Name. All rights reserved.
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
