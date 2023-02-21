const diaryValidation = (userInput) => {
  if (
    !String(userInput.userEmail).includes("@") ||
    !userInput.diaryTitle ||
    !userInput.diaryContent ||
    typeof userInput.feeling !== "number" ||
    userInput.feeling < 1 ||
    userInput.feeling > 9
  ) {
    const error = new Error("입력값이 잘못되었습니다.");
    error.code = 400;
    return error;
  } else {
    return null;
  }
};

module.exports = {
  diaryValidation,
};
