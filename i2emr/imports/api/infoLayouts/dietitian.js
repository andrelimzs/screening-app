import React, { Component, Fragment } from 'react';

export const dietitian = (info) => {    
    return <Fragment>
        <h2>Doctor's Consult</h2>
        Reasons for referral from Doctor's Consult <br />
        <b>{typeof(info['Doctor\'s Consult']) !== "undefined" &&
            typeof(info['Doctor\'s Consult'].doctorSConsultQ5) !== "undefined" && 
            info['Doctor\'s Consult'].doctorSConsultQ5.split("\n").map((text) => {
                return <p>{text}<br /></p>
            })
        }
        <br /><br /></b>
   </Fragment>
}