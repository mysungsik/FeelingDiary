const express = require("express");
const diaryContoller = require("../controllers/diary-controller");

const router = express.Router();

router.get("/:userEmail", diaryContoller.getUserDiary);

router.post("/insert", diaryContoller.postUserDiary);

router.delete("/delete/:id", diaryContoller.deleteUserDiary)

module.exports = router;
