import styles from "components/JobList/JobList.module.scss";
import React, { useEffect, useState } from "react";
import { Button } from "@jobber/components/Button";
// import { Icon } from "@jobber/components/Icon";
import JobList from "components/JobList";
import { getRequiresInvoicingJobs } from "services";
import { ListItemProps } from "@jobber/components/dist/List/ListItem";

const RequiresInvoicingJobList = () => {
  const [jobs, setJobs] = useState<ListItemProps[] | null>(null);
  const [isFetchingJobs, setIsFetchingJobs] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshList = async () => {
    try {
      setIsFetchingJobs(true);

      const response = await getRequiresInvoicingJobs();
      const jobsData = response.data.data.jobs.edges.map((edge: any) => {
        const job = edge.node;
        const jobInformation = job.customFields.find(
          (field: any) => field.label === "Job Information",
        )?.valueText;
        const bidder = job.customFields.find(
          (field: any) => field.label === "Bidder",
        )?.valueText;

        return {
          id: job.id,
          icon: "invoice",
          iconColor: "red",
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
          <span className={styles.colorJob}>Jobs</span>Requires Invoicing
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

export default RequiresInvoicingJobList;
