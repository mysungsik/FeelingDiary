import styles from "./popup-diary.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { selectedDiaryAction } from "../../store/selected-diary-slice";
import { userDiaryAction } from "../../store/user-diary-slice";
import { RootState } from "../../store";
import { deleteUserDiary } from "../../api/user-diary";

const PopupDiary = () => {
  const selectedDiary = useSelector(
    (state: RootState) => state.selectedDiary.userDiaryData
  );

  const dispatch = useDispatch();

  const closeModalHandler = () => {
    dispatch(selectedDiaryAction.unSelectDiary());
  };

  const deleteHandler = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(selectedDiaryAction.unSelectDiary()); // selected Diary 데이터 삭제
      deleteUserDiary(String(selectedDiary!._id)); // DB 에서 삭제
      dispatch(userDiaryAction.deleteUserDiary(String(selectedDiary!._id))); // userDiary 에서 삭제
    } else {
      console.log("아니오");
    }
  };
  return (
    <div>
      <div className={styles.popup}>
        <div className={styles.popup__background}> </div>
        <div className={styles.popup__main}>
          <h1> {selectedDiary?.diaryTitle}</h1>
          <p> {selectedDiary?.feeling}</p>
          <p> {selectedDiary?.diaryContent}</p>
          <button onClick={closeModalHandler}>닫기</button>
          <button onClick={deleteHandler}>삭제</button>
        </div>
      </div>
    </div>
  );
};

export default PopupDiary;
