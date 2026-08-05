import React, { useState } from 'react';
import { Festival } from '../types';
import { isDateInFestival } from '../utils/dateUtils';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkles } from 'lucide-react';

interface CalendarViewProps {
  festivals: Festival[];
  onSelectFestival: (festival: Festival) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  festivals,
  onSelectFestival
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDayStr, setSelectedDayStr] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  // First day of current month & Total days in month
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDayStr(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDayStr(null);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
    setSelectedDayStr(new Date().toISOString().split('T')[0]);
  };

  // Helper to format YYYY-MM-DD
  const getFormattedDateStr = (dayNum: number) => {
    const m = String(month + 1).padStart(2, '0');
    const d = String(dayNum).padStart(2, '0');
    return `${year}-${m}-${d}`;
  };

  // Get festivals for a given date
  const getFestivalsForDate = (dateStr: string) => {
    return festivals.filter(f => isDateInFestival(dateStr, f.startDate, f.endDate));
  };

  // Selected Day Festivals
  const selectedDayFestivals = selectedDayStr ? getFestivalsForDate(selectedDayStr) : [];

  return (
    <div className="space-y-6">
      
      {/* Calendar Header Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {year}년 {month + 1}월 부산 축제 달력
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              원하는 날짜를 클릭하면 해당 일자에 개최되는 축제 목록을 바로 확인하실 수 있습니다.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleToday}
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
          >
            오늘
          </button>
          <button
            onClick={handlePrevMonth}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all"
            title="이전 달"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all"
            title="다음 달"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-4 sm:p-6">
        
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 text-center border-b border-slate-200 pb-3 mb-2 font-bold text-xs sm:text-sm">
          <span className="text-rose-500">일</span>
          <span className="text-slate-700">월</span>
          <span className="text-slate-700">화</span>
          <span className="text-slate-700">수</span>
          <span className="text-slate-700">목</span>
          <span className="text-slate-700">금</span>
          <span className="text-blue-600">토</span>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          
          {/* Empty cells before month start */}
          {Array.from({ length: firstDayIndex }).map((_, idx) => (
            <div key={`empty-${idx}`} className="h-20 sm:h-28 bg-slate-50/50 rounded-xl opacity-40" />
          ))}

          {/* Month Days */}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const dayNum = idx + 1;
            const dateStr = getFormattedDateStr(dayNum);
            const dayFestivals = getFestivalsForDate(dateStr);
            const isSelected = selectedDayStr === dateStr;
            const isTodayDate = new Date().toISOString().split('T')[0] === dateStr;

            return (
              <div
                key={dateStr}
                onClick={() => setSelectedDayStr(dateStr)}
                className={`h-20 sm:h-28 p-1.5 sm:p-2 rounded-xl border transition-all cursor-pointer flex flex-col justify-between overflow-hidden relative ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-500/30 shadow-md'
                    : isTodayDate
                    ? 'border-emerald-400 bg-emerald-50/50'
                    : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {/* Top Day Number & Today indicator */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs sm:text-sm font-bold ${
                    isSelected ? 'text-blue-700' : isTodayDate ? 'text-emerald-700' : 'text-slate-800'
                  }`}>
                    {dayNum}
                  </span>
                  {isTodayDate && (
                    <span className="text-[10px] bg-emerald-600 text-white font-bold px-1.5 py-0.2 rounded-full">
                      오늘
                    </span>
                  )}
                </div>

                {/* Festival Badges on Date Box */}
                <div className="space-y-1 overflow-y-auto max-h-14 scrollbar-none">
                  {dayFestivals.map((fest) => (
                    <div
                      key={fest.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectFestival(fest);
                      }}
                      className="px-1.5 py-0.5 bg-blue-600/90 hover:bg-blue-700 text-white text-[10px] font-medium rounded-md truncate shadow-2xl flex items-center justify-between gap-1 group"
                      title={fest.title}
                    >
                      <span className="truncate">{fest.title}</span>
                      <span className="text-[8px] bg-white/20 px-1 rounded shrink-0">{fest.district}</span>
                    </div>
                  ))}
                </div>

                {/* Total count indicator */}
                {dayFestivals.length > 0 && (
                  <div className="text-[10px] text-blue-600 font-bold text-right">
                    {dayFestivals.length}개 행사
                  </div>
                )}
              </div>
            );
          })}

        </div>
      </div>

      {/* Selected Day Festival List Section */}
      {selectedDayStr && (
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>{selectedDayStr} 개최 축제 ({selectedDayFestivals.length}건)</span>
            </h3>
            <button
              onClick={() => setSelectedDayStr(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              닫기 ✕
            </button>
          </div>

          {selectedDayFestivals.length === 0 ? (
            <p className="text-sm text-slate-400 py-4 text-center">
              해당 일자({selectedDayStr})에 예정된 등록 축제가 없습니다. 다른 날짜를 선택해 보세요!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedDayFestivals.map(fest => (
                <div
                  key={fest.id}
                  onClick={() => onSelectFestival(fest)}
                  className="bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-cyan-400 cursor-pointer transition-all flex items-start space-x-3 group"
                >
                  <img
                    src={fest.thumbUrl}
                    alt={fest.title}
                    className="w-16 h-16 object-cover rounded-lg shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 text-[10px] font-bold rounded">
                      {fest.district}
                    </span>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {fest.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-1">{fest.mainPlace}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
