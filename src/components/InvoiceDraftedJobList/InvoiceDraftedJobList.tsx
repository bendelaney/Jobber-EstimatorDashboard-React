import React, { useEffect, useState } from "react";
import JobList from "components/JobList";
import { getInvoiceDraftedJobs } from "services";
import { ListItemProps } from "@jobber/components/dist/List/ListItem";

const InvoiceDraftedJobList = () => {
  const [invoices, setJobs] = useState<ListItemProps[] | null>(null);
  const [isFetchingJobs, setIsFetchingJobs] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsFetchingJobs(true);
        const response = await getInvoiceDraftedJobs();
        const jobsData = response.data.data.invoices.edges.map((edge: any) => {
          const invoice = edge.node;
          const bidder = invoice.customFields.find(
            (field: any) => field.label === "Bidder",
          )?.valueText;
          const dateString = new Date(invoice.createdAt).toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
            },
          );
          const invoiceInformation = "drafted: " + dateString;

          return {
            id: invoice.id,
            icon: "invoice",
            iconColor: "red",
            content: invoice.client.firstName + " " + invoice.client.lastName,
            value: "$" + invoice.amounts.total,
            caption: invoiceInformation,
            onClick: () => window.open(invoice.jobberWebUri, "_blank"),
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

  return invoices ? (
    <JobList jobs={invoices} isFetchingJobs={isFetchingJobs} />
  ) : null;
};

export default InvoiceDraftedJobList;
