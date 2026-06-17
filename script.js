const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);

// ===== Currencies (base: LYD) =====
const currencies = {
    LYD: { symbol: 'د.ل', rate: 1,      name: 'الدينار الليبي',    nameEn: 'Libyan Dinar',    flag: '🇱🇾' },
    USD: { symbol: '$',   rate: 0.205,   name: 'الدولار الأمريكي',  nameEn: 'US Dollar',       flag: '🇺🇸' },
    EUR: { symbol: '€',   rate: 0.188,   name: 'اليورو',             nameEn: 'Euro',            flag: '🇪🇺' },
    GBP: { symbol: '£',   rate: 0.161,   name: 'الجنيه الإسترليني', nameEn: 'British Pound',   flag: '🇬🇧' },
    SAR: { symbol: 'ر.س', rate: 0.769,   name: 'الريال السعودي',    nameEn: 'Saudi Riyal',     flag: '🇸🇦' },
    AED: { symbol: 'د.إ', rate: 0.753,   name: 'الدرهم الإماراتي',  nameEn: 'UAE Dirham',      flag: '🇦🇪' },
    TRY: { symbol: '₺',   rate: 6.75,    name: 'الليرة التركية',    nameEn: 'Turkish Lira',    flag: '🇹🇷' },
    EGP: { symbol: 'ج.م', rate: 10.2,    name: 'الجنيه المصري',     nameEn: 'Egyptian Pound',  flag: '🇪🇬' },
};

// ===== Countries & Aramex Estimated Shipping (cost in USD per kg approx) =====
const countries = [
    { code:'LY', ar:'ليبيا',             en:'Libya',          cost:0,  days:'1-2'  },
    { code:'EG', ar:'مصر',               en:'Egypt',          cost:15, days:'3-5'  },
    { code:'TN', ar:'تونس',              en:'Tunisia',        cost:18, days:'3-5'  },
    { code:'DZ', ar:'الجزائر',           en:'Algeria',        cost:18, days:'4-6'  },
    { code:'MA', ar:'المغرب',            en:'Morocco',        cost:20, days:'4-6'  },
    { code:'SD', ar:'السودان',           en:'Sudan',          cost:18, days:'3-5'  },
    { code:'SA', ar:'السعودية',          en:'Saudi Arabia',   cost:18, days:'2-4'  },
    { code:'AE', ar:'الإمارات',          en:'UAE',            cost:18, days:'2-4'  },
    { code:'QA', ar:'قطر',               en:'Qatar',          cost:18, days:'2-4'  },
    { code:'KW', ar:'الكويت',            en:'Kuwait',         cost:18, days:'2-4'  },
    { code:'BH', ar:'البحرين',           en:'Bahrain',        cost:18, days:'2-4'  },
    { code:'OM', ar:'عُمان',             en:'Oman',           cost:18, days:'2-4'  },
    { code:'JO', ar:'الأردن',            en:'Jordan',         cost:20, days:'3-5'  },
    { code:'LB', ar:'لبنان',             en:'Lebanon',        cost:20, days:'3-5'  },
    { code:'IQ', ar:'العراق',            en:'Iraq',           cost:20, days:'3-5'  },
    { code:'SY', ar:'سوريا',             en:'Syria',          cost:22, days:'4-6'  },
    { code:'YE', ar:'اليمن',             en:'Yemen',          cost:22, days:'4-6'  },
    { code:'TR', ar:'تركيا',             en:'Turkey',         cost:28, days:'4-6'  },
    { code:'GB', ar:'المملكة المتحدة',   en:'United Kingdom', cost:45, days:'5-8'  },
    { code:'DE', ar:'ألمانيا',           en:'Germany',        cost:40, days:'5-8'  },
    { code:'FR', ar:'فرنسا',             en:'France',         cost:40, days:'5-8'  },
    { code:'IT', ar:'إيطاليا',           en:'Italy',          cost:40, days:'5-8'  },
    { code:'ES', ar:'إسبانيا',           en:'Spain',          cost:40, days:'5-8'  },
    { code:'NL', ar:'هولندا',            en:'Netherlands',    cost:40, days:'5-8'  },
    { code:'SE', ar:'السويد',            en:'Sweden',         cost:42, days:'5-8'  },
    { code:'US', ar:'الولايات المتحدة',  en:'United States',  cost:55, days:'7-10' },
    { code:'CA', ar:'كندا',              en:'Canada',         cost:55, days:'7-10' },
    { code:'AU', ar:'أستراليا',          en:'Australia',      cost:60, days:'8-12' },
    { code:'CN', ar:'الصين',             en:'China',          cost:35, days:'6-10' },
    { code:'IN', ar:'الهند',             en:'India',          cost:35, days:'5-8'  },
    { code:'PK', ar:'باكستان',           en:'Pakistan',       cost:30, days:'5-8'  },
];

// ===== Product Data =====
const data = [
    { id:1, name:"سامسونج A52",        price:2450, img:"https://picsum.photos/seed/phone/420/300",  cat:"هواتف",      rating:4.6, description:"هاتف ممتاز بشاشة كبيرة وأداء قوي.",            images:["https://picsum.photos/seed/phone1/420/300","https://picsum.photos/seed/phone2/420/300"] },
    { id:2, name:"سماعات سوني برو",    price:820,  img:"https://picsum.photos/seed/ear/420/300",    cat:"إكسسوارات", rating:4.3, description:"سماعات لاسلكية مع عزل ضوضاء.",                 images:["https://picsum.photos/seed/ear1/420/300"] },
    { id:3, name:"كيبورد ميكانيكي RX", price:170,  img:"https://picsum.photos/seed/keys/420/300",   cat:"إكسسوارات", rating:4.8, description:"لوحة مفاتيح ميكانيكية بإضاءة RGB.",            images:["https://picsum.photos/seed/keys1/420/300"] },
    { id:4, name:"ماوس G1",            price:130,  img:"https://picsum.photos/seed/mouse/420/300",  cat:"إكسسوارات", rating:4.5, description:"ماوس ألعاب دقيق وسريع.",                       images:[] },
    { id:5, name:"تاب Tab10",          price:1950, img:"https://picsum.photos/seed/tab/420/300",    cat:"أجهزة",      rating:4.4, description:"جهاز لوحي بشاشة عالية الدقة.",                 images:[] },
    { id:6, name:"لابتوب لايت",        price:5400, img:"https://picsum.photos/seed/laptop/420/300", cat:"أجهزة",      rating:4.7, description:"لابتوب خفيف الوزن وعمر بطارية طويل.",         images:[] },
    { id:7, name:"كتاب إلكتروني",      price:7500, img:"https://picsum.photos/seed/book/420/300",   cat:"أجهزة",      rating:4.2, description:"قارئ كتب إلكتروني بشاشة حبر إلكتروني.",       images:[] },
    { id:8, name:"...", price:..., cat:"Arvea", ... },
];

// ===== State =====
let state = {
    q: '', cat: 'all', sort: 'default',
    minPrice: 0, maxPrice: Infinity,
    lang: 'ar',
    currency: localStorage.getItem('currency') || 'LYD'
};

let cart     = loadCart();
let wishlist = loadWishlist();
let reviews  = loadReviews();

// ===== Translations =====
const translations = {
    ar: {
        appName:'متجري الاحترافي', searchPlaceholder:'ابحث عن منتج…',
        all:'الكل', phones:'هواتف', accessories:'إكسسوارات', devices:'أجهزة',
        sort:'الترتيب', priceAsc:'السعر: من الأرخص للأغلى', priceDesc:'السعر: من الأغلى للأرخص',
        nameAsc:'الاسم: أ → ي', ratingDesc:'التقييم: الأعلى أولاً',
        cart:'سلة المشتريات', total:'الإجمالي', emptyCart:'السلة فارغة',
        clearCart:'تفريغ السلة', close:'إغلاق', checkout:'إتمام الشراء', confirmOrder:'تأكيد الطلب',
        addReview:'أضف تقييمك', submitReview:'إرسال التقييم', yourName:'اسمك', yourComment:'تعليقك',
        addToCart:'إضافة إلى السلة', addToWishlist:'أضف للمفضلة', removeFromWishlist:'إزالة من المفضلة',
        statsProducts:'منتج', statsInCart:'في السلة', statsWishlist:'في المفضلة',
        aboutUs:'من نحن', aboutText:'متجري الاحترافي هو وجهتك الأولى لأحدث الأجهزة والإكسسوارات بأسعار مناسبة وجودة عالية.',
        apply:'تطبيق', min:'الحد الأدنى', max:'الحد الأقصى', remove:'حذف',
        category:'التصنيف', rating:'التقييم',
        heroTitle:'تسوّق بذكاء', heroText:'أفضل المنتجات بتصميم داكن فخم وسرعة عالية وتجربة مثالية.',
        filters:'الفلاتر', language:'اللغة', theme:'الوضع', dark:'داكن', light:'فاتح',
        wishlist:'المفضلة', emptyWishlist:'المفضلة فارغة',
        orderSummary:'ملخص الطلب', personalInfo:'البيانات الشخصية', deliveryAddress:'عنوان التوصيل',
        paymentMethod:'طريقة الدفع',
        processing:'جاري المعالجة...',
        orderSuccess:'تم إرسال الطلب بنجاح! سنتواصل معك قريباً.',
        orderSuccessTransfer:'تم إرسال الطلب مع الإيصال. سنقوم بالتحقق والتواصل معك قريباً.',
        orderError:'فشل إرسال الطلب. يرجى المحاولة مرة أخرى.',
        fillRequired:'الرجاء ملء جميع الحقول الإجبارية',
        invalidPhone:'رقم الهاتف غير صحيح. يجب أن يبدأ بـ +218 أو 09 أو رمز دولي، ولا يقل عن 10 أرقام.',
        uploadReceipt:'الرجاء اختيار صورة الإيصال',
        fileTooLarge:'حجم الصورة يتجاوز 5 ميجابايت',
        reviewRequired:'الرجاء إدخال تعليق وتقييم بالنجوم',
        noReviews:'لا توجد تقييمات بعد',
        aboutUsBtn:'من نحن',
        currency:'العملة',
        country:'الدولة',
        selectCountry:'اختر الدولة *',
        shippingViaAramex:'📦 الشحن عبر أرامكس',
        freeShipping:'🎉 شحن مجاني داخل ليبيا',
        shippingCost:'تكلفة الشحن',
        estimatedDelivery:'مدة التوصيل المتوقعة',
        days:'أيام عمل',
        shippingNote:'* الأسعار تقديرية وتُحدد عند تأكيد الشحن مع أرامكس',
        productsTotal:'إجمالي المنتجات',
        shippingTotal:'تكلفة الشحن',
        grandTotal:'الإجمالي الكلي',
    },
    en: {
        appName:'My Professional Store', searchPlaceholder:'Search products…',
        all:'All', phones:'Phones', accessories:'Accessories', devices:'Devices',
        sort:'Sort', priceAsc:'Price: Low to High', priceDesc:'Price: High to Low',
        nameAsc:'Name: A → Z', ratingDesc:'Rating: Highest First',
        cart:'Shopping Cart', total:'Total', emptyCart:'Cart is empty',
        clearCart:'Clear Cart', close:'Close', checkout:'Checkout', confirmOrder:'Confirm Order',
        addReview:'Add Review', submitReview:'Submit Review', yourName:'Your Name', yourComment:'Your Comment',
        addToCart:'Add to Cart', addToWishlist:'Add to Wishlist', removeFromWishlist:'Remove from Wishlist',
        statsProducts:'Products', statsInCart:'In Cart', statsWishlist:'In Wishlist',
        aboutUs:'About Us', aboutText:'My Professional Store is your first destination for the latest devices and accessories at affordable prices and high quality.',
        apply:'Apply', min:'Min', max:'Max', remove:'Remove',
        category:'Category', rating:'Rating',
        heroTitle:'Shop Smart', heroText:'Best products with a sleek dark design, high speed, and perfect experience.',
        filters:'Filters', language:'Language', theme:'Theme', dark:'Dark', light:'Light',
        wishlist:'Wishlist', emptyWishlist:'Wishlist is empty',
        orderSummary:'Order Summary', personalInfo:'Personal Information', deliveryAddress:'Delivery Address',
        paymentMethod:'Payment Method',
        processing:'Processing...',
        orderSuccess:'Order sent successfully! We will contact you soon.',
        orderSuccessTransfer:'Order sent with receipt. We will verify and contact you soon.',
        orderError:'Failed to send order. Please try again.',
        fillRequired:'Please fill in all required fields',
        invalidPhone:'Invalid phone. Must start with +218, 09, or a country code and be at least 10 digits.',
        uploadReceipt:'Please upload a receipt image',
        fileTooLarge:'File size exceeds 5MB',
        reviewRequired:'Please enter a comment and select star rating',
        noReviews:'No reviews yet',
        aboutUsBtn:'About Us',
        currency:'Currency',
        country:'Country',
        selectCountry:'Select Country *',
        shippingViaAramex:'📦 Shipping via Aramex',
        freeShipping:'🎉 Free shipping within Libya',
        shippingCost:'Shipping Cost',
        estimatedDelivery:'Estimated Delivery',
        days:'business days',
        shippingNote:'* Prices are estimates, confirmed at shipment with Aramex',
        productsTotal:'Products Total',
        shippingTotal:'Shipping Cost',
        grandTotal:'Grand Total',
    }
};

function getTranslation(key) {
    return (translations[state.lang] && translations[state.lang][key]) ? translations[state.lang][key] : key;
}

// ===== Dynamic Price Formatting =====
function formatPrice(lydAmount) {
    const curr = currencies[state.currency];
    const converted = lydAmount * curr.rate;
    try {
        return new Intl.NumberFormat(state.lang === 'ar' ? 'ar' : 'en', {
            style: 'currency',
            currency: state.currency,
            minimumFractionDigits: state.currency === 'LYD' ? 0 : 2,
            maximumFractionDigits: state.currency === 'LYD' ? 0 : 2
        }).format(converted);
    } catch(e) {
        return `${curr.symbol} ${converted.toFixed(2)}`;
    }
}

// Shipping cost stored in USD → convert to selected currency
function formatShipping(usdCost) {
    if (usdCost === 0) return getTranslation('freeShipping');
    const lydCost = usdCost / currencies['USD'].rate;
    return formatPrice(lydCost);
}

// ===== Live Exchange Rates (free API, no key required) =====
async function fetchLiveRates() {
    try {
        const res = await fetch('https://open.er-api.com/v6/latest/LYD');
        if (!res.ok) throw new Error('rate fetch failed');
        const json = await res.json();
        if (json.rates) {
            Object.keys(currencies).forEach(code => {
                if (code !== 'LYD' && json.rates[code]) currencies[code].rate = json.rates[code];
            });
        }
    } catch(e) {
        console.log('Using fallback exchange rates');
    }
}

// ===== Set Currency =====
function setCurrency(code) {
    if (!currencies[code]) return;
    state.currency = code;
    localStorage.setItem('currency', code);
    render();
    updateCartUI();
    updateShippingEstimate();
}

// ===== Populate selects =====
function populateCurrencySelect() {
    const sel = $('#currency-select');
    if (!sel) return;
    sel.innerHTML = Object.entries(currencies).map(([code, c]) =>
        `<option value="${code}" ${state.currency === code ? 'selected' : ''}>
            ${c.flag} ${code} — ${state.lang === 'ar' ? c.name : c.nameEn}
         </option>`).join('');
}

function populateCountrySelect() {
    const sel = $('#checkout-country');
    if (!sel) return;
    const cur = sel.value;
    sel.innerHTML = `<option value="">${getTranslation('selectCountry')}</option>` +
        countries.map(c =>
            `<option value="${c.code}" ${cur === c.code ? 'selected' : ''}>
                ${state.lang === 'ar' ? c.ar : c.en}
             </option>`).join('');
}

// ===== Aramex Shipping Estimate =====
function updateShippingEstimate() {
    const sel = $('#checkout-country');
    const box = $('#shipping-estimate');
    if (!sel || !box) return;
    const code = sel.value;
    if (!code) { box.style.display = 'none'; return; }
    const country = countries.find(c => c.code === code);
    if (!country) { box.style.display = 'none'; return; }

    const shippingLyd   = country.cost === 0 ? 0 : country.cost / currencies['USD'].rate;
    const productsLyd   = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const grandLyd      = productsLyd + shippingLyd;

    box.style.display = 'block';
    box.innerHTML = `
        <div class="shipping-header">${getTranslation('shippingViaAramex')}</div>
        <div class="shipping-row">
            <span>${getTranslation('shippingCost')}</span>
            <span class="shipping-val">${formatShipping(country.cost)}</span>
        </div>
        <div class="shipping-row">
            <span>${getTranslation('estimatedDelivery')}</span>
            <span>${country.days} ${getTranslation('days')}</span>
        </div>
        <div class="shipping-divider"></div>
        <div class="shipping-row">
            <span>${getTranslation('productsTotal')}</span>
            <span>${formatPrice(productsLyd)}</span>
        </div>
        <div class="shipping-row shipping-grand">
            <span><b>${getTranslation('grandTotal')}</b></span>
            <span><b>${formatPrice(grandLyd)}</b></span>
        </div>
        <div class="shipping-note">${getTranslation('shippingNote')}</div>`;
}

// ===== Header scroll =====
let lastScrollTop = 0;
const header = $('.header');
window.addEventListener('scroll', function () {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    header.classList.toggle('header-hidden', st > lastScrollTop && st > 60);
    lastScrollTop = st <= 0 ? 0 : st;
}, false);

// ===== updateUILanguage =====
function updateUILanguage() {
    $('#drawer-arvea').textContent = 'Arvea';
    arvea: 'Arvea Nature',
    document.documentElement.lang = state.lang;
    document.documentElement.dir  = state.lang === 'ar' ? 'rtl' : 'ltr';

    $('.logo').textContent       = getTranslation('appName');
    document.title               = getTranslation('appName');
    $('#hero-title').textContent = getTranslation('heroTitle');
    $('#hero-text').textContent  = getTranslation('heroText');
    $('#search').placeholder     = getTranslation('searchPlaceholder');

    const mc = $('.filters .chips');
    if (mc) {
        mc.querySelectorAll('.chip[data-cat="all"]').forEach(el => el.textContent = getTranslation('all'));
        mc.querySelectorAll('.chip[data-cat="هواتف"]').forEach(el => el.textContent = getTranslation('phones'));
        mc.querySelectorAll('.chip[data-cat="إكسسوارات"]').forEach(el => el.textContent = getTranslation('accessories'));
        mc.querySelectorAll('.chip[data-cat="أجهزة"]').forEach(el => el.textContent = getTranslation('devices'));
    }

    const ss = $('#sort');
    if (ss) {
        ss.options[0].text = getTranslation('sort');
        ss.options[1].text = getTranslation('priceAsc');
        ss.options[2].text = getTranslation('priceDesc');
        ss.options[3].text = getTranslation('nameAsc');
        if (ss.options[4]) ss.options[4].text = getTranslation('ratingDesc');
    }

    const q = (id, key) => { const el = $(id); if (el) el.textContent = getTranslation(key); };
    q('#cart h3',              'cart');
    q('#clearCartBtn',         'clearCart');
    q('#closeCartBtn',         'close');
    q('#checkoutBtn',          'checkout');
    q('#checkout-title',       'checkout');
    q('#checkout-personal-label','personalInfo');
    q('#checkout-delivery-label','deliveryAddress');
    q('#checkout-payment-label', 'paymentMethod');
    q('#wishlist-title',       'wishlist');
    q('#about-heading',        'aboutUs');
    q('#about-text',           'aboutText');
    q('#drawer-title',         'filters');
    q('#drawer-language-label','language');
    q('#drawer-currency-label','currency');
    q('#drawer-theme-label',   'theme');
    q('#drawer-dark-option',   'dark');
    q('#drawer-light-option',  'light');
    q('#drawer-all',           'all');
    q('#drawer-phones',        'phones');
    q('#drawer-accessories',   'accessories');
    q('#drawer-devices',       'devices');
    q('#drawer-sort-label',    'sort');
    q('#drawer-apply',         'apply');

    const pl = $('#drawer-price-label');
    if (pl) pl.textContent = getTranslation('min') + ' / ' + getTranslation('max');

    const lb = $('#drawer-lang-btn');
    if (lb) lb.textContent = state.lang === 'ar' ? 'English' : 'العربية';

    const sb = $('#submit-order-btn');
    if (sb && !sb.disabled) sb.textContent = '✅ ' + getTranslation('confirmOrder');

    populateCurrencySelect();
    populateCountrySelect();
    render();
}

// ===== Render =====
function render() {
    const filtered = data
        .filter(p => state.cat === 'all' || p.cat === state.cat)
        .filter(p => p.name.toLowerCase().includes(state.q.toLowerCase()))
        .filter(p => p.price >= state.minPrice && p.price <= state.maxPrice)
        .sort((a, b) => {
            switch (state.sort) {
                case 'price-asc':   return a.price - b.price;
                case 'price-desc':  return b.price - a.price;
                case 'name-asc':    return a.name.localeCompare(b.name, state.lang === 'ar' ? 'ar' : 'en');
                case 'rating-desc': return b.rating - a.rating;
                default: return 0;
            }
        });

    $('#products').innerHTML = filtered.map(p => `
        <div class="card" data-id="${p.id}">
            <img src="${p.img}" alt="${p.name}" loading="lazy" class="lazy" onload="this.classList.add('loaded')">
            <h3>${p.name}</h3>
            <div class="meta">${getTranslation('category')}: ${p.cat} &bull; ${getTranslation('rating')}: ${p.rating}★</div>
            <div class="price">${formatPrice(p.price)}</div>
            <div class="card-actions">
                <button class="btn" onclick="add(${p.id})">${getTranslation('addToCart')}</button>
                <button class="wishlist-btn ${wishlist.includes(p.id) ? 'active' : ''}" onclick="toggleWishlist(${p.id})">❤️</button>
                <button class="btn icon" onclick="showProductDetail(${p.id})">🔍</button>
            </div>
        </div>`).join('');

    updateStats(filtered);
}
render();

// ===== Debounce / Sort / Filter =====
let timer;
function debouncedRender() {
    clearTimeout(timer);
    timer = setTimeout(() => { state.q = $('#search').value.trim(); render(); }, 250);
}
function applySort() { state.sort = $('#sort').value; render(); }
function filterByCategory(cat, el) {
    state.cat = cat; render();
    $$('.chip').forEach(c => c.classList.remove('active'));
    if (el) el.classList.add('active');
    closeDrawer();
}
function applyPriceFilter() {
    state.minPrice = parseFloat($('#min-price').value) || 0;
    state.maxPrice = parseFloat($('#max-price').value) || Infinity;
    render(); closeDrawer();
}

// ===== Toast =====
function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2500);
}

// ===== Cart =====
function add(id) {
    const p = data.find(x => x.id === id);
    const e = cart.find(i => i.id === id);
    if (e) e.qty += 1;
    else cart.push({ id:p.id, name:p.name, price:p.price, qty:1 });
    persistCart(); updateCartUI();
    toast(getTranslation('addToCart') + ' ✓');
    showAddPopup();
}

function showAddPopup() {
    const el = $('#added');
    if (!el) return;
    el.classList.remove('show'); void el.offsetWidth; el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 1200);
}

function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
    persistCart(); updateCartUI();
}

function removeItem(id) { cart = cart.filter(i => i.id !== id); persistCart(); updateCartUI(); }
function clearCart()    { cart = []; persistCart(); updateCartUI(); toast(getTranslation('clearCart') + ' ✓'); }

function updateCartUI() {
    $('#count').textContent = cart.reduce((s, i) => s + i.qty, 0);
    $('#items').innerHTML = cart.length
        ? cart.map(i => `
            <div class="item">
                <div class="item-name">${i.name}</div>
                <div class="qty">
                    <button onclick="changeQty(${i.id},-1)">−</button>
                    <span>${i.qty}</span>
                    <button onclick="changeQty(${i.id},1)">+</button>
                    <button class="btn danger" style="padding:5px 10px;font-size:13px" onclick="removeItem(${i.id})">${getTranslation('remove')}</button>
                </div>
            </div>`).join('')
        : `<p class="empty-msg">${getTranslation('emptyCart')}</p>`;
    $('#total').textContent = formatPrice(cart.reduce((s, i) => s + i.price * i.qty, 0));
}

function persistCart() { localStorage.setItem('cart', JSON.stringify(cart)); }
function loadCart()    { try { return JSON.parse(localStorage.getItem('cart')) || []; } catch(e) { return []; } }

// ===== Wishlist =====
function loadWishlist()    { try { return JSON.parse(localStorage.getItem('wishlist')) || []; } catch(e) { return []; } }
function persistWishlist() { localStorage.setItem('wishlist', JSON.stringify(wishlist)); }

function updateWishlistUI() {
    const el = $('#wishlist-count');
    if (el) el.textContent = wishlist.length;
}

function toggleWishlist(id) {
    const idx = wishlist.indexOf(id);
    if (idx === -1) { wishlist.push(id); toast(getTranslation('addToWishlist') + ' ✓'); }
    else { wishlist.splice(idx, 1); toast(getTranslation('removeFromWishlist') + ' ✓'); }
    persistWishlist(); updateWishlistUI(); render();
}

function toggleWishlistModal() {
    const modal = $('#wishlist-modal');
    if (modal.style.display === 'block') { modal.style.display = 'none'; return; }
    const items = wishlist.map(id => data.find(p => p.id === id)).filter(Boolean);
    $('#wishlist-items').innerHTML = items.length
        ? items.map(p => `
            <div class="item">
                <div class="item-name">${p.name} — ${formatPrice(p.price)}</div>
                <div class="qty">
                    <button class="btn" style="padding:5px 10px;font-size:13px" onclick="add(${p.id})">${getTranslation('addToCart')}</button>
                    <button class="btn danger" style="padding:5px 10px;font-size:13px" onclick="toggleWishlist(${p.id});toggleWishlistModal();toggleWishlistModal();">${getTranslation('remove')}</button>
                </div>
            </div>`).join('')
        : `<p class="empty-msg">${getTranslation('emptyWishlist')}</p>`;
    modal.style.display = 'block';
}

function closeWishlistBackdrop(e) { if (e.target.id === 'wishlist-modal') toggleWishlistModal(); }

// ===== Reviews =====
function loadReviews()    { try { return JSON.parse(localStorage.getItem('reviews')) || {}; } catch(e) { return {}; } }
function persistReviews() { localStorage.setItem('reviews', JSON.stringify(reviews)); }

function addReview(productId, userName, rating, comment) {
    if (!reviews[productId]) reviews[productId] = [];
    reviews[productId].push({ user:userName, rating, comment,
        date: new Date().toLocaleDateString(state.lang === 'ar' ? 'ar-LY' : 'en-US') });
    persistReviews();
    const product = data.find(p => p.id === productId);
    if (product && reviews[productId].length > 0)
        product.rating = Math.round(reviews[productId].reduce((s, r) => s + r.rating, 0) / reviews[productId].length * 10) / 10;
    if ($('#product-detail') && $('#product-detail').style.display === 'block') showProductDetail(productId);
    render();
}

// ===== Drawer =====
function openDrawer()  { $('#drawer').classList.add('open'); $('#drawer-backdrop').classList.add('open'); }
function closeDrawer() { $('#drawer').classList.remove('open'); $('#drawer-backdrop').classList.remove('open'); }

// ===== Language / Currency / Theme =====
function toggleLanguage() { state.lang = state.lang === 'ar' ? 'en' : 'ar'; updateUILanguage(); }

(function restoreTheme() {
    document.body.dataset.theme = localStorage.getItem('theme') === 'light' ? 'light' : '';
})();
function toggleTheme(theme) { document.body.dataset.theme = theme === 'light' ? 'light' : ''; localStorage.setItem('theme', theme); }

// ===== Cart Modal =====
function toggleCart() {
    const c = $('#cart');
    c.style.display = c.style.display === 'block' ? 'none' : 'block';
}
function closeOnBackdrop(e) { if (e.target.id === 'cart') toggleCart(); }

// ===== Checkout Modal =====
function showCheckout() {
    if (cart.length === 0) { toast(getTranslation('emptyCart')); return; }
    const productsLyd = cart.reduce((s, i) => s + i.price * i.qty, 0);
    $('#order-summary').innerHTML = `
        <div class="order-summary-box">
            <h4>${getTranslation('orderSummary')}</h4>
            ${cart.map(i => `
                <div class="summary-row">
                    <span>${i.name} × ${i.qty}</span>
                    <span>${formatPrice(i.price * i.qty)}</span>
                </div>`).join('')}
            <div class="summary-row summary-total">
                <span><b>${getTranslation('productsTotal')}</b></span>
                <span><b>${formatPrice(productsLyd)}</b></span>
            </div>
        </div>`;

    const form = $('#checkout-form');
    if (form) form.reset();
    toggleReceiptField();
    populateCountrySelect();
    const box = $('#shipping-estimate');
    if (box) box.style.display = 'none';
    const sb = $('#submit-order-btn');
    if (sb) sb.textContent = '✅ ' + getTranslation('confirmOrder');

    $('#cart').style.display = 'none';
    $('#checkout-modal').style.display = 'block';
}

function closeCheckout()             { $('#checkout-modal').style.display = 'none'; }
function closeCheckoutBackdrop(e)    { if (e.target.id === 'checkout-modal') closeCheckout(); }

function toggleReceiptField() {
    const method  = document.querySelector('input[name="payment-method"]:checked');
    const bankInfo = $('#bank-info');
    if (bankInfo) bankInfo.style.display = (method && method.value === 'transfer') ? 'block' : 'none';
}

// ===== Keyboard shortcuts =====
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        $('#cart').style.display = 'none';
        closeCheckout(); closeProductDetail();
        const wl = $('#wishlist-modal'); if (wl) wl.style.display = 'none';
        closeDrawer();
    }
});

// ===== Stats =====
function updateStats(filtered) {
    const sb = $('#stats-bar');
    if (!sb) return;
    sb.innerHTML = `
        <div class="stats-group">
            <div class="stat-item"><div class="stat-value">${filtered.length}</div><div class="stat-label">${getTranslation('statsProducts')}</div></div>
            <div class="stat-item"><div class="stat-value">${cart.reduce((s,i)=>s+i.qty,0)}</div><div class="stat-label">${getTranslation('statsInCart')}</div></div>
            <div class="stat-item"><div class="stat-value">${wishlist.length}</div><div class="stat-label">${getTranslation('statsWishlist')}</div></div>
            <a class="btn about-btn" href="#about">${getTranslation('aboutUsBtn')}</a>
        </div>`;
}

// ===== Product Detail =====
function showProductDetail(id) {
    const product = data.find(p => p.id === id);
    if (!product) return;
    const productReviews = reviews[product.id] || [];
    const reviewsHtml = productReviews.map(r => `
        <div class="rating-item">
            <div class="rating-header"><span>${r.user}</span><span class="rating-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</span></div>
            <div>${r.comment}</div>
            <div style="font-size:12px;color:var(--muted);margin-top:4px;">${r.date}</div>
        </div>`).join('');

    const modalContent = `
        <div class="modal-content glass product-detail">
            <div class="detail-header">
                <h2>${product.name}</h2>
                <button class="btn icon" onclick="closeProductDetail()">✖</button>
            </div>
            <div class="detail-body">
                <div class="detail-image"><img src="${product.img}" alt="${product.name}"></div>
                <div class="detail-info">
                    <p class="price">${formatPrice(product.price)}</p>
                    <p class="meta">${getTranslation('category')}: ${product.cat} &bull; ${getTranslation('rating')}: ${product.rating}★</p>
                    <p class="description">${product.description || ''}</p>
                    <div class="detail-actions">
                        <button class="btn" onclick="add(${product.id}); closeProductDetail();">${getTranslation('addToCart')}</button>
                        <button class="wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}" onclick="toggleWishlist(${product.id})">❤️ ${getTranslation('addToWishlist')}</button>
                    </div>
                </div>
            </div>
            <div class="ratings-section">
                <h3>${getTranslation('addReview')}</h3>
                <div class="add-rating">
                    <input type="text" id="review-name" placeholder="${getTranslation('yourName')}" class="review-input">
                    <div class="star-rating" id="star-rating">${[1,2,3,4,5].map(i=>`<span data-rating="${i}">★</span>`).join('')}</div>
                    <textarea id="review-comment" placeholder="${getTranslation('yourComment')}" rows="3" class="review-textarea"></textarea>
                    <button class="btn" onclick="submitReview(${product.id})">${getTranslation('submitReview')}</button>
                </div>
                <h3 style="margin-top:20px;">${getTranslation('rating')}</h3>
                ${reviewsHtml || `<p class="empty-msg">${getTranslation('noReviews')}</p>`}
            </div>
        </div>`;

    let modal = $('#product-detail');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'product-detail';
        modal.className = 'modal product-detail-modal';
        modal.onclick = function(e) { if (e.target === modal) closeProductDetail(); };
        document.body.appendChild(modal);
    }
    modal.innerHTML = modalContent;
    modal.style.display = 'block';

    const stars = $$('#star-rating span');
    let currentRating = 0;
    stars.forEach(star => {
        star.addEventListener('click', function() {
            currentRating = parseInt(this.dataset.rating);
            stars.forEach((s,i) => s.classList.toggle('active', i < currentRating));
        });
        star.addEventListener('mouseover', function() {
            const r = parseInt(this.dataset.rating);
            stars.forEach((s,i) => s.style.color = i < r ? 'gold' : '#ccc');
        });
        star.addEventListener('mouseout', function() {
            stars.forEach((s,i) => s.style.color = i < currentRating ? 'gold' : '#ccc');
        });
    });

    window.submitReview = function(pid) {
        const name    = $('#review-name').value.trim() || 'مجهول';
        const comment = $('#review-comment').value.trim();
        if (!comment || currentRating === 0) { toast(getTranslation('reviewRequired')); return; }
        addReview(pid, name, currentRating, comment);
        $('#review-name').value = ''; $('#review-comment').value = '';
        stars.forEach(s => { s.classList.remove('active'); s.style.color = '#ccc'; });
        currentRating = 0;
        toast(getTranslation('submitReview') + ' ✓');
    };
}

function closeProductDetail() { const m = $('#product-detail'); if (m) m.style.display = 'none'; }
window.closeProductDetail = closeProductDetail;

// ===== Submit Order =====
async function submitOrder(event) {
    event.preventDefault();

    const name        = $('#checkout-name').value.trim();
    const phone       = $('#checkout-phone').value.trim();
    const email       = $('#checkout-email').value.trim();
    const address     = $('#checkout-address').value.trim();
    const city        = $('#checkout-city').value.trim();
    const zip         = $('#checkout-zip').value.trim();
    const countryCode = $('#checkout-country').value;
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

    if (!name || !phone || !address || !city || !countryCode) {
        toast(getTranslation('fillRequired')); return;
    }

    const phoneClean = phone.replace(/[\s\-]/g, '');
    if (!/^(\+\d{1,4}|09|07|05)\d{7,13}$/.test(phoneClean) || phoneClean.replace(/\D/g,'').length < 10) {
        toast(getTranslation('invalidPhone')); return;
    }

    const submitBtn = $('#submit-order-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = getTranslation('processing');

    try {
        let receiptURL = '';
        if (paymentMethod === 'transfer') {
            const fi = $('#receipt-image');
            if (!fi.files || fi.files.length === 0) {
                toast(getTranslation('uploadReceipt'));
                submitBtn.disabled = false; submitBtn.textContent = '✅ ' + getTranslation('confirmOrder');
                return;
            }
            if (fi.files[0].size > 5 * 1024 * 1024) {
                toast(getTranslation('fileTooLarge'));
                submitBtn.disabled = false; submitBtn.textContent = '✅ ' + getTranslation('confirmOrder');
                return;
            }
            receiptURL = await new Promise((res, rej) => {
                const r = new FileReader();
                r.onload = () => res(r.result); r.onerror = rej;
                r.readAsDataURL(fi.files[0]);
            });
        }

        const countryObj   = countries.find(c => c.code === countryCode) || { ar:countryCode, en:countryCode, cost:0, days:'-' };
        const countryName  = state.lang === 'ar' ? countryObj.ar : countryObj.en;
        const shippingLyd  = countryObj.cost === 0 ? 0 : countryObj.cost / currencies['USD'].rate;
        const productsLyd  = cart.reduce((s,i) => s + i.price * i.qty, 0);
        const grandLyd     = productsLyd + shippingLyd;
        const fullAddress  = `${address}, ${city}${zip ? ' '+zip : ''}, ${countryName}`;
        const itemsList    = cart.map(i => `${i.name} (×${i.qty}) — ${formatPrice(i.price*i.qty)}`).join('\n');
        const payLabel     = paymentMethod === 'transfer' ? 'تحويل بنكي' : 'الدفع عند التوصيل';
        const accountInfo  = paymentMethod === 'transfer'
            ? 'محمد عبد السلام محمد صالح — مصرف الصحاري: 2010393957 — IBAN: LY62006020000002010393957'
            : 'الدفع نقداً عند الاستلام';

        // ⚠️ Replace 'template_0qtw5sv' with your EmailJS template ID if different
        await emailjs.send('service_bzjvjbd', 'template_0qtw5sv', {
            to_name:        'صاحب المتجر',
            from_name:      name,
            from_email:     email || 'غير مقدم',
            phone:          phoneClean,
            address:        fullAddress,
            country:        countryName,
            items:          itemsList,
            products_total: formatPrice(productsLyd),
            shipping_cost:  countryObj.cost === 0 ? 'مجاني' : formatShipping(countryObj.cost),
            shipping_days:  countryObj.days,
            grand_total:    formatPrice(grandLyd),
            currency:       state.currency,
            payment_method: payLabel,
            account_info:   accountInfo,
            receipt_image:  receiptURL ? '[صورة الإيصال مرفقة]' : 'لا يوجد',
            date:           new Date().toLocaleString('ar-LY')
        });

        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push({
            name, phone: phoneClean, email, address: fullAddress, country: countryName,
            items: itemsList, productsTotal: formatPrice(productsLyd),
            shippingCost: countryObj.cost === 0 ? 'مجاني' : formatShipping(countryObj.cost),
            grandTotal: formatPrice(grandLyd), currency: state.currency,
            paymentMethod: payLabel,
            status: paymentMethod === 'transfer' ? 'في انتظار الدفع' : 'في انتظار التأكيد',
            date: new Date().toISOString()
        });
        localStorage.setItem('orders', JSON.stringify(orders));

        toast(paymentMethod === 'transfer' ? getTranslation('orderSuccessTransfer') : getTranslation('orderSuccess'));
        clearCart(); closeCheckout();

    } catch(err) {
        console.error('Order error:', err);
        toast(getTranslation('orderError'));
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = '✅ ' + getTranslation('confirmOrder');
    }
}

// ===== Init =====
fetchLiveRates().then(() => {
    updateCartUI();
    updateWishlistUI();
    updateUILanguage();
});
