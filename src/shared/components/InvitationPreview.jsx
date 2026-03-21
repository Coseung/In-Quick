import React from 'react';
import { useInvitationStore } from '../../features/invitation/store/useInvitationStore';
import { LayoutGrid } from 'lucide-react'; // Placeholder for "Main Screen" button in preview

export default function InvitationPreview({ mode = 'viewer' }) {
  const { data } = useInvitationStore();

  const containerStyle = {
    backgroundColor: data.style.backgroundColor || '#FAF8F5', // Default clean beige
    color: data.style.textColor || '#333333',
  };

  const wrapperClass = mode === 'editor' 
    ? 'w-[375px] h-[812px] rounded-[48px] shadow-[0_20px_40px_rgba(0,0,0,0.1)] border-[12px] border-white overflow-hidden relative bg-white'
    : 'w-full min-h-screen max-w-md mx-auto relative shadow-xl bg-white';

  const defaultImage = "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  const mainImage = data.images.length > 0 ? data.images[0] : defaultImage;

  return (
    <div className={wrapperClass}>
      <div 
        className="w-full h-full overflow-y-auto w-full transition-colors duration-300 relative scrollbar-hide" 
        style={containerStyle}
      >
        {/* Floating "Main Screen" button seen in preview */}
        {mode === 'editor' && (
          <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm flex items-center gap-1.5 text-xs font-semibold text-gray-700">
            <LayoutGrid className="w-3.5 h-3.5" />
            메인 화면
          </div>
        )}

        {/* Hero Image Section (Arched or Full bleed) */}
        <div className="relative pt-12 pb-8 px-6 text-center">
          <div className="mb-8">
            <h1 className="text-[2.5rem] leading-[1.1] font-serif font-medium tracking-tight whitespace-pre-line text-[#4A3D39]">
              {data.title || "our\nwedding\nday"}
            </h1>
          </div>
          
          <div className="relative w-full aspect-[3/4] mx-auto rounded-t-full overflow-hidden shadow-sm">
            <img 
              src={mainImage} 
              alt="Main Invitation" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-8 pt-4 pb-12 flex flex-col items-center justify-center space-y-2 text-[#4A3D39]">
            <p className="text-lg font-medium opacity-90">이윤종 | 이다영</p>
            {data.date && (
              <p className="text-sm font-medium tracking-wide opacity-80">
                {new Date(data.date).toLocaleString('en-US', { 
                  year: 'numeric', month: '2-digit', day: '2-digit', 
                  hour: '2-digit', minute: '2-digit',
                  hour12: true
                }).replace(',', '.')}
              </p>
            )}
            {!data.date && (
              <p className="text-sm font-medium tracking-wide opacity-80">2026.02.15. Sun, AM 11:00</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
