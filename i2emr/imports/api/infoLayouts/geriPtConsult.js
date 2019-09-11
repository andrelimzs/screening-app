import React, { Component, Fragment } from 'react';

export const geriPtConsult = (info) => {    
    return <Fragment>
        <h2>PAR-Q Results</h2>
        1.     Has your doctor ever said that you have a heart condition and that you should only do physical activity recommended by a doctor?<br />
        <b>{typeof(info['Geri - PAR-Q']) !== "undefined" &&
            info['Geri - PAR-Q'].geriParQQ1}<br /><br /></b>
        2.     Do you feel pain in your chest when you do physical activity?<br />
        <b>{typeof(info['Geri - PAR-Q']) !== "undefined" &&
            info['Geri - PAR-Q'].geriParQQ2}<br /><br /></b>
        3.     In the past month, have you had chest pain when you were not doing physical activity?<br />
        <b>{typeof(info['Geri - PAR-Q']) !== "undefined" &&
            info['Geri - PAR-Q'].geriParQQ3}<br /><br /></b>
        4.     Do you lose your balance because of dizziness or do you ever lose consciousness?<br />
        <b>{typeof(info['Geri - PAR-Q']) !== "undefined" &&
            info['Geri - PAR-Q'].geriParQQ4}<br /><br /></b>
        5.     Do you have a bone or joint problem (for example, back, knee or hip) that could be made worse by a change in your physical activity?<br />
        <b>{typeof(info['Geri - PAR-Q']) !== "undefined" &&
            info['Geri - PAR-Q'].geriParQQ5}<br /><br /></b>
        6.     Is your doctor currently prescribing drugs (for example, water pills) for your blood pressure or heart condition?<br />
        <b>{typeof(info['Geri - PAR-Q']) !== "undefined" &&
            info['Geri - PAR-Q'].geriParQQ6}<br /><br /></b>
        7.     Do you know of any other reason why you should not do physical activity?<br />
        <b>{typeof(info['Geri - PAR-Q']) !== "undefined" &&
            info['Geri - PAR-Q'].geriParQQ7}<br /><br /></b>

        <h2>Physical Activity Level Results</h2>
        1.     How often do you exercise in a week?<br />*If &lt; 3 x/week and would like to start exercising more, suggest physiotherapist consultation<br />
        <b>{typeof(info['Geri - Physical Activity Level']) !== "undefined" &&
            info['Geri - Physical Activity Level'].geriPhysicalActivityLevelQ1}<br /><br /></b>
        2.     How long do you exercise each time?<br />*If &lt; 30 minutes per session and would like to increase, suggest physiotherapist consultation. <br />
        <b>{typeof(info['Geri - Physical Activity Level']) !== "undefined" &&
            info['Geri - Physical Activity Level'].geriPhysicalActivityLevelQ2}<br /><br /></b>
        3.     What do you do for exercise?<br />*Take down salient points. <br />*Dangerous/ inappropriate exercises are defined to the participants as  exercises that cause pain or difficulty to to the participant in performing.<br />*If exercises are dangerous or deemed inappropriate, to REFER FOR PHYSIOTHERAPIST CONSULATION. <br />
        <b>{typeof(info['Geri - Physical Activity Level']) !== "undefined" &&
            info['Geri - Physical Activity Level'].geriPhysicalActivityLevelQ3}<br /><br /></b>
        4.     Using the following scale, can you rate the level of exertion when you exercise?<br />(Borg Scale – Rate Perceived Exertion (RPE))<br />*If &lt; 3, to suggest physiotherapist consultation. If >7, to REFER FOR PHYSIOTHERAPIST CONSULATION.<br />
        {/* <img src='/images/geri-physical-activity-level/borg-scale.png' alt='Borg Scale' /> <br /> */}
        <b>{typeof(info['Geri - Physical Activity Level']) !== "undefined" &&
            info['Geri - Physical Activity Level'].geriPhysicalActivityLevelQ4}<br /><br /></b>
        5.     Do you have significant difficulties going about your regular exercise regime? Or do you not know how to start exercising?<br />*If yes, to REFER FOR PHYSIOTHERAPIST CONSULATION<br />
        <b>{typeof(info['Geri - Physical Activity Level']) !== "undefined" &&
            info['Geri - Physical Activity Level'].geriPhysicalActivityLevelQ5}<br /><br /></b>
        
        <h2>Frail Scale Results</h2>
        1. Fatigue: How much of the time during the past 4 weeks did you feel tired?<br />1 = All of the time<br />2 = Most of the time<br />3 = Some of the time<br />4 = A little of the time<br />5 = None of the time<br /><br />Responses of “1” or “2” are scored as 1 and all others as 0.<br />
        <b>{typeof(info['Geri - Frail Scale']) !== "undefined" &&
            info['Geri - Frail Scale'].geriFrailScaleQ1}<br /><br /></b>
        2. Resistance: By yourself and not using aids, do you have any difficulty walking up 10 steps without resting?<br />1 = Yes<br />0 = No <br />
        <b>{typeof(info['Geri - Frail Scale']) !== "undefined" &&
            info['Geri - Frail Scale'].geriFrailScaleQ2}<br /><br /></b>
        3. Ambulation: By yourself and not using aids, do you have any difficulty walking several hundred yards? (approx. > 300m)<br />1 = Yes<br />0 = No <br />
        <b>{typeof(info['Geri - Frail Scale']) !== "undefined" &&
            info['Geri - Frail Scale'].geriFrailScaleQ3}<br /><br /></b>
        4. Illnesses: For 11 illnesses, participants are asked, “Did a doctor ever tell you that you have [illness]?” <br />The illnesses include hypertension, diabetes, cancer (other than a minor skin cancer), chronic lung disease, heart attack, congestive heart failure, angina, asthma, arthritis, stroke, and kidney disease.<br /><br />The total illnesses (0–11) are recorded as <br />0–4 = 0 and 5–11 = 1.<br />
        <b>{typeof(info['Geri - Frail Scale']) !== "undefined" &&
            info['Geri - Frail Scale'].geriFrailScaleQ4}<br /><br /></b>
        5. Loss of weight: How much do you weigh with your clothes on but without shoes? [current weight] <br />One year ago, in October 2018, how much did you weigh without your shoes and with your clothes on? [weight 1 year ago]. <br /><br />Percent weight change is computed as: <br />[[weight 1 year ago - current weight]/weight 1 year ago]] * 100.<br />What is the percentage (%) weight change?<br /><br />Percent change > 5 (representing a 5% loss of weight) is scored as 1 and &lt; 5 as 0.<br /><br />If participant cannot remember his/her weight, ask if there was any significant loss in weight the past year.<br />
        <b>{typeof(info['Geri - Frail Scale']) !== "undefined" &&
            info['Geri - Frail Scale'].geriFrailScaleQ5}<br /><br /></b>
         Frail scale score:  <br />
        <b>{typeof(info['Geri - Frail Scale']) !== "undefined" &&
            info['Geri - Frail Scale'].geriFrailScaleQ7}<br /><br /></b>

        <h2>SPPB Results</h2>
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
        3.3b Time-Up and Go (TUG)<br/>
        Walking aid (if any):  <br />
        <b>{typeof(info['Geri - TUG']) !== "undefined" &&
            info['Geri - TUG'].geriTugQ1.map((data) => {
                return data + ", ";            
            })}<br /><br /></b>
        {typeof(info['Geri - TUG']) !== "undefined" &&
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