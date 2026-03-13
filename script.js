// =================================================
// =====           الإعدادات الأساسية          =====
// =================================================
const LYD = new Intl.NumberFormat('ar-LY', { style: 'currency', currency: 'LYD' });
const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);

// إعداد البيانات الثابتة: المنتجات
const data = [
    { id: 1, name: "سامسونج A52", price: 2450, img: "https://picsum.photos/seed/phone/420/300", cat: "هواتف", rating: 4.6, description: "هاتف ممتاز بشاشة كبيرة وأداء قوي.", images: ["https://picsum.photos/seed/phone1/420/300", "https://picsum.photos/seed/phone2/420/300"] },
    { id: 2, name: "سماعات سوني برو", price: 820, img: "https://picsum.photos/seed/ear/420/300", cat: "إكسسوارات", rating: 4.3, description: "سماعات لاسلكية مع عزل ضوضاء.", images: ["https://picsum.photos/seed/ear1/420/300"] },
    { id: 3, name: "كيبورد ميكانيكي RX", price: 170, img: "https://picsum.photos/seed/keys/420/300", cat: "إكسسوارات", rating: 4.8, description: "لوحة مفاتيح ميكانيكية بإضاءة RGB.", images: ["https://picsum.photos/seed/keys1/420/300"] },
    { id: 4, name: "ماوس G1", price: 130, img: "https://picsum.photos/seed/mouse/420/300", cat: "إكسسوارات", rating: 4.5, description: "ماوس ألعاب دقيق وسريع.", images: [] },
    { id: 5, name: "تاب Tab10", price: 1950, img: "https://picsum.photos/seed/tab/420/300", cat: "أجهزة", rating: 4.4, description: "جهاز لوحي بشاشة عالية الدقة.", images: [] },
    { id: 6, name: "لابتوب لايت", price: 5400, img: "https://picsum.photos/seed/laptop/420/300", cat: "أجهزة", rating: 4.7, description: "لابتوب خفيف الوزن وعمر بطارية طويل.", images: [] },
    { id: 7, name: "كتاب إلكتروني", price: 7500, img: "https://picsum.photos/seed/book/420/300", cat: "أجهزة", rating: 4.2, description: "قارئ كتب إلكتروني بشاشة حبر إلكتروني.", images: [] }
];

// =================================================
// =====               الحالة                  =====
// =================================================
let state = {
    q: '',                     // نص البحث
    cat: 'all',                // الفئة المختارة
    sort: 'default',           // ترتيب البحث
    minPrice: 0,               // الحد الأدنى للسعر
    maxPrice: Infinity,        // الحد الأقصى للسعر
    lang: 'ar'                 // اللغة الافتراضية: 'ar' أو 'en'
};

// =================================================
// =====           تحميل البيانات             =====
// =================================================
// تحميل بيانات السلة من التخزين المحلي
let cart = loadStorageData('cart');

// تحميل قائمة الرغبات (Wishlist) من التخزين المحلي
let wishlist = loadStorageData('wishlist');

// تحميل بيانات التقييمات من التخزين المحلي
let reviews = loadStorageData('reviews');

// الوظائف المساعدة لتحميل البيانات
function loadStorageData(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch (e) {
        return [];
    }
}

// الوظائف المساعدة لحفظ البيانات
function persistStorageData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
function render() {
    const filteredProducts = applyFilters();
    console.log(filteredProducts); // طباعة المنتجات بعد الفلترة

    $("#products").innerHTML = filteredProducts.map(product => `
        <div class="card" data-id="${product.id}">
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div>${LYD.format(product.price)}</div>
        </div>
    `).join("");
}
// =================================================
// =====      ترجمة النصوص وتحديث اللغة       =====
// =================================================
// الترجمة للنصوص المختلفة في التطبيق
const translations = {
    ar: {
        // النصوص العامة
        appName: "متجري الاحترافي",
        searchPlaceholder: "ابحث عن منتج...",
        checkout: "إتمام الشراء",
        close: "إغلاق",
        cart: "سلة المشتريات",
        wishlist: "المفضلة",
        submitReview: "إرسال التقييم",
        addToCart: "إضافة إلى السلة",
        addToWishlist: "إضافة إلى المفضلة",
        removeFromWishlist: "إزالة من المفضلة",
        statsProducts: "منتج",
        statsInCart: "في السلة",
        statsWishlist: "في المفضلة",
        yourName: "اسمك",
        yourComment: "تعليقك",
        rating: "التقييم",
        aboutUs: "من نحن",
        heroTitle: "تسوّق بذكاء",
        heroText: "أفضل المنتجات بأفضل الأسعار.",
        processing: "جاري المعالجة...",
        uploadReceipt: "رفع الإيصال",
        invalidPhone: "رقم الهاتف غير صحيح!",
        emptyFields: "الرجاء ملء الحقول الفارغة",
        orderProcessed: "تم تقديم الطلب بنجاح!",
        orderFailed: "حدث خطأ أثناء معالجة الطلب."
    },
    en: {
        // النصوص العامة
        appName: "My Professional Store",
        searchPlaceholder: "Search for a product...",
        checkout: "Checkout",
        close: "Close",
        cart: "Shopping Cart",
        wishlist: "Wishlist",
        submitReview: "Submit Review",
        addToCart: "Add to Cart",
        addToWishlist: "Add to Wishlist",
        removeFromWishlist: "Remove from Wishlist",
        statsProducts: "Products",
        statsInCart: "In Cart",
        statsWishlist: "In Wishlist",
        yourName: "Your Name",
        yourComment: "Your Comment",
        rating: "Rating",
        aboutUs: "About Us",
        heroTitle: "Shop Smart",
        heroText: "Top products at the best prices.",
        processing: "Processing...",
        uploadReceipt: "Upload Receipt",
        invalidPhone: "Invalid phone number!",
        emptyFields: "Please fill in all fields.",
        orderProcessed: "Order processed successfully!",
        orderFailed: "Something went wrong while processing your order."
    }
};

// الوظيفة للحصول على النصوص المترجمة بناءً على اللغة الحالية
function getTranslation(key) {
    return translations[state.lang][key] || key;
}

// =================================================
// =====    تحديث واجهة المستخدم بناءً على اللغة   =====
// =================================================
function updateUILanguage() {
    // تغيير لغة واتجاه الصفحة
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";

    // تحديث العناصر الثابتة
    $(".logo").textContent = getTranslation("appName");
    $("#search").placeholder = getTranslation("searchPlaceholder");
    $("#checkout-title").textContent = getTranslation("checkout");
    $("#about-us-title").textContent = getTranslation("aboutUs");
    $("#hero-title").textContent = getTranslation("heroTitle");
    $("#hero-text").textContent = getTranslation("heroText");

    // تحديث النصوص الخاصة بسلة المشتريات وغيرها
    $("#cart-label").textContent = getTranslation("cart");
    $("#wishlist-label").textContent = getTranslation("wishlist");

    // إعادة عرض البيانات المتعلقة بالتطبيق
    render(); // إعادة عرض المنتجات لتحديث النصوص داخل البطاقات
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
// =================================================
// =====   تبديل اللغة بين العربية والإنجليزية   =====
// =================================================
function toggleLanguage() {
    // تبديل اللغة
    state.lang = state.lang === "ar" ? "en" : "ar";
    // تحديث واجهة المستخدم
    updateUILanguage();
}
// =================================================
// =====       وظائف السلة (Cart Functions)      =====
// =================================================

// تحديث واجهة السلة بناءً على بيانات السلة الحالية
function updateCartUI() {
    // تحديث عدد العناصر الإجمالي في السلة
    $("#count").textContent = cart.reduce((sum, item) => sum + item.qty, 0);

    // عرض المنتجات في السلة
    if (cart.length > 0) {
        $("#items").innerHTML = cart.map(item => `
            <div class="item">
                <div>• ${item.name}</div>
                <div class="qty">
                    <button onclick="changeQty(${item.id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="changeQty(${item.id}, 1)">+</button>
                    <button class="btn danger" onclick="removeItem(${item.id})">${getTranslation('remove')}</button>
                </div>
            </div>
        `).join("");
    } else {
        $("#items").innerHTML = `<p>${getTranslation('emptyCart')}</p>`;
    }

    // تحديث إجمالي السعر الكلي
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    $("#total").textContent = LYD.format(total);
}

// إضافة منتج إلى السلة
function addToCart(id) {
    const product = data.find(p => p.id === id); // البحث عن المنتج
    const itemInCart = cart.find(item => item.id === id); // التحقق إن كان المنتج موجودًا بالفعل في السلة

    if (itemInCart) {
        // إذا كان المنتج موجودًا بالفعل، قم بزيادة الكمية
        itemInCart.qty += 1;
    } else {
        // إذا كان المنتج جديدًا، أضفه إلى السلة
        cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
    }

    // حفظ السلة في التخزين المحلي
    persistStorageData('cart', cart);

    // تحديث واجهة السلة
    updateCartUI();

    // عرض إشعار بأن المنتج تمت إضافته
    toast(getTranslation('addToCart'));
}

// تغيير كمية المنتج (زيادة أو نقصان)
function changeQty(id, delta) {
    const item = cart.find(item => item.id === id); // البحث عن العنصر في السلة

    if (!item) return; // إذا لم يكن العنصر موجودًا، تجاهل العملية

    item.qty += delta; // تعديل الكمية
    if (item.qty <= 0) {
        // إذا كانت الكمية صفر أو أقل، قم بحذف العنصر من السلة
        cart = cart.filter(i => i.id !== id);
    }

    // حفظ السلة في التخزين المحلي
    persistStorageData('cart', cart);

    // تحديث واجهة السلة
    updateCartUI();
}

// حذف عنصر من السلة
function removeItem(id) {
    // حذف المنتج من السلة
    cart = cart.filter(item => item.id !== id);

    // حفظ السلة في التخزين المحلي
    persistStorageData('cart', cart);

    // تحديث واجهة السلة
    updateCartUI();

    // عرض إشعار بأن المنتج تمت إزالته
    toast(getTranslation('remove'));
}

// تفريغ السلة بالكامل
function clearCart() {
    // إعادة تعيين السلة إلى مصفوفة فارغة
    cart = [];

    // حفظ السلة في التخزين المحلي
    persistStorageData('cart', cart);

    // تحديث واجهة السلة
    updateCartUI();

    // عرض إشعار بأن السلة قد تم إفراغها
    toast(getTranslation('clearCart'));
}
// =================================================
// =====   وظائف قائمة الرغبات (Wishlist Functions)    =====
// =================================================

// تحديث واجهة المستخدم الخاصة بقائمة الرغبات
function updateWishlistUI() {
    // تحديث عدد العناصر الموجودة في قائمة الرغبات
    $("#wishlist-count").textContent = wishlist.length;

    // إذا كانت المنتجات في قائمة الرغبات معروضة، يتم تحديث الحالة
    $$("button.wishlist-btn").forEach(btn => {
        const productId = parseInt(btn.dataset.id);
        if (wishlist.includes(productId)) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}

// وظيفة تغيير حالة المنتج في قائمة الرغبات
function toggleWishlist(id) {
    // إذا كان العنصر موجودًا مسبقًا، يتم حذفه
    const index = wishlist.indexOf(id);
    if (index === -1) {
        wishlist.push(id);
        toast(getTranslation("addToWishlist")); // إظهار إشعار الإضافة
    } else {
        wishlist.splice(index, 1); // الحذف من القائمة
        toast(getTranslation("removeFromWishlist")); // إظهار إشعار الحذف
    }

    // تحديث وتخزين البيانات في LocalStorage
    persistStorageData("wishlist", wishlist);

    // تحديث واجهة المنتج المرافقة
    updateWishlistUI();

    // إعادة عرض المنتجات لتحديث حالة الواجهات
    render();
}

// التحقق مما إذا كان المنتج موجودًا في قائمة الرغبات
function isInWishlist(id) {
    return wishlist.includes(id);
    <button class="wishlist-btn ${isInWishlist(p.id) ? 'active' : ''}" onclick="toggleWishlist(${p.id})">❤️</button>
}
// =================================================
// =====      وظائف التقييمات والمراجعات (Reviews)     =====
// =================================================

// تحميل المراجعات المخزنة من LocalStorage
function loadReviews() {
    try {
        return JSON.parse(localStorage.getItem('reviews')) || {}; // إذا لم تكن هناك مراجعات، قم بإرجاع كائن فارغ
    } catch (e) {
        return {};
    }
}

// حفظ المراجعات في LocalStorage
function persistReviews() {
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

// إضافة مراجعة جديدة
function addReview(productId, userName, rating, comment) {
    // إذا لم يكن لهذا المنتج مراجع حاليًا، قم بإنشاء مصفوفة جديدة
    if (!reviews[productId]) {
        reviews[productId] = [];
    }

    // إضافة المراجعة الجديدة إلى مصفوفة المراجعات
    reviews[productId].push({
        user: userName || getTranslation('yourName'), // اسم المستخدم أو الافتراضي
        rating: rating, // التقييم
        comment: comment, // نص المراجعة
        date: new Date().toLocaleDateString(state.lang === 'ar' ? 'ar-LY' : 'en-US') // التاريخ بصيغة اللغة
    });

    // حفظ المراجعات المحدثة في LocalStorage
    persistReviews();

    // تحديث متوسط تقييم المنتج
    const product = data.find(p => p.id === productId);
    if (product && reviews[productId]) {
        const allRatings = reviews[productId].map(r => r.rating); // جميع التقييمات للمنتج
        product.rating = (allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(1); // المتوسط
    }

    // إذا كانت واجهة التفاصيل مفتوحة، قم بتحديث العرض
    if ($('#product-detail') && $('#product-detail').style.display === 'block') {
        showProductDetail(productId);
    }

    // إعادة عرض المنتجات لتحديث التقييمات في البطاقات
    render();
}

// عرض المراجعات الخاصة بمنتج معين
function renderReviews(productId) {
    const productReviews = reviews[productId] || [];
    if (!productReviews.length) {
        return `<p>${getTranslation('noReviews')}</p>`;
    }

    // إنتاج HTML يحتوي على جميع المراجعات
    return productReviews.map(r => `
        <div class="rating-item">
            <div class="rating-header">
                <span>${r.user}</span>
                <span class="rating-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
            </div>
            <div>${r.comment}</div>
            <div style="font-size: 12px; color: var(--muted);">${r.date}</div>
        </div>
    `).join('');
}

// =================================================
// =====     إعداد واجهة التقييم (Ratings UI)      =====
// =================================================
function setupReviewForm(productId) {
    let currentRating = 0; // التقييم الافتراضي

    const stars = $$('.star-rating span'); // جميع النجوم
    stars.forEach((star, index) => {
        star.dataset.rating = index + 1; // تحديد القيمة لكل نجمة

        // عند النقر على النجمة يتم تحديد التقييم
        star.addEventListener('click', function () {
            currentRating = parseInt(this.dataset.rating);
            stars.forEach((s, i) => {
                s.classList.toggle('active', i < currentRating);
            });
        });

        // عند تحريك الماوس فوق النجوم
        star.addEventListener('mouseover', function () {
            const hoverRating = parseInt(this.dataset.rating);
            stars.forEach((s, i) => {
                s.style.color = i < hoverRating ? 'gold' : '#ccc';
            });
        });

        // عند إخراج الماوس يتم إعادة الألوان لحالة التقييم الحالي
        star.addEventListener('mouseout', function () {
            stars.forEach((s, i) => {
                s.style.color = i < currentRating ? 'gold' : '#ccc';
            });
        });
    });

    // إرسال التقييم عند الضغط على زر الإرسال
    $('#submit-review-btn').addEventListener('click', function () {
        const userName = $('#review-name').value.trim() || getTranslation('anonymous');
        const userComment = $('#review-comment').value.trim();

        if (!userComment || currentRating === 0) {
            toast(getTranslation('invalidReview')); // رسالة خطأ إذا لم تُكتب مراجعة
            return;
        }

        // إضافة التقييم إلى المنتج
        addReview(productId, userName, currentRating, userComment);

        // إعادة تعيين القيم الافتراضية للنموذج
        $('#review-name').value = '';
        $('#review-comment').value = '';
        stars.forEach(s => s.classList.remove('active'));
        currentRating = 0; // إعادة ضبط التقييم
    });
}
// =================================================
// =====         واجهة الطلب (Checkout UI)         =====
// =================================================

// عرض واجهة الطلب (فتح Modal الطلب)
function toggleCheckout(show = true) {
    const checkoutModal = $('#checkout-modal');
    checkoutModal.style.display = show ? 'block' : 'none';
}

// التعامل مع إرسال الطلب
async function submitOrder(event) {
    event.preventDefault();

    // جمع البيانات من النموذج
    const name = $('#checkout-name').value.trim();
    const phone = $('#checkout-phone').value.trim();
    const address = $('#checkout-address').value.trim();
    const city = $('#checkout-city').value.trim();
    const zip = $('#checkout-zip').value.trim();
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

    // التحقق من البيانات
    if (!name || !phone || !address || !city || !zip) {
        toast(getTranslation('emptyFields'));
        return;
    }

    // التحقق من صحة رقم الهاتف
    if (!/^\+\d{8,15}$/.test(phone)) {
        toast(getTranslation('invalidPhone'));
        return;
    }

    // تعطيل زر الإرسال لتجنب تكرار الطلب
    const submitBtn = $('#submit-order-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = getTranslation('processing');

    try {
        let receiptURL = '';

        // رفع إيصال الدفع إذا كانت طريقة الدفع هي التحويل البنكي
        if (paymentMethod === 'transfer') {
            const fileInput = $('#receipt-image');
            if (!fileInput.files || fileInput.files.length === 0) {
                toast(getTranslation('uploadReceipt'));
                submitBtn.disabled = false;
                submitBtn.textContent = getTranslation('checkout');
                return;
            }
            const file = fileInput.files[0];
            if (file.size > 5 * 1024 * 1024) {
                toast(getTranslation('fileSizeExceeds'));
                submitBtn.disabled = false;
                submitBtn.textContent = getTranslation('checkout');
                return;
            }

            // رفع الصورة (تنفيذ عملية الرفع عبر Firebase مثلاً)
            const fileName = `receipts/${Date.now()}_${file.name}`;
            const storageRef = firebase.storage().ref(fileName);
            const uploadTask = storageRef.put(file);

            // انتظار رفع الملف
            receiptURL = await new Promise((resolve, reject) => {
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        $('#upload-progress').textContent = `${getTranslation('uploading')}: ${Math.round(progress)}%`;
                    },
                    (error) => reject(error),
                    async () => resolve(await uploadTask.snapshot.ref.getDownloadURL())
                );
            });
        }

        // إعداد الطلب
        const order = {
            name,
            phone,
            address: `${address}, ${city}, ${zip}`,
            paymentMethod: paymentMethod === 'transfer' ? getTranslation('bankTransfer') : getTranslation('cashOnDelivery'),
            total: cart.reduce((sum, item) => sum + item.price * item.qty, 0),
            items: cart.map(item => `${item.name} (x${item.qty})`).join(', '),
            receipt: receiptURL || 'N/A',
            date: new Date().toLocaleDateString(state.lang === 'ar' ? 'ar-LY' : 'en-US'),
        };

        // حفظ الطلب داخل LocalStorage
        const orders = loadStorageData('orders') || []; // تحميل الطلبات الحالية
        orders.push(order); // إضافة الطلب الجديد
        persistStorageData('orders', orders); // حفظ جميع الطلبات الجديدة

        // تأكيد النجاح
        toast(getTranslation('orderProcessed'));

        // تفريغ السلة
        clearCart();

        // إغلاق واجهة الطلب
        toggleCheckout(false);
    } catch (error) {
        console.error(error); // في حالة الخطأ
        toast(getTranslation('orderFailed'));
    } finally {
        // إعادة تفعيل زر الإرسال
        submitBtn.disabled = false;
        submitBtn.textContent = getTranslation('checkout');
    }
}

// =================================================
// =====           HTML واجهة الطلب            =====
// =================================================
const checkoutHTML = `
<div id="checkout-modal" style="display: none; position: fixed; inset: 0; background: rgba(0, 0, 0, 0.7); z-index: 9999;">
    <div style="background: white; border-radius: 10px; max-width: 500px; margin: auto; padding: 20px; transform: translateY(50%);">
        <h3>${getTranslation('checkout')}</h3>
        <form id="checkout-form" onsubmit="submitOrder(event)">
            <!-- اسم العميل -->
            <label>${getTranslation('yourName')}:</label>
            <input type="text" id="checkout-name" required>

            <!-- رقم الهاتف -->
            <label>${getTranslation('yourPhone')}:</label>
            <input type="text" id="checkout-phone" placeholder="+218xxxxxxxx" required>

            <!-- العنوان -->
            <label>${getTranslation('address')}:</label>
            <input type="text" id="checkout-address" required>

            <!-- المدينة والرمز البريدي -->
            <label>${getTranslation('yourCity')}:</label>
            <input type="text" id="checkout-city" required>
            <label>${getTranslation('zip')}:</label>
            <input type="text" id="checkout-zip" required>

            <!-- خيارات الدفع -->
            <h4>${getTranslation('paymentMethod')}:</h4>
            <label><input type="radio" name="payment-method" value="cash" checked> ${getTranslation('cashOnDelivery')}</label><br>
            <label><input type="radio" name="payment-method" value="transfer"> ${getTranslation('bankTransfer')}</label>

            <!-- رفع الإيصال -->
            <label>${getTranslation('uploadReceipt')}:</label>
            <input type="file" id="receipt-image">
            <div id="upload-progress" style="margin-top: 10px; font-size: 12px; color: grey;"></div>

            <!-- زر الإرسال -->
            <div>
                <button id="submit-order-btn" type="submit">${getTranslation('checkout')}</button>
                <button type="button" onclick="toggleCheckout(false)">${getTranslation('close')}</button>
            </div>
        </form>
    </div>
</div>
`;

// إضافة واجهة الطلب إلى المكون HTML الرئيسي
document.body.insertAdjacentHTML('beforeend', checkoutHTML);
// =================================================
// =====            نظام الفلاتر (Filters)          =====
// =================================================

// فلترة المنتجات بناءً على الإعدادات المخزنة في `state`
function applyFilters() {
    return data
        .filter(p => state.cat === "all" ? true : p.cat === state.cat) // تصنيف حسب الفئة
        .filter(p => p.name.toLowerCase().includes(state.q.toLowerCase())) // البحث
        .filter(p => p.price >= state.minPrice && p.price <= state.maxPrice); // النطاق السعري
}

// تحديث الواجهة بعد تطبيق الفلاتر
function render() {
    const filteredProducts = applyFilters(); // تطبيق الفلاتر

    // إنتاج HTML لجميع المنتجات التي تمر الفلاتر
    $("#products").innerHTML = filteredProducts.map(product => `
        <div class="card" data-id="${product.id}">
            <img src="${product.img}" alt="${product.name}" loading="lazy">
            <h3>${product.name}</h3>
            <div class="meta">${getTranslation("category")}: ${product.cat} • ${getTranslation("rating")}: ${product.rating}★</div>
            <div class="price">${LYD.format(product.price)}</div>
            <div style="display: flex; gap: 8px; justify-content: center;">
                <button class="btn" onclick="addToCart(${product.id})">${getTranslation("addToCart")}</button>
                <button class="wishlist-btn ${isInWishlist(product.id) ? "active" : ""}" onclick="toggleWishlist(${product.id})">❤️</button>
                <button class="btn icon" onclick="showProductDetail(${product.id})">🔍</button>
            </div>
        </div>
    `).join("");

    // تحديث ا��إحصائيات
    updateStats(filteredProducts);
}

// تصنيف المنتجات بناءً على الفئة (Category)
function filterByCategory(cat, element) {
    state.cat = cat; // تحديث الفئة الحالية
    render(); // إعادة عرض المنتجات

    // تفعيل العلامة النشطة للفئة
    $$(".chip").forEach(c => c.classList.remove("active"));
    if (element) element.classList.add("active");
}

// تطبيق فلاتر السعر
function applyPriceFilter() {
    const min = parseFloat($("#min-price").value) || 0;
    const max = parseFloat($("#max-price").value) || Infinity;
    state.minPrice = min;
    state.maxPrice = max;
    render();
}

// البحث النصي
function debouncedRender() {
    clearTimeout(timer);
    timer = setTimeout(() => {
        state.q = $("#search").value.trim();
        render();
    }, 250); // استخدام التأخير (Debounce)
}

// =================================================
// =====             تحسين الرسائل              =====
// =================================================
function toast(message) {
    const toastElement = $("#toast");
    toastElement.textContent = message; // تحديث النص
    toastElement.style.display = "block"; // عرض الرسالة
    setTimeout(() => { toastElement.style.display = "none"; }, 2000); // الإخفاء بعد وقت قصير
}

// =================================================
// =====      تحسين واجهة التطبيق (UI Enhancements) =====
// =================================================
document.addEventListener("DOMContentLoaded", () => {
    updateUILanguage(); // تحديث النصوص بناءً على اللغة الافتراضية
    render(); // عرض المنتجات أول مرة
});

// التمرير لجعل شريط العناوين يختفي أثناء التمرير
let lastScrollTop = 0;
const header = $(".header");
window.addEventListener(
    "scroll",
    function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            header.classList.add("header-hidden");
        } else {
            header.classList.remove("header-hidden");
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    },
    false
);
