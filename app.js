// 실제 서비스에서는 검증한 제품 데이터로 이 배열을 교체하세요.
// 모든 회사와 제품은 기능 시연을 위한 가상 데이터입니다.
const certifications = {
  fairtrade: {
    name: '공정무역', symbol: '⚖', short: '생산자에게 더 공정한 거래를',
    description: '농부와 노동자가 더 공정한 조건에서 일하고 거래할 수 있도록 돕는 인증이에요.',
    criteria: 'Fairtrade는 생산자에게 지급하는 최저가격(적용 품목)과 공동체를 위한 추가 장려금, 노동·환경 기준 등을 정해요.',
    note: '공정무역이 곧 유기농을 뜻하지는 않아요. 인증만으로 모든 노동 문제가 없다고 단정할 수도 없어요.',
    source: 'https://www.fairtrade.net/en/why-fairtrade/how-we-do-it/standards/fairtrade-minimum-price-and-premium-information.html'
  },
  organic: {
    name: '유기농', symbol: '♧', short: '땅과 재배 방식을 생각해요',
    description: '유기농산물은 합성농약과 화학비료를 사용하지 않는 등 정해진 유기 재배 기준에 맞게 생산한 농산물이에요.',
    criteria: '토양과 재배 관리, 사용 가능한 자재 등 인증 기준을 살펴봐요. 가공식품은 유기가공식품 인증 기준이 따로 있어요.',
    note: '국가와 인증 종류에 따라 기준이 달라요. 유기농 인증이 탄소배출이나 포장까지 모두 평가하는 것은 아니에요.',
    source: 'https://enviagro.go.kr/portal/content/html/info/certSys.jsp'
  },
  rainforest: {
    name: '레인포레스트 얼라이언스', symbol: '❧', short: '사람과 숲을 함께 생각해요',
    description: '농장과 기업이 숲과 자연을 보호하고, 농부의 생계와 인권을 개선하기 위한 기준에 참여하는 인증이에요.',
    criteria: '숲과 생태계 보호, 환경을 고려한 농업, 노동자의 인권 등 지속가능 농업 기준을 살피고 독립적인 심사를 받아요.',
    note: '제품 전체가 아니라 특정 원료에 적용될 수 있어요. 포장에 어떤 원료가 인증 대상인지 확인해 주세요.',
    source: 'https://www.rainforest-alliance.org/what-does-rainforest-alliance-certified-mean/'
  }
};

const products = [
  { id: 'choco-1', category: '초콜릿', name: '공정무역 다크 초콜릿', company: '함께카카오', reason: '공정무역 인증 카카오를 사용하는 예시예요.', certs: ['fairtrade'], emoji: '🍫', color: '#f0e4d9' },
  { id: 'choco-2', category: '초콜릿', name: '유기농 밀크 초콜릿', company: '초록한입', reason: '유기가공식품 인증 초콜릿의 예시예요.', certs: ['organic'], emoji: '🍫', color: '#e8edda' },
  { id: 'choco-3', category: '초콜릿', name: '숲을 생각한 초콜릿', company: '숲의간식', reason: '레인포레스트 얼라이언스 인증 카카오를 사용하는 예시예요.', certs: ['rainforest'], emoji: '🍫', color: '#e2ece5' },
  { id: 'coffee-1', category: '커피', name: '공정무역 원두커피', company: '함께로스터스', reason: '공정무역 인증 원두를 사용하는 예시예요.', certs: ['fairtrade'], emoji: '☕', color: '#ece1d6' },
  { id: 'coffee-2', category: '커피', name: '유기농 드립커피', company: '초록로스터스', reason: '유기가공식품 인증 커피의 예시예요.', certs: ['organic'], emoji: '☕', color: '#e9edda' },
  { id: 'coffee-3', category: '커피', name: '숲의 원두커피', company: '숲의로스터스', reason: '레인포레스트 얼라이언스 인증 원두를 사용하는 예시예요.', certs: ['rainforest'], emoji: '☕', color: '#e0eae3' },
  { id: 'banana-1', category: '바나나', name: '공정무역 바나나', company: '함께과일', reason: '공정무역 거래 기준을 적용한 바나나의 예시예요.', certs: ['fairtrade'], emoji: '🍌', color: '#f5efd5' },
  { id: 'banana-2', category: '바나나', name: '유기농 바나나', company: '초록과수원', reason: '유기 재배 기준을 지킨 바나나의 예시예요.', certs: ['organic'], emoji: '🍌', color: '#e9eedb' },
  { id: 'rice-1', category: '쌀', name: '유기농 우리 쌀', company: '초록들판', reason: '유기 재배 기준을 지킨 쌀의 예시예요.', certs: ['organic'], emoji: '🌾', color: '#efecd8' },
  { id: 'milk-1', category: '우유', name: '유기농 흰 우유', company: '초록목장', reason: '유기 축산·가공 기준을 적용한 우유의 예시예요.', certs: ['organic'], emoji: '🥛', color: '#e2ebef' },
  { id: 'tea-1', category: '차', name: '유기농 녹차', company: '초록다원', reason: '유기가공식품 인증 녹차의 예시예요.', certs: ['organic'], emoji: '🍵', color: '#e4ecd9' }
];

const $ = (selector) => document.querySelector(selector);
const categories = [...new Set(products.map(product => product.category))];
const storageKey = 'green-basket-v1';
let cart = [];
let visibleProducts = [];
let toastTimer;

function notify(message) {
  $('#toast').textContent = message;
  $('#toast').hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { $('#toast').hidden = true; }, 2600);
}

function saveCart() {
  try { localStorage.setItem(storageKey, JSON.stringify(cart)); }
  catch { $('#storage-note').textContent = '저장 공간을 사용할 수 없어 현재 화면에서만 유지돼요.'; }
}

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (Array.isArray(saved)) {
      const seen = new Set();
      cart = saved.filter(item => item && products.some(p => p.id === item.id) && !seen.has(item.id) && seen.add(item.id))
        .map(item => ({ id: item.id, done: item.done === true }));
    }
  } catch { $('#storage-note').textContent = '저장된 목록을 읽지 못했어요. 새 목록을 만들 수 있어요.'; }
}

function openCertification(id) {
  const cert = certifications[id];
  if (!cert) return;
  $('#dialog-title').textContent = cert.name;
  $('#dialog-symbol').textContent = cert.symbol;
  $('#dialog-description').textContent = cert.description;
  $('#dialog-criteria').textContent = cert.criteria;
  $('#dialog-note').textContent = cert.note;
  $('#dialog-source').href = cert.source;
  $('#cert-dialog').showModal();
}

function renderProducts() {
  $('#results').innerHTML = visibleProducts.map(product => {
    const added = cart.some(item => item.id === product.id);
    return `<article class="product-card">
      <div class="product-art" style="background:${product.color}"><small>예시 제품</small><span aria-hidden="true">${product.emoji}</span></div>
      <div class="product-body"><p class="company">${product.company} · 가상 회사</p><h4>${product.name}</h4><p class="reason">${product.reason}</p>
      <div class="cert-tags">${product.certs.map(id => `<button type="button" class="cert-tag" data-cert="${id}" aria-label="${certifications[id].name} 인증 설명 보기"><span aria-hidden="true">${certifications[id].symbol}</span>${certifications[id].name} ⓘ</button>`).join('')}</div>
      <button type="button" class="add-button" data-add="${product.id}" ${added ? 'disabled' : ''} aria-label="${product.name} ${added ? '담김' : '장바구니에 담기'}">${added ? '✓ 장바구니에 담았어요' : '+ 장바구니 담기'}</button></div>
    </article>`;
  }).join('');
}

function renderCart() {
  $('#nav-count').textContent = cart.length;
  $('#list-count').textContent = cart.length;
  $('#mobile-cart-count').textContent = cart.length;
  $('#mobile-cart').setAttribute('aria-label', `내 장바구니 ${cart.length}개 보기`);
  const done = cart.filter(item => item.done).length;
  $('#list-progress').textContent = cart.length ? `${cart.length}개 중 ${done}개 구매 완료` : '아직 담은 제품이 없어요';
  $('#clear-done').hidden = done === 0;
  $('#shopping-list').innerHTML = cart.length ? cart.map(item => {
    const product = products.find(p => p.id === item.id);
    return `<div class="list-item ${item.done ? 'done' : ''}"><input type="checkbox" id="check-${item.id}" data-check="${item.id}" ${item.done ? 'checked' : ''}><label for="check-${item.id}">${product.name}<small>${product.category} · ${product.company}</small></label><button type="button" class="remove-button" data-remove="${item.id}" aria-label="${product.name} 삭제">×</button></div>`;
  }).join('') : '<div class="empty-list"><span aria-hidden="true">♧</span>마음에 드는 제품의<br>‘장바구니 담기’를 눌러주세요.</div>';
}

function updateCart() { saveCart(); renderCart(); renderProducts(); }

function searchFoods(rawQuery, initial = false) {
  const query = rawQuery.trim();
  $('#food-search').removeAttribute('aria-invalid');
  document.querySelectorAll('.chip').forEach(chip => chip.classList.remove('active'));
  if (!query) {
    visibleProducts = [];
    $('#result-title').textContent = '음식 이름을 입력해 주세요';
    $('#result-count').textContent = '';
    $('#search-message').textContent = '초콜릿, 커피, 바나나처럼 살 음식 이름을 입력하거나 아래 추천 검색어를 눌러주세요.';
    $('#search-message').hidden = false;
    $('#food-search').setAttribute('aria-invalid', 'true');
    $('#food-search').focus();
    renderProducts();
    return;
  }
  const terms = [...new Set(query.split(/[,，、\n]+/).map(term => term.trim().toLowerCase()).filter(Boolean))];
  const aliases = { '초코': '초콜릿', 'chocolate': '초콜릿', 'coffee': '커피', 'banana': '바나나', 'milk': '우유', 'rice': '쌀', 'tea': '차', '녹차': '차', '원두': '커피' };
  const match = (product, term) => {
    const word = aliases[term] || term;
    return product.category.includes(word) || product.name.includes(word);
  };
  visibleProducts = products.filter(product => terms.some(term => match(product, term)));
  const missing = terms.filter(term => !products.some(product => match(product, term)));
  $('#result-title').textContent = initial ? '먼저 초콜릿을 둘러보세요' : (visibleProducts.length ? `‘${query}’ 추천 예시` : '검색 결과가 없어요');
  $('#result-count').textContent = `${visibleProducts.length}개 제품`;
  $('#search-message').hidden = missing.length === 0 && visibleProducts.length > 0;
  $('#search-message').textContent = visibleProducts.length ? `‘${missing.join(', ')}’ 예시는 아직 없어요. 등록된 음식: ${categories.join(', ')}.` : '일치하는 예시 제품이 없어요. 초콜릿, 커피, 바나나, 쌀, 우유, 차 중에서 다시 찾아볼까요?';
  document.querySelectorAll('.chip').forEach(chip => { if (terms.some(term => (aliases[term] || term) === chip.dataset.food)) chip.classList.add('active'); });
  renderProducts();
}

$('#search-form').addEventListener('submit', event => { event.preventDefault(); searchFoods($('#food-search').value); });
document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.food) { $('#food-search').value = button.dataset.food; searchFoods(button.dataset.food); }
  if (button.dataset.cert) openCertification(button.dataset.cert);
  if (button.dataset.add && !cart.some(item => item.id === button.dataset.add)) {
    cart.push({ id: button.dataset.add, done: false }); updateCart(); notify('장바구니에 담았어요.');
  }
  if (button.dataset.remove) {
    cart = cart.filter(item => item.id !== button.dataset.remove); updateCart(); notify('장바구니에서 삭제했어요.');
  }
});
$('#shopping-list').addEventListener('change', event => {
  const id = event.target.dataset.check;
  const item = cart.find(item => item.id === id);
  if (item) { item.done = event.target.checked; saveCart(); renderCart(); }
});
$('#clear-done').addEventListener('click', () => { cart = cart.filter(item => !item.done); updateCart(); notify('구매한 제품을 지웠어요.'); });
$('#close-dialog').addEventListener('click', () => $('#cert-dialog').close());
$('#cert-dialog').addEventListener('click', event => { if (event.target === $('#cert-dialog')) { const box = event.target.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) event.target.close(); } });
$('#food-chips').innerHTML = categories.map(food => `<button type="button" class="chip" data-food="${food}">${food}</button>`).join('');
$('#guide-cards').innerHTML = Object.entries(certifications).map(([id, cert]) => `<button type="button" class="guide-card" data-cert="${id}" aria-label="${cert.name} 인증 설명 보기"><span class="cert-symbol" aria-hidden="true">${cert.symbol}</span><div><strong>${cert.name}</strong><p>${cert.short}</p></div></button>`).join('');
loadCart();
renderCart();
searchFoods('초콜릿', true);
