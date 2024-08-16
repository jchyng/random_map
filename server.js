const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

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
