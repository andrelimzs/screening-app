import React, { Component, Fragment } from 'react';

import Divider from '@material-ui/core/Divider';

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

// Define DisplayIf
// Used to display fields depending on another field's response
const DisplayIf = ({children, condition}, {uniforms}) => (condition(uniforms) ? Children.only(children) : nothing);
DisplayIf.contextTypes = BaseField.contextTypes;

// Define the layouts
export const formLayouts = {
  "Registration":
    (
      <Fragment>
        <TextField name="name" />
        <HiddenField name="id" />
        <SelectField name="gender" />
        <DateField name="birthday" labelProps={{shrink: true, disableAnimation: false}}/>
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
          <TextField name="drugAllergies" />
        </DisplayIf>
        <Divider variant="middle"/>

        <RadioField name="pregnant" />

      </Fragment>
    ),

  "Patient Profiling": (
    <Fragment>
      <h2>Diabetes Mellitus</h2>
      Has a western-trained doctor ever told you that you have diabetes?
      <RadioField name="Q1" />
        <DisplayIf condition={context => context.model.Q1 === "No"}><Fragment>
          If no to Q1, when was the last time you checked your blood sugar?
          <SelectField name="Q2" />
          If no to Q1, do you have any of the following symptoms? (select all that apply)
          <AutoField name="Q3" />
        </Fragment></DisplayIf>
        <DisplayIf condition={context => context.model.Q1 === "Yes"}><Fragment>
          If yes to Q1, how often are you seeing your doctor for your diabetes?
          <SelectField name="Q4" />
          If yes to Q1, are you taking any medication for your diabetes? If so, can you name them?
          <BoolField name="anyWesternMedicine" />
        </Fragment></DisplayIf>
        <DisplayIf condition={context => context.model.anyWesternMedicine === true}><Fragment>
          <TextField name="westernMedicine" />
          If yes to Western medicine, how many times do you forget to take your diabetes medication in a week?
          <SelectField name="Q6" />
        </Fragment></DisplayIf>
        <DisplayIf condition={context => context.model.Q1 === "Yes"}><Fragment>
          <BoolField name="anyTraditionalMedicine" />
        </Fragment></DisplayIf>
        <DisplayIf condition= {context => context.model.anyTraditionalMedicine === true}><Fragment>
          <TextField name="traditionalMedicine" />
        </Fragment></DisplayIf>
      
      <h2>Hyperlipidemia</h2>
      Has a western-trained doctor ever told you that you have high cholesterol?
      <RadioField name="hypQ1" />
      <DisplayIf condition={context => context.model.hypQ1 === "No"}><Fragment>
        If no to Q1, when was the last time you checked your blood cholesterol?
        <SelectField name="hypQ2" />
      </Fragment></DisplayIf>
      <DisplayIf condition={context => context.model.hypQ1 === "Yes"}><Fragment>
        If yes to Q1, how often are you seeing your doctor for your high cholesterol?
        <SelectField name="hypQ3" />
        If yes to Q1, are you taking any medication for your high cholesterol? If so, can you name them?
        <BoolField name="hypAnyWesternMedicine" />
        </Fragment></DisplayIf>
        <DisplayIf condition={context => context.model.hypAnyWesternMedicine === true}><Fragment>
          <TextField name="hypWesternMedicine" />
          If yes to taking Western medicine, how many times do you forget to take your high cholesterol medication in a week?
          <SelectField name="hypQ5" />
        </Fragment></DisplayIf>
        <DisplayIf condition={context => context.model.hypQ1 === "Yes"}><Fragment> 
          <BoolField name="hypAnyTraditionalMedicine" />
          <DisplayIf condition= {context => context.model.hypAnyTraditionalMedicine === true}><Fragment>
            <TextField name="hypTraditionalMedicine" />
          </Fragment></DisplayIf>
        </Fragment></DisplayIf>

        <h2>Hypertension</h2>
        Has a western-trained doctor ever told you that you have high blood pressure (BP)?
        <RadioField name="htQ1" />
        When was the last time you checked your blood pressure?
        <SelectField name="htQ2" />
        <DisplayIf condition={context => context.model.htQ1 === "Yes"}><Fragment>
          If yes to Q1, how often are you seeing your doctor for your high blood pressure?
          <SelectField name="htQ3" />
          If yes to Q1, are you taking any medication for your high blood pressure? If so, can you name them?
          <BoolField name="htAnyWesternMedicine" />
          </Fragment></DisplayIf>
          <DisplayIf condition={context => context.model.htAnyWesternMedicine === true}><Fragment>
            <TextField name="htWesternMedicine" />
            If yes to taking Western medicine, how many times do you forget to take your high blood pressure medication in a week?
            <SelectField name="htQ5" />
          </Fragment></DisplayIf>
          <DisplayIf condition={context => context.model.htQ1 === "Yes"}><Fragment> 
            <BoolField name="htAnyTraditionalMedicine" />
            <DisplayIf condition= {context => context.model.htAnyTraditionalMedicine === true}><Fragment>
              <TextField name="htTraditionalMedicine" />
            </Fragment></DisplayIf>
          </Fragment></DisplayIf>

          <h2>TB Screening</h2>
          Have you ever been diagnosed with tuberculosis?
          <SelectField name="TB1" />
          Have you ever lived with someone with tuberculosis?
          <SelectField name="TB2" />
          Do you have any of the following symptoms? Select all that apply
          <AutoField name="TB3" />
          
          <h2>Medical history: others</h2>
          Do you have any medical conditions we should take note of? (if none, indicate NIL)
          <TextField name="MH1" />
          How are you managing these conditions? (check-ups, medicines, diet/exercise, others)
          <TextField name="MH2" />
          Where do you go to for routine healthcare?
          <TextField name="MH3" />
          Where do you go to for emergency medical services (eg. fall, injury, fainting)?
          <TextField name="MH4" />
          Are you taking any other medications? (If yes, indicate what medication and why. If none, indicate NIL)
          <TextField name="MH5" />

          <h2>Surgery and hospitalisations</h2>
          Have you had any surgery previously?
          <SelectField name="S1" />
          <DisplayIf condition={context => context.model.S1 === "Yes"}><Fragment>
            If yes to Q1, what surgery?
            <TextField name="S2" />
          </Fragment></DisplayIf>
          Have you been hospitalised in the past 5 years? 
          <SelectField name="S3" />
          <DisplayIf condition={context => context.model.S3 === "Yes"}><Fragment>
            If yes to Q3, why were you hospitalised?
            <TextField name="S4" />
          </Fragment></DisplayIf>

          <h2>Ocular History</h2>
          Have you had any eye surgeries?
          <SelectField name="O1a" />
          <DisplayIf condition={context => context.model.O1a === "Yes"}><Fragment>
            If yes to 1a, please specify
            <TextField name="O1b" />
          </Fragment></DisplayIf>
          Any previous trauma to the eye?
          <SelectField name="O2a" />
          <DisplayIf condition={context => context.model.O2a === "Yes"}><Fragment>
            If yes to 2a, please specify
            <TextField name="O2b" />
          </Fragment></DisplayIf>
          Are you under the care of any eye specialist or receiving treatment for the eye from any hospital/clinic?
          <SelectField name="O3a" />
          <DisplayIf condition={context => context.model.O3a === "Yes"}><Fragment>
            If yes to 3a, please specify where
            <TextField name="O3b" />
            If yes to 3a, when was your last review?
            <TextField name="O3c" />
            If yes to 3a, what was the condition?
            <BoolField name="cataract" />
            <BoolField name="glaucoma" />
            <BoolField name="diabeticRetinopathy" />
            <BoolField name="amd" />
            <BoolField name="anyOtherOcularCond" />
          </Fragment></DisplayIf>
          <DisplayIf condition={context => context.model.anyOtherOcularCond === true}><Fragment>  
            <TextField name="otherOcularCond" />
          </Fragment></DisplayIf>          
          Have you had any falls in the last 1 year?
          <SelectField name="O4" />
          How do you perceive your vision?
          <SelectField name="O5a" />
          <DisplayIf condition={context => context.model.O5a === "Poor"}><Fragment>
            If answer to 5a was 'Poor', do you intend to seek medical help?
            <SelectField name="O5b" />
          </Fragment></DisplayIf>
          <DisplayIf condition={context => context.model.O5b === "No"}><Fragment>
            If no to 5b, why?
            <BoolField name="concerns" />
            <BoolField name="tooFar" />
            <BoolField name="previousAdvice" />
            <BoolField name="nothing" />
            <BoolField name="anyOtherReasons" />
          </Fragment></DisplayIf>
          <DisplayIf condition={context => context.model.anyOtherReasons === true}><Fragment>
            <TextField name="otherReasons" />
          </Fragment></DisplayIf>




    </Fragment>
    
  ),

  "Height & weight": (
    <Fragment>
      <TextField name="height" />
      <br />
      <TextField name="weight" />
      <br />
      <TextField name="waist" />
      <br />
      <TextField name="hip" />
    </Fragment>
  ),

  "CBG & Hb":(
    <Fragment>
      <TextField name="cbg" />
      <br />
      <TextField name="hb" />
      <br />
    </Fragment>
  ),

  "Phlebotomy":(
    <Fragment>
      <BoolField name="phleboCompleted" />
    </Fragment>
  ),

  "Pap Smear":(
    <Fragment>
      <BoolField name="papCompleted" />
    </Fragment>
  ),
    
  "Breast Exam":(
    <Fragment>
      <BoolField name="breastCompleted" />
      <BoolField name="abnormalities" />
      <LongTextField name="abDescribe" />
      <BoolField name="fnacCompleted" />
      <BoolField name="eduCompleted" />
    </Fragment>
  ),

  "Blood Pressure":(
    <Fragment>
      <div><TextField name="bp1Sys" /></div>
      <div><TextField name="bp1Dia" /></div>
      <div><TextField name="bp2Sys" /></div>
      <div><TextField name="bp2Dia" /></div>
      <div><TextField name="bp3Sys" /></div>
      <div><TextField name="bp3Dia" /></div>
    </Fragment>
  ),

  "Doctors' Consult":(
    <Fragment>
      <BoolField name="consCompleted" />
      <BoolField name="refLetter" />
    </Fragment>
  ),

  "Eye Screening":(
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

  "Pre-Women's Education Quiz":(
    <Fragment>
      From a scale of 1-5, how much do you know about menstrual cycles? 1 being not at all, and 5 being a lot
      <SelectField name="S1" />
      Which of the following is/are normal symptom(s) of menstrual periods?
      <SelectField name="Q1" />
      All of the following are reasons for missed periods except
      <SelectField name="Q2" />
      Which of the following is true about menstruation
      <SelectField name="Q3" />
      When is the best time to do a breast self examination?
      <SelectField name="Q4" />
      How often should you do a breast self examination?
      <SelectField name="Q5" />
      You should go to the doctor if you notice:
      <SelectField name="Q6" />
    </Fragment>
  ),

  "Post-Women's Education Quiz":(
    <Fragment>
      From a scale of 1-5, how much do you know about menstrual cycles? 1 being not at all, and 5 being a lot
      <SelectField name="S1" />
      Which of the following is/are normal symptom(s) of menstrual periods?
      <SelectField name="Q1" />
      All of the following are reasons for missed periods except
      <SelectField name="Q2" />
      Which of the following is true about menstruation
      <SelectField name="Q3" />
      When is the best time to do a breast self examination?
      <SelectField name="Q4" />
      How often should you do a breast self examination?
      <SelectField name="Q5" />
      You should go to the doctor if you notice:
      <SelectField name="Q6" />
    </Fragment>
  ),

  "Pre-Education Survey":(
    <Fragment>
      From a scale of 1-5, how much do you know about metabolic syndrome (Hypertension, Hyperlipidemia, Obesity, High Blood Sugar)?
1 being not at all, and 5 being a lot
      <SelectField name="S1" />
      From a scale of 1-5, how much do you know about healthy lifestyle and diet?
1 being not at all, and 5 being a lot
      <SelectField name="S2" />
      From a scale of 1-5, how much do you know about cancer risk factors?
1 being not at all, and 5 being a lot
      <SelectField name="S3" />
      From a scale of 1-5, how much do you know about good eyecare habits?
1 being not at all, and 5 being a lot
      <SelectField name="S4" />
    </Fragment>
  ),

  "Pre-Education Quiz":(
    <Fragment>
      You are at higher risk of developing high cholesterol if you
      <SelectField name="Q1" />
      All of the following are complications of diabetes except
      <SelectField name="Q2" />
      How much exercise should we get a week?
      <SelectField name="Q3" />
      What makes up a healthy plate?
      <SelectField name="Q4" />
      Which of the following is the healthier choice to make?
      <SelectField name="Q5" />
      Which of the following is a cancer risk factor(s)?
      <SelectField name="Q6" />
      Which of the following is not considered good eyecare habits?
      <SelectField name="Q7" />
    </Fragment>
  ),

  "Post-Education Survey":(
    <Fragment>
      From a scale of 1-5, how much do you know about metabolic syndrome (Hypertension, Hyperlipidemia, Obesity, High Blood Sugar)?
1 being not at all, and 5 being a lot
      <SelectField name="S1" />
      From a scale of 1-5, how much do you know about healthy lifestyle and diet?
1 being not at all, and 5 being a lot
      <SelectField name="S2" />
      From a scale of 1-5, how much do you know about cancer risk factors?
1 being not at all, and 5 being a lot
      <SelectField name="S3" />
      From a scale of 1-5, how much do you know about good eyecare habits?
1 being not at all, and 5 being a lot
      <SelectField name="S4" />
    </Fragment>
  ),

  "Post-Education Quiz":(
    <Fragment>
      You are at higher risk of developing high cholesterol if you
      <SelectField name="Q1" />
      All of the following are complications of diabetes except
      <SelectField name="Q2" />
      How much exercise should we get a week?
      <SelectField name="Q3" />
      What makes up a healthy plate?
      <SelectField name="Q4" />
      Which of the following is the healthier choice to make?
      <SelectField name="Q5" />
      Which of the following is a cancer risk factor(s)?
      <SelectField name="Q6" />
      Which of the following is not considered good eyecare habits?
      <SelectField name="Q7" />
    </Fragment>
  ),

};