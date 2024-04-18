// import { Page } from "@jobber/components/Page";
// import { Content } from "@jobber/components/Content";
import styles from "./Dashboard.module.scss";
import jobListStyles from "components/JobList/JobList.module.scss";
import React, { useState, useEffect, useRef } from "react";
import RequiresInvoicingJobList from "components/RequiresInvoicingJobList";
import LateJobList from "components/LateJobList";
import ActionRequiredJobList from "components/ActionRequiredJobList";
import ApprovedQuoteList from "components/ApprovedQuoteList";
import DraftInvoiceList from "components/DraftInvoiceList";
import { getLateJobs } from "services";
import { useNavigate } from "react-router-dom";
import style from "styled-components";

// import ActionRequiredJobList from 'components/ActionRequiredJobList';

const Validator = style.div`
  .listContainer {
    
    .hideme {
      background: transparent;
      color: white;
      height: 36px;
      padding: 0;
      font-size: 0;
      display: inline-block;
      border: none;
    }
  }
  // input, button { padding: 10px; font-size: 16px; margin: 5px; }
  .input-wrap {
    display: flex;
    flex-direction: column;

    input {
      border: 2px solid #efefef;
      border-radius: 5px;
      padding: 10px;
      margin: 10px;
      font-size: 16px;
    }
    button {
      display: inline;
      padding: 10px;
      margin-right: 10px;
      border: none;
      border-radius: 5px;
      font-size: 14px;
      background-color: #007bff;
      color: white;
      font-weight: bold;
      text-shadow: 0px 0px 4px rgba(255,255,255,0.4);
      align-self: flex-end;
      line-height: 1;
    }
  }
  #validatorResult {
    padding: 10px;
    font-family: 'Arial', sans-serif !important;
    font-size: 14px;

    &.valid { color: green; }
    &.invalid { color: red; }
    &.invalid span {color: black; font-weight: bold;}

    span { font-weight: bold;}
  }
  .note {
    padding: 10px;
    font-family: 'Arial', sans-serif !important;

    font-size: 12px;
    font-weight: normal;
    a { 
      color: #007bff; 
      font-weight: bold;
    }
  }
`;


const Dashboard = () => {
  const [jobsData, setJobs] = useState([]);
  const [isFetchingJobs, setIsFetchingJobs] = useState(false);
  const navigate = useNavigate();
  const validatorInputRef= useRef<HTMLInputElement>(null);
  const validatorResultRef = useRef<HTMLParagraphElement>(null);

  const validateTitle = () => {
    const inputElement = validatorInputRef.current;
    const resultElement = validatorResultRef.current;
  
    if (!inputElement || !resultElement) {
      console.error('Cannot find required elements');
      return;
    }
  
    const input = inputElement.value;
    const regex = /^(.+?) (-[A-Z]+-) (.+?) - (.+)$/;
    const match = input.match(regex);
  
    if (!match) {
      resultElement.innerHTML = 'Error: Title format is incorrect. Please ensure each part is separated properly. Correct pattern: <br><span>Name -GeoCode- Address - WorkCode</span>';
      resultElement.className = 'invalid';
      return;
    }
  
    const name = match[1];
    const geoCode = match[2];
    const address = match[3];
    const workCode = match[4].split(', ');
  
    const nameRegex = /^[^\s-]+$/;
    const geoCodeRegex = /^-[A-Z]+-$/;
    const addressRegex = /^[^\s-][^-\n]*[^\s-]$/;
    const workCodeRegex = /^(\d+([CPRSFG\*\+]|LO)(\/(\d+([CPRSFG\*\+]|LO)))*\s+\d+(\.\d+)?[dh])(, \d+([CPSFG\*\+]|LO)(\/(\d+([CPSFG\*\+]|LO)))*\s+\d+(\.\d+)?[dh])*$/;

    let message = '';

    if (!nameRegex.test(name)) {
        message = 'Invalid name: Name should not contain spaces or dashes.';
        resultElement.className = 'invalid';
    } else if (!geoCodeRegex.test(geoCode)) {
        message = 'Invalid GeoCode: GeoCode must be uppercase letters enclosed by dashes.';
        resultElement.className = 'invalid';
    } else if (!addressRegex.test(address)) {
        message = 'Invalid address: Address must not start or end with a space or dash.';
        resultElement.className = 'invalid';
    } else if (!workCode.every(code => workCodeRegex.test(code))) {
        message = 'Invalid WorkCode: Each WorkCode must follow the specified pattern with correct role and duration formatting.';
        resultElement.className = 'invalid';
    } else {
        // We're mostly valid at this point  

        // Check for specific WorkCode conditions and Name suggestions
        if (workCode.some(code => code.includes('R')) && !name.startsWith('🔻')) {
            message = 'That\'s a valid title format, but since you have a remover assigned, please add 🔻 to the beginning of your title.<br>';
        } else if (workCode.some(code => code.includes('LO')) && !name.startsWith('⚠️')) {
            message += 'That\'s a valid title format, but since you have a Lift Operator assigned, please add ⚠️ to the beginning of your title.<br>';
        } else if (workCode.some(code => code.includes('S')) && !name.startsWith('✂️')) {
            message += 'That\'s a valid title format, but since you have a Lift Operator assigned, please add ✂️ to the beginning of your title.<br>';
        } else {
            message = '<b>That\'s a valid title format!</b>🌟<br>Thanks for using the validator!';
        }
        
    }
    resultElement.innerHTML = message;
    resultElement.className = message.includes('Invalid') ? 'invalid' : 'valid';
    // working, former: 
    // const nameRegex = /^[^\s-]+$/;
    // const geoCodeRegex = /^-[A-Z]+-$/;
    // const addressRegex = /^[^\s-][^-\n]*[^\s-]$/;
    // const workCodeRegex = /^(\d+[CPSLOFGR\*\+](\/\d+[CPSLOFGR\*\+])*\s+\d+(\.\d+)?[dh])(, \d+[CPSLOFGR\*\+](\/\d+[CPSLOFGR\*\+])*\s+\d+(\.\d+)?[dh])*$/;    
  
    // if (!nameRegex.test(name)) {
    //   resultElement.innerHTML = 'Name should not contain spaces or dashes.';
    //   resultElement.className = 'invalid';
    // } else if (!geoCodeRegex.test(geoCode)) {
    //   resultElement.innerHTML = 'GeoCode must be uppercase letters enclosed by dashes.';
    //   resultElement.className = 'invalid';
    // } else if (!addressRegex.test(address)) {
    //   resultElement.innerHTML = 'Address must not start or end with a dash.';
    //   resultElement.className = 'invalid';
    // } else if (!workCode.every(code => workCodeRegex.test(code))) {
    //   resultElement.innerHTML = 'Check your WorkCode. Correct pattern: <br><span>1C/1P 8h</span> or <span>1C/1P 8h, 1G 4h</span>';
    //   resultElement.className = 'invalid';
    // } else {
    //   resultElement.innerHTML = '<b>That\'s a valid title format!</b>🌟<br>Thanks for using the validator!';
    //   resultElement.className = 'valid';
    // }
  };
  
  useEffect(() => {
    (async () => {
      try {
        setIsFetchingJobs(true);
        const { data } = await getLateJobs();
        setJobs(jobsData);
        setIsFetchingJobs(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setIsFetchingJobs(false);
        navigate("/auth");
      }
    })();
  }, []);

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

        <div className={styles.columnContainer}>
          <Validator>
            <div className={jobListStyles.dashboardListWrap}>
              <div className={`listContainer ${jobListStyles.dashboardListheader}`}>                <h3>
                  <span className={jobListStyles.colorJob}>Job Visit</span> Title Syntax Validator
                </h3>
                <button className="hideme">&</button>
              </div>
              <div className={jobListStyles.dashboardListInnerWrap}>
                <div className="input-wrap">
                  <input type="text" ref={validatorInputRef} placeholder="eg: Smith -S- 123 E Main - 1C/1G 1d" />
                  <button onClick={()=>{validateTitle()}}>Check Title</button>
                </div>
                <div id="validatorResult" className="" ref={validatorResultRef}></div>
                <span className="note"><a href="https://spiritpruners.craft.me/visit-title-syntax">Here are the instructions again</a> if you're struggling🙂</span>
              </div>
            </div>
          </Validator>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
