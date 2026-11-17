# TUVI247
Website lập lá số Tử Vi Đẩu Số bằng tiếng Việt, triển khai tĩnh trên GitHub Pages.

## Công nghệ
- Next.js static export, React và TypeScript.
- Engine lập lá số từ https://github.com/Renhuai123/ziwei-doushu
- iztro và lunar-javascript.

## Chạy cục bộ
npm install
npm run dev

## Kiểm tra và build
npm run typecheck
npm run build

## Triển khai
Workflow .github/workflows/publish-pages.yml build static export và cập nhật thư mục gốc GitHub Pages. Giữ nguyên CNAME để không đổi tên miền.

## Phạm vi
Bộ máy nguồn hỗ trợ lập lá số, an sao, tứ hóa, đại hạn và nhận diện cách cục. Repo nguồn không cung cấp thư viện luận đoán thương mại, prompt AI hoặc API giải đoán; website không giả lập rằng các phần đó đã có.

## Giấy phép
Mã nguồn engine tích hợp theo MIT. Xem LICENSE-ziwei-doushu và NOTICE. Không sao chép các trích dẫn có điều kiện phi thương mại hoặc dữ liệu luận giải riêng biệt.

Engine source revision: d4ae2ac231a47146d9e2801fc9a017d712cb3289.
