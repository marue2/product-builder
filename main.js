document.addEventListener('DOMContentLoaded', () => {
    const featuredProperties = document.getElementById('featured-properties');

    function renderPremiumCards() {
        if (!featuredProperties || typeof SUBSCRIPTION_DATA === 'undefined') return;

        featuredProperties.innerHTML = '';

        const hotItems = SUBSCRIPTION_DATA.slice(0, 3);

        hotItems.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('property-card');
            card.style.animationDelay = `${index * 0.1}s`;
            
            const profit = ((item.marketPrice - item.price) / 10000).toFixed(1);
            
            card.innerHTML = `
                <div class="card-image">
                    <span class="card-badge">HOT 청약</span>
                    🏢
                </div>
                <div class="card-content">
                    <div class="card-meta">
                        <span class="card-score">분석 등급: ${item.score}</span>
                        <small style="color: var(--text-muted); font-weight: 700;">D-${10 + index}</small>
                    </div>
                    <h3 class="card-title">${item.title}</h3>
                    <div class="card-price-info">
                        <div class="price-item">
                            <span>분양가</span>
                            <strong>${(item.price / 10000).toFixed(1)}억</strong>
                        </div>
                        <div class="price-item">
                            <span>주변 시세</span>
                            <strong>${(item.marketPrice / 10000).toFixed(1)}억</strong>
                        </div>
                        <div class="price-item profit">
                            <span>기대 수익</span>
                            <strong>+${profit}억</strong>
                        </div>
                    </div>
                    <p class="card-info" style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                        ${item.analysis}
                    </p>
                    <a href="calendar.html" class="btn-detail">상세 분석 보고서 보기</a>
                </div>
            `;
            featuredProperties.appendChild(card);
        });
    }

    // 0.5초 로딩 시뮬레이션
    setTimeout(renderPremiumCards, 500);
});