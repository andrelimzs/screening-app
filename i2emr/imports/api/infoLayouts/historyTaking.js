import React, { Component, Fragment } from 'react';

export const historyTaking = (info) => {    
    return <Fragment>
        <h2>Participant Identification</h2>
        Booth number and History-taker's Name<br />
        <b>{typeof(info['Hx HCSR']) !== "undefined" &&
            info['Hx HCSR'].hxHcsrQ1}</b><br /><br />

        <h2>Health Concerns</h2>
        Brief History <br/>
        <b>{typeof(info['Hx HCSR']) !== "undefined" &&
            info['Hx HCSR'].hxHcsrQ2.split('\n').map( text => {
                return <p>{text}<br/></p>
            })}</b><br /><br />
        Red Flags <br/>
        <b>{typeof(info['Hx HCSR']) !== "undefined" &&
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
        Do you have any vision problems? <br/>
        <b>{typeof(info['Hx HCSR']) !== "undefined" &&
            info['Hx HCSR'].hxHcsrQ6}<br />
            {typeof(info['Hx HCSR']) !== "undefined" &&
            typeof(info['Hx HCSR'].hxHcsrQ7) !== "undefined" &&
            info['Hx HCSR'].hxHcsrQ7.split('\n').map( text => {
                return <p>{text}<br/></p>
            })}</b><br /><br />
       Do you have any hearing problems? <br/>
        <b>{typeof(info['Hx HCSR']) !== "undefined" &&
            info['Hx HCSR'].hxHcsrQ8}<br />
            {typeof(info['Hx HCSR']) !== "undefined" &&
            typeof(info['Hx HCSR'].hxHcsrQ9) !== "undefined" &&
            info['Hx HCSR'].hxHcsrQ9.split('\n').map( text => {
                return <p>{text}<br/></p>
            })}</b><br /><br />

        <h2>NSS</h2>
        Relevant Past Medical History <br/>
        <b>{typeof(info['Hx NSS']) !== "undefined" &&
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

        <h2>Social</h2>
        Government Financial Assistance status <br/>
        <b>{typeof(info['Hx Social']) !== "undefined" &&
            info['Hx Social'].hxSocialQ1}<br />
            {typeof(info['Hx Social']) !== "undefined" &&
            typeof(info['Hx Social'].hxSocialQ2) !== "undefined" &&
            info['Hx Social'].hxSocialQ2}</b><br /><br />
        Average monthly earnings <br/>
        <b>{typeof(info['Hx Social']) !== "undefined" &&
            info['Hx Social'].hxSocialQ3}</b><br /><br />
        Number of household members (including self) <br/>
        <b>{typeof(info['Hx Social']) !== "undefined" &&
            info['Hx Social'].hxSocialQ4}</b><br /><br />
        Apply fo CHAS card? <br/>
        <b>{typeof(info['Hx Social']) !== "undefined" &&
            info['Hx Social'].hxSocialQ5}<br />
            {typeof(info['Hx Social']) !== "undefined" &&
            typeof(info['Hx Social'].hxSocialQ6) !== "undefined" &&
            info['Hx Social'].hxSocialQ6.split('\n').map( text => {
                return <p>{text}<br/></p>
            })}</b><br /><br />
        Do you need advice on financial assistance?
        <b>{typeof(info['Hx Social']) !== "undefined" &&
            info['Hx Social'].hxSocialQ7}<br />
            {typeof(info['Hx Social']) !== "undefined" &&
            typeof(info['Hx Social'].hxSocialQ8) !== "undefined" &&
            info['Hx Social'].hxSocialQ8.split('\n').map( text => {
                return <p>{text}<br/></p>
            })}</b><br /><br />
        Caring for loved one? <br/>
        <b>{typeof(info['Hx Social']) !== "undefined" &&
            info['Hx Social'].hxSocialQ9}</b><br /><br />
        {
            typeof(info['Hx Social']) !== "undefined" &&
            info['Hx Social'].hxSocialQ9 === "Yes" &&
            <Fragment>
                Need training?
                <b>{typeof(info['Hx Social']) !== "undefined" &&
                info['Hx Social'].hxSocialQ10}</b><br /><br />
                Need assistance?
                <b>{typeof(info['Hx Social']) !== "undefined" &&
                info['Hx Social'].hxSocialQ11}</b><br /><br />
            </Fragment>
        }
        Need social support? <br/>
        <b>{typeof(info['Hx Social']) !== "undefined" &&
            info['Hx Social'].hxSocialQ12}</b><br />

    </Fragment>
}