# Web Development Fundamental

## SSR(Server Side Rendering) và CSR(Client Side Rendering)

|            | SSR(Server Side Rendering)                                                                                                             | CSR(Client Side Rendering)                                                                                                                          |
|------------|----------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| Khái niệm  | - Nội dung HTML được build và xử lý hoàn toàn trên server,<br>phần lớn logic cũng được xử lý trên server sau đó trả về<br>cho browser. | - Render HTML sẽ được thực hiện ở phía client<br>- Nếu cần nội dung mới, thì sẽ lấy dữ liệu thông qua api sau <br>đó chỉ render lại phần cần thiết  |
| Ưu điểm    | - Load lần đầu nhanh<br>- Hỗ trợ SEO<br>- Thích hợp static page                                                                        | - Render nhanh sau lần tải web đầu tiên<br>- Không cần load lại toàn bộ trang<br>- Tương tác, trải nghiệm tốt hơn                                   |
| Nhược điểm | - Load lại toàn bộ trang khi nội dung thay đổi<br>- Hao tốn tài nguyên server                                                          | - Chạy lần đầu tốn nhiều thời gian<br>- SEO không hiệu quả                                                                                          |

## SPA(Single Page Applications) và MPA(Multiple Pages Applications)

|            | SPA(Single Page Applications)                                                                                                     | MPA(Multiple Pages Applications)                                                                                          |
|------------|-----------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| Khái niệm  | - Dựa trên CRS<br>- React, Vue, Angular...                                                                                        | - Dựa trên SSR                                                                                                            |
| Ưu điểm    | - Tốc độ nhanh<br>- Trai nghiệm người dùng cao<br>- Không load toàn bộ trang<br>- Chỉ một số phần cần thiết khi nội dung thay đổi | - Hỗ trợ tốt cho SEO<br>- Lần tải đầu tiên nhanh                                                                          |
| Nhược điểm | - SEO không hiệu quả                                                                                                              | - Hiệu suất thấp<br>- Chi phí bảo trì cao<br>- Trải nghiệm người dùng không cao<br>- Load lại trang khi nội dung thay đổi |
