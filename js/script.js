// // Khởi tạo biến
// const themeColors = ["#fceabb", "#fccd94", "#f45d4c"];
// const STORAGE_KEY = 'messages'; // **TÁI CẤU TRÚC**: Đưa ra ngoài để dùng chung
//
// // **TÁI CẤU TRÚC**: Chuyển thành 'let' và làm danh sách dự phòng
// let wishes = [
//     "Chúc mừng ngày Nhà giáo Việt Nam 20/11!",
//     "Kính chúc thầy cô luôn mạnh khỏe, hạnh phúc!",
//     "Tri ân thầy cô - những người lái đò thầm lặng!",
//     "Cảm ơn thầy cô đã dìu dắt chúng em!",
//     "Chúc thầy cô luôn tràn đầy nhiệt huyết!",
//     "Mong thầy cô luôn vui vẻ và thành công!",
//     "Kính chúc thầy cô ngày 20/11 ý nghĩa!",
//     "Thầy cô là người dẫn đường tuyệt vời!",
//     "Chúc mừng ngày đặc biệt dành cho thầy cô!",
//     "Cảm ơn thầy cô đã truyền cảm hứng!",
//     "Chúc thầy cô luôn được học trò yêu quý!",
//     "Kính chúc thầy cô sức khỏe dồi dào!",
//     "Thầy cô là tấm gương sáng để noi theo!",
//     "Chúc thầy cô luôn hạnh phúc và bình an!",
//     "Cảm ơn thầy cô đã dạy dỗ chúng em!",
//     "Chúc mừng ngày Nhà giáo Việt Nam!"
// ];
//
// /**
//  * **TÁI CẤU TRÚC: HÀM DÙNG CHUNG**
//  * Tải lời chúc từ máy chủ, nếu thất bại, thử tải từ localStorage.
//  */
// async function fetchMessagesWithFallback() {
//     try {
//         const r = await fetch('/api/messages');
//         if (!r.ok) throw new Error('Lỗi máy chủ');
//         const items = await r.json();
//         console.log('Tải lời chúc thành công từ API.');
//         return items;
//     } catch (e) {
//         console.warn('Không thể tải từ máy chủ, chuyển sang localStorage.');
//         // Fallback: tải từ localStorage
//         try {
//             return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
//         } catch (_) {
//             return []; // Trả về mảng rỗng nếu localStorage cũng lỗi
//         }
//     }
// }
//
//
// // Khởi tạo GSAP ScrollTrigger
// gsap.registerPlugin(ScrollTrigger);
//
// // Hiệu ứng cho các phần tử floating
// gsap.to(".floating-element", {
//     y: 30,
//     duration: 2,
//     repeat: -1,
//     yoyo: true,
//     ease: "power1.inOut",
//     stagger: 0.5
// });
//
// // Hiệu ứng scroll cho story slides
// const storySlides = document.querySelectorAll('.story-slide');
//
// // Thiết lập trạng thái ban đầu cho các phần tử sẽ được-animate
// storySlides.forEach((slide) => {
//     const image = slide.querySelector('.story-image');
//     const title = slide.querySelector('.story-title');
//     const text = slide.querySelector('.story-text');
//     // Đặt trạng thái ban đầu (ẩn, trượt xuống, thu nhỏ, không bóng)
//     gsap.set([image, title, text], {
//         opacity: 0,
//         y: 75, // Tăng y một chút để slide-up rõ hơn
//         scale: 0.95, // Thêm hiệu ứng zoom nhẹ
//         filter: 'drop-shadow(0 0 0 rgba(0, 0, 0, 0))' // Trạng thái bóng ban đầu
//     });
// });
//
// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         const slide = entry.target;
//         const image = slide.querySelector('.story-image');
//         const title = slide.querySelector('.story-title');
//         const text = slide.querySelector('.story-text');
//
//         if (entry.isIntersecting) {
//             // animate in - KHI PHẦN TỬ VÀO VIEWPORT
//             slide.classList.add('active');
//
//             // Tạo timeline mới để chạy animation
//             const tl = gsap.timeline();
//
//             // Đây là animation mới dựa trên yêu cầu của bạn
//             tl.to([image, title, text], {
//                 opacity: 1,     // Fade-in
//                 y: 0,           // Slide-up
//                 scale: 1,       // Zoom-in
//                 filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1))', // Thêm đổ bóng
//                 duration: 1.5,  // Thời gian 1.5s
//                 ease: 'ease-in-out', // Easing 'ease-in-out'
//                 stagger: 0.3    // Hiệu ứng xuất hiện lần lượt (stagger) 0.3s
//             });
//
//             // spawn falling flowers each time slide becomes active
//             createFallingFlowers(slide);
//         } else {
//             // animate out - KHI PHẦN TỬ RA KHỎI VIEWPORT
//             slide.classList.remove('active');
//
//             // Reset về trạng thái ban đầu
//             gsap.to([image, title, text], {
//                 opacity: 0,
//                 y: 75,
//                 scale: 0.95,
//                 filter: 'drop-shadow(0 0 0 rgba(0, 0, 0, 0))',
//                 duration: 0.5, // Giữ animate-out nhanh để mượt mà
//                 ease: "power1.in"
//             });
//         }
//     });
// }, {
//     root: null,
//     rootMargin: '0px',
//     threshold: 0.5  // Trigger khi 50% phần tử hiển thị
// });
//
// // observe slides
// storySlides.forEach(slide => observer.observe(slide));
//
// /**
//  * createFallingFlowers(slide)
//  * Create a short burst of falling flower characters within the slide bounds.
//  */
// function createFallingFlowers(slide) {
//     const rect = slide.getBoundingClientRect();
//     const startTop = rect.top + window.scrollY;
//     const leftStart = rect.left + window.scrollX;
//     const count = 10 + Math.floor(Math.random() * 6);
//
//     for (let i = 0; i < count; i++) {
//         const flower = document.createElement('div');
//         flower.textContent = '❀'; // simple flower glyph
//         const size = 14 + Math.floor(Math.random() * 28);
//         const left = leftStart + Math.random() * rect.width;
//         const delay = Math.random() * 0.6;
//         const duration = 1.6 + Math.random() * 1.2;
//         const color = themeColors[Math.floor(Math.random() * themeColors.length)] || '#f45d4c';
//
//         Object.assign(flower.style, {
//             position: 'absolute',
//             left: `${left}px`,
//             top: `${startTop - 10}px`,
//             fontSize: `${size}px`,
//             color: color,
//             pointerEvents: 'none',
//             zIndex: 9999,
//             opacity: '1',
//             transform: `translateY(0) rotate(${Math.floor(Math.random() * 360)}deg)`
//         });
//
//         document.body.appendChild(flower);
//
//         gsap.to(flower, {
//             y: rect.height + 100 + Math.random() * 200,
//             x: (Math.random() - 0.5) * 120,
//             rotation: (Math.random() - 0.5) * 720,
//             opacity: 0,
//             ease: "power1.out",
//             delay: delay,
//             duration: duration,
//             onComplete: () => {
//                 if (flower && flower.parentNode) flower.parentNode.removeChild(flower);
//             }
//         });
//     }
// }
//
// // Vòng quay lời chúc
// const spinnerWheel = document.getElementById('spinner-wheel');
// const spinBtn = document.getElementById('spin-btn');
// const spinButton = document.getElementById('spin-button');
// const spinnerResult = document.getElementById('spinner-result');
// let isSpinning = false;
// const tingSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3');
//
// function spinWheel() {
//     if (isSpinning) return;
//     if (wishes.length === 0) {
//         spinnerResult.textContent = "Chưa có lời chúc nào để quay!";
//         return;
//     }
//
//     isSpinning = true;
//     const randomDegree = 1800 + Math.floor(Math.random() * 360);
//     // Chọn ngẫu nhiên từ mảng 'wishes' (đã được tải từ API hoặc dùng mặc định)
//     const randomIndex = Math.floor(Math.random() * wishes.length);
//
//     gsap.to(spinnerWheel, {
//         rotation: `+=${randomDegree}`,
//         duration: 4,
//         ease: "back.out(1.2)",
//         onComplete: () => {
//             spinnerResult.textContent = wishes[randomIndex];
//             isSpinning = false;
//
//             // Hiệu ứng confetti
//             confetti({
//                 particleCount: 150,
//                 spread: 70,
//                 origin: {y: 0.6}
//             });
//
//             // Phát âm thanh
//             tingSound.play();
//         }
//     });
// }
//
// // Sự kiện cho nút quay
// if (spinBtn) spinBtn.addEventListener('click', spinWheel);
// if (spinButton) spinButton.addEventListener('click', spinWheel);
//
// // Thiệp điện tử (Mã gốc không có phần này, giữ lại nếu bạn có)
// const envelope = document.getElementById('envelope');
// if (envelope) {
//     envelope.addEventListener('click', function () {
//         this.classList.toggle('open');
//     });
// }
//
// // Xử lý form CŨ (Form này dường như không còn trong HTML, nhưng để lại logic)
// const wishForm = document.getElementById('wishForm');
// const successMessage = document.getElementById('successMessage');
//
// if (wishForm) {
//     wishForm.addEventListener('submit', function (e) {
//         e.preventDefault();
//         // ... (logic form cũ)
//     });
// }
//
//
// // Tạo hiệu ứng trái tim bay lên
// function createFloatingHearts() {
//     for (let i = 0; i < 15; i++) {
//         const heart = document.createElement('div');
//         heart.innerHTML = '❤';
//         // ... (CSS cho trái tim)
//         document.body.appendChild(heart);
//
//         gsap.to(heart, {
//             y: -1000,
//             x: Math.random() * 200 - 100,
//             rotation: Math.random() * 360,
//             duration: 3 + Math.random() * 2,
//             opacity: 0,
//             ease: "power1.out",
//             onComplete: () => {
//                 document.body.removeChild(heart);
//             }
//         });
//     }
// }
//
// // Navigation dots
// const navDots = document.querySelectorAll('.nav-dot');
// const sections = document.querySelectorAll('section');
//
// function updateActiveNavDot() {
//     const scrollPosition = window.scrollY + window.innerHeight / 2;
//
//     sections.forEach((section, index) => {
//         const sectionTop = section.offsetTop;
//         const sectionBottom = sectionTop + section.offsetHeight;
//
//         if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
//             navDots.forEach(dot => dot.classList.remove('active'));
//             // Kiểm tra navDots[index] tồn tại
//             if (navDots[index]) {
//                 navDots[index].classList.add('active');
//             }
//         }
//     });
// }
//
// // Sự kiện cho navigation dots
// navDots.forEach((dot, index) => {
//     dot.addEventListener('click', () => {
//         // Kiểm tra sections[index] tồn tại
//         if (sections[index]) {
//             sections[index].scrollIntoView({behavior: 'smooth'});
//         }
//     });
// });
//
// // Theo dõi sự kiện scroll
// window.addEventListener('scroll', updateActiveNavDot);
//
// // Khởi tạo khi trang được tải
// window.addEventListener('load', () => {
//     updateActiveNavDot();
//
//     // Thêm hiệu ứng cho banner
//     gsap.from('.banner h1', {duration: 1, y: -50, opacity: 0, ease: "back.out(1.7)"});
//     gsap.from('.banner p', {duration: 1, y: 50, opacity: 0, delay: 0.5, ease: "power2.out"});
//
//     // **TÁI CẤU TRÚC**: Tải lời chúc cho Vòng Quay SỬ DỤNG HÀM CHUNG
//     (async () => {
//         const serverWishes = await fetchMessagesWithFallback(); // Dùng hàm chung
//
//         if (serverWishes && serverWishes.length > 0) {
//             // Ghi đè mảng 'wishes' toàn cục bằng lời chúc từ máy chủ
//             wishes = serverWishes.map(item => item.message);
//             console.log('Vòng quay đã được cập nhật với lời chúc.');
//         } else {
//             console.log('Vòng quay sử dụng lời chúc mặc định.');
//         }
//     })();
// });
//
//
// /**
//  * === LOGIC FORM LỜI CHÚC MỚI ===
//  */
// (async function () {
//     // const STORAGE_KEY = 'messages'; // Đã chuyển lên global
//     const form = document.getElementById('newWishForm');
//     const inputName = document.getElementById('newSender');
//     const inputMsg = document.getElementById('newMessage');
//     const successEl = document.getElementById('newWishSuccess');
//     const listEl = document.getElementById('savedWishesList');
// // **THAY ĐỔI MỚI**: Lấy nút và container
//     const toggleBtn = document.getElementById('toggleWishesBtn');
//     const listContainer = document.querySelector('.saved-wishes');
//
//     // **THAY ĐỔI MỚI**: Thêm sự kiện cho nút Bật/Tắt
//     if (toggleBtn && listContainer) {
//         toggleBtn.addEventListener('click', () => {
//             // Kiểm tra trạng thái hiện tại
//             const isHidden = listContainer.style.display === 'none';
//             if (isHidden) {
//                 listContainer.style.display = 'block';
//                 toggleBtn.textContent = 'Ẩn Danh Sách Lời Chúc';
//             } else {
//                 listContainer.style.display = 'none';
//                 toggleBtn.textContent = 'Hiện Danh Sách Lời Chúc';
//             }
//         });
//     }
//     /**
//      * **TÁI CẤU TRÚC**: Đã xóa hàm fetchMessagesFromServer(),
//      * sẽ sử dụng hàm fetchMessagesWithFallback() global.
//      */
//
//     /**
//      * Gửi lời chúc lên máy chủ, nếu thất bại, lưu vào localStorage.
//      */
//     async function postMessageToServer(sender, message) {
//         try {
//             const r = await fetch('/api/messages', {
//                 method: 'POST',
//                 headers: {'Content-Type': 'application/json'},
//                 body: JSON.stringify({sender, message})
//             });
//             if (!r.ok) throw new Error('Lỗi máy chủ khi gửi');
//             return await r.json();
//         } catch (e) {
//             console.warn('Không thể gửi lên máy chủ, lưu vào localStorage.');
//             // Fallback: lưu vào localStorage
//             let list = [];
//             try {
//                 list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
//             } catch (_) {
//                 list = [];
//             }
//             const entry = {
//                 id: Date.now().toString(36),
//                 sender: sender || 'Ẩn danh',
//                 message: message,
//                 timestamp: Date.now()
//             };
//             list.push(entry);
//             localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
//             return {ok: true, entry}; // Giả lập phản hồi thành công
//         }
//     }
//
//     /**
//      * Hiển thị danh sách lời chúc ra HTML
//      */
//     function renderMessages(items) {
//         if (!listEl) return; // Không tìm thấy phần tử list
//         listEl.innerHTML = '';
//         if (!items || items.length === 0) {
//             listEl.innerHTML = '<li style="opacity:.8">Chưa có lời chúc nào. Hãy là người đầu tiên!</li>';
//             return;
//         }
//         items.slice().reverse().forEach(item => {
//             const li = document.createElement('li');
//             const txt = document.createElement('div');
//             txt.textContent = item.message;
//             const meta = document.createElement('div');
//             meta.className = 'meta';
//             const date = new Date(item.timestamp || Date.now());
//             meta.textContent = `${item.sender || 'Ẩn danh'} • ${date.toLocaleString()}`;
//             li.appendChild(txt);
//             li.appendChild(meta);
//             listEl.appendChild(li);
//         });
//     }
//
//     /**
//      * Hiển thị thông báo thành công tạm thời
//      */
//     function showSuccessTemporary() {
//         if (!successEl) return;
//         successEl.style.display = 'block';
//         setTimeout(() => {
//             successEl.style.display = 'none';
//         }, 2000);
//     }
//
//     // Gắn sự kiện submit cho form
//     if (form) {
//         form.addEventListener('submit', async (e) => {
//             e.preventDefault();
//             const sender = (inputName && inputName.value || '').trim();
//             const message = (inputMsg && inputMsg.value || '').trim();
//
//             if (!message) {
//                 // Phản hồi UI đơn giản
//                 if (inputMsg) {
//                     inputMsg.focus();
//                     inputMsg.style.boxShadow = '0 0 0 3px rgba(244,93,76,0.3)';
//                     setTimeout(() => inputMsg.style.boxShadow = '', 900);
//                 }
//                 return;
//             }
//
//             const resp = await postMessageToServer(sender, message);
//
//             if (resp && resp.ok) {
//                 showSuccessTemporary();
//                 form.reset();
//
//                 // Tải lại danh sách từ máy chủ (hoặc localStorage) và hiển thị
//                 const items = await fetchMessagesWithFallback(); // **TÁI CẤU TRÚC**: Dùng hàm chung
//                 renderMessages(items);
//
//                 // **THAY ĐỔI MỚI**: Cập nhật lại vòng quay với lời chúc mới
//                 if (items && items.length > 0) {
//                     wishes = items.map(item => item.message);
//                 }
//             } else {
//                 // Xử lý lỗi
//                 alert('Không thể lưu lời chúc (đã có lỗi).');
//             }
//         });
//     }
//
//     // Tải và hiển thị lời chúc lần đầu khi trang được tải
//     (async () => {
//         const items = await fetchMessagesWithFallback(); // **TÁI CẤU TRÚC**: Dùng hàm chung
//         renderMessages(items);
//     })();
// })();
// Khởi tạo biến
const themeColors = ["#fceabb", "#fccd94", "#f45d4c"];
const STORAGE_KEY = 'messages'; // **TÁI CẤU TRÚC**: Đưa ra ngoài để dùng chung

// **TÁI CẤU TRÚC**: Chuyển thành 'let' và làm danh sách dự phòng
let wishes = [
    "Chúc mừng ngày Nhà giáo Việt Nam 20/11!",
    "Kính chúc thầy cô luôn mạnh khỏe, hạnh phúc!",
    "Tri ân thầy cô - những người lái đò thầm lặng!",
    "Cảm ơn thầy cô đã dìu dắt chúng em!",
    "Chúc thầy cô luôn tràn đầy nhiệt huyết!",
    "Mong thầy cô luôn vui vẻ và thành công!",
    "Kính chúc thầy cô ngày 20/11 ý nghĩa!",
    "Thầy cô là người dẫn đường tuyệt vời!",
    "Chúc mừng ngày đặc biệt dành cho thầy cô!",
    "Cảm ơn thầy cô đã truyền cảm hứng!",
    "Chúc thầy cô luôn được học trò yêu quý!",
    "Kính chúc thầy cô sức khỏe dồi dào!",
    "Thầy cô là tấm gương sáng để noi theo!",
    "Chúc thầy cô luôn hạnh phúc và bình an!",
    "Cảm ơn thầy cô đã dạy dỗ chúng em!",
    "Chúc mừng ngày Nhà giáo Việt Nam!"
];

/**
 * **TÁI CẤU TRÚC: HÀM DÙNG CHUNG**
 * Tải lời chúc từ máy chủ, nếu thất bại, thử tải từ localStorage.
 */
async function fetchMessagesWithFallback() {
    try {
        const r = await fetch('/api/messages');
        if (!r.ok) throw new Error('Lỗi máy chủ');
        const items = await r.json();
        console.log('Tải lời chúc thành công từ API.');
        return items;
    } catch (e) {
        console.warn('Không thể tải từ máy chủ, chuyển sang localStorage.');
        // Fallback: tải từ localStorage
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        } catch (_) {
            return []; // Trả về mảng rỗng nếu localStorage cũng lỗi
        }
    }
}


// Khởi tạo GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Hiệu ứng cho các phần tử floating (Rung lắc)
// Hiệu ứng này vẫn giữ nguyên
gsap.to(".floating-element", {
    y: 30,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    stagger: 0.5
});

// Hiệu ứng scroll cho story slides
const storySlides = document.querySelectorAll('.story-slide');

// Thiết lập trạng thái ban đầu cho các phần tử sẽ được-animate (Story slides)
storySlides.forEach((slide) => {
    const image = slide.querySelector('.story-image');
    const title = slide.querySelector('.story-title');
    const text = slide.querySelector('.story-text');
    // Đặt trạng thái ban đầu (ẩn, trượt xuống, thu nhỏ, không bóng)
    gsap.set([image, title, text], {
        opacity: 0,
        y: 75, // Tăng y một chút để slide-up rõ hơn
        scale: 0.95, // Thêm hiệu ứng zoom nhẹ
        filter: 'drop-shadow(0 0 0 rgba(0, 0, 0, 0))' // Trạng thái bóng ban đầu
    });
});

// IntersectionObserver cho Story slides
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const slide = entry.target;
        const image = slide.querySelector('.story-image');
        const title = slide.querySelector('.story-title');
        const text = slide.querySelector('.story-text');

        if (entry.isIntersecting) {
            // animate in - KHI PHẦN TỬ VÀO VIEWPORT
            slide.classList.add('active');

            // Tạo timeline mới để chạy animation
            const tl = gsap.timeline();

            // Animation cho Story slides
            tl.to([image, title, text], {
                opacity: 1,     // Fade-in
                y: 0,           // Slide-up
                scale: 1,       // Zoom-in
                filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1))', // Thêm đổ bóng
                duration: 1.5,  // Thời gian 1.5s
                ease: 'ease-in-out', // Easing 'ease-in-out'
                stagger: 0.3    // Hiệu ứng xuất hiện lần lượt (stagger) 0.3s
            });

            // spawn falling flowers each time slide becomes active
            createFallingFlowers(slide);
        } else {
            // animate out - KHI PHẦN TỬ RA KHỎI VIEWPORT
            slide.classList.remove('active');

            // Reset về trạng thái ban đầu
            gsap.to([image, title, text], {
                opacity: 0,
                y: 75,
                scale: 0.95,
                filter: 'drop-shadow(0 0 0 rgba(0, 0, 0, 0))',
                duration: 0.5, // Giữ animate-out nhanh để mượt mà
                ease: "power1.in"
            });
        }
    });
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5  // Trigger khi 50% phần tử hiển thị
});

// observe slides
storySlides.forEach(slide => observer.observe(slide));

/**
 * createFallingFlowers(slide)
 * Create a short burst of falling flower characters within the slide bounds.
 */
function createFallingFlowers(slide) {
    const rect = slide.getBoundingClientRect();
    const startTop = rect.top + window.scrollY;
    const leftStart = rect.left + window.scrollX;
    const count = 10 + Math.floor(Math.random() * 6);

    for (let i = 0; i < count; i++) {
        const flower = document.createElement('div');
        flower.textContent = '❀'; // simple flower glyph
        const size = 14 + Math.floor(Math.random() * 28);
        const left = leftStart + Math.random() * rect.width;
        const delay = Math.random() * 0.6;
        const duration = 1.6 + Math.random() * 1.2;
        const color = themeColors[Math.floor(Math.random() * themeColors.length)] || '#f45d4c';

        Object.assign(flower.style, {
            position: 'absolute',
            left: `${left}px`,
            top: `${startTop - 10}px`,
            fontSize: `${size}px`,
            color: color,
            pointerEvents: 'none',
            zIndex: 9999,
            opacity: '1',
            transform: `translateY(0) rotate(${Math.floor(Math.random() * 360)}deg)`
        });

        document.body.appendChild(flower);

        gsap.to(flower, {
            y: rect.height + 100 + Math.random() * 200,
            x: (Math.random() - 0.5) * 120,
            rotation: (Math.random() - 0.5) * 720,
            opacity: 0,
            ease: "power1.out",
            delay: delay,
            duration: duration,
            onComplete: () => {
                if (flower && flower.parentNode) flower.parentNode.removeChild(flower);
            }
        });
    }
}

// Vòng quay lời chúc
const spinnerWheel = document.getElementById('spinner-wheel');
const spinBtn = document.getElementById('spin-btn');
const spinButton = document.getElementById('spin-button');
const spinnerResult = document.getElementById('spinner-result');
let isSpinning = false;
const tingSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3');

function spinWheel() {
    if (isSpinning) return;
    if (wishes.length === 0) {
        spinnerResult.textContent = "Chưa có lời chúc nào để quay!";
        return;
    }

    isSpinning = true;
    const randomDegree = 1800 + Math.floor(Math.random() * 360);
    // Chọn ngẫu nhiên từ mảng 'wishes' (đã được tải từ API hoặc dùng mặc định)
    const randomIndex = Math.floor(Math.random() * wishes.length);

    gsap.to(spinnerWheel, {
        rotation: `+=${randomDegree}`,
        duration: 4,
        ease: "back.out(1.2)",
        onComplete: () => {
            spinnerResult.textContent = wishes[randomIndex];
            isSpinning = false;

            // Hiệu ứng confetti
            confetti({
                particleCount: 150,
                spread: 70,
                origin: {y: 0.6}
            });

            // Phát âm thanh
            tingSound.play();
        }
    });
}

// Sự kiện cho nút quay
if (spinBtn) spinBtn.addEventListener('click', spinWheel);
if (spinButton) spinButton.addEventListener('click', spinWheel);

// Thiệp điện tử (Mã gốc không có phần này, giữ lại nếu bạn có)
const envelope = document.getElementById('envelope');
if (envelope) {
    envelope.addEventListener('click', function () {
        this.classList.toggle('open');
    });
}

// Xử lý form CŨ (Form này dường như không còn trong HTML, nhưng để lại logic)
const wishForm = document.getElementById('wishForm');
const successMessage = document.getElementById('successMessage');

if (wishForm) {
    wishForm.addEventListener('submit', function (e) {
        e.preventDefault();
        // ... (logic form cũ)
    });
}


// Tạo hiệu ứng trái tim bay lên
function createFloatingHearts() {
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤';
        // ... (CSS cho trái tim)
        document.body.appendChild(heart);

        gsap.to(heart, {
            y: -1000,
            x: Math.random() * 200 - 100,
            rotation: Math.random() * 360,
            duration: 3 + Math.random() * 2,
            opacity: 0,
            ease: "power1.out",
            onComplete: () => {
                document.body.removeChild(heart);
            }
        });
    }
}

// Navigation dots
const navDots = document.querySelectorAll('.nav-dot');
const sections = document.querySelectorAll('section');

function updateActiveNavDot() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navDots.forEach(dot => dot.classList.remove('active'));
            // Kiểm tra navDots[index] tồn tại
            if (navDots[index]) {
                navDots[index].classList.add('active');
            }
        }
    });
}

// Sự kiện cho navigation dots
navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        // Kiểm tra sections[index] tồn tại
        if (sections[index]) {
            sections[index].scrollIntoView({behavior: 'smooth'});
        }
    });
});

// Theo dõi sự kiện scroll
window.addEventListener('scroll', updateActiveNavDot);

// Khởi tạo khi trang được tải
window.addEventListener('load', () => {
    updateActiveNavDot();

    // === THAY ĐỔI THEO YÊU CẦU ===
    // Áp dụng hiệu ứng mới cho Banner H1 và P khi tải trang
    // Bao gồm: fade-in, slide-up, zoom nhẹ, 1.5s, ease-in-out, stagger 0.3s
    gsap.from('.banner h1, .banner p', {
        opacity: 0,
        y: 50,           // Slide-up từ dưới lên
        scale: 0.95,       // Zoom nhẹ
        duration: 1.5,
        ease: 'ease-in-out',
        stagger: 0.3     // Tự động trễ 0.3s giữa H1 và P
    });

    // (Code cũ đã bị xóa:)
    // gsap.from('.banner h1', {duration: 1, y: -50, opacity: 0, ease: "back.out(1.7)"});
    // gsap.from('.banner p', {duration: 1, y: 50, opacity: 0, delay: 0.5, ease: "power2.out"});

    // **TÁI CẤU TRÚC**: Tải lời chúc cho Vòng Quay SỬ DỤNG HÀM CHUNG
    (async () => {
        const serverWishes = await fetchMessagesWithFallback(); // Dùng hàm chung

        if (serverWishes && serverWishes.length > 0) {
            // Ghi đè mảng 'wishes' toàn cục bằng lời chúc từ máy chủ
            wishes = serverWishes.map(item => item.message);
            console.log('Vòng quay đã được cập nhật với lời chúc.');
        } else {
            console.log('Vòng quay sử dụng lời chúc mặc định.');
        }
    })();
});


/**
 * === LOGIC FORM LỜI CHÚC MỚI ===
 */
(async function () {
    // const STORAGE_KEY = 'messages'; // Đã chuyển lên global
    const form = document.getElementById('newWishForm');
    const inputName = document.getElementById('newSender');
    const inputMsg = document.getElementById('newMessage');
    const successEl = document.getElementById('newWishSuccess');
    const listEl = document.getElementById('savedWishesList');

    // **THAY ĐỔI MỚI**: Lấy nút và container
    const toggleBtn = document.getElementById('toggleWishesBtn');
    const listContainer = document.querySelector('.saved-wishes');
    const cardBorderColors = ["#fceabb", "#fccd94", "#f45d4c", "#ff9a8b", "#ff6b6b"];
    /**
     * **TÁI CẤU TRÚC**: Đã xóa hàm fetchMessagesFromServer(),
     * sẽ sử dụng hàm fetchMessagesWithFallback() global.
     */

    /**
     * Gửi lời chúc lên máy chủ, nếu thất bại, lưu vào localStorage.
     */
    async function postMessageToServer(sender, message) {
        try {
            const r = await fetch('/api/messages', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({sender, message})
            });
            if (!r.ok) throw new Error('Lỗi máy chủ khi gửi');
            return await r.json();
        } catch (e) {
            console.warn('Không thể gửi lên máy chủ, lưu vào localStorage.');
            // Fallback: lưu vào localStorage
            let list = [];
            try {
                list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            } catch (_) {
                list = [];
            }
            const entry = {
                id: Date.now().toString(36),
                sender: sender || 'Ẩn danh',
                message: message,
                timestamp: Date.now()
            };
            list.push(entry);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
            return {ok: true, entry}; // Giả lập phản hồi thành công
        }
    }

    /**
     * Hiển thị danh sách lời chúc ra HTML
     */
    function renderMessages(items) {
        if (!listEl) return; // Không tìm thấy phần tử list
        listEl.innerHTML = '';
        if (!items || items.length === 0) {
            listEl.innerHTML = '<li style="opacity:.8">Chưa có lời chúc nào. Hãy là người đầu tiên!</li>';
            return;
        }
        items.slice().reverse().forEach(item => {
            const li = document.createElement('li');
            const randomColor = cardBorderColors[Math.floor(Math.random() * cardBorderColors.length)];
            li.style.borderLeftColor = randomColor;
            const txt = document.createElement('div');
            txt.textContent = item.message;
            const meta = document.createElement('div');
            meta.className = 'meta';
            const date = new Date(item.timestamp || Date.now());
            meta.textContent = `${item.sender || 'Ẩn danh'} • ${date.toLocaleString()}`;
            li.appendChild(txt);
            li.appendChild(meta);
            listEl.appendChild(li);
        });
    }

    /**
     * Hiển thị thông báo thành công tạm thời
     */
    function showSuccessTemporary() {
        if (!successEl) return;
        successEl.style.display = 'block';
        setTimeout(() => {
            successEl.style.display = 'none';
        }, 2000);
    }

    // **THAY ĐỔI MỚI**: Thêm sự kiện cho nút Bật/Tắt
    if (toggleBtn && listContainer) {
        toggleBtn.addEventListener('click', () => {
            // Kiểm tra trạng thái hiện tại
            const isHidden = listContainer.style.display === 'none';
            if (isHidden) {
                listContainer.style.display = 'block';
                toggleBtn.textContent = 'Ẩn Danh Sách Lời Chúc';
            } else {
                listContainer.style.display = 'none';
                toggleBtn.textContent = 'Hiện Danh Sách Lời Chúc';
            }
        });
    }

    // Gắn sự kiện submit cho form
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const sender = (inputName && inputName.value || '').trim();
            const message = (inputMsg && inputMsg.value || '').trim();

            if (!message) {
                // Phản hồi UI đơn giản
                if (inputMsg) {
                    inputMsg.focus();
                    inputMsg.style.boxShadow = '0 0 0 3px rgba(244,93,76,0.3)';
                    setTimeout(() => inputMsg.style.boxShadow = '', 900);
                }
                return;
            }

            const resp = await postMessageToServer(sender, message);

            if (resp && resp.ok) {
                showSuccessTemporary();
                form.reset();

                // Tải lại danh sách từ máy chủ (hoặc localStorage) và hiển thị
                const items = await fetchMessagesWithFallback(); // **TÁI CẤU TRÚC**: Dùng hàm chung
                renderMessages(items);

                // **THAY ĐỔI MỚI**: Cập nhật lại vòng quay với lời chúc mới
                if (items && items.length > 0) {
                    wishes = items.map(item => item.message);
                }
            } else {
                // Xử lý lỗi
                alert('Không thể lưu lời chúc (đã có lỗi).');
            }
        });
    }

    // Tải và hiển thị lời chúc lần đầu khi trang được tải
    (async () => {
        const items = await fetchMessagesWithFallback(); // **TÁI CẤU TRÚC**: Dùng hàm chung
        renderMessages(items);
    })();
})();
