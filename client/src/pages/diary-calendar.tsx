import DiaryCalendar from "../components/diary-calendar/calendar";
import PopupDiary from "../components/modal/popup-diary";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { modifyToCalendar } from "../util/modify-datas";
import { useDispatch } from "react-redux";
import { selectedDiaryAction } from "../store/selected-diary-slice";

const DiaryCalendarPage = () => {
  const [selectedId, setSelectedId] = useState("");
  const diaryData = useSelector(
    (state: RootState) => state.userDiary.userDiaryData
  );
  const selectedDiaryData = useSelector(
    (state: RootState) => state.selectedDiary.userDiaryData
  );
  const calendarData = modifyToCalendar(diaryData);
  const dispatch = useDispatch();

  useEffect(() => {
    selectDiary();
  }, [selectedId]);

  const getSelectedId = (id: string) => {
    setSelectedId(id);
  };
  
  const selectDiary = () => {
    const selectedDiary = diaryData.find((diary) => diary._id === selectedId);
    dispatch(selectedDiaryAction.selectDiary(selectedDiary));
  };

  return (
    <>
      <DiaryCalendar
        calendarData={calendarData}
        getSelectedId={getSelectedId}
      />
      {selectedDiaryData && <PopupDiary />}
    </>
  );
};

export default DiaryCalendarPage;
