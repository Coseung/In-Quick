import React from 'react';
import { useInvitationStore } from '../../features/invitation/store/useInvitationStore';
import { LayoutGrid, MapPin, Phone, Heart, Copy, ChevronLeft, ChevronRight } from 'lucide-react';

export default function InvitationPreview({ mode = 'viewer' }) {
  const { data } = useInvitationStore();

  const containerStyle = {
    backgroundColor: data.style.backgroundColor,
    color: data.style.textColor,
    fontFamily: data.style.fontFamily,
  };

  const mobileFrameClass = mode === 'editor' 
    ? 'w-[375px] h-[812px] rounded-[55px] shadow-[0_0_0_12px_#1a1a1a,0_20px_50px_rgba(0,0,0,0.3)] border-[2px] border-[#333] overflow-hidden relative bg-white'
    : 'w-full min-h-screen max-w-md mx-auto relative shadow-xl bg-white';

  const defaultImage = "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  const mainImage = data.images.length > 0 ? data.images[0] : defaultImage;

  const formatDate = (dateStr) => {
    if (!dateStr) return '2026.02.15. Sun, AM 11:00';
    try {
      return new Date(dateStr).toLocaleString('ko-KR', { 
        year: 'numeric', month: '2-digit', day: '2-digit', 
        weekday: 'short', hour: '2-digit', minute: '2-digit',
        hour12: true
      }).replace(/\./g, '.').replace('일', '');
    } catch(e) { return dateStr; }
  };

  const calculateDDay = (dateStr) => {
    if (!dateStr) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weddingDate = new Date(dateStr);
    weddingDate.setHours(0, 0, 0, 0);
    const diffTime = weddingDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'D-Day';
    if (diffDays < 0) return `D+${Math.abs(diffDays)}`;
    return `D-${diffDays}`;
  };

  const dDay = calculateDDay(data.date);

  return (
    <div className={mobileFrameClass}>
      {/* Notch for Mobile Frame in Editor */}
      {mode === 'editor' && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-[#1a1a1a] rounded-b-3xl z-50 flex items-center justify-center">
          <div className="w-12 h-1 bg-[#333] rounded-full mr-4" />
          <div className="w-2 h-2 bg-[#333] rounded-full" />
        </div>
      )}

      <div 
        className="w-full h-full overflow-y-auto transition-colors duration-500 relative scrollbar-hide flex flex-col" 
        style={containerStyle}
      >
        {/* Floating "Preview mode" indicator */}
        {mode === 'editor' && (
          <div className="absolute top-10 right-6 z-20 bg-white/70 backdrop-blur-md rounded-full px-4 py-1.5 shadow-sm flex items-center gap-1.5 text-[10px] font-bold text-gray-800 border border-white/50">
            <LayoutGrid className="w-3 h-3" />
            PREVIEW
          </div>
        )}

        {/* 1. Main Section */}
        <section className="relative pt-20 pb-16 px-6 text-center flex-shrink-0">
          <div className="mb-10 space-y-4">
            <h2 className="text-xs tracking-[0.3em] font-light text-gray-500 uppercase">Our Wedding</h2>
            <h1 className="text-[2.2rem] leading-tight font-serif whitespace-pre-line text-[#4A3D39]">
              {data.title || "초대합니다"}
            </h1>
          </div>
          
          <div className="relative w-full aspect-[3/4] mx-auto rounded-t-full overflow-hidden shadow-2xl">
            <img src={mainImage} alt="Main" className="w-full h-full object-cover" />
            {data.settings.dDayEnabled && dDay && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-5 py-2 rounded-full shadow-lg border border-white/50 animate-bounce">
                <span className="text-sm font-bold text-[#4A3D39] tracking-widest">{dDay}</span>
              </div>
            )}
          </div>

          <div className="mt-12 space-y-3">
            <div className="flex items-center justify-center gap-3 text-xl font-medium text-[#4A3D39]">
              <span>{data.names.groom || '신랑'}</span>
              <Heart className="w-3.5 h-3.5 fill-red-400 text-red-400 opacity-60" />
              <span>{data.names.bride || '신부'}</span>
            </div>
            <p className="text-sm tracking-widest text-gray-500 font-light">
              {formatDate(data.date)}
            </p>
            <p className="text-sm text-gray-400 font-light">
              {data.location.venueName || '예식장 정보'}
            </p>
          </div>
        </section>

        {/* 2. Greeting Section */}
        {data.settings.sectionVisibility.greeting && (
          <section className="py-20 px-8 text-center border-t border-gray-100/30">
            <div className="mb-12">
              <span className="text-[10px] tracking-[0.2em] text-gray-400 uppercase">Invitation</span>
              <h3 className="mt-2 text-xl font-serif text-[#4A3D39]">소중한 분들을 초대합니다</h3>
            </div>
            <p className="text-sm leading-8 text-gray-600 whitespace-pre-line mb-16 font-light">
              {data.greeting || "함께해주셔서 감사합니다."}
            </p>
            
            <div className="space-y-6 pt-10 border-t border-gray-100/50">
              {(data.names.groomFather || data.names.groomMother) && (
                <div className="flex justify-center items-center gap-2 text-sm text-gray-700">
                  <span className="font-medium text-gray-400">{data.names.groomFather || '부'} · {data.names.groomMother || '모'}</span>
                  <span className="text-[10px] text-gray-300">의 차남</span>
                  <span className="font-bold">{data.names.groom || '신랑'}</span>
                </div>
              )}
              {(data.names.brideFather || data.names.brideMother) && (
                <div className="flex justify-center items-center gap-2 text-sm text-gray-700">
                   <span className="font-medium text-gray-400">{data.names.brideFather || '부'} · {data.names.brideMother || '모'}</span>
                   <span className="text-[10px] text-gray-300">의 장녀</span>
                   <span className="font-bold">{data.names.bride || '신부'}</span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 3. Gallery Section */}
        {data.settings.sectionVisibility.gallery && data.gallery.images.length > 0 && (
          <section className="py-20 px-4">
             <div className="text-center mb-10">
                <h3 className="text-lg font-serif text-[#4A3D39]">GALLERY</h3>
             </div>
             {data.gallery.type === 'grid' ? (
                <div className="grid grid-cols-3 gap-1 rounded-2xl overflow-hidden shadow-sm">
                  {data.gallery.images.map((img, i) => (
                    <div key={i} className="aspect-square overflow-hidden bg-gray-100">
                      <img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
             ) : (
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl flex items-center">
                  <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide w-full">
                    {data.gallery.images.map((img, i) => (
                      <div key={i} className="flex-shrink-0 w-full aspect-[4/5] snap-center">
                        <img src={img} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1 bg-black/20 backdrop-blur-md rounded-full">
                    {data.gallery.images.map((_, i) => (
                      <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/40'}`} />
                    ))}
                  </div>
                  <button className="absolute left-2 p-2 bg-white/10 backdrop-blur-sm rounded-full text-white/70"><ChevronLeft className="w-5 h-5" /></button>
                  <button className="absolute right-2 p-2 bg-white/10 backdrop-blur-sm rounded-full text-white/70"><ChevronRight className="w-5 h-5" /></button>
                </div>
             )}
          </section>
        )}


        {/* 4. Location Section */}
        {data.settings.sectionVisibility.location && (
          <section className="py-20 px-8 text-center bg-white/50">
             <div className="mb-10">
                <h3 className="text-lg font-serif text-[#4A3D39]">LOCATION</h3>
                <p className="mt-4 font-bold text-gray-800">{data.location.venueName}</p>
                <p className="mt-1 text-sm text-gray-500 font-light">{data.location.address}</p>
             </div>
             <div className="aspect-[16/10] bg-gray-100 rounded-2xl flex items-center justify-center text-gray-300 mb-8 border border-gray-100">
                <MapPin className="w-8 h-8 opacity-20" />
             </div>
             <div className="flex gap-2 justify-center">
                <button className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-[12px] font-medium text-gray-700 shadow-sm">카카오맵</button>
                <button className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-[12px] font-medium text-gray-700 shadow-sm">네이버 지도</button>
             </div>
          </section>
        )}

        {/* 5. Contact Section */}
        {data.settings.sectionVisibility.contact && (
          <section className="py-20 px-8 text-center">
             <div className="mb-10">
                <h3 className="text-lg font-serif text-[#4A3D39]">CONTACT</h3>
                <p className="mt-4 text-[13px] text-gray-500 font-light leading-relaxed">
                  직접 찾아뵙지 못하는 분들을 위해<br/>축하의 마음을 담을 계좌를 안내드립니다.
                </p>
             </div>
             <div className="space-y-3">
                {data.contact.accounts.map((acc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-white/80 rounded-2xl border border-gray-100/50 shadow-sm">
                    <div className="text-left">
                      <span className="text-[10px] text-gray-400 block mb-1">{acc.owner}</span>
                      <span className="text-sm font-medium text-gray-700">{acc.bank} {acc.number}</span>
                    </div>
                    {data.contact.useCopyButton && (
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Copy className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
             </div>
          </section>
        )}

        {/* Footer */}
        <footer className="py-12 bg-gray-50/30 text-center opacity-30 text-[10px] tracking-widest text-gray-400 uppercase">
          © 2026 In-Quick Invitation
        </footer>
      </div>
    </div>
  );
}
