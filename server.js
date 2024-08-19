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

app.get("/search", (req, res) => {
  console.log("검색");
  res.send(
    JSON.stringify([
      { lat: 37.5666805, lot: 126.9784147 },
      { lat: 36.9666805, lot: 127.9784147 },
    ])
  );
});

app.get("/random", (req, res) => {
  console.log("랜덤");
  res.send(JSON.stringify({ lat: 37.5666805, lot: 126.9784147 }));
});
