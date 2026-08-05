import React from 'react';
import { Festival } from '../types';
import { Calendar, MapPin, Bookmark, ExternalLink, Sparkles, Phone } from 'lucide-react';
import { isTodayInFestival } from '../utils/dateUtils';

interface FestivalCardProps {
  festival: Festival;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onClick: () => void;
}

export const FestivalCard: React.FC<FestivalCardProps> = ({
  festival,
  isBookmarked,
  onToggleBookmark,
  onClick
}) => {
  const isToday = isTodayInFestival(festival.startDate, festival.endDate);

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full transform hover:-translate-y-1"
    >
      {/* Thumbnail Image Section */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={festival.imageUrl}
          alt={festival.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // Fallback image on broken image link
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';
          }}
        />
        
        {/* Dark gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <div className="flex flex-wrap items-center gap-1.5">
            {/* District Badge */}
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-900/80 text-cyan-300 backdrop-blur-md border border-cyan-400/30 shadow-md">
              📍 {festival.district}
            </span>

            {/* Today Ongoing Badge */}
            {isToday && (
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-600 text-white shadow-md animate-pulse">
                🔥 오늘 진행 중
              </span>
            )}

            {/* Featured Badge */}
            {festival.isFeatured && !isToday && (
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3 fill-slate-950" />
                대표 축제
              </span>
            )}
          </div>

          {/* Bookmark Heart Button */}
          <button
            onClick={(e) => onToggleBookmark(festival.id, e)}
            className={`p-2 rounded-xl backdrop-blur-md transition-all duration-200 shadow-md ${
              isBookmarked
                ? 'bg-rose-500 text-white ring-2 ring-rose-300 scale-110'
                : 'bg-slate-900/60 text-white/80 hover:text-white hover:bg-slate-900/90'
            }`}
            title={isBookmarked ? '즐겨찾기 해제' : '즐겨찾기 저장'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Image Bottom Text: Main Place */}
        <div className="absolute bottom-2.5 left-3 right-3 text-white text-xs font-medium flex items-center gap-1 opacity-90">
          <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="truncate">{festival.mainPlace}</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
        <div className="space-y-1.5">
          <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {festival.title}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {festival.subTitle || festival.contents}
          </p>
        </div>

        {/* Date & Contact Info */}
        <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
          <div className="flex items-center text-blue-700 font-semibold gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate">{festival.usageDayRaw}</span>
          </div>

          <div className="flex items-center text-slate-500 gap-1.5">
            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{festival.tel}</span>
          </div>
        </div>

        {/* Tags */}
        {festival.tags && festival.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {festival.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* View Details Button Footer */}
        <div className="pt-2 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
          <span>상세보기 및 지도 위치</span>
          <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};
