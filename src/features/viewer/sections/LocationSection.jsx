import React from 'react';
import { MapPin } from 'lucide-react';
import useScrollReveal from '../../../shared/hooks/useScrollReveal';

export default function LocationSection({ data }) {
  const { isVisible, domRef } = useScrollReveal();

  const isLocationVisible = data?.settings?.sectionVisibility?.location ?? true;
  if (!isLocationVisible) return null;

  return (
    <div
      ref={domRef}
      className={`transition-all duration-[1500ms] delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
    >
      <section className="py-20 px-8 text-center bg-white/50">
        <div className="mb-10">
          <h3 className="text-lg font-serif text-[#4A3D39]">LOCATION</h3>
          <p className="mt-4 font-bold text-gray-800">{data.location?.venueName}</p>
          <p className="mt-1 text-sm text-gray-500 font-light">{data.location?.address}</p>
        </div>
        <div className="aspect-[16/10] bg-gray-100 rounded-2xl flex items-center justify-center text-gray-300 mb-8 border border-gray-100">
          <MapPin className="w-8 h-8 opacity-20" />
        </div>
        <div className="flex gap-2 justify-center">
          <button className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-[12px] font-medium text-gray-700 shadow-sm">카카오맵</button>
          <button className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-[12px] font-medium text-gray-700 shadow-sm">네이버 지도</button>
        </div>
      </section>
    </div>
  );
}
