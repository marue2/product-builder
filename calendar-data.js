const SUBSCRIPTION_DATA = [
    { 
        id: '1',
        date: '2026-06-10', 
        title: '강남 에코델타시티', 
        type: 'special',
        price: 125000, 
        marketPrice: 195000,
        units: '총 1,240세대 (일반분양 450세대)',
        structure: '4Bay 판상형 위주 설계 (59㎡, 84㎡, 101㎡)',
        community: '실내 수영장, 골프연습장, 스카이 라운지, 게스트하우스',
        school: '개포초등학교(도보 5분), 개포중/고 인접',
        transport: '3호선 대치역 도보 10분, 양재대로/영동대로 진입 용이',
        analysis: '강남구 핵심 입지로, 분양가 대비 시세차익이 7억 이상 기대되는 로또 단지입니다.',
        score: 'S'
    },
    { 
        id: '2',
        date: '2026-06-15', 
        title: '판교 밸리 자이', 
        type: 'special',
        price: 98000,
        marketPrice: 145000,
        units: '총 850세대 (오피스텔 200실 포함)',
        structure: '남향 위주 배치, 테라스하우스 특화 평면 적용',
        community: '피트니스 센터, 도서관, 시니어 클럽, 어린이집',
        school: '판교초/중/고 학군 형성, 인근 학원가 밀집',
        transport: '신분당선 판교역 버스 10분, 경부고속도로 판교IC 인접',
        analysis: '판교 테크노밸리 직주근접 단지로 안정적인 프리미엄 형성이 예상됩니다.',
        score: 'A+'
    },
    { 
        id: '3',
        date: '2026-06-25', 
        title: '광교 푸르지오 트리시티', 
        type: 'special',
        price: 115000,
        marketPrice: 160000,
        units: '총 1,050세대',
        structure: 'LDK 개방형 구조, 수납 특화 팬트리 제공',
        community: '카페테리아, 실내 체육관, 사우나, 독서실',
        school: '호수초등학교(도보 3분), 광교중학교 인접',
        transport: '신분당선 광교중앙역 도보 12분, 영동고속도로 동수원IC 진입',
        analysis: '광교신도시의 완성된 인프라를 누리는 마지막 대단지 아파트입니다.',
        score: 'A'
    }
];

// 검색용 주변 단지 DB (Mock 데이터)
const MARKET_DATABASE = [
    { name: '강남 에코델타시티 (분양 예정)', price: 125000, market: 195000, region: '서울 강남구' },
    { name: '판교 밸리 자이 (분양 예정)', price: 98000, market: 145000, region: '경기 성남시' },
    { name: '광교 푸르지오 트리시티 (분양 예정)', price: 115000, market: 160000, region: '경기 수원시' },
    { name: '서초 그랑자이', price: 150000, market: 280000, region: '서울 서초구' },
    { name: '래미안 원베일리', price: 170000, market: 350000, region: '서울 서초구' },
    { name: '디에이치 퍼스티어 아이파크', price: 140000, market: 250000, region: '서울 강남구' },
    { name: '검단 신도시 예미지', price: 45000, market: 70000, region: '인천 서구' },
    { name: '동탄역 롯데캐슬', price: 55000, market: 150000, region: '경기 화성시' },
    { name: '송도 더샵 퍼스트파크', price: 60000, market: 110000, region: '인천 연수구' }
];