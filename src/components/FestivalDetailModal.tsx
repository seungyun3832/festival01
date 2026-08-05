import React, { useState } from 'react';
import { Festival } from '../types';
import { 
  X, Calendar, MapPin, Phone, Globe, DollarSign, Clock, 
  Bookmark, Share2, Copy, Check, Navigation, ExternalLink, Sparkles 
} from 'lucide-react';
import { isTodayInFestival } from '../utils/dateUtils';

interface FestivalDetailModalProps {
  festival: Festival | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
}

export const FestivalDetailModal: React.FC<FestivalDetailModalProps> = ({
  festival,
  onClose,
  isBookmarked,
  onToggleBookmark
}) => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  if (!festival) return null;

  const isToday = isTodayInFestival(festival.startDate, festival.endDate);

  const handleCopyAddress = () => {
    if (festival.address) {
      navigator.clipboard.writeText(festival.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: festival.title,
        text: `${festival.title} - ${festival.usageDayRaw} (${festival.district})`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${festival.title}\n일정: ${festival.usageDayRaw}\n장소: ${festival.address}\n${window.location.href}`);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  // Maps Search Links
  const encodedAddress = encodeURIComponent(festival.address || festival.mainPlace || '부산');
  const kakaoMapUrl = `https://map.kakao.com/link/search/${encodedAddress}`;
  const naverMapUrl = `https://map.naver.com/v5/search/${encodedAddress}`;
  const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      
      {/* Modal Container */}
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-scaleUp my-auto text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Image & Action Overlay */}
        <div className="relative h-64 sm:h-80 bg-slate-900 overflow-hidden">
          <img
            src={festival.imageUrl}
            alt={festival.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

          {/* Close & Share & Bookmark Controls */}
          <div className="absolute top-4 right-4 flex items-center space-x-2 z-10">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white backdrop-blur-md transition-all shadow-lg"
              title="축제 정보 공유하기"
            >
              {shared ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
            </button>

            <button
              onClick={(e) => onToggleBookmark(festival.id, e)}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-lg ${
                isBookmarked ? 'bg-rose-600 text-white ring-2 ring-rose-300' : 'bg-slate-900/60 hover:bg-slate-900/90 text-white'
              }`}
              title={isBookmarked ? '즐겨찾기 해제' : '즐겨찾기 저장'}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-white' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-md transition-all shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Banner Title */}
          <div className="absolute bottom-4 left-6 right-6 text-white space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/30 text-cyan-200 border border-cyan-400/30 backdrop-blur-md">
                📍 {festival.district}
              </span>
              {isToday && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-600 text-white shadow-md animate-pulse">
                  🔥 오늘 진행 중
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow-md">
              {festival.title}
            </h2>
            {festival.subTitle && (
              <p className="text-sm text-slate-200 font-medium line-clamp-2">
                {festival.subTitle}
              </p>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
            
            {/* Usage Day */}
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-xl bg-blue-100 text-blue-700 shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">행사 기간</span>
                <p className="text-sm font-semibold text-slate-900 mt-0.5">{festival.usageDayRaw}</p>
              </div>
            </div>

            {/* Main Place */}
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">행사 장소</span>
                <p className="text-sm font-semibold text-slate-900 mt-0.5">{festival.mainPlace}</p>
              </div>
            </div>

            {/* Time Info */}
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">운영 시간</span>
                <p className="text-sm font-medium text-slate-800 mt-0.5">{festival.timeInfo || '행사 일정 안내 참조'}</p>
              </div>
            </div>

            {/* Fee Info */}
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-xl bg-purple-100 text-purple-700 shrink-0">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">이용 요금</span>
                <p className="text-sm font-medium text-slate-800 mt-0.5">{festival.feeInfo || '무료'}</p>
              </div>
            </div>

          </div>

          {/* Address & Navigation Links */}
          <div className="space-y-3 bg-blue-50/60 p-4 rounded-2xl border border-blue-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm font-bold text-blue-950">
                <Navigation className="w-4 h-4 text-blue-600" />
                <span>상세 위치 및 길찾기</span>
              </div>

              <button
                onClick={handleCopyAddress}
                className="flex items-center space-x-1 px-3 py-1 bg-white hover:bg-slate-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold shadow-sm transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '주소 복사됨!' : '주소 복사'}</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              {festival.address} {festival.placeDetail && `(${festival.placeDetail})`}
            </p>

            {/* Direct Map Open Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href={kakaoMapUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold transition-all shadow-sm flex items-center gap-1"
              >
                <span>카카오맵 길찾기</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={naverMapUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1"
              >
                <span>네이버지도 길찾기</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={googleMapUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1"
              >
                <span>구글지도 길찾기</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Detailed Contents */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
              축제 소개해설 및 주요 프로그램
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/50 p-4 rounded-xl border border-slate-100">
              {festival.contents || '부산광역しの 다채로운 해양, 문화, 예술 행사와 볼거리가 가득합니다.'}
            </p>
          </div>

          {/* Contact & Homepage Footer Bar */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-2 text-sm text-slate-700 font-semibold">
              <Phone className="w-4 h-4 text-slate-500" />
              <span>문의 전화:</span>
              <a href={`tel:${festival.tel}`} className="text-blue-600 hover:underline">
                {festival.tel}
              </a>
            </div>

            {festival.homepage && (
              <a
                href={festival.homepage.startsWith('http') ? festival.homepage : `https://${festival.homepage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-1.5"
              >
                <Globe className="w-4 h-4" />
                <span>공식 홈페이지 바로가기</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
