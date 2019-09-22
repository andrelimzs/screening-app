import React, { Component, Fragment } from 'react';

export const geriCognitiveFollowUp = (info) => {    
    return <Fragment>
        <h2>AMT Responses</h2>
        1) What is the year? <br />
        <b>{typeof(info['Geri - AMT']) !== "undefined" && 
        info['Geri - AMT'].geriAmtQ1}<br /><br /></b>
        2) About what time is it? (within 1 hour) <br />
        <b>{typeof(info['Geri - AMT']) !== "undefined" && 
        info['Geri - AMT'].geriAmtQ2}<br /><br /></b>
        3) What is your age? <br />
        <b>{typeof(info['Geri - AMT']) !== "undefined" && 
        info['Geri - AMT'].geriAmtQ3}<br /><br /></b>
        4) What is your date of birth? <br />
        <b>{typeof(info['Geri - AMT']) !== "undefined" && 
        info['Geri - AMT'].geriAmtQ4}<br /><br /></b>
        5) What is your home address?<br />
        <b>{typeof(info['Geri - AMT']) !== "undefined" && 
        info['Geri - AMT'].geriAmtQ5}<br /><br /></b>
        6) Where are we now? (The name of building or the nature of the building e.g. hospital, day centre etc)<br />
        <b>{typeof(info['Geri - AMT']) !== "undefined" && 
        info['Geri - AMT'].geriAmtQ6}<br /><br /></b>
        7) Who is our country’s Prime Minister?<br />
        <b>{typeof(info['Geri - AMT']) !== "undefined" && 
        info['Geri - AMT'].geriAmtQ7}<br /><br /></b>
        8) What is his/her job? (show picture)<br />
        <b>{typeof(info['Geri - AMT']) !== "undefined" && 
        info['Geri - AMT'].geriAmtQ8}<br /><br /></b>
        9) Count backwards from 20 to 1.<br />
        <b>{typeof(info['Geri - AMT']) !== "undefined" && 
        info['Geri - AMT'].geriAmtQ9}<br /><br /></b>
        10) Recall memory phase<br />
        <b>{typeof(info['Geri - AMT']) !== "undefined" && 
        info['Geri - AMT'].geriAmtQ10}<br /><br /></b>
        AMT Total Score: 
        <b>{typeof(info['Geri - AMT']) !== "undefined" && 
        info['Geri - AMT'].geriAmtQ11}<br /><br /></b>
        What is your education level? <br />
        <b>{typeof(info['Geri - AMT']) !== "undefined" && 
        info['Geri - AMT'].geriAmtQ12}<br /><br /></b>
    </Fragment>
}