import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import FileUpload from '../components/FileUpload';
import DataViewer from '../components/DataViewer';

const DashboardPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className="min-h-screen bg-[#F6F3ED] text-[#313851] font-sans flex flex-col">
      <Navbar />

      {/* Main Area */}
      <motion.main 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
        className="w-full max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-6 flex-1 lg:h-[calc(100vh-4rem)]"
      >
        {/* LEFT PANEL */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white rounded-2xl shadow-[0_4px_20px_-2px_rgba(49,56,81,0.08)] p-8 border border-[#C2CBD3]/20 overflow-y-auto">
          <h2 className="text-2xl font-extrabold text-[#313851] mb-1">Ingest documents</h2>
          <p className="text-[#313851]/60 mb-5 text-sm">Upload files to extract structured data</p>
          <FileUpload onSelectFile={setSelectedFile} selectedFileId={selectedFile?.id} />
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white rounded-2xl shadow-[0_4px_20px_-2px_rgba(49,56,81,0.08)] p-8 border border-[#C2CBD3]/20 overflow-y-auto">
          <DataViewer file={selectedFile} />
        </div>
      </motion.main>
    </div>
  );
};

export default DashboardPage;
