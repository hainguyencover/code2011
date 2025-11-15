# Tri Ân 20/11 – Cổng Lời Chúc Tương Tác

Ứng dụng web full-stack được xây dựng nhằm kỷ niệm Ngày Nhà Giáo Việt Nam 20/11. Người dùng có thể xem lời chúc, quay vòng quay ngẫu nhiên, gửi lời chúc mới, và tất cả lời chúc sẽ được lưu trữ vĩnh viễn trên máy chủ.

## 🎉 Tính Năng Chính

- **Giao diện hiện đại**  
  Responsive, bố cục sạch sẽ, sử dụng bảng màu Xanh Bạc Hà.

- **Hiệu ứng mượt mà**  
  Sử dụng GSAP và ScrollTrigger để tạo hiệu ứng khi cuộn.

- **Vòng quay lời chúc tương tác**  
  Dữ liệu được lấy từ API và hiển thị ngẫu nhiên khi người dùng quay.

- **Form gửi lời chúc**  
  Gửi lời chúc mới dễ dàng, dữ liệu được lưu vào server.

- **Backend Node.js**  
  Express.js xử lý API GET/POST và lưu vào file `data/messages.json`.

- **Thư viện lời chúc**  
  Hiển thị tất cả lời chúc dạng grid 3 cột, viền màu random bằng JS.

## 🛠️ Công Nghệ Sử Dụng

- **Frontend:**  
  HTML5, CSS3 (Flexbox, Grid), JavaScript ES6+, GSAP, Canvas Confetti.

- **Backend:**  
  Node.js, Express.js.

- **Cơ sở dữ liệu:**  
  File JSON – thao tác bằng module `fs` của Node.js.

## 📁 Cấu Trúc Thư Mục

