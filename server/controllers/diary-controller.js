const { diaryValidation } = require("../helper/diary-valdation");
const { getDb } = require("../database/database");

const getUserDiary = async (req, res, next) => {
  const userEmail = req.params.userEmail;

  // 유저가 인증되었는지 추가하는 항목이 필요하겠다.
  // 유저가 body 나, header 에 토큰을 담아 보내야한다.

  if (!userEmail.includes("@")) {
    const error = new Error("이메일이 올바르지 않습니다.");
    error.code = 404;
    next(error);
    return;
  }

  const response = await getDb()
    .collection("diary")
    .find({ userEmail })
    .toArray();

  res.json({ message: "this is diary", data: response });
};

const postUserDiary = async (req, res, next) => {
  const errorCheck = diaryValidation(req.body);

  if (errorCheck !== null) {
    next(errorCheck);
    return;
  }
  const { userEmail, diaryTitle, diaryContent, feeling, date } = req.body;

  const inputData = {
    userEmail,
    diaryTitle,
    diaryContent,
    feeling,
    date,
  };

  const response = await getDb().collection("diary").insertOne(inputData);

  // 성공한다면
  res.status(201).json({ message: "success", data: response });
};

module.exports = {
  getUserDiary,
  postUserDiary,
};
