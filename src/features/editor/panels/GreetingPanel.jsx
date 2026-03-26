import React from 'react';

export default function GreetingPanel({ data, updateGreeting, updateNames }) {
  return (
    <div className="space-y-6">
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
              value={data.names?.groom || ''}
              onChange={(e) => updateNames({ groom: e.target.value })}
              className="w-full px-4 py-3 bg-[#F9F8F6] border-none rounded-xl text-gray-800 focus:ring-2 focus:ring-gray-200 outline-none"
              placeholder="이윤종"
            />
          </div>
          <div>
            <label className="text-[11px] text-gray-400 mb-1 block">신부 이름</label>
            <input 
              type="text" 
              value={data.names?.bride || ''}
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
              value={data.names?.groomFather || ''}
              onChange={(e) => updateNames({ groomFather: e.target.value })}
              className="w-full px-4 py-2 bg-white border border-gray-100 rounded-lg text-sm outline-none"
              placeholder="신랑 부친상"
            />
            <input 
              type="text" 
              value={data.names?.groomMother || ''}
              onChange={(e) => updateNames({ groomMother: e.target.value })}
              className="w-full px-4 py-2 bg-white border border-gray-100 rounded-lg text-sm outline-none"
              placeholder="신랑 모친상"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="text" 
              value={data.names?.brideFather || ''}
              onChange={(e) => updateNames({ brideFather: e.target.value })}
              className="w-full px-4 py-2 bg-white border border-gray-100 rounded-lg text-sm outline-none"
              placeholder="신부 부친상"
            />
            <input 
              type="text" 
              value={data.names?.brideMother || ''}
              onChange={(e) => updateNames({ brideMother: e.target.value })}
              className="w-full px-4 py-2 bg-white border border-gray-100 rounded-lg text-sm outline-none"
              placeholder="신부 모친상"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
