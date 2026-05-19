const LYD = new Intl.NumberFormat('ar-LY', { style: 'currency', currency: 'LYD' });
const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);

// ===== Data =====
const data = [
    { id: 1, name: "سامسونج A52", price: 2450, img: "https://picsum.photos/seed/phone/420/300", cat: "هواتف", rating: 4.6, description: "هاتف ممتاز بشاشة كبيرة وأداء قوي.", images: ["https://picsum.photos/seed/phone1/420/300", "https://picsum.photos/seed/phone2/420/300"] },
    { id: 2, name: "سماعات سوني برو", price: 820, img: "https://picsum.photos/seed/ear/420/300", cat: "إكسسوارات", rating: 4.3, description: "سماعات لاسلكية مع عزل ضوضاء.", images: ["https://picsum.photos/seed/ear1/420/300"] },
    { id: 3, name: "كيبورد ميكانيكي RX", price: 170, img: "https://picsum.photos/seed/keys/420/300", cat: "إكسسوارات", rating: 4.8, description: "لوحة مفاتيح ميكانيكية بإضاءة RGB.", images: ["https://picsum.photos/seed/keys1/420/300"] },
    { id: 4, name: "ماوس G1", price: 130, img: "https://picsum.photos/seed/mouse/420/300", cat: "إكسسوارات", rating: 4.5, description: "ماوس ألعاب دقيق وسريع.", images: [] },
    { id: 5, name: "تاب Tab10", price: 1950, img: "https://picsum.photos/seed/tab/420/300", cat: "أجهزة", rating: 4.4, description: "جهاز لوحي بشاشة عالية الدقة.", images: [] },
    { id: 6, name: "لابتوب لايت", price: 5400, img: "https://picsum.photos/seed/laptop/420/300", cat: "أجهزة", rating: 4.7, description: "لابتوب خفيف الوزن وعمر بطارية طويل.", images: [] },
    { id: 7, name: "كتاب إلكتروني", price: 7500, img: "https://picsum.photos/seed/book/420/300", cat: "أجهزة", rating: 4.2, description: "قارئ كتب إلكتروني بشاشة حبر إلكتروني.", images: [] }
];

// ===== State =====
let state = {
    q: '',
    cat: 'all',
    sort: 'default',
    minPrice: 0,
    maxPrice: Infinity,
    lang: 'ar'
};

let cart = loadCart();
let wishlist = loadWishlist();
let reviews = loadReviews();

// ===== الترجمة =====
const translations = {
    ar: {
        appName: 'متجري الاحترافي',
        searchPlaceholder: 'ابحث عن منتج…',
        all: 'الكل',
        phones: 'هواتف',
        accessories: 'إكسسوارات',
        devices: 'أجهزة',
        sort: 'الترتيب',
        priceAsc: 'السعر: من الأرخص للأغلى',
        priceDesc: 'السعر: من الأغلى للأرخص',
        nameAsc: 'الاسم: أ → ي',
        ratingDesc: 'التقييم: الأعلى أولاً',
        cart: 'سلة المشتريات',
        total: 'الإجمالي',
        emptyCart: 'السلة فارغة',
        clearCart: 'تفريغ السلة',
        close: 'إغلاق',
        checkout: 'إتمام الشراء',
        confirmOrder: 'تأكيد الطلب',
        productDetails: 'تفاصيل المنتج',
        description: 'الوصف',
        addReview: 'أضف تقييمك',
        submitReview: 'إرسال التقييم',
        yourName: 'اسمك',
        yourComment: 'تعليقك',
        addToCart: 'إضافة إلى السلة',
        addToWishlist: 'أضف للمفضلة',
        removeFromWishlist: 'إزالة من المفضلة',
        statsProducts: 'منتج',
        statsInCart: 'في السلة',
        statsWishlist: 'في المفضلة',
        aboutUs: 'من نحن',
        aboutText: 'متجري الاحترافي هو وجهتك الأولى لأحدث الأجهزة والإكسسوارات بأسعار مناسبة وجودة عالية.',
        apply: 'تطبيق',
        min: 'الحد الأدنى',
        max: 'الحد الأقصى',
        remove: 'حذف',
        category: 'التصنيف',
        rating: 'التقييم',
        heroTitle: 'تسوّق بذكاء',
        heroText: 'أفضل المنتجات بتصميم داكن فخم وسرعة عالية وتجربة مثالية.',
        filters: 'الفلاتر',
        language: 'اللغة',
        theme: 'الوضع',
        dark: 'داكن',
        light: 'فاتح',
        wishlist: 'المفضلة',
        emptyWishlist: 'المفضلة فارغة',
        orderSummary: 'ملخص الطلب',
        personalInfo: 'البيانات الشخصية',
        deliveryAddress: 'عنوان التوصيل',
        paymentMethod: 'طريقة الدفع',
        cod: '💵 الدفع عند التوصيل',
        bankTransfer: '🏦 تحويل بنكي',
        processing: 'جاري المعالجة...',
        orderSuccess: 'تم إرسال الطلب بنجاح! سنتواصل معك قريباً.',
        orderSuccessTransfer: 'تم إرسال الطلب مع الإيصال. سنقوم بالتحقق والتواصل معك قريباً.',
        orderError: 'فشل إرسال الطلب. يرجى المحاولة مرة أخرى.',
        fillRequired: 'الرجاء ملء جميع الحقول الإجبارية',
        invalidPhone: 'رقم الهاتف غير صحيح. يجب أن يبدأ بـ +218 أو 09 أو رمز دولي، ولا يقل عن 10 أرقام.',
        uploadReceipt: 'الرجاء اختيار صورة الإيصال',
        fileTooLarge: 'حجم الصورة يتجاوز 5 ميجابايت',
        reviewRequired: 'الرجاء إدخال تعليق وتقييم بالنجوم',
        noReviews: 'لا توجد تقييمات بعد',
        aboutUsBtn: 'من نحن'
    },
    en: {
        appName: 'My Professional Store',
        searchPlaceholder: 'Search products…',
        all: 'All',
        phones: 'Phones',
        accessories: 'Accessories',
        devices: 'Devices',
        sort: 'Sort',
        priceAsc: 'Price: Low to High',
        priceDesc: 'Price: High to Low',
        nameAsc: 'Name: A → Z',
        ratingDesc: 'Rating: Highest First',
        cart: 'Shopping Cart',
        total: 'Total',
        emptyCart: 'Cart is empty',
        clearCart: 'Clear Cart',
        close: 'Close',
        checkout: 'Checkout',
        confirmOrder: 'Confirm Order',
        productDetails: 'Product Details',
        description: 'Description',
        addReview: 'Add Review',
        submitReview: 'Submit Review',
        yourName: 'Your Name',
        yourComment: 'Your Comment',
        addToCart: 'Add to Cart',
        addToWishlist: 'Add to Wishlist',
        removeFromWishlist: 'Remove from Wishlist',
        statsProducts: 'Products',
        statsInCart: 'In Cart',
        statsWishlist: 'In Wishlist',
        aboutUs: 'About Us',
        aboutText: 'My Professional Store is your first destination for the latest devices and accessories at affordable prices and high quality.',
        apply: 'Apply',
        min: 'Min',
        max: 'Max',
        remove: 'Remove',
        category: 'Category',
        rating: 'Rating',
        heroTitle: 'Shop Smart',
        heroText: 'Best products with a sleek dark design, high speed, and perfect experience.',
        filters: 'Filters',
        language: 'Language',
        theme: 'Theme',
        dark: 'Dark',
        light: 'Light',
        wishlist: 'Wishlist',
        emptyWishlist: 'Wishlist is empty',
        orderSummary: 'Order Summary',
        personalInfo: 'Personal Information',
        deliveryAddress: 'Delivery Address',
        paymentMethod: 'Payment Method',
        cod: '💵 Cash on Delivery',
        bankTransfer: '🏦 Bank Transfer',
        processing: 'Processing...',
        orderSuccess: 'Order sent successfully! We will contact you soon.',
        orderSuccessTransfer: 'Order sent with receipt. We will verify and contact you soon.',
        orderError: 'Failed to send order. Please try again.',
        fillRequired: 'Please fill in all required fields',
        invalidPhone: 'Invalid phone. Must start with +218, 09, or a country code and be at least 10 digits.',
        uploadReceipt: 'Please upload a receipt image',
        fileTooLarge: 'File size exceeds 5MB',
        reviewRequired: 'Please enter a comment and select star rating',
        noReviews: 'No reviews yet',
        aboutUsBtn: 'About Us'
    }
};

// ===== getTranslation — single definition =====
function getTranslation(key) {
    return (translations[state.lang] && translations[state.lang][key]) ? translations[state.lang][key] : key;
}

// ===== تحديث واجهة المستخدم بالكامل =====
function updateUILanguage() {
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';

    $('.logo').textContent = getTranslation('appName');
    document.title = getTranslation('appName');
    $('#hero-title').textContent = getTranslation('heroTitle');
    $('#hero-text').textContent = getTranslation('heroText');
    $('#search').placeholder = getTranslation('searchPlaceholder');

    // Filter chips (main bar)
    const mainChips = $('.filters .chips');
    if (mainChips) {
        mainChips.querySelectorAll('.chip[data-cat="all"]').forEach(el => el.textContent = getTranslation('all'));
        mainChips.querySelectorAll('.chip[data-cat="هواتف"]').forEach(el => el.textContent = getTranslation('phones'));
        mainChips.querySelectorAll('.chip[data-cat="إكسسوارات"]').forEach(el => el.textContent = getTranslation('accessories'));
        mainChips.querySelectorAll('.chip[data-cat="أجهزة"]').forEach(el => el.textContent = getTranslation('devices'));
    }

    // Sort options
    const sortSelect = $('#sort');
    if (sortSelect) {
        sortSelect.options[0].text = getTranslation('sort');
        sortSelect.options[1].text = getTranslation('priceAsc');
        sortSelect.options[2].text = getTranslation('priceDesc');
        sortSelect.options[3].text = getTranslation('nameAsc');
        if (sortSelect.options[4]) sortSelect.options[4].text = getTranslation('ratingDesc');
    }

    // Cart modal
    const cartH3 = $('#cart h3');
    if (cartH3) cartH3.textContent = getTranslation('cart');
    const clearBtn = $('#clearCartBtn');
    if (clearBtn) clearBtn.textContent = getTranslation('clearCart');
    const closeBtn = $('#closeCartBtn');
    if (closeBtn) closeBtn.textContent = getTranslation('close');
    const checkoutBtn = $('#checkoutBtn');
    if (checkoutBtn) checkoutBtn.textContent = getTranslation('checkout');

    // Checkout modal
    const checkoutTitle = $('#checkout-title');
    if (checkoutTitle) checkoutTitle.textContent = getTranslation('checkout');
    const checkoutPersonal = $('#checkout-personal-label');
    if (checkoutPersonal) checkoutPersonal.textContent = getTranslation('personalInfo');
    const checkoutDelivery = $('#checkout-delivery-label');
    if (checkoutDelivery) checkoutDelivery.textContent = getTranslation('deliveryAddress');
    const checkoutPayment = $('#checkout-payment-label');
    if (checkoutPayment) checkoutPayment.textContent = getTranslation('paymentMethod');
    const submitOrderBtn = $('#submit-order-btn');
    if (submitOrderBtn && !submitOrderBtn.disabled) submitOrderBtn.textContent = '✅ ' + getTranslation('confirmOrder');

    // Wishlist modal
    const wishlistTitle = $('#wishlist-title');
    if (wishlistTitle) wishlistTitle.textContent = getTranslation('wishlist');

    // About section
    $('#about-heading').textContent = getTranslation('aboutUs');
    $('#about-text').textContent = getTranslation('aboutText');

    // Drawer
    $('#drawer-title').textContent = getTranslation('filters');
    $('#drawer-language-label').textContent = getTranslation('language');
    $('#drawer-theme-label').textContent = getTranslation('theme');
    $('#drawer-dark-option').textContent = getTranslation('dark');
    $('#drawer-light-option').textContent = getTranslation('light');
    $('#drawer-all').textContent = getTranslation('all');
    $('#drawer-phones').textContent = getTranslation('phones');
    $('#drawer-accessories').textContent = getTranslation('accessories');
    $('#drawer-devices').textContent = getTranslation('devices');
    $('#drawer-sort-label').textContent = getTranslation('sort');
    $('#drawer-price-label').textContent = getTranslation('min') + ' / ' + getTranslation('max');
    $('#drawer-apply').textContent = getTranslation('apply');
    $('#drawer-lang-btn').textContent = state.lang === 'ar' ? 'English' : 'العربية';

    render();
}

// ===== Header scroll =====
let lastScrollTop = 0;
const header = $('.header');
window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 60) {
        header.classList.add('header-hidden');
    } else {
        header.classList.remove('header-hidden');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);

// ===== Rendering =====
function render() {
    const filtered = data
        .filter(p => state.cat === 'all' ? true : p.cat === state.cat)
        .filter(p => p.name.toLowerCase().includes(state.q.toLowerCase()))
        .filter(p => p.price >= state.minPrice && p.price <= state.maxPrice)
        .sort((a, b) => {
            switch (state.sort) {
                case 'price-asc': return a.price - b.price;
                case 'price-desc': return b.price - a.price;
                case 'name-asc': return a.name.localeCompare(b.name, state.lang === 'ar' ? 'ar' : 'en');
                case 'rating-desc': return b.rating - a.rating;
                default: return 0;
            }
        });

    $('#products').innerHTML = filtered.map(p => `
        <div class="card" data-id="${p.id}">
            <img src="${p.img}" alt="${p.name}" loading="lazy" class="lazy" onload="this.classList.add('loaded')">
            <h3>${p.name}</h3>
            <div class="meta">${getTranslation('category')}: ${p.cat} &bull; ${getTranslation('rating')}: ${p.rating}★</div>
            <div class="price">${LYD.format(p.price)}</div>
            <div class="card-actions">
                <button class="btn" onclick="add(${p.id})">${getTranslation('addToCart')}</button>
                <button class="wishlist-btn ${wishlist.includes(p.id) ? 'active' : ''}" onclick="toggleWishlist(${p.id})">❤️</button>
                <button class="btn icon" onclick="showProductDetail(${p.id})">🔍</button>
            </div>
        </div>
    `).join('');

    updateStats(filtered);
}
render();

// ===== Debounce =====
let timer;
function debouncedRender() {
    clearTimeout(timer);
    timer = setTimeout(() => { state.q = $('#search').value.trim(); render(); }, 250);
}

function applySort() {
    state.sort = $('#sort').value;
    render();
}

function filterByCategory(cat, el) {
    state.cat = cat;
    render();
    $$('.chip').forEach(c => c.classList.remove('active'));
    if (el) el.classList.add('active');
    closeDrawer();
}

function applyPriceFilter() {
    const min = parseFloat($('#min-price').value) || 0;
    const max = parseFloat($('#max-price').value) || Infinity;
    state.minPrice = min;
    state.maxPrice = max;
    render();
    closeDrawer();
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
    const exists = cart.find(i => i.id === id);
    if (exists) { exists.qty += 1; }
    else { cart.push({ id: p.id, name: p.name, price: p.price, qty: 1 }); }
    persistCart();
    updateCartUI();
    toast(getTranslation('addToCart') + ' ✓');
    showAddPopup();
}

function showAddPopup() {
    const el = $('#added');
    if (!el) return;
    el.classList.remove('show');
    void el.offsetWidth;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 1200);
}

function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) { cart = cart.filter(i => i.id !== id); }
    persistCart();
    updateCartUI();
}

function removeItem(id) { cart = cart.filter(i => i.id !== id); persistCart(); updateCartUI(); }

function clearCart() { cart = []; persistCart(); updateCartUI(); toast(getTranslation('clearCart') + ' ✓'); }

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
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    $('#total').textContent = LYD.format(total);
}

function persistCart() { localStorage.setItem('cart', JSON.stringify(cart)); }
function loadCart() { try { return JSON.parse(localStorage.getItem('cart')) || []; } catch (e) { return []; } }

// ===== Wishlist =====
function loadWishlist() { try { return JSON.parse(localStorage.getItem('wishlist')) || []; } catch (e) { return []; } }
function persistWishlist() { localStorage.setItem('wishlist', JSON.stringify(wishlist)); }

function updateWishlistUI() {
    const el = $('#wishlist-count');
    if (el) el.textContent = wishlist.length;
}

function toggleWishlist(id) {
    const index = wishlist.indexOf(id);
    if (index === -1) {
        wishlist.push(id);
        toast(getTranslation('addToWishlist') + ' ✓');
    } else {
        wishlist.splice(index, 1);
        toast(getTranslation('removeFromWishlist') + ' ✓');
    }
    persistWishlist();
    updateWishlistUI();
    render();
}

function toggleWishlistModal() {
    const modal = $('#wishlist-modal');
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
        return;
    }
    const items = wishlist.map(id => data.find(p => p.id === id)).filter(Boolean);
    $('#wishlist-items').innerHTML = items.length
        ? items.map(p => `
            <div class="item">
                <div class="item-name">${p.name} — ${LYD.format(p.price)}</div>
                <div class="qty">
                    <button class="btn" style="padding:5px 10px;font-size:13px" onclick="add(${p.id})">${getTranslation('addToCart')}</button>
                    <button class="btn danger" style="padding:5px 10px;font-size:13px" onclick="toggleWishlist(${p.id});toggleWishlistModal();toggleWishlistModal();">${getTranslation('remove')}</button>
                </div>
            </div>`).join('')
        : `<p class="empty-msg">${getTranslation('emptyWishlist')}</p>`;
    modal.style.display = 'block';
}

function closeWishlistBackdrop(e) {
    if (e.target.id === 'wishlist-modal') toggleWishlistModal();
}

// ===== Reviews =====
function loadReviews() { try { return JSON.parse(localStorage.getItem('reviews')) || {}; } catch (e) { return {}; } }
function persistReviews() { localStorage.setItem('reviews', JSON.stringify(reviews)); }

function addReview(productId, userName, rating, comment) {
    if (!reviews[productId]) reviews[productId] = [];
    reviews[productId].push({
        user: userName,
        rating: rating,
        comment: comment,
        date: new Date().toLocaleDateString(state.lang === 'ar' ? 'ar-LY' : 'en-US')
    });
    persistReviews();
    const product = data.find(p => p.id === productId);
    if (product && reviews[productId].length > 0) {
        const avg = reviews[productId].reduce((sum, r) => sum + r.rating, 0) / reviews[productId].length;
        product.rating = Math.round(avg * 10) / 10;
    }
    if ($('#product-detail') && $('#product-detail').style.display === 'block') {
        showProductDetail(productId);
    }
    render();
}

// ===== Drawer =====
function openDrawer() {
    $('#drawer').classList.add('open');
    $('#drawer-backdrop').classList.add('open');
}
function closeDrawer() {
    $('#drawer').classList.remove('open');
    $('#drawer-backdrop').classList.remove('open');
}

// ===== Language =====
function toggleLanguage() {
    state.lang = state.lang === 'ar' ? 'en' : 'ar';
    updateUILanguage();
}

// ===== Theme =====
(function restoreTheme() {
    const t = localStorage.getItem('theme') || 'dark';
    document.body.dataset.theme = t === 'light' ? 'light' : '';
})();

function toggleTheme(theme) {
    document.body.dataset.theme = theme === 'light' ? 'light' : '';
    localStorage.setItem('theme', theme);
}

// ===== Cart Modal =====
function toggleCart() {
    const c = $('#cart');
    c.style.display = c.style.display === 'block' ? 'none' : 'block';
}
function closeOnBackdrop(e) { if (e.target.id === 'cart') toggleCart(); }

// ===== Checkout Modal =====
function showCheckout() {
    if (cart.length === 0) {
        toast(getTranslation('emptyCart'));
        return;
    }
    const summaryHtml = `
        <div class="order-summary-box">
            <h4>${getTranslation('orderSummary')}</h4>
            ${cart.map(i => `
                <div class="summary-row">
                    <span>${i.name} × ${i.qty}</span>
                    <span>${LYD.format(i.price * i.qty)}</span>
                </div>`).join('')}
            <div class="summary-row summary-total">
                <span><b>${getTranslation('total')}</b></span>
                <span><b>${LYD.format(cart.reduce((s, i) => s + i.price * i.qty, 0))}</b></span>
            </div>
        </div>`;
    $('#order-summary').innerHTML = summaryHtml;

    const form = $('#checkout-form');
    if (form) form.reset();
    toggleReceiptField();

    const submitBtn = $('#submit-order-btn');
    if (submitBtn) submitBtn.textContent = '✅ ' + getTranslation('confirmOrder');

    $('#cart').style.display = 'none';
    $('#checkout-modal').style.display = 'block';
}

function closeCheckout() {
    $('#checkout-modal').style.display = 'none';
}

function closeCheckoutBackdrop(e) {
    if (e.target.id === 'checkout-modal') closeCheckout();
}

function toggleReceiptField() {
    const method = document.querySelector('input[name="payment-method"]:checked');
    const bankInfo = $('#bank-info');
    if (bankInfo) {
        bankInfo.style.display = (method && method.value === 'transfer') ? 'block' : 'none';
    }
}

// ===== Keyboard shortcuts =====
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        $('#cart').style.display = 'none';
        closeCheckout();
        closeProductDetail();
        const wl = $('#wishlist-modal');
        if (wl) wl.style.display = 'none';
        closeDrawer();
    }
});

// ===== Stats — centered group with About Us button =====
function updateStats(filteredProducts) {
    const statsBar = $('#stats-bar');
    if (!statsBar) return;
    statsBar.innerHTML = `
        <div class="stats-group">
            <div class="stat-item">
                <div class="stat-value">${filteredProducts.length}</div>
                <div class="stat-label">${getTranslation('statsProducts')}</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${cart.reduce((s, i) => s + i.qty, 0)}</div>
                <div class="stat-label">${getTranslation('statsInCart')}</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${wishlist.length}</div>
                <div class="stat-label">${getTranslation('statsWishlist')}</div>
            </div>
            <a class="btn about-btn" href="#about">${getTranslation('aboutUsBtn')}</a>
        </div>`;
}

// ===== Product Detail Modal =====
function showProductDetail(id) {
    const product = data.find(p => p.id === id);
    if (!product) return;
    const productReviews = reviews[product.id] || [];
    const reviewsHtml = productReviews.map(r => `
        <div class="rating-item">
            <div class="rating-header">
                <span>${r.user}</span>
                <span class="rating-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
            </div>
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
                <div class="detail-image">
                    <img src="${product.img}" alt="${product.name}">
                </div>
                <div class="detail-info">
                    <p class="price">${LYD.format(product.price)}</p>
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
                    <div class="star-rating" id="star-rating">
                        ${[1, 2, 3, 4, 5].map(i => `<span data-rating="${i}">★</span>`).join('')}
                    </div>
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
        modal.onclick = function (e) { if (e.target === modal) closeProductDetail(); };
        document.body.appendChild(modal);
    }
    modal.innerHTML = modalContent;
    modal.style.display = 'block';

    // Star rating setup
    const stars = $$('#star-rating span');
    let currentRating = 0;
    stars.forEach(star => {
        star.addEventListener('click', function () {
            currentRating = parseInt(this.dataset.rating);
            stars.forEach((s, i) => s.classList.toggle('active', i < currentRating));
        });
        star.addEventListener('mouseover', function () {
            const r = parseInt(this.dataset.rating);
            stars.forEach((s, i) => s.style.color = i < r ? 'gold' : '#ccc');
        });
        star.addEventListener('mouseout', function () {
            stars.forEach((s, i) => s.style.color = i < currentRating ? 'gold' : '#ccc');
        });
    });

    window.submitReview = function (pid) {
        const name = $('#review-name').value.trim() || 'مجهول';
        const comment = $('#review-comment').value.trim();
        if (!comment || currentRating === 0) { toast(getTranslation('reviewRequired')); return; }
        addReview(pid, name, currentRating, comment);
        $('#review-name').value = '';
        $('#review-comment').value = '';
        stars.forEach(s => { s.classList.remove('active'); s.style.color = '#ccc'; });
        currentRating = 0;
        toast(getTranslation('submitReview') + ' ✓');
    };
}

function closeProductDetail() {
    const modal = $('#product-detail');
    if (modal) modal.style.display = 'none';
}
window.closeProductDetail = closeProductDetail;

// ===== Submit Order =====
async function submitOrder(event) {
    event.preventDefault();

    const name    = $('#checkout-name').value.trim();
    const phone   = $('#checkout-phone').value.trim();
    const email   = $('#checkout-email').value.trim();
    const address = $('#checkout-address').value.trim();
    const city    = $('#checkout-city').value.trim();
    const zip     = $('#checkout-zip').value.trim();   // optional
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

    // Required fields (zip excluded)
    if (!name || !phone || !address || !city) {
        toast(getTranslation('fillRequired'));
        return;
    }

    // Phone validation: +countryCode... OR 09/07/05... — minimum 10 digits total
    const phoneClean = phone.replace(/[\s\-]/g, '');
    const phoneRegex = /^(\+\d{1,4}|09|07|05)\d{7,13}$/;
    if (!phoneRegex.test(phoneClean) || phoneClean.replace(/\D/g, '').length < 10) {
        toast(getTranslation('invalidPhone'));
        return;
    }

    const submitBtn = $('#submit-order-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = getTranslation('processing');

    try {
        let receiptURL = '';

        if (paymentMethod === 'transfer') {
            const fileInput = $('#receipt-image');
            if (!fileInput.files || fileInput.files.length === 0) {
                toast(getTranslation('uploadReceipt'));
                submitBtn.disabled = false;
                submitBtn.textContent = '✅ ' + getTranslation('confirmOrder');
                return;
            }
            const file = fileInput.files[0];
            if (file.size > 5 * 1024 * 1024) {
                toast(getTranslation('fileTooLarge'));
                submitBtn.disabled = false;
                submitBtn.textContent = '✅ ' + getTranslation('confirmOrder');
                return;
            }
            // Convert to base64 (no Firebase needed)
            receiptURL = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }

        const fullAddress = zip ? `${address}, ${city} ${zip}` : `${address}, ${city}`;
        const itemsList   = cart.map(i => `${i.name} (×${i.qty}) — ${LYD.format(i.price * i.qty)}`).join('\n');
        const totalAmount = LYD.format(cart.reduce((s, i) => s + i.price * i.qty, 0));
        const paymentLabel = paymentMethod === 'transfer' ? 'تحويل بنكي' : 'الدفع عند التوصيل';
        const accountInfo  = paymentMethod === 'transfer'
            ? 'محمد عبد السلام محمد صالح — مصرف الصحاري: 2010393957 — IBAN: LY62006020000002010393957'
            : 'الدفع نقداً عند الاستلام';

        // emailjs.send(serviceID, templateID, params)
        // Replace 'template_XXXXXXX' with your real EmailJS template ID
        await emailjs.send('service_bzjvjbd', 'template_XXXXXXX', {
            to_name: 'صاحب المتجر',
            from_name: name,
            from_email: email || 'غير مقدم',
            phone: phoneClean,
            address: fullAddress,
            items: itemsList,
            total: totalAmount,
            payment_method: paymentLabel,
            account_info: accountInfo,
            receipt_image: receiptURL ? '[صورة الإيصال مرفقة]' : 'لا يوجد',
            date: new Date().toLocaleString('ar-LY')
        });

        // Save locally
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push({
            name, phone: phoneClean, email, address: fullAddress,
            items: itemsList, total: totalAmount,
            paymentMethod: paymentLabel,
            status: paymentMethod === 'transfer' ? 'في انتظار الدفع' : 'في انتظار التأكيد',
            date: new Date().toISOString()
        });
        localStorage.setItem('orders', JSON.stringify(orders));

        toast(paymentMethod === 'transfer'
            ? getTranslation('orderSuccessTransfer')
            : getTranslation('orderSuccess'));
        clearCart();
        closeCheckout();

    } catch (error) {
        console.error('Order error:', error);
        toast(getTranslation('orderError'));
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = '✅ ' + getTranslation('confirmOrder');
    }
}

// ===== Init =====
updateCartUI();
updateWishlistUI();
updateUILanguage();
