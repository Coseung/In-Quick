import React, { useState } from 'react';
import InvitationEditor from './InvitationEditor';
import InvitationPreview from '../../shared/components/InvitationPreview';
import { Settings, Palette, LayoutTemplate, MessageSquare, MapPin, Image as ImageIcon, Phone } from 'lucide-react';

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
              className={`w-16 h-20 flex flex-col items-center justify-center gap-2 rounded-xl transition-all ${
                isActive ? 'border-2 border-blue-500 text-gray-900 bg-blue-50/30' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-6 h-6 stroke-[1.5] ${isActive ? 'text-blue-500' : ''}`} />
              <span className={`text-[11px] font-medium ${isActive ? 'text-blue-600' : ''}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
      
      {/* 2. Middle-Left: Detailed Settings Panel */}
      <div className="w-full md:w-[420px] bg-white flex-shrink-0 border-r border-gray-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 overflow-y-auto">
        <InvitationEditor activeTab={activeTab} />
      </div>

      {/* 3. Right: Preview Area */}
      <div className="hidden md:flex flex-1 justify-center items-center overflow-y-auto py-8 relative">
        <InvitationPreview mode="editor" />
      </div>
    </div>
  );
}
