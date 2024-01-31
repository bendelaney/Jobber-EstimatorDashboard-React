// import { Page } from "@jobber/components/Page";
// import { Content } from "@jobber/components/Content";
import styles from "./Dashboard.module.scss";
import { Text } from "@jobber/components/Text";
import React, { useState, useEffect } from "react";
import RequiresInvoiceJobList from "components/RequiresInvoiceJobList";
import LateJobList from "components/LateJobList";
import ActionRequiredJobList from "components/ActionRequiredJobList";
import QuoteApprovedJobList from "components/QuoteApprovedJobList";
import InvoiceDraftedJobList from "components/InvoiceDraftedJobList";
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
            <RequiresInvoiceJobList />
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
      </div>

      <div className={styles.listsContainer}>
        <div className={styles.columnContainer}>
          <h3>
            <span className={styles.colorQuote}>Quotes</span>Approved
          </h3>
          <div className={styles.listWrapper}>
            <QuoteApprovedJobList />
          </div>
        </div>
        <div className={styles.columnContainer}>
          <h3>
            <span className={styles.colorInvoice}>Invoices</span>Drafted, Unsent
          </h3>
          <div className={styles.listWrapper}>
            <InvoiceDraftedJobList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
