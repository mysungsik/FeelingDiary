import styles from "./diary-aside.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { selectedDiaryAction } from "../../store/selected-diary-slice";
import { TypeUserDiary } from "../../store/user-diary-slice";

const DiaryAside = () => {
  const userDiaryData = useSelector(
    (state: RootState) => state.userDiary.userDiaryData
  );

  const dispatch = useDispatch();

  const selectedDiaryHandler = (diary: TypeUserDiary) => {
    dispatch(selectedDiaryAction.selectDiary(diary));
  };

  return (
    <aside className={styles.side}>
      <h3 className={styles.side__title}>나의 기록</h3>
      <ul className={styles.side__ul}>
        {userDiaryData.map((diary) => (
          <li
            key={diary._id}
            onClick={() =>
              selectedDiaryHandler({
                _id: diary._id,
                diaryContent: diary.diaryContent,
                diaryTitle: diary.diaryTitle,
                userEmail: diary.userEmail,
                feeling: diary.feeling,
                date: diary.date,
              })
            }
          >
            <p>{new Date(diary.date).getFullYear()}</p>
            <p>{diary.diaryTitle}</p>
            <p>{diary.feeling}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default DiaryAside;
