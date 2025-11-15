Dự án: Tri Ân 20/11 - Cổng Lời Chúc Tương Tác

Đây là một ứng dụng web full-stack (Node.js và Frontend) được xây dựng để kỷ niệm Ngày Nhà giáo Việt Nam. Ứng dụng cho
phép người dùng xem các thông điệp, tham gia vòng quay lời chúc, và gửi lời chúc của riêng mình. Các lời chúc sẽ được
lưu trữ vĩnh viễn trên máy chủ.

1. Tính Năng Chính

Giao diện Hiện đại: Thiết kế responsive, sạch sẽ với bảng màu Xanh Bạc Hà.

Hiệu ứng Mượt mà: Sử dụng GSAP & ScrollTrigger để kích hoạt animation khi cuộn.

Vòng Quay Tương Tác: Tải lời chúc từ API và cho phép người dùng quay ngẫu nhiên.

Form Gửi Lời Chúc: Người dùng có thể gửi lời chúc mới.

Backend Node.js: Sử dụng Express.js để tạo API (GET/POST) lưu trữ lời chúc vào tệp data/messages.json.

Thư Viện Lời Chúc: Hiển thị toàn bộ lời chúc đã gửi dưới dạng lưới (grid) 3 cột, với viền màu ngẫu nhiên (gán bằng JS).

2. Công Nghệ Sử Dụng

Frontend: HTML5, CSS3 (Flexbox, Grid), JavaScript (ES6+), GSAP, Canvas Confetti.

Backend: Node.js, Express.js.

Cơ sở dữ liệu: Tệp JSON (thông qua module fs của Node.js).

3. Cấu Trúc Thư Mục

Để dự án hoạt động chính xác, cấu trúc thư mục của bạn phải như sau:

[Thư mục dự án của bạn]/
|
|-- css/
| |-- style.css
|
|-- data/
| |-- messages.json  (Tệp này sẽ được server tự động tạo)
|
|-- js/
| |-- script.js
|
|-- node_modules/       (Thư mục này sẽ được tạo sau khi chạy "npm install")
|
|-- index.html
|-- server.js
|-- package.json
|-- README.md           (Tệp này)

4. Hướng Dẫn Cài Đặt & Khởi Chạy

Bạn cần cài đặt Node.js (bao gồm npm) trước khi bắt đầu.

Bước 1: Cài đặt Dependencies

Mở terminal (như PowerShell hoặc CMD) và điều hướng đến thư mục dự án của bạn (ví dụ: E:\CodeGym\Module4\code2010).

Chạy lệnh sau để tạo tệp package.json (nếu bạn chưa có):

npm init -y

Cài đặt express (thư viện duy nhất cần cho backend):

npm install express

Bước 2: Khởi Chạy Máy Chủ

Vẫn ở trong terminal tại thư mục dự án, chạy lệnh sau:

node server.js

Nếu thành công, bạn sẽ thấy thông báo:
Máy chủ đang chạy tại: http://localhost:3000

Khi máy chủ khởi động lần đầu, nó sẽ tự động tạo thư mục data/ và tệp data/messages.json cho bạn.

Bước 3: Truy Cập Ứng Dụng

Mở trình duyệt (Chrome, Firefox, v.v.) và truy cập địa chỉ: http://localhost:3000

Bạn sẽ thấy trang web hoàn chỉnh, có thể gửi lời chúc và xem danh sách lời chúc đã được lưu.
