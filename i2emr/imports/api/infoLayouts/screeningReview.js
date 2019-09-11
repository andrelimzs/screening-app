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
        
        <h2>Urinary Incontinence</h2>
        <h2>Vision</h2>
        <h2>Hearing</h2>
        <h2>Social Support</h2>
        <h2>Social Support  </h2>
        1.     How often do you exercise in a week?<br />*If &lt; 3 x/week and would like to start exercising more, suggest physiotherapist consultation<br />
        <b>{typeof(info['Geri - Physical Activity Level']) !== "undefined" &&
            info['Geri - Physical Activity Level'].geriPhysicalActivityLevelQ1}<br /><br /></b>
        
      
    </Fragment>
}