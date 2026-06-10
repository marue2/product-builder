document.addEventListener('DOMContentLoaded', () => {
    const featuredProperties = document.getElementById('featured-properties');

    function renderFeaturedProperties() {
        if (!featuredProperties || typeof SUBSCRIPTION_DATA === 'undefined') return;

        featuredProperties.innerHTML = '';

        // 최대 3개의 단지만 메인에 노출
        const hotItems = SUBSCRIPTION_DATA.slice(0, 3);

        hotItems.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('property-card');
            
            const profit = ((item.marketPrice - item.price) / 10000).toFixed(1);
            
            card.innerHTML = `
                <div class="card-image">🏢</div>
                <div class="card-content">
                    <span class="card-tag">시세차익 ${profit}억 예상</span>
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-price">분양가: ${(item.price / 10000).toFixed(1)}억 / 시세: ${(item.marketPrice / 10000).toFixed(1)}억</p>
                    <p class="card-info">${item.analysis.substring(0, 60)}...</p>
                    <a href="calendar.html" class="btn-detail">상세 분석 및 일정 보기</a>
                </div>
            `;
            featuredProperties.appendChild(card);
        });
    }

    renderFeaturedProperties();
});