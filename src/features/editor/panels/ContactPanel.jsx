import React from 'react';

export default function ContactPanel({ data, updateContact }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900">연락처 및 마음 전하실 곳</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">복사 버튼</span>
          <button 
            onClick={() => updateContact({ useCopyButton: !data.contact?.useCopyButton })}
            className={`w-10 h-5 rounded-full transition-colors relative ${data.contact?.useCopyButton ? 'bg-blue-500' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${data.contact?.useCopyButton ? 'right-1' : 'left-1'}`} />
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {(data.contact?.accounts || []).map((acc, idx) => (
          <div key={idx} className="p-4 bg-[#F9F8F6] rounded-xl space-y-3">
            <span className="text-xs font-bold text-gray-600 block">{acc.owner} 계좌</span>
            <div className="grid grid-cols-2 gap-3">
              <input 
                type="text" 
                value={acc.bank}
                onChange={(e) => {
                  const newAccs = [...(data.contact?.accounts || [])];
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
                  const newAccs = [...(data.contact?.accounts || [])];
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
}
