import React, { useEffect, useState } from "react";
import JobList from "components/JobList";
import { getApprovedQuotes } from "services";
import { ListItemProps } from "@jobber/components/dist/List/ListItem";

const QuoteApprovedJobList = () => {
  const [jobs, setJobs] = useState<ListItemProps[] | null>(null);
  const [isFetchingJobs, setIsFetchingJobs] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsFetchingJobs(true);
        const response = await getApprovedQuotes();
        const quotesData = response.data.data.quotes.edges.map((edge: any) => {
          const quote = edge.node;
          const bidder = quote.customFields.find(
            (field: any) => field.label === "Bidder",
          )?.valueText;
          const quoteInformation =
            quote.client.firstName + " " + quote.client.lastName;

          return {
            id: quote.id,
            icon: "quote",
            iconColor: "rgb(179, 96, 150)",
            content: quote.title,
            value: "$" + quote.amounts.subtotal,
            caption: quoteInformation,
            onClick: () => window.open(quote.jobberWebUri, "_blank"),
            section: bidder ? bidder : "Unknown Bidder (please update)",
          };
        });
        setJobs(quotesData);
        setIsFetchingJobs(false);
      } catch (error) {
        setIsFetchingJobs(false);
        console.error("ERROR: " + error);
      }
    })();
  }, []);

  return jobs ? <JobList jobs={jobs} isFetchingJobs={isFetchingJobs} /> : null;
};

export default QuoteApprovedJobList;
