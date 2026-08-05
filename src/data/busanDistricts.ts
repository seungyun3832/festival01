export interface DistrictInfo {
  id: string;
  name: string;
  engName: string;
  emoji: string;
  description: string;
  popularSpots: string[];
}

export const BUSAN_DISTRICTS: DistrictInfo[] = [
  {
    id: '해운대구',
    name: '해운대구',
    engName: 'Haeundae-gu',
    emoji: '🏖️',
    description: '해운대해수욕장, 벡스코(BEXCO), 센텀시티가 위치한 부산 문화·축제의 중심지',
    popularSpots: ['해운대해수욕장', '송정해수욕장', 'BEXCO', '영화의전당']
  },
  {
    id: '수영구',
    name: '수영구',
    engName: 'Suyeong-gu',
    emoji: '🌉',
    description: '광안대교 야경과 광안리 드론쇼, 민락수변공원으로 유명한 해변 축제의 명소',
    popularSpots: ['광안리해수욕장', '민락수변공원', 'F1963']
  },
  {
    id: '중구',
    name: '중구',
    engName: 'Jung-gu',
    emoji: '🏮',
    description: '용두산공원, 자갈치시장, BIFF 광장, 국제시장이 위치한 역사 깊은 문화 중심지',
    popularSpots: ['자갈치시장', '용두산공원', 'BIFF광장', '보수동책방골목']
  },
  {
    id: '기장군',
    name: '기장군',
    engName: 'Gijang-gun',
    emoji: '🌊',
    description: '멸치축제, 붕장어축제, 해동용궁사, 아홉산숲이 있는 자연존중 관광지역',
    popularSpots: ['대변항', '해동용궁사', '아홉산숲', '일광해수욕장']
  },
  {
    id: '영도구',
    name: '영도구',
    engName: 'Yeongdo-gu',
    emoji: '🛳️',
    description: '태종대, 흰여울문화마을, 영도대교 도개 행사 등 섬과 바다의 감성을 지닌 곳',
    popularSpots: ['태종대', '흰여울문화마을', '영도대교', '국립해양박물관']
  },
  {
    id: '부산진구',
    name: '부산진구',
    engName: 'Busanjin-gu',
    emoji: '🛍️',
    description: '서면 젊음의 거리, 시민공원, 연등축제가 펼쳐지는 부산의 젊음과 교통 중심지',
    popularSpots: ['부산시민공원', '서면 카페거리', '삼광사', '전포카페거리']
  },
  {
    id: '동래구',
    name: '동래구',
    engName: 'Dongnae-gu',
    emoji: '♨️',
    description: '동래읍성축제, 온천천 시민공원, 허심청 온천 등 역사와 전통이 살아 숨쉬는 지역',
    popularSpots: ['동래읍성', '온천천 시민공원', '허심청', '충렬사']
  },
  {
    id: '금정구',
    name: '금정구',
    engName: 'Geumjeong-gu',
    emoji: '⛰️',
    description: '범어사, 금정산성, 부산대학교 대학가가 자리한 자연 문화 구역',
    popularSpots: ['금정산성', '범어사', '스포원파크', '회동수원지']
  },
  {
    id: '남구',
    name: '남구',
    engName: 'Nam-gu',
    emoji: '🌸',
    description: 'UN기념공원, 오륙도 스카이워크, 이기대 수변공원이 아름다운 문화 관광지',
    popularSpots: ['오륙도 스카이워크', '이기대 수변공원', 'UN기념공원', '부산박물관']
  },
  {
    id: '사하구',
    name: '사하구',
    engName: 'Saha-gu',
    emoji: '🌅',
    description: '감천문화마을, 다대포 꿈의 낙조분수와 일몰 생태 축제로 유명한 문화 구역',
    popularSpots: ['감천문화마을', '다대포해수욕장', '을숙도 생태공원', '장림포구']
  },
  {
    id: '강서구',
    name: '강서구',
    engName: 'Gangseo-gu',
    emoji: '🍅',
    description: '대저 짭짤이토마토 축제, 대저 생태공원 유채꽃 축제 등 자연 생태 축제의 장소',
    popularSpots: ['대저생태공원', '맥도생태공원', '가덕도', '명지생태공원']
  },
  {
    id: '북구',
    name: '북구',
    engName: 'Buk-gu',
    emoji: '🌳',
    description: '낙동강 구포나루 축제, 화명생태공원이 위치한 친환경 수변 도시',
    popularSpots: ['화명생태공원', '구포시장', '병풍암 석불사']
  },
  {
    id: '사상구',
    name: '사상구',
    engName: 'Sasang-gu',
    emoji: '🌺',
    description: '삼락생태공원 강변축제, 삼락 벚꽃축제가 열리는 낙동강 변 문화의 공간',
    popularSpots: ['삼락생태공원', '사상근린공원', '운수사']
  },
  {
    id: '연제구',
    name: '연제구',
    engName: 'Yeonje-gu',
    emoji: '🏛️',
    description: '부산광역시청과 법조타운이 위치한 행정 및 연제 고분군 역사 문화 구역',
    popularSpots: ['부산광역시청', '연산동 고분군', '온천천 산책로']
  },
  {
    id: '서구',
    name: '서구',
    engName: 'Seo-gu',
    emoji: '🚠',
    description: '송도해수욕장, 송도 해상케이블카, 구덕산 및 고등어 축제의 고장',
    popularSpots: ['송도해수욕장', '송도 해상케이블카', '암남공원', '임시수도기념관']
  },
  {
    id: '동구',
    name: '동구',
    engName: 'Dong-gu',
    emoji: '🚂',
    description: '부산역, 차이나타운 특구, 초량 이바구길이 연결된 관문 도시',
    popularSpots: ['부산역', '초량 이바구길', '차이나타운', '자성대공원']
  }
];
