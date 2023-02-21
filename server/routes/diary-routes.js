const express = require("express");
const diaryContoller = require("../controllers/diary-controller");

const router = express.Router();

router.get("/:userEmail", diaryContoller.getUserDiary);

router.post("/insert", diaryContoller.postUserDiary);

module.exports = router;
