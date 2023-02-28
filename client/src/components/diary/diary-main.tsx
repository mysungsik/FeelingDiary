import DiaryAside from "./diary-aside";
import styles from "./diary-main.module.scss";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState, useEffect, FormEvent } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { userDiaryAction, TypeUserDiary } from "../../store/user-diary-slice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { insertUserDiary } from "../../api/user-diary";
import PopupDiary from "../modal/popup-diary";

const DiaryMain = () => {
  const [loginUserEmail, setLoginUserEmail] = useState<string>("");
  const [cookies] = useCookies(["naver_access"]);
  const [toggleVoiceMode, setToggleVoiceMode] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [feeling, setFeeling] = useState<number>(5);

  const selectedDiaryData = useSelector(
    (state: RootState) => state.selectedDiary
  );

  const dispatch = useDispatch();

  const {
    transcript, // 마이크로 인식한 텍스트
    listening, // 마이크 on off 인식
    resetTranscript, // 리셋 함수
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({
    commands: [
      {
        command: "보이스 모드 종료",
        callback: () => setToggleVoiceMode(false),
      },
    ],
  });

  // 초기 유저 로그인아이디 입력
  useEffect(() => {
    if (cookies.naver_access) {
      setLoginUserEmail(cookies.naver_access.response.email);
    }
  }, []);

  // 보이스모드 온오프시 데이터 처리
  useEffect(() => {
    setContent((prev) => prev + transcript);
    resetTranscript();
  }, [toggleVoiceMode]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  // 키보드로 모드 변경 핸들러
  const keyboradModeChangeHandler = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if ((e.ctrlKey && e.key === "Alt") || (e.altKey && e.key === "Control")) {
      listening ? SpeechRecognition.stopListening() : listenContinuously();
    }
    if (
      (e.shiftKey && e.key === "Control") ||
      (e.ctrlKey && e.key === "Shift")
    ) {
      changeModeHandler();
    }
  };

  // 보이스 시작 함수 설정
  const listenContinuously = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "ko",
    });
  };

  // 모드 변경 핸들러
  const changeModeHandler = () => {
    setToggleVoiceMode((prev) => !prev);
  };

  // 리셋 핸들러
  const resetContentsHandler = () => {
    resetTranscript();
    setContent("");
    setTitle("");
  };

  // 토글된 보이스모드에 따른 message 의 생성
  const changeMessage = (value: string) => {
    setContent(value);
  };

  // 제출 핸들러
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const userInputData: TypeUserDiary = {
      userEmail: loginUserEmail,
      diaryTitle: title,
      diaryContent: toggleVoiceMode ? content + transcript : content,
      feeling: feeling,
      date: new Date().toLocaleDateString("ko-KR"),
    };

    const inserResult = await insertUserDiary(userInputData);

    if (inserResult.message === "success") {
      resetContentsHandler();
      // DB 에서 fetch 를 다시하지 않고 화면에 표시하기 위해, store 에도 업데이트
      userInputData._id = inserResult.data.insertedId;
      dispatch(userDiaryAction.addUserDiary(userInputData));
    }
  };

  return (
    <div className={styles.diary} onKeyDown={keyboradModeChangeHandler}>
      <DiaryAside />
      {toggleVoiceMode && (
        <div className={styles.diary__voiceToggle}>
          <div>
            {listening ? (
              <div onClick={SpeechRecognition.stopListening}>
                <img src="/images/common/mic.png" alt="mic-on" width={50} />
                <span> ctrl + alt </span>
              </div>
            ) : (
              <div onClick={listenContinuously}>
                <img
                  src="/images/common/mic-cancel.png"
                  alt="mic-off"
                  width={50}
                />
                <span> ctrl + alt </span>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedDiaryData.userDiaryData && <PopupDiary />}

      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.form__changeMode} onClick={changeModeHandler}>
          {toggleVoiceMode ? (
            <p>
              보이스모드<span> ctrl + shift</span>
            </p>
          ) : (
            <p>
              일반 모드<span> ctrl + shift</span>
            </p>
          )}
        </div>
        <div className={styles.form__inputs}>
          <div>
            <label htmlFor="date"> 날짜</label>
            <input
              type={"text"}
              id={"date"}
              value={new Date().toLocaleDateString("ko-KR")}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="title"> 제목</label>
            <input
              type={"text"}
              id={"title"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="score"> 기분점수</label>
            <input
              type="range"
              id="volume"
              min="1"
              max="9"
              step="1"
              data-action="volume"
              defaultValue={feeling}
              onChange={(e) => setFeeling(Number(e.target.value))}
            />
          </div>
          <div></div>
        </div>
        {toggleVoiceMode ? (
          <textarea
            className={styles.form__texts}
            style={{
              width: "90%",
              height: "80%",
              resize: "none",
              background: selectedDiaryData.userDiaryData
                ? "rgb(220, 220, 220)"
                : "white",
            }}
            value={content + transcript}
            readOnly={selectedDiaryData.userDiaryData ? true : false}
          ></textarea>
        ) : (
          <textarea
            className={styles.form__texts}
            style={{
              width: "90%",
              height: "80%",
              resize: "none",
              background: selectedDiaryData.userDiaryData
                ? "rgb(220, 220, 220)"
                : "white",
            }}
            onChange={(e) => changeMessage(e.target.value)}
            readOnly={selectedDiaryData.userDiaryData ? true : false}
            value={content}
          ></textarea>
        )}

        <div className={styles.form__buttons}>
          <button type="submit"> 저장</button>
          <button type="button" onClick={resetContentsHandler}>
            지우기
          </button>
        </div>
      </form>
    </div>
  );
};

export default DiaryMain;
