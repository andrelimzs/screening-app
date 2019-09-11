import React, { Component, Fragment } from 'react';

export const screeningReview = (info) => {    
    return <Fragment>
        <h2>Blood Pressure</h2>
        Average Reading Systolic (average of closest 2 readings)
        <b>{typeof(info['Hx Cancer']) !== "undefined" &&
            info['Hx Cancer'].hxCancerQ17 < 140 && 
            info['Hx Cancer'].hxCancerQ17
        }
        <font color="red">{typeof(info['Hx Cancer']) !== "undefined" &&
            info['Hx Cancer'].hxCancerQ17 >= 140 && 
            info['Hx Cancer'].hxCancerQ17
        }</font>
        <br /><br /></b>

        Average Reading Diastolic (average of closest 2 readings)
        <b>{typeof(info['Hx Cancer']) !== "undefined" &&
            info['Hx Cancer'].hxCancerQ18 < 90 && 
            info['Hx Cancer'].hxCancerQ18
        }
        <font color="red">{typeof(info['Hx Cancer']) !== "undefined" &&
            info['Hx Cancer'].hxCancerQ18 >= 90 && 
            info['Hx Cancer'].hxCancerQ18
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
            (info['Hx Cancer'].hxCancerQ21 >= 23 ||
            info['Hx Cancer'].hxCancerQ21 <= 18.5) && 
            info['Hx Cancer'].hxCancerQ21
        }</font>
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
                (info['Hx Cancer'].hxCancerQ24 <= 102 && info['Pre-Registration'].preRegistrationQ1 === "Male") || 
                (info['Hx Cancer'].hxCancerQ24 <= 88 && info['Pre-Registration'].preRegistrationQ1 === "Female")
            ) && 
            info['Hx Cancer'].hxCancerQ24
        }
        <font color="red">{typeof(info['Hx Cancer']) !== "undefined" &&
            (
                (info['Hx Cancer'].hxCancerQ24 > 102 && info['Pre-Registration'].preRegistrationQ1 === "Male") || 
                (info['Hx Cancer'].hxCancerQ24 > 88 && info['Pre-Registration'].preRegistrationQ1 === "Female")
            ) && 
            info['Hx Cancer'].hxCancerQ24
        }</font>
        <br /><br /></b>
        

        <h2>Urinary Incontinence</h2>
        3a. Do you have any urinary problems? 
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
        3c. Do you have any vision problems? Exclude complaints like unspecific itchy eyes etc
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
            info['Hx HCSR'].hxHcsrQ7 !== "undefined" &&
            info['Hx HCSR'].hxHcsrQ7
        }</font>
        <br /><br /></b>
        {
            typeof(info['Hx HCSR']) !== "undefined" &&
            info['Hx HCSR'].hxHcsrQ6 === "Yes, (Please specify):" && 
            <Fragment>
                Visual acuity (w/o pinhole occluder) - Right Eye <br />
                6/<b>{info['Geri - Vision'] && 
                info['Geri - Vision'].geriVisionQ3}<br /><br /></b>

                Visual acuity (w/o pinhole occluder) - Left Eye <br />
                6/<b>{info['Geri - Vision'] && 
                info['Geri - Vision'].geriVisionQ4}<br /><br /></b>
            </Fragment>
        }

        
        <h2>Hearing</h2>
        3e. Do you have any hearing problems? 
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
            info['Hx HCSR'].hxHcsrQ9 !== "undefined" &&
            info['Hx HCSR'].hxHcsrQ9
        }</font>
        <br /><br /></b>


        <h2>Social Support</h2>
        To be referred for social support exhibition booth/ AIC (For HDB Ease Sign-up) (PT): <br />
        <b>{typeof(info['Geri - PT Consult']) !== "undefined" &&
            info['Geri - PT Consult'].geriPtConsultQ4 === "No" && 
            info['Geri - PT Consult'].geriPtConsultQ4
        }
        <font color="red">{typeof(info['Geri - PT Consult']) !== "undefined" &&
            info['Geri - PT Consult'].geriPtConsultQ4 === "Yes" && 
            info['Geri - PT Consult'].geriPtConsultQ4 &&
            <p><br/>Reasons for referral to social support exhibition booth/ AIC (PT):<br/></p> &&
            info['Geri - PT Consult'].geriPtConsultQ5
        }</font>
        <br /><br /></b>

        To be referred for social support exhibition booth/ AIC (For HDB Ease Sign-up) (OT): <br />
        <b>{typeof(info['Geri - OT Consult']) !== "undefined" &&
            info['Geri - OT Consult'].geriOtConsultQ4 === "No" && 
            info['Geri - OT Consult'].geriOtConsultQ4
        }
        <font color="red">{typeof(info['Geri - OT Consult']) !== "undefined" &&
            info['Geri - OT Consult'].geriOtConsultQ4 === "Yes" && 
            info['Geri - OT Consult'].geriOtConsultQ4 &&
            <p><br/>Reasons for referral to social support exhibition booth/ AIC (OT):<br/></p> &&
            info['Geri - OT Consult'].geriOtConsultQ5
        }</font>
        <br /><br /></b>
        
        
      
    </Fragment>
}