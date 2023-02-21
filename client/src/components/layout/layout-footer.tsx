import styles from "./Layout-footer.module.scss";
import { Link, useHistory } from "react-router-dom";

const LayoutFooter = () => {
  const history = useHistory();
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__logo}>
        <h3>로고이미지 삽입</h3>
        <p> P & D</p>
      </div>
      <div className={styles.footer__aboutme}>
        <ul>
          <li>
            <Link to={"/"}>a</Link>
          </li>
          <li>
            <Link to={"/"}>a</Link>
          </li>
          <li>
            <Link to={"/"}>a</Link>
          </li>
        </ul>
      </div>
      <div className={styles.footer__aboutsite}>
        <ul>
          <li
            onClick={() => {
              history.push("/");
            }}
          >
            페이지이동
          </li>
          <li
            onClick={() => {
              history.push("/");
            }}
          >
            페이지이동
          </li>
        </ul>
      </div>
      <hr />
      <div className={styles.footer__copy}>
        <p> COPYRIGHT © 회사이름 ALL RIGHTS RESERVED. </p>
      </div>
    </footer>
  );
};
export default LayoutFooter;
