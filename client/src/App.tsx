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

function App() {
  const dispatch = useAppDispatch();
  const [cookies] = useCookies(["naver_access"]);

  useEffect(() => {
    // 초기 Diary 값 DB에서 Store 로
    if (cookies.naver_access) {
      dispatch(getRequestForDiary(cookies.naver_access.response.email));
    }
  }, [cookies]);

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
