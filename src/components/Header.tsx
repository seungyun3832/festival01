import React from 'react';
import { ViewMode } from '../types';
import { Calendar, MapPin, Grid, Bookmark, Sparkles, RefreshCw, Compass } from 'lucide-react';

interface HeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  totalCount: number;
  bookmarkCount: number;
  onOpenAiPlanner: () => void;
  onRefreshData: () => void;
  isRefreshing: boolean;
  activeDistrict: string;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  totalCount,
  bookmarkCount,
  onOpenAiPlanner,
  onRefreshData,
  isRefreshing,
  activeDistrict
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-400/30">
                <Compass className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent">
                    부산 축제 온(ON)
                  </h1>
                  <span className="px-2 py-0.5 text-[11px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full">
                    BUSAN FESTIVAL
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium">
                  부산광역시 구·군별 및 날짜별 공식 축제 정보 가이드
                </p>
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={onOpenAiPlanner}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI 추천</span>
              </button>
            </div>
          </div>

          {/* Controls & Nav Tabs */}
          <div className="flex flex-wrap items-center justify-between md:justify-end gap-2 sm:gap-3">
            
            {/* View Mode Switches */}
            <nav className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700/80 shadow-inner">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                }`}
                title="목록형 카드 보기"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>카드 ({totalCount})</span>
              </button>

              <button
                onClick={() => setViewMode('calendar')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'calendar'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                }`}
                title="월별 달력으로 축제 확인"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>달력 보기</span>
              </button>

              <button
                onClick={() => setViewMode('district')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'district'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                }`}
                title="16개 구·군 지도 보기"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>구·군 지도</span>
              </button>

              <button
                onClick={() => setViewMode('bookmarks')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                  viewMode === 'bookmarks'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                }`}
                title="내가 저장한 축제"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>즐겨찾기</span>
                {bookmarkCount > 0 && (
                  <span className="ml-0.5 px-1.5 py-0.2 bg-rose-500 text-white text-[10px] font-bold rounded-full animate-bounce">
                    {bookmarkCount}
                  </span>
                )}
              </button>
            </nav>

            {/* AI Assistant & Refresh Buttons (Desktop) */}
            <div className="hidden md:flex items-center space-x-2">
              <button
                onClick={onOpenAiPlanner}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:from-purple-500 hover:to-rose-400 text-white text-xs font-semibold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all transform active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>AI 축제 일정 가이드</span>
              </button>

              <button
                onClick={onRefreshData}
                disabled={isRefreshing}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all disabled:opacity-50"
                title="공공데이터 실시간 새로고침"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
