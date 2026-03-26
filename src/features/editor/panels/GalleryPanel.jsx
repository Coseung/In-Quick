import React, { useRef } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function GalleryPanel({ data, updateGallery }) {
  const galleryInputRef = useRef(null);

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const currentImgs = data.gallery?.images || [];
        updateGallery({ images: [...currentImgs, reader.result] });
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

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
          {(data.gallery?.images || []).map((img, idx) => (
            <div key={idx} className="aspect-square rounded-lg bg-gray-100 relative overflow-hidden group">
              <img src={img} className="w-full h-full object-cover" />
              <button 
                onClick={() => {
                  const newImgs = (data.gallery?.images || []).filter((_, i) => i !== idx);
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
                data.gallery?.type === t ? 'border-gray-800 bg-gray-50' : 'border-gray-100 text-gray-400'
              }`}
            >
              {t === 'grid' ? '그리드' : '슬라이드'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
