export interface RawFestivalItem {
  UC_SEQ: number | string;
  TITLE: string;
  GUGUN_NM: string;
  HOMEPAGE_URL?: string;
  MAIN_PLACE?: string;
  PLACE?: string;
  TITLE_SUB?: string;
  MAIN_IMG_NORMAL?: string;
  MAIN_IMG_THUMB?: string;
  ADDR1?: string;
  ADDR2?: string;
  CNTCT_TEL?: string;
  ITEMCNTNTS?: string;
  USAGE_DAY_WEEK_AND_TIME?: string;
  USAGE_AMOUNT?: string;
  MAIN_TITLE?: string;
  LAT?: string | number;
  LNG?: string | number;
  USAGE_DAY?: string;
  MIDDLE_SIZE_RM1?: string;
}

export interface Festival {
  id: string;
  title: string;
  subTitle: string;
  district: string; // e.g. 해운대구
  mainPlace: string;
  placeDetail: string;
  address: string;
  imageUrl: string;
  thumbUrl: string;
  tel: string;
  homepage: string;
  contents: string;
  timeInfo: string;
  feeInfo: string;
  usageDayRaw: string;
  startDate?: string; // YYYY-MM-DD
  endDate?: string;   // YYYY-MM-DD
  lat?: number;
  lng?: number;
  tags: string[];
  isFeatured?: boolean;
}

export type ViewMode = 'grid' | 'calendar' | 'district' | 'bookmarks';

export interface FilterState {
  district: string; // 'ALL' or specific GUGUN_NM
  selectedDate: string; // YYYY-MM-DD or ''
  dateQuickFilter: 'ALL' | 'THIS_MONTH' | 'ONGOING' | 'WEEKEND';
  searchQuery: string;
  sortBy: 'dateAsc' | 'dateDesc' | 'title';
}
