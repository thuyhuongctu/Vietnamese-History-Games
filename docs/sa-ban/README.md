# Sa bàn đất sét — nguồn dựng ảnh bìa

Hai ảnh bìa trên trang cổng được chụp từ sa bàn 3D dựng bằng mã (three.js có sẵn trong
`lib/`), không dùng mô hình, ảnh hay dịch vụ tạo ảnh bên ngoài:

| Ảnh | Cảnh | Lệnh mở |
|---|---|---|
| `assets/portal/bac-hai-dao-3d-v2.webp` | Thuyền buồm cánh dơi giữa đảo đá vôi vịnh Bắc Bộ | `sa-ban.html?canh=bac-hai-dao` |
| `assets/portal/cho-noi-v2.webp` | Xuồng ba lá chở trái cây bên ghe bầu, bờ sông dừa nước | `sa-ban.html?canh=cho-noi` |

Cách dựng lại: mở `sa-ban.html` trong trình duyệt ở khung 1600 × 1000, chụp màn hình thành
PNG, rồi chạy `python3 hau-ky.py <ảnh.png> <ảnh.webp> <đầu dải nét> <cuối dải nét>` để thêm
hiệu ứng mô hình thu nhỏ (mờ trên dưới, tối nhẹ bốn góc) và xuất WebP 1200 × 750.
Ảnh chụp màn hình game cũ (`bac-hai-dao-3d.webp`, `cho-noi.webp`) vẫn giữ nguyên và còn
dùng ở thư viện ảnh của trang giới thiệu.
