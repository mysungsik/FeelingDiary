const express = require("express");
const cors = require("cors");
const { connectDb } = require("./database/database");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const diaryRouter = require("./routes/diary-routes");
const oAuthRouter = require("./routes/oauth-routes");

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/diary", diaryRouter);
app.use("/api/oauth", oAuthRouter);

// 모든 라우터를 거쳐, 맞는 라우터가 없을때 최종적으로 담길 미들웨어
app.use((req, res, next) => {
  const error = new Error("wrong url");
  error.code = 404;
  throw error;
});

// 오류처리 핸들러
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "something got wrong" });
});

connectDb()
  .then(() => {
    app.listen(5000);
  })
  .catch((error) => {
    console.log(error);
  });
