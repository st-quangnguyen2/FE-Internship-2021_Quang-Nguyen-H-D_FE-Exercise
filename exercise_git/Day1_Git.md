#### - Git là gì ?

Git là phần mềm quản lý mã nguồn phân tán được phát triển bởi Linus Torvalds vào năm 2005, ban đầu dành cho việc phát triển nhân Linux. Hiện nay, Git trở thành một trong các phần mềm quản lý mã nguồn phổ biến nhất.

#### - Repository là gì? Có mấy loại repository?

Repository là nơi lưu trữ nơi sẽ ghi lại trạng thái của thư mục và file. Trạng thái được lưu lại đang được chứa như là lịch sử thay đổi của nội dung. Bằng việc đặt thư mục muốn quản lý lịch sử thay đổi dưới sự quản lý của repository, có thể ghi chép lại lịch sử thay đổi của thư mục và file trong thư mục đó.

Có hai loại repository:

- Local repository
- Global repository

#### - Làm thế nào để add 1 file vào stage? Làm thế nào để add tất cả các file vào stage?

- add 1 file vào stage: `git add <tên thư mục/file>`
- add tất cả file vào stage: `git add .`

#### - Sự khác nhau giữa lệnh `git commit -m "message"` và `git commit -am "message"`?

- `git commit -m "message"`: phải add file/folder vào stage trước sau đó mới commit
- `git commit -am "message"`: add tất cả vào stage sau đó commit
