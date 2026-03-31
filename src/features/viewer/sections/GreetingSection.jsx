import React from 'react';
import useScrollReveal from '../../../shared/hooks/useScrollReveal';

import Calendar from '../../invitation/components/Calendar';

export default function GreetingSection({ data }) {
  const { isVisible, domRef } = useScrollReveal();

  const isGreetingVisible = data?.settings?.sectionVisibility?.greeting ?? true;
  if (!isGreetingVisible) return null;

  return (
    <div
      ref={domRef}
      className={`transition-all duration-[1500ms] delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
    >
      <section className="py-20 px-8 text-center border-t border-gray-100/30">
        <div className="mb-12">
          <span className="text-[10px] tracking-[0.2em] text-gray-400 uppercase">Invitation</span>
          <h3 className="mt-2 text-xl text-[#4A3D39]">소중한 분들을 초대합니다</h3>
        </div>

        
        <p className="text-sm leading-8 text-gray-600 whitespace-pre-line mb-16">
          {data.greeting || "함께해주셔서 감사합니다."}
        </p>

        <div className="space-y-6 pt-10 border-t border-gray-100/50">
          {(data.names?.groomFather || data.names?.groomMother) && (
            <div className="flex justify-center items-center gap-2 text-sm text-gray-700">
              <span className="font-medium text-gray-400">
                {data.names?.groomFather || '부'} · {data.names?.groomMother || '모'}
              </span>
              <span className="text-[10px] text-gray-300">의 차남</span>
              <span className="font-bold">{data.names?.groom || '신랑'}</span>
            </div>
          )}
          {(data.names?.brideFather || data.names?.brideMother) && (
            <div className="flex justify-center items-center gap-2 text-sm text-gray-700">
              <span className="font-medium text-gray-400">
                {data.names?.brideFather || '부'} · {data.names?.brideMother || '모'}
              </span>
              <span className="text-[10px] text-gray-300">의 장녀</span>
              <span className="font-bold">{data.names?.bride || '신부'}</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
