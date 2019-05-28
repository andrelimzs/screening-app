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
  "Registration":{
    "Patient Info": (info) => (
      <Fragment>
        <TextField name="name" />
        {/* <HiddenField name="id" /> */}
        <SelectField name="gender" />
        Enter birthdate in dd/mm/yyyy format
        <TextField name="birthday" />
        <NumField name="age" decimal={false} />
        {/* <SomeComp calculation={(model) => (<NumField name="age" decimal={false} value={
          new Date().getFullYear() - Number(model.birthday.substring(model.birthday.length-4,model.birthday.length))
        }/>)} /> */}
        <Divider variant="middle"/>

        <TextField name="district" />
        <TextField name="address" />
        <TextField name="zipcode" decimal={false} /><br />
        <TextField name="contactNumber" decimal={false} />
        <AutoField name="spokenLanguages" />
        <AutoField name="writtenLanguages" />
        <Divider variant="middle"/>

        <RadioField name="anyDrugAllergies" />
        <DisplayIf condition={context => context.model.anyDrugAllergies === "Yes"}>
          <TextField name="drugAllergies" />
        </DisplayIf>
        <Divider variant="middle"/>

        <RadioField name="pregnant" />

      </Fragment>
    ),

    "Patient Profiling": (info) => (
      <Fragment>
            <h2>TB Screening</h2>
            Have you ever been diagnosed with tuberculosis?
            <RadioField name="TBQ1" />
            Have you ever lived with someone with tuberculosis?
            <SelectField name="TBQ2" />
            Do you have any of the following symptoms? Select all that apply
            <AutoField name="TBQ3" />
            <DisplayIf condition={context => (
              context.model.TBQ1 === "Yes" ||
              context.model.TBQ2 === 'Yes, the person was diagnosed with TB within the past 4 months' ||
              typeof(context.model.TBQ3) !== "undefined" && context.model.TBQ3.length > 0 && !context.model.TBQ3.includes('None of the above')
            )}><Fragment>
              <Typography color='secondary' variant='h5'>
                Immediate Doctor's consult for TB
              </Typography>
            </Fragment></DisplayIf>

            <h2>Medical history: others</h2>
            Do you have any medical conditions we should take note of? (if none, indicate NIL)
            <AutoField name="medicalHistory1" />
            <DisplayIf condition={context => Array.isArray(context.model.medicalHistory1) && context.model.medicalHistory1.includes('Others')}><Fragment>
              Other medical conditions
              <LongTextField name="otherMedicalConditions" />
            </Fragment></DisplayIf>
            How are you managing these conditions? (check-ups, medicines, diet/exercise, others)
            <TextField name="medicalHistory2" />

            <h2>Ocular History</h2>
            Have you had any eye surgeries?
            <RadioField name="ocularHisQ1a" />
            <DisplayIf condition={context => context.model.ocularHisQ1a === "Yes"}><Fragment>
              If yes to 1a, please specify
              <TextField name="ocularHisQ1b" />
            </Fragment></DisplayIf>
            Any previous trauma to the eye?
            <RadioField name="ocularHisQ2a" />
            <DisplayIf condition={context => context.model.ocularHisQ2a === "Yes"}><Fragment>
              If yes to 2a, please specify
              <TextField name="ocularHisQ2b" />
            </Fragment></DisplayIf>
            Are you under the care of any eye specialist or receiving treatment for the eye from any hospital/clinic?
            <RadioField name="ocularHisQ3a" />
            <DisplayIf condition={context => context.model.ocularHisQ3a === "Yes"}><Fragment>
              If yes to 3a, please specify where
              <TextField name="ocularHisQ3b" />
              If yes to 3a, when was your last review?
              <TextField name="ocularHisQ3c" />
              If yes to 3a, what was the condition?
              <AutoField name="ocularHisQ3d" />
            </Fragment></DisplayIf>
            <DisplayIf condition={context => Array.isArray(context.model.ocularHisQ3d) && context.model.ocularHisQ3d.includes('Others (please specify)')}><Fragment> 
              <TextField name="otherOcularCond" />
            </Fragment></DisplayIf>          
            Have you had any falls in the last 1 year?
            <RadioField name="ocularHisQ4" />
            How do you perceive your vision?
            <SelectField name="ocularHisQ5a" />
            <DisplayIf condition={context => context.model.ocularHisQ5a === "Poor"}><Fragment>
              If answer to 5a was 'Poor', do you intend to seek medical help?
              <RadioField name="ocularHisQ5b" />
            </Fragment></DisplayIf>
            <DisplayIf condition={context => context.model.ocularHisQ5b === "No"}><Fragment>
              If no to 5b, why?
              <AutoField name="ocularHisQ5c" />
            </Fragment></DisplayIf>
            <DisplayIf condition={context => Array.isArray(context.model.ocularHisQ5c) && context.model.ocularHisQ5c.includes('Others (please specify)')}><Fragment>
              <TextField name="otherReasons" />
            </Fragment></DisplayIf>
      </Fragment>
      
    ),

    "Station Selection": (info) => (
      <Fragment>
      <h2>Height and Weight + Waist:Hip measurement</h2>
      Can we measure your height, weight, waist size and hip size?
      <RadioField name="stationSelect1" />

      <h2>Blood glucose and Hb</h2>
      Can we check your blood sugar? This will be done by pricking your finger to get a small drop of blood
      <RadioField name="stationSelect2" />

      Can we check if you have anemia? This will be done by pricking your finger to get a small drop of blood
      <RadioField name="stationSelect3" />
      
      <h2>BP</h2>
      Can we check your blood pressure?
      <RadioField name="stationSelect4" />

      <h2>Phlebotomy (for patients aged 40 years old and above)</h2>
      {/* For patients aged 40 years old and above, Do you have the following conditions?
      <AutoField name="stationSelect5" />
      <DisplayIf condition={context => Array.isArray(context.model.stationSelect5) && context.model.stationSelect5.length >= 2}><Fragment>
        Can we do a blood test to see if you have high cholesterol? A blood sample will be taken by a trained staff. This will then be sent to the lab, and a report will be mailed to you after some time
        <RadioField name="stationSelect6" />
      </Fragment></DisplayIf> */}
      Can we do a blood test to see if you have high cholesterol? A blood sample will be taken by a trained staff. This will then be sent to the lab, and a report will be mailed to you after some time
      <RadioField name="stationSelect6" />

      <h2>Pap Smear</h2>
      Are you married (or have you ever been married)?
      <RadioField name="stationSelect7" />
      <DisplayIf condition={context => context.model.stationSelect7 === "Yes"}><Fragment>
        If yes to Q7, have you done a Pap smear in the past 3 years?
        <RadioField name="stationSelect8" />
      </Fragment></DisplayIf>
      <DisplayIf condition={context => context.model.stationSelect8 === "No"}><Fragment>
        If no to Q8, would you want to undergo a free Pap smear today to check for cervical cancer?
        <RadioField name="stationSelect9" />
      </Fragment></DisplayIf>

      <h2>Breast</h2>
      Would you want to undergo a breast examination for breast cancer today? 
      <RadioField name="stationSelect10" />

      <h2>Women's Edu</h2>
      Can we teach you about women's health? For adults, we will be sharing about menstrual health and breast self examinations. For girls aged 10-18 years old, we will be sharing about menstrual health only.
      <RadioField name="stationSelect11" />

      <h2>Doctors' consult</h2>
      Would you like to see a doctor today? (You will be asked to see the doctor if your test results are abnormal, but would you otherwise want to see the doctor?)
      <RadioField name="stationSelect12" />

      <h2>Eye screening</h2>
      Can we check your eyes/vision?
      <RadioField name="stationSelect13" />

      <h2>Education</h2>
      Can we teach you about healthy lifestyles and how to prevent common diseases like diabetes and high blood pressure?
      <RadioField name="stationSelect14" />
      </Fragment>
    ),
  },


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

  "Phlebotomy": (info) => (
    <Fragment>
      <BoolField name="phleboCompleted" />
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

  "Women's Edu": {
    "Pre-Women's Education Quiz": (info) => (
      <Fragment>
        Breast education completed?
        <RadioField name="eduCompleted" />
        From a scale of 1-5, how much do you know about menstrual cycles? 1 being not at all, and 5 being a lot
        <SelectField name="preWomenEduSurvey1" />
        Which of the following is/are normal symptom(s) of menstrual periods?
        <SelectField name="preWomenEduQ1" />
        All of the following are reasons for missed periods except
        <SelectField name="preWomenEduQ2" />
        Which of the following is true about menstruation
        <SelectField name="preWomenEduQ3" />
        When is the best time to do a breast self examination?
        <SelectField name="preWomenEduQ4" />
        How often should you do a breast self examination?
        <SelectField name="preWomenEduQ5" />
        You should go to the doctor if you notice:
        <SelectField name="preWomenEduQ6" />
      </Fragment>
    ),

    "Post-Women's Education Quiz": (info) => (
      <Fragment>
        From a scale of 1-5, how much do you know about menstrual cycles? 1 being not at all, and 5 being a lot
        <SelectField name="postWomenEduSurvey1" />
        Which of the following is/are normal symptom(s) of menstrual periods?
        <SelectField name="postWomenEduQ1" />
        All of the following are reasons for missed periods except
        <SelectField name="postWomenEduQ2" />
        Which of the following is true about menstruation
        <SelectField name="postWomenEduQ3" />
        When is the best time to do a breast self examination?
        <SelectField name="postWomenEduQ4" />
        How often should you do a breast self examination?
        <SelectField name="postWomenEduQ5" />
        You should go to the doctor if you notice:
        <SelectField name="postWomenEduQ6" />
      </Fragment>
    ),
  },

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

  "Post-Screening Feedback": (info) => (
    <Fragment>
      I have had a good experience at the screening
      <SelectField name="postScreeningFeedback1" />
      I came for the screening because: (Select all that apply)
      <AutoField name="postScreeningFeedback2" />
      I know that regular health screening is important
      <SelectField name="postScreeningFeedback3" />
      I know that it is important to detect chronic diseases and cancers early
      <SelectField name="postScreeningFeedback4" />
      I am willing to take the trouble to attend health screenings
      <SelectField name="postScreeningFeedback5" />
      I am willing to attend my follow-up sessions
      <SelectField name="postScreeningFeedback6" />
      The student volunteers attended to my needs
      <SelectField name="postScreeningFeedback7" />
      The student volunteers were well-trained
      <SelectField name="postScreeningFeedback8" />
      The waiting time to enter the screening was reasonable
      <SelectField name="postScreeningFeedback9" />
      The waiting time for each station was reasonable
      <SelectField name="postScreeningFeedback10" />
      The flow of the screening was easy to follow
      <SelectField name="postScreeningFeedback11" />
      I would recommend my family/friends to attend this screening
      <SelectField name="postScreeningFeedback12" />
      What encouraged you to come for our event? Select all that apply
      <AutoField name="postScreeningFeedback13" />
      How often do you attend a health screening?
      <SelectField name="postScreeningFeedback14" />
    </Fragment>
  ),
  

};