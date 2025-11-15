// File: server.js
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
// Định nghĩa đường dẫn tuyệt đối đến tệp data
const DATA_FILE = path.join(__dirname, 'data', 'messages.json');

app.use(express.json()); // Middleware để phân tích JSON body

/**
 * Đảm bảo thư mục 'data' và tệp 'messages.json' tồn tại.
 * Nếu không, nó sẽ tạo chúng.
 */
async function ensureDataFile() {
    try {
        await fs.access(DATA_FILE);
    } catch (err) {
        // Lỗi (không tìm thấy tệp), vì vậy hãy tạo thư mục và tệp
        try {
            await fs.mkdir(path.dirname(DATA_FILE), {recursive: true});
            await fs.writeFile(DATA_FILE, '[]', 'utf8');
            console.log('Đã tạo data/messages.json');
        } catch (mkdirErr) {
            console.error("Không thể tạo thư mục/tệp data:", mkdirErr);
        }
    }
}

/**
 * === QUAN TRỌNG: API ROUTES PHẢI ĐƯỢC ĐỊNH NGHĨA TRƯỚC STATIC FILES ===
 * * API Endpoint: POST /api/messages
 * Thêm một lời chúc mới vào tệp JSON.
 */
app.post('/api/messages', async (req, res) => {
    // Lấy dữ liệu từ body và làm sạch
    const {sender = '', message = ''} = req.body || {};
    if (!message || typeof message !== 'string' || message.trim() === '') {
        return res.status(400).json({error: 'Nội dung lời chúc là bắt buộc'});
    }

    // Tạo mục nhập mới
    const entry = {
        sender: String(sender).trim() || 'Ẩn danh', // Mặc định là 'Ẩn danh'
        message: String(message).trim(),
        timestamp: Date.now()
    };

    try {
        await ensureDataFile(); // Đảm bảo tệp tồn tại trước khi đọc
        const raw = await fs.readFile(DATA_FILE, 'utf8');
        let arr = [];
        try {
            // Thử phân tích JSON, nếu tệp trống hoặc lỗi, dùng mảng rỗng
            arr = JSON.parse(raw || '[]');
            if (!Array.isArray(arr)) arr = [];
        } catch (e) {
            arr = [];
        }

        arr.push(entry); // Thêm mục mới

        // Ghi lại toàn bộ mảng vào tệp (định dạng đẹp với 2 dấu cách)
        await fs.writeFile(DATA_FILE, JSON.stringify(arr, null, 2), 'utf8');
        res.status(201).json({ok: true, entry}); // Trả về 201 Created
    } catch (err) {
        console.error('Lỗi khi ghi tệp:', err);
        res.status(500).json({error: 'Không thể lưu lời chúc'});
    }
});

/**
 * API Endpoint: GET /api/messages
 * Lấy tất cả các lời chúc đã lưu.
 */
app.get('/api/messages', async (req, res) => {
    try {
        await ensureDataFile(); // Đảm bảo tệp tồn tại trước khi đọc
        const raw = await fs.readFile(DATA_FILE, 'utf8');
        let arr = [];
        try {
            arr = JSON.parse(raw || '[]');
            if (!Array.isArray(arr)) arr = [];
        } catch (e) {
            arr = [];
        }
        res.json(arr); // Gửi mảng dưới dạng JSON
    } catch (err) {
        console.error('Lỗi khi đọc tệp:', err);
        res.status(500).json({error: 'Không thể đọc lời chúc'});
    }
});

/**
 * === STATIC MIDDLEWARE PHẢI ĐI SAU API ROUTES ===
 * Serve các tệp tĩnh (index.html, css/, js/)
 * express.static sẽ tự động tìm index.html khi truy cập "/"
 */
app.use(express.static(path.join(__dirname)));

/**
 * === XÓA ROUTE '/*' GÂY XUNG ĐỘT ===
 * Route "catch-all" này không cần thiết vì express.static đã xử lý việc
 * phục vụ index.html.
 */
// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Máy chủ đang chạy tại: http://localhost:${PORT}`);
    ensureDataFile(); // Kiểm tra tệp khi máy chủ khởi động
});
