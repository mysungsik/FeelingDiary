import styles from "./layout-aside.module.scss";
import { Link } from "react-router-dom";

const LayoutAside = () => {
  return (
    <aside className={styles.layoutAside}>
      <ul className={styles.layoutAside__ul}>
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
    </aside>
  );
};
export default LayoutAside;
