/* 详情页：根据 query 参数渲染人格解读 */
(function(){
	const el = document.getElementById('detail');
	if(!el || !window.FRUIT_DATA) return;
	const params = new URLSearchParams(location.search);
	const id = params.get('f');
	const data = window.FRUIT_DATA.find(x=>x.id===id) || window.FRUIT_DATA[0];

	document.title = `Your Soul Fruit: ${data.name}`;

	const badge = document.createElement('div');
	badge.className='fruit-badge-lg';
	badge.style.setProperty('--c1', data.colors[0]);
	badge.style.setProperty('--c2', data.colors[1]);
	badge.style.setProperty('--c3', data.colors[2]);
	if(data.image){
		badge.innerHTML = `<img class="fruit-card__img fruit-card__img--lg" src="${data.image}" alt="${data.name}">`;
	}else{
		badge.textContent = emojiFor(data.id);
	}

	const head = document.createElement('section');
	head.className='detail__head';
	head.innerHTML = `
		<div class="badge-wrap"></div>
		<div>
			<h2 class="title" style="margin:0 0 6px">${data.name}</h2>
			<p class="muted">Your vibe: ${data.persona.slice(0, 24)}...</p>
			<div class="tags"></div>
			<div class="btn-row">
				<a class="btn btn--accent" href="./index.html">Pick Another</a>
				<button class="btn" id="shareBtn">Share</button>
			</div>
		</div>
	`;

	head.querySelector('.badge-wrap').appendChild(badge);
	const tags = head.querySelector('.tags');
	for(const k of data.keywords){
		const t = document.createElement('span');
		t.className='pill';
		t.textContent = k;
		tags.appendChild(t);
	}

	const desc = document.createElement('section');
	desc.innerHTML = `
		<h3 style="margin:24px 0 8px">Personality Insight</h3>
		<p style="margin:0">${data.persona}</p>
	`;

	el.appendChild(head);
	el.appendChild(desc);

	const shareBtn = document.getElementById('shareBtn');
	shareBtn?.addEventListener('click', async ()=>{
		const shareData = {
			title: `灵魂之果：${data.name}`,
			text: `${data.name} · ${data.keywords.join(' / ')}`,
			url: location.href
		};
		try{
			if(navigator.share){
				await navigator.share(shareData);
			}else{
				await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
				shareBtn.textContent = 'Link Copied';
				setTimeout(()=>shareBtn.textContent='Share',1600);
			}
		}catch(e){ /* ignore cancel */ }
	});

	function emojiFor(id){
		const map = {
			kiwi:"🥝", starfruit:"⭐", pineapple:"🍍", pitaya:"🐉", guava:"🍈",
			cherry:"🍒", chelizi:"🍒", orange:"🍊", peach:"🍑", lemon:"🍋", strawberry:"🍓", blueberry:"🫐",
			sugarcane:"🎋",
			watermelon:"🍉", grape:"🍇", pomegranate:"🍎"
		};
		return map[id] || "🍏";
	}
})();


