# Luật của kho Vietnamese-History-Games

Cổng Trò Chơi Sử Việt: năm trò chơi lịch sử chạy trên trình duyệt, do Đỗ Thùy Hương làm. Ai, người hay trợ lý, sửa
gì trong kho này thì đọc trang này trước.

> Bản đầu của trang này do trợ lý soạn ngày 21/11/2026 từ `README.md`, `sw.js`, `HUONG-DAN-PHAT-HANH.md` và mã của
> kho, để tác giả duyệt và sửa. Chỗ nào trang này nói khác với ý tác giả thì ý tác giả thắng; sửa luôn tại đây.

---

## 1. Ràng buộc không được vi phạm

**Gộp vào `main` là phát hành.** GitHub Pages phục vụ thẳng từ nhánh `main`, và ứng dụng đã cài trên máy người chơi
tự cập nhật theo. Không có bước dựng, không có bản thử nghiệm đứng giữa. Việc mới làm trên nhánh riêng rồi mở PR;
không đẩy thẳng lên `main`.

**Không thu thập dữ liệu người chơi.** Không máy chủ, không công cụ đếm lượt truy cập, không quảng cáo, không yêu
cầu nào ra ngoài trang lúc chạy. Ván đã lưu, điểm cao, lựa chọn bật tắt âm thanh, ngôn ngữ và giao diện chỉ nằm
trong `localStorage` trên máy người chơi. Đây cũng là điều đã khai với Google Play (`store-assets/`) và ghi trong
`privacy.html`: thêm một lời gọi mạng là làm sai cả ba chỗ ấy.

**Không dùng CDN.** three.js (r147, `lib/three.min.js`) và Phaser (3.90.0, `assets/vendor/phaser.min.js`) lưu ngay
trong kho, kèm giấy phép MIT của chúng. Phông chữ và thư viện mới, nếu có, cũng phải lưu trong kho. Lý do: trò chơi
phải chạy khi mất mạng, và mỗi bản lưu trữ trên Zenodo phải tự chạy được.

**Không có bước dựng.** Kho chính là ứng dụng. Mỗi trò chơi là một tệp `index.html` tự đủ. Không thêm công cụ dựng,
trình quản lý gói hay khung phần mềm.

**Sử liệu và hư cấu.** Bối cảnh, địa danh, hàng hóa, sự kiện lấy từ sử liệu và được trình bày trong sổ tay trong
game; luật chơi và chi tiết kể chuyện là hư cấu để chơi được (xem mục «History and fiction» của `README.md`). Không
tự thêm hay sửa năm tháng, tên người, sự kiện: hỏi tác giả, kèm nguồn.

**Giữ dấu tác giả và giấy phép.** `LICENSE` là giấy phép độc quyền, bảo lưu mọi quyền. Không đổi giấy phép, không gỡ
tên tác giả hay DOI `10.5281/zenodo.21850564`.

**Nói đúng ứng dụng làm được gì.** Mô tả trong `README.md`, `.zenodo.json`, `CITATION.cff`, trang giới thiệu và hồ sơ
cửa hàng phải khớp với mã: số trò chơi, có hay không có tệp âm thanh, ngôn ngữ giao diện, hình ảnh và nhạc do
công cụ nào tạo. Đổi mã thì đổi cả mô tả trong cùng một lần.

**Không tự phát hành.** Gắn tag, nộp Zenodo, dựng và tải gói Android lên Google Play là việc của tác giả, mỗi lần
một lần xác nhận. Khóa ký nằm ngoài kho và không được đưa vào kho.

---

## 2. Trước khi báo là xong

**Chạy `python3 tools/kiem_kho.py`.** Phải đạt hết. Script canh những chỗ hỏng mà trang vẫn hiện bình thường: `sw.js`
nạp trước tệp không có, liên kết nội bộ gãy, tài nguyên tự nạp từ máy chủ ngoài, mã gọi ra máy chủ ngoài, manifest
trỏ tới tệp thiếu, tệp rác trong kho. Nó cũng chạy tự động trên mỗi PR.

**Đổi hay thêm tài nguyên thì nâng `VERSION` trong `sw.js`** (`const VERSION = 'thd-vNN'`). Quên là máy người chơi
vẫn dùng bản cũ trong bộ nhớ đệm.

**Tệp mới cần chạy ngoại tuyến thì thêm vào `SHELL`.** `sw.js` nạp trước từng tệp một, nên một đường dẫn sai không
phá cả lần cài; nhưng tệp ấy sẽ lặng lẽ không có khi mất mạng. Nhạc MP3 cố ý không nằm trong `SHELL`: chúng nặng
4–6 MB, được lưu ở lần phát đầu tiên.

**Sửa giao diện thì phải nhìn.** Mở bằng `python3 -m http.server 8000` ở gốc kho (bản 3D cần HTTP để tải ảnh). Xem
ở màn hẹp 390 px và màn rộng, thử cả chạm lẫn bàn phím. Script không thấy được chữ tràn, nút nằm ngoài màn hình hay
màn đen.

**Sửa chữ thì sửa cả hai thứ tiếng.** Trang cổng và các trang giới thiệu viết từng câu thành cặp
`<span lang="en">` và `<span lang="vi">`; trong các trò chơi, chuỗi đi qua hàm `T(vi, en)`. Không có phép kiểm tự
động nào cho việc này: phải bật từng ngôn ngữ mà đọc.

**Chỗ nào không kiểm được thì nói là không kiểm được.** Trình duyệt trong môi trường làm việc trên đám mây kết xuất
bằng phần mềm (cảnh 3D chậm, số khung hình không đại diện cho máy thật) và không giải mã được H.264. Chạm thật,
xoay máy, cài lên màn hình chính, âm thanh qua loa: chỉ thử được trên máy thật. Báo «đã chơi thử» cho những phần ấy
là báo sai.

---

## 3. Đường đi trong kho

| Chỗ | Việc |
|---|---|
| `index.html` | Trang cổng, dòng thời gian các trò chơi |
| `van-don/` | Vân Đồn (1149), canvas 2D |
| `van-don-3d/` | Vân Đồn 3D, three.js; `assets/` chứa hình nhân vật đất nặn; `PROMPT-NHAN-VAT.md` |
| `bac-hai-dao/` | Bắc Hải Đảo (1780), canvas 2D |
| `bac-hai-dao-3d/` | Bắc Hải Đảo 3D, three.js |
| `cho-noi/` | Chợ Nổi (thế kỷ XIX), Phaser 3 |
| `lib/`, `assets/vendor/` | three.js và Phaser lưu trong kho |
| `assets/nhac/` | Bài hát của trang cổng |
| `assets/portal/` | Ảnh thu nhỏ và CSS chung của các trang giới thiệu |
| `sw.js` | Service worker: lấy từ bộ nhớ đệm trước, đồng thời tải bản mới cho lần sau |
| `manifest.webmanifest` | Manifest và lối tắt tới từng trò chơi |
| `privacy.html` | Chính sách quyền riêng tư, hai thứ tiếng |
| `store-assets/` | Hồ sơ cửa hàng, câu trả lời Data safety, đồ họa quảng bá |
| `HUONG-DAN-PHAT-HANH.md` | Hướng dẫn phát hành web, Google Play, iOS; có mục trạng thái thực tế |
| `CITATION.cff`, `.zenodo.json` | Siêu dữ liệu trích dẫn và lưu trữ |
| `tools/kiem_kho.py` | Phép kiểm toàn vẹn; cấu hình ở `tools/kiem_kho.json` |

Địa chỉ đang chạy: `https://games.jemappellehuong.com/` (tệp `CNAME`). Kho đổi tên từ
`ThuyHuong_Digital-2026-Games` ngày 13/11/2026; từ 24/11/2026 địa chỉ GitHub Pages cũ chuyển hướng sang tên miền mới
nhờ trang trong kho `thuyhuongctu.github.io` (xem `HUONG-DAN-PHAT-HANH.md`). `.well-known/assetlinks.json` cho app
Android nằm trong kho này; `_config.yml` chỉ để Jekyll đăng thư mục ấy.

---

## 4. Cách viết mã trong kho này

- Tên biến, tên hàm và chú thích bằng **tiếng Việt**, theo mã sẵn có.
- JavaScript thuần, không khung phần mềm. Mỗi trò chơi giữ trong một tệp.
- Giữ cả bản 2D lẫn bản 3D của cùng một trò chơi: bản 2D là đường lui cho máy yếu.
- Không để lại tệp `.bak` hay tệp tạm. Không ghi đè ảnh, nhạc, mô hình gốc; tệp mới đặt tên mới.
- Chỗ nào từng sai thì ghi lại cái sai ấy ngay tại chỗ, để người sau khỏi vấp lại.

---

## 5. Nhánh và lời commit

Nhánh chính là `main`. Việc mới làm trên nhánh riêng, mở PR, tác giả gộp.

Lời commit viết tiếng Việt, nói **vì sao** chứ không chỉ nói đã đổi gì, và ghi đã kiểm những gì bằng con số thật.

Tác giả commit luôn là `thuyhuongctu <thuyhuongctu@gmail.com>`. Không thêm dòng `Co-Authored-By: Claude`,
`Claude-Session` hay dòng ghi công cho công cụ; mô tả PR cũng không thêm dòng «Generated with Claude Code».

---

## 6. Chỗ đang lệch, đã biết (21/11/2026)

Ghi lại để người sau khỏi dò lại; sửa xong thì xóa dòng tương ứng.

- **`.zenodo.json` mô tả bản cũ.** Phần `description` nói cổng có *bốn* trò chơi, *không kèm tệp âm thanh*, và giao
  diện *bằng tiếng Việt*. `README.md` và mã hiện có *năm* trò chơi (thêm Vân Đồn 3D), bốn bài hát MP3, và giao diện
  hai thứ tiếng. Zenodo đọc tệp này ở mỗi lần phát hành, nên phải sửa trước lần gắn tag kế tiếp.
- **Gói Android 1.2 mở địa chỉ cũ.** Ứng dụng versionCode 1 trên kênh thử nghiệm vẫn trỏ tới địa chỉ trước khi
  đổi tên kho; từ 24/11/2026 địa chỉ ấy chuyển hướng sang `games.jemappellehuong.com`. Gói versionCode 2 mở thẳng
  tên miền mới đã dựng ngày 24/11/2026; xóa dòng này khi bản ấy đã lên kênh thử nghiệm.
- **Chưa có phép thử bằng trình duyệt.** `tools/kiem_kho.py` chỉ đọc mã ở trạng thái tĩnh; chưa có gì tự động mở
  từng trò chơi và chơi thử.
