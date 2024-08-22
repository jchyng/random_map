const express = require("express");
const mysql = require("mysql2");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;

// 데이터베이스 연결 설정
const connection = mysql.createPool({
  host: process.env.DB_HOST || "203.130.178.90",
  port: 33062,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "1234",
  database: process.env.DB_NAME || "map",
  ssl: false,
  connectionLimit: 10,
  queueLimit: 0,
});

// 쿼리 실행 함수
function executeQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (err, results) => {
      if (err) {
        console.error("쿼리 실행 오류:", err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

// 타겟 테이블 유효성 검사 미들웨어
function validateTarget(req, res, next) {
  console.log(req.query);
  const { target } = req.query;
  const allowedTargets = ["mountains", "beaches"]; // 허용된 테이블 이름 목록
  if (!target || !allowedTargets.includes(target)) {
    return res.status(400).json({ error: "Invalid or missing target table" });
  }
  req.target = target;
  next();
}

// 공통 쿼리 생성 함수
function createQuery(target, address) {
  console.log("table = ", target);
  let query = `SELECT * FROM ??`;
  const queryParams = [target];

  if (address) {
    query += ` WHERE address LIKE ?`;
    queryParams.push(`%${address}%`);
  }
  return { query, queryParams };
}

// 검색 엔드포인트
app.get("/search", validateTarget, async (req, res) => {
  console.log("req");
  console.log(req.query);
  const { target, address } = req.query;
  const { query, queryParams } = createQuery(target, address);

  console.log("검색 쿼리:", query);

  try {
    const results = await executeQuery(query, queryParams);
    res.json(results);
  } catch (error) {
    console.error("쿼리 실행 오류:", error);
    res.status(500).json({ error: "서버 오류" });
  }
});

// 랜덤 엔드포인트
app.get("/random", validateTarget, async (req, res) => {
  const { target, address } = req.query;
  let { query, queryParams } = createQuery(target, address);
  query += ` ORDER BY RAND() LIMIT 1`;

  console.log("랜덤 쿼리:", query);

  try {
    const results = await executeQuery(query, queryParams);
    res.json(results[0] || {});
  } catch (error) {
    console.error("쿼리 실행 오류:", error);
    res.status(500).json({ error: "서버 오류" });
  }
});

// 정적 파일 서빙 설정
app.use(express.static(path.join(__dirname, "public")));

// 기본 라우트
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 서버 리스닝
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
