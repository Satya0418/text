import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DataViewer = ({ file }) => {
  const [viewMode, setViewMode] = useState('ui'); // 'ui' or 'json'

  if (!file) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-[#313851]/40 h-full text-center p-8">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-16 h-16 mb-4 opacity-50" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        <p className="text-lg font-bold text-[#313851]">No document selected</p>
        <p className="text-sm mt-1">Select a processed document from the list to view its extracted data.</p>
      </div>
    );
  }

  if (file.status !== 'done' || !file.extractedData) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-[#313851]/40 h-full text-center p-8">
        <div className="w-12 h-12 border-4 border-[#C2CBD3]/30 border-t-[#6366F1] rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-bold text-[#313851]">Processing...</p>
        <p className="text-sm mt-1">AI is extracting structured data from {file.file.name}</p>
      </div>
    );
  }

  const { extractedData } = file;

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#C2CBD3]/20">
        <div className="min-w-0 pr-4">
          <h3 className="text-xl font-bold text-[#313851] truncate">Extracted Data</h3>
          <p className="text-sm text-[#313851]/60 truncate max-w-xs">{file.file.name}</p>
        </div>
        
        {/* Toggle View */}
        <div className="flex bg-[#F6F3ED] rounded-lg p-1 flex-shrink-0">
          <button 
            onClick={() => setViewMode('ui')}
            className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${viewMode === 'ui' ? 'bg-white text-[#6366F1] shadow-[0_2px_8px_-2px_rgba(49,56,81,0.1)]' : 'text-[#313851]/60 hover:text-[#313851]'}`}
          >
            Clean UI
          </button>
          <button 
            onClick={() => setViewMode('json')}
            className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${viewMode === 'json' ? 'bg-white text-[#6366F1] shadow-[0_2px_8px_-2px_rgba(49,56,81,0.1)]' : 'text-[#313851]/60 hover:text-[#313851]'}`}
          >
            Raw JSON
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        {viewMode === 'json' ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-[#313851]/5 rounded-xl p-6 font-mono text-sm text-[#313851] overflow-x-auto"
          >
            <pre className="whitespace-pre-wrap">{JSON.stringify(extractedData, null, 2)}</pre>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            {Object.entries(extractedData).map(([key, value]) => (
              <div key={key} className="flex flex-col bg-[#F6F3ED]/30 p-4 rounded-xl border border-[#C2CBD3]/20">
                <span className="text-[11px] font-bold text-[#313851]/50 uppercase tracking-wider mb-1">{key}</span>
                <span className="text-base font-semibold text-[#313851]">{value?.toString()}</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DataViewer;
