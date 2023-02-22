import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/homepage";
import DiaryPage from "./pages/diary";
import DiaryCalendarPage from "./pages/diary-calendar";
import DiaryGraphPage from "./pages/diary-graph";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import {
  useAppDispatch,
  getRequest as getRequestForDiary,
} from "./store/user-diary-action";
import { useSelector } from "react-redux";
import { RootState } from "./store";

let initial = true;

function App() {
  const dummyuUserEmail = "mms@ms.com"; // 추후 OAuth 로 변경
  const dispatch = useAppDispatch();
  const userDiaryData = useSelector(
    (state: RootState) => state.userDiary.userDiaryData
  );
  const [cookies] = useCookies(["naver_access"]);

  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }
    dispatch(getRequestForDiary(dummyuUserEmail));
  }, []);

  console.log(cookies);

  return (
    <div className="App">
      <Switch>
        <Route path={"/"} exact>
          <HomePage />
        </Route>
        <Route path={"/diary"} exact>
          <DiaryPage />
        </Route>
        <Route path={"/diary-calendar"} exact>
          <DiaryCalendarPage />
        </Route>
        <Route path={"/diary-graph"} exact>
          <DiaryGraphPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
