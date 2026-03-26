import React from 'react';

export default function MobileFrame({ children, mode = 'viewer' }) {
  if (mode === 'viewer') {
    return (
      <div className="w-full min-h-screen max-w-md mx-auto relative shadow-xl bg-white">
        {children}
      </div>
    );
  }

  return (
    <div className="w-[375px] h-[812px] rounded-[55px] shadow-[0_0_0_12px_#1a1a1a,0_20px_50px_rgba(0,0,0,0.3)] border-[2px] border-[#333] overflow-hidden relative bg-white shrink-0">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-[#1a1a1a] rounded-b-3xl z-50 flex items-center justify-center">
        <div className="w-12 h-1 bg-[#333] rounded-full mr-4" />
        <div className="w-2 h-2 bg-[#333] rounded-full" />
      </div>
      {children}
    </div>
  );
}
