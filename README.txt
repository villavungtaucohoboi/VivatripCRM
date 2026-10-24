VIVATRIP CRM - Plugin cho Lark Base
===================================
Thư mục gồm 2 file, phải để cùng chỗ:
  index.html  - giao diện CRM (đọc dữ liệu thật từ 5 bảng của Base đang mở)
  sdk.js      - SDK chính thức của Lark Base (@lark-base-open/js-sdk 1.0.2)

Cài đặt:
1. Đưa thư mục này lên một địa chỉ https công khai (GitHub Pages, Vercel, Netlify...).
2. Mở Base "CRM VIVATRIP" -> biểu tượng Tiện ích mở rộng (Base extensions) góc trên phải
   -> Customize / Tuỳ chỉnh -> New Extension / Tiện ích mới.
3. Đặt tên "Vivatrip CRM", dán địa chỉ https của index.html -> Confirm.

Ghi chú:
- Plugin không chứa dữ liệu; mỗi người mở sẽ thấy dữ liệu theo quyền xem của chính họ trong Lark.
- Các nút "Lưu vào Lark" ghi thẳng vào bảng (tình trạng lead, chăm sóc 1-2-3, check căn, sale note,
  lý do thất bại, điều hành xác nhận, trạng thái thu/chi) - cần quyền sửa bảng.
- Bấm "Làm mới" để đọc lại dữ liệu mới nhất.
