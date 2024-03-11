import { FC } from "react";
import { Outlet } from "react-router-dom";
import styles from "./AppFrame.module.scss";
import TopBar from "./TopBar";

type JobberAppFrameProps = {
  logo: string;
};

const AppFrame: FC = () => {
  return (
    <div className={styles.JobberAppFrame}>
      <TopBar />
      <div className={styles.scrollWrapper}>
        <div className={styles.centerWrapper}>
          <div className={styles.content}>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AppFrame;
