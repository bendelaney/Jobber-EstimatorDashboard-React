// import { Page } from "@jobber/components/Page";
// import { Content } from "@jobber/components/Content";
import styles from "./Dashboard.module.scss";
import React, { useState, useEffect } from "react";
import RequiresInvoicingJobList from "components/RequiresInvoicingJobList";
import LateJobList from "components/LateJobList";
import ActionRequiredJobList from "components/ActionRequiredJobList";
import ApprovedQuoteList from "components/ApprovedQuoteList";
import DraftInvoiceList from "components/DraftInvoiceList";
// import ActionRequiredJobList from 'components/ActionRequiredJobList';

const Dashboard = () => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.listsContainer}>
        <div className={styles.columnContainer}>
          <RequiresInvoicingJobList />
        </div>

        <div className={styles.columnContainer}>
          <ActionRequiredJobList />
        </div>

        <div className={styles.columnContainer}>
          <LateJobList />
        </div>

        <div className={styles.columnContainer}>
          <ApprovedQuoteList />
        </div>

        <div className={styles.columnContainer}>
          <DraftInvoiceList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
