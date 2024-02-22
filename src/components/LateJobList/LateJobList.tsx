import styles from "components/JobList/JobList.module.scss";
import React, { useEffect, useState } from "react";
import { Button } from "@jobber/components/Button";
import JobList from "components/JobList";
import { getLateJobs } from "services";
import { ListItemProps } from "@jobber/components/dist/List/ListItem";

const LateJobList = () => {
  const [jobs, setJobs] = useState<ListItemProps[] | null>(null);
  const [isFetchingJobs, setIsFetchingJobs] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshList = async () => {
    try {
      setIsFetchingJobs(true);
      const response = await getLateJobs();
      const jobsData = response.data.data.jobs.edges.map((edge: any) => {
        const job = edge.node;
        const jobInformation = job.customFields.find(
          (field: any) => field.label === "Job Information",
        )?.valueText;
        const bidder = job.customFields.find(
          (field: any) => field.label === "Bidder",
        )?.valueText;
        // const referredBy = job.customFields.find((field: any) => field.label === 'Referred By')?.valueText;

        return {
          id: job.id,
          icon: "timer",
          iconColor: "yellow",
          content: job.title,
          value: "#" + job.jobNumber,
          caption: jobInformation,
          onClick: () => window.open(job.jobberWebUri, "_blank"),
          section: bidder ? bidder : "Unknown Bidder (please update)",
        };
      });
      setJobs(jobsData);
      setIsFetchingJobs(false);
    } catch (error) {
      setIsFetchingJobs(false);
      console.error("ERROR: " + (error as any)?.response?.data?.message);
    }
  };

  useEffect(() => {
    refreshList();
  }, [refreshKey]);

  return (
    <div className={styles.dashboardListWrap}>
      <div className={styles.dashboardListheader}>
        <h3>
          <span className={styles.colorJob}>Jobs</span>Action Required
        </h3>
        <Button
          onClick={() => setRefreshKey((oldKey) => oldKey + 1)}
          variation="subtle"
          type="tertiary"
          icon="sync"
          ariaLabel="settings"
        />
      </div>
      <div className={styles.dashboardListInnerWrap}>
        {jobs ? <JobList jobs={jobs} isFetchingJobs={isFetchingJobs} /> : null}
      </div>
    </div>
  );
};

export default LateJobList;
