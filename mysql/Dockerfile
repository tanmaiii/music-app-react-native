FROM mysql:8.0

# Sao chép tệp SQL vào thư mục initdb.d trong container
COPY ./init.sql /docker-entrypoint-initdb.d/

# Thiết lập biến môi trường cho MySQL
ENV MYSQL_DATABASE=music
ENV MYSQL_ROOT_PASSWORD=123


EXPOSE 3306