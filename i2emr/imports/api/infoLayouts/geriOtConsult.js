import React, { Component, Fragment } from 'react';

export const geriOtConsult = (info) => {    
    return <Fragment>
        <h2>Vision - Snellen's Test Results</h2>

        1. Previous eye condition or surgery<br/>
        <b>{info['Geri - Vision'] &&
        info['Geri - Vision'].geriVisionQ1}</b><br/>
        <b>{info['Geri - Vision'] && 
        typeof(info['Geri - Vision'].geriVisionQ2) !== "undefined" &&
        info['Geri - Vision'].geriVisionQ2}</b> <br/> <br/>

        2. Visual acuity (w/o pinhole occluder) - Right Eye <br />
        6/<b>{info['Geri - Vision'] && 
        info['Geri - Vision'].geriVisionQ3}<br /><br /></b>

        3. Visual acuity (w/o pinhole occluder) - Left Eye <br />
        6/<b>{info['Geri - Vision'] && 
        info['Geri - Vision'].geriVisionQ4}<br /><br /></b>

        4. Visual acuity (with pinhole) *only if VA w/o pinhole is ≥ 6/12 - Right Eye <br />
        6/<b>{info['Geri - Vision'] && 
        info['Geri - Vision'].geriVisionQ5}<br /><br /></b>

        5. Visual acuity (with pinhole) *only if VA w/o pinhole is ≥ 6/12 - Left Eye <br />
        6/<b>{info['Geri - Vision'] && 
        info['Geri - Vision'].geriVisionQ6}<br /><br /></b>

        6. Eye Functional Test *only applicable if vision is worse than 6/60<br/>
        <b>{info['Geri - Vision'] && 
        info['Geri - Vision'].geriVisionQ7
        }<br /><br /></b>


        <h2>OT Questionnaire Results</h2>

        1. Have you fallen or had a near fall in the last year?<br/>
        <b>{info['Geri - OT Questionnaire'] && 
        info['Geri - OT Questionnaire'].geriOtQuestionnaireQ1}</b><br/><br/>

        2. Has any medication you've taken caused you drowsiness/ giddiness?<br/>
        <b>{info['Geri - OT Questionnaire'] && 
        info['Geri - OT Questionnaire'].geriOtQuestionnaireQ2 === "Yes (Specify in textbox )" && 
        "Yes. Details:"}</b><br/>
        <b>{info['Geri - OT Questionnaire'] && 
        typeof(info['Geri - OT Questionnaire'].geriOtQuestionnaireQ3) !== "undefined" && 
        info['Geri - OT Questionnaire'].geriOtQuestionnaireQ3.split("\n").map((text) => {
            return <p>{text}<br /></p>
        })}</b><br/><br/>

        3. Do you use anything to support yourself (e.g. walking aid, umbrella) when moving about your daily activities?<br/>
        <b>{info['Geri - OT Questionnaire'] && 
        info['Geri - OT Questionnaire'].geriOtQuestionnaireQ4}</b><br/><br/>

        4. Do you frequently experience dizziness when standing up from a seated or laid down position?<br/>
        <b>{info['Geri - OT Questionnaire'] && 
        info['Geri - OT Questionnaire'].geriOtQuestionnaireQ5}</b><br/><br/>

        5. Do you experience urinary incontinence or nocturia (go toilet 3 or more times at night)?<br/>
        <b>{info['Geri - OT Questionnaire'] && 
        info['Geri - OT Questionnaire'].geriOtQuestionnaireQ6}</b><br/><br/>


        <h2>SPPB Scores</h2>

        1) REPEATED CHAIR STANgeriSppDS<br />Time taken in seconds (only if 5 chair stands were completed):<br />
        <b>{typeof(info['Geri - SPPB']) !== "undefined" &&
            info['Geri - SPPB'].geriSppbQ1}<br /><br /></b>
        Score for REPEATED CHAIR STANDS (out of 4):<br />
        <b>{typeof(info['Geri - SPPB']) !== "undefined" &&
            info['Geri - SPPB'].geriSppbQ2}<br /><br /></b>

        2a) BALANCE Side-by-side Stand <br />Time held for in seconds:<br />
        <b>{typeof(info['Geri - SPPB']) !== "undefined" &&
            info['Geri - SPPB'].geriSppbQ3}<br /><br /></b>

        2b) BALANCE Semi-tandem Stand <br />Time held for in seconds:<br />
        <b>{typeof(info['Geri - SPPB']) !== "undefined" &&
            info['Geri - SPPB'].geriSppbQ4}<br /><br /></b>

        2c) BALANCE Tandem Stand <br />Time held for in seconds:<br />
        <b>{typeof(info['Geri - SPPB']) !== "undefined" &&
            info['Geri - SPPB'].geriSppbQ5}<br /><br /></b>
        Score for BALANCE (out of 4):<br />
        <b>{typeof(info['Geri - SPPB']) !== "undefined" &&
            info['Geri - SPPB'].geriSppbQ6}<br /><br /></b>

        3) 8’ WALK <br />Time taken in seconds:<br />
        <b>{typeof(info['Geri - SPPB']) !== "undefined" &&
            info['Geri - SPPB'].geriSppbQ7}<br /><br /></b>
        Score for 8' WALK (out of 4):<br />
        <b>{typeof(info['Geri - SPPB']) !== "undefined" &&
            info['Geri - SPPB'].geriSppbQ8}<br /><br /></b>

        Total score (Max Score: 12): <br />
        <b>{typeof(info['Geri - SPPB']) !== "undefined" &&
            info['Geri - SPPB'].geriSppbQ9}<br /><br /></b>

        Falls Risk Level:  <br />
        <b>{typeof(info['Geri - SPPB']) !== "undefined" &&
            info['Geri - SPPB'].geriSppbQ10}<br /><br /></b>


        <h2>TUG Results</h2>

        3.3b Time-Up and Go (TUG) <br/>
        Walking aid (if any):  <br />
        <b>{typeof(info['Geri - TUG']) !== "undefined" &&
            info['Geri - TUG'].geriTugQ1.map((data) => {
                return data + ", "
                })
            }<br /><br /></b>
        {typeof(info['Geri - TUG']) !== "undefined" &&
        typeof(info['Geri - TUG'] !== "undefined") &&
        info['Geri - TUG'].geriTugQ1.includes("Others (Please specify in textbox )") &&
            <div>
                Type of Walking Aid: <br />
                <b>{typeof(info['Geri - TUG']) !== "undefined" &&
                    info['Geri - TUG'].geriTugQ2}<br /><br /></b>
            </div>}
        Time taken (in seconds): <br />
        <b>{typeof(info['Geri - TUG']) !== "undefined" &&
            info['Geri - TUG'].geriTugQ3}<br /><br /></b>

        Falls Risk Level:  <br />
        <b>{typeof(info['Geri - TUG']) !== "undefined" &&
            info['Geri - TUG'].geriTugQ4}<br /><br /></b>

        {/* Reasons for referral to Dr's consult from PT */}
      
    </Fragment>
}