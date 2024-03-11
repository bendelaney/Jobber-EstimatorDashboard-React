import React, { useState, useEffect } from "react";
import styles from "./SchedulePad.module.scss";
import { useNavigate } from "react-router-dom";
import AppFrame from "components/AppFrame";

const SchedulePad = () => {
//   const [jobsData, setJobs] = useState([]);
//   const [isFetchingJobs, setIsFetchingJobs] = useState(false);

  const navigate = useNavigate();

// INITIAL FETCH OF DATA FROM API GOES HERE:

//   useEffect(() => {
//     (async () => {
//       try {
//         setIsFetchingJobs(true);
//         const { data } = await getLateJobs();
//         setJobs(jobsData);
//         setIsFetchingJobs(false);
//       } catch (error) {
//         console.error("Error fetching jobs:", error);
//         setIsFetchingJobs(false);
//         navigate("/auth");
//       }
//     })();
//   }, []);

  return (
    <AppFrame></AppFrame>
);
};

export default SchedulePad;
