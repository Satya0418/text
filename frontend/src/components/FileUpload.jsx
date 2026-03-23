import React, { useState, useRef, useCallback } from 'react';
import { UploadCloud, File, X, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FileUpload = ({ onSelectFile, selectedFileId }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [filter, setFilter] = useState('all');
  const fileInputRef = useRef(null);

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const simulateUploadAndProcessing = (id) => {
    const documentTypes = [
      { type: 'Invoice', classes: 'bg-blue-100 text-blue-700 border-blue-200' },
      { type: 'Prescription', classes: 'bg-green-100 text-green-700 border-green-200' },
      { type: 'Receipt', classes: 'bg-orange-100 text-orange-700 border-orange-200' },
      { type: 'Other', classes: 'bg-gray-100 text-gray-700 border-gray-200' }
    ];

    let currentProgress = 0;
    const uploadInterval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(uploadInterval);
        setFiles(prev => prev.map(f => f.id === id ? { ...f, progress: 100, status: 'processing' } : f));
        
        setTimeout(() => {
          if (Math.random() < 0.12) {
            setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'failed' } : f));
            return;
          }

          const randomType = documentTypes[Math.floor(Math.random() * documentTypes.length)];
          const vendors = ["Amazon", "TechFlow Inc.", "Global Services", "HealthPlus", "Acme Corp"];
          const mockData = {
            type: randomType.type.toLowerCase(),
            amount: '₹' + (Math.floor(Math.random() * 5000) + 100),
            date: new Date().toISOString().split('T')[0],
            vendor: vendors[Math.floor(Math.random() * vendors.length)],
            status: "verified",
            confidence: (95 + Math.random() * 4.9).toFixed(1) + '%'
          };
          setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'done', classification: randomType, extractedData: mockData } : f));
        }, 3000 + Math.random() * 2000);
      } else {
        setFiles(prev => prev.map(f => f.id === id ? { ...f, progress: currentProgress } : f));
      }
    }, 400);
  };

  const processFiles = useCallback((newFiles) => {
    const validFiles = Array.from(newFiles).filter(file => {
      return file.type.startsWith('image/') || 
             file.type === 'application/pdf' ||
             file.type.includes('word') || 
             file.type.includes('document');
    });
    
    const newFileObjects = validFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      status: 'uploading',
      progress: 0
    }));

    setFiles(prev => [...prev, ...newFileObjects]);
    newFileObjects.forEach(f => simulateUploadAndProcessing(f.id));
  }, []);

  const onDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length > 0) processFiles(e.dataTransfer.files);
  };
  const onFileSelect = (e) => {
    if (e.target.files?.length > 0) processFiles(e.target.files);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  const removeFile = (idToRemove) => {
    setFiles(prev => prev.filter(f => f.id !== idToRemove));
  };

  const completedCount = files.filter(f => f.status === 'done').length;
  const processingCount = files.filter(f => f.status === 'processing' || f.status === 'uploading').length;
  const failedCount = files.filter(f => f.status === 'failed').length;

  const filteredFiles = files.filter(f => {
    if (filter === 'processing') return f.status === 'processing' || f.status === 'uploading';
    if (filter === 'completed') return f.status === 'done';
    return true;
  });

  return (
    <div className="w-full">
      {/* Upload Zone */}
      <div 
        className={`w-full border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer group
          ${isDragging ? 'border-[#6366F1] bg-[#6366F1]/5' : 'border-[#C2CBD3] hover:border-[#6366F1] hover:bg-[#F6F3ED]/50'}
        `}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform duration-300">
          <UploadCloud size={28} className="text-[#6366F1]" />
        </div>
        <p className="text-base font-bold text-[#313851] mb-1">Drag & drop files or click to upload</p>
        <p className="text-sm font-medium text-[#313851]/50">Supports Images, PDFs, and Docs</p>
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden"
          multiple
          accept="image/*,.pdf,.doc,.docx"
          onChange={onFileSelect}
        />
      </div>

      {/* Stats & Filters */}
      <div className="mt-8 mb-4 flex flex-col gap-5">
        <div className="grid grid-cols-3 gap-3">
          <motion.div whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(0,0,0,0.06)' }} className="bg-[#F6F3ED]/60 rounded-xl p-3.5 border border-[#C2CBD3]/30 flex flex-col">
            <span className="text-[10px] font-bold text-[#313851]/50 uppercase tracking-wider mb-0.5">Completed</span>
            <span className="text-xl font-extrabold text-[#6366F1]">{completedCount}</span>
          </motion.div>
          <motion.div whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(0,0,0,0.06)' }} className="bg-[#F6F3ED]/60 rounded-xl p-3.5 border border-[#C2CBD3]/30 flex flex-col">
            <span className="text-[10px] font-bold text-[#313851]/50 uppercase tracking-wider mb-0.5">Processing</span>
            <span className="text-xl font-extrabold text-orange-400">{processingCount}</span>
          </motion.div>
          <motion.div whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(0,0,0,0.06)' }} className="bg-[#F6F3ED]/60 rounded-xl p-3.5 border border-[#C2CBD3]/30 flex flex-col">
            <span className="text-[10px] font-bold text-[#313851]/50 uppercase tracking-wider mb-0.5">Failed</span>
            <span className="text-xl font-extrabold text-red-500">{failedCount}</span>
          </motion.div>
        </div>

        <div className="flex items-center justify-between border-b border-[#C2CBD3]/20 pb-2">
          <h3 className="text-base font-bold text-[#313851]">File History</h3>
          <div className="flex bg-[#F6F3ED] rounded-lg p-1">
            {['all', 'processing', 'completed'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all capitalize ${filter === f ? 'bg-white text-[#6366F1] shadow-sm' : 'text-[#313851]/60 hover:text-[#313851]'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* File List */}
      <div className="flex flex-col gap-3 min-h-[150px]">
        {files.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center p-6 text-center text-[#313851]/40 border-2 border-dashed border-[#C2CBD3]/30 rounded-xl bg-[#F6F3ED]/20">
            <p className="text-sm font-medium">No files uploaded yet.</p>
          </motion.div>
        ) : (
          filteredFiles.map((fileObj) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={(fileObj.status === 'done' || fileObj.status === 'failed') ? { scale: 1.01 } : {}}
              whileTap={(fileObj.status === 'done' || fileObj.status === 'failed') ? { scale: 0.99 } : {}}
              key={fileObj.id}
              onClick={() => {
                if (fileObj.status === 'done' || fileObj.status === 'failed') {
                  onSelectFile && onSelectFile(fileObj);
                }
              }}
              className={`relative overflow-hidden bg-white border rounded-xl p-4 transition-colors ${
                (fileObj.status === 'done' || fileObj.status === 'failed') ? 'cursor-pointer hover:border-[#6366F1]/50' : 'opacity-90'
              } ${
                selectedFileId === fileObj.id 
                  ? 'border-[#6366F1] shadow-[0_4px_14px_-2px_rgba(99,102,241,0.2)]' 
                  : 'border-[#C2CBD3]/30 shadow-[0_2px_10px_-2px_rgba(49,56,81,0.05)]'
              }`}
            >
              {/* Progress Bar */}
              {fileObj.status === 'uploading' && (
                <div className="absolute bottom-0 left-0 h-1 bg-[#6366F1] transition-all duration-300 ease-out" style={{ width: `${fileObj.progress}%` }} />
              )}
              
              <div className="flex items-start justify-between relative z-10 w-full">
                <div className="flex items-start gap-3 flex-1 overflow-hidden">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    fileObj.status === 'done' ? 'bg-green-50 text-green-500' : 
                    fileObj.status === 'failed' ? 'bg-red-50 text-red-500' : 'bg-[#F6F3ED] text-[#6366F1]'
                  }`}>
                    {fileObj.status === 'done' ? <CheckCircle size={18} /> : fileObj.status === 'failed' ? <X size={18} /> : <File size={18} />}
                  </div>
                  
                  <div className="flex flex-col text-left flex-1 min-w-0">
                    <div className="flex items-center gap-2 w-full">
                      <span className={`text-sm font-semibold truncate max-w-[180px] ${fileObj.status === 'failed' ? 'text-red-500' : 'text-[#313851]'}`}>{fileObj.file.name}</span>
                      {fileObj.status === 'done' && fileObj.classification && (
                        <motion.span 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border ${fileObj.classification.classes} flex-shrink-0`}
                        >
                          {fileObj.classification.type}
                        </motion.span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-medium text-[#313851]/60">{formatSize(fileObj.file.size)}</span>
                      <span className="w-1 h-1 bg-[#C2CBD3] rounded-full"></span>
                      {fileObj.status === 'uploading' && <span className="text-xs font-medium text-[#6366F1]">{fileObj.progress}%</span>}
                      {fileObj.status === 'processing' && (
                        <span className="text-xs font-medium text-[#6366F1] flex items-center gap-1.5 animate-pulse">
                          <Loader2 size={12} className="animate-spin" /> Processing with AI…
                        </span>
                      )}
                      {fileObj.status === 'done' && <span className="text-xs font-medium text-green-500">Ready</span>}
                      {fileObj.status === 'failed' && <span className="text-xs font-medium text-red-500">Extraction failed</span>}
                    </div>

                    {fileObj.status === 'processing' && (
                      <div className="w-full max-w-[180px] mt-2.5 space-y-1.5">
                        <div className="h-1.5 w-full bg-[#F6F3ED] rounded-full overflow-hidden">
                          <div className="h-full bg-[#E5E7EB] w-2/3 animate-pulse rounded-full"></div>
                        </div>
                        <div className="h-1.5 w-4/5 bg-[#F6F3ED] rounded-full overflow-hidden">
                          <div className="h-full bg-[#E5E7EB] w-1/2 animate-pulse rounded-full" style={{ animationDelay: '150ms' }}></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); removeFile(fileObj.id); }}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[#313851]/30 hover:text-[#313851] hover:bg-[#F6F3ED] transition-colors ml-3 flex-shrink-0"
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default FileUpload;
