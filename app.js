/* VeraSole storefront prototype — sample catalog and simulated checkout. Not production code. */
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const rs = n => 'Rs ' + Number(n).toLocaleString('en-PK');
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => String(a + i));

const DELIVERY = { code: 'flatrate', title: 'Standard delivery', note: 'Flat rate across Pakistan. Delivery time to be confirmed.', fee: 150 };
const CATS = {
  all: { name: 'All footwear', note: 'Every pair in the VeraSole catalog.' },
  chappals: { name: 'Chappals', note: 'Peshawari classics and easy slides.' },
  sandals: { name: 'Sandals', note: 'Open styles for warmer days.' },
  shoes: { name: 'Shoes', note: 'Knit slip-ons for everyday wear.' },
  'school-shoes': { name: 'School shoes', note: 'Black school shoes in a range of sizes.' },
};
const HEX = { Black: '#222222', Brown: '#684536', Coffee: '#513a32', Camel: '#bc8958', Khaki: '#9b7a4e', Tan: '#ac784c', Navy: '#24344d', Pink: '#d9a79c', Taupe: '#9a8274' };

const img = (n, alt) => ({ src: `img/${n}.jpg`, card: `img/${n}-card.jpg`, alt });
const shots = (n, d) => [img(`${n}-studio`, `${d}, on a light studio backdrop`), img(`${n}-noir`, `${d}, on a dark studio backdrop`), img(`${n}-close`, `Close-up: ${d}`)];
const P = [
  { id: 'peshawari-camel', sku: 'VS-PSH-02', name: 'Suede-Finish Peshawari Chappal', brand: '', cat: 'chappals', who: 'Men', price: 4000, was: 5000, sizes: range(40, 45),
    desc: 'A Peshawari chappal with a soft suede-finish upper, contrast stitching along the welt and a buckled heel strap.',
    colors: [{ name: 'Camel', imgs: shots('peshawari-camel', 'Camel suede-finish Peshawari chappal with buckled heel strap, side view') }],
    stock: { 'Camel|45': 0, 'Camel|42': 2 } },
  { id: 'peshawari-coffee', sku: 'VS-PSH-01', name: 'Classic Peshawari Chappal', brand: '', cat: 'chappals', who: 'Men', price: 4000, sizes: range(40, 45),
    desc: 'The classic crossover Peshawari shape in a smooth coffee finish, with yellow welt stitching and an adjustable buckle.',
    colors: [{ name: 'Coffee', imgs: shots('peshawari-coffee', 'Coffee brown Peshawari chappal with crossover upper, side view') }],
    stock: {} },
  { id: 'trail-strap-sandal', sku: 'VS-MF-SND-01', name: 'Trail Strap Sandal', brand: 'Marks Fairwale', cat: 'sandals', who: 'Men', price: 1360, was: 2260, sizes: range(39, 45),
    desc: 'A lightweight sandal with woven adjustable straps, a contoured footbed and a cushioned white sole.',
    colors: [{ name: 'Khaki', imgs: shots('trail-sandal-khaki', 'Khaki woven-strap sandal with contoured footbed, top view') }],
    stock: { 'Khaki|39': 0, 'Khaki|45': 1 } },
  { id: 'go-ran-knit-slip-on', sku: 'VS-MF-SHO-01', name: 'Go Ran Knit Slip-On', brand: 'Marks', cat: 'shoes', who: 'Men', price: 4000, sizes: range(39, 45), adj: { 44: 200, 45: 200 },
    desc: 'A breathable knit slip-on with a stretch collar, heel pull tab and a ridged white sole.',
    colors: [
      { name: 'Navy', imgs: shots('knit-slipon-navy', 'Navy knit slip-on shoe with white sole, side view') },
      { name: 'Taupe', imgs: shots('knit-slipon-taupe', 'Taupe knit slip-on shoe with white sole, side view') },
    ],
    stock: { 'Navy|40': 0, 'Navy|41': 2, 'Taupe|43': 0, 'Taupe|44': 1 } },
  { id: 'beaded-block-heel-sandal', sku: 'VS-WJ-SND-01', name: 'Beaded Block-Heel Sandal', brand: 'Wej', cat: 'sandals', who: 'Women', price: 3500, sizes: range(36, 41),
    desc: 'A dressy ankle-strap sandal with a beaded toe band in pearl, black and gold tones on a low block heel.',
    colors: [{ name: 'Black', imgs: shots('beaded-heel-black', 'Black block-heel sandal with beaded toe band and ankle strap') }],
    stock: { 'Black|36': 0, 'Black|41': 0, 'Black|38': 2 } },
  { id: 'ruched-slingback-sandal', sku: 'VS-WJ-SND-02', name: 'Ruched Slingback Sandal', brand: 'Wej', cat: 'sandals', who: 'Women', price: 2800, was: 3500, sizes: range(36, 41),
    desc: 'A tan slingback with a ruched toe band edged in sparkle trim and an elastic strap over the foot.',
    colors: [{ name: 'Tan', imgs: shots('ruched-slingback-tan', 'Tan slingback sandal with ruched toe band and sparkle trim') }],
    stock: { 'Tan|38': 1 } },
  { id: 'double-strap-comfort-slide', sku: 'VS-MF-CHP-01', name: 'Double-Strap Comfort Slide', brand: 'Marks Fairwale', cat: 'chappals', who: 'Men', price: 1300, was: 1860, sizes: range(39, 45),
    desc: 'An easy two-strap slide with a metal buckle, a soft padded footbed and a thick cushioned sole.',
    colors: [{ name: 'Brown', imgs: shots('comfort-slide-brown', 'Brown double-strap slide with metal buckle and cream sole') }],
    stock: { 'Brown|42': 2 } },
  { id: 'crossover-buckle-slide', sku: 'VS-WJ-CHP-01', name: 'Crossover Buckle Slide', brand: 'Wej', cat: 'chappals', who: 'Women', price: 2200, sizes: range(36, 41),
    desc: 'A soft pink slide with padded crossover straps and a gold-tone buckle.',
    colors: [{ name: 'Pink', imgs: shots('crossover-slide-pink', 'Pink slide with padded crossover straps and gold-tone buckle') }],
    stock: {} },
  { id: 'embossed-buckle-slide', sku: 'VS-WJ-CHP-02', name: 'Embossed Buckle Slide', brand: 'Wej', cat: 'chappals', who: 'Women', price: 2400, was: 3200, sizes: range(36, 41),
    desc: 'A black slide with an embossed toe strap, an oversized buckle and a chunky white sole.',
    colors: [{ name: 'Black', imgs: shots('embossed-slide-black', 'Black slide with embossed toe strap, large buckle and white sole') }],
    stock: { 'Black|37': 0 } },
  { id: 'm-knit-slip-on', sku: 'VS-MF-SHO-02', name: 'M Knit Slip-On', brand: 'Marks Fairwale', cat: 'shoes', who: 'Men', price: 4000, sizes: range(39, 45),
    desc: 'An all-black knit slip-on with a reinforced toe, an embroidered M logo and a layered cushioned sole.',
    colors: [{ name: 'Black', imgs: shots('m-knit-black', 'All-black knit slip-on shoe with embroidered M logo') }],
    stock: { 'Black|39': 0 } },
  { id: 'bata-school-321-6146', sku: '321 6146', name: 'Bata 321 6146 School Shoe', brand: 'Bata', cat: 'school-shoes', who: 'Kids', price: 3300, sizes: range(1, 9),
    desc: 'A black school shoe for uniform days. Product photo pending.',
    colors: [{ name: 'Black', imgs: [] }], stock: {} },
  { id: 'bata-school-321-6181', sku: '321 6181', name: 'Bata 321 6181 School Shoe', brand: 'Bata', cat: 'school-shoes', who: 'Kids', price: 1800, sizes: range(1, 9),
    desc: 'A black school shoe for uniform days. Product photo pending.',
    colors: [{ name: 'Black', imgs: [] }], stock: 'none' },
];
const byId = id => P.find(p => p.id === id);
const stockOf = (p, c, s) => p.stock === 'none' ? 0 : (p.stock[`${c}|${s}`] ?? 5);
const priceOf = (p, s) => p.price + ((p.adj || {})[s] || 0);
const maxPrice = p => Math.max(...p.sizes.map(s => priceOf(p, s)));
const anyStock = p => p.colors.some(c => p.sizes.some(s => stockOf(p, c.name, s) > 0));
const priceLabel = p => (maxPrice(p) > p.price ? 'From ' : '') + rs(p.price);
const wasOf = (p, s) => p.was ? p.was + ((p.adj || {})[s] || 0) : 0;
const pctOff = p => p.was ? Math.round((1 - p.price / p.was) * 100) : 0;
const priceHTML = (p, s, mult = 1) => {
  const now = (s ? priceOf(p, s) : p.price) * mult, was = (s ? wasOf(p, s) : p.was) * mult;
  const from = !s && maxPrice(p) > p.price ? 'From ' : '';
  return was > now
    ? `<span class="price"><ins><span class="sr">Sale price </span>${from}${rs(now)}</ins><del><span class="sr">was </span>${rs(was)}</del></span>`
    : `<span class="price">${from}${rs(now)}</span>`;
};
const saving = () => S.cart.reduce((n, l) => { const p = byId(l.id); return n + (wasOf(p, l.size) ? (wasOf(p, l.size) - priceOf(p, l.size)) * l.qty : 0); }, 0);
const PRICE_BANDS = { lo: ['Under Rs 2,000', p => p.price < 2000], mid: ['Rs 2,000 – 3,499', p => p.price >= 2000 && p.price < 3500], hi: ['Rs 3,500 and over', p => p.price >= 3500] };
const SORTS = { featured: 'Featured', 'price-asc': 'Price: low to high', 'price-desc': 'Price: high to low', name: 'Name: A to Z' };
const POPULAR = ['peshawari', 'sandals', 'black', 'slip-on', 'Wej'];
const SYN = { slipper: 'chappal', slippers: 'chappal', slide: 'chappal slide', slides: 'chappal slide', sneaker: 'shoes', sneakers: 'shoes', joggers: 'shoes', ladies: 'women', mens: 'men', kheri: 'peshawari', school: 'school-shoes' };

/* ---------- state ---------- */
const store = { get(k, d) { try { return JSON.parse(sessionStorage.getItem(k)) ?? d; } catch { return d; } }, set(k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch {} } };
const S = { cart: store.get('vs-cart', []), pdp: {}, co: store.get('vs-co', { step: 1, f: { province: '' }, errors: {} }), order: store.get('vs-order', null), drawer: false, focusKey: null };
const SAMPLE_ORDERS = [
  { no: 'VS-2977', date: '12 Nov 2026', status: 2, sample: true, f: { first: 'Sana', last: 'Khan', phone: '0300 1234567', address: 'House 12, Street 4, Gulberg III', city: 'Lahore', province: 'Punjab', postcode: '54660' },
    lines: [{ id: 'trail-strap-sandal', name: 'Trail Strap Sandal', color: 'Khaki', size: '42', qty: 1, total: 1360 }, { id: 'crossover-buckle-slide', name: 'Crossover Buckle Slide', color: 'Pink', size: '38', qty: 1, total: 2200 }], sub: 3560, total: 3710 },
  { no: 'VS-2841', date: '2 Nov 2026', status: 3, sample: true, f: { first: 'Sana', last: 'Khan', phone: '0300 1234567', address: 'House 12, Street 4, Gulberg III', city: 'Lahore', province: 'Punjab', postcode: '54660' },
    lines: [{ id: 'peshawari-coffee', name: 'Classic Peshawari Chappal', color: 'Coffee', size: '42', qty: 1, total: 4000 }], sub: 4000, total: 4150 },
];
const SAMPLE_ADDR = [
  { label: 'Home', name: 'Sana Khan', phone: '0300 1234567', address: 'House 12, Street 4, Gulberg III', city: 'Lahore', province: 'Punjab', postcode: '54660' },
  { label: 'Office', name: 'Sana Khan', phone: '0300 1234567', address: 'Plot 5, Block 6, PECHS', city: 'Karachi', province: 'Sindh', postcode: '75400' },
];
Object.assign(S, {
  wish: store.get('vs-wish', ['beaded-block-heel-sandal', 'peshawari-camel', 'm-knit-slip-on']),
  orders: store.get('vs-orders', SAMPLE_ORDERS),
  addr: store.get('vs-addr', SAMPLE_ADDR),
  profile: store.get('vs-profile', { name: 'Sana Khan', phone: '0300 1234567', email: '', whatsapp: true }),
  addrForm: null, addrErr: {},
});
const saveCart = () => { store.set('vs-cart', S.cart); bag(); };
const saveWish = () => { store.set('vs-wish', S.wish); bag(); };
const cartQty = () => S.cart.reduce((n, l) => n + l.qty, 0);
const subtotal = () => S.cart.reduce((n, l) => n + l.qty * priceOf(byId(l.id), l.size), 0);
function bag() {
  const n = cartQty(), el = $('#bag-count');
  el.hidden = !n; el.textContent = n;
  $('#bag-link').setAttribute('aria-label', n ? `Bag, ${n} item${n > 1 ? 's' : ''}` : 'Bag, empty');
  const w = S.wish.length, wl = $('#wish-count');
  wl.hidden = !w; wl.textContent = w;
  $('#wish-link').setAttribute('aria-label', w ? `Wishlist, ${w} item${w > 1 ? 's' : ''}` : 'Wishlist, empty');
}

/* ---------- routing ---------- */
function route() {
  const h = location.hash.replace(/^#\/?/, ''); const [path, qs = ''] = h.split('?');
  return { parts: path.split('/').filter(Boolean), q: new URLSearchParams(qs), path };
}
function setParams(q, key) {
  const { path } = route(); const s = q.toString();
  history.replaceState(null, '', '#/' + path + (s ? '?' + s : ''));
  S.focusKey = key || null; render(true);
}
let lastPath = null;
function render(keepScroll) {
  const r = route(), [a, b] = r.parts; let html, title = 'VeraSole';
  document.body.classList.remove('has-sticky');
  if (!a) { html = home(); title = 'True comfort. Every step.'; }
  else if (a === 'c' && CATS[b]) { html = listing({ kind: 'cat', slug: b, q: r.q }); title = CATS[b].name; }
  else if (a === 'search') { html = listing({ kind: 'search', q: r.q }); title = 'Search'; }
  else if (a === 'p' && byId(b)) { html = pdp(byId(b), r.q); title = byId(b).name; }
  else if (a === 'cart') { html = cart(); title = 'Your bag'; }
  else if (a === 'checkout') { html = checkout(); title = 'Checkout'; }
  else if (a === 'account') { html = account(b || 'overview', r.parts[2]); title = 'My account'; }
  else if (a === 'done') { html = done(); title = 'Order received'; }
  else if (a === 'page') { html = page(b); title = 'Help'; }
  else html = `<div class="shell prose"><h1>Page not found</h1><p>That page doesn’t exist.</p><a class="btn" href="#/c/all">Shop all footwear</a></div>`;
  $('#main').innerHTML = pageSeo(r, html);
  document.title = title + ' | VeraSole prototype';
  navs(r);
  if (S.drawer && $('#filter-drawer')) $('#filter-drawer').showModal(); else S.drawer = false;
  if (S.focusKey) { const el = document.querySelector(`[data-key="${CSS.escape(S.focusKey)}"]`); if (el) el.focus({ preventScroll: true }); S.focusKey = null; }
  else if (!keepScroll && lastPath !== null && lastPath !== r.path) { window.scrollTo(0, 0); }
  lastPath = r.path;
  heroInit();
}
const shopGroups = [
  ['Men', 'Men', ['chappals', 'sandals', 'shoes'], 'peshawari-camel'],
  ['Women', 'Women', ['chappals', 'sandals'], 'ruched-slingback-sandal'],
  ['Kids', 'Kids', ['school-shoes']],
  ['School shoes', '', []],
];

function navs(r) {
  const [routeType, category] = r.parts;
  const link = (label, slug, who = '') => {
    const href = `#/c/${slug}${who ? '?who=' + who : ''}`;
    const current = routeType === 'c' && category === slug && (r.q.get('who') || '') === who;
    return `<a href="${href}" ${current ? 'aria-current="page"' : ''}>${label}</a>`;
  };
  const groups = shopGroups.map(([label, who, categories, featuredId]) => {
    const items = who
      ? [link('All ' + label.toLowerCase() + ' footwear', 'all', who), ...categories.map(slug => link(CATS[slug].name, slug, who))]
      : [link('All school shoes', 'school-shoes'), '<a href="#/page/size-guide">School shoe size guide</a>'];
    const product = featuredId && byId(featuredId);
    const feature = product
      ? `<a class="menu-feature" href="#/p/${product.id}">
           <img src="${product.colors[0].imgs[0].card}" alt="" width="640" height="800" loading="lazy">
           <span><small>Featured pair</small><strong>${esc(product.name)}</strong><span>${rs(product.price)}${product.was ? ` <s>${rs(product.was)}</s>` : ''} →</span></span>
         </a>`
      : '<a class="menu-feature menu-fit" href="#/page/size-guide"><span><small>School shoe sizing</small><strong>Find the right fit</strong><span>Open size guide →</span></span></a>';
    return `<details class="shop-group"><summary>${label}</summary>
      <div class="shop-submenu"><div class="shop-submenu-inner shell"><div class="submenu-categories"><span class="submenu-title">Shop ${label.toLowerCase()}</span>${items.join('')}</div>${feature}</div></div>
    </details>`;
  }).join('');
  $('#nav').innerHTML = groups + link('All footwear', 'all');
  $('#menu-links').innerHTML = groups + link('All footwear', 'all') + '<a href="#/page/size-guide">Size guide</a><a href="#/page/delivery">Delivery</a>';
}

const desktopNav = $('#nav');
desktopNav.addEventListener('pointerover', event => {
  if (event.pointerType !== 'mouse') return;
  const group = event.target.closest('.shop-group');
  if (!group || group.contains(event.relatedTarget)) return;
  desktopNav.querySelectorAll('.shop-group[open]').forEach(other => {
    if (other !== group) other.open = false;
  });
  group.open = true;
});
desktopNav.addEventListener('pointerout', event => {
  if (event.pointerType !== 'mouse') return;
  const group = event.target.closest('.shop-group');
  if (group && !group.contains(event.relatedTarget) && !group.contains(document.activeElement)) group.open = false;
});
desktopNav.addEventListener('focusout', event => {
  const group = event.target.closest('.shop-group');
  if (group && !group.contains(event.relatedTarget) && !group.matches(':hover')) group.open = false;
});
desktopNav.addEventListener('keydown', event => {
  const group = event.target.closest('.shop-group[open]');
  if (event.key === 'Escape' && group) {
    group.open = false;
    group.querySelector('summary').focus();
  }
});
document.addEventListener('click', event => {
  if (!desktopNav.contains(event.target)) desktopNav.querySelectorAll('.shop-group[open]').forEach(group => { group.open = false; });
});

/* ---------- shared pieces ---------- */
const media = (p, c = p.colors[0], which = 'card') => c.imgs[0]
  ? `<img src="${c.imgs[0][which]}" alt="${esc(c.imgs[0].alt)}" loading="lazy" width="640" height="800">`
  : `<span class="ph"><span><b>${esc(p.sku)}</b>Product photo pending</span></span>`;
function card(p) {
  const out = !anyStock(p);
  return `<article class="card">
    <div class="card-media">${media(p)}${wishBtn(p)}${out ? '<span class="badges"><span class="badge out">Sold out</span></span>' : p.was ? `<span class="badges"><span class="badge sale">−${pctOff(p)}%</span><span class="badge sale-tag">Sale</span></span>` : ''}</div>
    <div class="card-body">
      <span class="brand">${esc(p.brand || CATS[p.cat].name)}</span>
      <a href="#/p/${p.id}">${esc(p.name)}</a>
      ${priceHTML(p)}
      <span class="dots">${p.colors.map(c => `<i class="dot" style="background:${HEX[c.name]}" title="${c.name}"></i>`).join('')} ${p.colors.length > 1 ? p.colors.length + ' colours' : p.colors[0].name} · ${p.sizes[0]}–${p.sizes.at(-1)}</span>
    </div></article>`;
}
const HEART = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 20.3s-7.6-4.6-9.2-9.4C1.6 7.2 4 4 7.4 4c2 0 3.6 1.1 4.6 2.7C13 5.1 14.6 4 16.6 4 20 4 22.4 7.2 21.2 10.9c-1.6 4.8-9.2 9.4-9.2 9.4Z"/></svg>';
const wishBtn = (p, cls = 'wish') => { const on = S.wish.includes(p.id); return `<button class="${cls}" type="button" data-act="wish" data-id="${p.id}" data-key="wish-${p.id}" aria-pressed="${on}" aria-label="${on ? 'Remove' : 'Save'} ${esc(p.name)} ${on ? 'from' : 'to'} wishlist">${HEART}</button>`; };
const grid = (items, cls = '') => `<div class="grid ${cls}">${items.map(card).join('')}</div>`;

/* ---------- home ---------- */
const SLIDES = [
  { video: 'hero-promo', seg: 2, seq: [
    { kicker: 'Men · Peshawari chappals', title: 'True comfort.<br>Every step.', text: 'Suede-finish Peshawari with hand-stitched welts and a buckled heel strap.', cta: ['Shop Peshawari chappals', '#/p/peshawari-camel'] },
    { kicker: 'Men · Knit slip-ons', title: 'Slip on.<br>Head out.', text: 'Breathable knit uppers on a cushioned sole, in navy, taupe and black.', cta: ['Shop knit slip-ons', '#/p/go-ran-knit-slip-on'] },
    { kicker: 'Women · Evening sandals', title: 'Dressed up,<br>still easy.', text: 'Beaded toe band and a low block heel for weddings and evenings out.', cta: ['Shop evening sandals', '#/p/beaded-block-heel-sandal'] },
    { kicker: 'Men · Everyday sandals', title: 'Strap in.<br>Walk all day.', text: 'Woven adjustable straps on a contoured footbed. Now 40% off.', cta: ['Shop strap sandals', '#/p/trail-strap-sandal'] },
    { kicker: 'Women · Easy slides', title: 'Soft straps,<br>easy days.', text: 'Padded crossover slide with a gold-tone buckle.', cta: ['Shop slides', '#/p/crossover-buckle-slide'] },
    { kicker: 'Cash on delivery · across Pakistan', title: 'Check first,<br>pay at the door.', text: 'Chappals, sandals and shoes delivered nationwide. Pay the courier only after you check your parcel.', cta: ['Shop all footwear', '#/c/all'] },
  ] },
  { bg: 'peshawari-camel', kicker: 'Men · Peshawari chappals', title: 'The Peshawari,<br>made for every day.', text: 'Hand-stitched welts, buckled heel straps and soft uppers in camel and coffee.', cta: ['Shop chappals', '#/c/chappals'] },
  { bg: 'beaded-heel-black', kicker: 'Women · Sandals', title: 'Dressed up,<br>still easy.', text: 'Beaded bands, ruched straps and low block heels for evenings out.', cta: ['Shop sandals', '#/c/sandals'] },
  { bg: 'knit-slipon-navy', kicker: 'Men · Knit slip-ons', title: 'Slip on.<br>Head out.', text: 'Breathable knit uppers on a cushioned sole, in navy, taupe and black.', cta: ['Shop shoes', '#/c/shoes'] },
];
const still = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
function hero() {
  const n = SLIDES.length, pad = i => String(i).padStart(2, '0');
  return `<section class="hx" aria-roledescription="carousel" aria-label="Featured collections" id="hero">
      <h1 class="hx-h1 shell">Chappals, sandals and shoes online in Pakistan</h1>
      ${SLIDES.map((s0, i) => { const s = s0.seq ? { ...s0, ...s0.seq[0] } : s0; return `
      <div class="hx-slide" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${n}" ${i ? 'hidden' : ''}>
        <div class="hx-media" aria-hidden="true">${s.video
          ? `<video id="hero-video" muted loop playsinline preload="metadata" data-name="${s.video}"></video>`
          : `<picture><source media="(max-width:479px)" srcset="img/hero-${s.bg}-tall.jpg"><img src="img/hero-${s.bg}-wide.jpg" alt="" width="1920" height="1080" loading="lazy"></picture>`}</div>
        <div class="shell hx-in"><div class="hx-copy" ${s0.seq ? 'id="hx-seq" aria-live="off"' : ''}>
          <p class="eyebrow">${s.kicker}</p>
          <p class="hx-title">${s.title}</p>
          <p class="hx-text">${s.text}</p>
          <div class="hx-actions"><a class="btn gold" href="${s.cta[1]}"><span class="hx-cta">${s.cta[0]}</span> <span aria-hidden="true">→</span></a><span class="hx-cod">Cash on delivery · check your parcel before you pay</span></div>
        </div></div>
      </div>`; }).join('')}
      <div class="shell hx-ctl">
        <span class="hx-count" id="slide-n" aria-hidden="true">${pad(1)} / ${pad(n)}</span>
        <div class="hx-dots">${SLIDES.map((s, i) => `<button data-act="slide-to" data-i="${i}" aria-label="Show slide ${i + 1}" aria-current="${!i}"></button>`).join('')}</div>
        <button class="hx-btn" data-act="slide" data-d="-1" aria-label="Previous slide">←</button>
        <button class="hx-btn" data-act="slide" data-d="1" aria-label="Next slide">→</button>
        <button class="hx-btn" data-act="hero-pause" id="hero-pause" aria-label="Pause banner motion">❚❚</button>
      </div>
    </section>`;
}
const FAQ = [
  ['Do you offer cash on delivery?', 'Yes. Every VeraSole order is cash on delivery. You pay in cash when your order arrives and no card details are needed.'],
  ['What does delivery cost?', 'You’ll see the delivery charge before placing your order.'],
  ['What shoe sizes do you stock?', 'Men’s styles run from EU 39 to 45 and women’s from EU 36 to 41. School shoes use sizes 1 to 9. Each product page lists the sizes available for that style.'],
  ['How do I work out my size?', 'Check the size on a pair you already own, or measure your foot from heel to longest toe and compare it with our size guide.'],
  ['What if my pair is out of stock?', 'We’ll contact you if a pair is unavailable. You can wait for a restock or order another style.'],
  ['Why do some products have no photos?', 'We show the article number until we have a photo of that model.'],
];
const REVIEWS = [
  { name: 'Hamza R.', city: 'Lahore', rating: 5, pid: 'peshawari-camel', date: 'Oct 2026', text: 'Stitching is neat and the sole feels solid. Size 42 fit exactly like my old pair. Checked it at the door before paying, which made it easy to trust.' },
  { name: 'Mehwish A.', city: 'Karachi', rating: 5, pid: 'beaded-block-heel-sandal', date: 'Oct 2026', text: 'Wore them to a mehndi and they were comfortable all evening. The beads look better in person than in the photos.' },
  { name: 'Usman T.', city: 'Islamabad', rating: 4, pid: 'go-ran-knit-slip-on', date: 'Nov 2026', text: 'Light and breathable for daily office walks. Runs slightly snug, so I would go one size up if you are between sizes.' },
  { name: 'Ayesha S.', city: 'Faisalabad', rating: 5, pid: 'crossover-buckle-slide', date: 'Nov 2026', text: 'Soft straps, no rubbing on the first day. Delivery came on time and the courier waited while I checked the box.' },
  { name: 'Bilal K.', city: 'Peshawar', rating: 4, pid: 'trail-strap-sandal', date: 'Sep 2026', text: 'Good grip and the straps adjust well. Great value at the sale price.' },
  { name: 'Fatima Z.', city: 'Multan', rating: 5, pid: 'ruched-slingback-sandal', date: 'Oct 2026', text: 'The tan colour is lovely and goes with everything. Easy exchange process for a different size.' },
];
const stars = (n, size = 16) => `<span class="stars" role="img" aria-label="Rated ${n} out of 5">${[1, 2, 3, 4, 5].map(i => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true" class="${i <= n ? 'on' : ''}"><path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8Z"/></svg>`).join('')}</span>`;
function reviewsSection() {
  const avg = (REVIEWS.reduce((n, r) => n + r.rating, 0) / REVIEWS.length).toFixed(1);
  const dist = [5, 4, 3, 2, 1].map(k => [k, REVIEWS.filter(r => r.rating === k).length]);
  return `<section class="section reviews" aria-labelledby="rev-t">
    <div class="section-head"><div><p class="eyebrow">Customer reviews</p><h2 id="rev-t">Loved on every step</h2></div><span class="sample-note">Sample reviews · prototype</span></div>
    <div class="reviews-in">
      <div class="rev-summary">
        <p class="rev-avg">${avg}<small>/5</small></p>${stars(Math.round(avg), 20)}
        <p class="muted small">Based on ${REVIEWS.length} reviews</p>
        <ul class="rev-dist">${dist.map(([k, n]) => `<li><span>${k}★</span><i style="--w:${(n / REVIEWS.length) * 100}%"></i><span>${n}</span></li>`).join('')}</ul>
      </div>
      <div class="rev-track" tabindex="0" aria-label="Customer reviews, scroll for more">${REVIEWS.map(r => { const p = byId(r.pid); return `
        <article class="rev-card">
          <div class="rev-top">${stars(r.rating)}<span class="muted small">${r.date}</span></div>
          <p class="rev-text">“${esc(r.text)}”</p>
          <a class="rev-product" href="#/p/${p.id}"><img src="${p.colors[0].imgs[0].card}" alt="" width="640" height="800" loading="lazy"><span>${esc(p.name)}</span></a>
          <p class="rev-by"><span class="avatar" aria-hidden="true">${r.name[0]}</span><span><b>${esc(r.name)}</b>${esc(r.city)} · <span class="verified">Verified buyer</span></span></p>
        </article>`; }).join('')}</div>
    </div>
  </section>`;
}
const row = (id, kicker, title, href, items) => `<section class="section" aria-labelledby="${id}">
  <div class="section-head"><div><p class="eyebrow">${kicker}</p><h2 id="${id}">${title}</h2></div><a class="link" href="${href}">View all</a></div>${grid(items, 'four')}</section>`;
function home() {
  const tiles = [['chappals', 'peshawari-coffee'], ['sandals', 'trail-strap-sandal'], ['shoes', 'go-ran-knit-slip-on'], ['school-shoes', null]];
  const count = s => P.filter(p => p.cat === s).length;
  const ids = a => a.map(byId);
  return `${hero()}
    <div class="trustbar"><ul class="shell" aria-label="How ordering works"><li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 9.5v5M18 9.5v5"/></svg><span><b>Cash on delivery</b>Check your parcel before you pay</span></li><li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/></svg><span><b>Prices in PKR</b>Delivery fee shown at checkout</span></li><li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 17v-5c3 0 4-4 7-4 1.5 0 2 2.5 5 3.5l4 1.3c1.4.5 2 1.4 2 2.7V17z"/><path d="M3 17v2h18v-2"/></svg><span><b>Your size, your colour</b>EU 36–45 and school sizes 1–9</span></li></ul></div>
    <div class="shell">
    <section class="section" aria-labelledby="cat-title">
      <div class="section-head"><div><p class="eyebrow">Find the right pair</p><h2 id="cat-title">Shop by category</h2></div><a class="link" href="#/c/all">View all footwear</a></div>
      <div class="cats">${tiles.map(([s, pid]) => pid
        ? `<a class="cat" href="#/c/${s}"><img src="${byId(pid).colors[0].imgs[0].card.replace('-studio-card', '-noir-card')}" alt="" loading="lazy" width="640" height="800"><span class="cat-label"><strong>${CATS[s].name}</strong><span>${count(s)} styles</span></span></a>`
        : `<a class="cat art" href="#/c/${s}"><svg viewBox="0 0 120 60" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 44V22c8 0 12-10 22-10 6 0 8 8 18 12l40 10c14 3 22 6 24 12v6H8Z M8 44h104"/></svg><span class="cat-label"><strong>${CATS[s].name}</strong><span>${count(s)} styles</span></span></a>`).join('')}</div>
    </section>
    ${row('new-t', 'Just in', 'New arrivals', '#/c/all', ids(['trail-strap-sandal', 'go-ran-knit-slip-on', 'ruched-slingback-sandal', 'peshawari-coffee']))}
    <section class="section collection-edit" aria-labelledby="collection-edit-title">
      <div class="section-head"><div><p class="eyebrow">Curated edits</p><h2 id="collection-edit-title">Shop by collection</h2></div><a class="link" href="#/c/all">View all</a></div>
      <div class="collection-edit-grid">
        <a class="collection-tile collection-tile-women" href="#/c/all?who=Women">
          <img src="img/crossover-slide-pink-studio-card.jpg" alt="" width="640" height="800" loading="lazy">
          <div class="collection-tile-copy"><h3>Slides &amp; sandals by Wej</h3><span>Shop women’s <span aria-hidden="true">↗</span></span></div>
        </a>
        <a class="collection-tile collection-tile-men" href="#/c/shoes?who=Men">
          <img src="img/m-knit-black-studio-card.jpg" alt="" width="640" height="800" loading="lazy">
          <div class="collection-tile-copy"><h3>Everyday knit slip-ons</h3><span>Shop men’s shoes <span aria-hidden="true">↗</span></span></div>
        </a>
      </div>
    </section>
    ${row('chp-t', 'Everyday classics', 'Chappals collection', '#/c/chappals', ids(['peshawari-camel', 'double-strap-comfort-slide', 'crossover-buckle-slide', 'embossed-buckle-slide']))}
    ${reviewsSection()}
    </div>
    <section class="seo" aria-labelledby="seo-t"><div class="shell seo-in">
      <div>
        <p class="eyebrow">About VeraSole</p>
        <h2 id="seo-t">Footwear for men, women and kids in Pakistan</h2>
        <p>VeraSole is an online footwear store for Pakistan. We stock <a href="#/c/chappals">Peshawari chappals and slides</a>, <a href="#/c/sandals">sandals</a>, <a href="#/c/shoes">knit slip-on shoes</a> and <a href="#/c/school-shoes">black school shoes</a>, with every price shown in Pakistani rupees.</p>
        <p>Each style comes in a choice of sizes and colours. Men’s pairs run from EU 39 to EU 45, women’s from EU 36 to EU 41, and school shoes from size 1 to 9. If you’re between sizes, the <a href="#/page/size-guide">size guide</a> shows how to measure your foot at home.</p>
        <p>Ordering is simple: choose your pair, tell us where to send it and <a href="#/page/payment">pay cash on delivery</a>. The <a href="#/page/delivery">delivery charge</a> is shown before you place your order.</p>
        <h3>Popular right now</h3>
        <p class="chips">${[['Peshawari chappals', 'peshawari'], ['Black sandals', 'black sandal'], ['Slip-on shoes', 'slip-on'], ['Women’s slides', 'women chappal'], ['School shoes', 'school']].map(([l, q]) => `<a class="chip" href="#/search?q=${encodeURIComponent(q)}">${l}</a>`).join('')}</p>
      </div>
      <div>
        <p class="eyebrow">Help &amp; ordering</p>
        <h2 id="faq-t">Before you order</h2>
        <div class="notes" style="margin-top:1rem">${FAQ.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>
      </div>
    </div></section>`;
}
const HERO_RATE = 0.65, HERO_STILL_MS = 8000;
let slideI = 0, heroPaused = false, heroT = 0;
function heroSync() {
  const h = $('#hero'); if (!h) return;
  const v = $('#hero-video'), b = $('#hero-pause');
  if (v) { v.defaultPlaybackRate = v.playbackRate = HERO_RATE; if (!heroPaused && slideI === 0) v.play().catch(() => {}); else v.pause(); }
  b.textContent = heroPaused ? '▶' : '❚❚';
  b.setAttribute('aria-label', heroPaused ? 'Play banner motion' : 'Pause banner motion');
  clearTimeout(heroT);
  if (!heroPaused) heroT = setTimeout(() => {
    if (h.matches(':hover') || h.contains(document.activeElement)) heroSync(); else showSlide(slideI + 1);
  }, slideI === 0 ? Math.round(12000 / HERO_RATE) : HERO_STILL_MS);
}
function showSlide(i) {
  const el = document.querySelectorAll('#hero .hx-slide'); if (!el.length) return;
  slideI = (i + el.length) % el.length;
  el.forEach((s, n) => { s.hidden = n !== slideI; });
  $('#slide-n').textContent = `${String(slideI + 1).padStart(2, '0')} / ${String(el.length).padStart(2, '0')}`;
  document.querySelectorAll('.hx-dots button').forEach((d, n) => d.setAttribute('aria-current', n === slideI));
  heroSync();
}
const heroMq = matchMedia('(max-width:479px)');
function heroSrc() {
  const v = $('#hero-video'); if (!v) return;
  const base = `img/${v.dataset.name}-${heroMq.matches ? 'tall' : 'wide'}`;
  if (!v.getAttribute('src') || !v.getAttribute('src').startsWith(base)) { v.poster = base + '.jpg?v=2'; v.src = base + '.mp4?v=2'; }
}
heroMq.addEventListener('change', () => { heroSrc(); heroSync(); });
let heroSeg = 0;
function heroSeq(k) {
  const box = $('#hx-seq'), seq = SLIDES[0].seq; if (!box || !seq || k === heroSeg) return;
  heroSeg = k; const c = seq[k];
  box.classList.remove('swap'); void box.offsetWidth; box.classList.add('swap');
  box.querySelector('.eyebrow').textContent = c.kicker;
  box.querySelector('.hx-title').innerHTML = c.title;
  box.querySelector('.hx-text').textContent = c.text;
  box.querySelector('.btn.gold').setAttribute('href', c.cta[1]);
  box.querySelector('.hx-cta').textContent = c.cta[0];
}
function heroInit() {
  clearTimeout(heroT); slideI = 0; heroSeg = 0; if (!$('#hero')) return; heroSrc(); if (still()) heroPaused = true;
  const v = $('#hero-video'), seq = SLIDES[0].seq;
  if (v && seq) v.addEventListener('timeupdate', () => heroSeq(Math.min(seq.length - 1, Math.floor(v.currentTime / SLIDES[0].seg))));
  heroSync();
}
/* ---------- search ---------- */
function searchProducts(query) {
  const toks = query.toLowerCase().replace(/[^\w\s-]/g, ' ').split(/\s+/).filter(Boolean).map(t => SYN[t] || t);
  if (!toks.length) return [];
  return P.map(p => {
    const hay = [p.name, p.brand, p.sku, p.cat, CATS[p.cat].name, p.who, p.desc, ...p.colors.map(c => c.name)].join(' ').toLowerCase();
    const ok = toks.every(t => t.split(' ').some(v => hay.includes(v) || hay.includes(v.replace(/s$/, ''))));
    return ok ? { p, score: toks.filter(t => p.name.toLowerCase().includes(t)).length } : null;
  }).filter(Boolean).sort((a, b) => b.score - a.score).map(x => x.p);
}
function suggest(v) {
  const el = $('#suggest'); v = v.trim();
  const catLinks = Object.entries(CATS).filter(([s, c]) => s !== 'all' && (!v || c.name.toLowerCase().includes(v.toLowerCase()))).map(([s, c]) => `<a class="chip" href="#/c/${s}">${c.name}</a>`).join('');
  if (!v) { el.innerHTML = `<div><h3>Popular searches</h3><div class="chips">${POPULAR.map(t => `<a class="chip" href="#/search?q=${encodeURIComponent(t)}">${t}</a>`).join('')}</div></div><div><h3>Categories</h3><div class="chips">${catLinks}</div></div>`; return; }
  const hits = searchProducts(v);
  el.innerHTML = `<div><h3>${hits.length ? 'Products' : 'No matching products'}</h3>${hits.slice(0, 4).map(p => `<a class="sug-item" href="#/p/${p.id}">${p.colors[0].imgs[0] ? `<img src="${p.colors[0].imgs[0].card}" alt="">` : '<span class="ph"></span>'}<span><b>${esc(p.name)}</b><br><span class="muted small">${esc(p.brand || CATS[p.cat].name)}</span></span>${priceHTML(p)}</a>`).join('')}
    <a class="sug-item" href="#/search?q=${encodeURIComponent(v)}"><span>${hits.length ? `See all ${hits.length} result${hits.length > 1 ? 's' : ''}` : 'Search'} for “<b>${esc(v)}</b>” →</span></a></div>
    <div><h3>Categories</h3><div class="chips">${catLinks || Object.entries(CATS).slice(1).map(([s, c]) => `<a class="chip" href="#/c/${s}">${c.name}</a>`).join('')}</div></div>`;
}
function toggleSearch(open) {
  const bar = $('#searchbar'); bar.hidden = !open;
  $('[data-act="open-search"]').setAttribute('aria-expanded', open);
  if (open) { const r = route(); $('#q').value = r.parts[0] === 'search' ? (r.q.get('q') || '') : ''; suggest($('#q').value); $('#q').focus(); }
}

/* ---------- listing (category + search results) ---------- */
function listing({ kind, slug, q }) {
  const query = (q.get('q') || '').trim();
  const who = q.get('who');
  const audience = ['Men', 'Women', 'Kids'].includes(who) ? who : '';
  const categoryTitle = audience
    ? slug === 'all' ? audience + ' footwear' : audience + ' · ' + CATS[slug].name
    : CATS[slug]?.name;
  const base = kind === 'cat'
    ? P.filter(p => (slug === 'all' || p.cat === slug) && (!audience || p.who === audience))
    : searchProducts(query);
  const sel = { size: (q.get('size') || '').split(',').filter(Boolean), color: (q.get('color') || '').split(',').filter(Boolean), price: (q.get('price') || '').split(',').filter(Boolean) };
  const sort = SORTS[q.get('sort')] ? q.get('sort') : 'featured';
  const match = (p, skip) =>
    (skip === 'size' || !sel.size.length || sel.size.some(s => p.sizes.includes(s))) &&
    (skip === 'color' || !sel.color.length || sel.color.some(c => p.colors.some(x => x.name === c))) &&
    (skip === 'price' || !sel.price.length || sel.price.some(b => PRICE_BANDS[b][1](p)));
  let items = base.filter(p => match(p));
  if (sort === 'price-asc') items.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') items.sort((a, b) => b.price - a.price);
  if (sort === 'name') items.sort((a, b) => a.name.localeCompare(b.name));
  const sizes = [...new Set(base.flatMap(p => p.sizes))].sort((a, b) => a - b);
  const colors = [...new Set(base.flatMap(p => p.colors.map(c => c.name)))].sort();
  const n = (k, v) => base.filter(p => match(p, k) && (k === 'size' ? p.sizes.includes(v) : k === 'color' ? p.colors.some(c => c.name === v) : PRICE_BANDS[v][1](p))).length;
  const filters = id => `<form class="filters" aria-label="Filters" data-filters>
    <fieldset><legend>Size</legend><div class="sizes-f">${sizes.map(s => `<label class="pill-check"><input type="checkbox" data-f="size" value="${s}" data-key="${id}-size-${s}" ${sel.size.includes(s) ? 'checked' : ''} aria-label="Size ${s}"><span>${s}</span></label>`).join('')}</div></fieldset>
    <fieldset><legend>Colour</legend>${colors.map(c => `<label class="check"><input type="checkbox" data-f="color" value="${c}" data-key="${id}-color-${c}" ${sel.color.includes(c) ? 'checked' : ''}><i class="dot" style="background:${HEX[c]}"></i>${c}<span class="n">${n('color', c)}</span></label>`).join('')}</fieldset>
    <fieldset><legend>Price</legend>${Object.entries(PRICE_BANDS).map(([k, [l]]) => `<label class="check"><input type="checkbox" data-f="price" value="${k}" data-key="${id}-price-${k}" ${sel.price.includes(k) ? 'checked' : ''}>${l}<span class="n">${n('price', k)}</span></label>`).join('')}</fieldset>
  </form>`;
  const active = [...sel.size.map(v => ['size', v, 'Size ' + v]), ...sel.color.map(v => ['color', v, v]), ...sel.price.map(v => ['price', v, PRICE_BANDS[v]?.[0] || v])];
  const chips = active.length ? `<div class="active-filters" aria-label="Active filters">${active.map(([k, v, l]) => `<button class="chip active" data-act="rm-filter" data-k="${k}" data-v="${v}" aria-label="Remove filter: ${l}">${l} <span aria-hidden="true">✕</span></button>`).join('')}<button class="link" data-act="clear-filters" data-key="clear">Clear all</button></div>` : '';
  const cnt = `${items.length} style${items.length === 1 ? '' : 's'}`;
  const head = kind === 'cat'
    ? `<nav class="crumb" aria-label="Breadcrumb"><a href="#/">Home</a><span aria-hidden="true">/</span><span>${categoryTitle}</span></nav>
       <header class="list-head"><h1>${categoryTitle}</h1><p>${CATS[slug].note}</p></header>`
    : `<header class="list-head" style="padding-top:1.5rem"><p class="eyebrow">Search results</p><h1>${query ? `“${esc(query)}”` : 'Search'}</h1>
       <form class="q-inline" data-search-inline role="search"><label class="sr" for="q2">Search footwear</label><input id="q2" type="search" value="${esc(query)}" placeholder="Search footwear"><button class="btn">Search</button></form></header>`;
  const cats = `<div class="chips">${Object.entries(CATS).filter(([s]) => s !== 'all').map(([s, c]) => `<a class="chip" href="#/c/${s}${audience ? '?who=' + audience : ''}">${c.name}</a>`).join('')}</div>`;
  if (kind === 'search' && !base.length) {
    return `<div class="shell">${head}<div class="empty" style="margin:1rem 0 3rem">
      <h2>${query ? `No results for “${esc(query)}”` : 'What are you looking for?'}</h2>
      <p class="muted">${query ? 'Check the spelling, try a shorter word, or search by brand, colour or style.' : 'Search by style, brand or colour.'}</p>
      <p class="eyebrow" style="margin-top:1.5rem">Try searching for</p><div class="chips">${POPULAR.map(t => `<a class="chip" href="#/search?q=${encodeURIComponent(t)}">${t}</a>`).join('')}</div>
      <p class="eyebrow" style="margin-top:1.5rem">Or browse a category</p>${cats}</div>
      <section class="section" style="padding-top:0"><h2 style="margin-bottom:1rem">Popular right now</h2>${grid(['peshawari-camel', 'trail-strap-sandal', 'go-ran-knit-slip-on', 'beaded-block-heel-sandal'].map(byId), 'four')}</section></div>`;
  }
  const body = items.length ? grid(items) : `<div class="empty"><h2>No styles match those filters</h2><p class="muted">Try removing a filter, or clear them all to see ${base.length} styles${kind === 'search' ? ' for this search' : ' in ' + CATS[slug].name}.</p><button class="btn" data-act="clear-filters">Clear all filters</button></div>`;
  return `<div class="shell">${head}
    <div class="toolbar">
      <button class="btn ghost only-mobile" data-act="open-filters" data-key="open-filters" style="min-height:44px;padding:.4rem 1.1rem">Filters${active.length ? ` (${active.length})` : ''}</button>
      <span aria-live="polite" id="count"><strong>${cnt}</strong>${kind === 'search' ? ` for “${esc(query)}”` : ''}</span>
      <label><span class="sort-t">Sort <span class="sr">products by</span></span><select data-sort data-key="sort">${Object.entries(SORTS).map(([k, l]) => `<option value="${k}" ${k === sort ? 'selected' : ''}>${l}</option>`).join('')}</select></label>
    </div>${chips}
    <div class="layout"><aside class="filters-desktop" aria-label="Filter products">${filters('d')}</aside><div>${body}</div></div>
    ${kind === 'cat' ? catSeo(slug, audience) : ''}
    <dialog id="filter-drawer" class="drawer drawer-right" aria-label="Filters">
      <div class="drawer-head"><strong>Filters</strong><button class="icon-btn" data-act="close-filters" aria-label="Close filters">✕</button></div>
      ${filters('m')}
      <div class="drawer-foot"><button class="btn ghost" data-act="clear-filters" ${active.length ? '' : 'disabled'}>Clear all</button><button class="btn" data-act="close-filters">Show ${cnt}</button></div>
    </dialog></div>`;
}

/* ---------- product ---------- */
function pdp(p, q) {
  const st = S.pdp[p.id] ||= { color: p.colors[0].name, size: null, qty: 1, img: 0, err: false };
  if (q.get('color') && p.colors.some(c => c.name === q.get('color')) && !st.touched) st.color = q.get('color');
  const c = p.colors.find(x => x.name === st.color); const soldOut = !anyStock(p);
  if (st.size && stockOf(p, c.name, st.size) < 1) st.size = null;
  const left = st.size ? stockOf(p, c.name, st.size) : null;
  if (left) st.qty = Math.min(st.qty, left);
  const price = st.size ? priceOf(p, st.size) : p.price;
  const priceTxt = st.size ? rs(price) : priceLabel(p);
  const was = st.size ? wasOf(p, st.size) : p.was;
  const status = soldOut ? '<span class="status out">Out of stock</span>'
    : !st.size ? '<span class="status idle">Select a size to check availability</span>'
    : left <= 2 ? `<span class="status low">Only ${left} left in ${c.name}, size ${st.size}</span>` : '<span class="status ok">In stock</span>';
  const im = c.imgs[Math.min(st.img, Math.max(c.imgs.length - 1, 0))];
  document.body.classList.add('has-sticky');
  const related = P.filter(x => x.cat === p.cat && x.id !== p.id).concat(P.filter(x => x.cat !== p.cat && x.colors[0].imgs.length)).slice(0, 4);
  return `<div class="shell">
    <nav class="crumb" aria-label="Breadcrumb"><a href="#/">Home</a><span aria-hidden="true">/</span><a href="#/c/${p.cat}">${CATS[p.cat].name}</a><span aria-hidden="true">/</span><span>${esc(p.name)}</span></nav>
    <div class="pdp">
      <section aria-label="Product photos">
        <div class="gallery-main">${im ? `<img src="${im.src}" alt="${esc(im.alt)}" width="1200" height="1500">` : `<span class="ph"><span><b>${esc(p.sku)}</b>Product photo pending</span></span>`}</div>
        ${c.imgs.length > 1 ? `<div class="thumbs">${c.imgs.map((x, i) => `<button data-act="img" data-i="${i}" data-key="img-${i}" aria-pressed="${i === st.img}" aria-label="Show photo ${i + 1} of ${c.imgs.length}"><img src="${x.src}" alt="" loading="lazy"></button>`).join('')}</div>` : ''}
      </section>
      <section class="pdp-info" aria-labelledby="pdp-title">
        <p class="eyebrow">${esc(p.brand || CATS[p.cat].name)} · ${p.who}</p>
        <h1 id="pdp-title" style="font-size:clamp(1.7rem,4vw,2.4rem)">${esc(p.name)}</h1>
        <p class="pdp-price" aria-live="polite">${priceHTML(p, st.size)}${was ? `<span class="save-tag">Save ${rs(was - price)} · ${pctOff(p)}% off</span>` : ''}</p>
        <p aria-live="polite" style="margin:0">${status}</p>
        <p class="muted" style="margin-top:1rem">${esc(p.desc)}</p>
        <fieldset class="opt"><legend>Colour: <span>${c.name}</span></legend>
          <div class="swatches" role="radiogroup" aria-label="Colour">${p.colors.map(x => `<button class="swatch" role="radio" aria-checked="${x.name === c.name}" data-act="color" data-v="${x.name}" data-key="color-${x.name}"><i style="background:${HEX[x.name]}"></i>${x.name}</button>`).join('')}</div>
        </fieldset>
        <fieldset class="opt ${st.err ? 'invalid' : ''}" id="size-opt"><div class="opt-head"><legend style="width:auto;margin:0">Size${p.cat === 'school-shoes' ? '' : ' (EU)'}: <span>${st.size || 'select one'}</span></legend><button type="button" class="link" data-act="size-guide" data-key="sg">Size guide</button></div>
          <div class="sizes" role="radiogroup" aria-label="Size" ${st.err ? 'aria-describedby="size-err"' : ''}>${p.sizes.map(s => { const n = stockOf(p, c.name, s); return `<button class="size" role="radio" aria-checked="${s === st.size}" ${n < 1 ? 'aria-disabled="true"' : ''} data-act="size" data-v="${s}" data-key="size-${s}" aria-label="Size ${s}${n < 1 ? ', out of stock' : ''}">${s}</button>`; }).join('')}</div>
          ${st.err ? '<p class="field-err" id="size-err" role="alert">Please choose a size before adding to your bag.</p>' : ''}
          ${p.adj ? `<p class="muted small" style="margin:.6rem 0 0">Sizes ${Object.keys(p.adj).join(' and ')} are ${rs(Object.values(p.adj)[0])} more.</p>` : ''}
        </fieldset>
        <div class="buy">
          <div class="stepper" role="group" aria-label="Quantity"><button data-act="qty" data-d="-1" data-key="q-" aria-label="Decrease quantity" ${st.qty <= 1 || soldOut ? 'disabled' : ''}>−</button><output aria-live="polite">${st.qty}</output><button data-act="qty" data-d="1" data-key="q+" aria-label="Increase quantity" ${soldOut || (left && st.qty >= left) || st.qty >= 5 ? 'disabled' : ''}>+</button></div>
          <button class="btn" data-act="add" data-key="add" ${soldOut ? 'disabled' : ''}>${soldOut ? 'Out of stock' : 'Add to bag · ' + rs(price * st.qty)}</button>
          ${wishBtn(p, 'wish-lg')}
        </div>
        ${soldOut ? '<p class="muted small" style="margin-top:.8rem">This style is currently unavailable in every size.</p>' : ''}
        <div class="notes">
          <details open><summary>Delivery &amp; payment</summary><p>Check your parcel before paying in cash. ${DELIVERY.title} is ${rs(DELIVERY.fee)} per order, shown again at checkout.</p></details>
          <details><summary>Exchanges</summary><p>Exchange terms will be listed here once confirmed.</p></details>
          <details open><summary>Product details</summary><dl class="spec"><dt>Article</dt><dd>${esc(p.sku)}</dd>${p.brand ? `<dt>Brand</dt><dd>${esc(p.brand)}</dd>` : ''}<dt>Category</dt><dd>${CATS[p.cat].name}</dd><dt>For</dt><dd>${p.who}</dd><dt>Colours</dt><dd>${p.colors.map(c => c.name).join(', ')}</dd><dt>Sizes</dt><dd>${p.sizes[0]}–${p.sizes.at(-1)}${p.cat === 'school-shoes' ? '' : ' (EU)'}</dd><dt>Payment</dt><dd>Cash on delivery</dd></dl><p class="chips pdp-links"><a class="chip" href="#/c/${p.cat}">More ${CATS[p.cat].name.toLowerCase()}</a><a class="chip" href="#/c/all?who=${p.who}">${p.who}’s footwear</a><a class="chip" href="#/page/size-guide">Size guide</a></p></details>
        </div>
      </section>
    </div>
    <section class="section" style="padding-top:0" aria-labelledby="rel"><h2 id="rel" style="margin-bottom:1rem">You may also like</h2>${grid(related, 'four')}</section>
  </div>
  <div class="sticky-buy"><div><strong>${priceHTML(p, st.size)}</strong><small>${st.size ? `${c.name} · size ${st.size}` : 'Select a size'}</small></div><button class="btn" data-act="add" ${soldOut ? 'disabled' : ''}>${soldOut ? 'Out of stock' : 'Add to bag'}</button></div>`;
}
function addToBag(p) {
  const st = S.pdp[p.id];
  if (!st.size) { st.err = true; S.focusKey = 'size-' + (p.sizes.find(s => stockOf(p, st.color, s) > 0) || p.sizes[0]); render(true); $('#size-opt').scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }
  const max = stockOf(p, st.color, st.size), line = S.cart.find(l => l.id === p.id && l.color === st.color && l.size === st.size);
  const have = line ? line.qty : 0, add = Math.min(st.qty, max - have);
  if (add <= 0) return toast(`<strong>You already have all ${max} available in your bag.</strong><div class="row"><a class="btn" href="#/cart">View bag</a></div>`);
  if (line) line.qty += add; else S.cart.push({ id: p.id, color: st.color, size: st.size, qty: add });
  saveCart();
  toast(`<div><strong>Added to bag</strong><br>${esc(p.name)} · ${st.color} · size ${st.size} · qty ${add}${add < st.qty ? ` (only ${max} in stock)` : ''}</div><div class="row"><a class="btn ghost" href="#/cart">View bag (${cartQty()})</a><a class="btn" href="#/checkout">Checkout</a></div>`);
  st.qty = 1; S.focusKey = 'add'; render(true);
}
let toastT;
function toast(html) { const t = $('#toast'); t.innerHTML = html; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => t.hidden = true, 7000); }

/* ---------- cart ---------- */
const lineImg = l => { const p = byId(l.id), c = p.colors.find(x => x.name === l.color); return `<div class="thumb">${media(p, c)}</div>`; };
function totals(withDelivery = true) {
  const sub = subtotal(), off = saving();
  return `<dl class="totals"><div><dt>Subtotal (${cartQty()} item${cartQty() === 1 ? '' : 's'})</dt><dd>${rs(sub)}</dd></div>

    <div><dt>${DELIVERY.title}</dt><dd>${rs(DELIVERY.fee)}</dd></div>
    <div class="grand"><dt>Total</dt><dd>${rs(sub + DELIVERY.fee)}</dd></div></dl>
    ${off ? `<p class="save-note">You’re saving ${rs(off)} on sale items</p>` : ''}
    <p class="muted small" style="margin:.6rem 0 0">Check your parcel before paying the courier in cash.</p>`;
}
function cart() {
  if (!S.cart.length) return `<div class="shell"><div class="empty" style="margin:2rem 0 3rem"><h1 style="font-size:2rem">Your bag is empty</h1><p class="muted">Pick a pair and it will show up here.</p><div class="chips"><a class="btn" href="#/c/all">Shop all footwear</a></div></div></div>`;
  return `<div class="shell"><header class="list-head" style="padding-top:1.5rem"><h1>Your bag</h1></header>
    <div class="two"><section aria-label="Items in your bag">${S.cart.map((l, i) => { const p = byId(l.id), max = stockOf(p, l.color, l.size), u = priceOf(p, l.size); return `
      <article class="line">${lineImg(l)}<div>
        <div class="line-top"><div><h3><a href="#/p/${p.id}?color=${l.color}">${esc(p.name)}</a></h3><p class="muted small" style="margin:.15rem 0 0">Colour: ${l.color} · Size: ${l.size}</p><p class="muted small" style="margin:0">${rs(u)} each${wasOf(p, l.size) ? ` · <s>${rs(wasOf(p, l.size))}</s>` : ''}</p></div><strong>${priceHTML(p, l.size, l.qty)}</strong></div>
        <div class="line-bottom"><div class="stepper" role="group" aria-label="Quantity for ${esc(p.name)}"><button data-act="cart-qty" data-i="${i}" data-d="-1" data-key="c${i}-" aria-label="Decrease quantity" ${l.qty <= 1 ? 'disabled' : ''}>−</button><output>${l.qty}</output><button data-act="cart-qty" data-i="${i}" data-d="1" data-key="c${i}+" aria-label="Increase quantity" ${l.qty >= max ? 'disabled' : ''}>+</button></div>
        ${l.qty >= max ? `<span class="small" style="color:var(--warn)">Max available: ${max}</span>` : ''}
        <button class="link" data-act="cart-rm" data-i="${i}" aria-label="Remove ${esc(p.name)}, ${l.color}, size ${l.size}">Remove</button></div>
      </div></article>`; }).join('')}
      <p style="margin-top:1rem"><a class="link" href="#/c/all">← Continue shopping</a></p></section>
      <aside class="summary" aria-labelledby="sum-t"><h2 id="sum-t">Order summary</h2>${totals()}<a class="btn block" style="margin-top:1rem" href="#/checkout">Checkout</a></aside></div></div>`;
}

/* ---------- checkout ---------- */
const PROVINCES = ['Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Islamabad Capital Territory', 'Gilgit-Baltistan', 'Azad Jammu & Kashmir'];
const FIELDS = [
  ['phone', 'Mobile number', 'tel', 'tel', '', 'Format 03XX XXXXXXX. The courier calls this number.'],
  ['first', 'First name', 'text', 'given-name'], ['last', 'Last name', 'text', 'family-name'],
  ['address', 'Street address', 'text', 'street-address', 'wide', 'House number, street, area or sector.'],
  ['city', 'City', 'text', 'address-level2'], ['province', 'Province', 'select', 'address-level1'],
  ['email', 'Email <small>(optional)</small>', 'email', 'email'],
  ['postcode', 'Postal code <small>(optional)</small>', 'text', 'postal-code'],
];
function validate(f) {
  const e = {}, ph = (f.phone || '').replace(/[\s-]/g, '').replace(/^\+?92/, '0');
  if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = 'Enter a valid email address or leave this blank.';
  if (!/^03\d{9}$/.test(ph)) e.phone = f.phone ? 'Enter an 11-digit mobile number starting with 03.' : 'Enter your mobile number.';
  if (!(f.first || '').trim()) e.first = 'Enter your first name.';
  if (!(f.last || '').trim()) e.last = 'Enter your last name.';
  if ((f.address || '').trim().length < 5) e.address = 'Enter your street address.';
  if (!(f.city || '').trim()) e.city = 'Enter your city.';
  if (!f.province) e.province = 'Choose your province.';
  if (f.postcode && !/^\d{5}$/.test(f.postcode.trim())) e.postcode = 'Postal codes are 5 digits, or leave this blank.';
  return e;
}
function checkout() {
  if (!S.cart.length) return `<div class="shell"><div class="empty" style="margin:2rem 0 3rem"><h1 style="font-size:2rem">Nothing to check out yet</h1><p class="muted">Your bag is empty.</p><div class="chips"><a class="btn" href="#/c/all">Shop all footwear</a></div></div></div>`;
  const { f, errors } = S.co, step = S.co.step > 1 ? 2 : 1, errs = Object.entries(errors);
  const cls = n => n === step ? 'current' : n < step ? 'done' : 'todo';
  const head = (n, t, sum) => `<div class="step-head"><span class="step-n" aria-hidden="true">${n < step ? '✓' : n}</span><h2>${t}</h2>${n < step ? `<button class="link" data-act="co-edit" data-n="${n}" data-key="edit-${n}" aria-label="Edit ${t.toLowerCase()}">Edit</button>` : ''}</div>${n < step ? `<p class="muted small" style="margin:.5rem 0 0 2.4rem">${sum}</p>` : ''}`;
  const field = ([k, label, type, ac, cl = '', hint]) => `<div class="field ${cl}"><label for="f-${k}">${label}</label>${type === 'select'
    ? `<select id="f-${k}" data-co="${k}" autocomplete="${ac}" ${errors[k] ? `aria-invalid="true" aria-describedby="e-${k}"` : ''}><option value="">Select province</option>${PROVINCES.map(p => `<option ${f[k] === p ? 'selected' : ''}>${p}</option>`).join('')}</select>`
    : `<input id="f-${k}" data-co="${k}" type="${type}" autocomplete="${ac}" ${type === 'tel' || k === 'postcode' ? 'inputmode="numeric"' : ''} value="${esc(f[k] || '')}" ${errors[k] ? `aria-invalid="true" aria-describedby="e-${k}"` : hint ? `aria-describedby="h-${k}"` : ''}>`}
    ${errors[k] ? `<p class="field-err" id="e-${k}">${errors[k]}</p>` : hint ? `<p class="hint" id="h-${k}">${hint}</p>` : ''}</div>`;
  return `<div class="shell"><header class="list-head" style="padding-top:1.5rem"><p class="small"><a class="link" href="#/cart">← Back to bag</a></p><h1>Checkout</h1></header>
  <div class="two"><div>
    <p class="checkout-cod"><strong>${rs(subtotal() + DELIVERY.fee)} due on delivery</strong><br>${DELIVERY.title} · ${rs(DELIVERY.fee)}. Inspect your parcel before paying in cash.</p>
    <section class="step ${cls(1)}" aria-labelledby="s1">${head(1, 'Contact &amp; delivery address', `${esc(f.first || '')} ${esc(f.last || '')} · ${esc(f.phone || '')}<br>${esc(f.address || '')}, ${esc(f.city || '')}, ${esc(f.province || '')}`).replace('<h2>', '<h2 id="s1">')}
      ${step === 1 ? `<form class="step-body" data-co-form novalidate>
        ${errs.length ? `<div class="err-box" role="alert" tabindex="-1" id="err-box"><strong>Please fix ${errs.length} field${errs.length > 1 ? 's' : ''} to continue</strong><ul>${errs.map(([k, m]) => `<li><a href="#f-${k}" data-focus="f-${k}">${m}</a></li>`).join('')}</ul></div>` : ''}
        ${S.addr.length ? `<div class="saved-addr"><span class="small muted">Use a saved address</span><div class="chips">${S.addr.map((a, i) => `<button type="button" class="chip" data-act="use-addr" data-i="${i}">${esc(a.label)} · ${esc(a.city)}</button>`).join('')}</div></div>` : ''}
        <div class="form">${FIELDS.map(field).join('')}
          <div class="field wide"><label for="f-country">Country</label><input id="f-country" value="Pakistan" readonly aria-describedby="h-country"><p class="hint" id="h-country">VeraSole delivers within Pakistan.</p></div></div>
        <button class="btn" style="margin-top:1.1rem" data-key="co-next">Review order</button></form>` : ''}</section>
    <section class="step ${cls(2)}" aria-labelledby="s2">${head(2, 'Review &amp; place order', '').replace('<h2>', '<h2 id="s2">')}
      ${step === 2 ? `<div class="step-body">${S.cart.map(l => { const p = byId(l.id); return `<div class="mini">${lineImg(l)}<span style="flex:1"><b>${esc(p.name)}</b>${l.color} · size ${l.size} · qty ${l.qty}</span><strong>${rs(priceOf(p, l.size) * l.qty)}</strong></div>`; }).join('')}
        <p class="muted small" style="margin:.8rem 0">Check your parcel before paying <strong>${rs(subtotal() + DELIVERY.fee)}</strong> in cash. If a pair turns out to be unavailable, we’ll contact you with your options.</p>
        <button class="btn block" data-act="place" data-key="co-next">Place order · ${rs(subtotal() + DELIVERY.fee)}</button></div>` : ''}</section>
  </div>
  <aside class="summary" aria-labelledby="sum-t"><h2 id="sum-t">Order summary</h2>
    ${S.cart.map(l => { const p = byId(l.id); return `<div class="mini">${lineImg(l)}<span style="flex:1"><b>${esc(p.name)}</b>${l.color} · size ${l.size} · qty ${l.qty}</span><span>${rs(priceOf(p, l.size) * l.qty)}</span></div>`; }).join('')}
    <div style="border-top:1px solid var(--line);margin-top:.6rem;padding-top:.9rem">${totals()}</div><p class="small" style="margin:.8rem 0 0"><a class="link" href="#/cart">Edit bag</a></p></aside></div></div>`;
}
function done() {
  const o = S.order;
  if (!o) return `<div class="shell prose"><h1>No recent order</h1><a class="btn" href="#/c/all">Shop all footwear</a></div>`;
  return `<div class="shell"><div class="confirm"><div class="tick" aria-hidden="true">✓</div>
    <p class="eyebrow">Order placed</p><h1>Order received.</h1>
    <p style="font-size:1.1rem;margin-top:.8rem">Order <strong>#${o.no}</strong> · simulated order</p>
    <p class="muted">Thank you for shopping with VeraSole. You’ll pay ${rs(o.total)} in cash when your order arrives. If a pair is unavailable, we’ll contact you on ${esc(o.f.phone)} with your options.</p>
    <div class="summary" style="margin:1.5rem 0">
      ${o.lines.map(l => `<div class="mini"><span style="flex:1"><b>${esc(l.name)}</b>${l.color} · size ${l.size} · qty ${l.qty}</span><span>${rs(l.total)}</span></div>`).join('')}
      <dl class="totals" style="border-top:1px solid var(--line);margin-top:.6rem;padding-top:.9rem"><div><dt>Subtotal</dt><dd>${rs(o.sub)}</dd></div><div><dt>${DELIVERY.title}</dt><dd>${rs(DELIVERY.fee)}</dd></div><div class="grand"><dt>Total · cash on delivery</dt><dd>${rs(o.total)}</dd></div></dl>${o.off ? `<p class="save-note">You saved ${rs(o.off)} on sale items</p>` : ''}
      <p class="small muted" style="margin:1rem 0 0"><strong style="color:var(--ink)">Delivering to</strong><br>${esc(o.f.first)} ${esc(o.f.last)}<br>${esc(o.f.address)}, ${esc(o.f.city)}, ${esc(o.f.province)}${o.f.postcode ? ' ' + esc(o.f.postcode) : ''}, Pakistan</p>
    </div><div class="chips"><a class="btn" href="#/c/all">Continue shopping</a><a class="btn ghost" href="#/account/orders/${o.no}">Track this order</a></div></div></div>`;
}

/* ---------- account ---------- */
const STEPS = ['Placed', 'Confirmed', 'Shipped', 'Delivered'];
const ICON = {
  overview: '<path d="M3 11 12 4l9 7v9H3z"/><path d="M9 20v-6h6v6"/>',
  orders: '<path d="M4 7h16l-1 13H5L4 7Z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',
  wishlist: '<path d="M12 20.3s-7.6-4.6-9.2-9.4C1.6 7.2 4 4 7.4 4c2 0 3.6 1.1 4.6 2.7C13 5.1 14.6 4 16.6 4 20 4 22.4 7.2 21.2 10.9c-1.6 4.8-9.2 9.4-9.2 9.4Z"/>',
  addresses: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
  profile: '<circle cx="12" cy="8" r="3.4"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/>',
};
const ico = k => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[k]}</svg>`;
const statusPill = o => `<span class="pill s${o.status}">${STEPS[o.status]}</span>`;
const orderThumbs = o => o.lines.map(l => { const p = byId(l.id); const c = p && p.colors.find(x => x.name === l.color); return `<span class="thumb">${p ? media(p, c) : ''}</span>`; }).join('');
function addrCard(a, i, actions = true) {
  return `<article class="addr-card ${i === 0 ? 'is-default' : ''}">
    <div class="addr-top"><b>${esc(a.label)}</b>${i === 0 ? '<span class="pill s3">Default</span>' : ''}</div>
    <p>${esc(a.name)}<br>${esc(a.address)}<br>${esc(a.city)}, ${esc(a.province)}${a.postcode ? ' ' + esc(a.postcode) : ''}<br>${esc(a.phone)}</p>
    ${actions ? `<div class="addr-actions"><button class="link" data-act="addr-edit" data-i="${i}" data-key="ae${i}">Edit</button>${i ? `<button class="link" data-act="addr-default" data-i="${i}">Set as default</button><button class="link danger" data-act="addr-rm" data-i="${i}" aria-label="Remove ${esc(a.label)} address">Remove</button>` : ''}</div>` : ''}
  </article>`;
}
function addrFormHTML() {
  const i = S.addrForm, a = i === 'new' ? { label: 'Home', province: '' } : S.addr[i], e = S.addrErr;
  const f = (k, label, type = 'text', ac = '', cl = '') => `<div class="field ${cl}"><label for="a-${k}">${label}</label><input id="a-${k}" name="${k}" type="${type}" autocomplete="${ac}" value="${esc(a[k] || '')}" ${e[k] ? `aria-invalid="true" aria-describedby="ae-${k}"` : ''}>${e[k] ? `<p class="field-err" id="ae-${k}">${e[k]}</p>` : ''}</div>`;
  return `<form class="panel" data-addr-form novalidate aria-labelledby="af-t"><h2 id="af-t" class="panel-title">${i === 'new' ? 'Add a new address' : 'Edit address'}</h2>
    <fieldset class="opt" style="margin:0 0 1rem"><legend>Label</legend><div class="chips">${['Home', 'Office', 'Other'].map(l => `<label class="chip-radio"><input type="radio" name="label" value="${l}" ${a.label === l ? 'checked' : ''}><span>${l}</span></label>`).join('')}</div></fieldset>
    <div class="form">${f('name', 'Full name', 'text', 'name')}${f('phone', 'Mobile number', 'tel', 'tel')}${f('address', 'Street address', 'text', 'street-address', 'wide')}${f('city', 'City', 'text', 'address-level2')}
      <div class="field"><label for="a-province">Province</label><select id="a-province" name="province" ${e.province ? 'aria-invalid="true" aria-describedby="ae-province"' : ''}><option value="">Select province</option>${PROVINCES.map(p => `<option ${a.province === p ? 'selected' : ''}>${p}</option>`).join('')}</select>${e.province ? `<p class="field-err" id="ae-province">${e.province}</p>` : ''}</div>
      ${f('postcode', 'Postal code <small>(optional)</small>', 'text', 'postal-code')}</div>
    <div class="form-actions"><button class="btn" data-key="addr-save">Save address</button><button class="btn ghost" type="button" data-act="addr-cancel">Cancel</button></div></form>`;
}
function account(tab, sub) {
  const pr = S.profile, first = pr.name.split(' ')[0] || 'there', initials = pr.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const tabs = [['overview', 'Overview'], ['orders', 'Orders', S.orders.length], ['wishlist', 'Wishlist', S.wish.length], ['addresses', 'Addresses', S.addr.length], ['profile', 'Profile']];
  const nav = `<nav class="acct-nav" aria-label="My account">${tabs.map(([k, l, n]) => `<a href="#/account${k === 'overview' ? '' : '/' + k}" ${tab === k ? 'aria-current="page"' : ''}>${ico(k)}<span>${l}</span>${n !== undefined ? `<em>${n}</em>` : ''}</a>`).join('')}
    <button class="acct-out" type="button" data-act="signout">Sign out</button></nav>`;
  let body;
  if (tab === 'orders' && sub) {
    const o = S.orders.find(x => String(x.no) === sub);
    body = !o ? `<div class="empty"><h2>Order not found</h2><a class="btn" href="#/account/orders">Back to orders</a></div>` : `
      <p class="small"><a class="link" href="#/account/orders">← All orders</a></p>
      <div class="panel"><div class="panel-head"><div><h1 class="panel-title">Order #${esc(o.no)}</h1><p class="muted small">Placed ${esc(o.date)}${o.sample ? ' · sample order' : ''}</p></div>${statusPill(o)}</div>
        <ol class="timeline">${STEPS.map((t, i) => `<li class="${i <= o.status ? 'done' : ''} ${i === o.status ? 'now' : ''}"><span></span>${t}</li>`).join('')}</ol></div>
      <div class="panel"><h3 class="panel-sub">Items</h3>${o.lines.map(l => { const p = byId(l.id); const c = p && p.colors.find(x => x.name === l.color); return `<div class="mini"><span class="thumb">${p ? media(p, c) : ''}</span><span style="flex:1"><b>${esc(l.name)}</b>${l.color} · size ${l.size} · qty ${l.qty}</span><strong>${rs(l.total)}</strong></div>`; }).join('')}
        <dl class="totals" style="border-top:1px solid var(--line);margin-top:.6rem;padding-top:.9rem"><div><dt>Subtotal</dt><dd>${rs(o.sub)}</dd></div><div><dt>${DELIVERY.title}</dt><dd>${rs(DELIVERY.fee)}</dd></div><div class="grand"><dt>Total · cash on delivery</dt><dd>${rs(o.total)}</dd></div></dl></div>
      <div class="acct-cols"><div class="panel"><h3 class="panel-sub">Delivering to</h3><p class="muted">${esc(o.f.first)} ${esc(o.f.last)}<br>${esc(o.f.address)}<br>${esc(o.f.city)}, ${esc(o.f.province)}<br>${esc(o.f.phone)}</p></div>
        <div class="panel"><h3 class="panel-sub">Payment</h3><p class="muted">Cash on delivery. Check your parcel before paying the courier.</p>${o.status === 3 ? '<a class="btn ghost" href="#/page/feedback">Share feedback</a>' : ''}</div></div>`;
  } else if (tab === 'orders') {
    body = `<h1 class="acct-h">Orders</h1>${S.orders.length ? S.orders.map(o => `
      <a class="order-card" href="#/account/orders/${encodeURIComponent(o.no)}">
        <div class="order-head"><span><b>Order #${esc(o.no)}</b><span class="muted small">${esc(o.date)} · ${o.lines.reduce((n, l) => n + l.qty, 0)} item(s)</span></span>${statusPill(o)}</div>
        <div class="order-foot"><span class="order-thumbs">${orderThumbs(o)}</span><span class="order-total"><span class="muted small">Total</span><b>${rs(o.total)}</b></span><span class="order-go" aria-hidden="true">→</span></div>
      </a>`).join('') : `<div class="empty"><h2>No orders yet</h2><p class="muted">When you place an order it will show up here.</p><a class="btn" href="#/c/all">Start shopping</a></div>`}`;
  } else if (tab === 'wishlist') {
    const items = S.wish.map(byId).filter(Boolean);
    body = `<h1 class="acct-h">Wishlist</h1>${items.length ? `<p class="muted">${items.length} saved pair${items.length > 1 ? 's' : ''}. Tap the heart to remove one.</p>${grid(items)}` : `<div class="empty"><h2>Your wishlist is empty</h2><p class="muted">Tap the heart on any pair to save it here.</p><a class="btn" href="#/c/all">Browse footwear</a></div>`}`;
  } else if (tab === 'addresses') {
    body = `<div class="acct-head"><h1 class="acct-h">Addresses</h1>${S.addrForm === null ? '<button class="btn ghost" data-act="addr-new" data-key="addr-new">+ Add address</button>' : ''}</div>
      ${S.addrForm !== null ? addrFormHTML() : ''}
      <div class="addr-grid">${S.addr.map((a, i) => addrCard(a, i)).join('')}</div>
      <p class="muted small">Your default address is filled in automatically at checkout.</p>`;
  } else if (tab === 'profile') {
    body = `<h1 class="acct-h">Profile</h1>
      <form class="panel" data-profile novalidate><div class="form">
        <div class="field wide"><label for="p-name">Full name</label><input id="p-name" name="name" autocomplete="name" value="${esc(pr.name)}"></div>
        <div class="field"><label for="p-phone">Mobile number</label><input id="p-phone" name="phone" type="tel" inputmode="numeric" autocomplete="tel" value="${esc(pr.phone)}"></div>
        <div class="field"><label for="p-email">Email <small>(optional)</small></label><input id="p-email" name="email" type="email" autocomplete="email" value="${esc(pr.email)}"></div>
        <label class="check wide"><input type="checkbox" name="whatsapp" ${pr.whatsapp ? 'checked' : ''}>Send order updates on WhatsApp</label></div>
        <div class="form-actions"><button class="btn">Save changes</button></div></form>`;
  } else {
    const last = S.orders[0], wish = S.wish.map(byId).filter(Boolean).slice(0, 4);
    body = `<h1 class="acct-h">Hi, ${esc(first)}</h1><p class="muted">Track orders, manage saved pairs and keep your delivery details up to date.</p>
      <div class="stat-row">${[['orders', 'Orders', S.orders.length], ['wishlist', 'Wishlist', S.wish.length], ['addresses', 'Addresses', S.addr.length]].map(([k, l, n]) => `<a class="stat" href="#/account/${k}">${ico(k)}<b>${n}</b><span>${l}</span></a>`).join('')}</div>
      ${last ? `<div class="panel"><div class="panel-head"><h2 class="panel-title">Latest order</h2><a class="link" href="#/account/orders">All orders</a></div>
        <a class="order-card flat" href="#/account/orders/${encodeURIComponent(last.no)}"><div class="order-head"><span><b>Order #${esc(last.no)}</b><span class="muted small">${esc(last.date)}</span></span>${statusPill(last)}</div>
        <ol class="timeline compact">${STEPS.map((t, i) => `<li class="${i <= last.status ? 'done' : ''} ${i === last.status ? 'now' : ''}"><span></span>${t}</li>`).join('')}</ol></a></div>` : ''}
      ${wish.length ? `<div class="panel"><div class="panel-head"><h2 class="panel-title">Saved for later</h2><a class="link" href="#/account/wishlist">View wishlist</a></div>${grid(wish, 'four')}</div>` : ''}
      ${S.addr[0] ? `<div class="panel"><div class="panel-head"><h2 class="panel-title">Default address</h2><a class="link" href="#/account/addresses">Manage</a></div>${addrCard(S.addr[0], 0, false)}</div>` : ''}`;
  }
  return `<div class="shell"><nav class="crumb" aria-label="Breadcrumb"><a href="#/">Home</a><span aria-hidden="true">/</span>${tab === 'overview' ? '<span>My account</span>' : `<a href="#/account">My account</a><span aria-hidden="true">/</span><span>${tabs.find(t => t[0] === tab)?.[1] || ''}</span>`}</nav>
    <div class="acct"><aside class="acct-side"><div class="acct-user"><span class="avatar lg" aria-hidden="true">${esc(initials)}</span><span><b>${esc(pr.name)}</b><span class="muted small">${esc(pr.phone)}</span></span></div>${nav}</aside>
    <div class="acct-main">${body}</div></div>
    <p class="muted small acct-note">Demo account · sample orders and addresses for the prototype.</p></div>`;
}

/* ---------- static pages ---------- */
function sizeGuide() {
  const rows = [[36, 22.5], [37, 23.5], [38, 24], [39, 24.5], [40, 25.5], [41, 26], [42, 26.5], [43, 27.5], [44, 28], [45, 29]];
  return `<p>Adult styles use EU sizes: women’s 36–41, men’s 39–45. Measure your foot from heel to longest toe and pick the closest length.</p>
    <table><caption class="sr">EU size to foot length</caption><thead><tr><th scope="col">EU size</th><th scope="col">Foot length (cm)</th></tr></thead><tbody>${rows.map(([s, c]) => `<tr><td>${s}</td><td>${c}</td></tr>`).join('')}</tbody></table>
    <p class="muted small">Indicative chart. Fit varies by brand. School shoes use the number printed on the box (1–9); check the size on a pair that already fits.</p>`;
}
function page(slug) {
  const pages = {
    delivery: ['Delivery', `<p>${DELIVERY.title}: ${rs(DELIVERY.fee)} per order across Pakistan. You’ll see the charge before placing your order.</p><p class="tbc">Delivery times, courier and coverage will be published here once confirmed.</p>`],
    exchanges: ['Exchanges & returns', '<p class="tbc">Exchange and return terms will be published here once confirmed.</p>'],
    payment: ['Cash on delivery', '<p>Check your parcel before paying the courier in cash. Check the style, size, and condition. If the pair is wrong or damaged, tell the courier before paying and contact VeraSole for help.</p><p>If a pair is out of stock we’ll contact you. You can wait for a restock or choose another style.</p>'],
    'size-guide': ['Size guide', sizeGuide()],
    feedback: ['Share feedback', `<p>After delivery, tell us how the shoes fit and how your delivery went.</p>
      <p class="muted small">Prototype feedback stays on this device.</p>
      <form data-feedback><div class="field"><label for="fit-feedback">How did the shoes fit?</label><select id="fit-feedback" name="fit" required><option value="">Select an answer</option><option>Too small</option><option>Just right</option><option>Too large</option></select></div>
      <div class="field"><label for="delivery-feedback">How was delivery?</label><select id="delivery-feedback" name="delivery" required><option value="">Select an answer</option><option>Good</option><option>Okay</option><option>Poor</option></select></div>
      <div class="field"><label for="feedback-note">Comments (optional)</label><textarea id="feedback-note" name="comment" maxlength="500" rows="3"></textarea></div><button class="btn" type="submit">Save feedback</button></form><p role="status" id="feedback-status"></p>`],
    contact: ['Contact us', '<p class="tbc">Phone, WhatsApp number, email and shop address will be listed here once confirmed.</p>'],
  };
  const [t, body] = pages[slug] || ['Help', '<p>Page not found.</p>'];
  return `<div class="shell prose"><nav class="crumb" aria-label="Breadcrumb" style="padding-left:0"><a href="#/">Home</a><span aria-hidden="true">/</span><span>${t}</span></nav><h1>${t}</h1>${body}</div>`;
}

/* ---------- SEO: per-page meta, structured data, category copy ---------- */
const SITE = 'https://verasole.github.io/verasole-prototype/';
const CAT_SEO = {
  all: { h: 'Shop footwear online in Pakistan', p: ['Browse every VeraSole style in one place: Peshawari chappals, everyday slides, sandals, knit slip-on shoes and black school shoes. Every price is in Pakistani rupees and every order is cash on delivery.', 'Filter by size, colour and price to narrow the list, or sort by price to compare. Each product page shows the sizes in stock for the colour you choose.'],
    tips: ['Men’s styles run EU 39–45 and women’s EU 36–41.', 'School shoes use sizes 1–9; check the number inside a pair that fits.', 'Sale prices are shown with the original price struck through.'],
    faq: [['How do I pay?', 'Pay in cash when your order arrives. Check your parcel before you pay the courier.'], ['How much is delivery?', `Standard delivery is ${rs(DELIVERY.fee)} per order and is shown before you place it.`], ['Can I filter by size?', 'Yes. Choose one or more sizes in the filters and only styles available in those sizes are shown.']] },
  chappals: { h: 'Peshawari chappals and slides', p: ['VeraSole chappals range from the classic Peshawari, with its crossover upper, welt stitching and buckled heel strap, to soft slides for everyday wear at home and out.', 'Peshawari chappals pair with shalwar kameez for Eid, weddings and Friday prayers, while padded slides are made for long days on your feet.'],
    tips: ['A Peshawari should feel snug at first; the upper softens with wear.', 'Choose your usual EU size; if you are between sizes, go one up.', 'Slides with a buckle strap can be loosened for a wider foot.'],
    faq: [['What size Peshawari chappal should I buy?', 'Order your usual EU size. Peshawari uppers are firm at first and ease with wear, so go up one size only if you are between sizes.'], ['Are the chappals suitable for formal wear?', 'Yes. Classic Peshawari chappals in coffee or camel suit shalwar kameez for Eid, weddings and other occasions.'], ['Do you have women’s chappals?', 'Yes. Women’s slides come in EU 36–41; use the Women menu or filter by size.']] },
  sandals: { h: 'Sandals for men and women', p: ['From strap sandals with adjustable buckles for everyday walking to beaded and ruched sandals for evenings out, VeraSole sandals are made for warm days across Pakistan.', 'Open styles keep feet cool in summer, and cushioned footbeds make them comfortable for errands, travel and family events.'],
    tips: ['Adjustable straps help sandals fit a range of foot widths.', 'For heeled sandals, choose your usual size; the ankle strap keeps your foot in place.', 'Wipe straps with a damp cloth and let them dry away from direct sun.'],
    faq: [['Are the sandals comfortable for long walks?', 'Strap sandals with cushioned footbeds are designed for everyday walking. Dressier styles suit shorter wear such as events.'], ['What sizes do women’s sandals come in?', 'Women’s sandals come in EU 36–41. Each product page shows which sizes are in stock.'], ['Can I check the sandals before paying?', 'Yes. All orders are cash on delivery and you can check your parcel before paying the courier.']] },
  shoes: { h: 'Knit slip-on shoes', p: ['VeraSole knit slip-ons combine a breathable knit upper with a cushioned sole, so they are easy to pull on for work, travel and daily walks.', 'Their light weight and flexible sole make them a comfortable alternative to joggers for everyday wear.'],
    tips: ['Knit uppers stretch slightly; if you are between sizes, choose the smaller one.', 'Some sizes cost a little more; the price updates when you pick a size.', 'Air-dry knit shoes after washing; avoid a machine dryer.'],
    faq: [['Are knit slip-ons good for office wear?', 'They suit smart-casual offices and daily commuting. For formal dress codes, choose a closed leather style.'], ['Do knit shoes stretch?', 'Yes, the knit upper gives slightly with wear, so a snug first fit is normal.'], ['Which colours are available?', 'Current styles come in navy, taupe and black. Use the colour filter to see them together.']] },
  'school-shoes': { h: 'Black school shoes', p: ['Black school shoes from Bata in sizes 1–9, made to meet uniform rules and stand up to the school week.', 'Buy before the new term to get the right size in stock, and check the size printed inside a pair that already fits your child.'],
    tips: ['Leave about a thumb’s width at the toe for growing feet.', 'Check the size inside your child’s current shoes before ordering.', 'Polish regularly to keep black leather looking smart.'],
    faq: [['What sizes do school shoes come in?', 'School shoes come in sizes 1–9, as printed inside the shoe and on the box.'], ['How much room should I leave for growth?', 'About a thumb’s width at the toe is a good guide for growing feet.'], ['Why is there no photo for some school shoes?', 'We show the article number until we have photographed that model.']] },
};
const ld = obj => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;
const crumbsLD = items => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE + path })) });
const faqLD = faq => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
function setMeta(title, desc, index = true) {
  const set = (sel, attr, val) => { let m = document.head.querySelector(sel); if (!m) { m = document.createElement('meta'); const [k, v] = sel.match(/\[(\w+)="([^"]+)"\]/).slice(1); m.setAttribute(k, v); document.head.append(m); } m.setAttribute(attr, val); };
  set('meta[name="description"]', 'content', desc);
  set('meta[property="og:title"]', 'content', title + ' | VeraSole');
  set('meta[property="og:description"]', 'content', desc);
  set('meta[name="robots"]', 'content', index ? 'noindex' : 'noindex, nofollow');
  document.documentElement.dataset.indexable = index ? 'yes' : 'no';
}
function catSeo(slug, audience) {
  const c = CAT_SEO[slug] || CAT_SEO.all, related = Object.entries(CATS).filter(([k]) => k !== slug && k !== 'all');
  return `<section class="cat-seo" aria-labelledby="cat-seo-t">
    <div class="cat-seo-copy"><p class="eyebrow">${audience ? audience + ' · ' : ''}Buying guide</p><h2 id="cat-seo-t">${c.h}</h2>${c.p.map(t => `<p>${t}</p>`).join('')}
      <h3>Before you choose</h3><ul class="tick-list">${c.tips.map(t => `<li>${t}</li>`).join('')}</ul>
      <h3>Shop more</h3><p class="chips">${related.map(([k, v]) => `<a class="chip" href="#/c/${k}">${v.name}</a>`).join('')}<a class="chip" href="#/page/size-guide">Size guide</a></p></div>
    <div><p class="eyebrow">Questions</p><h2>${CATS[slug]?.name || 'Footwear'} FAQs</h2><div class="notes">${c.faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div></div>
    ${ld(faqLD(c.faq))}
  </section>`;
}
function pageSeo(r, html) {
  const [a, b] = r.parts, q = r.q;
  if (!a) {
    setMeta('True comfort. Every step.', 'True comfort. Every step. Shop Peshawari chappals, sandals, knit slip-ons and school shoes online in Pakistan. Prices in PKR, cash on delivery, check your parcel before you pay.');
    return html + ld({ '@context': 'https://schema.org', '@graph': [
      { '@type': 'Organization', name: 'VeraSole', url: SITE, logo: SITE + 'img/logo.svg', areaServed: 'PK' },
      { '@type': 'WebSite', name: 'VeraSole', url: SITE, potentialAction: { '@type': 'SearchAction', target: SITE + '#/search?q={search_term_string}', 'query-input': 'required name=search_term_string' } },
    ] }) + ld(faqLD(FAQ));
  }
  if (a === 'c' && CATS[b]) {
    const who = ['Men', 'Women', 'Kids'].includes(q.get('who')) ? q.get('who') : '', name = (who ? who + ' ' : '') + CATS[b].name.toLowerCase();
    const items = P.filter(p => (b === 'all' || p.cat === b) && (!who || p.who === who));
    setMeta(CATS[b].name, `Shop ${name} online in Pakistan at VeraSole. ${items.length} styles in PKR with size and colour filters and cash on delivery.`);
    return html + ld(crumbsLD([['Home', ''], [CATS[b].name, '#/c/' + b]])) + ld({ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: items.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: SITE + '#/p/' + p.id, name: p.name })) });
  }
  if (a === 'p' && byId(b)) {
    const p = byId(b), imgs = p.colors.flatMap(c => c.imgs.map(i => SITE + i.src));
    setMeta(p.name, `${p.desc} ${p.who}’s ${CATS[p.cat].name.toLowerCase()}, sizes ${p.sizes[0]}–${p.sizes.at(-1)}. ${rs(p.price)} with cash on delivery in Pakistan.`);
    return html + ld({ '@context': 'https://schema.org', '@type': 'Product', name: p.name, sku: p.sku, description: p.desc, ...(imgs.length ? { image: imgs } : {}), ...(p.brand ? { brand: { '@type': 'Brand', name: p.brand } } : {}), color: p.colors.map(c => c.name).join(', '), audience: { '@type': 'PeopleAudience', suggestedGender: p.who === 'Kids' ? 'unisex' : p.who.toLowerCase() },
      offers: { '@type': 'Offer', url: SITE + '#/p/' + p.id, priceCurrency: 'PKR', price: p.price, availability: anyStock(p) ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock', itemCondition: 'https://schema.org/NewCondition', shippingDetails: { '@type': 'OfferShippingDetails', shippingRate: { '@type': 'MonetaryAmount', value: DELIVERY.fee, currency: 'PKR' }, shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'PK' } } } })
      + ld(crumbsLD([['Home', ''], [CATS[p.cat].name, '#/c/' + p.cat], [p.name, '#/p/' + p.id]]));
  }
  if (a === 'page') { setMeta('Help', 'VeraSole help: delivery, cash on delivery, exchanges, size guide and contact details.'); return html; }
  setMeta('VeraSole', 'VeraSole footwear for Pakistan.', false);
  return html;
}

/* ---------- events ---------- */
function toggleFilter(k, v) {
  const q = route().q, cur = (q.get(k) || '').split(',').filter(Boolean), i = cur.indexOf(v);
  i < 0 ? cur.push(v) : cur.splice(i, 1);
  cur.length ? q.set(k, cur.join(',')) : q.delete(k); return q;
}
document.addEventListener('click', e => {
  const foc = e.target.closest('[data-focus]'); if (foc) { e.preventDefault(); $('#' + foc.dataset.focus).focus(); return; }
  if (e.target.closest('a[href^="#/"]')) { document.querySelectorAll('dialog[open]').forEach(d => d.close()); S.drawer = false; toggleSearch(false); $('#toast').hidden = true; return; }
  const el = e.target.closest('[data-act]'); if (!el) return;
  const act = el.dataset.act, r = route(), p = r.parts[0] === 'p' ? byId(r.parts[1]) : null, st = p && S.pdp[p.id], key = el.dataset.key;
  const re = () => { S.focusKey = key; render(true); };
  switch (act) {
    case 'slide': showSlide(slideI + +el.dataset.d); break;
    case 'slide-to': showSlide(+el.dataset.i); break;
    case 'hero-pause': heroPaused = !heroPaused; heroSync(); break;
    case 'open-menu': $('#menu').showModal(); break;
    case 'close-dialog': el.closest('dialog').close(); break;
    case 'open-search': toggleSearch($('#searchbar').hidden); break;
    case 'close-search': toggleSearch(false); $('[data-act="open-search"]').focus(); break;
    case 'open-filters': S.drawer = true; $('#filter-drawer').showModal(); break;
    case 'close-filters': S.drawer = false; $('#filter-drawer').close(); $('[data-key="open-filters"]')?.focus(); break;
    case 'rm-filter': setParams(toggleFilter(el.dataset.k, el.dataset.v), 'clear'); break;
    case 'clear-filters': { const q = r.q; ['size', 'color', 'price'].forEach(k => q.delete(k)); setParams(q, 'open-filters'); break; }
    case 'img': st.img = +el.dataset.i; re(); break;
    case 'color': st.color = el.dataset.v; st.img = 0; st.touched = true; re(); break;
    case 'size': if (el.getAttribute('aria-disabled') === 'true') break; st.size = el.dataset.v; st.err = false; re(); break;
    case 'qty': st.qty = Math.max(1, st.qty + +el.dataset.d); re(); break;
    case 'size-guide': $('#sg-body').innerHTML = sizeGuide(); $('#sizeguide').showModal(); break;
    case 'add': addToBag(p); break;
    case 'cart-qty': { const l = S.cart[+el.dataset.i]; l.qty = Math.max(1, Math.min(stockOf(byId(l.id), l.color, l.size), l.qty + +el.dataset.d)); saveCart(); re(); break; }
    case 'cart-rm': S.cart.splice(+el.dataset.i, 1); saveCart(); render(true); $('#main').focus({ preventScroll: true }); break;
    case 'signin': $('#signin').showModal(); break;
    case 'wish': {
      const id = el.dataset.id, i = S.wish.indexOf(id), p2 = byId(id);
      i < 0 ? S.wish.unshift(id) : S.wish.splice(i, 1); saveWish();
      toast(`<div><strong>${i < 0 ? 'Saved to wishlist' : 'Removed from wishlist'}</strong><br>${esc(p2.name)}</div><div class="row"><a class="btn ghost" href="#/account/wishlist">View wishlist (${S.wish.length})</a></div>`);
      re(); break;
    }
    case 'signout': toast('<div><strong>Demo account</strong><br>Signing out isn’t simulated in this prototype.</div>'); break;
    case 'addr-new': S.addrForm = 'new'; S.addrErr = {}; S.focusKey = 'addr-save'; render(true); $('#a-name').focus(); break;
    case 'addr-edit': S.addrForm = +el.dataset.i; S.addrErr = {}; render(true); $('[data-addr-form]').scrollIntoView({ block: 'start' }); $('#a-name').focus(); break;
    case 'addr-cancel': S.addrForm = null; S.addrErr = {}; S.focusKey = 'addr-new'; render(true); break;
    case 'addr-default': { const [a] = S.addr.splice(+el.dataset.i, 1); S.addr.unshift(a); store.set('vs-addr', S.addr); render(true); toast(`<div><strong>${esc(a.label)} is now your default address</strong></div>`); break; }
    case 'addr-rm': { const [a] = S.addr.splice(+el.dataset.i, 1); store.set('vs-addr', S.addr); render(true); toast(`<div><strong>${esc(a.label)} address removed</strong></div>`); break; }
    case 'use-addr': {
      const a = S.addr[+el.dataset.i], [first, ...rest] = a.name.split(' ');
      Object.assign(S.co.f, { first, last: rest.join(' '), phone: a.phone, address: a.address, city: a.city, province: a.province, postcode: a.postcode || '' });
      S.co.errors = {}; store.set('vs-co', S.co); render(true); break;
    }
    case 'co-edit': S.co.step = +el.dataset.n; store.set('vs-co', S.co); S.focusKey = 'co-next'; render(true); break;
    case 'place': {
      const sub = subtotal();
      S.order = { no: 1000 + Math.floor(Math.random() * 9000), f: { ...S.co.f }, sub, off: saving(), total: sub + DELIVERY.fee, lines: S.cart.map(l => ({ name: byId(l.id).name, color: l.color, size: l.size, qty: l.qty, total: priceOf(byId(l.id), l.size) * l.qty })) };
      S.orders = [{ ...S.order, no: String(S.order.no), date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }), status: 0, lines: S.cart.map(l => ({ id: l.id, name: byId(l.id).name, color: l.color, size: l.size, qty: l.qty, total: priceOf(byId(l.id), l.size) * l.qty })) }, ...S.orders]; store.set('vs-orders', S.orders);
      store.set('vs-order', S.order); S.cart = []; saveCart(); S.co.step = 1; store.set('vs-co', S.co); location.hash = '#/done'; break;
    }
  }
});
document.addEventListener('change', e => {
  const t = e.target;
  if (t.dataset.f) setParams(toggleFilter(t.dataset.f, t.value), t.dataset.key);
  if ('sort' in t.dataset) { const q = route().q; t.value === 'featured' ? q.delete('sort') : q.set('sort', t.value); setParams(q, 'sort'); }
});
document.addEventListener('input', e => {
  const t = e.target;
  if (t.id === 'q') suggest(t.value);
  if (t.dataset.co) { S.co.f[t.dataset.co] = t.value; store.set('vs-co', S.co); }
});
document.addEventListener('submit', e => {
  e.preventDefault(); const f = e.target;
  if (f.id === 'search-form' || 'searchInline' in f.dataset) {
    const v = f.querySelector('input').value.trim(); toggleSearch(false);
    location.hash = '#/search' + (v ? '?q=' + encodeURIComponent(v) : ''); return;
  }
  if ('addrForm' in f.dataset) {
    const d = Object.fromEntries(new FormData(f)), e = {}, ph = (d.phone || '').replace(/[\s-]/g, '');
    if (!d.name.trim()) e.name = 'Enter the recipient’s name.';
    if (!/^03\d{9}$/.test(ph)) e.phone = 'Enter an 11-digit mobile number starting with 03.';
    if (d.address.trim().length < 5) e.address = 'Enter the street address.';
    if (!d.city.trim()) e.city = 'Enter the city.';
    if (!d.province) e.province = 'Choose the province.';
    if (d.postcode && !/^\d{5}$/.test(d.postcode.trim())) e.postcode = 'Postal codes are 5 digits.';
    if (Object.keys(e).length) { S.addrErr = e; render(true); $('[data-addr-form] [aria-invalid=true]')?.focus(); return; }
    S.addrForm === 'new' ? S.addr.push(d) : (S.addr[S.addrForm] = d);
    store.set('vs-addr', S.addr); S.addrForm = null; S.addrErr = {}; render(true); toast('<div><strong>Address saved</strong></div>'); return;
  }
  if ('profile' in f.dataset) {
    const d = Object.fromEntries(new FormData(f));
    S.profile = { name: d.name.trim() || S.profile.name, phone: d.phone, email: d.email, whatsapp: !!d.whatsapp };
    store.set('vs-profile', S.profile); render(true); toast('<div><strong>Profile saved</strong><br>Changes are kept in this browser only.</div>'); return;
  }
  if ('feedback' in f.dataset) {
    store.set('vs-feedback', Object.fromEntries(new FormData(f)));
    f.reset();
    $('#feedback-status').textContent = 'Thanks. Your feedback was saved on this device.';
    return;
  }
  if ('coForm' in f.dataset) {
    S.co.errors = validate(S.co.f); const bad = Object.keys(S.co.errors);
    if (bad.length) { render(true); const b = $('#err-box'); b.focus(); b.scrollIntoView({ block: 'center' }); return; }
    S.co.step = 2; store.set('vs-co', S.co); S.focusKey = 'co-next'; render(true); $('#s2').scrollIntoView({ block: 'center' });
  }
});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#searchbar').hidden) { toggleSearch(false); $('[data-act="open-search"]').focus(); } });
document.addEventListener('cancel', e => { if (e.target.id === 'filter-drawer') S.drawer = false; }, true);
document.addEventListener('click', e => { if (e.target.tagName === 'DIALOG') { e.target.close(); S.drawer = false; } });
window.addEventListener('hashchange', () => render());
bag(); render();
