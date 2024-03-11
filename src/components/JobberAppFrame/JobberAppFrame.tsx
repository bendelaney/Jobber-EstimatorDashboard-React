import { FC } from "react";
import { Outlet } from "react-router-dom";
import styles from "./JobberAppFrame.module.scss";
import Footer from "./Footer";
import AppLogo from "./AppLogo";
import TopBar from "./TopBar";

type JobberAppFrameProps = {
  logo: string;
};

const JobberAppFrame: FC<JobberAppFrameProps> = ({ logo }) => {
  return (
    <div className={styles.JobberAppFrame}>
      <TopBar />
      <div className={styles.scrollWrapper}>
        <div className={styles.centerWrapper}>
          {/* <AppLogo logo={logo} /> */}
          <div className={styles.content}>{<Outlet />}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default JobberAppFrame;
