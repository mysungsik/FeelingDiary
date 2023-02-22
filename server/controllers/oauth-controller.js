require("dotenv").config();

const naverLogin = (req, res, next) => {
  // 네이버로그인
  const api_url =
    "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" +
    process.env.NAVER_OAUTH_CLIENTID +
    "&redirect_uri=" +
    process.env.NAVER_OAUTH_REDIRECT +
    "&state=" +
    process.env.NAVER_OAUTH_STATE;
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  res.end(
    "<a href='" +
      api_url +
      "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>"
  );
};

const naverLoginCallback = async (req, res, next) => {
  const code = req.query.code;
  const state = req.query.state;
  const api_url =
    "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=" +
    process.env.NAVER_OAUTH_CLIENTID +
    "&client_secret=" +
    process.env.NAVER_OAUTH_PASSWORD +
    "&redirect_uri=" +
    process.env.NAVER_OAUTH_REDIRECT +
    "&code=" +
    code +
    "&state=" +
    state;

  const resposne = await fetch(`${api_url}`, {
    method: "GET",
    headers: {
      "X-Naver-Client-Id": process.env.NAVER_OAUTH_CLIENTID,
      "X-Naver-Client-Secret": process.env.NAVER_OAUTH_PASSWORD,
    },
  });

  const responseData = await resposne.json();

  if (responseData.access_token) {
    const token = responseData.access_token;
    const header = "Bearer " + token; // Bearer 다음에 공백 추가

    const userDataRaw = await fetch("https://openapi.naver.com/v1/nid/me", {
      method: "GET",
      headers: {
        Authorization: header,
      },
    });

    const userData = await userDataRaw.json();
    res.cookie(
      "naver_access",
      { ...userData, access_token: token },
      {
        maxAge: 10000000,
      }
    );
    res.redirect("http://localhost:3000/");
    return;
  } else {
    return;
  }
};

module.exports = {
  naverLogin,
  naverLoginCallback,
};
