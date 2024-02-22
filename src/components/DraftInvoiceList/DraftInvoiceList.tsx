import styles from "components/JobList/JobList.module.scss";
import React, { useEffect, useState } from "react";
import { Button } from "@jobber/components/Button";
import JobList from "components/JobList";
import { getDraftInvoices } from "services";
import { ListItemProps } from "@jobber/components/dist/List/ListItem";

const DraftInvoiceList = () => {
  const [invoices, setJobs] = useState<ListItemProps[] | null>(null);
  const [isFetchingJobs, setIsFetchingJobs] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshList = async () => {
    try {
      setIsFetchingJobs(true);
      const response = await getDraftInvoices();
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
  };

  useEffect(() => {
    refreshList();
  }, [refreshKey]);

  return (
    <div className={styles.dashboardListWrap}>
      <div className={styles.dashboardListheader}>
        <h3>
          <span className={styles.colorInvoice}>Invoices</span>Drafted, Unsent
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
        {invoices ? (
          <JobList jobs={invoices} isFetchingJobs={isFetchingJobs} />
        ) : null}
      </div>
    </div>
  );
};

export default DraftInvoiceList;
