import React from 'react';
import { Copy } from 'lucide-react';
import useScrollReveal from '../../../shared/hooks/useScrollReveal';

export default function ContactSection({ data }) {
  const { isVisible, domRef } = useScrollReveal();

  const isContactVisible = data?.settings?.sectionVisibility?.contact ?? true;
  if (!isContactVisible) return null;

  return (
    <div
      ref={domRef}
      className={`transition-all duration-[1500ms] delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
    >
      <section className="py-20 px-8 text-center">
        <div className="mb-10">
          <h3 className="text-lg font-serif text-[#4A3D39]">CONTACT</h3>
          <p className="mt-4 text-[13px] text-gray-500 font-light leading-relaxed">
            직접 찾아뵙지 못하는 분들을 위해<br />축하의 마음을 담을 계좌를 안내드립니다.
          </p>
        </div>
        <div className="space-y-3">
          {data.contact?.accounts?.map((acc, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-white/80 rounded-2xl border border-gray-100/50 shadow-sm">
              <div className="text-left">
                <span className="text-[10px] text-gray-400 block mb-1">{acc.owner}</span>
                <span className="text-sm font-medium text-gray-700">{acc.bank} {acc.number}</span>
              </div>
              {data.contact?.useCopyButton && (
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Copy className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
