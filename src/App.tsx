import React, { useState, useEffect, useMemo } from 'react';
import { Festival, ViewMode, FilterState } from './types';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { FestivalCard } from './components/FestivalCard';
import { FestivalDetailModal } from './components/FestivalDetailModal';
import { CalendarView } from './components/CalendarView';
import { DistrictMapView } from './components/DistrictMapView';
import { AiPlannerModal } from './components/AiPlannerModal';
import { FALLBACK_FESTIVALS } from './data/mockFestivals';
import { 
  isTodayInFestival, 
  isDateInFestival, 
  isThisMonthFestival, 
  isWeekendFestival 
} from './utils/dateUtils';
import { Loader2, Sparkles, AlertCircle, Compass, Bookmark, Search, RefreshCw } from 'lucide-react';

export default function App() {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // View & Filter States
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filters, setFilters] = useState<FilterState>({
    district: 'ALL',
    selectedDate: '',
    dateQuickFilter: 'ALL',
    searchQuery: '',
    sortBy: 'dateAsc'
  });

  // Bookmarks state from LocalStorage
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('busan_festival_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Selected Detail Modal & AI Planner Modal
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
  const [isAiPlannerOpen, setIsAiPlannerOpen] = useState(false);

  // Sync bookmarks with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('busan_festival_bookmarks', JSON.stringify(bookmarks));
    } catch {}
  }, [bookmarks]);

  // Fetch Festivals Data from Express API Endpoint
  const fetchFestivals = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    setIsRefreshing(true);
    setError(null);

    try {
      const res = await fetch('/api/festivals');
      if (!res.ok) throw new Error('서버 응답 오작동');
      const data = await res.json();

      if (data.items && Array.isArray(data.items)) {
        setFestivals(data.items);
      } else {
        setFestivals(FALLBACK_FESTIVALS);
      }
    } catch (err: any) {
      console.warn('Backend API error, loading local dataset:', err);
      setFestivals(FALLBACK_FESTIVALS);
      setError('공공데이터 연동 중 일부 지연이 발생하여 기본 데이터를 로드했습니다.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFestivals(true);
  }, []);

  // Toggle Bookmark
  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
    );
  };

  // Reset all filters
  const handleResetFilters = () => {
    setFilters({
      district: 'ALL',
      selectedDate: '',
      dateQuickFilter: 'ALL',
      searchQuery: '',
      sortBy: 'dateAsc'
    });
  };

  // Filter & Sort Logic
  const filteredFestivals = useMemo(() => {
    return festivals.filter(festival => {
      // 1. Bookmarks view filter
      if (viewMode === 'bookmarks' && !bookmarks.includes(festival.id)) {
        return false;
      }

      // 2. District filter
      if (filters.district !== 'ALL') {
        const d = filters.district;
        if (!festival.district.includes(d) && !d.includes(festival.district)) {
          return false;
        }
      }

      // 3. Custom Date Filter (YYYY-MM-DD)
      if (filters.selectedDate) {
        if (!isDateInFestival(filters.selectedDate, festival.startDate, festival.endDate)) {
          return false;
        }
      }

      // 4. Quick Date Filter
      if (filters.dateQuickFilter === 'ONGOING') {
        if (!isTodayInFestival(festival.startDate, festival.endDate)) return false;
      } else if (filters.dateQuickFilter === 'THIS_MONTH') {
        if (!isThisMonthFestival(festival.startDate, festival.endDate)) return false;
      } else if (filters.dateQuickFilter === 'WEEKEND') {
        if (!isWeekendFestival(festival.startDate, festival.endDate)) return false;
      }

      // 5. Search Query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.trim().toLowerCase();
        const matchTitle = festival.title.toLowerCase().includes(q);
        const matchSubtitle = festival.subTitle.toLowerCase().includes(q);
        const matchDistrict = festival.district.toLowerCase().includes(q);
        const matchPlace = festival.mainPlace.toLowerCase().includes(q);
        const matchContents = festival.contents.toLowerCase().includes(q);
        const matchTags = festival.tags.some(t => t.toLowerCase().includes(q));

        if (!matchTitle && !matchSubtitle && !matchDistrict && !matchPlace && !matchContents && !matchTags) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'title') {
        return a.title.localeCompare(b.title, 'ko');
      } else if (filters.sortBy === 'dateDesc') {
        return (b.startDate || '').localeCompare(a.startDate || '');
      } else {
        // dateAsc (nearest/upcoming)
        return (a.startDate || '9999').localeCompare(b.startDate || '9999');
      }
    });
  }, [festivals, filters, viewMode, bookmarks]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* App Header */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        totalCount={festivals.length}
        bookmarkCount={bookmarks.length}
        onOpenAiPlanner={() => setIsAiPlannerOpen(true)}
        onRefreshData={() => fetchFestivals(false)}
        isRefreshing={isRefreshing}
        activeDistrict={filters.district}
      />

      {/* Filter & Search Bar */}
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        totalResults={filteredFestivals.length}
        onReset={handleResetFilters}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-2xl">
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
            </div>
            <p className="text-sm font-bold text-slate-600 animate-pulse">
              부산광역시 실시간 축제 데이터를 가져오는 중입니다...
            </p>
          </div>
        ) : (
          <>
            {/* View Mode Router */}
            {viewMode === 'calendar' ? (
              <CalendarView
                festivals={festivals}
                onSelectFestival={(fest) => setSelectedFestival(fest)}
              />
            ) : viewMode === 'district' ? (
              <DistrictMapView
                festivals={festivals}
                onSelectDistrict={(districtId) => {
                  setFilters(prev => ({ ...prev, district: districtId }));
                  setViewMode('grid');
                }}
              />
            ) : (
              /* Grid View & Bookmarks View */
              <div>
                {/* Bookmarks view title header if in bookmark mode */}
                {viewMode === 'bookmarks' && (
                  <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-lg mb-6 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-rose-500/20 text-rose-400 rounded-xl">
                        <Bookmark className="w-6 h-6 fill-rose-400" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold">내가 저장한 부산 축제 ({filteredFestivals.length}개)</h2>
                        <p className="text-xs text-slate-400">관심 있는 축제를 보관함에 담아 일정을 놓치지 마세요!</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setViewMode('grid')}
                      className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-all"
                    >
                      전체 축제 보기
                    </button>
                  </div>
                )}

                {/* Empty State */}
                {filteredFestivals.length === 0 ? (
                  <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm space-y-4 my-8">
                    <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
                      <Search className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-slate-900">
                        {viewMode === 'bookmarks' ? '저장된 즐겨찾기 축제가 없습니다' : '조건에 맞는 축제를 찾을 수 없습니다'}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                        {viewMode === 'bookmarks' 
                          ? '축제 카드의 북마크 버튼을 눌러 관심 축제를 저장해 보세요!' 
                          : '검색어나 구·군, 날짜 필터를 변경하거나 초기화해 보세요.'}
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={handleResetFilters}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all"
                      >
                        필터 초기화
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Cards Grid */
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredFestivals.map((festival) => (
                      <FestivalCard
                        key={festival.id}
                        festival={festival}
                        isBookmarked={bookmarks.includes(festival.id)}
                        onToggleBookmark={handleToggleBookmark}
                        onClick={() => setSelectedFestival(festival)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}

      </main>

      {/* Floating AI Assistant Trigger */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAiPlannerOpen(true)}
          className="group relative flex items-center space-x-2 px-5 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 text-white font-bold text-xs sm:text-sm shadow-2xl shadow-purple-600/40 hover:shadow-purple-600/60 transition-all transform hover:scale-105 active:scale-95 ring-4 ring-purple-400/20"
        >
          <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
          <span>부산 축제 AI 가이드</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-slate-200">부산 축제 온 (Busan Festival Guide)</span>
            </div>
            <p className="text-slate-500">
              부산광역시 공공데이터 포털(apis.data.go.kr) 공식 Festival API 수집 서비스
            </p>
          </div>

          <p className="text-slate-500">
            © {new Date().getFullYear()} Busan Festival Guide. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Festival Detail Modal */}
      <FestivalDetailModal
        festival={selectedFestival}
        onClose={() => setSelectedFestival(null)}
        isBookmarked={selectedFestival ? bookmarks.includes(selectedFestival.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />

      {/* Gemini AI Recommendation Planner Modal */}
      <AiPlannerModal
        isOpen={isAiPlannerOpen}
        onClose={() => setIsAiPlannerOpen(false)}
        festivals={festivals}
      />

    </div>
  );
}
