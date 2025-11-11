/* 首页：渲染 12 种水果，并处理点击跳转 */
(function(){
	const grid = document.getElementById('fruit-grid');
	if(!grid || !window.FRUIT_DATA) return;

	// 渲染气泡装饰
	createBubbles();

	// 创建卡片
	for(const item of window.FRUIT_DATA){
		const card = document.createElement('article');
		card.className = 'fruit-card';
		card.style.setProperty('--c1', item.colors[0]);
		card.style.setProperty('--c2', item.colors[1]);
		card.style.setProperty('--c3', item.colors[2]);
		card.setAttribute('tabindex','0');
		card.setAttribute('role','button');
		card.setAttribute('aria-label', `Select ${item.name}`);

		const badgeContent = item.image
			? `<div class="fruit-card__badge fruit-card__badge--img" aria-hidden="true">
					<img class="fruit-card__img" src="${item.image}" alt="${item.name}">
			   </div>`
			: `<div class="fruit-card__badge" aria-hidden="true">${emojiFor(item.id)}</div>`;

		card.innerHTML = `
			<div class="fruit-card__inner">
				${badgeContent}
				<span class="fruit-card__name">${item.name}</span>
			</div>
		`;

		const go = () => location.href = `./fruit.html?f=${encodeURIComponent(item.id)}`;
		card.addEventListener('click', go);
		card.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' ') { e.preventDefault(); go(); } });

		grid.appendChild(card);
	}

	function emojiFor(id){
		const map = {
			kiwi:"🥝", starfruit:"⭐", pineapple:"🍍", pitaya:"🐉", guava:"🍈",
			cherry:"🍒", chelizi:"🍒", orange:"🍊", peach:"🍑", lemon:"🍋", strawberry:"🍓", blueberry:"🫐",
			sugarcane:"🎋",
			watermelon:"🍉", grape:"🍇", pomegranate:"🍎"
		};
		return map[id] || "🍏";
	}

	function createBubbles(){
		// 仅在页面边缘区域生成泡泡，避免遮挡水果图片
		const root = document.body;
		const zones = [
			// top strip
			{ x:[2,98], y:[2,14] },
			// bottom strip
			{ x:[2,98], y:[82,96] },
			// left gutter
			{ x:[2,8], y:[16,84] },
			// right gutter
			{ x:[92,98], y:[16,84] },
		];
		for(let i=0;i<12;i++){
			const z = zones[i % zones.length];
			const b = document.createElement('div');
			b.className='bubble';
			const size = 50 + Math.random()*100;
			const left = rand(z.x[0], z.x[1]);
			const top = rand(z.y[0], z.y[1]);
			b.style.width = `${size}px`;
			b.style.height = `${size}px`;
			b.style.left = `${left}vw`;
			b.style.top = `${top}vh`;
			b.style.animationDelay = `${Math.random()*4}s`;
			root.appendChild(b);
		}
		function rand(a,b){ return a + Math.random()*(b-a); }
	}
})();


