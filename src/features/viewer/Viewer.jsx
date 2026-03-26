import React from 'react';
import { 
  MainSection, 
  GreetingSection, 
  GallerySection, 
  LocationSection, 
  ContactSection,
  MobileFrame
} from './index';

export default function Viewer({ data, mode = 'viewer' }) {
  if (!data) return null;

  const containerStyle = {
    backgroundColor: data.style?.backgroundColor,
    color: data.style?.textColor,
    fontFamily: data.style?.fontFamily,
  };

  return (
    <MobileFrame mode={mode}>
      <div 
        className="w-full h-full overflow-y-auto transition-colors duration-500 relative scrollbar-hide flex flex-col" 
        style={containerStyle}
      >
        <MainSection data={data} />
        <GreetingSection data={data} />
        <GallerySection data={data} />
        <LocationSection data={data} />
        <ContactSection data={data} />
        
        <footer className="py-12 bg-gray-50/30 text-center opacity-30 text-[10px] tracking-widest text-gray-400 uppercase">
          © 2026 In-Quick Invitation
        </footer>
      </div>
    </MobileFrame>
  );
}
