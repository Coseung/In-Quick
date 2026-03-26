import React from 'react';

export default function LocationPanel({ data, updateLocation }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-4">식장 정보</h3>
        <div className="space-y-3">
          <input 
            type="text" 
            value={data.location?.venueName || ''}
            onChange={(e) => updateLocation({ venueName: e.target.value })}
            className="w-full px-4 py-3 bg-[#F9F8F6] border-none rounded-xl text-gray-800 focus:ring-2 focus:ring-gray-200 outline-none"
            placeholder="예식장 이름을 입력하세요 (예: 그랜드볼룸)"
          />
          <input 
            type="text" 
            value={data.location?.address || ''}
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
}
