import React from 'react';
import { LayoutTemplate, Check, Plus } from 'lucide-react';

export default function MainPanel({ data, updateTitle, updateDate, fileInputRef }) {
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
          <h3 className="text-sm font-bold text-gray-900 mb-4">대표 사진 <span className="text-red-500">*</span></h3>
          <div 
            onClick={() => fileInputRef.current.click()}
            className="w-full aspect-video rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors bg-[#F9F8F6]"
          >
            {data.images?.length > 0 ? (
              <img src={data.images[0]} className="w-full h-full object-cover rounded-2xl" />
            ) : (
              <>
                <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center">
                  <Plus className="w-5 h-5 text-gray-400" />
                </div>
                <span className="text-xs text-gray-400">사진 보관함에서 선택</span>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
