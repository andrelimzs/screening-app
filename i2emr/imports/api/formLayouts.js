import React, { Component, Fragment } from 'react';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { formSchemas } from '/imports/api/formSchemas';

import AutoForm from 'uniforms-material/AutoForm';
import AutoField from 'uniforms-material/AutoField';
import TextField from 'uniforms-material/TextField';
import SubmitField from 'uniforms-material/SubmitField';
import SelectField from 'uniforms-material/SelectField';
import HiddenField from 'uniforms-material/HiddenField';
import NumField from 'uniforms-material/NumField';
import ListField from 'uniforms-material/ListField';
import DateField from 'uniforms-material/DateField';
import RadioField from 'uniforms-material/RadioField';
import BoolField from 'uniforms-material/BoolField';
import LongTextField from 'uniforms-material/LongTextField';

import BaseField from 'uniforms/BaseField';
import nothing from 'uniforms/nothing';
import {Children} from 'react';
import { Radio } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

// Define DisplayIf
// Used to display fields depending on another field's response
const DisplayIf = ({children, condition}, {uniforms}) => (condition(uniforms) ? Children.only(children) : nothing);
DisplayIf.contextTypes = BaseField.contextTypes;

// Use to calculate values from uniform.model.<>
const SomeComp =
  ({ calculation }, { uniforms: { model, onChange, error } }) => ( calculation(model) );

SomeComp.contextTypes = BaseField.contextTypes;

function getScore (model, questionList, expectedAnswer) {
  let score = 0;
  questionList.forEach(function(question) {
    if (question in model && model[question] === expectedAnswer){
      score++;
    }
  })
  return score;
}

function getFrailScore(model) {
  let score = 0;
  score += model['geriFrailScaleQ1'] === '1' ? 1 : 0
  score += model['geriFrailScaleQ2'] === '1' ? 1 : 0
  score += model['geriFrailScaleQ3'] === '1' ? 1 : 0
  if (typeof(model['geriFrailScaleQ4']) !== "undefined" && model['geriFrailScaleQ4'].length > 4) {
    score += 1
  }
  if (typeof(model['geriFrailScaleQ5']) !== "undefined" && model['geriFrailScaleQ5'] > 5) {
    score += 1
  }
  
  return score;
}

function getSppbScore(model) {
  let score = 0;
  if (typeof(model['geriSppbQ2']) !== "undefined") {
    score += parseInt(model['geriSppbQ2'].slice(0))
  }
  if (typeof(model['geriSppbQ6']) !== "undefined") {
    const num = parseInt(model['geriSppbQ6'].slice(0))
    if (!Number.isNaN(num)) {
      score += num
    }
  }
  if (typeof(model['geriSppbQ8']) !== "undefined") {
    score += parseInt(model['geriSppbQ8'].slice(0))
  }
  return score;
}

// Define the layouts
export const formLayouts = {
  "Pre-Registration" : (info) => (
    <Fragment>
      <h2>Pre-Registration</h2>
      Gender
      <RadioField name="preRegistrationQ1" />
      Initials (Surname must be spelt out. E.g. John Tan Soo Keng = Tan S.K.J. ; Alan Simon Lee = A.S. Lee)
      <TextField name="preRegistrationQ2" />
      Last 4 digits of NRIC (e.g. 987A)
      <TextField name="preRegistrationQ3" />
      Going for Phlebotomy?<br /><br /><i>Conditions:<br />1) Fasted for minimum 10 hours <br />          Note: Water is allowed, coffee/tea is not. Medications are fine. <br />2) NOT previously diagnosed with Diabetes/ High Cholesterol/ High Blood Pressure.<br />3) Have not done a blood test within 1 year.</i>
      <RadioField name="preRegistrationQ4" />
      
    </Fragment>
  ),

  "Registration" : (info) => (
    <Fragment>
      <h2>Registration</h2>
      Salutation 称谓
      <SelectField name="registrationQ1" />
      Race 种族
      <RadioField name="registrationQ2" />
      Nationality 国籍 <br />Please Note: Non Singapore Citizens/ Non-PRs are unfortunately not eligible for this health<br />screening
      <RadioField name="registrationQ3" />
      Marital Status 婚姻状况
      <SelectField name="registrationQ4" />
      Occupation 工作
      <TextField name="registrationQ5" />
      GRC/SMC Subdivision [https://www.parliament.gov.sg/mps/find-my-mp]
      <SelectField name="registrationQ6" />
      Household Income Per Capita
      <SelectField name="registrationQ7" />
      CHAS Status 社保援助计划
      <SelectField name="registrationQ8" />
      Pioneer Generation Status 建国一代配套
      <RadioField name="registrationQ9" />
      <h2>Follow up at GP Clinics</h2>
      <i>Your Health Report & Blood Test Results (if applicable) will be mailed out about <b>4-6 weeks</b> after the screening.  Depending on your results, our team <b>may</b> shortlist you for further follow-up.<br />Scenario 1: If <b>no follow-up</b> is required, the report will be mailed directly to you.<br />Scenario 2: If follow-up is required, you will need to <b>visit a GP clinic</b> to collect your report. <br />Please choose a preferred GP Clinic from the following list in case of Scenario 2.</i>
      <RadioField name="registrationQ10" />
      Preferred Language for Health Report
      <RadioField name="registrationQ11" />
      <DisplayIf condition={() => (typeof(info["Pre-Registration"]) !== "undefined" && info["Pre-Registration"].preRegistrationQ4 === "Y")}>
        <Fragment>
          <h2>Phlebotomy Eligibility</h2>
          Before entering our screening, do note the following <b>eligibility criteria for Phlebotomy</b> <br />1) Fasted for minimum 10 hours <br />          Note: Water is allowed, coffee/tea is not. Medications are fine. <br />2) NOT previously diagnosed with Diabetes/ High Cholesterol/ High Blood Pressure.<br />3) Have not done a blood test within 1 year.<br /><br /><i>Rationale: PHS aims to reach out to undiagnosed people. Patients that are already aware of their condition would have regular follow-ups with the GPs/polyclinics/hospitals. This information is available in our publicity material. Please approach our registration volunteers should you have any queries. We are happy to explain further. Thank you!</i><br /><br />抽血合格标准:<br />1) 十个小时内没有吃东西或喝饮料. 可以喝水, 吃药。不能喝咖啡, 喝茶。<br />2) 在过去的一年内沒有验过血。<br />3) 没有糖尿病, 高血压, 高胆固醇。
          <BoolField name="registrationQ12" />
        </Fragment>
      </DisplayIf>
      <h2>Compliance to PDPA 同意书</h2>
      <i>I hereby give my consent to the Public Health Service Executive Committee to collect my personal information for the purpose of participating in the Public Health Service (hereby called “PHS”) and its related events, and to contact me via calls, SMS, text messages or emails regarding the event and follow-up process.  <br /><br />Should you wish to withdraw your consent for us to contact you for the purposes stated above, please notify a member of the PHS Executive Committee at ask.phs@gmail.com in writing. We will then remove your personal information from our database. Please allow 3 business days for your withdrawal of consent to take effect. All personal information will be kept confidential, will only be disseminated to members of the PHS Executive Committee, and will be strictly used by these parties for the purposes stated. <br /> This question is mandatory.</i>
      <BoolField name="registrationQ13" />
      
    </Fragment>
  ),

  "Phlebotomy" : (info) => (
    <Fragment>
      Blood sample collected?
      <BoolField name="phlebotomyQ1" />
      Circled 'Completed' under Phlebotomy on Form A?
      <BoolField name="phlebotomyQ2" />
      
    </Fragment>
  ),

  "Geri - AMT" : (info) => (
    <Fragment>
      <h2>1.1 ABBREVIATED MENTAL TEST (for dementia)</h2>
      <h3>Please select ‘Yes’ if participant answered correctly or ‘No’ if participant answered incorrectly.</h3>
      <h3>1) What is the year? <br />请问今是什么年份？</h3>
      Was Q1 answered correctly?
      <RadioField name="geriAmtQ1" label="Geri - AMT Q1" />
      <h3>2) About what time is it? (within 1 hour) <br />请问现在大约是几点钟 （一在一个小时之内）？</h3>
      Was Q2 answered correctly?
      <RadioField name="geriAmtQ2" label="Geri - AMT Q2" />
      <h3>Ask patient to memorise memory phase: “ 37 Bukit Timah Road ”<br />请您记住以下这个地址，<br />我将在数分钟后要您重复一遍：37 号， 武吉支马路<br /></h3>
      <h3>3) What is your age? <br /> 请问您今年几岁？</h3>
      Was Q3 answered correctly?
      <RadioField name="geriAmtQ3" label="Geri - AMT Q3" />
      <h3>4) What is your date of birth? <br />  请问您的出生日期或生日？ • 几月 • 几号</h3>
      Was Q4 answered correctly?
      <RadioField name="geriAmtQ4" label="Geri - AMT Q4" />
      <h3>5) What is your home address?<br />请问您的（住家）地址是在什么地方？<br />(1) 门牌;(2)几楼或哪一层; (3)大牌; (4)路名</h3>
      Was Q5 answered correctly?
      <RadioField name="geriAmtQ5" label="Geri - AMT Q5" />
      <h3>6) Where are we now? (The name of building or the nature of the building e.g. hospital, day centre etc)<br />请问我们现在正在什么地方？（例：建筑名称或用途）</h3>
      Was Q6 answered correctly?
      <RadioField name="geriAmtQ6" label="Geri - AMT Q6" />
      <h3>7) Who is our country’s Prime Minister?<br />请问新加坡现任总理是哪位？</h3>
      Was Q7 answered correctly?
      <RadioField name="geriAmtQ7" label="Geri - AMT Q7" />
      <h3>8) What is his/her job? (show picture)<br />请问图片里的人士很有可能是从事哪种行业？</h3>
      <img src='/images/geri-amt/q8.png' alt='Doctor' /> <br />
      Was Q8 answered correctly?
      <RadioField name="geriAmtQ8" label="Geri - AMT Q8" />
      <h3>9) Count backwards from 20 to 1.<br /> 请您从二十开始，倒数到一。</h3>
      Was Q9 answered correctly?
      <RadioField name="geriAmtQ9" label="Geri - AMT Q9" />
      <h3>10) Recall memory phase<br /> 请您把刚才我要您记住的地址重复一遍。</h3>
      Was Q10 answered correctly?
      <RadioField name="geriAmtQ10" label="Geri - AMT Q10" />
      <SomeComp calculation={(model) => (
        <h3>
          AMT Total Score: 
          {
            getScore(model, ['geriAmtQ1', 'geriAmtQ2', 'geriAmtQ3', 'geriAmtQ4', 'geriAmtQ5', 'geriAmtQ6', 'geriAmtQ7', 'geriAmtQ8', 'geriAmtQ9', 'geriAmtQ10'], 'Yes (Answered correctly)')
          }
          /10
        </h3>
      )} />
      <br /><br />
      What is your education level?
      <img src='/images/geri-amt/edu.png' alt='Education' /> <br />
      <RadioField name="geriAmtQ11" label="Geri - AMT Q11" />
      Need referral to cognitive - 2nd Tier Screening ?
      <RadioField name="geriAmtQ12" label="Geri - AMT Q12" />
      Referral to cognitive - 2nd Tier Screening
      <RadioField name="geriAmtQ13" label="Geri - AMT Q13" />
    </Fragment>
  ),

  "Geri - EBAS-DEP" : (info) => (
    <Fragment>
      <h2>1.2 EBAS-DEP </h2>
      <h3>The 8 items of this schedule require raters to make a judgement as to whether the proposition under “Assessment” is satisfied or not. Each question must be asked exactly as shown but follow-up or subsidiary questions may be used to clarify the initial answer.<br />Select 1 = Fits the assessment criteria; Select 0 = Does not fit the criteria; participant is well.</h3>
      1. Do you worry? In the past month? 过去一个月内你曾经有担心过吗？<br /><br />Assessment: Admits to worrying in past month
      <RadioField name="geriEbasDepQ1" label="Geri - EBAS-DEP Q1" />
      2. Have you been sad or depressed in the past month? 过去一个月内你曾经伤心或忧郁过吗？<br /><br /><br />Assessment: Has had sad or depressed mood during the past month 
      <RadioField name="geriEbasDepQ2" label="Geri - EBAS-DEP Q2" />
      3. During the past month have you ever felt that life was not worth living? 近一个月来你曾经觉得生活毫无意义（无价值）吗？<br /><br />Assessment: Has felt that life was not worth living at some time during the past month 
      <RadioField name="geriEbasDepQ3" label="Geri - EBAS-DEP Q3" />
      4. How do you feel about your future? What are your hopes for the future? 你觉得自己的前途怎样？你对前途有何希望？<br /><br /><br />Assessment: Pessimistic about the future or has empty expectations (i.e. nothing to look forward to)
      <RadioField name="geriEbasDepQ4" label="Geri - EBAS-DEP Q4" />
      5. Do you enjoy things as much as you used to - say like you did a year ago? 你对东西的喜爱是否与往常一样，比如说与一年前一样？<br /><br />Assessment: Less enjoyment in activities than a year previously 
      <RadioField name="geriEbasDepQ5" label="Geri - EBAS-DEP Q5" />
      <h3>If question 5 rated 0, then automatically rate 0 for question 6 and skip to question 7. If question 5 rated 1, proceed to question 6.</h3>
      6. Is it because you are depressed or nervous that you don't enjoy things as much? 是不是因为你的忧郁或者精神紧张使得你对东西的喜爱大不如前？<br /><br />Assessment: Loss of enjoyment because of depression/nervousness 
      <RadioField name="geriEbasDepQ6" label="Geri - EBAS-DEP Q6" />
      7. In general, how happy are you? (Read out) <br />Are you - very happy - fairly happy - not very happy or not happy at all? <br />一般来说，你有何等的快乐? <br />你是 :  很快乐   快乐   不很快乐 或   毫无快乐？<br /><br />Assessment: Not very happy or not happy at all / 不很快乐 或   毫无快乐
      <RadioField name="geriEbasDepQ7" label="Geri - EBAS-DEP Q7" />
      8. During the past month have you ever felt that you would rather be dead? 过去一个月内，你曾有时觉得生不如死？ <br /><br />Assessment: Has wished to be dead at any time during past month 
      <RadioField name="geriEbasDepQ8" label="Geri - EBAS-DEP Q8" />
      <SomeComp calculation={(model) => (
        <h3>
          EBAS Total Score: 
          {
            getScore(model, ['geriEbasDepQ1', 'geriEbasDepQ2', 'geriEbasDepQ2', 'geriEbasDepQ4', 'geriEbasDepQ5', 'geriEbasDepQ6', 'geriEbasDepQ7', 'geriEbasDepQ8'], '1 (Abnormal)')
          }
          /8
        </h3>
      )} />
      <br />
      <h3>A score of 3 or greater indicates the probable presence of a depressive disorder which may need treatment and the patient should be assessed in more detail. Please refer to Social Support if score is 3 OR GREATER.</h3>
      To be referred for social support (failed EBAS-DEP) - from Geriatrics EBAS
      <br />
      <RadioField name="geriEbasDepQ9" label="Geri - EBAS-DEP Q18" />
      To be referred for social support (for potential financial/ family difficulties) - from Geriatrics EBAS
      <RadioField name="geriEbasDepQ10" label="Geri - EBAS-DEP Q19" />
      <DisplayIf condition={(context) => (typeof(context.model.geriEbasDepQ10) !== "undefined" && context.model.geriEbasDepQ10 === "Yes")}>
        <Fragment>
            Reasons for referral to social support - from Geriatrics EBAS:
          <LongTextField name="geriEbasDepQ11" label="Geri - EBAS-DEP Q20" />
        </Fragment>
      </DisplayIf>
      <font color="red"><h2>IF THE PATIENT NEEDS TO GO TO SOCIAL SUPPORT MODALITY THAT YOU RECOMMENDED, PLEASE INDICATE ON FORM A.</h2></font>
      
    </Fragment>
  ),

  "Geri - Vision" : (info) => (
    <Fragment>
      <h2>2. VISION SCREENING</h2>
      1. Previous eye condition or surgery
      <RadioField name="geriVisionQ1" label="Geri - Vision Q1"/>
      <DisplayIf condition={(context) => (typeof(context.model.geriVisionQ1) !== "undefined" && context.model.geriVisionQ1 === "Yes (Specify in textbox )")}>
        <Fragment>
            Explanation
          <TextField name="geriVisionQ2" label="Geri - Vision Q2"/>
        </Fragment>
      </DisplayIf>
      2. Visual acuity (w/o pinhole occluder) - Right Eye 6/__ <br />
      <NumField name="geriVisionQ3" label="Geri - Vision Q3"/> <br />
      3. Visual acuity (w/o pinhole occluder) - Left Eye 6/__ <br />
      <NumField name="geriVisionQ4" label="Geri - Vision Q4"/> <br />
      4. Visual acuity (with pinhole) *only if VA w/o pinhole is ≥ 6/12 - Right Eye 6/__ <br />
      <NumField name="geriVisionQ5" label="Geri - Vision Q5"/> <br />
      5. Visual acuity (with pinhole) *only if VA w/o pinhole is ≥ 6/12 - Left Eye 6/__ <br />
      <NumField name="geriVisionQ6" label="Geri - Vision Q6"/> <br />
      6. Eye Functional Test *only applicable if vision is worse than 6/60
      <RadioField name="geriVisionQ7" label="Geri - Vision Q7"/>
       Please <b>refer to Occupational Therapist Consult</b> if visual acuity is <b>≥ 6/12</b>
      <SelectField name="geriVisionQ8" checkboxes="true" label="Geri - Vision Q8" />
       Please <b>refer to Doctor’s Consult if pinhole</b> visual acuity <u><b>is ≥ 6/12</b></u>
      <SelectField name="geriVisionQ9" checkboxes="true" label="Geri - Vision Q9" />
      <font color="red"><h2>IF THE PATIENT NEEDS TO GO TO DOCTOR'S CONSULT MODALITY THAT YOU RECOMMENDED, PLEASE INDICATE ON FORM A.</h2></font>
    </Fragment>
  ),

  "Geri - PAR-Q" : (info) => (
    <Fragment>
      <h2>3.1 PHYSICAL ACTIVITY SECTION</h2>
      <h3>3.1.1. PHYSICAL ACTIVITY READINESS QUESTIONNAIRE (PAR-Q) <br />* If you have answered ‘Yes’ to one or more questions above, you should talk with your doctor BEFORE you start becoming much more physically active. </h3>
      1.     Has your doctor ever said that you have a heart condition and that you should only do physical activity recommended by a doctor?
      <RadioField name="geriParQQ1" label="Geri - PAR-Q Q1"/>
      2.     Do you feel pain in your chest when you do physical activity?
      <RadioField name="geriParQQ2" label="Geri - PAR-Q Q2"/>
      3.     In the past month, have you had chest pain when you were not doing physical activity?
      <RadioField name="geriParQQ3" label="Geri - PAR-Q Q3"/>
      4.     Do you lose your balance because of dizziness or do you ever lose consciousness?
      <RadioField name="geriParQQ4" label="Geri - PAR-Q Q4"/>
      5.     Do you have a bone or joint problem (for example, back, knee or hip) that could be made worse by a change in your physical activity?<br />(If yes, refer to PT consult)
      <RadioField name="geriParQQ5" label="Geri - PAR-Q Q5"/>
      6.     Is your doctor currently prescribing drugs (for example, water pills) for your blood pressure or heart condition?    <br />(If yes, refer to PT consult)
      <RadioField name="geriParQQ6" label="Geri - PAR-Q Q6"/>
      7.     Do you know of any other reason why you should not do physical activity?<br />(If yes, refer to PT consult)
      <RadioField name="geriParQQ7" label="Geri - PAR-Q Q7"/>
      <font color="red">*Referral to Physiotherapist Consult</font>
      <RadioField name="geriParQQ8" label="Geri - PAR-Q Q8"/>
    </Fragment>
  ),

  "Geri - Physical Activity Level" : (info) => (
    <Fragment>
      <h2>3.1 PHYSICAL ACTIVITY SECTION</h2>
      <h2>3.1.2. PHYSICAL ACTIVITY LEVELS</h2>
      1.     How often do you exercise in a week?<br />*If &lt; 3 x/week and would like to start exercising more, suggest physiotherapist consultation
      <TextField name="geriPhysicalActivityLevelQ1" label="Geri - Physical Activity Level Q1"/>
      2.     How long do you exercise each time?<br />*If &lt; 30 minutes per session and would like to increase, suggest physiotherapist consultation. 
      <TextField name="geriPhysicalActivityLevelQ2" label="Geri - Physical Activity Level Q2"/>
      3.     What do you do for exercise?<br />*Take down salient points. <br />*Dangerous/ inappropriate exercises are defined to the participants as  exercises that cause pain or difficulty to to the participant in performing.<br />*If exercises are dangerous or deemed inappropriate, to REFER FOR PHYSIOTHERAPIST CONSULATION. 
      <TextField name="geriPhysicalActivityLevelQ3" label="Geri - Physical Activity Level Q3"/>
      4.     Using the following scale, can you rate the level of exertion when you exercise?<br />(Borg Scale – Rate Perceived Exertion (RPE))<br /><b>*If &lt; 3, to suggest physiotherapist consultation. If >7, to REFER FOR PHYSIOTHERAPIST CONSULATION.</b>
      <img src='/images/geri-physical-activity-level/borg-scale.png' alt='Borg Scale' /> <br />
      <RadioField name="geriPhysicalActivityLevelQ4" label="Geri - Physical Activity Level Q4"/>
      5.     Do you have significant difficulties going about your regular exercise regime? Or do you not know how to start exercising?<br /><b>*If yes, to REFER FOR PHYSIOTHERAPIST CONSULATION</b>
      <RadioField name="geriPhysicalActivityLevelQ5" label="Geri - Physical Activity Level Q5"/>
      <font color="red">*Referral to Physiotherapist Consult</font>
      <RadioField name="geriPhysicalActivityLevelQ6" label="Geri - Physical Activity Level Q6"/>
      
    </Fragment>
  ),

  "Geri - Frail Scale" : (info) => (
    <Fragment>
      <h2>3.1 PHYSICAL ACTIVITY SECTION</h2>
      <h2>3.1.3. FRAIL SCALE</h2>
      <h3>For each for the following question, assign a score of 1 or 0 depending on the participant's answer.</h3>
      1. Fatigue: How much of the time during the past 4 weeks did you feel tired?<br />1 = All of the time<br />2 = Most of the time<br />3 = Some of the time<br />4 = A little of the time<br />5 = None of the time<br /><br />Responses of “1” or “2” are scored as 1 and all others as 0.<br />
      <RadioField name="geriFrailScaleQ1" label="Geri - Frail Scale Q1"/>
      2. Resistance: By yourself and not using aids, do you have any difficulty walking up 10 steps without resting?<br />1 = Yes<br />0 = No <br />
      <RadioField name="geriFrailScaleQ2" label="Geri - Frail Scale Q2"/>
      3. Ambulation: By yourself and not using aids, do you have any difficulty walking several hundred yards? (approx. > 300m)<br />1 = Yes<br />0 = No <br /><br />
      <RadioField name="geriFrailScaleQ3" label="Geri - Frail Scale Q3"/>
      4. Illnesses: For 11 illnesses, participants are asked, “Did a doctor ever tell you that you have [illness]?” <br />The illnesses include hypertension, diabetes, cancer (other than a minor skin cancer), chronic lung disease, heart attack, congestive heart failure, angina, asthma, arthritis, stroke, and kidney disease.<br /><br />The total illnesses (0–11) are recorded as <br />0–4 = 0 and 5–11 = 1.<br />
      <SelectField name="geriFrailScaleQ4" checkboxes="true" label="Geri - Frail Scale Q4" />
      5. Loss of weight: How much do you weigh with your clothes on but without shoes? [current weight] <br />One year ago, in October 2018, how much did you weigh without your shoes and with your clothes on? [weight 1 year ago]. <br /><br />Percent weight change is computed as: <br />[[weight 1 year ago - current weight]/weight 1 year ago]] * 100.<br />What is the percentage (%) weight change?<br /><br />Percent change > 5 (representing a 5% loss of weight) is scored as 1 and &lt; 5 as 0.<br /><br />If participant cannot remember his/her weight, ask if there was any significant loss in weight the past year.<br />
      <NumField name="geriFrailScaleQ5" label="Geri - Frail Scale Q5"/>
      <h3><br />Frail scale scores range from 0-5 (i.e. 1 point for each component; 0 = best to 5 = worst) and represent frail (3-5), pre-frail (1-2), and robust (0) health status.<br />For score of 1 and above, REFER TO PHYSIOTHERAPIST CONSULT. <br /></h3>
      <SomeComp calculation={(model) => (
        <h3>
          <font color="red">Total score (out of 5): 
          {
            getFrailScore(model)
          }
          </font>
        </h3>
      )} />
      <font color="red">*Referral to Physiotherapist Consult</font>
      <RadioField name="geriFrailScaleQ6" label="Geri - Frail Scale Q6"/>
      
    </Fragment>
  ),

  "Geri - OT Questionnaire" : (info) => (
    <Fragment>
      <h2>3.2 OT Questionnaire SECTION</h2>
      1. Have you fallen or had a near fall in the last year?
      <RadioField name="geriOtQuestionnaireQ1" label="Geri - OT Questionnaire Q1"/>
      <h4>If yes, refer occupational therapist consultation</h4>
      2. Has any medication you've taken caused you drowsiness/ giddiness?
      <RadioField name="geriOtQuestionnaireQ2" label="Geri - OT Questionnaire Q2"/>
      <DisplayIf condition={(context) => (typeof(context.model.geriOtQuestionnaireQ2) !== "undefined" && context.model.geriOtQuestionnaireQ2 === "Yes (Specify in textbox )")}>
        <Fragment>
          Please Specify:
          <TextField name="geriOtQuestionnaireQ3" label="Geri - OT Questionnaire Q3"/>
        </Fragment>
      </DisplayIf>
      <h4>If yes, refer occupational therapist consultation</h4>
      3. Do you use anything to support yourself (e.g. walking aid, umbrella) when moving about your daily activities?
      <RadioField name="geriOtQuestionnaireQ4" label="Geri - OT Questionnaire Q4"/>
      <h4>If yes, refer occupational therapist consultation</h4>
      4. Do you frequently experience dizziness when standing up from a seated or laid down position?
      <RadioField name="geriOtQuestionnaireQ5" label="Geri - OT Questionnaire Q5"/>
      <h4>If yes, refer occupational therapist consultation and doctor’s consult</h4>
      5. Do you experience urinary incontinence or nocturia (go toilet 3 or more times at night)?
      <RadioField name="geriOtQuestionnaireQ6" label="Geri - OT Questionnaire Q6"/>
      <h4>If yes, refer occupational therapist consultation and doctor’s consult</h4>
      <font color="red">*Referral to Occupational Therapist Consult</font>
      <RadioField name="geriOtQuestionnaireQ7" label="Geri - OT Questionnaire Q7"/>
       *Referral to Doctor’s Consult
      <RadioField name="geriOtQuestionnaireQ8" checkboxes="true" label="Geri - OT Questionnaire Q8" />
      <font color="red"><h2>IF THE PATIENT NEEDS TO GO TO DOCTOR'S CONSULT MODALITY THAT YOU RECOMMENDED, PLEASE EDIT ON FORM A.</h2></font>
      
    </Fragment>
  ),

  "Geri - SPPB" : (info) => (
    <Fragment>
      <h2>3.3a SHORT PHYSICAL PERFORMANCE BATTERY (SPPB)</h2>
      1) REPEATED CHAIR STANDS<br />Time taken in seconds (only if 5 chair stands were completed):
      <TextField name="geriSppbQ1" label="Geri - SPPB Q1"/>
      <font color="blue"><b>
        Score for REPEATED CHAIR STANDS (out of 4):
        <RadioField name="geriSppbQ2" label="Geri - SPPB Q2"/>
      </b></font>
      2a) BALANCE Side-by-side Stand <br />Time held for in seconds:
      <TextField name="geriSppbQ3" label="Geri - SPPB Q3"/>
      2b) BALANCE Semi-tandem Stand <br />Time held for in seconds:
      <TextField name="geriSppbQ4" label="Geri - SPPB Q4"/>
      2c) BALANCE Tandem Stand <br />Time held for in seconds:
      <TextField name="geriSppbQ5" label="Geri - SPPB Q5"/>
      <font color="blue"><b>
        Score for BALANCE (out of 4):
        <RadioField name="geriSppbQ6" label="Geri - SPPB Q6"/>
      </b></font>
      3) 8’ WALK <br />Time taken in seconds:
      <TextField name="geriSppbQ7" label="Geri - SPPB Q7"/>
      <font color="blue"><b>
        Score for 8' WALK (out of 4):
        <RadioField name="geriSppbQ8" label="Geri - SPPB Q8"/>
      </b></font>
      <SomeComp calculation={(model) => (
        <h3>
          <font color="blue">Total score (Max Score: 12): 
          {
            getSppbScore(model)
          }
          </font>
        </h3>
      )} />
      <h3>If total score ≤ 6, participant has a high falls risk.</h3>
      Falls Risk Level: 
      <RadioField name="geriSppbQ10" label="Geri - SPPB Q10"/>
      <font color="red">*Referral to Physiotherapist and Occupational Therapist Consult</font>
      <RadioField name="geriSppbQ11" label="Geri - SPPB Q11"/>
      
    </Fragment>
  ),

  "Geri - TUG" : (info) => (
    <Fragment>
      <h2>3.3b Time-Up and Go (TUG)</h2>
      Walking aid (if any): 
      <SelectField name="geriTugQ1" checkboxes="true" label="Geri - TUG Q1" />
      <DisplayIf condition={(context) => (typeof(context.model.geriTugQ1) !== "undefined" && context.model.geriTugQ1.includes("Others (Please specify in textbox )"))}>
        <Fragment>
          Please Specify Walking Aid
        <TextField name="geriTugQ2" label="Geri - TUG Q2"/>
        </Fragment>
      </DisplayIf>
      Time taken (in seconds):
      <TextField name="geriTugQ3" label="Geri - TUG Q3"/>
      <h3>If > 15 seconds, participant has a high falls risk.</h3>
      Falls Risk Level: 
      <RadioField name="geriTugQ4" label="Geri - TUG Q4"/>
      *Referral to Physiotherapist and Occupational Therapist Consult
      <RadioField name="geriTugQ5" label="Geri - TUG Q5"/>
      
    </Fragment>
  ),

  "Geri - PT Consult" : (info) => (
    <Fragment>
      <h2>3.4a PT Consult</h2>
      Memo: 
      <LongTextField name="geriPtConsultQ1" label="Geri - PT Consult Q1" />
      To be referred for doctor's consult (PT)? 
      <RadioField name="geriPtConsultQ2" label="Geri - PT Consult Q2"/>
      Reasons for referral to Doctor's consult (PT):
      <LongTextField name="geriPtConsultQ3" label="Geri - PT Consult Q3" />
      To be referred for social support (For HDB EASE Sign-up) (PT):
      <RadioField name="geriPtConsultQ4" label="Geri - PT Consult Q4"/>
      Reasons for referral to social support (PT):
      <LongTextField name="geriPtConsultQ5" label="Geri - PT Consult Q5" />
      <font color="red"><h2>IF THE PATIENT NEEDS TO GO TO DOCTOR'S CONSULT/ SOCIAL SUPPORT MODALITY THAT YOU RECOMMENDED, PLEASE EDIT ON FORM A</h2></font>
      
    </Fragment>
  ),

  "Geri - OT Consult" : (info) => (
    <Fragment>
      <h2>3.4b OT Consult</h2>
      Memo: 
      <LongTextField name="geriOtConsultQ1" label="Geri - OT Consult Q1" />
      To be referred for doctor's consult (OT)?
      <RadioField name="geriOtConsultQ2" label="Geri - OT Consult Q2"/>
      Reasons for referral to Doctor's consult (OT):
      <LongTextField name="geriOtConsultQ3" label="Geri - OT Consult Q3" />
      To be referred for social support (For HDB EASE Sign-up) (OT):
      <RadioField name="geriOtConsultQ4" label="Geri - OT Consult Q4"/>
      Reasons for referral to social support (OT):
      <LongTextField name="geriOtConsultQ5" label="Geri - OT Consult Q5" />
      Which of the following programmes would you recommend the participant for? (Please select the most appropriate programme)
      <RadioField name="geriOtConsultQ6" label="Geri - OT Consult Q6"/>
      <font color="red"><h2>IF THE PATIENT NEEDS TO GO TO DOCTOR'S CONSULT/ SOCIAL SUPPORT MODALITY THAT YOU RECOMMENDED, PLEASE EDIT ON FORM A.</h2></font>
      
    </Fragment>
  ),

  "Geri - Geri Appt" : (info) => (
    <Fragment>
      <h2>4. Geriatrics Appointment</h2>
      <DisplayIf condition={() => (
        (typeof(info["Geri - Vision"]) !== "undefined" && info["Geri - Vision"].geriVisionQ3 >= 12) ||
        (typeof(info["Geri - Vision"]) !== "undefined" && info["Geri - Vision"].geriVisionQ4 >= 12)
      )}>
        <Fragment>
          <h3>Visual acuity is ≥ 6/12: </h3>
          1) Check if participant is a CHAS card holder (Needs to present CHAS card on site)
          <RadioField name="geriGeriApptQ1" label="Geri - Geri Appt Q1"/>
          2) Check if participant is a SWCDC Resident (Link: http://sis.pa-apps.sg/NASApp/sim/SearchResults.jsp)
          <RadioField name="geriGeriApptQ2" label="Geri - Geri Appt Q2"/>
          <h3>If YES to both, please give either SWCDC Eye Voucher OR Pearl's Optical Voucher:</h3>
          SWCDC Eye Voucher given? - to be given if qn 1 and 2 answers are BOTH 'Yes'
          <RadioField name="geriGeriApptQ3" label="Geri - Geri Appt Q3"/>
          Pearl's Optical Voucher given? - to be given if either qn 1 or qn 2 (or both) answers is 'No'
          <RadioField name="geriGeriApptQ4" label="Geri - Geri Appt Q4"/>
        </Fragment>
      </DisplayIf>

      <DisplayIf condition={() => (
        (typeof(info["Geri - EBAS-DEP"]) !== "undefined" && info["Geri - EBAS-DEP"].geriEbasDepQ9 === "Yes") ||
        (typeof(info["Geri - EBAS-DEP"]) !== "undefined" && info["Geri - EBAS-DEP"].geriEbasDepQ10 === "Yes") ||
        (typeof(info["Geri - PT Consult"]) !== "undefined" && info["Geri - PT Consult"].geriPtConsultQ4 === "Yes") ||
        (typeof(info["Geri - OT Consult"]) !== "undefined" && info["Geri - OT Consult"].geriOtConsultQ4 === "Yes")
      )}>
        <Fragment>
          <h3>Participant is recommended for social support:</h3>
          Persuade participant to go to social support booth and explain that AIC can help
          <SelectField name="geriGeriApptQ5" checkboxes="true" label="Geri - Geri Appt Q5" />
        </Fragment>
      </DisplayIf>

      <h3>3. Eligibility for SWCDC Safe and Bright Homes Programme </h3>
      1) Participants will be eligible for the SWCDC Safe and Bright Homes Programme if they meet the following criteria:<br />i) SWCDC Resident (Link: http://sis.pa-apps.sg/NASApp/sim/SearchResults.jsp)<br />ii) Requires home modification (determined by SAOT) - Refer to Form A<br />
      <RadioField name="geriGeriApptQ6" label="Geri - Geri Appt Q6"/>
      <DisplayIf condition={(context) => (typeof(context.model.geriGeriApptQ6) !== "undefined" && context.model.geriGeriApptQ6 === "Yes, requirement met.")}>
        <Fragment>
          2) Do you wish to sign up for the SWCDC Safe and Bright Homes Programme?<br /><br />Persuade participant to sign up for SWCDC Safe and Bright Homes. <br />Description of the programme: “The Safe and Bright Homes programme aims to develop safer and more energy-efficient homes for senior citizens and persons with disabilities. Safety (e.g. bathroom grab bars, non-slip mats etc), energy and water conservation features (energy-saving bulbs, water thimbles and cistern bags etc) will be installed in selected homes of needy residents. Workshops will also be conducted to teach them how to troubleshoot common household problems. The programme will be spread out over 10 sessions, for about 10 months.”
          <RadioField name="geriGeriApptQ7" label="Geri - Geri Appt Q7"/>
          3) Sign up form for SWCDC filled in?
          <RadioField name="geriGeriApptQ8" label="Geri - Geri Appt Q8"/>
        </Fragment>
      </DisplayIf>
      
      
    </Fragment>
  ),

  "Doctor's Consult" : (info) => (
    <Fragment>
      Doctor's Name:
      <TextField name="doctorSConsultQ1" label="Doctor's Consult Q1"/>
      MCR No.:
      <TextField name="doctorSConsultQ2" label="Doctor's Consult Q2"/>
      Doctor's Memo
      <LongTextField name="doctorSConsultQ3" label="Doctor's Consult Q3" />
      Refer to dietitian?
      <SelectField name="doctorSConsultQ4" checkboxes="true" label="Doctor's Consult Q4" />
      Reason for referral
      <TextField name="doctorSConsultQ5" label="Doctor's Consult Q5"/>
      Does patient require urgent follow up 
      <SelectField name="doctorSConsultQ6" checkboxes="true" label="Doctor's Consult Q6" />
      Completed Doctor’s Consult station. Please check that Form A is filled.
      <SelectField name="doctorSConsultQ7" checkboxes="true" label="Doctor's Consult Q7" />
      
    </Fragment>
  ),

  "Doctor's Consult" : (info) => (
    <Fragment>
      Doctor's Name:
      <TextField name="doctorSConsultQ1" label="Doctor's Consult Q1"/>
      MCR No.:
      <TextField name="doctorSConsultQ2" label="Doctor's Consult Q2"/>
      Doctor's Memo
      <LongTextField name="doctorSConsultQ3" label="Doctor's Consult Q3" />
      Refer to dietitian?
      <SelectField name="doctorSConsultQ4" checkboxes="true" label="Doctor's Consult Q4" />
      Reason for referral
      <TextField name="doctorSConsultQ5" label="Doctor's Consult Q5"/>
      Does patient require urgent follow up
      <SelectField name="doctorSConsultQ6" checkboxes="true" label="Doctor's Consult Q6" />
      Completed Doctor’s Consult station. Please check that Form A is filled.
      <SelectField name="doctorSConsultQ7" checkboxes="true" label="Doctor's Consult Q7" />
      
    </Fragment>
  ),

  "Social Service" : (info) => (
    <Fragment>
      <h2>Social Service Station</h2>
      1. Has the participant visited the social service station?
      <RadioField name="socialServiceQ1" label="Social Service Q1"/>
      2. Brief summary of the participant's concerns
      <LongTextField name="socialServiceQ2" label="Social Service Q2" />
      3. Brief summary of what will be done for the participant (Eg name of scheme participant wants to apply for)
      <LongTextField name="socialServiceQ3" label="Social Service Q3" />
      
    </Fragment>
  ),

  "Feedback Form" : (info) => (
    <Fragment>
      <h2>PHS 2019 Screening Feedback Form <br />公共健康服务 2019 检验反馈表</h2>
      <h3>We would like to know how you felt about our health screening, as well as how you came to know about it :) Your feedback will go a long way in helping us improve our event!<br /> 我们想寻求您对我们公共健康服务 2019 的感受，并且告诉我们您在什么情况下得知这活动的详情! </h3>
      1. I have had a good experience at the PHS 2019 screening.<br /> 我在公共健康服务 2019 中有良好的体验。
      <RadioField name="feedbackFormQ1" label="Feedback Form Q1"/>
      <h3>2. We would like to find out some of the reasons why you came for the PHS 2019 screening. Select all that apply. <br />我们想寻求一些关于您参与此活动的原因</h3>
      a. I came for PHS 2019 because<br /> 我会参与此活动因为
      <SelectField name="feedbackFormQ2" checkboxes="true" label="Feedback Form Q2" />
      <DisplayIf condition={(context) => (typeof(context.model.feedbackFormQ2) !== "undefined" && context.model.feedbackFormQ2.includes("Others (please specify) 其他原因：(请注明)"))}>
        <Fragment>
          Please Specify for "Others" 请注明:
          <TextField name="feedbackFormQ3" label="Feedback Form Q3"/>
        </Fragment>
      </DisplayIf>
      3a.Have you been to PHS before? <br />您是否来过公共健康服务？
      <RadioField name="feedbackFormQ4" label="Feedback Form Q4"/>
      b. If yes, how many times have you been to PHS screening? (including this year) <br />若有，您来过几次？(包括今年）
      <RadioField name="feedbackFormQ5" label="Feedback Form Q5"/>
      4. Have you been to other health screenings/checkups before? <br />您有没有参加过其他的健康检查？
      <RadioField name="feedbackFormQ6" label="Feedback Form Q6"/>
      5. When was your last screening/checkup done? <br />您最近的健康检查是几时做的？
      <RadioField name="feedbackFormQ7" label="Feedback Form Q7"/>
      6. How often do you have a health screening?  <br />您多久会进行一次健康检查？
      <RadioField name="feedbackFormQ8" label="Feedback Form Q8"/>
      7. Are you aware of other screening programmes in your community?<br /> 您是否对社区里的其他健康检查有所认识？
      <RadioField name="feedbackFormQ9" label="Feedback Form Q9"/>
      <DisplayIf condition={(context) => (typeof(context.model.feedbackFormQ9) !== "undefined" && context.model.feedbackFormQ9 === "Others (please specify) 其他 (请注明)")}>
        <Fragment>
          Please Specify for "Others" 请注明:
          <TextField name="feedbackFormQ10" label="Feedback Form Q10"/>
        </Fragment>
      </DisplayIf>
      <h3>8. We would like to find out more about your health beliefs and knowledge. <br />我们想寻求关于您的健康价值观以及健康知识。</h3>
      a. I think I am at risk of getting cancer (colorectal/ breast/ cervical)<br />我认为我有可能患上癌症（大肠癌/乳癌/子宫颈癌）
      <RadioField name="feedbackFormQ11" label="Feedback Form Q11"/>
      b. I think I am at risk of getting chronic diseases <br />我认为我有可能患上慢性疾病 
      <RadioField name="feedbackFormQ12" label="Feedback Form Q12"/>
      c. It is important to me to detect chronic diseases and cancer early <br />我认为早期发现慢性疾病与癌症很重要
      <RadioField name="feedbackFormQ13" label="Feedback Form Q13"/>
      d. I think that health screening is essential to detect chronic diseases and cancer early <br />为了早期发现慢性疾病/癌症，参加健康检查是必须的
      <RadioField name="feedbackFormQ14" label="Feedback Form Q14"/>
      e. I think that going for health screening is (can tick >1 option)<br /> 我认为参加健康检查... （可以选择>1个选项）
      <SelectField name="feedbackFormQ15" checkboxes="true" label="Feedback Form Q15" />
      <h3>9. We would like to find out more about how you felt about our student volunteers.<br /> 您对我们学生义工们的表现有所看法？</h3>
      a. The student volunteers attended to my needs <br />学生义工们有做足我的需求
      <RadioField name="feedbackFormQ16" label="Feedback Form Q16"/>
      b. The student volunteers were well-trained <br />学生义工们有受够专业训练
      <RadioField name="feedbackFormQ17" label="Feedback Form Q17"/>
      c. Others (Please specify) <br />其他意见（请注明）
      <LongTextField name="feedbackFormQ18" label="Feedback Form Q18" />
      10. Do you have any suggestions on how our student volunteers can improve? <br />您有没有建议让我们的学生义工进步？
      <LongTextField name="feedbackFormQ19" label="Feedback Form Q19" />
      <h3>11. Do let us know how you felt about the operational aspects of the screening<br />. 您对此健康检查的执行方式有任何评语？</h3>
      a. The SMS system at the queue was beneficial to me<br /> 排队时使用的简讯系统对我有所帮助
      <RadioField name="feedbackFormQ20" label="Feedback Form Q20"/>
      b. The waiting time to enter the screening was reasonable<br /> 我对等候参与身体检查的时间感到合理
      <RadioField name="feedbackFormQ21" label="Feedback Form Q21"/>
      c. The waiting time for each station was reasonable<br /> 我对身体检查中各检查站的等候时间感到合理
      <RadioField name="feedbackFormQ22" label="Feedback Form Q22"/>
      d. The flow of the screening was easy to follow <br />身体检查的流程易人遵循
      <RadioField name="feedbackFormQ23" label="Feedback Form Q23"/>
      e. Others (Please specify) <br />其他意见（请注明）
      <TextField name="feedbackFormQ24" label="Feedback Form Q24"/>
      12. What else do you think PHS should screen for? <br />您认为公共健康服务还可以检查那些其他的疾病？
      <TextField name="feedbackFormQ25" label="Feedback Form Q25"/>
      13. I would recommend my family and/or friends to come for the PHS 2019 screening. <br />我会推荐家人与朋友来参与公共健康服务 2019 的身体检查。
      <RadioField name="feedbackFormQ26" label="Feedback Form Q26"/>
      14. How did you come to know of the PHS 2019 screening? Select all that apply. <br />您如何认知此活动的智讯？（请在所有适当的空格中打勾）<br />
      <SelectField name="feedbackFormQ27" checkboxes="true" label="Feedback Form Q27" />
      <DisplayIf condition={(context) => (typeof(context.model.feedbackFormQ27) !== "undefined" && context.model.feedbackFormQ27.includes("Others (Please specify) 其他（请注明)"))}>
        <Fragment>
          Please Specify for "Others" 请注明:
          <TextField name="feedbackFormQ28" label="Feedback Form Q28"/>
        </Fragment>
      </DisplayIf>
      15. If you have been contacted for Door-to-Door Publicity, did you learn about healthy ageing/metabolic syndrome through our volunteers/brochure? <br />若您有遇见义工上门宣传您是否从义工们/健康宣传册中学到更多关于健康老龄化/代谢综合症的相关知识？
      <RadioField name="feedbackFormQ29" label="Feedback Form Q29"/>
      16. What else do you want to learn more about through PHS?<br />您还有什么想更加了解/更深入学习的东西吗？
      <TextField name="feedbackFormQ30" label="Feedback Form Q30"/>
      17. Any other feedback? <br />您有其他的意见吗？
      <LongTextField name="feedbackFormQ31" label="Feedback Form Q31" />
      <h2>Thank you for completing this survey! :) <br />谢谢您为我们提供您宝贵的意见！</h2>
      
    </Fragment>
  ),

};