import styles from "./diary-aside.module.scss";
import { useSelector } from "react-redux/es/exports";
import { RootState } from "../../store";

const DiaryAside = () => {
  const userDiaryData = useSelector(
    (state: RootState) => state.userDiary.userDiaryData
  );
  return (
    <aside className={styles.side}>
      <h3 className={styles.side__title}>나의 기록</h3>
      <ul className={styles.side__ul}>
        {userDiaryData.map((diary) => (
          <li key={diary._id}>
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
