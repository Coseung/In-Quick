import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import useScrollReveal from '../../../shared/hooks/useScrollReveal';

const SlotNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value !== displayValue) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setDisplayValue(value);
        setIsAnimating(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [value, displayValue]);

  return (
    <div className="inline-block overflow-hidden h-[1.2em] relative align-bottom">
      <div
        className={`transition-transform duration-[600ms] ease-in-out flex flex-col items-center ${isAnimating ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <span>{displayValue}</span>
        <span>{value}</span>
      </div>
    </div>
  );
};

export default function MainSection({ data }) {
  const { isVisible, domRef } = useScrollReveal();
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!data.date) return;

    const timer = setInterval(() => {
      const target = new Date(data.date).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
          isPast: false
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [data.date]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '2026.02.15. Sun, AM 11:00';
    try {
      return new Date(dateStr).toLocaleString('ko-KR', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        weekday: 'short', hour: '2-digit', minute: '2-digit',
        hour12: true
      }).replace(/\./g, '.').replace('일', '');
    } catch (e) { return dateStr; }
  };

  const defaultImage = "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  const mainImage = data.images?.length > 0 ? data.images[0] : defaultImage;

  return (
    <div
      ref={domRef}
      className={`transition-all duration-[1500ms] delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
    >
      <section className="relative pt-20 pb-16 px-6 text-center flex-shrink-0">
        <div className="mb-10 space-y-4">
          <h2 className="text-xs tracking-[0.3em] font-light text-gray-500 uppercase">Our Wedding</h2>
          <h1 className="text-[2.2rem] leading-tight font-serif whitespace-pre-line text-[#4A3D39]">
            {data.title || "초대합니다"}
          </h1>
        </div>

        <div className="relative w-full aspect-[3/4] mx-auto rounded-t-full overflow-hidden shadow-2xl">
          <img src={mainImage} alt="Main" className="w-full h-full object-cover" />
        </div>

        <div className="mt-12 space-y-3">
          <div className="flex items-center justify-center gap-3 text-xl font-medium text-[#4A3D39]">
            <span>{data.names?.groom || '신랑'}</span>
            <Heart className="w-3.5 h-3.5 fill-red-400 text-red-400 opacity-60" />
            <span>{data.names?.bride || '신부'}</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm tracking-widest text-gray-500 font-light">
              {formatDate(data.date)}
            </p>
            {data.settings?.dDayEnabled && timeLeft && (
              <div className="text-[11px] text-gray-400 font-serif tracking-[0.2em] flex gap-1">
                <span>D - </span>
                <SlotNumber value={timeLeft.days} />
                <span className="ml-1 opacity-60">
                  {timeLeft.hours.toString().padStart(2, '0')}:
                  {timeLeft.minutes.toString().padStart(2, '0')}:
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </span>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-400 font-light">
            {data.location?.venueName || '예식장 정보'}
          </p>
        </div>
      </section>
    </div>
  );
}
