import React, { useEffect, useState } from "react";
import JobList from "../JobList";
import { getActionRequiredJobs } from "services";
import { ListItemProps } from "@jobber/components/dist/List/ListItem";

const ActionRequiredJobList = () => {
  const [jobs, setJobs] = useState<ListItemProps[] | null>(null);
  const [isFetchingJobs, setIsFetchingJobs] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsFetchingJobs(true);
        const response = await getActionRequiredJobs();
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
            icon: "job",
            iconColor: "orange",
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
    })();
  }, []);

  return jobs ? <JobList jobs={jobs} isFetchingJobs={isFetchingJobs} /> : null;
};

export default ActionRequiredJobList;
