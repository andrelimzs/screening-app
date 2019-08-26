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

const checkInfo = (station,field,msg1,msg2) => (
  typeof(station) !== "undefined" &&
  typeof(station[0][field]) !== "undefined" &&
  station[0][field].includes(msg1,msg2)
);
const checkInfo2 = (station,field,msg1) => (
  typeof(station) !== "undefined" &&
  typeof(station[0][field]) !== "undefined" &&
  !station[0][field].includes(msg1)
);

const requireDoctorConsult = (info) => (
  <Fragment>
    {((typeof(info["Height & weight"]) !== "undefined" && info["Height & weight"][0].docConsultForHW) ||
      (typeof(info["Blood Glucose & Hb"]) !== "undefined" && info["Blood Glucose & Hb"][0].docConsultForBloodGlucAndHb) ||
      (typeof(info["Station Selection"]) !== "undefined" && info["Station Selection"].stationSelect12 === "Yes") ||
      (typeof(info["Blood Pressure"]) !== "undefined" && info["Blood Pressure"][0].docConsultForBP) ||
      (typeof(info["Pap Smear"]) !== "undefined" && info["Pap Smear"][0].docConsultForPap) ||
      (typeof(info["Height & weight"]) !== "undefined" &&
        (checkInfo(info["Height & weight"], "childHeightAssessment", "Below 3rd percentile curve","Above 97th percentile curve") ||
        checkInfo(info["Height & weight"], "childWeightAssessment", "Below 3rd percentile curve","Above 97th percentile curve") ||
        checkInfo2(info["Height & weight"], "childBmiAssessment", "Between 3rd percentile and overweight curves")))) &&
      <Divider /> &&
      <Typography color='secondary' variant='h6'>
        Require consult for:
      </Typography> }

    { typeof(info["Station Selection"]) !== "undefined" && info["Station Selection"].stationSelect12 === "Yes" &&
      <Typography color='secondary'>
        Registration
      </Typography> }
    { checkInfo(info["Height & weight"], "childHeightAssessment", "Below 3rd percentile curve","Above 97th percentile curve") &&
      <Typography color='secondary'>
        Height (Child)
      </Typography> }
    { checkInfo(info["Height & weight"], "childWeightAssessment", "Below 3rd percentile curve","Above 97th percentile curve") &&
      <Typography color='secondary'>
        Height (Child)
      </Typography> }
    { checkInfo2(info["Height & weight"], "childBmiAssessment", "Between 3rd percentile and overweight curves") &&
      <Typography color='secondary'>
        BMI (Child): 
      </Typography> }
    { typeof(info["Blood Glucose & Hb"]) !== "undefined" && info["Blood Glucose & Hb"][0].docConsultForBloodGlucAndHb &&
      <Typography color='secondary'>
        Blood Glucose and Hb
      </Typography> }
    { typeof(info["Blood Pressure"]) !== "undefined" && info["Blood Pressure"][0].docConsultForBP &&
      <Typography color='secondary'>
        Blood Pressure
      </Typography> }
    { typeof(info["Pap Smear"]) !== "undefined" && info["Pap Smear"][0].docConsultForPap &&
      <Typography color='secondary'>
        Pap Smear
      </Typography> &&
    <Divider /> }
  </Fragment>
);
const requireEducation = (info) => (
  <Fragment>
    {((typeof(info["Blood Pressure"]) !== "undefined" && info["Blood Pressure"][0].docConsultForBP) ||
      (typeof(info["Height & weight"]) !== "undefined" &&
        (info["Height & weight"][0].bmi < 18.5 || info["Height & weight"][0].bmi >= 23 ||
        info["Height & weight"][0].waistHipRatio > ((info["Patient Info"].gender === "male")? 0.9:0.8) ))) &&
      <Divider /> &&
      <Typography color='secondary' variant='h6'>
        Require education for:
      </Typography> }

    { typeof(info["Height & weight"]) !== "undefined" && (info["Height & weight"][0].bmi < 18.5 || info["Height & weight"][0].bmi >= 23) &&
      <Typography color='secondary'>
        BMI: {info["Height & weight"][0].bmi}
      </Typography> }
    { typeof(info["Height & weight"]) !== "undefined" && (info["Height & weight"][0].waistHipRatio > ((info["Patient Info"].gender === "male")? 0.9:0.8) ) &&
      <Typography color='secondary'>
        waist:hip {info["Height & weight"][0].waistHipRatio}
      </Typography> }
    { typeof(info["Blood Pressure"]) !== "undefined" && info["Blood Pressure"][0].docConsultForBP &&
      <Typography color='secondary'>
        Blood Pressure
      </Typography>}
  </Fragment>
);
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
      <h2>Phlebotomy Eligibility</h2>
      Before entering our screening, do note the following <b>eligibility criteria for Phlebotomy</b> <br />1) Fasted for minimum 10 hours <br />          Note: Water is allowed, coffee/tea is not. Medications are fine. <br />2) NOT previously diagnosed with Diabetes/ High Cholesterol/ High Blood Pressure.<br />3) Have not done a blood test within 1 year.<br /><br /><i>Rationale: PHS aims to reach out to undiagnosed people. Patients that are already aware of their condition would have regular follow-ups with the GPs/polyclinics/hospitals. This information is available in our publicity material. Please approach our registration volunteers should you have any queries. We are happy to explain further. Thank you!</i><br /><br />抽血合格标准:<br />1) 十个小时内没有吃东西或喝饮料. 可以喝水, 吃药。不能喝咖啡, 喝茶。<br />2) 在过去的一年内沒有验过血。<br />3) 没有糖尿病, 高血压, 高胆固醇。
      <BoolField name="registrationQ12" />
      <h2>Compliance to PDPA 同意书</h2>
      <i>I hereby give my consent to the Public Health Service Executive Committee to collect my personal information for the purpose of participating in the Public Health Service (hereby called “PHS”) and its related events, and to contact me via calls, SMS, text messages or emails regarding the event and follow-up process.  <br /><br />Should you wish to withdraw your consent for us to contact you for the purposes stated above, please notify a member of the PHS Executive Committee at ask.phs@gmail.com in writing. We will then remove your personal information from our database. Please allow 3 business days for your withdrawal of consent to take effect. All personal information will be kept confidential, will only be disseminated to members of the PHS Executive Committee, and will be strictly used by these parties for the purposes stated.</i>
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

  "Height & weight": (info) => (
    <Fragment>
      <h2>Height and Weight</h2>
      <TextField name="height" />
      <br />
      {typeof(info["Patient Info"]) !== "undefined" && info["Patient Info"].age <= 18 &&
        <SelectField name="childHeightAssessment" />}
      <br />
      <TextField name="weight" />
      <br />
      {typeof(info["Patient Info"]) !== "undefined" && info["Patient Info"].age <= 18 &&
        <SelectField name="childWeightAssessment" />}
      <br />
      {/* <SomeComp calculation={(model) => (<TextField name="bmi" value={((model.weight && model.height) ? (model.weight/model.height/model.height).toFixed(1):"")} />)} /> */}
      <TextField name="bmi" />
      <br />
      {typeof(info["Patient Info"]) !== "undefined" && info["Patient Info"].age <= 18 &&
        <SelectField name="childBmiAssessment" />}
      <br />
      {typeof(info["Patient Info"]) !== "undefined" && info["Patient Info"].age <= 18 &&
        <BoolField name="docConsultForHW" />}
      <br />
      <h2>Waist:Hip</h2>
      <TextField name="waist" />
      <br />
      <TextField name="hip" />
      <br />
      {/* <SomeComp calculation={(model) => (<TextField name="waistHipRatio" value={((model.waist && model.hip) ? (model.waist/model.hip).toFixed(2) : "")} />)} /> */}
      <TextField name="waistHipRatio" />
      <br />
      <h2>India Diabetes Risk Assessment</h2>
      Have you previously been diagnosed with diabetes?
      <SelectField name="previousDiabetesDiagnosis" />

      <DisplayIf condition={context => (typeof(info["Patient Info"]) !== "undefined" && info["Patient Info"].age > 17)}>
        <Fragment>
          1. Age: 
          <SomeComp calculation={(model) => (
              ((typeof(info["Patient Info"]) !== "undefined") ? info["Patient Info"].age : "")
          )}/>
          {/* <SomeComp calculation={(model) => (<TextField name="riskAssessAge" value={
            ((typeof(info["Patient Info"]) !== "undefined") ? info["Patient Info"].age : "")
          } />)} /> */}
          <SelectField name="riskAssessAge" />
          2. Waist circumference (refer to Waist:Hip Ratio section)
          <SomeComp calculation={(model) => (<LongTextField name="riskAssessWaist" value={
            (
              (typeof(info["Patient Info"]) !== "undefined") ? 
              (
                (model.waist < ((info["Patient Info"].gender==="male")?90:80) ) ? "Female < 80cm, Male < 90cm (0 points)" : 
                  ( (model.waist < ((info["Patient Info"].gender==="male")?100:90) ) ? "Female 80-89cm, Male 90-99cm (10 points)" : 
                  "Female >= 90cm, Male >= 100cm (20 points)" )
              ) : ""
            )
          } />)} />
          3. Physical activity
          <SelectField name="riskAssessPhysicalActivity" />
          4. Family history
          <SelectField name="riskAssessFamilyHis" />
          Total score (maximum 100)
          <TextField name="riskAssessTotalScore" />
          Risk level
          <SelectField name="riskAssessRiskLevel" />
          {/* <SomeComp calculation={(model) => (<TextField name="riskAssessRiskLevel" value={
            ((Number(model.riskAssessAge)<35) ? 0 : (Number(model.riskAssessAge)<50) ? 20 : 30)
          } />)} /> */}
        </Fragment>
      </DisplayIf>
    </Fragment>
  ),
  
  "Blood Pressure": (info) => (
    <Fragment>
      <div><TextField name="bp1Sys" /></div>
      <div><TextField name="bp1Dia" /></div>
      <div><TextField name="bp2Sys" /></div>
      <div><TextField name="bp2Dia" /></div>

      <DisplayIf condition={context => Math.abs(context.model.bp2Sys - context.model.bp1Sys) > 5 || Math.abs(context.model.bp2Dia - context.model.bp1Dia) > 5 }><Fragment>
        <div><TextField name="bp3Sys" /></div>
        <div><TextField name="bp3Dia" /></div>
      </Fragment></DisplayIf>

      {/* <div><TextField name="bpAvgSys" /></div> */}
      <SomeComp calculation={(model) => (<TextField name="bpAvgSys" value={
        (
          (Number(model.bp1Sys) + Number(model.bp2Sys) + ((typeof(model.bp3Sys) === "undefined") ? 0 : Number(model.bp3Sys))) / ((typeof(model.bp3Sys) === "undefined") ? 2:3)
        ).toFixed(1)
        } />)} />
      {/* <div><TextField name="bpAvgDia" /></div> */}
      <SomeComp calculation={(model) => (<TextField name="bpAvgDia" value={
        (
          (Number(model.bp1Dia) + Number(model.bp2Dia) + ((typeof(model.bp3Dia) === "undefined") ? 0 : Number(model.bp3Dia))) / ((typeof(model.bp3Sys) === "undefined") ? 2:3)
        ).toFixed(1)
        } />)} />

      <DisplayIf condition={context => (
        context.model.bpAvgSys < 90 || context.model.bpAvgSys > 180 ||
        context.model.bpAvgDia < 60 || context.model.bpAvgDia > 120
      )}><Fragment>
        <Typography color='secondary' variant='h5'>
          Immediate Doctor's consult for Blood Pressure
        </Typography>
      </Fragment></DisplayIf>

      <div><BoolField name="docConsultForBP" /></div>
    </Fragment>
  ),

  "Blood Glucose & Hb": (info) => (
    <Fragment>      
      <TextField name="cbg" />
      <br />
      <DisplayIf condition={context => (
        context.model.cbg < 54 || context.model.cbg > 360
      )}><Fragment>
        <Typography color='secondary' variant='h5'>
          Immediate Doctor's consult for CBG
        </Typography>
      </Fragment></DisplayIf>
      <TextField name="hb" />
      <br />
      {typeof(info["Patient Info"]) !== "undefined" && info["Patient Info"].age > 17 &&
      <Fragment>
        Doctors consult if:
        <p>{"Males: <13.8 OR >17.2"}</p>
        <p>{"Females: <12.1 OR >15.1"}</p>
      </Fragment>}
      {typeof(info["Patient Info"]) !== "undefined" && info["Patient Info"].age <= 17 &&
      <Fragment>
        Doctors consult if:
        <p>{"<11 OR >16"}</p>
      </Fragment>}
      <BoolField name="docConsultForBloodGlucAndHb" />
    </Fragment>
  ),

  "Pap Smear": (info) => (
    <Fragment>
      <BoolField name="papCompleted" />
      <LongTextField name="papNotes" />
      <BoolField name="docConsultForPap" />
    </Fragment>
  ),
    
  "Breast Exam": (info) => (
    <Fragment>
      <BoolField name="abnormalities" />
      <DisplayIf condition={context => context.model.abnormalities === true}><Fragment>
        <LongTextField name="abDescribe" />  
      </Fragment></DisplayIf>
      <BoolField name="fnacCompleted" />     
      Completed breast examination?
      <BoolField name="breastCompleted" />
    </Fragment>
  ),

  // "Women's Edu": {
  //   "Pre-Women's Education Quiz": (info) => (
  //     <Fragment>
  //       Breast education completed?
  //       <RadioField name="eduCompleted" />
  //       From a scale of 1-5, how much do you know about menstrual cycles? 1 being not at all, and 5 being a lot
  //       <SelectField name="preWomenEduSurvey1" />
  //       Which of the following is/are normal symptom(s) of menstrual periods?
  //       <SelectField name="preWomenEduQ1" />
  //       All of the following are reasons for missed periods except
  //       <SelectField name="preWomenEduQ2" />
  //       Which of the following is true about menstruation
  //       <SelectField name="preWomenEduQ3" />
  //       When is the best time to do a breast self examination?
  //       <SelectField name="preWomenEduQ4" />
  //       How often should you do a breast self examination?
  //       <SelectField name="preWomenEduQ5" />
  //       You should go to the doctor if you notice:
  //       <SelectField name="preWomenEduQ6" />
  //     </Fragment>
  //   ),

  //   "Post-Women's Education Quiz": (info) => (
  //     <Fragment>
  //       From a scale of 1-5, how much do you know about menstrual cycles? 1 being not at all, and 5 being a lot
  //       <SelectField name="postWomenEduSurvey1" />
  //       Which of the following is/are normal symptom(s) of menstrual periods?
  //       <SelectField name="postWomenEduQ1" />
  //       All of the following are reasons for missed periods except
  //       <SelectField name="postWomenEduQ2" />
  //       Which of the following is true about menstruation
  //       <SelectField name="postWomenEduQ3" />
  //       When is the best time to do a breast self examination?
  //       <SelectField name="postWomenEduQ4" />
  //       How often should you do a breast self examination?
  //       <SelectField name="postWomenEduQ5" />
  //       You should go to the doctor if you notice:
  //       <SelectField name="postWomenEduQ6" />
  //     </Fragment>
  //   ),
  // },

  // "Women's Edu": (info) => (
  //   <Fragment>
  //     <BoolField name="womensEduCompleted" />
  //   </Fragment>
  // ),

  "Doctors' Consult": (info) => (
    <Fragment>
      {requireDoctorConsult(info)}
      Chief complaint
      <SelectField name="docConsult1" />
      <DisplayIf condition={context => Array.isArray(context.model.docConsult1) && context.model.docConsult1.includes('Others (free text)')}><Fragment>
        Other complaints
        <TextField name="otherComplaints" />
      </Fragment></DisplayIf>
      Doctors' notes/advice
      <LongTextField name="docConsult2" />
      <BoolField name="docConsult3" />
      <DisplayIf condition={context => context.model.docConsult3 === true}><Fragment>
        Referral details
        <LongTextField name="docConsult4" />
      </Fragment></DisplayIf>
      Name of doctor
      <TextField name="docConsult5" />
    </Fragment>
  ),

  // "Eye Screening": (info) => (
  //   <Fragment>
  //     <BoolField name="specs" />
  //     Visual Acuity
  //     <Grid
  //       container
  //       direction="column"
  //       justify="flex-start"
  //       alignItems="center"
  //     >
  //       <Grid container direction="row" justify="space-around" alignItems="center" item>
  //         <Grid item xs={5}>
  //           <TextField name="rightWoGlass" />
  //         </Grid>
  //         <Grid item xs={5}>
  //           <TextField name="leftWoGlass" />
  //         </Grid>
  //       </Grid>
  //       <DisplayIf condition={context => context.model.specs == true}><Fragment>
  //         <Grid container  direction="row" justify="space-around" alignItems="center" item>
  //           <Grid item xs={5} item>
  //             <TextField name="rightWiGlass" />
  //           </Grid>
  //           <Grid item xs={5} item>
  //             <TextField name="leftWiGlass" />
  //           </Grid>
  //         </Grid>
  //       </Fragment></DisplayIf>

  //       <Grid container  direction="row" justify="space-around" alignItems="center" item>
  //         <Grid item xs={5} item>
  //           <TextField name="rightNearVis" />
  //         </Grid>
  //         <Grid item xs={5} item>
  //           <TextField name="leftNearVis" />
  //         </Grid>
  //       </Grid>
  //     </Grid>
      
  //     <Divider /><br /> 
  //     Finding in the Eye
  //     <Grid
  //       container
  //       direction="column"
  //       justify="flex-start"
  //       alignItems="center"
  //     >
  //       <Grid container direction="row" justify="space-around" alignItems="center" item>
  //         <Grid item xs={5}>
  //           <TextField name="lidsRight" />
  //         </Grid>
  //         <Grid item xs={5}>
  //           <TextField name="lidsLeft" />
  //         </Grid>
  //       </Grid>

  //       <Grid container  direction="row" justify="space-around" alignItems="center" item>
  //         <Grid item xs={5} item>
  //           <TextField name="conjunctivaRight" />
  //         </Grid>
  //         <Grid item xs={5} item>
  //           <TextField name="conjunctivaLeft" />
  //         </Grid>
  //       </Grid>

  //       <Grid container  direction="row" justify="space-around" alignItems="center" item>
  //         <Grid item xs={5} item>
  //           <TextField name="corneaRight" />
  //         </Grid>
  //         <Grid item xs={5} item>
  //           <TextField name="corneaLeft" />
  //         </Grid>
  //       </Grid>

  //       <Grid container  direction="row" justify="space-around" alignItems="center" item>
  //         <Grid item xs={5} item>
  //           <TextField name="antSegRight" />
  //         </Grid>
  //         <Grid item xs={5} item>
  //           <TextField name="antSegLeft" />
  //         </Grid>
  //       </Grid>

  //       <Grid container  direction="row" justify="space-around" alignItems="center" item>
  //         <Grid item xs={5} item>
  //           <TextField name="irisRight" />
  //         </Grid>
  //         <Grid item xs={5} item>
  //           <TextField name="irisLeft" />
  //         </Grid>
  //       </Grid>

  //       <Grid container  direction="row" justify="space-around" alignItems="center" item>
  //         <Grid item xs={5} item>
  //           <TextField name="pupilRight" />
  //         </Grid>
  //         <Grid item xs={5} item>
  //           <TextField name="pupilLeft" />
  //         </Grid>
  //       </Grid>

  //       <Grid container  direction="row" justify="space-around" alignItems="center" item>
  //         <Grid item xs={5} item>
  //           <TextField name="lensRight" />
  //         </Grid>
  //         <Grid item xs={5} item>
  //           <TextField name="lensLeft" />
  //         </Grid>
  //       </Grid>

  //       <Grid container  direction="row" justify="space-around" alignItems="center" item>
  //         <Grid item xs={5} item>
  //           <TextField name="ocuMvmtRight" />
  //         </Grid>
  //         <Grid item xs={5} item>
  //           <TextField name="ocuMvmtLeft" />
  //         </Grid>
  //       </Grid>

  //       <Grid container  direction="row" justify="space-around" alignItems="center" item>
  //         <Grid item xs={5} item>
  //           <TextField name="iopRight" />
  //         </Grid>
  //         <Grid item xs={5} item>
  //           <TextField name="iopLeft" />
  //         </Grid>
  //       </Grid>

  //       <Grid container  direction="row" justify="space-around" alignItems="center" item>
  //         <Grid item xs={5} item>
  //           <TextField name="ductRight" />
  //         </Grid>
  //         <Grid item xs={5} item>
  //           <TextField name="ductLeft" />
  //         </Grid>
  //       </Grid>
  //     </Grid>

  //     <Divider /><br /> 
  //     Posterior Segment Examination
  //     <Grid
  //       container
  //       direction="column"
  //       justify="flex-start"
  //       alignItems="center"
  //     >
  //       <Grid container direction="row" justify="space-around" alignItems="center" item>
  //         <Grid item xs={5}>
  //           <TextField name="cdrRight" />
  //         </Grid>
  //         <Grid item xs={5}>
  //           <TextField name="cdrLeft" />
  //         </Grid>
  //       </Grid>

  //       <Grid container  direction="row" justify="space-around" alignItems="center" item>
  //         <Grid item xs={5} item>
  //           <TextField name="maculaRight" />
  //         </Grid>
  //         <Grid item xs={5} item>
  //           <TextField name="maculaLeft" />
  //         </Grid>
  //       </Grid>

  //       <Grid container  direction="row" justify="space-around" alignItems="center" item>
  //         <Grid item xs={5} item>
  //           <TextField name="retinaRight" />
  //         </Grid>
  //         <Grid item xs={5} item>
  //           <TextField name="retinaLeft" />
  //         </Grid>
  //       </Grid>
  //     </Grid>
      
  //     <Divider /><br />

  //     <LongTextField name="diagnosis" />
  //     <LongTextField name="advice" />
  //     <LongTextField name="nameDoc" />
  //   </Fragment>
  // ),

  // "Education" : {
  //   "Pre-Education Survey": (info) => (
  //     <Fragment>
  //       {requireEducation(info)}
  //       From a scale of 1-5, how much do you know about metabolic syndrome (Hypertension, Hyperlipidemia, Obesity, High Blood Sugar)?
  //       1 being not at all, and 5 being a lot
  //       <SelectField name="preEduSurvey1" />
  //       From a scale of 1-5, how much do you know about healthy lifestyle and diet?
  //       1 being not at all, and 5 being a lot
  //       <SelectField name="preEduSurvey2" />
  //       From a scale of 1-5, how much do you know about cancer risk factors?
  //       1 being not at all, and 5 being a lot
  //       <SelectField name="preEduSurvey3" />
  //       From a scale of 1-5, how much do you know about good eyecare habits?
  //       1 being not at all, and 5 being a lot
  //       <SelectField name="preEduSurvey4" />
  //       <Divider />
  //       Score
  //     </Fragment>
  //   ),

  //   "Pre-Education Quiz": (info) => (
  //     <Fragment>
  //       {requireEducation(info)}
  //       <Divider variant="middle"/>
  //       You are at higher risk of developing high cholesterol if you
  //       <SelectField name="preEduQuiz1" />
  //       All of the following are complications of diabetes except
  //       <SelectField name="preEduQuiz2" />
  //       How much exercise should we get a week?
  //       <SelectField name="preEduQuiz3" />
  //       What makes up a healthy plate?
  //       <SelectField name="preEduQuiz4" />
  //       Which of the following is the healthier choice to make?
  //       <SelectField name="preEduQuiz5" />
  //       Which of the following is a cancer risk factor(s)?
  //       <SelectField name="preEduQuiz6" />
  //       Which of the following is not considered good eyecare habits?
  //       <SelectField name="preEduQuiz7" />
  //     </Fragment>
  //   ),

  //   "Post-Education Survey": (info) => (
  //     <Fragment>
  //       {requireEducation(info)}
  //       From a scale of 1-5, how much do you know about metabolic syndrome (Hypertension, Hyperlipidemia, Obesity, High Blood Sugar)?
  //       1 being not at all, and 5 being a lot
  //       <SelectField name="postEduSurvey1" />
  //       From a scale of 1-5, how much do you know about healthy lifestyle and diet?
  //       1 being not at all, and 5 being a lot
  //       <SelectField name="postEduSurvey2" />
  //       From a scale of 1-5, how much do you know about cancer risk factors?
  //       1 being not at all, and 5 being a lot
  //       <SelectField name="postEduSurvey3" />
  //       From a scale of 1-5, how much do you know about good eyecare habits?
  //       1 being not at all, and 5 being a lot
  //       <SelectField name="postEduSurvey4" />
  //     </Fragment>
  //   ),

  //   "Post-Education Quiz": (info) => (
  //     <Fragment>
  //       {requireEducation(info)}
  //       You are at higher risk of developing high cholesterol if you
  //       <SelectField name="postEduQuiz1" />
  //       All of the following are complications of diabetes except
  //       <SelectField name="postEduQuiz2" />
  //       How much exercise should we get a week?
  //       <SelectField name="postEduQuiz3" />
  //       What makes up a healthy plate?
  //       <SelectField name="postEduQuiz4" />
  //       Which of the following is the healthier choice to make?
  //       <SelectField name="postEduQuiz5" />
  //       Which of the following is a cancer risk factor(s)?
  //       <SelectField name="postEduQuiz6" />
  //       Which of the following is not considered good eyecare habits?
  //       <SelectField name="postEduQuiz7" />
  //     </Fragment>
  //   ),
  // },

  // "Post-Screening Feedback": (info) => (
  //   <Fragment>
  //     I have had a good experience at the screening
  //     <SelectField name="postScreeningFeedback1" />
  //     I came for the screening because: (Select all that apply)
  //     <AutoField name="postScreeningFeedback2" />
  //     I know that regular health screening is important
  //     <SelectField name="postScreeningFeedback3" />
  //     I know that it is important to detect chronic diseases and cancers early
  //     <SelectField name="postScreeningFeedback4" />
  //     I am willing to take the trouble to attend health screenings
  //     <SelectField name="postScreeningFeedback5" />
  //     I am willing to attend my follow-up sessions
  //     <SelectField name="postScreeningFeedback6" />
  //     The student volunteers attended to my needs
  //     <SelectField name="postScreeningFeedback7" />
  //     The student volunteers were well-trained
  //     <SelectField name="postScreeningFeedback8" />
  //     The waiting time to enter the screening was reasonable
  //     <SelectField name="postScreeningFeedback9" />
  //     The waiting time for each station was reasonable
  //     <SelectField name="postScreeningFeedback10" />
  //     The flow of the screening was easy to follow
  //     <SelectField name="postScreeningFeedback11" />
  //     I would recommend my family/friends to attend this screening
  //     <SelectField name="postScreeningFeedback12" />
  //     What encouraged you to come for our event? Select all that apply
  //     <AutoField name="postScreeningFeedback13" />
  //     How often do you attend a health screening?
  //     <SelectField name="postScreeningFeedback14" />
  //   </Fragment>
  // ),
  

};