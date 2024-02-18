// import { Page } from "@jobber/components/Page";
// import { Content } from "@jobber/components/Content";
import styles from "./Dashboard.module.scss";
import { Text } from "@jobber/components/Text";
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
      {/* <h2>Dashboard</h2> */}

      <div className={styles.listsContainer}>
        <div className={styles.columnContainer}>
          <h3>
            <span className={styles.colorJob}>Jobs</span>Requires Invoicing
          </h3>
          <div className={styles.listWrapper}>
            <RequiresInvoicingJobList />
          </div>
        </div>

        <div className={styles.columnContainer}>
          <h3>
            <span className={styles.colorJob}>Jobs</span>Action Required
          </h3>
          <div className={styles.listWrapper}>
            <ActionRequiredJobList />
          </div>
        </div>

        <div className={styles.columnContainer}>
          <h3>
            <span className={styles.colorJob}>Jobs</span>Late
          </h3>
          <div className={styles.listWrapper}>
            <LateJobList />
          </div>
        </div>

        <div className={styles.columnContainer}>
          <h3>
            <span className={styles.colorQuote}>Quotes</span>Approved
          </h3>
          <div className={styles.listWrapper}>
            <ApprovedQuoteList />
          </div>
        </div>

        <div className={styles.columnContainer}>
          <h3>
            <span className={styles.colorInvoice}>Invoices</span>Drafted, Unsent
          </h3>
          <div className={styles.listWrapper}>
            <DraftInvoiceList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
