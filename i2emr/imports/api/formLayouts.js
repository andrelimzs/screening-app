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

function getBmi(model) {
  if (typeof(model['hxCancerQ20']) !== "undefined" && typeof(model['hxCancerQ19']) !== "undefined") {
    const bmi = model['hxCancerQ20'] / (model['hxCancerQ19'] / 100) / (model['hxCancerQ19'] / 100)
    return Number(Math.round(bmi+'e2')+'e-2') // rounds to 2dp
  }
}

// Define the layouts
export const formLayouts = {
  "Pre-Registration" : (info) => (
    <Fragment>
      <h2>Pre-Registration</h2>
      Gender
      <RadioField name="preRegistrationQ1" />
      Initials (Surname must be spelt out. E.g. John Tan Soo Keng = Tan S.K.J. ; Alan Simon Lee = A.S. Lee)
      <LongTextField name="preRegistrationQ2" />
      Last 4 digits of NRIC (e.g. 987A)
      <LongTextField name="preRegistrationQ3" />
      Going for Phlebotomy?<br /><br /><i>Conditions:<br />1) Fasted for minimum 8 hours <br />          Note: Water is allowed, coffee/tea is not. Medications are fine. <br />2) NOT previously diagnosed with Diabetes/ High Cholesterol/ High Blood Pressure.<br />3) Have not done a blood test within 1 year.</i>
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
      <DisplayIf condition={(context) => (typeof(context.model.registrationQ2) !== "undefined" && context.model.registrationQ2 === "Others 其他 (please specify):")}>
        <Fragment>
          Please Specify
          <LongTextField name="registrationQ14" />
        </Fragment>
      </DisplayIf>
      Nationality 国籍 <br />Please Note: Non Singapore Citizens/ Non-PRs are unfortunately not eligible for this health<br />screening
      <RadioField name="registrationQ3" />
      Marital Status 婚姻状况
      <SelectField name="registrationQ4" />
      Occupation 工作
      <LongTextField name="registrationQ5" />
      GRC/SMC Subdivision [https://www.parliament.gov.sg/mps/find-my-mp]
      <SelectField name="registrationQ6" />
      Household Income Per Capita
      <SelectField name="registrationQ7" />
      CHAS Status 社保援助计划
      <SelectField name="registrationQ8" />
      Pioneer Generation Status 建国一代配套
      <RadioField name="registrationQ9" />
      <DisplayIf condition={() => (typeof(info["Pre-Registration"]) !== "undefined" && info["Pre-Registration"].preRegistrationQ4 === "Y")}>
        <Fragment>
          <h2>Follow up at GP Clinics</h2>
          <i>Your Health Report & Blood Test Results (if applicable) will be mailed out about <b>4-6 weeks</b> after the screening.  Depending on your results, our team <b>may</b> shortlist you for further follow-up.<br />Scenario 1: If <b>no follow-up</b> is required, the report will be mailed directly to you.<br />Scenario 2: If follow-up is required, you will need to <b>visit a GP clinic</b> to collect your report. <br />Please choose a preferred GP Clinic from the following list in case of Scenario 2.</i> <br/> Some residents such as PRs and residents who have been registered in the National Screening System in the past 3 years will not be eligible. 
          <RadioField name="registrationQ10" />
          Preferred Language for Health Report
          <RadioField name="registrationQ11" />
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
  
  "History Taking" : {
    "Hx HCSR" : (info) => (
      <Fragment>
        <h2>PARTICIPANT IDENTIFICATION</h2>
        <font color="red"><h3>Please verify participant's identity using his/her NRIC before proceeding <br />A. S/N B. Surname followed by Initials C. Last 4 digits of Participant's NRIC and Letter</h3></font>
        <b>Booth number</b> and <b>History-taker's Surname</b> followed by <b>Initials</b><br /><b><font color="red">**On Page 2 of Form A, under Doctor's Consultation (Hx-taking column, 1st row), please write down booth number and history taker's name.**</font><br />(Eg. Booth 18 David Choo Ah Beng = 18 David Choo A B)</b>
        <LongTextField name="hxHcsrQ1" label="Hx HCSR Q1" />
        <h2>HISTORY TAKING PART 1: HEALTH CONCERNS AND SYSTEMS REVIEW</h2>
        <b>TAKE 1ST BP READING NOW & RECORD ON FORM A.</b> Ensure participant is comfortable at rest before measuring their BP. They should not have taken caffeine or smoked in the past 30 minutes either. <br /> <br />
        <b><font color="red">IF SYSTOLIC  ≥ 180 AND/OR DIASTOLIC ≥ 110 mmHg, please take a second reading and ask for symptoms of malignant hypertension (severe headache, giddiness, numbness in extremities,blurred vision etc.)</font></b>
        <h2>1. HEALTH CONCERNS</h2>
        If the participant has any <b>presenting complaints or concern(s)</b>, please take a <b>brief history. (Please write NIL if otherwise).</b><br />E.g.<b>"Do you have any health issues that you are currently concerned about?"</b> "最近有没有哪里不舒服？”<br /> <br /><font color="red"><b><u>Please advise that there will be no diagnosis or prescription made at our screening.</u></b></font> Kindly advise the participant to see a GP/polyclinic instead if he/she is expecting treatment for their problems.<br /> <br /><b>REFER TO DR CONSULT</b> under Form A if <b>worrying problems / participant strongly insists or if you feel 'Health Concerns' requires closer scrutiny by doctors later.</b><br />Indicate for Doctor's Consultation station under: <br />1) Tick eligibility, Circle interested 'Y' on Page 1 of Form A<br />2) Write reasons on Page 2 of Form A Doctor's Consultation - Reasons for Recommendation 
        Reasons for recommendation
        <LongTextField name="hxHcsrQ2" label="Hx HCSR Q2" />
        <h2>2. SYSTEMS REVIEW</h2>
        <b>Please rule out red flags based on <font color="red"><u>participants's health concerns.</u></font> (Please write NIL if otherwise)</b><br /><br />Below is a non-exhaustive list of possible red flags:<br />- Constitutional Symptoms: LOA, LOW, Fever<br />- CVS: Chest pain, Palpitations<br />- Respi: SOB, Haemoptysis, Night Sweat, Cough<br />- GI: change in BO habits, PR bleed, Haematemesis<br />- Frequent falls<br /><br /><b>REFER TO DR CONSULT</b> under Form A if <b>worrying problems / participant strongly insists or if you feel 'Health Concerns' requires closer scrutiny by doctors later.</b><br />Indicate for Doctor's Consultation station under: <br />1) Tick eligibility, Circle interested 'Y' on Page 1 of Form A <br />2) Write reasons on Page 2 of Form A Doctor's Consultation - Reasons for Recommendation         Reasons for recommendation
        <LongTextField name="hxHcsrQ3" label="Hx HCSR Q3" /> 
        <br /> 2a. <b> <font color="blue">Do you have any problems passing urine or motion? Please specify if yes.</font> <br /><font color="red">REFER TO DR CONSULT and EXHIBITION SFCS booth if have urinary/bowel problem.</font> Indicate on: <br />1) Tick eligibility, Circle interested 'Y' on Page 1 of Form A <br />2) Write reasons on Page 2 of Form A Doctor's Consultation - Reasons for Recommendation <br />3) Page 2 of Form A, under Exhibition - Recommendation, tick renal and bladder health, write down SFCS booth. </b>
        <RadioField name="hxHcsrQ4" label="Hx HCSR Q4"/>
        <DisplayIf condition={(context) => (typeof(context.model.hxHcsrQ4) !== "undefined" && context.model.hxHcsrQ4 === "Yes, (Please specify):")}>
          <Fragment>
            Please specify:
            <LongTextField name="hxHcsrQ5" label="Hx HCSR Q5" />
          </Fragment>
        </DisplayIf>
        2b. <b><font color="blue">Do you have any vision problems? Please specify if yes. Exclude complaints like unspecific itchy eyes etc</font><br /><font color="red">REFER TO DR CONSULT if have vision problems for 40-59. For 60 and above, indicate for Geriatrics - Geriatrics Functional Screening includes vision screening. </font><br />Indicate on: <br />1) Tick eligibility, Circle interested 'Y' on Page 1 of Form A <br />2) Write reasons on Page 2 of Form A Doctor's Consultation - Reasons for Recommendation </b>
        <RadioField name="hxHcsrQ6" label="Hx HCSR Q6"/>
        <DisplayIf condition={(context) => (typeof(context.model.hxHcsrQ6) !== "undefined" && context.model.hxHcsrQ6 === "Yes, (Please specify):")}>
          <Fragment>
            Please specify:
            <LongTextField name="hxHcsrQ7" label="Hx HCSR Q7" />
          </Fragment>
        </DisplayIf>
        2c. <b><font color="blue">Do you have any hearing problems? Please specify if yes. </font><br /><font color="red">REFER TO DR CONSULT if have hearing problem for 40-59. Please give the participant the PHS Hearing Questionnaire 2019, remind them to complete it by themselves before passing it to the doctors at doctor's consult. For 60 and above, indicate for Geriatrics - Geriatrics Functional Screening includes audiometry screening.</font><br />Indicate on: <br />1) Tick eligibility, Circle interested 'Y' on Page 1 of Form A <br />2) Write reasons on Page 2 of Form A Doctor's Consultation - Reasons for Recommendation </b>
        <RadioField name="hxHcsrQ8" label="Hx HCSR Q8"/>
        <DisplayIf condition={(context) => (typeof(context.model.hxHcsrQ8) !== "undefined" && context.model.hxHcsrQ8 === "Yes, (Please specify):")}>
          <Fragment>
            Please specify:
            <LongTextField name="hxHcsrQ9" label="Hx HCSR Q9" />
          </Fragment>
        </DisplayIf>
        
      </Fragment>
    ),

    "Hx NSS" : (info) => (
      <Fragment>
        <h2>HISTORY TAKING PART 2: NSS HEALTH AND LIFESTYLE QUESTIONNAIRE</h2>
        <font color="red"><h3>Please go through NSS Questionnaire now.</h3></font>
        <h2>1. Past Medical History</h2>
        1a. Has a doctor ever told you that you have the following condition? Please tick the appropriate box(es) if the answer is "Yes" to any of the conditions listed below, or tick the last box if you have none.
        <SelectField name="hxNssQ1" checkboxes="true" label="Hx NSS Q1" />
        <font color="red"><b>For respondent with known hypertension, diabetes, high cholesterol and stroke only.</b></font><br />2a. Are you currently on follow up with a doctor for the existing conditions you have indicated?
        <RadioField name="hxNssQ2" label="Hx NSS Q2"/>
        <DisplayIf condition={(context) => (typeof(context.model.hxNssQ2) !== "undefined" && context.model.hxNssQ2 === "Yes (please answer question below)")}>
          <Fragment>
            (Only proceed when answered "Yes" to the previous question)
            <SelectField name="hxNssQ3" checkboxes="true" label="Hx NSS Q3" />
            <DisplayIf condition={(context) => (typeof(context.model.hxNssQ3) !== "undefined" && context.model.hxNssQ3.includes("No, the last appointment was > 1 year ago (Please proceed to Q2b and 2c)"))}>
              <Fragment>
                2b. What is the reason that you are not following up with your doctor for your existing conditions such as diabetes, high cholesterol, high blood pressure and stroke?
                <SelectField name="hxNssQ4" checkboxes="true" label="Hx NSS Q4" />
              </Fragment>
            </DisplayIf>
          </Fragment>
        </DisplayIf>
        <h5>2c. Are you currently being prescribed any medication for any of the conditions below?</h5>
        Hypertension** (High Blood Pressure)
        <RadioField name="hxNssQ5" label="Hx NSS Q5"/>
        Diabetes** (High Blood Sugar)
        <RadioField name="hxNssQ6" label="Hx NSS Q6"/>
        High Cholesterol**
        <RadioField name="hxNssQ7" label="Hx NSS Q7"/>
        Stroke** <font color="blue"><b>(including transient ischaemic attack)</b></font>
        <RadioField name="hxNssQ8" label="Hx NSS Q8"/>
        <h3>PLEASE TAKE 2ND BP READING NOW AND RECORD ON FORM A.<br /><br /></h3>
        Hypertension criteria:<br />○ Younger participants: > 140/90<br />○ Participants > 80 years old: > 150/90 <br />○ CKD w proteinuria (mod to severe albuminuria): > 130/80<br />○ DM: > 130/80<br /> <br /> <b>REFER TO DR CONSULT: (FOR THE FOLLOWING SCENARIOS)<br />1) Tick eligibility, Circle interested 'Y' on Page 1 of Form A  <br />2) Write reasons on Page 2 of Form A Doctor's Consultation - Reasons for Recommendation   <br /><br /> <font color="red">HYPERTENSIVE EMERGENCY<br />• SYSTOLIC  <mark>≥ 180</mark> AND/OR DIASTOLIC ≥ <mark>110 mmHg</mark> AND <mark><u>SYMPTOMATIC</u></mark> (make sure pt has rested and 2nd reading was taken)<br /><mark>o ASK THE DOCTOR TO COME AND REVIEW!</mark><br /> <br />HYPERTENSIVE URGENCY<br />• SYSTOLIC  <mark>≥ 180</mark> AND/OR DIASTOLIC ≥ <mark>110 mmHg</mark> AND <mark>ASYMPTOMATIC</mark> (make sure pt has rested and 2nd reading was taken)<br />o ESCORT TO DC DIRECTLY!<br />o Follow the patient, continue clerking the patient afterward if doctor acknowledges patient is well enough to continue the screening<br /><br />RISK OF HYPERTENSIVE CRISIS<br />• IF SYSTOLIC between <mark>160 - 180 mmHg</mark> <br />• IF <mark>ASYMPTOMATIC</mark>, continue clerking. <br />• IF <mark>SYMPTOMATIC</mark>, ESCORT TO DC DIRECTLY!<br /><br />If systolic between 140 - 160 mmHg: </font><br />o Ask for:<br />- Has hypertension been pre-diagnosed? If not, refer to DC (possible new HTN diagnosis)<br />- If diagnosed before, ask about compliance and whether he/she goes for regular follow up? If non-compliant or not on regular follow-up, refer to DC (chronic HTN, uncontrolled).</b>
        <font color="blue"><h3>THE FOLLOWING QUESTIONS ARE NOT PART OF NSS QUESTIONNAIRE. PLEASE ASK THE PARTICIPANT ACCORDINGLY. </h3></font>
        <font color="blue"><b>2d. Are you on any types of medications not listed above? (includes use of traditional medicine)</b></font>
        <RadioField name="hxNssQ9" label="Hx NSS Q9"/>
        <DisplayIf condition={(context) => (typeof(context.model.hxNssQ9) !== "undefined" && context.model.hxNssQ9 === "Yes, (Please specify):")}>
          <Fragment>
            Please specify:
            <LongTextField name="hxNssQ10" label="Hx NSS Q10" />
          </Fragment>
        </DisplayIf>
        <font color="blue"><b>2e. Please tick to highlight if you feel 'Past Medical History' requires closer scrutiny by doctors later. (If indicated 'Yes', please complete the question below.)</b></font>
        <RadioField name="hxNssQ11" label="Hx NSS Q11"/>
        <DisplayIf condition={(context) => (typeof(context.model.hxNssQ11) !== "undefined" && context.model.hxNssQ11 === "Yes")}>
          <Fragment>
            <h2>Only complete Q2f if you are referring participant to Doctor's Consultation station.</h2>
            <font color="blue"><b>2f. Based on <u>participant's history taken thus far</u>, please summarise his/her <mark>RELEVANT</mark> Past Medical History briefly for the doctors to refer to during doctors consultation.<br />1) Conditions<br />2) Duration <br />3) Control <br />4) Compliance <br />5) Complications <br />6) Follow up route (specifiy whether GP/Polyclinic/FMC/SOC)</b></font> <br /> <br />If participant is not engaged with any follow-up, ask "what is the reason that you re not following up with your doctor for your existing conditions?" <br />- e.g. do not see the purpose for tests, busy/ no time, lack of access e.g. mobility issues, financial issues, fear of doctors/ clinics/ hospitals etc <br /><br />If a participant is not compliant to medications, do probe further on his/her reasons for not consuming medications as prescribed. <br />- Medication not effective? Can be managed without medication? Forget to take? Lost/Ran out of medication?
            <LongTextField name="hxNssQ12" label="Hx NSS Q12" />
          </Fragment>
        </DisplayIf>
        <b>Based on participant medical hx, please recommend relevant stations:<br />1) Doctor's Consultation station, tick eligibility, Circle interested 'Y' on Page 1 of Form A <br />2) Write reasons on Page 2 of Form A Doctor's Consultation - Reasons for Recommendation<br />3) Relevant exhibition booths on page 2 of form A. Indicate accordingly for past history of DM / CVS Disease (including HTN, HLD, IHD) / CVA.</b><br /><br />For participant with DM, refer to DC if:<br />• Symptomatic, and non-compliant <br />• Asymptomatic, but non-compliant<br />Also, refer to DC if participant has not been diagnosed with DM, but has signs of DM (polyuria, polydipsia, periphery neuropathy, blurring of vision etc)
        <font color="red"><h3>CONTINUE REFERRING TO NSS QUESTIONNAIRE. </h3></font>
        3. Have your immediate family members (parents/ siblings/ children) ever been diagnosed/ told by a doctor that they have any of the chronic condition(s) listed below? Please tick if the answer is "Yes" to any of the conditions. You may select more than one. Please tick the last box if they have none.
        <SelectField name="hxNssQ13" checkboxes="true" label="Hx NSS Q13" />
        4. Do you smoke?
        <RadioField name="hxNssQ14" label="Hx NSS Q14"/>
        <h3>If participant is a smoker, recommend HPB iQuit exhibition booth on Page 2 of Form A.</h3>
        5. Do you consume alcoholic drinks? (Note: Standard drink means a shot of hard liquor, a can or bottle of beer, or a glass of wine.)
        <RadioField name="hxNssQ15" label="Hx NSS Q15"/>
        6. Do you consciously try to eat more fruits, vegetables, whole grain and cereals? Please tick where applicable.
        <SelectField name="hxNssQ16" checkboxes="true" label="Hx NSS Q16" />
        7. Do you exercise or participate in any form of moderate physical activity for at least 150 minutes OR intense physical activity at least 75 minutes throughout the week? Note: Examples of physical activity includes exercising, walking, playing sports, washing your car, lifting/ moving moderately heavy luggage and doing housework.
        <RadioField name="hxNssQ17" label="Hx NSS Q17"/>
        <b>Counsel for positive diet and lifestyle modification if deemed necessary. Refer to dietitian at Doctor's Consultation station, Indicate: 1) Tick eligibility, Circle interested 'Y' on Page 1 of Form A 2) Write reasons under dietitian referral on Page 2 of Form A Doctor's Consultation - Reasons for Recommendation</b><br /><br />Indicate Smoking/Alcohol Consumption on Page 2 of Form A for exhibition ambassadors if applicable. Smoking cessation engagement by HPB iQuit.<br />Recommend for lifestyle follow up on Page 2 of Form A if you deem necessary.
        <h5>8. When was the last time you had a blood test to check for hypertension, diabetes and cholesterol? Please answer all.</h5>
        Hypertension
        <RadioField name="hxNssQ18" label="Hx NSS Q18"/>
        Diabetes
        <RadioField name="hxNssQ19" label="Hx NSS Q19"/>
        High Cholesterol
        <RadioField name="hxNssQ20" label="Hx NSS Q20"/>
        <font color="red"><h3>Please encourage participants to go for Phlebotomy screening every 3 years if relevant risk factors absent. If present, counsel for yearly screening.</h3></font>
        9. Has your doctor told you that the blood vessels to your limbs are diseased and have become narrower (periphery artery disease) or that any other major blood vessels in your body have weakened walls that have "ballooned out" (aneurysm)?
        <RadioField name="hxNssQ21" label="Hx NSS Q21"/>
        <h3>PLEASE TAKE 3RD BP READING (IF MORE THAN 5MMHG) AND RECORD ON FORM A.</h3>
        
      </Fragment>
    ),

    "Hx Social" : (info) => (
      <Fragment>
        <font color="blue"><h2>THE FOLLOWING QUESTIONS ARE NOT PART OF NSS QUESTIONNAIRE. PLEASE ASK THE PARTICIPANT ACCORDINGLY. </h2></font>
        <h2>HISTORY TAKING PART 3: SOCIAL HISTORY</h2>
        <h2>1. DIET AND EXERCISE<br /><font color="red">(Taken in NSS Questionnaire portion earlier on)</font></h2>
        <h2>2. FINANCIAL STATUS<br /><font color="red">Please refer to page 1 of Form A for following questions.</font></h2>
        1. Current CHAS status? 
        <b>
        {info["Registration"] && 
        info["Registration"].registrationQ8} <br />
        </b>
        2. For participants born before 1949. Pioneer Generation Card? 
        <b>
        {info["Registration"] &&
          info["Registration"].registrationQ9} <br /><br />
        </b>
        3. Are you currently on any other Government Financial Assistance, other than CHAS and PG (e.g. Public Assistance Scheme)?
        <RadioField name="hxSocialQ1" label="Hx Social Q1"/>
        <DisplayIf condition={(context) => (typeof(context.model.hxSocialQ1) !== "undefined" && context.model.hxSocialQ1 === "Yes, (Please specify):")}>
          <Fragment>
            Please specify
            <LongTextField name="hxSocialQ2" label="Hx Social Q2" />
          </Fragment>
        </DisplayIf>
        <font color="red"><h3>PLEASE REFER TO PAGE 2 OF NSS FORM FOR RESPONSES. PLEASE ASK MORE as NECESSARY. </h3></font>
        4a. What is the average earnings of participant's household per month? (Refer to NSS Form Page 2, Put 'NIL' if participant unable to provide)
        <RadioField name="hxSocialQ3" label="Hx Social Q3"/>
        4b. Number of household members (including yourself): 
        <LongTextField name="hxSocialQ4" label="Hx Social Q4"/>
        4c. Do you want to apply for CHAS card? (if you are currently not on CHAS but qualify) <br />
        <img src='/images/hx/chas.jpg' alt='CHAS' /> <br />
        <RadioField name="hxSocialQ5" label="Hx Social Q5"/>
        <DisplayIf condition={(context) => (typeof(context.model.hxSocialQ5) !== "undefined" && context.model.hxSocialQ5 === "No, I qualify but...(Please specify the reasons for not applying if you qualify):" || context.model.hxSocialQ5 === "Yes, (Please specify):")}>
          <Fragment>
            Please specify
            <LongTextField name="hxSocialQ6" label="Hx Social Q6"/>
          </Fragment>
        </DisplayIf>
        5. Do you need advice on financial schemes that are available in Singapore or require further financial assistance?
        <RadioField name="hxSocialQ7" label="Hx Social Q7"/>
        <DisplayIf condition={(context) => (typeof(context.model.hxSocialQ7) !== "undefined" && context.model.hxSocialQ7 === "Yes, (Please specify):")}>
          <Fragment>
            Please specify
            <LongTextField name="hxSocialQ8" label="Hx Social Q8"/>
          </Fragment>
        </DisplayIf>
        <b>REFER TO SOCIAL SERVICE STATION</b> if participant is in need of <b>financial aid.</b>  <br />Indicate for Social Service station on:  <br /><b>1) Tick eligibility, Circle interested 'Y' on Page 1 of Form A <br />2) Write reasons for referral on the right column</b><br /><br />Note the following criteria for your assessment: (wef from 1st Nov 2019)<br />Per-capita monthly income for CHAS: <b>Green Card: Above $2000; Orange Card: $1201- $2000; Blue Card: $1200 and below</b>
        <h2>3. SOCIAL ISSUES</h2>
        1. Are you caring for a loved one?
        <RadioField name="hxSocialQ9" label="Hx Social Q9"/>
        <DisplayIf condition={(context) => (typeof(context.model.hxSocialQ9) !== "undefined" && context.model.hxSocialQ9 === "Yes")}>
          <Fragment>
            2. If you are caring for a loved one, do you need training?
            <RadioField name="hxSocialQ10" label="Hx Social Q10"/>
            3. Do you need assistance? (eg funds to hire a helper / funds to offset caretaking costs, subsidies for home healthcare items, arranging for short term care in nursing homes/senior care centres)
            <RadioField name="hxSocialQ11" label="Hx Social Q11"/>
          </Fragment>
        </DisplayIf>
        4. Do you require social support?
        <RadioField name="hxSocialQ12" label="Hx Social Q12"/>
        <b>REFER TO SOCIAL SERVICE STATION if participant has social issues that require further consult.<br />Indicate for Social Service station on:  <br />1) Tick eligibility, Circle interested 'Y' on Page 1 of Form A <br />2) Write reasons for referral on the right column</b>
        <h2>4. ORAL ISSUES</h2>
        <b>Please do a quick inspection of participant's oral health status: <br />1. Lips, Tongue, Gums & Tissues (Healthy - pink and moist)<br />2. Natural Teeth, Oral Cleanliness & Dentures (Tooth/Root decay, no cracked/broken dentures, No food particles/tartar in mouth)<br />3. Saliva status (free-flowing) and Any dental pain </b>
        1. How is the participant's Oral Health?
        <RadioField name="hxSocialQ13" label="Hx Social Q13"/>
        2. Would you like to go through free Oral Health screening by NUS Dentistry dentists and students?
        <RadioField name="hxSocialQ14" label="Hx Social Q14"/>
        <b>REFER TO NUS DENTISTRY ORAL SCREENING if participant has <mark>poor dental hygiene</mark> and <mark>interested</mark> to go through dental screening for participants aged <mark>40-59</mark>. <font color="red">For participants 60 and above, functional screening includes oral screening.</font><br />Indicate for Dentistry on:  <br />1) Tick eligibility, Circle interested 'Y' on Page 1 of Form A <br />2) Write reasons for referral on the right column</b>
        
      </Fragment>
    ),

    "Hx Cancer" : (info) => (
      <Fragment>
        <h2>HISTORY TAKING PART 4: CANCER SCREENING</h2>
        <h2>1. HISTORY OF CANCER & FAMILY HISTORY</h2>
        <b><font color="blue">1. Has a doctor ever told you that you have the following conditions?</font>Do be sensitive when asking for personal history of cancer. (please select all that apply)</b> 
        <SelectField name="hxCancerQ1" checkboxes="true" label="Hx Cancer Q1" />
        <DisplayIf condition={(context) => (typeof(context.model.hxCancerQ1) !== "undefined" && context.model.hxCancerQ1.length !== 0 && !context.model.hxCancerQ1.includes("No, I don't have any of the above"))}>
          <Fragment>
            Please specify:
            <LongTextField name="hxCancerQ26" label="Hx Cancer Q26" />
          </Fragment>
        </DisplayIf>
        <b><font color="blue">2. Is there positive family history (AMONG FIRST DEGREE RELATIVES) for the following cancers?</font></b>
        <SelectField name="hxCancerQ2" checkboxes="true" label="Hx Cancer Q2" />
        <DisplayIf condition={(context) => (typeof(context.model.hxCancerQ2) !== "undefined" && context.model.hxCancerQ2.length !== 0  && !context.model.hxCancerQ2.includes("No"))}>
          <Fragment>
            Please specify:
            <LongTextField name="hxCancerQ3" label="Hx Cancer Q3" />
          </Fragment>
        </DisplayIf>
        <b><font color="blue">3. Any other significant family history?</font></b> Indicate 'NIL' if none. 
        <LongTextField name="hxCancerQ4" label="Hx Cancer Q4" />
        <b>Counsel for screening if positive family history of cancer or chronic disease. <br /><br />Based on participant family hx, please recommend FIT/WCE and Doctor's Consultation (if applicable) <br />1) Tick eligibility, Circle interested 'Y' on Page 1 of Form A  <br />2) Write reasons on Page 2 of Form A Doctor's Consultation - Reasons for Recommendation   <br />3) Recommend relevant exhibition booths on Page 2 of Form A Exhibition - Recommendation<br /></b>
        <font color="red"><h3>CONTINUE REFERRING TO NSS QUESTIONNAIRE. </h3></font>
        <h2>2. NSS CANCER SCREENING PRACTICES SURVEY.</h2>
        <font color="red"><b>1. For respondent aged 50 and above only,</b></font> unless positive family history for colorectal cancer.<br />When was the last time you had a blood stool test? (A blood stool test is a test to determine whether the stool contains blood.)
        <RadioField name="hxCancerQ5" label="Hx Cancer Q5"/>
        <font color="red"><b>2. For respondent aged 50 and above only,</b></font> unless positive family history for colorectal cancer.<br />When was the last time you had a colonoscopy? (A colonoscopy is an examination in which a tube is inserted in the rectum to view the colon for signs of cancer or other health problems.)
        <RadioField name="hxCancerQ6" label="Hx Cancer Q6"/>
        <font color="red"><b>Please encourage participants to go for FIT every year if participant is above 50, asymptomatic and no positive family history of colorectal cancer in first degree relatives. <br />If deemed to be in high risk (positive family history of colorectal cancer in first degree relatives, counsel for colonoscopy every 3 years), refer to risk categorization given.</b></font><br /><br />
        <font color="red"><b>3. For female respondent aged 40 and above only.</b></font><br />When was the last time you had your last mammogram? (A mammogram is an x-ray of each breast to look for breast cancer.)
        <RadioField name="hxCancerQ7" label="Hx Cancer Q7"/>
        <font color="red"><b>4. For female respondent aged 25 and above, who have/had a husband/boyfriend and not had their womb completely surgically removed only.</b></font><br />When was the last time you had a PAP smear test? (A PAP smear test is a simple test involving the scrapping of cells fom the mouth of the womb, to check for changes in the cells of your cervix, which may develop into cancer later.)
        <RadioField name="hxCancerQ8" label="Hx Cancer Q8"/>
        <b><font color="red">For women 40-49, advise yearly mammogram. 50-69, advise mammogram every 2 years. 70 and above and if interested, refer to WCE.<br />Please encourage participants to go for HPV test every 5 years. <br />Refer to WCE: </font><br />1) Tick eligibility, Circle interested 'Y' on Page 1 of Form A</b><br /><br />
        <b>If participant has a <mark>history of cancer</mark> or if <mark>participant's family history</mark> requires further scrutiny by doctors, refer to doctor's consult. <font color="red">(If indicated 'Yes', please complete the question below.)</font></b>
        <RadioField name="hxCancerQ9" label="Hx Cancer Q9"/>
        <DisplayIf condition={(context) => (typeof(context.model.hxCancerQ9) !== "undefined" && context.model.hxCancerQ9 === "Yes")}>
          <Fragment>
            <h2>Only complete Q6 if you are referring participant to Doctor's Consultation station.</h2>
            6. Based on participant's history taken thus far, please summarise his/her RELEVANT Family History briefly for the doctors to refer to during doctors consultation.<br /><br />1) Participant's history of Cancers (if any)<br />2) Positive family history of medical conditions in first-degree relatives:<br />3) Positive family history of Cancers (Cervical, Breast, Colorectal)
            <LongTextField name="hxCancerQ10" label="Hx Cancer Q10" />
          </Fragment>
        </DisplayIf>
        <h2>3. VITALS</h2>
        <h3>Please fill in the participant's BP and BMI based on what you earlier recorded on Form A and copy to NSS form too.</h3>
        <b><u>1) BLOOD PRESSURE</u></b> (Before measuring BP: ensure no caffeine, anxiety, running and smoking in the last 30 minutes.)<br />
        1st Reading Systolic (units in mmHg) <br />
        <NumField name="hxCancerQ11" label="Hx Cancer Q11" /> <br />
        1st Reading Diastolic (units in mmHg) <br />
        <NumField name="hxCancerQ12" label="Hx Cancer Q12" /> <br />
        <DisplayIf condition={(context) => (
          typeof(context.model.hxCancerQ11) !== "undefined" && context.model.hxCancerQ11 > 140 ||
          typeof(context.model.hxCancerQ12) !== "undefined" && context.model.hxCancerQ12 > 90
          )}>
          <Fragment>
            <font color="red"><b>BP HIGH!</b></font> <br />
          </Fragment>
        </DisplayIf>
        2nd Reading Systolic (units in mmHg) <br />
        <NumField name="hxCancerQ13" label="Hx Cancer Q13" /> <br />
        2nd Reading Diastolic (units in mmHg) <br />
        <NumField name="hxCancerQ14" label="Hx Cancer Q14" /> <br />
        <DisplayIf condition={(context) => (
          typeof(context.model.hxCancerQ13) !== "undefined" && context.model.hxCancerQ13 > 140 ||
          typeof(context.model.hxCancerQ14) !== "undefined" && context.model.hxCancerQ14 > 90
          )}>
          <Fragment>
            <font color="red"><b>BP HIGH!</b></font> <br />
          </Fragment>
        </DisplayIf>
        3rd Reading Systolic (ONLY if 1st and 2nd systolic reading differ by <b>>5mmHg</b>) <br />
        <NumField name="hxCancerQ15" label="Hx Cancer Q15" /> <br />
        3rd Reading Diastolic (ONLY if 1st and 2nd systolic reading differ by >5mmHg) <br />
        <NumField name="hxCancerQ16" label="Hx Cancer Q16" /> <br />
        <DisplayIf condition={(context) => (
          typeof(context.model.hxCancerQ15) !== "undefined" && context.model.hxCancerQ15 > 140 ||
          typeof(context.model.hxCancerQ16) !== "undefined" && context.model.hxCancerQ16 > 90
          )}>
          <Fragment>
            <font color="red"><b>BP HIGH!</b></font> <br />
          </Fragment>
        </DisplayIf>
        Average Reading Systolic (average of closest 2 readings):
        <NumField name="hxCancerQ17" label="Hx Cancer Q17" /> <br />
        Average Reading Diastolic (average of closest 2 readings):
        <NumField name="hxCancerQ18" label="Hx Cancer Q18" /> <br />
        Hypertension criteria:<br />○ Younger participants: > 140/90<br />○ Participants > 80 years old: > 150/90 <br />○ CKD w proteinuria (mod to severe albuminuria): > 130/80<br />○ DM: > 130/80<br /> <br /><b>REFER TO DR CONSULT: (FOR THE FOLLOWING SCENARIOS)<br />1) Tick eligibility, Circle interested 'Y' on Page 1 of Form A  <br />2) Write reasons on Page 2 of Form A Doctor's Consultation - Reasons for Recommendation   <br /><br /><font color="red"><u>HYPERTENSIVE EMERGENCY</u><br />• SYSTOLIC  <mark>≥ 180</mark> AND/OR DIASTOLIC ≥ <mark>110 mmHg</mark> AND <mark><u>SYMPTOMATIC</u></mark> (make sure pt has rested and 2nd reading was taken)<br />o <mark>ASK THE DOCTOR TO COME AND REVIEW!</mark><br /> <br /><u>HYPERTENSIVE URGENCY</u><br />• SYSTOLIC  <mark>≥ 180</mark> AND/OR DIASTOLIC <mark>≥ 110 mmHg</mark> AND <mark>ASYMPTOMATIC</mark> (make sure pt has rested and 2nd reading was taken)<br />o ESCORT TO DC DIRECTLY!<br />o Follow the patient, continue clerking the patient afterward if doctor acknowledges patient is well enough to continue the screening<br /><br /><u>RISK OF HYPERTENSIVE CRISIS</u><br />• IF SYSTOLIC between <mark>160 - 180 mmHg</mark> <br />• IF <mark>ASYMPTOMATIC</mark>, continue clerking. <br />• IF <mark>SYMPTOMATIC</mark>, ESCORT TO DC DIRECTLY!<br /><br /><u>If systolic between 140 - 160 mmHg:</u></font><br />o Ask for:<br />- Has hypertension been pre-diagnosed? If not, refer to DC (possible new HTN diagnosis)<br />- If diagnosed before, ask about compliance and whether he/she goes for regular follow up? If non-compliant or not on regular follow-up, refer to DC (chronic HTN, uncontrolled).<br /></b>
        <h2><u>2) BMI</u></h2>
        Height (in cm) <br />
        <NumField name="hxCancerQ19" label="Hx Cancer Q19" /> <br />
        Weight (in kg) <br />
        <NumField name="hxCancerQ20" label="Hx Cancer Q20" /> <br />
        <SomeComp calculation={(model) => (
          <h3>
            BMI:
              {model['hxCancerQ21'] = getBmi(model)}
          </h3>
        )} />
        <br /><br />
        2a. Has a doctor ever told you that you are overweight or obese before?
        <RadioField name="hxCancerQ22" label="Hx Cancer Q22"/>
        2b. Please tick to highlight if you feel BMI or BP requires closer scrutiny by doctors and dietitians later. 
        <BoolField name="hxCancerQ23" label="Hx Cancer Q23"/>
        <b>REFER TO DR CONSULT at: <br />1) <font color="red">Doctor's Consultation station</font>, tick eligibility, Circle interested 'Y' on Page 1 of Form A <br />2) Write reasons on Page 2 of Form A Doctor's Consultation - Reasons for Recommendation, <br />IF BMI IS:<br />≥ 23 as overweight (if positive for other risk factors) and ≥ 27.5 as obese, write reasons under dietitian referral on Page 2 of Form A Doctor's Consultation - Reasons for Recommendation<br /></b>
        <h3><u>3) Waist Circumference</u> (taken only if cannot measure BMI e.g. wheelchair, prosthetic legs)</h3>
        Waist Circumference (in cm) <br />
        <NumField name="hxCancerQ24" label="Hx Cancer Q24" /> <br />
        <h2>HISTORY TAKING PART 5: REFERRALS/MEGA SORTING STATION </h2>
        1. REFERRALS<br />Please reference page 1 of form A for various criteria.
        <SelectField name="hxCancerQ25" checkboxes="true" label="Hx Cancer Q25" />
        
      </Fragment>
    ),
  },

  "FIT" : (info) => (
    <Fragment>
      <h2>PARTICIPANT IDENTIFICATION</h2>
      <h3><font color="red">Please verify participant's identity using his/her NRIC before proceeding <br />A. S/N B. Surname followed by Initials C. Last 4 digits of Participant's NRIC and Letter</font></h3>
      <h2>1. NSS CANCER SCREENING PRACTICES SURVEY.</h2>
      1. <font color="red"><b>For respondent aged 50 and above only,</b></font> unless positive family history for colorectal cancer.<br />When was the last time you had a blood stool test? (A blood stool test is a test to determine whether the stool contains blood.)
      <h2><font color="green">{info["Hx Cancer"] && info["Hx Cancer"].hxCancerQ5}</font></h2>
      2. <font color="red"><b>For respondent aged 50 and above only,</b></font> unless positive family history for colorectal cancer.<br />When was the last time you had a colonoscopy? (A colonoscopy is an examination in which a tube is inserted in the rectum to view the colon for signs of cancer or other health problems.)
      <h2><font color="green">{info["Hx Cancer"] && info["Hx Cancer"].hxCancerQ6}</font></h2>
      <h3><font color="red">Please encourage participants to go for FIT every year if participant is above 50, asymptomatic and no positive family history of colorectal cancer in first degree relatives.</font> </h3>
      Does participant has a history of cancer or his/her family history requires further scrutiny by doctors?<font color="red"><b>(If indicated 'Yes', please refer to doctor's consult by following the steps below.)</b></font> 
      <RadioField name="fitQ1" label="FIT Q1"/>
      <DisplayIf condition = {(context) => (typeof(context.model.fitQ1) !== undefined && context.model.fitQ1 === 'Yes')} >
        <Fragment>
          <b>REFER TO DR CONSULT</b> by indicating on: <br />1) Tick eligibility, Circle interested 'Y' on Page 1 of Form A under Doctor's Consultation row<br />2) Write reasons on Page 2 of Form A Doctor's Consultation - Reasons for Recommendation
        </Fragment>
      </DisplayIf>
      3. Was participant issued 2 FIT kits?
      <RadioField name="fitQ2" label="FIT Q2"/>
      
    </Fragment>
  ),

  "WCE" : (info) => (
    <Fragment>
      <h2>PARTICIPANT IDENTIFICATION</h2>
      <h3><font color="red">Please verify participant's identity using his/her NRIC before proceeding <br />A. S/N B. Surname followed by Initials C. Last 4 digits of Participant's NRIC and Letter</font></h3>
      <h2>1. FINANCIAL STATUS<br /></h2>
      <font color="red"><b>Please refer to page 1 of Form A for following questions.</b></font>
      1. Current CHAS status?
      <h2><font color="green">{info["Registration"] && 
        info["Registration"].registrationQ8}</ font></h2>
      2. For participants born before 1949. Pioneer Generation Card? 
      <h2><font color="green">{info["Registration"] && 
        info["Registration"].registrationQ9}</ font></h2>
      3. Are you currently on any other Government Financial Assistance, other than CHAS and PG (e.g. Public Assistance Scheme)?
      <h2><font color="green">
        { info["Hx Social"] && 
          info["Hx Social"].hxSocialQ1
        }
        { info["Hx Social"] &&
          info["Hx Social"].hxSocialQ1 === "Yes, (Please specify):" && 
          info["Hx Social"].hxSocialQ2
        }
      </font></h2>
      <h2>2. NSS CANCER SCREENING PRACTICES SURVEY.</h2>
      1. <font color="red"><b>For female respondent aged 40 and above only.</b></font><br />When was the last time you had your last mammogram? (A mammogram is an x-ray of each breast to look for breast cancer.)
      <h2><font color="green">{info["Hx Cancer"] && info["Hx Cancer"].hxCancerQ7}</font></h2>
      2. <font color="red"><b></b>For female respondent aged 25 and above, who have/had a husband/boyfriend and not had their womb completely surgically removed only.</font><br />When was the last time you had a PAP smear test? (A PAP smear test is a simple test involving the scrapping of cells fom the mouth of the womb, to check for changes in the cells of your cervix, which may develop into cancer later.)
      <h2><font color="green">{info["Hx Cancer"] && info["Hx Cancer"].hxCancerQ8}</font></h2>
      <font color="red"><b>For women 40-49, advise yearly mammogram. 50-69, advise mammogram every 2 years. 70 and above, seek doctor's advice.<br />Please encourage participants to go for HPV test every 5 years.</b></font> <br />
      Does participant has a history of cancer or his/her family history requires further scrutiny by doctors? <font color="red"><b>(If indicated 'Yes', please refer to doctor's consult by following the steps below.)</b></font>
      <RadioField name="wceQ1" label="WCE Q1"/>
      <DisplayIf condition = {(context) => (typeof(context.model.wceQ1) !== undefined && context.model.wceQ1 === 'Yes')} >
        <Fragment>
          <b>REFER TO DR CONSULT by indicating on:</b> <br />1) Tick eligibility, Circle interested 'Y' on Page 1 of Form A under Doctor's Consultation row<br />2) Write reasons on Page 2 of Form A Doctor's Consultation - Reasons for Recommendation <br />
        </Fragment>
      </DisplayIf>
      <h2>3. FOLLOW UP PLAN</h2>
      1. Completed Breast Self Examination station?
      <RadioField name="wceQ2" label="WCE Q2"/>
      2. Completed Cervical Education station?
      <RadioField name="wceQ3" label="WCE Q3"/>
      3. Indicated interest for HPV Test under SCS?
      <RadioField name="wceQ4" label="WCE Q4"/>
      4. Indicated interest for Mammogram under SCS?
      <RadioField name="wceQ5" label="WCE Q5"/>
      5. Registered for Mammogram under NHGD?
      <RadioField name="wceQ6" label="WCE Q6" />
      <DisplayIf condition = {(context) => (typeof(context.model.wceQ6) !== undefined && context.model.wceQ6 === 'Yes, (Please specify date of appointment if given):')} >
        <Fragment>
          Please specify date:
          <LongTextField name="wceQ7" label="WCE Q7"/>
        </Fragment>
      </DisplayIf>
      
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
          {model['geriAmtQ11'] = getScore(model, ['geriAmtQ1', 'geriAmtQ2', 'geriAmtQ3', 'geriAmtQ4', 'geriAmtQ5', 'geriAmtQ6', 'geriAmtQ7', 'geriAmtQ8', 'geriAmtQ9', 'geriAmtQ10'], 'Yes (Answered correctly)')}
          /10
        </h3>
      )} />
      <br /><br />
      What is your education level?
      <img src='/images/geri-amt/edu.png' alt='Education' /> <br />
      <RadioField name="geriAmtQ12" label="Geri - AMT Q12" />
      Need referral to Cognitive Follow-Up?
      <RadioField name="geriAmtQ13" label="Geri - AMT Q13" />
      Referral to Cognitive Follow-Up
      <RadioField name="geriAmtQ14" label="Geri - AMT Q14" />
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
          {model["geriEbasDepQ9"] = getScore(model, ['geriEbasDepQ1', 'geriEbasDepQ2', 'geriEbasDepQ3', 'geriEbasDepQ4', 'geriEbasDepQ5', 'geriEbasDepQ6', 'geriEbasDepQ7', 'geriEbasDepQ8'], '1 (Abnormal)')}
          /8
        </h3>
      )} />
      <br />
      <h3>A score of 3 or greater indicates the probable presence of a depressive disorder which may need treatment and the patient should be assessed in more detail. Please refer to Social Support if score is 3 OR GREATER.</h3>
      To be referred for social support (failed EBAS-DEP) - from Geriatrics EBAS
      <br />
      <RadioField name="geriEbasDepQ10" label="Geri - EBAS-DEP Q10" />
      To be referred for social support (for potential financial/ family difficulties) - from Geriatrics EBAS
      <RadioField name="geriEbasDepQ11" label="Geri - EBAS-DEP Q11" />
      <DisplayIf condition={(context) => (typeof(context.model.geriEbasDepQ11) !== "undefined" && context.model.geriEbasDepQ11 === "Yes")}>
        <Fragment>
            Reasons for referral to social support - from Geriatrics EBAS:
          <LongTextField name="geriEbasDepQ12" label="Geri - EBAS-DEP Q12" />
        </Fragment>
      </DisplayIf>
      <font color="red"><h2>IF THE PATIENT NEEDS TO GO TO SOCIAL SUPPORT MODALITY THAT YOU RECOMMENDED, PLEASE INDICATE ON FORM A.</h2></font>
      
    </Fragment>
  ),

  "Geri - Cognitive Follow Up" : (info) => (
    <Fragment>
      <h2> Cognitive Follow Up</h2>
      Which organisation is the participant referred to?
      <RadioField name="geriCognitiveFollowUpQ1" label="Geri - Cognitive Follow Up Q1" />
      <DisplayIf condition={(context) => (typeof(context.model.geriCognitiveFollowUpQ1) !== "undefined" && context.model.geriCognitiveFollowUpQ1 === "Others (Please Specify):")}>
        <Fragment>
          Please Specify:
          <LongTextField name="geriCognitiveFollowUpQ2" label="Geri - Cognitive Follow Up Q2" />
        </Fragment>
      </DisplayIf>
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
          <LongTextField name="geriVisionQ2" label="Geri - Vision Q2"/>
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
      <LongTextField name="geriPhysicalActivityLevelQ1" label="Geri - Physical Activity Level Q1"/>
      2.     How long do you exercise each time?<br />*If &lt; 30 minutes per session and would like to increase, suggest physiotherapist consultation. 
      <LongTextField name="geriPhysicalActivityLevelQ2" label="Geri - Physical Activity Level Q2"/>
      3.     What do you do for exercise?<br />*Take down salient points. <br />*Dangerous/ inappropriate exercises are defined to the participants as  exercises that cause pain or difficulty to to the participant in performing.<br />*If exercises are dangerous or deemed inappropriate, to REFER FOR PHYSIOTHERAPIST CONSULATION. 
      <LongTextField name="geriPhysicalActivityLevelQ3" label="Geri - Physical Activity Level Q3"/>
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
            model['geriFrailScaleQ7'] = getFrailScore(model)
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
          <LongTextField name="geriOtQuestionnaireQ3" label="Geri - OT Questionnaire Q3"/>
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
      <LongTextField name="geriSppbQ1" label="Geri - SPPB Q1"/>
      <font color="blue"><b>
        Score for REPEATED CHAIR STANDS (out of 4):
        <RadioField name="geriSppbQ2" label="Geri - SPPB Q2"/>
      </b></font>
      2a) BALANCE Side-by-side Stand <br />Time held for in seconds:
      <LongTextField name="geriSppbQ3" label="Geri - SPPB Q3"/>
      2b) BALANCE Semi-tandem Stand <br />Time held for in seconds:
      <LongTextField name="geriSppbQ4" label="Geri - SPPB Q4"/>
      2c) BALANCE Tandem Stand <br />Time held for in seconds:
      <LongTextField name="geriSppbQ5" label="Geri - SPPB Q5"/>
      <font color="blue"><b>
        Score for BALANCE (out of 4):
        <RadioField name="geriSppbQ6" label="Geri - SPPB Q6"/>
      </b></font>
      3) 8’ WALK <br />Time taken in seconds:
      <LongTextField name="geriSppbQ7" label="Geri - SPPB Q7"/>
      <font color="blue"><b>
        Score for 8' WALK (out of 4):
        <RadioField name="geriSppbQ8" label="Geri - SPPB Q8"/>
      </b></font>
      <SomeComp calculation={(model) => (
        <h3>
          <font color="blue">Total score (Max Score: 12): 
          {
            model['geriSppbQ9'] = getSppbScore(model)
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
        <LongTextField name="geriTugQ2" label="Geri - TUG Q2"/>
        </Fragment>
      </DisplayIf>
      Time taken (in seconds):
      <LongTextField name="geriTugQ3" label="Geri - TUG Q3"/>
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
      <SelectField name="geriOtConsultQ6" checkboxes="true" label="Geri - OT Consult Q6"/>
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
          Pearl's Optical Voucher given?
          <RadioField name="geriGeriApptQ4" label="Geri - Geri Appt Q4"/>
        </Fragment>
      </DisplayIf>

      <DisplayIf condition={() => (
        (typeof(info["Geri - EBAS-DEP"]) !== "undefined" && info["Geri - EBAS-DEP"].geriEbasDepQ10 === "Yes") ||
        (typeof(info["Geri - EBAS-DEP"]) !== "undefined" && info["Geri - EBAS-DEP"].geriEbasDepQ11 === "Yes") ||
        (typeof(info["Geri - PT Consult"]) !== "undefined" && info["Geri - PT Consult"].geriPtConsultQ4 === "Yes") ||
        (typeof(info["Geri - OT Consult"]) !== "undefined" && info["Geri - OT Consult"].geriOtConsultQ4 === "Yes")
      )}>
        <Fragment>
          <h3>Participant is recommended for social support:</h3>
          Persuade participant to go to social support booth and explain that AIC can help
          <BoolField name="geriGeriApptQ5" />
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
      <LongTextField name="doctorSConsultQ1" label="Doctor's Consult Q1"/>
      MCR No.:
      <LongTextField name="doctorSConsultQ2" label="Doctor's Consult Q2"/>
      Doctor's Memo
      <LongTextField name="doctorSConsultQ3" label="Doctor's Consult Q3" />
      Refer to dietitian?
      <BoolField name="doctorSConsultQ4" label="Doctor's Consult Q4"/>
      Reason for referral
      <LongTextField name="doctorSConsultQ5" label="Doctor's Consult Q5"/>
      Refer to Social Support?
      <BoolField name="doctorSConsultQ6" label="Doctor's Consult Q6"/>
      Reason for referral
      <LongTextField name="doctorSConsultQ7" label="Doctor's Consult Q7"/>
      Refer to Dental?
      <BoolField name="doctorSConsultQ8" label="Doctor's Consult Q8"/>
      Reason for referral
      <LongTextField name="doctorSConsultQ9" label="Doctor's Consult Q9"/>
      Does patient require urgent follow up 
      <BoolField name="doctorSConsultQ10" label="Doctor's Consult Q10"/>
      Completed Doctor’s Consult station. Please check that Form A is filled.
      <BoolField name="doctorSConsultQ11" label="Doctor's Consult Q11"/>
      
    </Fragment>
  ),

  "Dietitian" : (info) => (
    <Fragment>
      Dietitian's Name:
      <LongTextField name="dietitianQ1" label="Dietitian Q1"/>
      Dietitian's License No.:
      <LongTextField name="dietitianQ2" label="Dietitian Q2"/>
      Dietitian's Notes
      <LongTextField name="dietitianQ3" label="Dietitian Q3" />
      Does patient require urgent follow up?
      <BoolField name="dietitianQ4" label="Dietitian Q4" />
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

  "Screening Review" : (info) => (
    <Fragment />
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
          <LongTextField name="feedbackFormQ3" label="Feedback Form Q3"/>
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
          <LongTextField name="feedbackFormQ10" label="Feedback Form Q10"/>
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
      <LongTextField name="feedbackFormQ24" label="Feedback Form Q24"/>
      12. What else do you think PHS should screen for? <br />您认为公共健康服务还可以检查那些其他的疾病？
      <LongTextField name="feedbackFormQ25" label="Feedback Form Q25"/>
      13. I would recommend my family and/or friends to come for the PHS 2019 screening. <br />我会推荐家人与朋友来参与公共健康服务 2019 的身体检查。
      <RadioField name="feedbackFormQ26" label="Feedback Form Q26"/>
      14. How did you come to know of the PHS 2019 screening? Select all that apply. <br />您如何认知此活动的智讯？（请在所有适当的空格中打勾）<br />
      <SelectField name="feedbackFormQ27" checkboxes="true" label="Feedback Form Q27" />
      <DisplayIf condition={(context) => (typeof(context.model.feedbackFormQ27) !== "undefined" && context.model.feedbackFormQ27.includes("Others (Please specify) 其他（请注明)"))}>
        <Fragment>
          Please Specify for "Others" 请注明:
          <LongTextField name="feedbackFormQ28" label="Feedback Form Q28"/>
        </Fragment>
      </DisplayIf>
      15. If you have been contacted for Door-to-Door Publicity, did you learn about healthy ageing/metabolic syndrome through our volunteers/brochure? <br />若您有遇见义工上门宣传您是否从义工们/健康宣传册中学到更多关于健康老龄化/代谢综合症的相关知识？
      <RadioField name="feedbackFormQ29" label="Feedback Form Q29"/>
      16. What else do you want to learn more about through PHS?<br />您还有什么想更加了解/更深入学习的东西吗？
      <LongTextField name="feedbackFormQ30" label="Feedback Form Q30"/>
      17. Any other feedback? <br />您有其他的意见吗？
      <LongTextField name="feedbackFormQ31" label="Feedback Form Q31" />
      18. Would you like to attend the PHS2019 Fitness Carnival?
      <RadioField name="feedbackFormQ32" label="Feedback Form Q32"/>
      <h2>Thank you for completing this survey! :) <br />谢谢您为我们提供您宝贵的意见！</h2>
      
    </Fragment>
  ),

};