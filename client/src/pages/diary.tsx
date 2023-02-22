import DiaryMain from "../components/diary/diary-main";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const DiaryPage = () => {
  const [cookies] = useCookies(["naver_access"]);
  const history = useHistory();

  useEffect(() => {
    if (!cookies.naver_access) {
      history.replace("/");
    }
  }, []);
  return (
    <div>
      <DiaryMain />
    </div>
  );
};
export default DiaryPage;
