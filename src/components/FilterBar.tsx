import React from 'react';
import { FilterState } from '../types';
import { BUSAN_DISTRICTS } from '../data/busanDistricts';
import { Search, Calendar, MapPin, X, Filter, RotateCcw, ArrowUpDown } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalResults: number;
  onReset: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  setFilters,
  totalResults,
  onReset
}) => {
  const isFiltered =
    filters.district !== 'ALL' ||
    filters.selectedDate !== '' ||
    filters.dateQuickFilter !== 'ALL' ||
    filters.searchQuery !== '';

  return (
    <div className="bg-white border-b border-slate-200 shadow-sm sticky top-[65px] z-20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-3">
        
        {/* Row 1: Search & Date Pickers & Sort */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
              placeholder="축제 이름, 장소, 키워드 검색 (예: 불꽃축제, 광안리, 모래축제)"
              className="w-full pl-10 pr-9 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
            {filters.searchQuery && (
              <button
                onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* District Dropdown & Custom Date Picker & Sort */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* District Select Dropdown */}
            <div className="relative flex-1 sm:flex-none">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <select
                value={filters.district}
                onChange={(e) => setFilters(prev => ({ ...prev, district: e.target.value }))}
                className="w-full sm:w-auto pl-8 pr-8 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none"
              >
                <option value="ALL">전체 구·군 (16개)</option>
                {BUSAN_DISTRICTS.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.emoji} {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Date Input */}
            <div className="relative flex-1 sm:flex-none">
              <input
                type="date"
                value={filters.selectedDate}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  selectedDate: e.target.value,
                  dateQuickFilter: e.target.value ? 'ALL' : prev.dateQuickFilter 
                }))}
                className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
            </div>

            {/* Sort Order Dropdown */}
            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="pl-3 pr-7 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none"
              >
                <option value="dateAsc">일정 빠르게 (임박순)</option>
                <option value="dateDesc">최신 일정순</option>
                <option value="title">축제명 (가나다순)</option>
              </select>
              <ArrowUpDown className="w-3 h-3 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            {/* Reset Button */}
            {isFiltered && (
              <button
                onClick={onReset}
                className="flex items-center space-x-1 px-3 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 rounded-xl text-xs font-semibold transition-all"
                title="필터 초기화"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">초기화</span>
              </button>
            )}

          </div>

        </div>

        {/* Row 2: District Quick Pills & Date Quick Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-slate-100 pt-2.5">
          
          {/* Quick Date Filters */}
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-xs font-semibold text-slate-500 flex items-center mr-1 shrink-0">
              <Calendar className="w-3 h-3 mr-1 text-blue-600" />
              일정:
            </span>

            <button
              onClick={() => setFilters(prev => ({ ...prev, dateQuickFilter: 'ALL', selectedDate: '' }))}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium shrink-0 transition-all ${
                filters.dateQuickFilter === 'ALL' && !filters.selectedDate
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              전체 일정
            </button>

            <button
              onClick={() => setFilters(prev => ({ ...prev, dateQuickFilter: 'ONGOING', selectedDate: '' }))}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium shrink-0 transition-all ${
                filters.dateQuickFilter === 'ONGOING'
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60'
              }`}
            >
              🔥 오늘 진행 중
            </button>

            <button
              onClick={() => setFilters(prev => ({ ...prev, dateQuickFilter: 'THIS_MONTH', selectedDate: '' }))}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium shrink-0 transition-all ${
                filters.dateQuickFilter === 'THIS_MONTH'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              이번 달 축제
            </button>

            <button
              onClick={() => setFilters(prev => ({ ...prev, dateQuickFilter: 'WEEKEND', selectedDate: '' }))}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium shrink-0 transition-all ${
                filters.dateQuickFilter === 'WEEKEND'
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              주말 축제
            </button>
          </div>

          {/* Results Counter & Selected District Badge */}
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto text-xs text-slate-500 font-medium shrink-0">
            {filters.district !== 'ALL' && (
              <span className="mr-2 px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md font-semibold flex items-center">
                📍 {filters.district}
                <button
                  onClick={() => setFilters(prev => ({ ...prev, district: 'ALL' }))}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <span>
              총 <strong className="text-blue-600 font-bold">{totalResults}</strong>개의 축제 검색됨
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
