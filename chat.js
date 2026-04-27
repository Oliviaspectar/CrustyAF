/* ─── CRUSTY AF — iMessage Chat Simulation ─── */

let userName = '';
const chat = document.getElementById('chat');
const nameGate = document.getElementById('nameGate');
const chatScreen = document.getElementById('chatScreen');
const orderCard = document.getElementById('orderCard');
const nameInput = document.getElementById('nameInput');

// Sound
const popSound = new Audio('https://www.soundjay.com/buttons/sounds/button-16.mp3');
popSound.volume = 0.15;
function playPop() { popSound.currentTime = 0; popSound.play().catch(()=>{}); }

// Haptic
function vibrate(type='light') {
  if (!navigator.vibrate) return;
  navigator.vibrate(type === 'light' ? 10 : 20);
}

// Delay helper
const delay = ms => new Promise(r => setTimeout(r, ms));

// Auto focus
setTimeout(() => { if (nameGate.style.display !== 'none') nameInput.focus(); }, 200);

// Enter key
nameInput.addEventListener('keydown', e => { if (e.key === 'Enter') startChat(); });

function startChat() {
  userName = nameInput.value.trim() || 'bro';
  nameGate.style.opacity = '0';
  setTimeout(() => {
    nameGate.style.display = 'none';
    chatScreen.style.display = 'flex';
    runChat();
  }, 500);
}

function scrollToBottom() {
  chat.scrollTo({ top: chat.scrollHeight, behavior: 'smooth' });
}

function addLeft(text, time) {
  if (time) { const t = document.createElement('div'); t.className='msg-time'; t.textContent=time; chat.appendChild(t); }
  const w = document.createElement('div');
  w.className = 'msg-wrapper left';
  w.innerHTML = `<div class="msg">${text}</div>`;
  chat.appendChild(w);
  playPop(); vibrate('light'); scrollToBottom();
  return w;
}

function addRight(text, time) {
  if (time) { const t = document.createElement('div'); t.className='msg-time'; t.textContent=time; chat.appendChild(t); }
  const w = document.createElement('div');
  w.className = 'msg-wrapper right';
  w.innerHTML = `<div class="msg">${text}</div>`;
  chat.appendChild(w);
  playPop(); vibrate('light'); scrollToBottom();
  return w;
}

function addLeftImage() {
  const w = document.createElement('div');
  w.className = 'msg-wrapper left';
  w.innerHTML = `<div class="msg-img"><img src="assets/images/pizza-midnight-pepperoni.jpg" alt="pizza"></div>`;
  chat.appendChild(w);
  playPop(); vibrate('light'); scrollToBottom();
}

function addSticker() {
  const w = document.createElement('div');
  w.className = 'msg-wrapper left';
  w.innerHTML = `<div class="sticker">🔥</div>`;
  chat.appendChild(w);
  vibrate('light'); scrollToBottom();
}

let typingEl = null;
function showTyping() {
  typingEl = document.createElement('div');
  typingEl.className = 'msg-wrapper left';
  typingEl.innerHTML = `<div class="typing"><span></span><span></span><span></span></div>`;
  chat.appendChild(typingEl);
  scrollToBottom();
}
function hideTyping() {
  if (typingEl) { typingEl.remove(); typingEl = null; }
}

function showDelivered(wrapper) {
  const r = document.createElement('div');
  r.className = 'receipt';
  r.textContent = 'Delivered';
  wrapper.appendChild(r);
}
function showRead(wrapper) {
  const r = wrapper.querySelector('.receipt');
  if (r) { r.textContent = 'Read'; r.classList.add('read'); }
}

async function runChat() {
  await delay(600);
  addLeft(`bro ${userName} im starving`, '2:14 AM');

  await delay(1200 + Math.random()*400);
  showTyping();
  await delay(900 + Math.random()*600);
  hideTyping();
  addRight(`same. everything's closed`, '2:15 AM');

  await delay(1000 + Math.random()*500);
  addLeft(`wait crust af is open till 4`, '2:16 AM');

  await delay(700);
  showTyping();
  await delay(1400 + Math.random()*800);
  hideTyping();
  addRight(`no way`, '2:16 AM');

  await delay(700);
  addLeftImage();

  await delay(900);
  addSticker();

  await delay(1200);
  showTyping();
  await delay(1200 + Math.random()*600);
  hideTyping();

  const linkMsg = addRight(`link?`, '2:17 AM');

  await delay(400);
  showDelivered(linkMsg);

  await delay(900);
  showRead(linkMsg);

  await delay(300);
  orderCard.classList.add('show');
  vibrate('medium');

  orderCard.querySelector('.card-app').animate([
    { transform:'translateY(140%)' },
    { transform:'translateY(-6px)' },
    { transform:'translateY(0)' }
  ], { duration:600, easing:'cubic-bezier(.16,1,.3,1)' });
}
