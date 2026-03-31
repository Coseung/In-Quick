import React from 'react';

export default function SettingsPanel({ data, updateDate, updateSettings }) {
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
            onClick={() => updateSettings({ dDayEnabled: !data.settings?.dDayEnabled })}
            className={`w-10 h-5 rounded-full transition-colors relative ${data.settings?.dDayEnabled ? 'bg-blue-500' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${data.settings?.dDayEnabled ? 'right-1' : 'left-1'}`} />
          </button>
        </div>
        <div className="flex items-center justify-between mt-2 p-4 bg-[#F9F8F6] rounded-xl">
          <span className="text-sm font-medium text-gray-700">달력 디데이 표시</span>
          <button 
            onClick={() => updateSettings({ calendarDDayEnabled: !data.settings?.calendarDDayEnabled })}
            className={`w-10 h-5 rounded-full transition-colors relative ${data.settings?.calendarDDayEnabled ? 'bg-blue-500' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${data.settings?.calendarDDayEnabled ? 'right-1' : 'left-1'}`} />
          </button>
        </div>
      </section>

      <section>
        <h3 className="text-sm font-bold text-gray-900 mb-4">섹션 노출 여부</h3>
        <div className="space-y-2">
          {Object.entries(data.settings?.sectionVisibility || {}).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl">
              <span className="text-sm text-gray-600">
                {key === 'greeting' ? '인사말 섹션' : 
                 key === 'location' ? '오시는 길 섹션' : 
                 key === 'contact' ? '연락처 섹션' : '갤러리 섹션'}
              </span>
              <button 
                onClick={() => updateSettings({ 
                  sectionVisibility: { ...(data.settings?.sectionVisibility || {}), [key]: !value } 
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
}
