import styles from "./layout-header.module.scss";
import { CSSTransition } from "react-transition-group";
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

const LayoutHeader = () => {
  const [diaryDropdown, setDiaryDropdown] = useState<boolean>(false);
  const [todoDropdown, setTodoDropdown] = useState<boolean>(false);
  const nodeRef = useRef(null);
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies(["naver_access"]);

  const toggleDiaryMenu = () => {
    setDiaryDropdown((prev) => !prev);
    setTodoDropdown(false);
  };
  const toggleTodoMenu = () => {
    setTodoDropdown((prev) => !prev);
    setDiaryDropdown(false);
  };

  const loginHandler = () => {
    const naverLoginURL = "http://localhost:5000/api/oauth/naver";
    window.location.href = naverLoginURL;
  };
  const logoutHandler = () => {
    removeCookie("naver_access");
    history.replace("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__logo} onClick={() => history.push("/")}>
        <h3>로고이미지 삽입</h3>
        <p>다이어리</p>
      </div>
      <div className={styles.header__menus}>
        <div className={styles.header__menus__users}>
          {cookies.naver_access ? (
            <p onClick={logoutHandler}>로그아웃</p>
          ) : (
            <p onClick={loginHandler}>로그인</p>
          )}
        </div>
        <div className={styles.header__menus__menulist}>
          <ul>
            <li>
              <div onClick={() => toggleDiaryMenu()}>
                다이어리
                {diaryDropdown ? (
                  <span> &#11165;</span>
                ) : (
                  <span> &#11167;</span>
                )}
              </div>
              <CSSTransition
                in={diaryDropdown}
                timeout={200}
                nodeRef={nodeRef}
                classNames={"slide-top-to-bottom"}
                mountOnEnter
                unmountOnExit
              >
                <ul className={styles.dropdown}>
                  <li
                    onClick={() => {
                      history.push("/diary");
                      setDiaryDropdown(false);
                    }}
                  >
                    쓰기
                  </li>
                  <li
                    onClick={() => {
                      history.push("/diary-calendar");
                      setDiaryDropdown(false);
                    }}
                  >
                    캘린더
                  </li>
                  <li
                    onClick={() => {
                      history.push("/diary-graph");
                      setDiaryDropdown(false);
                    }}
                  >
                    그래프
                  </li>
                </ul>
              </CSSTransition>
            </li>
            <li>
              <div onClick={toggleTodoMenu}>
                메뉴2번
                {todoDropdown ? <span> &#11165;</span> : <span> &#11167;</span>}
              </div>
              <CSSTransition
                in={todoDropdown}
                timeout={200}
                nodeRef={nodeRef}
                classNames={"slide-top-to-bottom"}
                mountOnEnter
                unmountOnExit
              >
                <ul className={styles.dropdown}>
                  <li
                    onClick={() => {
                      history.push("/");
                      setTodoDropdown(false);
                    }}
                  >
                    페이지1
                  </li>
                  <li
                    onClick={() => {
                      history.push("/");
                      setTodoDropdown(false);
                    }}
                  >
                    페이지2
                  </li>
                </ul>
              </CSSTransition>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default LayoutHeader;
