# Document Management & AI Knowledge Hub - Frontend

Giao diện Web phục vụ quản lý không gian làm việc, lưu trữ tài liệu đa định dạng và tương tác với Trợ lý AI Hỏi Đáp dựa trên cơ chế RAG.



## Công nghệ sử dụng

- **Framework và công cụ:** React 19, Vite
- **Giao diện:** Tailwind CSS, PostCSS
- **Định tuyến:** React Router v7
- **Kết nối API và quản lý trạng thái:** Axios, React Context API
- **Biểu tượng và thành phần giao diện:** Heroicons, SVG



## Tính năng chính

1. **Xác thực và quản lý hồ sơ**
   - Đăng ký và đăng nhập bằng JWT.
   - Quản lý thông tin tài khoản.
   - Cập nhật thông tin cá nhân.
   - Tải lên và cập nhật ảnh đại diện.

2. **Quản lý không gian làm việc**
   - Tạo và quản lý danh sách dự án.
   - Phân quyền theo vai trò.
   - Tải lên và cập nhật logo dự án.
   - Cấu hình dung lượng và định dạng tệp được phép lưu trữ.

3. **Quản lý tài liệu**
   - Tải lên nhiều tệp cùng lúc.
   - Hỗ trợ kéo thả tệp.
   - Hỗ trợ nhiều định dạng như PDF, Word, hình ảnh, video, Excel, ZIP và các định dạng khác.
   - Tự động nhận diện các tài liệu được hỗ trợ bởi AI RAG.
   - Phân biệt tài liệu dùng cho AI và các tệp chỉ lưu trữ trên MinIO.
   - Tìm kiếm và lọc tài liệu theo định dạng.
   - Xem trước tài liệu thông qua Presigned URL.
   - Tải tài liệu về.

4. **Trợ lý AI hỏi đáp**
   - Trò chuyện với AI theo từng phiên.
   - Lựa chọn tài liệu làm phạm vi ngữ cảnh hỏi đáp.
   - Chỉ sử dụng các tài liệu đã được lập chỉ mục AI RAG.
   - Hiển thị câu trả lời và nguồn tài liệu tham chiếu.

5. **Quản trị hệ thống**
   - Quản lý tài khoản người dùng.
   - Quản lý vai trò và quyền truy cập.
   - Theo dõi và quản lý các dự án trên hệ thống.

---

## Khởi chạy dự án

### 1. Cài đặt các gói phụ thuộc

```bash
npm install
````

### 2. Cấu hình biến môi trường

Tạo file `.env` tại thư mục gốc nếu cần thay đổi địa chỉ Backend:

```env
VITE_API_BASE_URL=http://localhost:10001/api/v1
```

### 3. Khởi chạy môi trường phát triển

```bash
npm run dev
```

Ứng dụng mặc định chạy tại:

```text
http://localhost:5173
```

### 4. Đóng gói ứng dụng

```bash
npm run build
```

