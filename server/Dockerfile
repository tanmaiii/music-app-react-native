# Sử dụng image Node.js chính thức làm hình ảnh cơ sở
FROM node:18.16.0-alpine

# Đặt thư mục làm thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Cài đặt PM2 để quản lý ứng dụng Node.js
RUN npm install -g pm2

# Sao chép phần còn lại của mã ứng dụng
COPY . .

# Mở cổng mà ứng dụng chạy trên
EXPOSE 8000

#Thiết lập biến môi trường cho ứng dụng
ENV DB_HOST=mysqldb
ENV DB_USERNAME=root
ENV DB_PASSWORD=123
ENV DB_DATABASE=music
ENV DB_PORT=3306

ENV PORT=8000
ENV APP_NAME = "SOUND HUB"
ENV MAIL_NAME=jobquestofficial@gmail.com
ENV MAIL_PASSWORD=kbaw_fiei_rpom_hrfu
ENV MY_SECRET = 'tanmai'

# Khởi động ứng dụng bằng PM2
CMD ["pm2-runtime", "start", "index.js"]
