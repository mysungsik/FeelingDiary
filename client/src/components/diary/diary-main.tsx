import DiaryAside from "./diary-aside";
import styles from "./diary-main.module.scss";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState, useEffect, FormEvent } from "react";

const DiaryMain = () => {
  const dummyuUserEmail = "mms@ms.com"; // 추후 OAuth 로 변경
  const [toggleVoiceMode, setToggleVoiceMode] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [feeling, setFeeling] = useState<number>(5);

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

  useEffect(() => {
    setContent((prev) => prev + transcript);
    resetTranscript();
  }, [toggleVoiceMode]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  // 키보드로 모드 변경
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
      changeMode();
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
  const changeMode = () => {
    setToggleVoiceMode((prev) => !prev);
  };

  // 리셋 핸들러
  const resetContents = () => {
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

    const response = await fetch(`http://localhost:5000/api/diary/insert`, {
      method: "POST",
      body: JSON.stringify({
        userEmail: dummyuUserEmail,
        diaryTitle: title,
        diaryContent: toggleVoiceMode ? content + transcript : content,
        feeling: feeling,
        date: new Date().toLocaleDateString("ko-KR"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.message === "success") {
      resetContents();
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

      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.form__changeMode} onClick={changeMode}>
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
            style={{ width: "90%", height: "80%", resize: "none" }}
            value={content + transcript}
          ></textarea>
        ) : (
          <textarea
            className={styles.form__texts}
            style={{ width: "90%", height: "80%", resize: "none" }}
            onChange={(e) => changeMessage(e.target.value)}
            value={content}
          ></textarea>
        )}

        <div className={styles.form__buttons}>
          <button type="submit"> 저장</button>
          <button type="button" onClick={resetContents}>
            지우기
          </button>
        </div>
      </form>
    </div>
  );
};

export default DiaryMain;
