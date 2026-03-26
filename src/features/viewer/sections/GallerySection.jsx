import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useScrollReveal from '../../../shared/hooks/useScrollReveal';

export default function GallerySection({ data }) {
  const { isVisible, domRef } = useScrollReveal();

  const isGalleryVisible = data?.settings?.sectionVisibility?.gallery ?? true;
  if (!isGalleryVisible || !data.gallery?.images?.length) return null;

  return (
    <div
      ref={domRef}
      className={`transition-all duration-[1500ms] delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
    >
      <section className="py-20 px-4">
        <div className="text-center mb-10">
          <h3 className="text-lg font-serif text-[#4A3D39]">GALLERY</h3>
        </div>
        {data.gallery?.type === 'grid' ? (
          <div className="grid grid-cols-3 gap-1 rounded-2xl overflow-hidden shadow-sm">
            {data.gallery?.images?.map((img, i) => (
              <div key={i} className="aspect-square overflow-hidden bg-gray-100">
                <img src={img} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl flex items-center">
            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide w-full">
              {data.gallery?.images?.map((img, i) => (
                <div key={i} className="flex-shrink-0 w-full aspect-[4/5] snap-center">
                  <img src={img} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1 bg-black/20 backdrop-blur-md rounded-full">
              {data.gallery?.images?.map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/40'}`} />
              ))}
            </div>
            <button className="absolute left-2 p-2 bg-white/10 backdrop-blur-sm rounded-full text-white/70">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="absolute right-2 p-2 bg-white/10 backdrop-blur-sm rounded-full text-white/70">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
