import React, { Component, Fragment } from 'react';

export const oralScreening = (info) => {    
    return <Fragment>       
        <h2>Reason for referral from Doctor's Consult</h2>
        <b>{typeof(info['Doctor\'s Consult']) !== "undefined" &&
            typeof(info['Doctor\'s Consult']).doctorSConsultQ9 !== "undefined" &&
            info['Doctor\'s Consult'].doctorSConsultQ9.split('\n').map( text => {
                return <p>{text}<br/></p>
            })}</b><br /><br />

    <h2>Health Concerns</h2>
        Brief History <br/>
        <b>{typeof(info['Hx HCSR']) !== "undefined" &&
            typeof(info['Hx HCSR'].hxHcsrQ2) !== "undefined" &&
            info['Hx HCSR'].hxHcsrQ2.split('\n').map( text => {
                return <p>{text}<br/></p>
            })}</b><br /><br />
        Red Flags <br/>
        <b>{typeof(info['Hx HCSR']) !== "undefined" &&
            typeof(info['Hx HCSR'].hxHcsrQ3) !== "undefined" &&
            info['Hx HCSR'].hxHcsrQ3.split('\n').map( text => {
                return <p>{text}<br/></p>
            })}</b><br /><br />
        Do you have any problems passing urine or motion? <br/>
        <b>{typeof(info['Hx HCSR']) !== "undefined" &&
            info['Hx HCSR'].hxHcsrQ4}<br />
            {typeof(info['Hx HCSR']) !== "undefined" &&
            typeof(info['Hx HCSR'].hxHcsrQ5) !== "undefined" &&
            info['Hx HCSR'].hxHcsrQ5.split('\n').map( text => {
                return <p>{text}<br/></p>
            })}</b><br /><br />

        <h2>NSS</h2>
        Reported Conditions <br/>
        <b>{typeof(info['Hx NSS']) !== "undefined" &&
            typeof(info['Hx NSS'].hxNssQ1) !== "undefined" &&
            info['Hx NSS'].hxNssQ1.map( text => {
                return <p>{text}<br/></p>
            })}</b><br /><br />
        Any follow up with doctor for existing conditions? <br/>
        <b>{typeof(info['Hx NSS']) !== "undefined" &&
            info['Hx NSS'].hxNssQ2}<br />
            {typeof(info['Hx NSS']) !== "undefined" &&
            typeof(info['Hx NSS'].hxNssQ3) !== "undefined" &&
            info['Hx NSS'].hxNssQ3}
            </b><br /><br />

        {
            typeof(info['Hx NSS']) !== "undefined" &&
            info['Hx NSS'].hxNssQ5 !== "Not Applicable" &&
            <Fragment>
                Prescibed medication for hypertension?  <br/>
                <b>{info['Hx NSS'].hxNssQ5}</b><br /><br />
            </Fragment>
        }
        {
            typeof(info['Hx NSS']) !== "undefined" &&
            info['Hx NSS'].hxNssQ6 !== "Not Applicable" &&
            <Fragment>
                Prescibed medication for Diabetes?  <br/>
                <b>{info['Hx NSS'].hxNssQ6}</b><br /><br />
            </Fragment>
        }
        {
            typeof(info['Hx NSS']) !== "undefined" &&
            info['Hx NSS'].hxNssQ7 !== "Not Applicable" &&
            <Fragment>
                Prescibed medication for High Cholesterol?  <br/>
                <b>{info['Hx NSS'].hxNssQ7}</b><br /><br />
            </Fragment>
        }
        {
            typeof(info['Hx NSS']) !== "undefined" &&
            info['Hx NSS'].hxNssQ8 !== "Not Applicable" &&
            <Fragment>
                Prescibed medication for Stroke?  <br/>
                <b>{info['Hx NSS'].hxNssQ8}</b><br /><br />
            </Fragment>
        }

        Is participant on any other medication?<br/>
        <b>{typeof(info['Hx NSS']) !== "undefined" &&
            info['Hx NSS'].hxNssQ9}<br />
            {typeof(info['Hx NSS']) !== "undefined" &&
            typeof(info['Hx NSS'].hxNssQ10) !== "undefined" &&
            info['Hx NSS'].hxNssQ10.split('\n').map( text => {
                return <p>{text}<br/></p>
            })}</b><br /><br />
        
        Is participant flagged to be seen by doctor based on their medical history?<br/>
        <b>{typeof(info['Hx NSS']) !== "undefined" &&
            info['Hx NSS'].hxNssQ11}<br />
            {typeof(info['Hx NSS']) !== "undefined" &&
            typeof(info['Hx NSS'].hxNssQ12) !== "undefined" &&
            info['Hx NSS'].hxNssQ12.split('\n').map( text => {
                return <p>{text}<br/></p>
            })}</b><br /><br />

        Do you smoke? <br/>
        <b>{typeof(info['Hx NSS']) !== "undefined" &&
            info['Hx NSS'].hxNssQ14}</b><br /><br />
        Do you consume alcoholic drinks? <br/>
        <b>{typeof(info['Hx NSS']) !== "undefined" &&
            info['Hx NSS'].hxNssQ15}</b><br /><br />

        Last checked for hypertension? <br/>
        <b>{typeof(info['Hx NSS']) !== "undefined" &&
            info['Hx NSS'].hxNssQ18}</b><br /><br />

        Last checked for hypertension? <br/>
        <b>{typeof(info['Hx NSS']) !== "undefined" &&
            info['Hx NSS'].hxNssQ19}</b><br /><br />

        Last checked for hypertension? <br/>
        <b>{typeof(info['Hx NSS']) !== "undefined" &&
            info['Hx NSS'].hxNssQ20}</b><br /><br />

        <h2>Family History</h2>
        Reported Cancer related conditions? <br/>
        <b>{typeof(info['Hx Cancer']) !== "undefined" &&
            typeof(info['Hx Cancer'].hxCancerQ1) !== "undefined" &&
            info['Hx Cancer'].hxCancerQ1.map( text => {
                return <p>{text}<br/></p>
            })}<br />
            {typeof(info['Hx Cancer']) !== "undefined" &&
            typeof(info['Hx Cancer'].hxCancerQ26) !== "undefined" &&
            info['Hx Cancer'].hxCancerQ26.split('\n').map( text => {
                return <p>{text}<br/></p>
            })}</b><br /><br />
        Family history of cancer? <br/>
        <b>{typeof(info['Hx Cancer']) !== "undefined" &&
            typeof(info['Hx Cancer'].hxCancerQ2) !== "undefined" &&
            info['Hx Cancer'].hxCancerQ2.map( text => {
                return <p>{text}<br/></p>
            })}<br />
            {typeof(info['Hx Cancer']) !== "undefined" &&
            typeof(info['Hx Cancer'].hxCancerQ3) !== "undefined" &&
            info['Hx Cancer'].hxCancerQ3.split('\n').map( text => {
                return <p>{text}<br/></p>
            })}</b><br /><br />
        Other significant family history? <br/>
        <b>{typeof(info['Hx Cancer']) !== "undefined" &&
            typeof(info['Hx Cancer'].hxCancerQ3) !== "undefined" &&
            info['Hx Cancer'].hxCancerQ3.split('\n').map( text => {
                return <p>{text}<br/></p>
            })}</b><br /><br />
        Relevant family history summary<br/>
        <b>{typeof(info['Hx Cancer']) !== "undefined" &&
            typeof(info['Hx Cancer'].hxCancerQ10) !== "undefined" &&
            info['Hx Cancer'].hxCancerQ10.split('\n').map( text => {
                return <p>{text}<br/></p>
            })}</b><br /><br />

        <h2>Blood Pressure</h2>
        Average Systolic Reading <br/>
        <b>{typeof(info['Hx Cancer']) !== "undefined" &&
            info['Hx Cancer'].hxCancerQ17
        }<br /><br /></b>
        
        Average Diastolic Reading <br/>
        <b>{typeof(info['Hx Cancer']) !== "undefined" &&
            info['Hx Cancer'].hxCancerQ18
        }
        <br /><br /></b>


    </Fragment>
}