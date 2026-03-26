import React from 'react';

export default function ThemePanel({ data, updateStyle }) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-4">시그니처 컬러</h3>
        <div className="grid grid-cols-6 gap-3">
          {['#FAF8F5', '#FFFFFF', '#F2F1ED', '#E8E5DF', '#DBCBBF', '#333333'].map(c => (
            <button 
              key={c}
              onClick={() => updateStyle({ backgroundColor: c })}
              className={`aspect-square rounded-full border-2 ${data.style?.backgroundColor === c ? 'border-blue-500' : 'border-transparent'}`}
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
                data.style?.fontFamily === f ? 'border-gray-800' : 'border-gray-100'
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
}
