import React, { useState, useRef } from 'react';
import { UploadCloud, File, X } from 'lucide-react';

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

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFiles = (newFiles) => {
    const validFiles = Array.from(newFiles).filter(file => {
      // Basic validation for Images, PDFs, Docs
      return file.type.startsWith('image/') || 
             file.type === 'application/pdf' ||
             file.type.includes('word') || 
             file.type.includes('document');
    });
    
    setFiles(prev => [...prev, ...validFiles]);
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
  };

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
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
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-white border border-[#C2CBD3]/30 rounded-xl p-4 shadow-[0_2px_10px_-2px_rgba(49,56,81,0.05)]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#F6F3ED] rounded-lg flex items-center justify-center text-[#6366F1]">
                  <File size={20} />
                </div>
                <div className="flex flex-col text-left text-[#313851]">
                  <span className="text-sm font-semibold truncate max-w-[200px] sm:max-w-xs">{file.name}</span>
                  <span className="text-xs font-medium text-[#313851]/60">{formatSize(file.size)}</span>
                </div>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#313851]/40 hover:text-[#313851] hover:bg-[#F6F3ED] transition-colors"
                title="Remove file"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
