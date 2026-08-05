import React from 'react';
import { Festival } from '../types';
import { BUSAN_DISTRICTS } from '../data/busanDistricts';
import { MapPin, ArrowRight, Sparkles } from 'lucide-react';

interface DistrictMapViewProps {
  festivals: Festival[];
  onSelectDistrict: (districtId: string) => void;
}

export const DistrictMapView: React.FC<DistrictMapViewProps> = ({
  festivals,
  onSelectDistrict
}) => {
  // Count festivals per district
  const getCountForDistrict = (districtName: string) => {
    return festivals.filter(f => f.district.includes(districtName) || districtName.includes(f.district)).length;
  };

  return (
    <div className="space-y-6">
      
      {/* Map Header intro */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-3">
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <MapPin className="w-4 h-4" />
          <span>BUSAN 16 DISTRICT FESTIVAL MAP</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          부산 16개 구·군별 축제 지도 한눈에 보기
        </h2>

        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          해운대구의 해변 축제부터 영도구의 감성 섬 축제, 사하구의 일몰 축제까지!
          원하시는 구·군 카드를 클릭하시면 해당 지역 축제 목록으로 즉시 이동합니다.
        </p>
      </div>

      {/* 16 Districts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {BUSAN_DISTRICTS.map((district) => {
          const count = getCountForDistrict(district.name);

          return (
            <div
              key={district.id}
              onClick={() => onSelectDistrict(district.id)}
              className="group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-500 p-5 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 transform hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Corner decorative light */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full pointer-events-none group-hover:bg-blue-500/10 transition-colors" />

              {/* District Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2.5">
                  <span className="text-3xl p-2 bg-slate-100 group-hover:bg-blue-50 rounded-2xl transition-colors">
                    {district.emoji}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {district.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium">{district.engName}</p>
                  </div>
                </div>

                {/* Festival Count Badge */}
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold shadow-sm ${
                  count > 0 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {count}개 축제
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {district.description}
              </p>

              {/* Popular Spots Pills */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">주요 명소</span>
                <div className="flex flex-wrap gap-1">
                  {district.popularSpots.map((spot, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 text-[10px] font-medium border border-slate-200/60"
                    >
                      {spot}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Action Link */}
              <div className="pt-2 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                <span>지역 축제 모아보기</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
