import React, { Component, Fragment } from 'react';

export const doctorSConsult = (info) => {    
    return <Fragment>
        <h2>Health Concerns</h2>
        Summarised reasons for referral to Doctor Consultation<br />
        <b>{typeof(info['Hx HCSR']) !== "undefined" &&
            typeof(info['Hx HCSR'].hxHcsrQ2) !== "undefined" && 
            info['Hx HCSR'].hxHcsrQ2.split("\n").map((text) => {
                return <p>{text}<br /></p>
            })
        }
        <br /><br /></b>

        <h2>Systems Review</h2>
        Summarised systems review<br />
        <b>{typeof(info['Hx HCSR']) !== "undefined" &&
            typeof(info['Hx HCSR'].hxHcsrQ3) !== "undefined" && 
            info['Hx HCSR'].hxHcsrQ3.split("\n").map((text) => {
                return <p>{text}<br /></p>
            })
        }
        <br /><br /></b>


        <h2>Urinary/Faecal incontinence</h2>
        Urinary/Faecal incontinence <br />
        <b>{typeof(info['Hx HCSR']) !== "undefined" &&
            info['Hx HCSR'].hxHcsrQ4 === "No" && 
            info['Hx HCSR'].hxHcsrQ4
        }
        <font color="red">{typeof(info['Hx HCSR']) !== "undefined" &&
            info['Hx HCSR'].hxHcsrQ4 === "Yes, (Please specify):" && 
            "Yes. Details:"
        }
        <br />
        {typeof(info['Hx HCSR']) !== "undefined" &&
            info['Hx HCSR'].hxHcsrQ5 !== "undefined" &&
            info['Hx HCSR'].hxHcsrQ5
        }</font>
        <br /><br /></b>


        <h2>Vision</h2>
        Vision Problems<br />
        <b>{typeof(info['Hx HCSR']) !== "undefined" &&
            info['Hx HCSR'].hxHcsrQ6 === "No" && 
            info['Hx HCSR'].hxHcsrQ6
        }
        <font color="red">{typeof(info['Hx HCSR']) !== "undefined" &&
            info['Hx HCSR'].hxHcsrQ6 === "Yes, (Please specify):" && 
            "Yes. Details:"
        }
        <br />
        {typeof(info['Hx HCSR']) !== "undefined" &&
            typeof(info['Hx HCSR'].hxHcsrQ7) !== "undefined" &&
            info['Hx HCSR'].hxHcsrQ7.split("\n").map((text) => {
                return <p>{text}<br /></p>
            })
        }</font>
        <br /><br /></b>


        <h2>Hearing</h2>
        Hearing Problems<br />
        <b>{typeof(info['Hx HCSR']) !== "undefined" &&
            info['Hx HCSR'].hxHcsrQ8 === "No" && 
            info['Hx HCSR'].hxHcsrQ8
        }
        <font color="red">{typeof(info['Hx HCSR']) !== "undefined" &&
            info['Hx HCSR'].hxHcsrQ8 === "Yes, (Please specify):" && 
            "Yes. Details:"
        }
        <br />
        {typeof(info['Hx HCSR']) !== "undefined" &&
            typeof(info['Hx HCSR'].hxHcsrQ9) !== "undefined" &&
            info['Hx HCSR'].hxHcsrQ9.split("\n").map((text) => {
                return <p>{text}<br /></p>
            })
        }</font>
        <br /><br /></b>

        <h2>Past Medical History</h2>
        Summary of Relevant Past Medical History<br />
        <b>{typeof(info['Hx NSS']) !== "undefined" &&
            typeof(info['Hx NSS'].hxNssQ12) !== "undefined" && 
            info['Hx NSS'].hxNssQ12.split("\n").map((text) => {
                return <p>{text}<br /></p>
            })
        }
        <br /><br /></b>

        <h2>Family History</h2>
        Summary of Relevant Family History<br />
        <b>{typeof(info['Hx Cancer']) !== "undefined" &&
            typeof(info['Hx Cancer'].hxCancerQ10) !== "undefined" && 
            info['Hx Cancer'].hxCancerQ10.split("\n").map((text) => {
                return <p>{text}<br /></p>
            })
        }
        <br /><br /></b>

        <h2>Blood Pressure</h2>
        Average Blood Pressure<br />
        <b>{typeof(info['Hx Cancer']) !== "undefined" &&
            info['Hx Cancer'].hxCancerQ17
        }
        
        {typeof(info['Hx Cancer']) !== "undefined" &&
            info['Hx Cancer'].hxCancerQ18
        }
        <br /><br /></b>

        <h2>BMI</h2>
        BMI<br />
        <b>{typeof(info['Hx Cancer']) !== "undefined" &&
            info['Hx Cancer'].hxCancerQ21
        }
        <br /><br /></b>

        <h2>OT Consult</h2>
        Reasons for referral from OT consult <br />
        <b>{typeof(info['Geri - OT Consult']) !== "undefined" &&
            typeof(info['Geri - OT Consult'].geriOtConsultQ3) !== "undefined" && 
            info['Geri - OT Consult'].geriOtConsultQ3.split("\n").map((text) => {
                return <p>{text}<br /></p>
            })
        }
        <br /><br /></b>

        <h2>PT Consult</h2>
        Reasons for referral from PT consult <br />
        <b>{typeof(info['Geri - PT Consult']) !== "undefined" &&
            typeof(info['Geri - PT Consult'].geriPtConsultQ3) !== "undefined" && 
            info['Geri - PT Consult'].geriPtConsultQ3.split("\n").map((text) => {
                return <p>{text}<br /></p>
            })
        }
        <br /><br /></b>
      
    </Fragment>
}