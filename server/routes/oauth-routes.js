const express = require("express");
const router = express.Router();

const {
  naverLogin,
  naverLoginCallback,
} = require("../controllers/oauth-controller");

router.get("/naver", naverLogin);
router.get("/naver/callback", naverLoginCallback);

module.exports = router;
