import React from 'react';
import FileUpload from '../components/ui/FileUpload';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-[#F6F3ED] text-[#313851] font-sans selection:bg-[#6366F1]/20">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-[#F6F3ED]/80 backdrop-blur-md border-b border-[#C2CBD3]/30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo Area */}
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Parseon Logo" className="w-10 h-10 object-contain drop-shadow-sm" />
            <span className="font-bold text-xl tracking-tight">Parseon</span>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center gap-8">
            <a href="#" className="text-sm font-semibold text-[#313851] hover:text-[#6366F1] transition-colors">Dashboard</a>
            <a href="#" className="text-sm font-medium text-[#313851]/70 hover:text-[#6366F1] transition-colors">Docs</a>
            <a href="#" className="text-sm font-medium text-[#313851]/70 hover:text-[#6366F1] transition-colors">Profile</a>
          </div>
        </div>
      </nav>

      {/* Main Area */}
      <main className="w-full max-w-7xl mx-auto px-6 py-12 flex items-center justify-center min-h-[calc(100vh-4rem)]">
        {/* Empty State Card */}
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-[0_4px_20px_-2px_rgba(49,56,81,0.08)] p-8 md:p-12 flex flex-col items-center justify-center text-center border border-[#C2CBD3]/20">
          
          <h2 className="text-3xl font-extrabold text-[#313851] mb-3">Ingest your documents</h2>
          <p className="text-[#313851]/70 text-lg">Upload files to extract structured data</p>

          {/* Drag and Drop Modular Component */}
          <FileUpload />

        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
