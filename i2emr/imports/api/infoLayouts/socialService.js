import React, { Component, Fragment } from 'react';

export const socialService = (info) => {    
    return <Fragment>
        <h2>Financial Status</h2>
        CHAS Status<br />
        <b>{typeof(info['Registration']) !== "undefined" &&
            info['Registration'].registrationQ8}</b><br /><br />
        Pioneer Generation Status <br/>
        <b>{typeof(info['Registration']) !== "undefined" &&
            info['Registration'].registrationQ9}</b><br /><br />
        Is the participant on any Government Financial Assistance? <br />
        <b>{typeof(info['Hx Social']) !== "undefined" &&
            info['Hx Social'].hxSocialQ1}<br />
            {typeof(info['Hx Social']) !== "undefined" &&
            typeof(info['Hx Social'].hxSocialQ2) !== "undefined" &&
            info['Hx Social'].hxSocialQ2}</b><br /><br />
        Household Income Per Month?<br/>
        <b>{typeof(info['Hx Social']) !== "undefined" &&
            info['Hx Social'].hxSocialQ3}</b><br /><br />
        Number of Household Members<br/>
        <b>{typeof(info['Hx Social']) !== "undefined" &&
            info['Hx Social'].hxSocialQ4}</b><br /><br />

        <h2>CHAS Card Application</h2>
        Does the participant want to apply for CHAS Card?<br />
        <b>{typeof(info['Hx Social']) !== "undefined" &&
            info['Hx Social'].hxSocialQ5}<br />
        {typeof(info['Hx Social']) !== "undefined" &&
        typeof(info['Hx Social'].hxSocialQ6) !== "undefined" &&
        info['Hx Social'].hxSocialQ6}</b><br /><br />


        <h2>Financial Assistance</h2>
        Does the particpant need advice on financial schemes in Singapore or financial assistance? <br />
        <b>{typeof(info['Hx Social']) !== "undefined" &&
            info['Hx Social'].hxSocialQ7}<br />
            {typeof(info['Hx Social']) !== "undefined" &&
            typeof(info['Hx Social'].hxSocialQ8) !== "undefined" &&
            info['Hx Social'].hxSocialQ8}</b><br /><br />


        <h2>Social Issues</h2>
        Is the participant caring for a loving one<br/>
        <b>{typeof(info['Hx Social']) !== "undefined" &&
            info['Hx Social'].hxSocialQ9}</b><br /><br />
        {
            typeof(info['Hx Social']) !== "undefined" &&
            info['Hx Social'].hxSocialQ9 === "Yes"  &&
            <Fragment>
                Does the participant require caregiver training?<br />
                <b>{info['Hx Social'].hxSocialQ10}</b><br /><br />
                Does the participant need assistance in caring for a loved one?<br />
                <b>{info['Hx Social'].hxSocialQ11}</b><br /><br />
            </Fragment>
        }
        Does the participant require social support<br/>
        <b>{typeof(info['Hx Social']) !== "undefined" &&
            info['Hx Social'].hxSocialQ12}</b><br /><br />

        <h2>Referral from Doctor's Consult</h2>
        Reasons for referral<br/>
        <b>{typeof(info['Doctor\'s Consult']) !== "undefined" &&
            typeof(info['Doctor\'s Consult'].doctorSConsultQ7) !== "undefined" && 
            info['Doctor\'s Consult'].doctorSConsultQ7.split("\n").map((text) => {
                return <p>{text}<br /></p>
            })
        }
        <br /><br /></b>

        <h2>Geriatrics EBAS</h2>
        Reasons for referral from geriatrics EBAS <br />
        <b>{typeof(info['Geri - EBAS-DEP']) !== "undefined" &&
            typeof(info['Geri - EBAS-DEP'].geriEbasDepQ12) !== "undefined" && 
            info['Geri - EBAS-DEP'].geriEbasDepQ12.split("\n").map((text) => {
                return <p>{text}<br /></p>
            })
        }
        <br /><br /></b>

        <h2>OT Consult</h2>
        Reasons for referral from OT consult <br />
        <b>{typeof(info['Geri - OT Consult']) !== "undefined" &&
            typeof(info['Geri - OT Consult'].geriOtConsultQ5) !== "undefined" && 
            info['Geri - OT Consult'].geriOtConsultQ5.split("\n").map((text) => {
                return <p>{text}<br /></p>
            })
        }
        <br /><br /></b>

        <h2>PT Consult</h2>
        Reasons for referral from PT consult <br />
        <b>{typeof(info['Geri - PT Consult']) !== "undefined" &&
            typeof(info['Geri - PT Consult'].geriPtConsultQ5) !== "undefined" && 
            info['Geri - PT Consult'].geriPtConsultQ5.split("\n").map((text) => {
                return <p>{text}<br /></p>
            })
        }
        <br /><br /></b>
    </Fragment>
}