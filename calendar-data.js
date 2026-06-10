const SUBSCRIPTION_DATA = [
    { 
        id: '1',
        date: '2026-06-10', 
        title: '강남 에코델타시티', 
        type: 'special',
        price: 125000, 
        marketPrice: 195000,
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