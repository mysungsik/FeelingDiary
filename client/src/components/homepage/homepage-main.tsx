import "animate.css";
import styles from "./homepage-main.module.scss";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const HomePageMain = () => {
  const [bounce, setBounce] = useState<boolean>(false);
  const history = useHistory();
  let bouncStyle = `${styles.diary__lock} ${
    bounce ? "animate__animated animate__jello" : ""
  }`;

  return (
    <div className={styles.homepage}>
      <div className={styles.diary}>
        <div className={styles.diary__left}> </div>
      </div>
      <div
        className={bouncStyle}
        onClick={() => history.push("/diary")}
        onMouseOver={() => setBounce(true)}
        onMouseLeave={() => setBounce(false)}
      >
        <p>자물쇠</p>
      </div>
      <div className={styles.diary}>
        <div className={styles.diary__right}></div>
      </div>
    </div>
  );
};

export default HomePageMain;
