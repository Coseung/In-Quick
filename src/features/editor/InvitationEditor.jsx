import React, { useRef } from 'react';
import { useInvitationStore } from '../invitation/store/useInvitationStore';
import { LayoutTemplate, Plus, Trash2, Check, Upload } from 'lucide-react';

export default function InvitationEditor({ activeTab }) {
  const { 
    data, 
    updateTitle, 
    updateGreeting,
    updateDate,
    updateLocation,
    updateStyle,
    setImages,
    removeImage
  } = useInvitationStore();

  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newImages = [...data.images];
      // 첫 번째 메인 사진 교체 혹은 추가
      if (newImages.length > 0) {
        newImages[0] = reader.result;
      } else {
        newImages.push(reader.result);
      }
      setImages(newImages);
    };
    reader.readAsDataURL(file);
    e.target.value = ''; // Reset input
  };

  const currentMainImage = data.images.length > 0 ? data.images[0] : null;

  const renderContent = () => {
    switch(activeTab) {
      case 'main':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4">메인 타입</h3>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div 
                    key={i} 
                    className={`aspect-[2/3] rounded-lg border-2 cursor-pointer transition-all relative overflow-hidden bg-[#DBCBBF] flex items-center justify-center ${
                      i === 1 ? 'border-gray-800' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    {i === 1 && (
                      <div className="absolute top-2 left-2 w-5 h-5 bg-gray-800 rounded flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                    <span className="text-white opacity-50"><LayoutTemplate className="w-6 h-6" /></span>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-gray-100" />

            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4">사진 <span className="text-red-500">*</span></h3>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handlePhotoUpload}
              />
              
              <div className="flex flex-wrap gap-4">
                {currentMainImage ? (
                  <div className="w-28 h-40 rounded-lg relative overflow-hidden group border border-gray-200">
                    <img src={currentMainImage} alt="main" className="w-full h-full object-cover" />
                    
                    {/* 호버 시 나타나는 편집/삭제 오버레이 */}
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                      <button 
                        onClick={() => fileInputRef.current.click()}
                        className="bg-white text-gray-800 text-xs px-3 py-1.5 rounded-full font-medium shadow flex items-center gap-1 hover:bg-gray-100"
                      >
                        <Upload className="w-3 h-3" /> 변경
                      </button>
                      <button 
                        onClick={() => removeImage(0)}
                        className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow flex items-center gap-1 hover:bg-red-600"
                      >
                        <Trash2 className="w-3 h-3" /> 삭제
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => fileInputRef.current.click()}
                    className="w-28 h-40 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-6 h-6 mb-2" />
                    <span className="text-sm font-medium">사진 추가</span>
                  </button>
                )}
              </div>
            </div>

            <hr className="border-gray-100" />

            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4">예식 일시</h3>
              <input 
                type="datetime-local" 
                value={data.date}
                onChange={(e) => updateDate(e.target.value)}
                className="w-full px-4 py-3 bg-[#F9F8F6] border-none rounded-xl text-gray-800 focus:ring-2 focus:ring-gray-200 outline-none"
              />
            </div>
          </div>
        );
      
      case 'greeting':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4">제목</h3>
              <input 
                type="text" 
                value={data.title}
                onChange={(e) => updateTitle(e.target.value)}
                className="w-full px-4 py-3 bg-[#F9F8F6] border-none rounded-xl text-gray-800 focus:ring-2 focus:ring-gray-200 outline-none"
                placeholder="our wedding day"
              />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4">인사말</h3>
              <textarea 
                value={data.greeting}
                onChange={(e) => updateGreeting(e.target.value)}
                className="w-full h-40 px-4 py-3 bg-[#F9F8F6] border-none rounded-xl text-gray-800 focus:ring-2 focus:ring-gray-200 outline-none resize-none"
                placeholder="인사말을 입력하세요"
              />
            </div>
          </div>
        );

      case 'theme':
        return (
          <div className="space-y-6">
             <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4">배경색</h3>
              <input 
                type="color" 
                value={data.style.backgroundColor}
                onChange={(e) => updateStyle({ backgroundColor: e.target.value })}
                className="w-12 h-12 rounded cursor-pointer border-none p-0"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-48 text-gray-400">
            해당 메뉴의 설정 패널을 준비 중입니다.
          </div>
        );
    }
  };

  const currentTabLabel = {
    settings: '설정', theme: '테마', main: '메인 화면', greeting: '인사말', 
    location: '오시는 길', contact: '연락처', gallery: '갤러리'
  }[activeTab];

  return (
    <div className="flex flex-col h-full font-sans">
      <div className="px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10 flex items-center gap-2">
        <LayoutTemplate className="w-[22px] h-[22px] text-gray-800 stroke-[2]" />
        <h2 className="text-[17px] font-bold text-gray-900 tracking-tight">{currentTabLabel}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {renderContent()}
      </div>
    </div>
  );
}
