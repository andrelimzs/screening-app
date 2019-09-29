import React, { Component, Fragment } from 'react';

export const historyTaking = (info) => {    
    return <Fragment>
        <h2>Participant Identification</h2>
        Booth number and History-taker's Name<br />
        <b>{typeof(info['Hx HCSR']) !== "undefined" &&
            info['Hx HCSR'].hxHcsrQ1}</b><br /><br />
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
    </Fragment>
}