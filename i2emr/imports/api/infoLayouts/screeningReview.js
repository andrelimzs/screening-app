import React, { Component, Fragment } from 'react';

export const screeningReview = (info) => {    
    return <Fragment>
        <h2>Health Concerns</h2>
        Participant's presenting complaints/concerns (if any)
        <b>{typeof(info['Hx HCSR']) !== "undefined" &&
            typeof(info['Hx HCSR'].hxHcsrQ2) !== "undefined" &&
            info['Hx HCSR'].hxHcsrQ2.split("\n").map((text) => {
                return <p>{text}<br /></p>
            })
        }
        <br /><br /></b>

        <h2>Blood Pressure</h2>
        Average Blood Pressure (Systolic)
        <b>{typeof(info['Hx Cancer']) !== "undefined" &&
            info['Hx Cancer'].hxCancerQ17 < 130 && 
            info['Hx Cancer'].hxCancerQ17
        }
        <font color="red">{typeof(info['Hx Cancer']) !== "undefined" &&
            info['Hx Cancer'].hxCancerQ17 >= 130 && 
            <span>{info['Hx Cancer'].hxCancerQ17}
            <p><br/>Blood pressure is high, please see a GP if you have not been diagnosed with hypertension<br/></p>
            </span>
        }</font>
        <br /><br /></b>

        Average Blood Pressure (Diastolic)
        <b>{typeof(info['Hx Cancer']) !== "undefined" &&
            info['Hx Cancer'].hxCancerQ18 < 85 && 
            info['Hx Cancer'].hxCancerQ18
        }
        <font color="red">{typeof(info['Hx Cancer']) !== "undefined" &&
            info['Hx Cancer'].hxCancerQ18 >= 85 && 
            <span>{info['Hx Cancer'].hxCancerQ18}
            <p><br/>Blood pressure is high, please see a GP if you have not been diagnosed with hypertension<br/></p></span>
        }</font>
        <br /><br /></b>


        <h2>BMI</h2>
        BMI
        <b>{typeof(info['Hx Cancer']) !== "undefined" &&
            info['Hx Cancer'].hxCancerQ21 < 23 && 
            info['Hx Cancer'].hxCancerQ21 > 18.5 && 
            info['Hx Cancer'].hxCancerQ21
        }
        <font color="red">{typeof(info['Hx Cancer']) !== "undefined" &&
            info['Hx Cancer'].hxCancerQ21 >= 23 &&
            <span>{info['Hx Cancer'].hxCancerQ21}
            <p><br/>BMI is overweight<br/></p></span>
        }
        {typeof(info['Hx Cancer']) !== "undefined" &&
            info['Hx Cancer'].hxCancerQ21 <= 18.5 &&
            <span>{info['Hx Cancer'].hxCancerQ21}
            <p><br/>BMI is underweight<br/></p></span>
        }
        </font>
        <br /><br /></b>

        Height (in cm)
        <b>{typeof(info['Hx Cancer']) !== "undefined" &&
            info['Hx Cancer'].hxCancerQ21 < 23 && 
            info['Hx Cancer'].hxCancerQ21 > 18.5 && 
            info['Hx Cancer'].hxCancerQ19
        }
        <font color="red">{typeof(info['Hx Cancer']) !== "undefined" &&
            (info['Hx Cancer'].hxCancerQ21 >= 23 ||
            info['Hx Cancer'].hxCancerQ21 <= 18.5) && 
            info['Hx Cancer'].hxCancerQ19
        }</font>
        <br /><br /></b>

        Weight (in kg)
        <b>{typeof(info['Hx Cancer']) !== "undefined" &&
            info['Hx Cancer'].hxCancerQ21 < 23 && 
            info['Hx Cancer'].hxCancerQ21 > 18.5 && 
            info['Hx Cancer'].hxCancerQ20
        }
        <font color="red">{typeof(info['Hx Cancer']) !== "undefined" &&
            (info['Hx Cancer'].hxCancerQ21 >= 23 ||
            info['Hx Cancer'].hxCancerQ21 <= 18.5) && 
            info['Hx Cancer'].hxCancerQ20
        }</font>
        <br /><br /></b>

        Waist Circumference (in cm)
        <b>{typeof(info['Hx Cancer']) !== "undefined" &&
            (
                (info['Hx Cancer'].hxCancerQ24 <= 90 && info['Pre-Registration'].preRegistrationQ1 === "Male") || 
                (info['Hx Cancer'].hxCancerQ24 <= 80 && info['Pre-Registration'].preRegistrationQ1 === "Female")
            ) && 
            info['Hx Cancer'].hxCancerQ24
        }
        <font color="red">{typeof(info['Hx Cancer']) !== "undefined" &&
            (
                (info['Hx Cancer'].hxCancerQ24 > 90 && info['Pre-Registration'].preRegistrationQ1 === "Male") || 
                (info['Hx Cancer'].hxCancerQ24 > 80 && info['Pre-Registration'].preRegistrationQ1 === "Female")
            ) && 
            info['Hx Cancer'].hxCancerQ24
        }</font>
        <br /><br /></b>
        

        <h2>Urinary Incontinence</h2>
        Do you have any urinary problems? 
        <b>{typeof(info['Hx HCSR']) !== "undefined" &&
            info['Hx HCSR'].hxHcsrQ4 === "No" && 
            info['Hx HCSR'].hxHcsrQ4
        }
        <font color="red">{typeof(info['Hx HCSR']) !== "undefined" &&
            info['Hx HCSR'].hxHcsrQ4 === "Yes, (Please specify):" && 
            "Yes. Details:" &&
            typeof(info['Hx HCSR'].hxHcsrQ5) !== "undefined" &&
            <div>
                <br />
                {info['Hx HCSR'].hxHcsrQ5}
                <p><br /><mark>Check if participant is referred to Soceity for Continence Singapore (SFCS) booth at exhibition. If no, tick on PHS Passport and indicate</mark><br /></p>
            </div>
        }</font>
        <br /><br /></b>


        <h2>Vision</h2>
        Do you have any vision problems?
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
            info['Hx HCSR'].hxHcsrQ7
        }</font>
        <br /><br /></b>

        Visual acuity (w/o pinhole occluder) - Right Eye <br />
        6/<b>{info['Geri - Vision'] && 
        info['Geri - Vision'].geriVisionQ3 < 12 &&
        info['Geri - Vision'].geriVisionQ3}
        <font color ="red">
        {info['Geri - Vision'] && 
        info['Geri - Vision'].geriVisionQ3 >= 12 &&
        <span>{info['Geri - Vision'].geriVisionQ3} 
        <p><br/>See VA with pinhole<br/></p></span>
        }
        </font>
        <br /><br /></b>

        Visual acuity (w/o pinhole occluder) - Left Eye <br />
        6/<b>{info['Geri - Vision'] && 
        info['Geri - Vision'].geriVisionQ4 < 12 &&
        info['Geri - Vision'].geriVisionQ4}
        <font color ="red">
            {info['Geri - Vision'] && 
        info['Geri - Vision'].geriVisionQ4 >= 12 &&
        <span>
        {info['Geri - Vision'].geriVisionQ4}
        <p><br/>See VA with pinhole<br/></p></span>}
        </font>
        <br /><br /></b>

        Visual acuity (w pinhole occluder) - Right Eye <br />
        6/<b>{info['Geri - Vision'] && 
        typeof(info['Geri - Vision'].geriVisionQ5) !== "undefined" &&
        info['Geri - Vision'].geriVisionQ5 < 12 &&
        <span>{info['Geri - Vision'].geriVisionQ5}
        <p><br/>Refractive error, participant should have received spectacles vouchers<br/></p></span>}
        <font color ="red">
        {info['Geri - Vision'] && 
        typeof(info['Geri - Vision'].geriVisionQ5) !== "undefined" &&
        info['Geri - Vision'].geriVisionQ5 >= 12 &&
        <span>{info['Geri - Vision'].geriVisionQ5}
        <p><br/>Non-refractive error, participant should have consulted on-site doctor<br/></p></span>}
        </font>
        <br /><br /></b>

        Visual acuity (w pinhole occluder) - Left Eye <br />
        6/<b>{info['Geri - Vision'] && 
        typeof(info['Geri - Vision'].geriVisionQ6) !== "undefined" &&
        info['Geri - Vision'].geriVisionQ6 < 12 &&
        <span>{info['Geri - Vision'].geriVisionQ6}
        <p><br/>Refractive error, participant should have received spectacles vouchers<br/></p></span>}
        <font color ="red">
        {info['Geri - Vision'] && 
        typeof(info['Geri - Vision'].geriVisionQ6) !== "undefined" &&
        info['Geri - Vision'].geriVisionQ6 >= 12 &&
        <span>{info['Geri - Vision'].geriVisionQ6}
        <p><br/>Non-refractive error, participant should have consulted on-site doctor<br/></p></span>}
        </font>
        <br /><br /></b>

        
        <h2>Hearing</h2>
        Do you have any hearing problems? 
        <b>{typeof(info['Hx HCSR']) !== "undefined" &&
            info['Hx HCSR'].hxHcsrQ8 === "No" && 
            info['Hx HCSR'].hxHcsrQ8
        }
        <font color="red">{typeof(info['Hx HCSR']) !== "undefined" &&
            info['Hx HCSR'].hxHcsrQ8 === "Yes, (Please specify):" && 
            <div>
            Yes. Details:<br />
            {typeof(info['Hx HCSR'].hxHcsrQ9) !== "undefined" &&
            <div>{info['Hx HCSR'].hxHcsrQ9}
            <p><br /><br />If it is a Geri participant, inform them HPB will follow-up with them. If it is a non-Geri participant, advice them to visit a polyclinic to follow-up with their hearing issue</p></div>}</div>
        }
        <br /></font>
        <br /><br /></b>

        <h2>Past Medical History</h2>
        Has a doctor ever told you that you have the following condition? Please tick the appropriate box(es) if the answer is "Yes" to any of the conditions listed below, or tick the last box if you have none. <br />
        <b>{typeof(info['Hx NSS']) !== "undefined" &&
            typeof(info['Hx NSS'].hxNssQ1) !== "undefined" && 
            info['Hx NSS'].hxNssQ1.length === 1 && 
            info['Hx NSS'].hxNssQ1[0] === "No, I don't have any of the above \n(Please proceed to Q2d)" && 
            <p>No</p>
        }
        <mark>{typeof(info['Hx NSS']) !== "undefined" &&
            typeof(info['Hx NSS'].hxNssQ1) !== "undefined" && 
            <div>
            {info['Hx NSS'].hxNssQ1.map((text) => {
                return <p>{text}<br /></p>
            })} 
            <p><br />Check if participant is referred to Health Promotion Board (HPB) booth at Exhibition. If no, tick on PHS Passport and indicate</p></div>
        }
        <br /><br /></mark></b>

        For respondent with known hypertension, diabetes, high cholesterol and stroke only. Are you currently on follow up with a doctor for the existing conditions you have indicated? <br />
        <b><mark>{typeof(info['Hx NSS']) !== "undefined" &&
            typeof(info['Hx NSS'].hxNssQ2) !== "undefined" && 
            info['Hx NSS'].hxNssQ2 === "No" &&
            <div>
            <p>No</p>
            <p><br/>Check if participant is referred to Health Promotion Board (HPB) booth at Exhibition. If no, tick on PHS Passport and indicate.<br/></p></div>
        }</mark>
        {
            typeof(info['Hx NSS']) !== "undefined" &&
            typeof(info['Hx NSS'].hxNssQ2) !== "undefined" && 
            info['Hx NSS'].hxNssQ2 !== "No" &&         
            (info['Hx NSS'].hxNssQ2 === "Yes (please answer question below)" ? "Yes" : info['Hx NSS'].hxNssQ2)
        }
        <br /><br /></b>

        <h2>Social History</h2>
        Do you smoke? <br/>
        <b>{typeof(info['Hx NSS']) !== "undefined" &&
            typeof(info['Hx NSS'].hxNssQ14) !== "undefined" &&
            <div>
            {info['Hx NSS'].hxNssQ14}
            {info['Hx NSS'].hxNssQ14.includes("Yes") &&
            <p><br/>Check if participant is referred to Health Promotion Board (HPB) iQuit booth at Exhibition. If no, tick on PHS Passport and indicate.</p>}</div>
        }<br /><br /></b>
        Do you consume alcoholic drinks? (Note: Standard drink means a shot of hard liquor, a can or bottle of beer, or a glass of wine.) <br/>
        <b>{typeof(info['Hx NSS']) !== "undefined" &&
            typeof(info['Hx NSS'].hxNssQ15) !== "undefined" && 
            (info['Hx NSS'].hxNssQ15 === "Less than 2 standard drinks per day on average." || info['Hx NSS'].hxNssQ15 === "More than 2 standard drinks per day on average.") &&
            <div>
                {info['Hx NSS'].hxNssQ15}
                <p><br/>Check if participant is referred to Health Promotion Board (HPB) Metabolic booth at Exhibition. If no, tick on PHS Passport and indicate<br/></p>
            </div>
        }
        {typeof(info['Hx NSS']) !== "undefined" &&
            typeof(info['Hx NSS'].hxNssQ15) !== "undefined" && 
            info['Hx NSS'].hxNssQ15 !== "Less than 2 standard drinks per day on average." &&
            info['Hx NSS'].hxNssQ15 !== "More than 2 standard drinks per day on average." &&
            info['Hx NSS'].hxNssQ15
        }<br /><br /></b>
        {/* Pending conditions */}

        <h2>FIT Kits</h2>
        Was participant issued 2 FIT kits? <br/>
        <b>{typeof(info['FIT']) !== "undefined" &&
            typeof(info['FIT'].fitQ2) !== "undefined" && 
            <div>
            {info['FIT'].fitQ2}
            {info['FIT'].fitQ2 === "Yes" && 
            <p><br/>Kindly remind the participant to adhere to the instructions regarding FIT kit application and sending. Teach the participant how to use the kit if he/she is unsure or has forgotten<br/></p>}</div>
        }<br /><br /></b>

        <h2>WCE Station</h2>
        Indicated interest for HPV Test under SCS?<br/>
        <b>{typeof(info['WCE']) !== "undefined" &&
            typeof(info['WCE'].wceQ4) !== "undefined" && 
            info['WCE'].wceQ4
        }<br /><br /></b>
        Indicated interest for Mammogram under SCS?<br/>
        <b>{typeof(info['WCE']) !== "undefined" &&
            typeof(info['WCE'].wceQ5) !== "undefined" && 
            info['WCE'].wceQ5
        }<br /><br /></b>
        Registered for Mammogram under NHGD?<br/>
        <b>{typeof(info['WCE']) !== "undefined" &&
            typeof(info['WCE'].wceQ6) !== "undefined" && 
            info['WCE'].wceQ6 === "Yes, (Please specify date of appointment if given):" && 
            "Yes"
        }<br /><br /></b>

        <h2>Geriatrics</h2>
        Which organisation was the participant referred to for post-screening assessment? (from AMT) <br/>
        <b>{typeof(info['Geri - Cognitive Follow Up']) !== "undefined" &&
            typeof(info['Geri - Cognitive Follow Up'].geriCognitiveFollowUpQ1) !== "undefined" && 
            info['Geri - Cognitive Follow Up'].geriCognitiveFollowUpQ1
        }<br /><br /></b>
        To be referred for social support (For HDB Ease Sign-up) (PT): <br />
        <b>{typeof(info['Geri - PT Consult']) !== "undefined" &&
            typeof(info['Geri - PT Consult'].geriPtConsultQ4) !== "undefined" && 
            info['Geri - PT Consult'].geriPtConsultQ4 === "No" && 
            info['Geri - PT Consult'].geriPtConsultQ4
        }
        <font color="red">{typeof(info['Geri - PT Consult']) !== "undefined" &&
            typeof(info['Geri - PT Consult'].geriPtConsultQ4) !== "undefined" && 
            info['Geri - PT Consult'].geriPtConsultQ4 === "Yes" && 
            <div>
                {info['Geri - PT Consult'].geriPtConsultQ4}
                <p><br/>Reasons for referral to social support (PT):<br/></p>
                {typeof(info['Geri - PT Consult'].geriPtConsultQ5) !== "undefined" &&
                typeof(info['Geri - PT Consult'].geriPtConsultQ5) !== "undefined" &&
                info['Geri - PT Consult'].geriPtConsultQ5.split("\n").map(text => {
                    return <p>{text}<br/></p>
                })
                }
            </div>
        }</font>
        <br /><br /></b>

        To be referred for social support (For HDB Ease Sign-up) (OT): <br />
        <b>{typeof(info['Geri - OT Consult']) !== "undefined" &&
            typeof(info['Geri - OT Consult'].geriOtConsultQ4) !== "undefined" && 
            info['Geri - OT Consult'].geriOtConsultQ4 === "No" && 
            info['Geri - OT Consult'].geriOtConsultQ4
        }
        <font color="red">{typeof(info['Geri - OT Consult']) !== "undefined" &&
            typeof(info['Geri - OT Consult'].geriOtConsultQ4) !== "undefined" && 
            info['Geri - OT Consult'].geriOtConsultQ4 === "Yes" && 
            <div>
            {info['Geri - OT Consult'].geriOtConsultQ4}
            <p><br/>Reasons for referral to social support (OT):<br/></p>
            {typeof(info['Geri - OT Consult'].geriOtConsultQ5) !== "undefined" &&
            typeof(info['Geri - OT Consult'].geriOtConsultQ5) !== "undefined" &&
            info['Geri - OT Consult'].geriOtConsultQ5.split("\n").map(text => {
                return <p>{text}<br/></p>
            })
            }
            </div>
        }</font>
        <br /><br /></b>
        Which of the programmes did the OT recommend for the participant to go? (if applicable) <br/>
        <b>{typeof(info['Geri - OT Consult']) !== "undefined" &&
            typeof(info['Geri - OT Consult'].geriOtConsultQ6) === "undefined" &&
            <p>None<br/></p>
        }
        <font color="red">{typeof(info['Geri - OT Consult']) !== "undefined" &&
            typeof(info['Geri - OT Consult'].geriOtConsultQ6) !== "undefined" &&
            info['Geri - OT Consult'].geriOtConsultQ6.map(text => {
                return <p>{text}<br/></p>
            })
        }</font>
        <br /><br /></b>

        <h2>Social Service</h2>
        Did the participant visit the social service station? <br/>
        <b>{typeof(info['Social Service']) !== "undefined" &&
            typeof(info['Social Service'].socialServiceQ1) !== "undefined" &&
            info['Social Service'].socialServiceQ1 === "No" &&
            info['Social Service'].socialServiceQ1
        }
        <mark>{typeof(info['Social Service']) !== "undefined" &&
            typeof(info['Social Service'].socialServiceQ1) !== "undefined" &&
            info['Social Service'].socialServiceQ1 === "Yes" &&
            info['Social Service'].socialServiceQ1
        }<br /><br /></mark></b>

        <h2>Doctor's Consult</h2>
        Did this patient consult an on-site doctor today?<br/>
        <b>{typeof(info['Social Service']) !== "undefined" &&
            typeof(info['Doctor\'s Consult'].doctorSConsultQ11) !== "undefined" &&
            info['Doctor\'s Consult'].doctorSConsultQ11 ? <p><mark>Yes</mark></p> : "No"
        }<br /><br /></b>
        Does this patient require urgent follow-up?<br/>
        <b>{typeof(info['Social Service']) !== "undefined" &&
            typeof(info['Doctor\'s Consult'].doctorSConsultQ11) !== "undefined" &&
            info['Doctor\'s Consult'].doctorSConsultQ11 ? <p><mark>Yes</mark></p> : "No"
        }<br /><br /></b>
        Doctor's memo (if applicable):<br/>
        <b>{typeof(info['Doctor\'s Consult']) !== "undefined" &&
            typeof(info['Doctor\'s Consult'].doctorSConsultQ3) !== "undefined" && 
            info['Doctor\'s Consult'].doctorSConsultQ3.split("\n").map((text) => {
                return <p>{text}<br /></p>
            })
        }
        <br /><br /></b>
        Was the patient referred to the dietitian?<br/>
        <b>{typeof(info['Social Service']) !== "undefined" &&
            typeof(info['Doctor\'s Consult'].doctorSConsultQ4) !== "undefined" &&
            info['Doctor\'s Consult'].doctorSConsultQ4 ? "Yes" : "No"
        }<br /><br /></b>

        <h3><font color="red">All participants will receive a more detailed health report from PHS within 4-6 weeks of the screening. 
*If you have gone for phlebotomy, you will receive the blood test results from NUHS within 4 - 6 weeks of the screening.</font></h3>
      
    </Fragment>
}