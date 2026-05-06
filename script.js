const app = document.getElementById('app');
const hero = document.getElementById('hero');
const confessional = document.getElementById('confessional');
const cta = document.getElementById('cta');
const backBtn = document.getElementById('backBtn');
const scrollHint = document.getElementById('scrollHint');
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const pizzaGrid = document.getElementById('pizzaGrid');
const step2title = document.getElementById('step2title');
const step2sub = document.getElementById('step2sub');
const backToConfess = document.getElementById('backToConfess');
const cartCount = document.getElementById('cart-count');
const liveCount = document.getElementById('live-count');

let cartItems = [];
let currentConfession = null;

function openConfessional(){
  app.classList.add('confessional-open'); confessional.classList.add('active'); confessional.setAttribute('aria-hidden','false');
}
function closeConfessional(){
  app.classList.remove('confessional-open'); confessional.classList.remove('active'); confessional.setAttribute('aria-hidden','true');
}
if(cta) cta.addEventListener('click', openConfessional);
if(backBtn) backBtn.addEventListener('click', closeConfessional);
if(scrollHint) scrollHint.addEventListener('click', openConfessional);

function updateClock(){
  const now = new Date(); let h = now.getHours(); const m = now.getMinutes().toString().padStart(2,'0');
  const am = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12;
  const clock = document.getElementById('clock');
  if(clock) clock.textContent = `${h}:${m} ${am}`;
}
updateClock(); setInterval(updateClock, 30000);
setInterval(()=>{
  const base = 47; const v = Math.floor(Math.random()*8)-3; if(liveCount) liveCount.textContent = Math.max(38, base+v);
}, 3200);

document.querySelectorAll('.sticker').forEach(sticker => {
  let isDragging = false; let startX, startY, initialX, initialY;
  sticker.addEventListener('pointerdown', (e) => {
    isDragging = true; sticker.style.zIndex = 10;
    startX = e.clientX; startY = e.clientY;
    initialX = sticker.offsetLeft; initialY = sticker.offsetTop;
    sticker.setPointerCapture(e.pointerId);
  });
  sticker.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX; const dy = e.clientY - startY;
    sticker.style.left = `${initialX + dx}px`; sticker.style.top = `${initialY + dy}px`;
  });
  sticker.addEventListener('pointerup', (e) => {
    isDragging = false; sticker.style.zIndex = 4;
    sticker.releasePointerCapture(e.pointerId);
  });
});

let logoClicks = 0; let eggUnlocked = false;
document.querySelectorAll('.logo, .conf-logo').forEach(logo => {
  logo.addEventListener('click', () => {
    if(eggUnlocked) return;
    logoClicks++;
    if(logoClicks >= 5) { eggUnlocked = true; triggerEasterEgg(); }
    setTimeout(() => logoClicks = 0, 2000);
  });
});

function triggerEasterEgg() {
  document.body.classList.add('glitch-active');
  setTimeout(() => document.body.classList.remove('glitch-active'), 600);
  pizzas['widowmaker'] = { id:'widowmaker', name:'THE WIDOWMAKER', desc:'UNLISTED. Ghost pepper, hot honey, regret.', price:666, img:'pizza-spicy-bad-decision.jpg', tag:'SECRET MENU', type:'pizza' };
  for(let key in map) map[key].unshift('widowmaker');
}

const fomoTicker = document.getElementById('fomoTicker');
const locations = ['Bandra', 'Thane', 'Powai', 'Andheri', 'Juhu'];
const actions = ['just confessed: "high af"', 'just confessed: "drunk munchies"', 'just added TRUFFLE MUSHROOM', 'just added VODKA SAUCE', 'is ordering 3 pizzas'];
function showFomo() {
  const loc = locations[Math.floor(Math.random() * locations.length)];
  const act = actions[Math.floor(Math.random() * actions.length)];
  if(!fomoTicker) return;
  fomoTicker.innerHTML = `someone in <strong>${loc}</strong> ${act}`;
  fomoTicker.classList.add('show');
  setTimeout(() => fomoTicker.classList.remove('show'), 4000);
}
function scheduleFomo() { setTimeout(() => { showFomo(); scheduleFomo(); }, Math.random() * 7000 + 8000); }
setTimeout(scheduleFomo, 3000);

const pizzas = {
  truffle: { id:'truffle', name:'TRUFFLE MUSHROOM', desc:'for when you are too high to function. earthy, buttery, illegal-good.', price:499, img:'pizza-truffle-flex.jpg', tag:'stoner fav', type:'pizza' },
  carbonara: { id:'carbonara', name:'CARBONARA', desc:'bacon, egg, black pepper. drunk food engineered in a lab.', price:449, img:'pepperoni-pizza.jpg', tag:'post-gym sin', type:'pizza' },
  margherita: { id:'margherita', name:'MARGHERITA', desc:'classic. simple. like your ex should have been.', price:349, img:'pizza-cheesy-chaos.jpg', tag:'heartbreak cure', type:'pizza' },
  vodka: { id:'vodka', name:'VODKA SAUCE', desc:'spicy, creamy, chaotic. for fucked up days only.', price:479, img:'pizza-spicy-bad-decision.jpg', tag:'work rage', type:'pizza' },
  fig: { id:'fig', name:'FIG & HOT HONEY', desc:'sweet, salty, bougie. for pretending you are okay.', price:529, img:'pizza-golden-drip.jpg', tag:'bored & sad', type:'pizza' },
  pepperoni: { id:'pepperoni', name:'CULT PEPPERONI', desc:'cupped pepperoni holding grease like a tiny chalice.', price:449, img:'pepperoni-pizza.jpg', tag:'classic', type:'pizza' },
  bbq: { id:'bbq', name:'WHITE TRASH BBQ', desc:'chicken, red onion, heavy ranch drizzle. unapologetic.', price:499, img:'pizza-spicy-bad-decision.jpg', tag:'chaos', type:'pizza' },
  meat: { id:'meat', name:'THE MEAT SWEATS', desc:'every animal we legally could put on a pizza.', price:599, img:'pizza-spicy-bad-decision.jpg', tag:'protein', type:'pizza', filter:'saturate(1.8) contrast(1.1)' },
  vegan: { id:'vegan', name:'THE VEGAN APOLOGY', desc:'roasted garlic, kale, fake cheese that actually bangs.', price:549, img:'pizza-truffle-flex.jpg', tag:'plant based', type:'pizza', filter:'hue-rotate(15deg) saturate(0.8)' },
  knots: { id:'knots', name:'GARLIC KNOT GANG', desc:'drenched in garlic butter and parmesan. anti-vampire.', price:199, img:'garlic-knots.png', tag:'side hustle', type:'side' },
  fries: { id:'fries', name:'LOADED FRIES AF', desc:'drowning in liquid cheese and bacon. heavy.', price:249, img:'loaded-fries.png', tag:'carb load', type:'side' },
  tfries: { id:'tfries', name:'TRUFFLE PARM FRIES', desc:'bougie fries because you deserve it.', price:299, img:'loaded-fries.png', tag:'bougie', type:'side', filter:'sepia(0.4) brightness(0.9) contrast(1.2)' },
  sticks: { id:'sticks', name:'STRETCHY STICKS', desc:'mozzarella sticks thick enough to cause a blockage.', price:229, img:'mozz-sticks.png', tag:'pull test', type:'side' },
  poppers: { id:'poppers', name:'JALAPENO POPPERS', desc:'stuffed with cream cheese and pure anger.', price:249, img:'mozz-sticks.png', tag:'spicy', type:'side', filter:'hue-rotate(40deg) saturate(1.4)' },
  wings: { id:'wings', name:'WINGS OF FURY', desc:'so hot you will cry. buffalo glazed madness.', price:299, img:'hot-wings.png', tag:'pain', type:'side' },
  gbread: { id:'gbread', name:'ROASTED GARLIC LOAF', desc:'a massive brick of carbs. sleep heavily tonight.', price:279, img:'garlic-knots.png', tag:'coma', type:'side', filter:'brightness(0.7) contrast(1.3)' },
  dessert: { id:'dessert', name:'CINNAMON KNOTS', desc:'sugar crash guaranteed. dipped in vanilla icing.', price:199, img:'garlic-knots.png', tag:'sugar', type:'side', filter:'sepia(0.6) hue-rotate(-20deg) brightness(1.1)' },
  nutella: { id:'nutella', name:'NUTELLA PIZZA', desc:'a 10 inch pizza but dessert. do not tell your dentist.', price:399, img:'nutella-pizza.jpg', tag:'sweet end', type:'side' },
  cola: { id:'cola', name:'ICE COLD COLA', desc:'pure liquid sugar. you need the caffeine.', price:99, img:'cola.png', tag:'hydration', type:'drink' },
  dcola: { id:'dcola', name:'DIET COLA', desc:'the illusion of health.', price:99, img:'cola.png', tag:'skinny', type:'drink', filter:'grayscale(0.4) brightness(1.2) contrast(0.9)' },
  lemonade: { id:'lemonade', name:'SPIKED LEMONADE', desc:'tart, cold, unapologetic.', price:129, img:'lemonade.png', tag:'refresh', type:'drink' },
  matcha: { id:'matcha', name:'ICED MATCHA', desc:'for the aesthetic. tastes like grass but we love it.', price:199, img:'matcha.jpg', tag:'zen', type:'drink' },
  energy: { id:'energy', name:'HEART PALPITATIONS', desc:'unbranded energy drink. it works.', price:149, img:'lemonade.png', tag:'fast', type:'drink', filter:'hue-rotate(-120deg) saturate(1.5)' },
  water: { id:'water', name:'STILL WATER', desc:'you probably need this.', price:49, img:'lemonade.png', tag:'survival', type:'drink' },
  sparkling: { id:'sparkling', name:'SPICY WATER', desc:'carbonated anger. very crisp.', price:79, img:'lemonade.png', tag:'bubbles', type:'drink', filter:'brightness(1.1) contrast(1.3) saturate(0)' },
};

const map = {
  high: ['truffle','bbq','vodka', 'fries', 'tfries', 'nutella', 'cola', 'water'],
  heartbroken: ['margherita','fig','vegan', 'sticks', 'dessert', 'nutella', 'matcha', 'lemonade'],
  drunk: ['carbonara','vodka','meat', 'pepperoni', 'knots', 'poppers', 'gbread', 'cola', 'water'],
  work: ['vodka','truffle','carbonara', 'pepperoni', 'wings', 'dcola', 'energy', 'cola'],
  sleep: ['margherita','truffle','vegan', 'knots', 'gbread', 'dessert', 'lemonade', 'sparkling'],
  gym: ['meat','carbonara','vodka', 'fries', 'wings', 'energy', 'water'],
  studying: ['margherita','bbq','truffle', 'pepperoni', 'sticks', 'poppers', 'energy', 'cola'],
  bored: ['fig','bbq','truffle', 'wings', 'tfries', 'nutella', 'matcha', 'lemonade'],
};

const confessionCopy = {
  high: "you are high. we know. chew slowly.", heartbroken: "they did not deserve you. pizza does.", drunk: "hydration is for tomorrow.",
  work: "your boss cannot hurt you here.", sleep: "insomnia tastes better with cheese.", gym: "that workout was canceled by carbs.",
  studying: "brain cells need grease.", bored: "thane at 2am hits different."
};

const labels = { pizza: "THE MAIN EVENT", side: "SIDES OF REGRET", drink: "LIQUID COURAGE" };

function selectConfession(key){
  currentConfession = key;
  if(step1){ step1.style.opacity = '0'; step1.style.transform = 'translateY(20px)'; }
  setTimeout(()=>{
    if(step1) step1.style.display = 'none'; 
    if(step2) step2.style.display = 'block';
    renderPizzas(key);
    requestAnimationFrame(()=>{ if(step2){ step2.style.opacity = '1'; step2.style.transform = 'translateY(0)'; } });
  }, 250);
}

if(backToConfess) backToConfess.addEventListener('click', ()=>{
  if(step2){ step2.style.opacity = '0'; step2.style.transform = 'translateY(20px)'; }
  setTimeout(()=>{
    if(step2) step2.style.display = 'none'; if(step1) step1.style.display = 'block';
    requestAnimationFrame(()=>{ if(step1){ step1.style.opacity = '1'; step1.style.transform = 'translateY(0)'; } });
  }, 200);
});

function renderPizzas(key){
  if(step2sub) step2sub.textContent = confessionCopy[key] || 'we got you.';
  if(!pizzaGrid) return;
  pizzaGrid.innerHTML = '';
  const picks = map[key] || Object.keys(pizzas);
  const grouped = { pizza: [], side: [], drink: [] };
  picks.forEach(id => { if(pizzas[id]) grouped[pizzas[id].type].push(pizzas[id]); });
  let delayIdx = 0;
  ['pizza', 'side', 'drink'].forEach(type => {
    if(grouped[type].length > 0) {
      const label = document.createElement('div');
      label.className = 'menu-section-label';
      label.textContent = labels[type];
      label.style.opacity = '0';
      pizzaGrid.appendChild(label);
      setTimeout(()=> label.style.opacity = '1', 60*delayIdx);
      delayIdx++;
      grouped[type].forEach(p => {
        const card = document.createElement('article');
        card.className = 'pizza-card'; card.style.opacity = '0'; card.style.transform = 'translateY(20px)';
        card.innerHTML = `
          <div class="pizza-img"><img alt="${p.name}" src="${p.img}"><div class="pizza-tag">${p.tag}</div></div>
          <div class="pizza-info">
            <div class="pizza-name">${p.name}</div>
            <div class="pizza-desc">${p.desc}</div>
            <div class="pizza-foot">
              <div class="pizza-price">₹${p.price}${type === 'pizza' ? '<span>· 10"</span>' : ''}</div>
              <button class="add-btn" data-id="${p.id}">add +</button>
            </div>
          </div>
        `;
        pizzaGrid.appendChild(card);
        setTimeout(()=>{
          card.style.transition = 'opacity .4s ease, transform .4s cubic-bezier(.16,1,.3,1)';
          card.style.opacity = '1'; card.style.transform = 'translateY(0)';
        }, 60*delayIdx);
        delayIdx++;
      });
    }
  });
}

document.querySelectorAll('.confess-btn').forEach(btn => {
  btn.addEventListener('click', () => selectConfession(btn.dataset.confess));
});

if(pizzaGrid) pizzaGrid.addEventListener('click', e=>{
  const btn = e.target.closest('.add-btn'); if(!btn) return;
  const p = pizzas[btn.dataset.id];
  cartItems.push(p); if(cartCount) cartCount.textContent = cartItems.length;
  btn.classList.add('added'); btn.textContent = 'added ✓';
  setTimeout(()=>{ btn.classList.remove('added'); btn.textContent = 'add +'; }, 1000);
});

const cartOverlay = document.getElementById('cartOverlay');
const cartDrawer = document.getElementById('cartDrawer');
const cartItemsList = document.getElementById('cartItemsList');
const cartTotalAmt = document.getElementById('cartTotalAmt');

const cartBtn = document.getElementById('cartBtn');
if(cartBtn) cartBtn.addEventListener('click', ()=>{
  if(cartItems.length === 0){ alert('cart empty — confess first'); return; }
  if(cartItemsList) cartItemsList.innerHTML = cartItems.map(p => `<div class="cart-item-row"><span>${p.name}</span><strong>₹${p.price}</strong></div>`).join('');
  const total = cartItems.reduce((sum, p) => sum + p.price, 0);
  if(cartTotalAmt) cartTotalAmt.textContent = `₹${total}`;
  if(cartOverlay) cartOverlay.classList.add('active'); if(cartDrawer) cartDrawer.classList.add('active');
});

if(cartOverlay) cartOverlay.addEventListener('click', () => { cartOverlay.classList.remove('active'); if(cartDrawer) cartDrawer.classList.remove('active'); });
window.addEventListener('keydown', e=>{ 
  if(e.key==='Escape') {
    if (cartDrawer && cartDrawer.classList.contains('active')) { if(cartOverlay) cartOverlay.classList.remove('active'); cartDrawer.classList.remove('active'); } 
    else if (confessional && confessional.classList.contains('active')) closeConfessional();
  }
});
