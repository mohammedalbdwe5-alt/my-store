// ===== Utilities =====
const LYD = new Intl.NumberFormat('ar-LY', {style:'currency', currency:'LYD'});
const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);

// ===== Data (sample) مع أسماء واضحة =====
const data = [
    {id:1, name:"سامسونج A52", price:2450, img:"https://picsum.photos/seed/phone/420/300",
     cat:"هواتف", rating:4.6, description:"هاتف ممتاز بشاشة كبيرة وأداء قوي.", images:["https://picsum.photos/seed/phone1/420/300","https://picsum.photos/seed/phone2/420/300"]},
    {id:2, name:"سماعات سوني برو", price:820, img:"https://picsum.photos/seed/ear/420/300",
     cat:"إكسسوارات", rating:4.3, description:"سماعات لاسلكية مع عزل ضوضاء.", images:["https://picsum.photos/seed/ear1/420/300"]},
    {id:3, name:"كيبورد ميكانيكي RX", price:170, img:"https://picsum.photos/seed/keys/420/300",
     cat:"إكسسوارات", rating:4.8, description:"لوحة مفاتيح ميكانيكية بإضاءة RGB.", images:["https://picsum.photos/seed/keys1/420/300"]},
    {id:4, name:"ماوس G1", price:130, img:"https://picsum.photos/seed/mouse/420/300",
     cat:"إكسسوارات", rating:4.5, description:"ماوس ألعاب دقيق وسريع.", images:[]},
    {id:5, name:"تاب Tab10", price:1950, img:"https://picsum.photos/seed/tab/420/300",
     cat:"أجهزة", rating:4.4, description:"جهاز لوحي بشاشة عالية الدقة.", images:[]},
    {id:6, name:"لابتوب لايت", price:5400, img:"https://picsum.photos/seed/laptop/420/300",
     cat:"أجهزة", rating:4.7, description:"لابتوب خفيف الوزن وعمر بطارية طويل.", images:[]},
    {id:7, name:"كتاب إلكتروني", price:7500, img:"https://picsum.photos/seed/book/420/300",
     cat:"أجهزة", rating:4.2, description:"قارئ كتب إلكتروني بشاشة حبر إلكتروني.", images:[]}
];

// ===== State =====
let state = {
    q: '',
    cat: 'all',
    sort: 'default',
    minPrice: 0,
    maxPrice: Infinity,
    lang: 'ar' // 'ar' or 'en'
};
let cart = loadCart();
let wishlist = loadWishlist();
let reviews = loadReviews();

updateCartUI();
updateWishlistUI();

// ===== الترجمة الكاملة =====
const translations = {
    ar: {
        // عام
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
        // شريط جانبي
        filters: 'الفلاتر',
        language: 'اللغة',
        theme: 'الوضع',
        dark: 'داكن',
        light: 'فاتح',
        menu: 'القائمة'
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
        menu: 'Menu'
    }
};

function getTranslation(key) {
    return translations[state.lang][key] || key;
}

// ===== تحديث واجهة المستخدم بالكامل حسب اللغة =====
function updateUILanguage() {
    // تغيير اتجاه الصفحة ولغة HTML
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
    
    // النصوص الثابتة
    $('.logo').textContent = getTranslation('appName');
    $('#hero-title').textContent = getTranslation('heroTitle');
    $('#hero-text').textContent = getTranslation('heroText');
    $('#search').placeholder = getTranslation('searchPlaceholder');
    
    // أزرار التصنيفات
    $$('.chip[data-cat="all"]')[0].textContent = getTranslation('all');
    $$('.chip[data-cat="هواتف"]')[0].textContent = getTranslation('phones');
    $$('.chip[data-cat="إكسسوارات"]')[0].textContent = getTranslation('accessories');
    $$('.chip[data-cat="أجهزة"]')[0].textContent = getTranslation('devices');
    
    // خيارات الترتيب
    const sortSelect = $('#sort');
    sortSelect.options[0].text = getTranslation('sort');
    sortSelect.options[1].text = getTranslation('priceAsc');
    sortSelect.options[2].text = getTranslation('priceDesc');
    sortSelect.options[3].text = getTranslation('nameAsc');
    // إضافة خيار الترتيب حسب التقييم إذا لم يكن موجوداً
    if (sortSelect.options.length < 5) {
        sortSelect.add(new Option(getTranslation('ratingDesc'), 'rating-desc'));
    } else {
        sortSelect.options[4].text = getTranslation('ratingDesc');
    }

    // نصوص السلة
    $('#cart h3').textContent = getTranslation('cart');
    $('#clearCartBtn').textContent = getTranslation('clearCart');
    $('#closeCartBtn').textContent = getTranslation('close');
    $('#checkoutBtn').textContent = getTranslation('checkout');
    
    // قسم "من نحن"
    $('#about-heading').textContent = getTranslation('aboutUs');
    $('#about-text').textContent = getTranslation('aboutText');
    
    // شريط جانبي
    $('#drawer-title').textContent = getTranslation('filters');
    $('#drawer-language-label').textContent = getTranslation('language');
    $('#drawer-theme-label').textContent = getTranslation('theme');
    $('#drawer-dark-option').textContent = getTranslation('dark');
    $('#drawer-light-option').textContent = getTranslation('light');
    
    // أزرار الفلاتر في الشريط الجانبي
    $('#drawer-all').textContent = getTranslation('all');
    $('#drawer-phones').textContent = getTranslation('phones');
    $('#drawer-accessories').textContent = getTranslation('accessories');
    $('#drawer-devices').textContent = getTranslation('devices');
    $('#drawer-sort-label').textContent = getTranslation('sort');
    $('#drawer-price-label').textContent = getTranslation('min') + ' / ' + getTranslation('max');
    $('#drawer-apply').textContent = getTranslation('apply');
    
    // زر تبديل اللغة في الشريط
    $('#drawer-lang-btn').textContent = state.lang === 'ar' ? 'English' : 'العربية';
    
    // تحديث باقي النصوص التي قد تظهر
    render(); // إعادة رسم المنتجات لتحديث الأزرار داخل البطاقات
}

// ===== Header scroll =====
let lastScrollTop = 0;
const header = $(".header");
window.addEventListener("scroll", function(){
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if(scrollTop > lastScrollTop){
        header.classList.add("header-hidden");
    }else{
        header.classList.remove("header-hidden");
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);

// ===== Rendering with filters =====
function render(){
    const filtered = data
        .filter(p => state.cat === 'all' ? true : p.cat === state.cat)
        .filter(p => p.name.toLowerCase().includes(state.q.toLowerCase()))
        .filter(p => p.price >= state.minPrice && p.price <= state.maxPrice)
        .sort((a,b)=>{
            switch(state.sort){
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
            <div class="meta">${getTranslation('category')}: ${p.cat} • ${getTranslation('rating')}: ${p.rating}★</div>
            <div class="price">${LYD.format(p.price)}</div>
            <div style="display: flex; gap: 8px; justify-content: center;">
                <button class="btn" onclick="add(${p.id})">${getTranslation('addToCart')}</button>
                <button class="wishlist-btn ${wishlist.includes(p.id) ? 'active' : ''}" onclick="toggleWishlist(${p.id})">❤️</button>
                <button class="btn icon" onclick="showProductDetail(${p.id})">🔍</button>
            </div>
        </div>
    `).join('');

    updateStats(filtered);
}
render();

// ===== Debounce for search =====
let timer;
function debouncedRender(){
    clearTimeout(timer);
    timer = setTimeout(()=>{ state.q = $('#search').value.trim(); render(); }, 250);
}

function applySort(){
    state.sort = $('#sort').value;
    render();
}

function filterByCategory(cat, el){
    state.cat = cat;
    render();
    $$('.chip').forEach(c => c.classList.remove('active'));
    if(el) el.classList.add('active');
    // إغلاق الشريط الجانبي بعد اختيار التصنيف (اختياري)
    closeDrawer();
}

// ===== تصفية السعر =====
function applyPriceFilter() {
    const min = parseFloat($('#min-price').value) || 0;
    const max = parseFloat($('#max-price').value) || Infinity;
    state.minPrice = min;
    state.maxPrice = max;
    render();
    closeDrawer();
}

// ===== Cart functions =====
function toast(msg){
    const el = $('#toast');
    el.textContent = msg;
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 2000);
}

function add(id){
    const p = data.find(x=>x.id===id);
    const exists = cart.find(i=>i.id===id);
    if(exists){ exists.qty += 1; }
    else { cart.push({id:p.id, name:p.name, price:p.price, qty:1}); }
    persistCart();
    updateCartUI(); 
    toast(getTranslation('addToCart') + '✓');
    showAddPopup();
}

function showAddPopup(){
    const el = $('#added');
    if(!el) return;
    el.classList.remove("show");
    void el.offsetWidth;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 1200);
}

function changeQty(id, delta){
    const item = cart.find(i=>i.id===id);
    if(!item) return;
    item.qty += delta;
    if(item.qty<=0){ cart = cart.filter(i=>i.id!==id); }
    persistCart();
    updateCartUI();
}

function removeItem(id){ cart = cart.filter(i=>i.id!==id); persistCart(); updateCartUI(); }

function clearCart(){ cart = []; persistCart(); updateCartUI(); toast(getTranslation('clearCart') + ' ✓'); }

function updateCartUI(){
    $('#count').textContent = cart.reduce((s,i)=>s+i.qty,0);
    $('#items').innerHTML = cart.length? cart.map(i=>`
        <div class="item">
            <div>• ${i.name}</div>
            <div class="qty">
                <button onclick="changeQty(${i.id},-1)">-</button>
                <span>${i.qty}</span>
                <button onclick="changeQty(${i.id},1)">+</button>
                <button class="btn danger" style="padding:6px 10px" onclick="removeItem(${i.id})">${getTranslation('remove')}</button>
            </div>
        </div>`).join('') : `<p style="opacity:.7">${getTranslation('emptyCart')}</p>`;
    const total = cart.reduce((s,i)=>s + i.price*i.qty,0);
    $('#total').textContent = LYD.format(total);
}
function getTranslation(key) {
    try {
        // التحقق من وجود اللغة في الترجمة
        if (translations && translations[state.lang] && translations[state.lang][key]) {
            return translations[state.lang][key];
        }
        return key; // إذا لم توجد الترجمة، نعيد المفتاح نفسه
    } catch (e) {
        console.warn('Translation error for key:', key, e);
        return key;
    }
}

function persistCart(){ localStorage.setItem('cart', JSON.stringify(cart)); }
function loadCart(){ try{ return JSON.parse(localStorage.getItem('cart'))||[] }catch(e){ return []; } }

// ===== Wishlist functions =====
function loadWishlist() {
    try { return JSON.parse(localStorage.getItem('wishlist')) || []; } catch(e){ return []; }
}
function persistWishlist() { localStorage.setItem('wishlist', JSON.stringify(wishlist)); }
function updateWishlistUI() { $('#wishlist-count').textContent = wishlist.length; }
function toggleWishlist(id) {
    const index = wishlist.indexOf(id);
    if (index === -1) {
        wishlist.push(id);
        toast(getTranslation('addToWishlist'));
    } else {
        wishlist.splice(index, 1);
        toast(getTranslation('removeFromWishlist'));
    }
    persistWishlist();
    updateWishlistUI();
    render();
}

// ===== Reviews functions (مختصر) =====
function loadReviews() { try { return JSON.parse(localStorage.getItem('reviews')) || {}; } catch(e){ return {}; } }
function persistReviews() { localStorage.setItem('reviews', JSON.stringify(reviews)); }

function addReview(productId, userName, rating, comment) {
    if (!reviews[productId]) reviews[productId] = []; // كان الشرط مقلوباً (! بدلاً من if)
    reviews[productId].push({
        user: userName,
        rating: rating,
        comment: comment,
        date: new Date().toLocaleDateString(state.lang === 'ar' ? 'ar-LY' : 'en-US')
    });
    persistReviews();
    // تحديث متوسط التقييم
    const product = data.find(p => p.id === productId);
    if (product && reviews[productId].length > 0) {
        const avg = reviews[productId].reduce((sum, r) => sum + r.rating, 0) / reviews[productId].length;
        product.rating = Math.round(avg * 10) / 10;
    }
    // إعادة عرض التفاصيل إذا كانت مفتوحة
    if ($('#product-detail') && $('#product-detail').style.display === 'block') {
        showProductDetail(productId);
    }
    render();
}

// ===== Drawer functions =====
function openDrawer() {
    $('#drawer').classList.add('open');
    $('#drawer-backdrop').classList.add('open');
}
function closeDrawer() {
    $('#drawer').classList.remove('open');
    $('#drawer-backdrop').classList.remove('open');
}

// ===== Language toggle =====
function toggleLanguage() {
    state.lang = state.lang === 'ar' ? 'en' : 'ar';
    updateUILanguage();
    render();
}

// ===== Theme =====
(function restoreTheme(){
    const t = localStorage.getItem('theme') || 'dark';
    document.body.dataset.theme = t === 'light' ? 'light' : '';
})();

function toggleTheme(theme) {
    document.body.dataset.theme = theme === 'light' ? 'light' : '';
    localStorage.setItem('theme', theme);
}

// ===== Modal helpers =====
function toggleCart(){ 
    $('#cart').style.display = $('#cart').style.display === 'block' ? 'none' : 'block';
}
function closeOnBackdrop(e){ if(e.target.id === 'cart') toggleCart(); }

// Keyboard shortcuts
document.addEventListener('keydown', e=>{
    if(e.key === 'Escape'){
        $('#cart').style.display = 'none';
        closeProductDetail();
        closeCheckout();
        closeDrawer();
    }
});

// ===== Stats =====
function updateStats(filteredProducts) {
    const statsHtml = `
        <div class="stat-item"><div class="stat-value">${filteredProducts.length}</div><div class="stat-label">${getTranslation('statsProducts')}</div></div>
        <div class="stat-item"><div class="stat-value">${cart.reduce((s,i)=>s+i.qty,0)}</div><div class="stat-label">${getTranslation('statsInCart')}</div></div>
        <div class="stat-item"><div class="stat-value">${wishlist.length}</div><div class="stat-label">${getTranslation('statsWishlist')}</div></div>
    `;
    const statsBar = $('#stats-bar');
    if (statsBar) statsBar.innerHTML = statsHtml;
}

// ===== تهيئة =====
updateUILanguage();
function showProductDetail(id) {
    const product = data.find(p => p.id === id);
    if (!product) return;
    const productReviews = reviews[product.id] || [];
    const reviewsHtml = productReviews.map(r => `
        <div class="rating-item">
            <div class="rating-header">
                <span>${r.user}</span>
                <span class="rating-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</span>
            </div>
            <div>${r.comment}</div>
            <div style="font-size:12px; color:var(--muted);">${r.date}</div>
        </div>
    `).join('');

    const modalContent = `
        <div class="modal-content glass product-detail">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                <h2>${product.name}</h2>
                <button class="btn icon" onclick="closeProductDetail()">✖</button>
            </div>
            <div style="display:flex; gap:20px; flex-wrap:wrap;">
                <div style="flex:1; min-width:200px;">
                    <img src="${product.img}" alt="${product.name}" style="width:100%; border-radius:12px;">
                </div>
                <div style="flex:2;">
                    <p class="price">${LYD.format(product.price)}</p>
                    <p class="meta">${getTranslation('category')}: ${product.cat} • ${getTranslation('rating')}: ${product.rating}★</p>
                    <p class="description">${product.description || ''}</p>
                    <div class="actions">
                        <button class="btn" onclick="add(${product.id}); closeProductDetail();">${getTranslation('addToCart')}</button>
                        <button class="wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}" onclick="toggleWishlist(${product.id})">❤️ ${getTranslation('addToWishlist')}</button>
                    </div>
                </div>
            </div>
            <div class="ratings-section">
                <h3>${getTranslation('addReview')}</h3>
                <div class="add-rating">
                    <input type="text" id="review-name" placeholder="${getTranslation('yourName')}" style="width:100%; padding:10px; margin-bottom:10px; border-radius:8px; border:1px solid #2a2f35; background:var(--card); color:var(--text);">
                    <div class="star-rating" id="star-rating">
                        ${[1,2,3,4,5].map(i => `<span data-rating="${i}">★</span>`).join('')}
                    </div>
                    <textarea id="review-comment" placeholder="${getTranslation('yourComment')}" rows="3"></textarea>
                    <button class="btn" onclick="submitReview(${product.id})">${getTranslation('submitReview')}</button>
                </div>
                <h3 style="margin-top:20px;">${getTranslation('rating')}</h3>
                ${reviewsHtml || '<p>لا توجد تقييمات بعد</p>'}
            </div>
        </div>
    `;

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

    // إعداد النجوم
    const stars = $$('#star-rating span');
    let currentRating = 0;
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.dataset.rating);
            currentRating = rating;
            stars.forEach((s, i) => {
                if (i < rating) s.classList.add('active');
                else s.classList.remove('active');
            });
        });
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.dataset.rating);
            stars.forEach((s, i) => {
                if (i < rating) s.style.color = 'gold';
                else s.style.color = '#ccc';
            });
        });
        star.addEventListener('mouseout', function() {
            stars.forEach((s, i) => {
                if (i < currentRating) s.style.color = 'gold';
                else s.style.color = '#ccc';
            });
        });
    });

    window.submitReview = function(pid) {
        const name = $('#review-name').value.trim() || 'مجهول';
        const comment = $('#review-comment').value.trim();
        if (!comment || currentRating === 0) {
            toast('الرجاء إدخال تقييم ونجوم');
            return;
        }
        addReview(pid, name, currentRating, comment);
        $('#review-name').value = '';
        $('#review-comment').value = '';
        stars.forEach(s => s.classList.remove('active'));
        currentRating = 0;
    };
}
// ===== Product Detail Modal helpers =====
function closeProductDetail() {
    const modal = $('#product-detail');
    if (modal) modal.style.display = 'none';
}
window.closeProductDetail = function() {
    const modal = $('#product-detail');
    if (modal) modal.style.display = 'none';
};
async function submitOrder(event) {
    event.preventDefault();

    // جمع البيانات الأساسية
    const name = $('#checkout-name').value.trim();
    const phone = $('#checkout-phone').value.trim();
    const email = $('#checkout-email').value.trim();
    const address = $('#checkout-address').value.trim();
    const city = $('#checkout-city').value.trim();
    const zip = $('#checkout-zip').value.trim();
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    
    // التحقق من الحقول الأساسية
    if (!name || !phone || !address || !city || !zip) {
        toast('الرجاء ملء جميع الحقول الإجبارية');
        return;
    }

    // التحقق من صحة رقم الهاتف
    if (!/^\+\d{8,15}$/.test(phone)) {
        toast('رقم الهاتف غير صحيح. يجب أن يبدأ بـ + ويحتوي على 8-15 رقمًا');
        return;
    }

    // تعطيل زر الإرسال
    const submitBtn = $('#submit-order-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'جاري المعالجة...';

    try {
        let receiptURL = '';
        
        // إذا كانت طريقة الدفع تحويل بنكي، يجب رفع الصورة
        if (paymentMethod === 'transfer') {
            const fileInput = $('#receipt-image');
            
            if (!fileInput.files || fileInput.files.length === 0) {
                toast('الرجاء اختيار صورة الإيصال');
                submitBtn.disabled = false;
                submitBtn.textContent = getTranslation('checkout');
                return;
            }

            const file = fileInput.files[0];
            if (file.size > 5 * 1024 * 1024) {
                toast('حجم الصورة يتجاوز 5 ميجابايت');
                submitBtn.disabled = false;
                submitBtn.textContent = getTranslation('checkout');
                return;
            }

            // رفع الصورة إلى Firebase Storage
            const fileName = `receipts/${Date.now()}_${file.name}`;
            const storageRef = firebase.storage().ref(fileName);
            const uploadTask = storageRef.put(file);

            const progressDiv = $('#upload-progress');
            progressDiv.style.display = 'block';

            await new Promise((resolve, reject) => {
                uploadTask.on(
                    firebase.storage.TaskEvent.STATE_CHANGED,
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        progressDiv.textContent = `جاري الرفع: ${Math.round(progress)}%`;
                    },
                    (error) => reject(error),
                    () => resolve(uploadTask.snapshot.ref)
                );
            });

            receiptURL = await storageRef.getDownloadURL();
            progressDiv.style.display = 'none';
        }

        // إعداد بيانات الطلب
        const order = {
            name: name,
            phone: phone,
            email: email || 'غير مقدم',
            address: `${address}, ${city} ${zip}`,
            items: cart.map(i => `${i.name} (x${i.qty}) - ${LYD.format(i.price * i.qty)}`).join('\n'),
            total: LYD.format(cart.reduce((s,i)=>s + i.price*i.qty,0)),
            totalRaw: cart.reduce((s,i)=>s + i.price*i.qty,0),
            date: new Date().toLocaleString('ar-LY'),
            paymentMethod: paymentMethod === 'transfer' ? 'تحويل بنكي' : 'الدفع عند التوصيل',
            accountInfo: paymentMethod === 'transfer' ? 
                'اسم صاحب الحساب: محمد عبد السلام محمد محمد صالح - مصرف الصحاري: 2010393957 - IBAN: LY62006020000002010393957' : 
                'الدفع نقداً عند الاستلام',
            receiptImage: receiptURL || 'لا يوجد'
        };

        // إرسال البريد عبر EmailJS
        await emailjs.send('service_bzjvjbd', {
            to_name: 'صاحب المتجر',
            from_name: order.name,
            from_email: order.email,
            phone: order.phone,
            address: order.address,
            items: order.items,
            total: order.total,
            payment_method: order.paymentMethod,
            account_info: order.accountInfo,
            receipt_link: order.receiptImage,
            date: order.date
        });

        // رسالة تأكيد حسب طريقة الدفع
        if (paymentMethod === 'transfer') {
            toast('تم إرسال الطلب مع الإيصال. سنقوم بالتحقق والتواصل معك قريباً.');
        } else {
            toast('تم إرسال الطلب. سنقوم بالاتصال بك لتأكيد التوصيل.');
        }

        // حفظ نسخة في localStorage
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push({ 
            ...order, 
            status: paymentMethod === 'transfer' ? 'في انتظار الدفع' : 'في انتظار التأكيد',
            date: new Date().toISOString() 
        });
        localStorage.setItem('orders', JSON.stringify(orders));

        clearCart();
        closeCheckout();
    } catch (error) {
        console.error(error);
        toast('فشل إرسال الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = getTranslation('checkout');
    }
}
