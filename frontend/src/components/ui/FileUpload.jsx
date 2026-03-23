import React, { useState, useRef, useCallback } from 'react';
import { UploadCloud, File, X, CheckCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const FileUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
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
        
        // Simulate Processing delay (AI extraction)
        setTimeout(() => {
          const randomType = documentTypes[Math.floor(Math.random() * documentTypes.length)];
          setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'done', classification: randomType } : f));
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

    // Start simulation for each valid file
    newFileObjects.forEach(f => simulateUploadAndProcessing(f.id));
  }, []);

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const onFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
    // reset input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (idToRemove) => {
    setFiles(prev => prev.filter(f => f.id !== idToRemove));
  };

  return (
    <div className="w-full mt-8">
      {/* Upload Zone */}
      <div 
        className={`w-full border-2 border-dashed rounded-2xl p-10 md:p-14 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer group
          ${isDragging ? 'border-[#6366F1] bg-[#F6F3ED]' : 'border-[#C2CBD3] hover:border-[#6366F1] hover:bg-[#F6F3ED]/50'}
        `}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform duration-300">
          <UploadCloud size={32} className="text-[#6366F1]" />
        </div>
        <p className="text-lg font-bold text-[#313851] mb-1">
          Drag & drop files or click to upload
        </p>
        <p className="text-sm font-medium text-[#313851]/60">
          Supports Images, PDFs, and Docs
        </p>

        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden"
          multiple
          accept="image/*,.pdf,.doc,.docx"
          onChange={onFileSelect}
        />
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-6 flex flex-col gap-3">
          {files.map((fileObj) => (
            <div key={fileObj.id} className="relative overflow-hidden bg-white border border-[#C2CBD3]/30 rounded-xl p-4 shadow-[0_2px_10px_-2px_rgba(49,56,81,0.05)] transition-all">
              
              {/* Progress Bar Background */}
              {fileObj.status === 'uploading' && (
                <div 
                  className="absolute bottom-0 left-0 h-1 bg-[#6366F1] transition-all duration-300 ease-out"
                  style={{ width: `${fileObj.progress}%` }}
                />
              )}
              
              <div className="flex items-start justify-between relative z-10 w-full">
                <div className="flex items-start gap-4 flex-1 overflow-hidden">
                  <div className="w-10 h-10 bg-[#F6F3ED] rounded-lg flex items-center justify-center text-[#6366F1] flex-shrink-0 mt-0.5">
                    {fileObj.status === 'done' ? (
                      <CheckCircle size={20} className="text-green-500" />
                    ) : (
                      <File size={20} />
                    )}
                  </div>
                  
                  <div className="flex flex-col text-left text-[#313851] flex-1 min-w-0">
                    <div className="flex items-center gap-3 w-full">
                      <span className="text-sm font-semibold truncate max-w-[150px] sm:max-w-[200px]">{fileObj.file.name}</span>
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
                      
                      {fileObj.status === 'uploading' && (
                        <>
                          <span className="w-1 h-1 bg-[#C2CBD3] rounded-full"></span>
                          <span className="text-xs font-medium text-[#6366F1]">{fileObj.progress}%</span>
                        </>
                      )}
                      
                      {fileObj.status === 'processing' && (
                        <>
                          <span className="w-1 h-1 bg-[#C2CBD3] rounded-full"></span>
                          <span className="text-xs font-medium text-[#6366F1] flex items-center gap-1.5 animate-pulse">
                            <Loader2 size={12} className="animate-spin" /> Processing with AI...
                          </span>
                        </>
                      )}
                      
                      {fileObj.status === 'done' && (
                        <>
                          <span className="w-1 h-1 bg-[#C2CBD3] rounded-full"></span>
                          <span className="text-xs font-medium text-green-500">Ready</span>
                        </>
                      )}
                    </div>

                    {/* Skeleton Loader inside the file item while processing */}
                    {fileObj.status === 'processing' && (
                      <div className="w-full max-w-[200px] mt-3 space-y-2">
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
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(fileObj.id);
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#313851]/40 hover:text-[#313851] hover:bg-[#F6F3ED] transition-colors ml-4 flex-shrink-0"
                  title="Remove file"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
