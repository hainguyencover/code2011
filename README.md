# Tri Ân 20/11 -- Lời Chúc May Mắn

Ứng dụng web full-stack được xây dựng nhằm kỷ niệm Ngày Nhà Giáo Việt
Nam 20/11. Người dùng có thể xem lời chúc, quay vòng quay ngẫu nhiên,
gửi lời chúc mới, và tất cả lời chúc sẽ được lưu trữ vĩnh viễn trên máy
chủ.

## 🎉 Tính Năng Chính

-   **Giao diện hiện đại**\
    Responsive, bố cục sạch sẽ, sử dụng bảng màu Xanh Bạc Hà.

-   **Hiệu ứng mượt mà**\
    Sử dụng GSAP và ScrollTrigger để tạo hiệu ứng khi cuộn.

-   **Vòng quay lời chúc tương tác**\
    Dữ liệu được lấy từ API và hiển thị ngẫu nhiên khi người dùng quay.

-   **Form gửi lời chúc**\
    Gửi lời chúc mới dễ dàng, dữ liệu được lưu vào server.

-   **Backend Node.js**\
    Express.js xử lý API GET/POST và lưu vào file `data/messages.json`.

-   **Thư viện lời chúc**\
    Hiển thị tất cả lời chúc dạng grid 3 cột, viền màu random bằng JS.

## 🛠️ Công Nghệ Sử Dụng

-   **Frontend:**\
    HTML5, CSS3 (Flexbox, Grid), JavaScript ES6+, GSAP, Canvas Confetti.

-   **Backend:**\
    Node.js, Express.js.

-   **Cơ sở dữ liệu:**\
    File JSON -- thao tác bằng module `fs` của Node.js.

## 📁 Cấu Trúc Thư Mục

    [Thư mục dự án]/
    │-- css/
    │   └── style.css
    │
    │-- data/
    │   └── messages.json   (được server tự tạo nếu chưa có)
    │
    │-- js/
    │   └── script.js
    │
    │-- node_modules/       (tự tạo sau khi chạy "npm install")
    │
    │-- index.html
    │-- server.js
    │-- package.json
    └── README.md

## 🚀 Hướng Dẫn Cài Đặt & Khởi Chạy

Yêu cầu: Máy đã cài Node.js và npm.

### 1. Cài đặt dependencies

Mở terminal và di chuyển đến thư mục dự án:

``` bash
npm init -y
npm install express
```

### 2. Khởi chạy server

``` bash
node server.js
```

Nếu chạy thành công, terminal sẽ hiện:

    Máy chủ đang chạy tại: http://localhost:3000

Lần chạy đầu tiên server sẽ tự tạo thư mục `data/` và file
`data/messages.json`.

### 3. Truy cập ứng dụng

Mở trình duyệt và vào địa chỉ:

    http://localhost:3000

Ứng dụng sẵn sàng để xem lời chúc, quay vòng quay và gửi lời chúc mới.
