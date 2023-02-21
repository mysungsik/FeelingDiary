import styles from "./popup-diary.module.scss";

const PopupDiary = () => {
  // 캘린더에서 클릭하면
  // 작은 다이어리를 보이게 한다.
  // 캘린더에서 해당 id를 가진 다이어리를 클릭하면
  // 해당 값을selected diary 라는 store 를 통해 생성하자.

  // 이후 popupCalendar 에 값을 넣으면
  // 팝업 캘린더가 나오도록 하게하자

  return (
    <div>
      <div className={styles.popup}>
        <div className={styles.popup__background}> </div>
        <div className={styles.popup__main}>
          <h1> 타이틀</h1>
          <p> 기분상태</p>
          <p> 텍스트</p>
        </div>
      </div>
    </div>
  );
};

export default PopupDiary;
