1. 데이터 베이스 통해서 로그인 완성(sns인증은 아직 보류)

2. 각각의 아이디로 다른 일정 사용할수 있게 지정(일정 공유기능은 보류)


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(100),
    start_date DATE,
    end_date DATE,
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

db 생성 테이블
