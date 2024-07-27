# Tên đề tài: Ứng dụng nghe nhạc SoundHub bằng React Native

* Người thực hiện: Đinh Tấn Mãi       
* Thời gian thực hiện: 03/2024 đến 06/2024
* Email: dinhtanmaivn@gmail.com

# Mô tả dự án Music App

Dự án SoundHub là một ứng dụng di động được phát triển bằng React Native. Ứng dụng này cho phép người dùng nghe nhạc trực tuyến, tìm kiếm và quản lý danh sách phát cá nhân.

## Tính năng chính

- Nghe nhạc trực tuyến: Ứng dụng cho phép người dùng nghe nhạc từ các nguồn dữ liệu trực tuyến như Spotify, Apple Music, và SoundCloud.
- Tìm kiếm bài hát: Người dùng có thể tìm kiếm bài hát, nghệ sĩ hoặc album mà họ muốn nghe.
- Quản lý danh sách phát: Ứng dụng cho phép người dùng tạo và quản lý các danh sách phát cá nhân, thêm hoặc xóa bài hát theo ý muốn.

## Cấu trúc dự án 

```
  ├── client/ # Mã nguồn phía client

  ├── server/ # Mã nguồn phía server

  ├── mysql/ # Cấu hình MySQL

  ├── nginx/ # Cấu hình Nginx

  ├── scripts/ # Các script hỗ trợ

  ├── docker-compose.yml # File docker-compose
```

### Docker

Dự án sử dụng Docker để đóng gói và triển khai. Cấu hình Docker có thể được tìm thấy trong file  Dockerfile.

## Cách chạy dự án

Để chạy dự án, bạn cần cài đặt Docker và Docker Compose. Sau đó, chạy lệnh sau:
```
cd src
docker-compose  up --build
```
Dự án sẽ được chạy tại  
>`http://localhost:8000`.