import React, { useState, useRef } from 'react';
import { Settings, Palette, LayoutTemplate, MessageSquare, MapPin, Image as ImageIcon, Phone } from 'lucide-react';
import { useInvitationStore } from '../invitation';
import {
  MainPanel,
  GreetingPanel,
  LocationPanel,
  ContactPanel,
  GalleryPanel,
  ThemePanel,
  SettingsPanel
} from './panels';
import Viewer from '../viewer/Viewer';

const MENU_ITEMS = [
  { id: 'settings', label: '설정', icon: Settings },
  { id: 'theme', label: '테마', icon: Palette },
  { id: 'main', label: '메인 화면', icon: LayoutTemplate },
  { id: 'greeting', label: '인사말', icon: MessageSquare },
  { id: 'location', label: '오시는 길', icon: MapPin },
  { id: 'contact', label: '연락처', icon: Phone },
  { id: 'gallery', label: '갤러리', icon: ImageIcon },
];

export default function EditorLayout() {
  const [activeTab, setActiveTab] = useState('main');
  const data = useInvitationStore(state => state.data);
  const {
    updateTitle,
    updateGreeting,
    updateNames,
    updateDate,
    updateLocation,
    updateContact,
    updateGallery,
    updateSettings,
    updateStyle
  } = useInvitationStore();

  const fileInputRef = useRef(null);

  const renderPanel = () => {
    const props = { data, updateTitle, updateGreeting, updateNames, updateDate, updateLocation, updateContact, updateGallery, updateSettings, updateStyle, fileInputRef };

    switch (activeTab) {
      case 'main': return <MainPanel {...props} />;
      case 'greeting': return <GreetingPanel {...props} />;
      case 'location': return <LocationPanel {...props} />;
      case 'contact': return <ContactPanel {...props} />;
      case 'gallery': return <GalleryPanel {...props} />;
      case 'theme': return <ThemePanel {...props} />;
      case 'settings': return <SettingsPanel {...props} />;
      default: return <MainPanel {...props} />;
    }
  };

  const currentTabLabel = MENU_ITEMS.find(item => item.id === activeTab)?.label || '편집';

  return (
    <div className="flex h-screen overflow-hidden bg-[#F2F1ED] font-sans">
      {/* 1. Leftmost: Icon Navigation Bar */}
      <div className="w-24 bg-white border-r border-gray-100 flex flex-col items-center py-6 gap-2 z-10 overflow-y-auto hidden sm:flex shrink-0">
        {MENU_ITEMS.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-16 h-20 flex flex-col items-center justify-center gap-2 rounded-xl transition-all ${isActive ? 'border-2 border-blue-500 text-gray-900 bg-blue-50/30' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'
                }`}
            >
              <Icon className={`w-6 h-6 stroke-[1.5] ${isActive ? 'text-blue-500' : ''}`} />
              <span className={`text-[11px] font-medium ${isActive ? 'text-blue-600' : ''}`}>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Middle-Left: Detailed Settings Panel */}
      <div className="w-full md:w-[420px] bg-white flex-shrink-0 border-r border-gray-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 flex flex-col">
        <div className="px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10 flex items-center gap-2">
          <LayoutTemplate className="w-[22px] h-[22px] text-gray-800 stroke-[2]" />
          <h2 className="text-[17px] font-bold text-gray-900 tracking-tight">{currentTabLabel}</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          {renderPanel()}
        </div>
      </div>

      {/* 3. Right: Preview Area */}
      <div className="hidden md:flex flex-1 justify-center items-center overflow-y-auto py-8 relative">
        <Viewer data={data} mode="editor" />
      </div>
    </div>
  );
}
