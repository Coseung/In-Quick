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

  const galleryInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newImages = [...data.images];
      if (newImages.length > 0) {
        newImages[0] = reader.result;
      } else {
        newImages.push(reader.result);
      }
      setImages(newImages);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newImages = [...data.gallery.images];
    let loaded = 0;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result);
        loaded++;
        if (loaded === files.length) {
          updateGallery({ images: newImages });
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
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
              <h3 className="text-sm font-bold text-gray-900 mb-4">대표 사진 <span className="text-red-500">*</span></h3>
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
          </div>
        );
      
      case 'greeting':
        return (
          <div className="space-y-6">
            <section>
              <h3 className="text-sm font-bold text-gray-900 mb-4">초대장 제목</h3>
              <input 
                type="text" 
                value={data.title}
                onChange={(e) => updateTitle(e.target.value)}
                className="w-full px-4 py-3 bg-[#F9F8F6] border-none rounded-xl text-gray-800 focus:ring-2 focus:ring-gray-200 outline-none"
                placeholder="our wedding day"
              />
            </section>
            
            <section>
              <h3 className="text-sm font-bold text-gray-900 mb-4">인사말 문구</h3>
              <textarea 
                value={data.greeting}
                onChange={(e) => updateGreeting(e.target.value)}
                className="w-full h-32 px-4 py-3 bg-[#F9F8F6] border-none rounded-xl text-gray-800 focus:ring-2 focus:ring-gray-200 outline-none resize-none"
                placeholder="서로가 마주 보며 다져온 사랑을 이제 함께 한곳을 바라보며 걸어가려 합니다..."
              />
            </section>
            
            <section className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900">신랑 · 신부 정보</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] text-gray-400 mb-1 block">신랑 이름</label>
                  <input 
                    type="text" 
                    value={data.names.groom}
                    onChange={(e) => updateNames({ groom: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F9F8F6] border-none rounded-xl text-gray-800 focus:ring-2 focus:ring-gray-200 outline-none"
                    placeholder="이윤종"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-gray-400 mb-1 block">신부 이름</label>
                  <input 
                    type="text" 
                    value={data.names.bride}
                    onChange={(e) => updateNames({ bride: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F9F8F6] border-none rounded-xl text-gray-800 focus:ring-2 focus:ring-gray-200 outline-none"
                    placeholder="이다영"
                  />
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900">양가 부모님 정보</h3>
              <div className="space-y-4 p-4 bg-[#F9F8F6] rounded-xl">
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    value={data.names.groomFather}
                    onChange={(e) => updateNames({ groomFather: e.target.value })}
                    className="w-full px-4 py-2 bg-white border border-gray-100 rounded-lg text-sm outline-none"
                    placeholder="신랑 부친상"
                  />
                  <input 
                    type="text" 
                    value={data.names.groomMother}
                    onChange={(e) => updateNames({ groomMother: e.target.value })}
                    className="w-full px-4 py-2 bg-white border border-gray-100 rounded-lg text-sm outline-none"
                    placeholder="신랑 모친상"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    value={data.names.brideFather}
                    onChange={(e) => updateNames({ brideFather: e.target.value })}
                    className="w-full px-4 py-2 bg-white border border-gray-100 rounded-lg text-sm outline-none"
                    placeholder="신부 부친상"
                  />
                  <input 
                    type="text" 
                    value={data.names.brideMother}
                    onChange={(e) => updateNames({ brideMother: e.target.value })}
                    className="w-full px-4 py-2 bg-white border border-gray-100 rounded-lg text-sm outline-none"
                    placeholder="신부 모친상"
                  />
                </div>
              </div>
            </section>
          </div>
        );

      case 'location':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4">식장 정보</h3>
              <div className="space-y-3">
                <input 
                  type="text" 
                  value={data.location.venueName}
                  onChange={(e) => updateLocation({ venueName: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F9F8F6] border-none rounded-xl text-gray-800 focus:ring-2 focus:ring-gray-200 outline-none"
                  placeholder="예식장 이름을 입력하세요 (예: 그랜드볼룸)"
                />
                <input 
                  type="text" 
                  value={data.location.address}
                  onChange={(e) => updateLocation({ address: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F9F8F6] border-none rounded-xl text-gray-800 focus:ring-2 focus:ring-gray-200 outline-none"
                  placeholder="정확한 주소를 입력하세요"
                />
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-gray-100 bg-gray-50 h-48 flex items-center justify-center text-gray-400 text-sm">
              지도 미리보기 (카카오맵 Embed 준비중)
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">연락처 및 마음 전하실 곳</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">복사 버튼</span>
                <button 
                  onClick={() => updateContact({ useCopyButton: !data.contact.useCopyButton })}
                  className={`w-10 h-5 rounded-full transition-colors relative ${data.contact.useCopyButton ? 'bg-blue-500' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${data.contact.useCopyButton ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {data.contact.accounts.map((acc, idx) => (
                <div key={idx} className="p-4 bg-[#F9F8F6] rounded-xl space-y-3">
                  <span className="text-xs font-bold text-gray-600 block">{acc.owner} 계좌</span>
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      value={acc.bank}
                      onChange={(e) => {
                        const newAccs = [...data.contact.accounts];
                        newAccs[idx].bank = e.target.value;
                        updateContact({ accounts: newAccs });
                      }}
                      className="w-full px-3 py-2 bg-white border border-gray-100 rounded-lg text-sm outline-none"
                      placeholder="은행명"
                    />
                    <input 
                      type="text" 
                      value={acc.number}
                      onChange={(e) => {
                        const newAccs = [...data.contact.accounts];
                        newAccs[idx].number = e.target.value;
                        updateContact({ accounts: newAccs });
                      }}
                      className="w-full px-3 py-2 bg-white border border-gray-100 rounded-lg text-sm outline-none"
                      placeholder="계좌번호"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4">사진 업로드</h3>
              <input 
                type="file" 
                accept="image/*" 
                multiple
                className="hidden" 
                ref={galleryInputRef}
                onChange={handleGalleryUpload}
              />
              <div className="grid grid-cols-4 gap-2">
                {data.gallery.images.map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-lg bg-gray-100 relative overflow-hidden group">
                    <img src={img} className="w-full h-full object-cover" />
                    <button 
                      onClick={() => {
                        const newImgs = data.gallery.images.filter((_, i) => i !== idx);
                        updateGallery({ images: newImgs });
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => galleryInputRef.current.click()}
                  className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4">레이아웃 타입</h3>
              <div className="flex gap-4">
                {['grid', 'slide'].map(t => (
                  <button 
                    key={t}
                    onClick={() => updateGallery({ type: t })}
                    className={`flex-1 py-3 rounded-xl text-sm font-medium border-2 transition-all ${
                      data.gallery.type === t ? 'border-gray-800 bg-gray-50' : 'border-gray-100 text-gray-400'
                    }`}
                  >
                    {t === 'grid' ? '그리드' : '슬라이드'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'theme':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4">시그니처 컬러</h3>
              <div className="grid grid-cols-6 gap-3">
                {['#FAF8F5', '#FFFFFF', '#F2F1ED', '#E8E5DF', '#DBCBBF', '#333333'].map(c => (
                  <button 
                    key={c}
                    onClick={() => updateStyle({ backgroundColor: c })}
                    className={`aspect-square rounded-full border-2 ${data.style.backgroundColor === c ? 'border-blue-500' : 'border-transparent'}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4">폰트 스타일</h3>
              <div className="space-y-3">
                {['Nanum Myeongjo', 'Gowun Batang', 'Pretendard', 'Inter'].map(f => (
                  <button 
                    key={f}
                    onClick={() => updateStyle({ fontFamily: f })}
                    className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                      data.style.fontFamily === f ? 'border-gray-800' : 'border-gray-100'
                    }`}
                    style={{ fontFamily: f }}
                  >
                    {f === 'Nanum Myeongjo' ? '나눔 명조 (Premium)' : f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <section>
              <h3 className="text-sm font-bold text-gray-900 mb-4">일시 설정</h3>
              <input 
                type="datetime-local" 
                value={data.date}
                onChange={(e) => updateDate(e.target.value)}
                className="w-full px-4 py-3 bg-[#F9F8F6] border-none rounded-xl text-gray-800 focus:ring-2 focus:ring-gray-200 outline-none"
              />
              <div className="flex items-center justify-between mt-4 p-4 bg-[#F9F8F6] rounded-xl">
                <span className="text-sm font-medium text-gray-700">디데이 카운트다운 표시</span>
                <button 
                  onClick={() => updateSettings({ dDayEnabled: !data.settings.dDayEnabled })}
                  className={`w-10 h-5 rounded-full transition-colors relative ${data.settings.dDayEnabled ? 'bg-blue-500' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${data.settings.dDayEnabled ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-bold text-gray-900 mb-4">섹션 노출 여부</h3>
              <div className="space-y-2">
                {Object.entries(data.settings.sectionVisibility).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl">
                    <span className="text-sm text-gray-600">
                      {key === 'greeting' ? '인사말 섹션' : 
                       key === 'location' ? '오시는 길 섹션' : 
                       key === 'contact' ? '연락처 섹션' : '갤러리 섹션'}
                    </span>
                    <button 
                      onClick={() => updateSettings({ 
                        sectionVisibility: { ...data.settings.sectionVisibility, [key]: !value } 
                      })}
                      className={`w-10 h-5 rounded-full transition-colors relative ${value ? 'bg-blue-500' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${value ? 'right-1' : 'left-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </section>
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
