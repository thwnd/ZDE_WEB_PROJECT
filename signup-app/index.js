const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const app = express();

// Body Parser 설정
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 세션 설정
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1111',
  database: 'test'
});

// MySQL 연결
db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패: ', err);
    return;
  }
  console.log('MySQL에 성공적으로 연결되었습니다.');
});

// 정적 파일 제공
app.use(express.static(path.join(__dirname)));

// 홈 페이지 라우트
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 회원가입 페이지 라우트
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'signup.html'));
});

// 회원가입 처리 라우트
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // 비밀번호 해시화
  const hashedPassword = await bcrypt.hash(password, 10);

  // 사용자 등록
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, hashedPassword], (err, results) => {
    if (err) {
      console.error('회원가입 중 오류 발생: ', err);
      res.status(500).send('서버 오류');
      return;
    }
    res.send('회원가입 성공');
  });
});

// 로그인 처리 라우트
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // 사용자 정보 조회
  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], async (err, results) => {
    if (err) {
      console.error('로그인 중 오류 발생: ', err);
      res.status(500).send('서버 오류');
      return;
    }

    if (results.length === 0) {
      res.send('사용자가 존재하지 않습니다.');
      return;
    }

    const user = results[0];

    // 비밀번호 검증
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      req.session.userId = user.id; // 세션에 사용자 ID 저장
      res.redirect('/calendar'); // 로그인 성공 시 캘린더 페이지로 리다이렉트
    } else {
      res.send('비밀번호가 틀렸습니다.');
    }
  });
});

// 캘린더 페이지 라우트
app.get('/calendar', (req, res) => {
  if (!req.session.userId) {
    res.redirect('/'); // 로그인되지 않은 사용자는 홈 페이지로 리다이렉트
  } else {
    res.sendFile(path.join(__dirname, 'calendar.html')); // 캘린더 페이지 제공
  }
});

// 일정 추가 라우트
app.post('/add-event', (req, res) => {
  if (!req.session.userId) {
    res.status(403).send('로그인이 필요합니다.'); // 로그인되지 않은 경우
    return;
  }

  const { title, startDate, endDate, description } = req.body;
  const userId = req.session.userId;

  const sql = 'INSERT INTO events_log (user_id, title, start_date, end_date, description) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [userId, title, startDate, endDate, description], (err, results) => {
    if (err) {
      console.error('일정 추가 중 오류 발생: ', err);
      res.status(500).send('서버 오류');
      return;
    }
    res.send('일정 추가 성공');
  });
});

// 일정 조회 라우트
app.get('/get-events', (req, res) => {
  if (!req.session.userId) {
    res.status(403).send('로그인이 필요합니다.'); // 로그인되지 않은 경우
    return;
  }

  const userId = req.session.userId;

  const sql = 'SELECT * FROM events_log WHERE user_id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('일정 조회 중 오류 발생: ', err);
      res.status(500).send('서버 오류');
      return;
    }
    const events = results.map(event => ({
      title: event.title,
      start: event.start_date,
      end: event.end_date,
      description: event.description
    }));
    res.json(events);
  });
});

// 서버 시작
app.listen(3000, () => {
  console.log('서버가 3000번 포트에서 실행 중입니다.');
});
