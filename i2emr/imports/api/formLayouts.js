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
      Last 4 characters of NRIC (e.g. 987A)
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
      Pioneer / Merdeka Generation Status 建国一代配套
      <RadioField name="registrationQ9" />
      Preferred Language for Health Report
      <RadioField name="registrationQ11" />
      <DisplayIf condition={() => (typeof(info["Pre-Registration"]) !== "undefined" && info["Pre-Registration"].preRegistrationQ4 === "Y")}>
        <Fragment>
          <h2>Follow up at GP Clinics</h2>
          <i>Your Health Report & Blood Test Results (if applicable) will be mailed out about <b>4-6 weeks</b> after the screening.  Depending on your results, our team <b>may</b> shortlist you for further follow-up.<br />Scenario 1: If <b>no follow-up</b> is required, the report will be mailed directly to you.<br />Scenario 2: If follow-up is required, you will need to <b>visit a GP clinic</b> to collect your report. <br />Please choose a preferred GP Clinic from the following list in case of Scenario 2.</i> <br/> Some residents such as PRs and residents who have been registered in the National Screening System in the past 3 years will not be eligible. 
          <RadioField name="registrationQ10" />
          <h2>Phlebotomy Eligibility</h2>
          Before entering our screening, do note the following <b>eligibility criteria for Phlebotomy</b> <br />1) Fasted for minimum 8 hours <br />          Note: Water is allowed, coffee/tea is not. Medications are fine. <br />2) NOT previously diagnosed with Diabetes/ High Cholesterol/ High Blood Pressure.<br />3) Have not done a blood test within 1 year.<br /><br /><i>Rationale: PHS aims to reach out to undiagnosed people. Patients that are already aware of their condition would have regular follow-ups with the GPs/polyclinics/hospitals. This information is available in our publicity material. Please approach our registration volunteers should you have any queries. We are happy to explain further. Thank you!</i><br /><br />抽血合格标准:<br />1) 十个小时内没有吃东西或喝饮料. 可以喝水, 吃药。不能喝咖啡, 喝茶。<br />2) 在过去的一年内沒有验过血。<br />3) 没有糖尿病, 高血压, 高胆固醇。
          <BoolField name="registrationQ12" />
        </Fragment>
      </DisplayIf>
      <h2>Compliance to PDPA 同意书</h2>
      <i>I hereby give my consent to the Public Health Service Executive Committee to collect my personal information for the purpose of participating in the Public Health Service (hereby called “PHS”) and its related events, and to contact me via calls, SMS, text messages or emails regarding the event and follow-up process.  <br /><br />Should you wish to withdraw your consent for us to contact you for the purposes stated above, please notify a member of the PHS Executive Committee at ask.phs@gmail.com in writing. We will then remove your personal information from our database. Please allow 3 business days for your withdrawal of consent to take effect. All personal information will be kept confidential, will only be disseminated to members of the PHS Executive Committee, and will be strictly used by these parties for the purposes stated. <br /> This question is mandatory.</i>
      <BoolField name="registrationQ13" />
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
      <BoolField name="doctorSConsultQ4" />
      Reason for referral
      <LongTextField name="doctorSConsultQ5" label="Doctor's Consult Q5"/>
      Refer to Social Support?
      <BoolField name="doctorSConsultQ6" />
      Reason for referral
      <LongTextField name="doctorSConsultQ7" label="Doctor's Consult Q7"/>
      Refer to Dental?
      <BoolField name="doctorSConsultQ8" />
      Reason for referral
      <LongTextField name="doctorSConsultQ9" label="Doctor's Consult Q9"/>
      Does patient require urgent follow up 
      <BoolField name="doctorSConsultQ10" />
      Completed Doctor’s Consult station. Please check that Form A is filled.
      <BoolField name="doctorSConsultQ11" />
      
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
      15. Did you learn about PHS 2019 screening through our volunteer visit/ flyers at your doorstep? <br />您是否通过义工登门拜访／门前的宣传单得知到此健康检查2019？
      <RadioField name="feedbackFormQ28" label="Feedback Form Q28"/>
      16. Was the volunteer visit/ flyers at your doorstep effective in encouraging you to participate in PHS 2019 screening?<br />义工登门拜访／门前的宣传单是否有效鼓励您参与此健康检查2019？
      <RadioField name="feedbackFormQ29" label="Feedback Form Q29"/>
      17. What else do you want to learn more about through PHS?<br />您还有什么想更加了解/更深入学习的东西吗？
      <LongTextField name="feedbackFormQ30" label="Feedback Form Q30"/>
      18. Any other feedback? <br />您有其他的意见吗？
      <LongTextField name="feedbackFormQ31" label="Feedback Form Q31" />
      19. Would you like to attend the PHS2019 Fitness Carnival?
      <RadioField name="feedbackFormQ32" label="Feedback Form Q32"/>
      <h2>Thank you for completing this survey! :) <br />谢谢您为我们提供您宝贵的意见！</h2>
      
    </Fragment>
  ),

  "Screening Review" : (info) => (
    <Fragment />
  ),

  "Basic Patient Information" : (info) => (
    <Fragment>
      <h2>1. BASIC PATIENT INFORMATION</h2>
      1. Name
      <TextField name="basicPatientInformationQ1" label="Basic Patient Information Q1"/>
      2. Gender
      <RadioField name="basicPatientInformationQ2" label="Basic Patient Information Q2"/>
      <DisplayIf condition={(context) => (typeof(context.model.basicPatientInformationQ2) !== "undefined" && context.model.basicPatientInformationQ2 === "Female")}>
        <Fragment>
            Pregnant
          <RadioField name="basicPatientInformationQ12" label="basicPatientInformationQ12"/>
        </Fragment>
      </DisplayIf>
      3. Birthdate
      <TextField name="basicPatientInformationQ3" label="Basic Patient Information Q3"/>
      4. Age <br />
      <NumField name="basicPatientInformationQ4" label="Basic Patient Information Q4" /><br />
      5. District Name
      <TextField name="basicPatientInformationQ5" label="Basic Patient Information Q5"/>
      6. Address
      <TextField name="basicPatientInformationQ6" label="Basic Patient Information Q6"/>
      7. Zip Code
      <TextField name="basicPatientInformationQ7" label="Basic Patient Information Q7"/>
      8. Contact Number <br />
      <NumField name="basicPatientInformationQ8" label="Patient Information Q8" /><br /><br></br>
      9. Spoken Language
      <TextField name="basicPatientInformationQ9" label="Basic Patient Information Q9"/>
      10. Any drug allergic?
      <RadioField name="basicPatientInformationQ10" label="Basic Patient Information Q10"/>
      <DisplayIf condition={(context) => (typeof(context.model.basicPatientInformationQ10) !== "undefined" && context.model.basicPatientInformationQ10 === "Yes, pls specify")}>
        <Fragment>
            Pls Specify.
          <TextField name="basicPatientInformationQ13" label="basicPatientInformationQ13"/>
        </Fragment>
      </DisplayIf>
      11. Do you have any blood borne diseases?
      <RadioField name="basicPatientInformationQ11" label="Basic Patient Information Q11"/>
      <DisplayIf condition={(context) => (typeof(context.model.basicPatientInformationQ11) !== "undefined" && context.model.basicPatientInformationQ11 === "Yes, pls specify")}>
        <Fragment>
            Pls Specify. **Patient not allowed to do Phlebotomy.
          <TextField name="basicPatientInformationQ14" label="basicPatientInformationQ14"/>
        </Fragment>
      </DisplayIf>
      
    </Fragment>
  ),

  "Patient Profiling" : (info) => (
	<Fragment>
		<h2>2. PATIENT PROFILING</h2>
		<h2>2.1 TB SCREENING</h2>
		2.1.1. Have you ever been diagnosed with tuberculosis?
		<RadioField name="patientProfilingQ1" label="Patient Profiling Q1"/>
    <DisplayIf condition={(context) => (typeof(context.model.patientProfilingQ1) !== "undefined" && context.model.patientProfilingQ1 === "Yes")}>
        <Fragment>
            <font color="red"> **Immediate Doctor's Consult</font><br></br>
            Pls Specify.
          <TextField name="patientProfilingQ21" label="patientProfilingQ21"/>
        </Fragment>
      </DisplayIf>
		2.1.2. Have you ever lived with someone with tuberculosis?
		<RadioField name="patientProfilingQ2" label="Patient Profiling Q2"/>
    <DisplayIf condition={(context) => (typeof(context.model.patientProfilingQ2) !== "undefined" && context.model.patientProfilingQ2 === "Yes")}>
        <Fragment>
            <font color="red"> **Immediate Doctor's Consult</font><br></br>
            Pls Specify.
          <TextField name="patientProfilingQ22" label="patientProfilingQ22"/>
        </Fragment>
      </DisplayIf>
		2.1.3. Do you have any of the following symptoms? Select all that apply
		<SelectField name="patientProfilingQ3" checkboxes="true" label="Patient Profiling Q3" />
    <DisplayIf condition={(context) => (typeof(context.model.patientProfilingQ3) !== "undefined" && context.model.patientProfilingQ3 === "Yes")}>
        <Fragment>
            <font color="red"> **Immediate Doctor's Consult</font><br></br>
            Pls Specify.
          <SelectField name="patientProfilingQ22" checkboxes="true" label="patientProfilingQ22"/>
        </Fragment>
      </DisplayIf>
		<h2>2.2 MEDICAL HISTORY</h2>
		2.2.1. Do you have any of the following medical conditions?
		<SelectField name="patientProfilingQ4" checkboxes="true" label="Patient Profiling Q4" />
		<h2>2.3 MEDICAL HISTORY: OTHERS</h2>
		2.3.1. Do you have other medical conditions we should take note of? (if none, indicate NIL)
		<TextField name="patientProfilingQ5" label="Patient Profiling Q5"/>
		2.3.2. How are you managing these conditions? (check-ups, medicines, diet/exercise, others)
		<TextField name="patientProfilingQ6" label="Patient Profiling Q6"/>
		2.3.3. Where do you go to for routine healthcare?
		<TextField name="patientProfilingQ7" label="Patient Profiling Q7"/>
		2.3.4. Where do you go to for emergency medical services (eg. fall, injury, fainting)?
		<TextField name="patientProfilingQ8" label="Patient Profiling Q8"/>
		2.3.5. Are you taking any other medications? (If yes, indicate what medication and why. If none, indicate NIL)
		<TextField name="patientProfilingQ9" label="Patient Profiling Q9"/>
		<h2>2.4  BARRIERS TO HEALTHCARE</h2>
		2.4.1 What type of doctor do you see for your existing conditions?
		<RadioField name="patientProfilingQ10" label="Patient Profiling Q10"/>
		<h2>2.5 SMOKING</h2>
		2.5.1. Do you currently smoke?
		<RadioField name="patientProfilingQ11" label="Patient Profiling Q11"/>
		2.5.2 Do you chew pann or tobacoo?
		<RadioField name="patientProfilingQ12" label="Patient Profiling Q12"/>
		<h2>2.6 SOCIAL HISTORY</h2>
		2.6.1 What is your occupation?
		<TextField name="patientProfilingQ13" label="Patient Profiling Q13"/>
		2.6.2 If occupation is "Farming/Ariculture', do you use pesticides in your farming?
		<RadioField name="patientProfilingQ14" label="Patient Profiling Q14"/>
		2.6.3 Monthly Income? (optional) <br />
		<NumField name="patientProfilingQ15" label="Patient Profiling Q15" /><br />
		2.6.4 Marital Status
		<RadioField name="patientProfilingQ16" label="Patient Profiling Q16"/>
		2.6.5 Number of Children <br />
		<NumField name="patientProfilingQ17" label="Patient Profiling Q17" /><br />
		2.6.6 Hwo many people live in your household (including you)? <br />
		<NumField name="patientProfilingQ18" label="Patient Profiling Q18" /><br />
		2.6.7 How many people in your household contribute to household income? <br />
		<NumField name="patientProfilingQ19" label="Patient Profiling Q19" /><br />
		2.6.8 What is your highest education level?
		<RadioField name="patientProfilingQ20" label="Patient Profiling Q20"/>
		
	</Fragment>
),

};