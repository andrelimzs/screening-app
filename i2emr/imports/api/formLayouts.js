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

// Define DisplayIf
// Used to display fields depending on another field's response
const DisplayIf = ({children, condition}, {uniforms}) => (condition(uniforms) ? Children.only(children) : nothing);
DisplayIf.contextTypes = BaseField.contextTypes;

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
          <RadioField name="drugAllergies" />
        </DisplayIf>
        <Divider variant="middle"/>

        <RadioField name="pregnant" />

      </Fragment>
    ),

    "Patient Profiling": (info) => (
      <Fragment>
        <h2>Diabetes Mellitus</h2>
        Has a western-trained doctor ever told you that you have diabetes?
        <RadioField name="patientProfile1" />
          <DisplayIf condition={context => context.model.patientProfile1 === "No"}><Fragment>
            If no to Q1, when was the last time you checked your blood sugar?
            <SelectField name="patientProfile2" />
            If no to Q1, do you have any of the following symptoms? (select all that apply)
            <AutoField name="patientProfile3" />
          </Fragment></DisplayIf>
          <DisplayIf condition={context => context.model.patientProfile1 === "Yes"}><Fragment>
            If yes to Q1, how often are you seeing your doctor for your diabetes?
            <SelectField name="patientProfile4" />
            If yes to Q1, are you taking any medication for your diabetes? If so, can you name them?
            <BoolField name="anyWesternMedicine" />
          </Fragment></DisplayIf>
          <DisplayIf condition={context => context.model.anyWesternMedicine === true}><Fragment>
            <TextField name="westernMedicine" />
            If yes to Western medicine, how many times do you forget to take your diabetes medication in a week?
            <SelectField name="patientProfile6" />
          </Fragment></DisplayIf>
          <DisplayIf condition={context => context.model.patientProfile1 === "Yes"}><Fragment>
            <BoolField name="anyTraditionalMedicine" />
          </Fragment></DisplayIf>
          <DisplayIf condition= {context => context.model.anyTraditionalMedicine === true}><Fragment>
            <TextField name="traditionalMedicine" />
          </Fragment></DisplayIf>
        
        <h2>Hyperlipidemia</h2>
        Has a western-trained doctor ever told you that you have high cholesterol?
        <RadioField name="hyperlipidemiaQ1" />
        <DisplayIf condition={context => context.model.hyperlipidemiaQ1 === "No"}><Fragment>
          If no to Q1, when was the last time you checked your blood cholesterol?
          <SelectField name="hyperlipidemiaQ2" />
        </Fragment></DisplayIf>
        <DisplayIf condition={context => context.model.hyperlipidemiaQ1 === "Yes"}><Fragment>
          If yes to Q1, how often are you seeing your doctor for your high cholesterol?
          <SelectField name="hyperlipidemiaQ3" />
          If yes to Q1, are you taking any medication for your high cholesterol? If so, can you name them?
          <BoolField name="hyperlipidemiaAnyWesternMedicine" />
          </Fragment></DisplayIf>
          <DisplayIf condition={context => context.model.hyperlipidemiaAnyWesternMedicine === true}><Fragment>
            <TextField name="hyperlipidemiaWesternMedicine" />
            If yes to taking Western medicine, how many times do you forget to take your high cholesterol medication in a week?
            <SelectField name="hyperlipidemiaQ5" />
          </Fragment></DisplayIf>
          <DisplayIf condition={context => context.model.hyperlipidemiaQ1 === "Yes"}><Fragment> 
            <BoolField name="hyperlipidemiaAnyTraditionalMedicine" />
            <DisplayIf condition= {context => context.model.hyperlipidemiaAnyTraditionalMedicine === true}><Fragment>
              <TextField name="hyperlipidemiaTraditionalMedicine" />
            </Fragment></DisplayIf>
          </Fragment></DisplayIf>

          <h2>Hypertension</h2>
          Has a western-trained doctor ever told you that you have high blood pressure (BP)?
          <RadioField name="hypertensionQ1" />
          When was the last time you checked your blood pressure?
          <SelectField name="hypertensionQ2" />
          <DisplayIf condition={context => context.model.hypertensionQ1 === "Yes"}><Fragment>
            If yes to Q1, how often are you seeing your doctor for your high blood pressure?
            <SelectField name="hypertensionQ3" />
            If yes to Q1, are you taking any medication for your high blood pressure? If so, can you name them?
            <BoolField name="hypertensionAnyWesternMedicine" />
            </Fragment></DisplayIf>
            <DisplayIf condition={context => context.model.hypertensionAnyWesternMedicine === true}><Fragment>
              <TextField name="hypertensionWesternMedicine" />
              If yes to taking Western medicine, how many times do you forget to take your high blood pressure medication in a week?
              <SelectField name="hypertensionQ5" />
            </Fragment></DisplayIf>
            <DisplayIf condition={context => context.model.hypertensionQ1 === "Yes"}><Fragment> 
              <BoolField name="hypertensionAnyTraditionalMedicine" />
              <DisplayIf condition= {context => context.model.hypertensionAnyTraditionalMedicine === true}><Fragment>
                <TextField name="hypertensionTraditionalMedicine" />
              </Fragment></DisplayIf>
            </Fragment></DisplayIf>

            <h2>TB Screening</h2>
            Have you ever been diagnosed with tuberculosis?
            <RadioField name="TBQ1" />
            Have you ever lived with someone with tuberculosis?
            <SelectField name="TBQ2" />
            Do you have any of the following symptoms? Select all that apply
            <AutoField name="TBQ3" />
            
            <h2>Medical history: others</h2>
            Do you have any medical conditions we should take note of? (if none, indicate NIL)
            <TextField name="medicalHistory1" />
            How are you managing these conditions? (check-ups, medicines, diet/exercise, others)
            <TextField name="medicalHistory2" />
            Where do you go to for routine healthcare?
            <TextField name="medicalHistory3" />
            Where do you go to for emergency medical services (eg. fall, injury, fainting)?
            <TextField name="medicalHistory4" />
            Are you taking any other medications? (If yes, indicate what medication and why. If none, indicate NIL)
            <TextField name="medicalHistory5" />

            <h2>Surgery and hospitalisations</h2>
            Have you had any surgery previously?
            <RadioField name="surgAndHospQ1" />
            <DisplayIf condition={context => context.model.surgAndHospQ1 === "Yes"}><Fragment>
              If yes to Q1, what surgery?
              <TextField name="surgAndHospQ2" />
            </Fragment></DisplayIf>
            Have you been hospitalised in the past 5 years? 
            <RadioField name="surgAndHospQ3" />
            <DisplayIf condition={context => context.model.surgAndHospQ3 === "Yes"}><Fragment>
              If yes to Q3, why were you hospitalised?
              <TextField name="surgAndHospQ4" />
            </Fragment></DisplayIf>

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

            <h2>Barriers to Healthcare</h2>
            What type of doctor do you see for your existing conditions?
            <SelectField name="barrierQ1" />
            <DisplayIf condition={context => context.model.barrierQ1 === "Seldom/Never visits the doctor"}><Fragment>
              If answer to Q1 was 'Seldom/Never visits the doctor', why do you not follow-up with your doctor for your existing conditions?
              <BoolField name="noNeed" />
              <BoolField name="time" />
              <BoolField name="mobility" />
              <BoolField name="financial" />
              <BoolField name="scared" />
              <BoolField name="preferTradMed" />
              <BoolField name="anyOtherBarriers" />
            </Fragment></DisplayIf>
            <DisplayIf condition={context => context.model.anyOtherBarriers === true}><Fragment>
              <TextField name="otherBarriers" />
            </Fragment></DisplayIf>

            <h2>Family History</h2>
            Do your parents, siblings or children have any of the following conditions? Note: CAD = coronary artery disease (narrowed blood vessels supplying heart muscle)
            <AutoField name="familyHistory" />

            <h2>Framingham Lipids Risk Stratification</h2>
            Has a doctor told you that you have any heart problems? If yes, please elaborate
            <TextField name="FLRSQ1" />
            Have you ever been diagnosed by your doctor to have a stroke?
            <RadioField name="FLRSQ2" />
            Has your doctor ever told you that you have any problems with your blood vessels/blood flow? If yes, please elaborate
            <TextField name="FLRSQ3" />
            Have you ever been diagnosed by your doctor to have chronic kidney disease?
            <RadioField name="FLRSQ4" />
            Do you currently smoke?
            <RadioField name="FLRSQ5" />
            <DisplayIf condition={context => context.model.FLRSQ5 === "Yes"}><Fragment>
              If yes to Q5, what do you smoke? (select all that apply)
              <AutoField name="FLRSQ6" />
              If yes to Q5, how much do you smoke?
              <SelectField name="FLRSQ7" />
              If yes to Q5, how many years have you been smoking for?
              <TextField name="FLRSQ8" />
            </Fragment></DisplayIf>
            <DisplayIf condition={context => context.model.FLRSQ5 === "No"}><Fragment>
              If no to Q5, have you ever smoked before?
              <SelectField name="FLRSQ9" />
            </Fragment></DisplayIf>
            Do you chew paan or tobacco?
            <RadioField name="FLRSQ10" />

            <h2>Social History</h2>
            Do you drink alcohol?
            <RadioField name="socialHisQ1" />
            <DisplayIf condition={context => context.model.socialHisQ1 === "Yes"}><Fragment>
              If yes to Q1, how many glasses of alcohol do you drink per day?
              <NumField name="socialHisQ2" />
            </Fragment></DisplayIf>
            What is your occupation?
            <BoolField name="student" />
            <BoolField name="housewife" />
            <BoolField name="relig" />
            <BoolField name="prof" />
            <BoolField name="service" />
            <BoolField name="manual" />
            <BoolField name="skilledLab" />
            <BoolField name="farming" />
            <BoolField name="mining" />
            <BoolField name="manu" />
            <BoolField name="unemployed" />
            <BoolField name="anyOtherOcc" />
            <DisplayIf condition={context => context.model.anyOtherOcc === true}><Fragment>
              If yes to Q1, how many glasses of alcohol do you drink per day?
              <TextField name="otherOcc" />
            </Fragment></DisplayIf>
            Nature of work/lifestyle
            <SelectField name="socialHisQ4" />
            <DisplayIf condition={context => context.model.socialHisQ3 === "Farming/Agriculture"}><Fragment>
              If answer to Q3 is 'Farming/agriculture', do you use pesticides in your farming?
              <RadioField name="socialHisQ5" />
            </Fragment></DisplayIf>
            Monthly Income in INR (only if participant is willing to disclose)<br />
            <NumField name="socialHisQ6" />
            <Divider variant="middle" />Marital status
            <SelectField name="socialHisQ7" />
            Number of children<br />
            <NumField name="socialHisQ8"/>
            <Divider variant="middle" />
            How many people live in your household (including you)?<br />
            <NumField name="socialHisQ9"/>
            <Divider variant="middle" />
            How many dependents are there in your household (children, spouse, parents, relatives living with you who rely on you for financial support)?
            <NumField name="socialHisQ10"/>
            <Divider variant="middle" />
            How many people in your household contribute to household income?<br />
            <NumField name="socialHisQ11"/>
            <Divider variant="middle" />
            How many people in your household do not contribute to or depend on household income? (KIV)
            <Divider variant="middle" />
            What is your highest education level?
            <SelectField name="socialHisQ13" />
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
      For patients aged 40 years old and above, Do you have the following conditions?
      <AutoField name="stationSelect5" />
      <DisplayIf condition={context => Array.isArray(context.model.stationSelect5) && context.model.stationSelect5.length >= 2}><Fragment>
        Can we do a blood test to see if you have high cholesterol? A blood sample will be taken by a trained staff. This will then be sent to the lab, and a report will be mailed to you after some time
        <RadioField name="stationSelect6" />
      </Fragment></DisplayIf>
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
      {/* {typeof(info["Patient Info"]) !== "undefined" && info["Patient Info"].age} */}
      <TextField name="height" />
      <br />
      <TextField name="weight" />
      <br />
      <h2>Waist:Hip</h2>
      <TextField name="waist" />
      <br />
      <TextField name="hip" />
      <br />
      <h2>Overview</h2>
      <BoolField name="docConsultForHW" />
    </Fragment>
  ),

  "Blood Glucose & Hb": (info) => (
    <Fragment>
      <TextField name="cbg" />
      <br />
      <TextField name="hb" />
      <br />
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
      <BoolField name="eduCompleted" />
    </Fragment>
  ),

  "Women's Edu": {
    "Pre-Women's Education Quiz": (info) => (
      <Fragment>
        Completed breast examination?
        <BoolField name="breastCompleted" />
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
      { typeof(info["Height & weight"]) !== "undefined" && info["Height & weight"][0].docConsultForHW &&
        <Typography
          color='secondary'>
          Required from Height and Weight Station
        </Typography> }
      { typeof(info["Blood Glucose & Hb"]) !== "undefined" && info["Blood Glucose & Hb"][0].docConsultForBloodGlucAndHb &&
      <Typography
        color='secondary'>
        Required from Blood Glucose and Hb Station
      </Typography> }
      { typeof(info["Pap Smear"]) !== "undefined" && info["Pap Smear"][0].docConsultForPap &&
      <Typography
        color='secondary'>
        Required from Pap Smear Station
      </Typography> }
      { typeof(info["Blood Pressure"]) !== "undefined" && info["Blood Pressure"][0].docConsultForBP &&
      <Typography
        color='secondary'>
        Required from Blood Pressure Station
      </Typography> }
        <Divider variant="middle"/>
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

  "Eye Screening": (info) => (
    <Fragment>
      <BoolField name="specs" />
      <TextField name="rightWoGlass" />
      <TextField name="leftWoGlass" />
      <TextField name="rightWiGlass" />
      <TextField name="leftWiGlass" />
      <TextField name="rightNearVis" />
      <TextField name="leftNearVis" />
      <LongTextField name="lids" />
      <LongTextField name="conjunctiva" />
      <LongTextField name="cornea" />
      <LongTextField name="antSeg" />
      <LongTextField name="iris" />
      <LongTextField name="pupil" />
      <LongTextField name="lens" />
      <LongTextField name="ocuMvmt" />
      <LongTextField name="iop" />
      <LongTextField name="duct" />
      <LongTextField name="cdr" />
      <LongTextField name="macula" />
      <LongTextField name="retina" />
      <LongTextField name="diagnosis" />
      <LongTextField name="advice" />
      <LongTextField name="nameDoc" />
    </Fragment>
  ),

  "Education" : {
    "Pre-Education Survey": (info) => (
      <Fragment>
        From a scale of 1-5, how much do you know about metabolic syndrome (Hypertension, Hyperlipidemia, Obesity, High Blood Sugar)?
        1 being not at all, and 5 being a lot
        <SelectField name="preEduSurvey1" />
        From a scale of 1-5, how much do you know about healthy lifestyle and diet?
        1 being not at all, and 5 being a lot
        <SelectField name="preEduSurvey2" />
        From a scale of 1-5, how much do you know about cancer risk factors?
        1 being not at all, and 5 being a lot
        <SelectField name="preEduSurvey3" />
        From a scale of 1-5, how much do you know about good eyecare habits?
        1 being not at all, and 5 being a lot
        <SelectField name="preEduSurvey4" />
      </Fragment>
    ),

    "Pre-Education Quiz": (info) => (
      <Fragment>
        You are at higher risk of developing high cholesterol if you
        <SelectField name="preEduQuiz1" />
        All of the following are complications of diabetes except
        <SelectField name="preEduQuiz2" />
        How much exercise should we get a week?
        <SelectField name="preEduQuiz3" />
        What makes up a healthy plate?
        <SelectField name="preEduQuiz4" />
        Which of the following is the healthier choice to make?
        <SelectField name="preEduQuiz5" />
        Which of the following is a cancer risk factor(s)?
        <SelectField name="preEduQuiz6" />
        Which of the following is not considered good eyecare habits?
        <SelectField name="preEduQuiz7" />
      </Fragment>
    ),

    "Post-Education Survey": (info) => (
      <Fragment>
        From a scale of 1-5, how much do you know about metabolic syndrome (Hypertension, Hyperlipidemia, Obesity, High Blood Sugar)?
        1 being not at all, and 5 being a lot
        <SelectField name="postEduSurvey1" />
        From a scale of 1-5, how much do you know about healthy lifestyle and diet?
        1 being not at all, and 5 being a lot
        <SelectField name="postEduSurvey2" />
        From a scale of 1-5, how much do you know about cancer risk factors?
        1 being not at all, and 5 being a lot
        <SelectField name="postEduSurvey3" />
        From a scale of 1-5, how much do you know about good eyecare habits?
        1 being not at all, and 5 being a lot
        <SelectField name="postEduSurvey4" />
      </Fragment>
    ),

    "Post-Education Quiz": (info) => (
      <Fragment>
        You are at higher risk of developing high cholesterol if you
        <SelectField name="postEduQuiz1" />
        All of the following are complications of diabetes except
        <SelectField name="postEduQuiz2" />
        How much exercise should we get a week?
        <SelectField name="postEduQuiz3" />
        What makes up a healthy plate?
        <SelectField name="postEduQuiz4" />
        Which of the following is the healthier choice to make?
        <SelectField name="postEduQuiz5" />
        Which of the following is a cancer risk factor(s)?
        <SelectField name="postEduQuiz6" />
        Which of the following is not considered good eyecare habits?
        <SelectField name="postEduQuiz7" />
      </Fragment>
    ),
  },

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