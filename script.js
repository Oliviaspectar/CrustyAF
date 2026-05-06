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
cta.addEventListener('click', openConfessional);
backBtn.addEventListener('click', closeConfessional);
scrollHint.addEventListener('click', openConfessional);

function updateClock(){
  const now = new Date(); let h = now.getHours(); const m = now.getMinutes().toString().padStart(2,'0');
  const am = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12;
  document.getElementById('clock').textContent = `${h}:${m} ${am}`;
}
updateClock(); setInterval(updateClock, 30000);
setInterval(()=>{
  const base = 47; const v = Math.floor(Math.random()*8)-3; liveCount.textContent = Math.max(38, base+v);
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
  fomoTicker.innerHTML = `someone in <strong>${loc}</strong> ${act}`;
  fomoTicker.classList.add('show');
  setTimeout(() => fomoTicker.classList.remove('show'), 4000);
}
function scheduleFomo() { setTimeout(() => { showFomo(); scheduleFomo(); }, Math.random() * 7000 + 8000); }
setTimeout(scheduleFomo, 3000);

const pizzas = {
  // --- MAIN EVENT ---
  truffle: { id:'truffle', name:'TRUFFLE MUSHROOM', desc:'for when you’re too high to function. earthy, buttery, illegal-good.', price:499, img:'pizza-truffle-flex.jpg', tag:'stoner fav', type:'pizza' },
  carbonara: { id:'carbonara', name:'CARBONARA', desc:'bacon, egg, black pepper. drunk food engineered in a lab.', price:449, img:'pepperoni-pizza.jpg', tag:'post-gym sin', type:'pizza' },
  margherita: { id:'margherita', name:'MARGHERITA', desc:'classic. simple. like your ex should’ve been.', price:349, img:'pizza-cheesy-chaos.jpg', tag:'heartbreak cure', type:'pizza' },
  vodka: { id:'vodka', name:'VODKA SAUCE', desc:'spicy, creamy, chaotic. for fucked up days only.', price:479, img:'pizza-spicy-bad-decision.jpg', tag:'work rage', type:'pizza' },
  fig: { id:'fig', name:'FIG & HOT HONEY', desc:'sweet, salty, bougie. for pretending you’re okay.', price:529, img:'pizza-golden-drip.jpg', tag:'bored & sad', type:'pizza' },
  pepperoni: { id:'pepperoni', name:'CULT PEPPERONI', desc:'cupped pepperoni holding grease like a tiny chalice.', price:449, img:'pepperoni-pizza.jpg', tag:'classic', type:'pizza' },
  bbq: { id:'bbq', name:'WHITE TRASH BBQ', desc:'chicken, red onion, heavy ranch drizzle. unapologetic.', price:499, img:'pizza-spicy-bad-decision.jpg', tag:'chaos', type:'pizza' },
  meat: { id:'meat', name:'THE MEAT SWEATS', desc:'every animal we legally could put on a pizza.', price:599, img:'pizza-spicy-bad-decision.jpg', tag:'protein', type:'pizza', filter:'saturate(1.8) contrast(1.1)' },
  vegan: { id:'vegan', name:'THE VEGAN APOLOGY', desc:'roasted garlic, kale, fake cheese that actually bangs.', price:549, img:'pizza-truffle-flex.jpg', tag:'plant based', type:'pizza', filter:'hue-rotate(15deg) saturate(0.8)' },

  // --- SIDES ---
  knots: { id:'knots', name:'GARLIC KNOT GANG', desc:'drenched in garlic butter & parmesan. anti-vampire.', price:199, img:'garlic-knots.png', tag:'side hustle', type:'side' },
  fries: { id:'fries', name:'LOADED FRIES AF', desc:'drowning in liquid cheese and bacon. heavy.', price:249, img:'loaded-fries.png', tag:'carb load', type:'side' },
  tfries: { id:'tfries', name:'TRUFFLE PARM FRIES', desc:'bougie fries because you deserve it.', price:299, img:'loaded-fries.png', tag:'bougie', type:'side', filter:'sepia(0.4) brightness(0.9) contrast(1.2)' },
  sticks: { id:'sticks', name:'STRETCHY STICKS', desc:'mozzarella sticks thick enough to cause a blockage.', price:229, img:'mozz-sticks.png', tag:'pull test', type:'side' },
  poppers: { id:'poppers', name:'JALAPENO POPPERS', desc:'stuffed with cream cheese and pure anger.', price:249, img:'mozz-sticks.png', tag:'spicy', type:'side', filter:'hue-rotate(40deg) saturate(1.4)' },
  wings: { id:'wings', name:'WINGS OF FURY', desc:'so hot you will cry. buffalo glazed madness.', price:299, img:'hot-wings.png', tag:'pain', type:'side' },
  gbread: { id:'gbread', name:'ROASTED GARLIC LOAF', desc:'a massive brick of carbs. sleep heavily tonight.', price:279, img:'garlic-knots.png', tag:'coma', type:'side', filter:'brightness(0.7) contrast(1.3)' },
  dessert: { id:'dessert', name:'CINNAMON KNOTS', desc:'sugar crash guaranteed. dipped in vanilla icing.', price:199, img:'garlic-knots.png', tag:'sugar', type:'side', filter:'sepia(0.6) hue-rotate(-20deg) brightness(1.1)' },
  nutella: { id:'nutella', name:'NUTELLA PIZZA', desc:'a 10" pizza but dessert. do not tell your dentist.', price:399, img:'nutella-pizza.jpg', tag:'sweet end', type:'side' },

  // --- DRINKS ---
  cola: { id:'cola', name:'ICE COLD COLA', desc:'pure liquid sugar. you need the caffeine.', price:99, img:'cola.png', tag:'hydration', type:'drink' },
  dcola: { id:'dcola', name:'DIET COLA', desc:'the illusion of health.', price:99, img:'cola.png', tag:'skinny', type:'drink', filter:'grayscale(0.4) brightness(1.2) contrast(0.9)' },
  lemonade: { id:'lemonade', name:'SPIKED LEMONADE', desc:'tart, cold, unapologetic.', price:129, img:'lemonade.png', tag:'refresh', type:'drink' },
  matcha: { id:'matcha', name:'ICED MATCHA', desc:'for the aesthetic. tastes like grass but we love it.', price:199, img:'matcha.jpg', tag:'zen', type:'drink' },
  energy: { id:'energy', name:'HEART PALPITATIONS', desc:'unbranded energy drink. it works.', price:149, img:'lemonade.png', tag:'fast', type:'drink', filter:'hue-rotate(-120deg) saturate(1.5)' },
  water: { id:'water', name:'STILL WATER', desc:'you probably need this.', price:49, img:'lemonade.png', tag:'survival', type:'drink' },
  sparkling: { id:'sparkling', name:'SPICY WATER', desc:'carbonated anger. very crisp.', price:79, img:'lemonade.png', tag:'bubbles', type:'drink', filter:'brightness(1.1) contrast(1.3) saturate(0)' },
};
