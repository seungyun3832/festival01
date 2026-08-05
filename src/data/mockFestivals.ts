import { Festival, RawFestivalItem } from '../types';

export const FALLBACK_FESTIVALS: Festival[] = [
  {
    id: 'busan-fireworks-2026',
    title: '부산불꽃축제',
    subTitle: '광안대교를 배경으로 펼쳐지는 세계적 수준의 연화 연출과 멀티미디어 불꽃쇼',
    district: '수영구',
    mainPlace: '광안리해수욕장',
    placeDetail: '광안리해수욕장 백사장 및 광안대교 일원',
    address: '부산광역시 수영구 광안해변로 219 (광안동)',
    imageUrl: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?auto=format&fit=crop&w=1200&q=80',
    thumbUrl: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?auto=format&fit=crop&w=400&q=80',
    tel: '051-713-5000',
    homepage: 'https://www.bfo.or.kr',
    contents: '광안대교를 배경으로 펼쳐지는 대표적인 부산의 가을 축제입니다. 해외 초청 불꽃쇼, 부산 멀티불꽃쇼, 음악 및 레이저 연출이 조화된 초대형 해변 불꽃 축제입니다.',
    timeInfo: '18:00 ~ 21:00 (사전 버스킹 및 메인 불꽃쇼)',
    feeInfo: '무료 (일부 지정석 유료 판매)',
    usageDayRaw: '2026.11.07 ~ 2026.11.07',
    startDate: '2026-11-07',
    endDate: '2026-11-07',
    lat: 35.1532,
    lng: 129.1186,
    tags: ['불꽃축제', '광안대교', '야경', '야외공연', '가을축제'],
    isFeatured: true
  },
  {
    id: 'haeundae-sand-2026',
    title: '해운대 모래축제',
    subTitle: '국내 유일의 모래를 소재로 한 친환경 해변 문화 예술 축제',
    district: '해운대구',
    mainPlace: '해운대해수욕장',
    placeDetail: '해운대해수욕장 백사장 및 구남로 광장',
    address: '부산광역시 해운대구 해운대해변로 264',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    thumbUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
    tel: '051-749-4000',
    homepage: 'https://www.haeundae.go.kr',
    contents: '세계 유명 모래조각가들이 선보이는 웅장한 모래 조각전, Sand 보딩 체험, 해변 퍼레이드 및 미디어 파사드가 펼쳐지는 해운대의 초여름 대표 축제입니다.',
    timeInfo: '10:00 ~ 22:00',
    feeInfo: '무료입장',
    usageDayRaw: '2026.05.22 ~ 2026.05.25',
    startDate: '2026-05-22',
    endDate: '2026-05-25',
    lat: 35.1587,
    lng: 129.1604,
    tags: ['해운대', '모래조각', '체험축제', '가족나들이', '봄축제'],
    isFeatured: true
  },
  {
    id: 'busan-sea-festival-2026',
    title: '부산바다축제',
    subTitle: '부산 주요 해수욕장에서 열리는 여름 해양 문화 종합 축제',
    district: '해운대구',
    mainPlace: '다대포 & 광안리해수욕장',
    placeDetail: '다대포해수욕장 및 광안리해수욕장 일원',
    address: '부산광역시 사하구 다대낙조2길 52',
    imageUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
    thumbUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=400&q=80',
    tel: '051-713-5000',
    homepage: 'https://www.bfo.or.kr',
    contents: '나이트 풀파티, 해변 버스킹, 힙합 클럽 파티 및 다대포 일몰 콘서트가 열리는 한국 최고의 바다 축제입니다.',
    timeInfo: '15:00 ~ 23:00',
    feeInfo: '무료',
    usageDayRaw: '2026.07.31 ~ 2026.08.04',
    startDate: '2026-07-31',
    endDate: '2026-08-04',
    lat: 35.0469,
    lng: 128.9664,
    tags: ['여름축제', '풀파티', '다대포일몰', '콘서트', '바다'],
    isFeatured: true
  },
  {
    id: 'biff-2026',
    title: '부산국제영화제 (BIFF)',
    subTitle: '아시아 최고 영화의 전당과 해운대 일대에서 열리는 세계적 영화 축제',
    district: '해운대구',
    mainPlace: '영화의전당',
    placeDetail: '영화의전당, CGV 센텀시티, 롯데시네마 센텀시티',
    address: '부산광역시 해운대구 수영강변대로 120 (우동)',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
    thumbUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&q=80',
    tel: '1688-3010',
    homepage: 'https://www.biff.kr',
    contents: '전 세계의 유수 영화 상영회, 레드카펫 행사, 감독과의 대화(GV), 아시안콘텐츠&필름마켓이 개최되는 아시아 최대 규모의 영화 축제입니다.',
    timeInfo: '상영 회차별 다름',
    feeInfo: '일반 상영작 9,000원 / 개·폐막작 30,000원',
    usageDayRaw: '2026.10.07 ~ 2026.10.16',
    startDate: '2026-10-07',
    endDate: '2026-10-16',
    lat: 35.1711,
    lng: 129.1272,
    tags: ['영화제', '영화의전당', '레드카펫', '센텀시티', '문화 예술'],
    isFeatured: true
  },
  {
    id: 'jagalchi-festival-2026',
    title: '부산 자갈치축제',
    subTitle: '오이소! 보이소! 사이소! 신선한 수산물과 해양 문화가 어우러진 수산물 축제',
    district: '중구',
    mainPlace: '자갈치시장',
    placeDetail: '부산 자갈치시장 일원 및 신동아시장 앞',
    address: '부산광역시 중구 자갈치해안로 52',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80',
    thumbUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=400&q=80',
    tel: '051-243-9363',
    homepage: 'http://www.bjf.or.kr',
    contents: '자갈치 아지매 퍼레이드, 회 썰기 대회, 수산물 무료 시식회, 용왕제 및 불꽃쇼 등 흥겨운 풍물과 상인들의 인심을 느낄 수 있는 대표 시장 축제입니다.',
    timeInfo: '10:00 ~ 21:00',
    feeInfo: '무료 (먹거리 체험 별도)',
    usageDayRaw: '2026.10.15 ~ 2026.10.18',
    startDate: '2026-10-15',
    endDate: '2026-10-18',
    lat: 35.0968,
    lng: 129.0306,
    tags: ['자갈치', '수산물', '먹거리', '전통시장', '가을축제']
  },
  {
    id: 'gwangalli-drone-light-show',
    title: '광안리 M 드론라이트쇼 (상설 축제)',
    subTitle: '매주 토요일 밤 1,000대 이상의 드론이 상공에서 펼치는 환상적인 미디어 아트',
    district: '수영구',
    mainPlace: '광안리해수욕장',
    placeDetail: '광안리해수욕장 백사장 전역',
    address: '부산광역시 수영구 광안해변로 219',
    imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
    thumbUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=400&q=80',
    tel: '051-610-4072',
    homepage: 'https://gwangallimdrone.co.kr',
    contents: '매주 토요일 저녁 계절별·시즌별 테마에 맞추어 펼쳐지는 대한민국 최초의 상설 드론 라이트 쇼입니다.',
    timeInfo: '매주 토요일 2회 공연 (동절기 19:00/21:00, 하절기 20:00/22:00)',
    feeInfo: '무료',
    usageDayRaw: '2026.01.01 ~ 2026.12.31',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    lat: 35.1532,
    lng: 129.1186,
    tags: ['드론쇼', '광안리', '상설행사', '야경', '주말데이트']
  },
  {
    id: 'dongnae-eupseong-2026',
    title: '동래읍성역사축제',
    subTitle: '1592년 임진왜란 당시 동래읍성 전투를 재조명하는 역사 체험 축제',
    district: '동래구',
    mainPlace: '동래읍성광장',
    placeDetail: '동래읍성북문 광장, 온천천 시민공원',
    address: '부산광역시 동래구 명장동 산1-1',
    imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
    thumbUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80',
    tel: '051-550-4092',
    homepage: 'https://www.dongnae.go.kr/festival',
    contents: '동래성 전투 뮤지컬, 동래파전 체험, 조선시대 동래장터 재현, 읍성길 가닥줄다리기 등 역사 교육과 전통 문화가 살아있는 축제입니다.',
    timeInfo: '10:00 ~ 21:00',
    feeInfo: '무료 (체험 부스 비용 일부)',
    usageDayRaw: '2026.10.09 ~ 2026.10.11',
    startDate: '2026-10-09',
    endDate: '2026-10-11',
    lat: 35.2078,
    lng: 129.0882,
    tags: ['역사축제', '동래읍성', '동래파전', '전통문화', '교육축제']
  },
  {
    id: 'daejeo-canola-2026',
    title: '부산 낙동강 유채꽃 축제',
    subTitle: '국내 최대 규모의 노란 유채꽃 단지가 펼쳐지는 봄맞이 대표 생태 축제',
    district: '강서구',
    mainPlace: '대저생태공원',
    placeDetail: '대저생태공원 유채꽃 단지 일원',
    address: '부산광역시 강서구 대저1동 2314-11',
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80',
    thumbUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=400&q=80',
    tel: '051-501-6051',
    homepage: 'https://www.bfo.or.kr',
    contents: '유채꽃밭 속 야외 음악회, 합동 스몰 웨딩, 유채꽃 미로 찾기, 포토존 설치 등 노란 꽃물결과 낙동강의 봄 기운을 전해주는 대표 봄 축제입니다.',
    timeInfo: '09:00 ~ 18:00',
    feeInfo: '무료',
    usageDayRaw: '2026.04.03 ~ 2026.04.12',
    startDate: '2026-04-03',
    endDate: '2026-04-12',
    lat: 35.2106,
    lng: 128.9818,
    tags: ['유채꽃', '봄꽃축제', '대저생태공원', '꽃놀이', '사진명소']
  },
  {
    id: 'gijang-anchovy-2026',
    title: '기장 멸치축제',
    subTitle: '봄철 털털 털어내는 살이 오르고 맛 고소한 기장 대변항 멸치 축제',
    district: '기장군',
    mainPlace: '대변항',
    placeDetail: '기장군 기장읍 대변항 해안가 일원',
    address: '부산광역시 기장군 기장읍 대변리 308-1',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80',
    thumbUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80',
    tel: '051-709-4000',
    homepage: 'https://www.gijang.go.kr',
    contents: '멸치 털기 장관 관람, 생멸치 무료 시식회, 멸치 가요제, 해상 불꽃쇼, 어선 해상 퍼레이드 등 활기찬 포구 문화 체험축제입니다.',
    timeInfo: '10:00 ~ 21:00',
    feeInfo: '무료',
    usageDayRaw: '2026.04.24 ~ 2026.04.26',
    startDate: '2026-04-24',
    endDate: '2026-04-26',
    lat: 35.2255,
    lng: 129.2241,
    tags: ['기장', '멸치축제', '대변항', '수산물', '먹거리']
  },
  {
    id: 'taejongdae-hydrangea-2026',
    title: '태종대 수국꽃 문화축제',
    subTitle: '태종사 수국길을 따라 펼쳐지는 형형색색 수국 향연과 바다 비경',
    district: '영도구',
    mainPlace: '태종대 태종사',
    placeDetail: '태종대 유원지 내 태종사 일원',
    address: '부산광역시 영도구 전망로 119 (동삼동)',
    imageUrl: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=80',
    thumbUrl: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=400&q=80',
    tel: '051-419-4000',
    homepage: 'https://www.yeongdo.go.kr',
    contents: '전 세계 40여 종 수국 5,000여 그루가 수놓는 태종사의 초여름 축제. 버스킹 공연과 차 시음회, 다채로운 포토존이 운영됩니다.',
    timeInfo: '09:00 ~ 18:00',
    feeInfo: '무료 (태종대 다누비열차 탑승료 별도)',
    usageDayRaw: '2026.06.27 ~ 2026.07.05',
    startDate: '2026-06-27',
    endDate: '2026-07-05',
    lat: 35.0531,
    lng: 129.0872,
    tags: ['태종대', '수국축제', '영도', '여름꽃', '사진명소']
  },
  {
    id: 'mackerel-festival-2026',
    title: '부산 고등어축제',
    subTitle: '국민 생선 고등어의 대표 산지 송도해수욕장에서 즐기는 먹거리 축제',
    district: '서구',
    mainPlace: '송도해수욕장',
    placeDetail: '송도해수욕장 중앙 잔디광장 일원',
    address: '부산광역시 서구 송도해변로 100',
    imageUrl: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=1200&q=80',
    thumbUrl: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=400&q=80',
    tel: '051-240-4000',
    homepage: 'http://www.bsseogu.go.kr',
    contents: '고등어 맨손 잡기 체험, 고등어 화덕 구이 먹거리장터, 송도 케이블카 할인 이벤트, 해상 카약 체험이 함께 펼쳐집니다.',
    timeInfo: '10:00 ~ 21:00',
    feeInfo: '무료',
    usageDayRaw: '2026.10.23 ~ 2026.10.25',
    startDate: '2026-10-23',
    endDate: '2026-10-25',
    lat: 35.0783,
    lng: 129.0203,
    tags: ['고등어', '송도', '먹거리축제', '체험축제', '바다']
  },
  {
    id: 'hydrangea-hydra-samnag-2026',
    title: '삼락 벚꽃축제 & 강변축제',
    subTitle: '낙동강 변 벚꽃 터널과 생태공원에서 즐기는 봄날의 휴식',
    district: '사상구',
    mainPlace: '삼락생태공원',
    placeDetail: '삼락생태공원 벚꽃단지 및 야외무대',
    address: '부산광역시 사상구 삼락동 29-46',
    imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=1200&q=80',
    thumbUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=400&q=80',
    tel: '051-310-4000',
    homepage: 'https://www.sasang.go.kr',
    contents: '한국 아름다운 길 100선에 선정된 삼락 벚꽃길을 걷는 상쾌한 봄 축제입니다. 다채로운 음악회와 플리마켓이 함께 진행됩니다.',
    timeInfo: '10:00 ~ 18:00',
    feeInfo: '무료',
    usageDayRaw: '2026.03.28 ~ 2026.04.05',
    startDate: '2026-03-28',
    endDate: '2026-04-05',
    lat: 35.1685,
    lng: 128.9712,
    tags: ['벚꽃', '봄축제', '삼락생태공원', '산책로', '가족나들이']
  }
];

export function transformRawFestival(raw: RawFestivalItem, index: number): Festival {
  const title = raw.TITLE || raw.MAIN_TITLE || '부산 축제';
  const district = raw.GUGUN_NM ? raw.GUGUN_NM.trim() : '기타 구·군';
  const rawUsageDay = raw.USAGE_DAY || '';
  
  // Try parsing dates from rawUsageDay (e.g., "2026.05.24~2026.05.27" or "2026-05-24 ~ 2026-05-27")
  let startDate = '';
  let endDate = '';

  const dateMatches = rawUsageDay.match(/(\d{4})[.-](\d{1,2})[.-](\d{1,2})/g);
  if (dateMatches && dateMatches.length >= 1) {
    const format = (str: string) => {
      const parts = str.replace(/\./g, '-').split('-');
      const y = parts[0];
      const m = parts[1].padStart(2, '0');
      const d = parts[2].padStart(2, '0');
      return `${y}-${m}-${d}`;
    };
    startDate = format(dateMatches[0]);
    if (dateMatches.length >= 2) {
      endDate = format(dateMatches[1]);
    } else {
      endDate = startDate;
    }
  }

  const tags: string[] = [];
  if (district) tags.push(district);
  if (title.includes('불꽃')) tags.push('불꽃축제');
  if (title.includes('영화')) tags.push('영화제');
  if (title.includes('바다') || title.includes('해변')) tags.push('바다축제');
  if (title.includes('꽃') || title.includes('유채') || title.includes('수국') || title.includes('벚꽃')) tags.push('꽃축제');
  if (title.includes('수산') || title.includes('멸치') || title.includes('고등어') || title.includes('자갈치')) tags.push('먹거리축제');

  return {
    id: String(raw.UC_SEQ || `fest-${index}`),
    title: title.replace(/<[^>]*>?/gm, ''), // strip HTML tags if any
    subTitle: raw.TITLE_SUB ? raw.TITLE_SUB.replace(/<[^>]*>?/gm, '') : raw.MAIN_PLACE || '부산의 신나는 지역 축제',
    district,
    mainPlace: raw.MAIN_PLACE || '부산광역시 지정 장소',
    placeDetail: raw.PLACE || raw.ADDR1 || '',
    address: raw.ADDR1 || raw.ADDR2 || '부산광역시',
    imageUrl: raw.MAIN_IMG_NORMAL || raw.MAIN_IMG_THUMB || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    thumbUrl: raw.MAIN_IMG_THUMB || raw.MAIN_IMG_NORMAL || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
    tel: raw.CNTCT_TEL || '051-120 (부산시 콜센터)',
    homepage: raw.HOMEPAGE_URL || '',
    contents: raw.ITEMCNTNTS ? raw.ITEMCNTNTS.replace(/<[^>]*>?/gm, '') : '부산 지역 대표 축제 상세 내용입니다.',
    timeInfo: raw.USAGE_DAY_WEEK_AND_TIME || '행사 일정 참조',
    feeInfo: raw.USAGE_AMOUNT || '무료 (일부 프로그램 유료)',
    usageDayRaw: rawUsageDay || '일정 확인 필요',
    startDate,
    endDate,
    lat: raw.LAT ? parseFloat(String(raw.LAT)) : undefined,
    lng: raw.LNG ? parseFloat(String(raw.LNG)) : undefined,
    tags
  };
}
