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
        {/* <HiddenField name="id" /> */}
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
          <SelectField name="TBQ1" />
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
          <SelectField name="surgAndHospQ1" />
          <DisplayIf condition={context => context.model.surgAndHospQ1 === "Yes"}><Fragment>
            If yes to Q1, what surgery?
            <TextField name="surgAndHospQ2" />
          </Fragment></DisplayIf>
          Have you been hospitalised in the past 5 years? 
          <SelectField name="surgAndHospQ3" />
          <DisplayIf condition={context => context.model.surgAndHospQ3 === "Yes"}><Fragment>
            If yes to Q3, why were you hospitalised?
            <TextField name="surgAndHospQ4" />
          </Fragment></DisplayIf>

          <h2>Ocular History</h2>
          Have you had any eye surgeries?
          <SelectField name="ocularHisQ1a" />
          <DisplayIf condition={context => context.model.ocularHisQ1a === "Yes"}><Fragment>
            If yes to 1a, please specify
            <TextField name="ocularHisQ1b" />
          </Fragment></DisplayIf>
          Any previous trauma to the eye?
          <SelectField name="ocularHisQ2a" />
          <DisplayIf condition={context => context.model.ocularHisQ2a === "Yes"}><Fragment>
            If yes to 2a, please specify
            <TextField name="ocularHisQ2b" />
          </Fragment></DisplayIf>
          Are you under the care of any eye specialist or receiving treatment for the eye from any hospital/clinic?
          <SelectField name="ocularHisQ3a" />
          <DisplayIf condition={context => context.model.ocularHisQ3a === "Yes"}><Fragment>
            If yes to 3a, please specify where
            <TextField name="ocularHisQ3b" />
            If yes to 3a, when was your last review?
            <TextField name="ocularHisQ3c" />
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
          <SelectField name="ocularHisQ4" />
          How do you perceive your vision?
          <SelectField name="ocularHisQ5a" />
          <DisplayIf condition={context => context.model.ocularHisQ5a === "Poor"}><Fragment>
            If answer to 5a was 'Poor', do you intend to seek medical help?
            <SelectField name="ocularHisQ5b" />
          </Fragment></DisplayIf>
          <DisplayIf condition={context => context.model.ocularHisQ5b === "No"}><Fragment>
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
          <SelectField name="FLRSQ2" />
          Has your doctor ever told you that you have any problems with your blood vessels/blood flow? If yes, please elaborate
          <TextField name="FLRSQ3" />
          Have you ever been diagnosed by your doctor to have chronic kidney disease?
          <SelectField name="FLRSQ4" />
          Do you currently smoke?
          <SelectField name="FLRSQ5" />
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
          <SelectField name="FLRSQ10" />

          <h2>Social History</h2>
          Do you drink alcohol?
          <SelectField name="socialHisQ1" />
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
            <SelectField name="socialHisQ5" />
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

  "Station Selection": (
    <Fragment>
    <h2>Height and Weight + Waist:Hip measurement</h2>
    Can we measure your height, weight, waist size and hip size?
    <SelectField name="Q1" />
    <h2>Blood glucose and Hb</h2>
    Can we check your blood sugar? This will be done by pricking your finger to get a small drop of blood
    <SelectField name="Q2" />
    Can we check if you have anemia? This will be done by pricking your finger to get a small drop of blood
    <SelectField name="Q3" />
    <h2>BP</h2>
    Can we check your blood pressure?
    <SelectField name="Q4" />
    <h2>Phlebotomy (for patients aged 40 years old and above)</h2>
    For patients aged 40 years old and above, Do you have the following conditions?
    <AutoField name="Q5" />
    <DisplayIf condition={context => Array.isArray(context.model.Q5) && context.model.Q5.length >= 2}><Fragment>
      Can we do a blood test to see if you have high cholesterol? A blood sample will be taken by a trained staff. This will then be sent to the lab, and a report will be mailed to you after some time
      <SelectField name="Q6" />
    </Fragment></DisplayIf>
    <h2>Pap Smear</h2>
    Are you married (or have you ever been married)?
    <SelectField name="Q7" />
    <DisplayIf condition={context => context.model.Q7 === "Yes"}><Fragment>
      If yes to Q7, have you done a Pap smear in the past 3 years?
      <SelectField name="Q8" />
    </Fragment></DisplayIf>
    <DisplayIf condition={context => context.model.Q8 === "No"}><Fragment>
      If no to Q8, would you want to undergo a free Pap smear today to check for cervical cancer?
      <SelectField name="Q9" />
    </Fragment></DisplayIf>
    <h2>Breast</h2>
    Would you want to undergo a breast examination for breast cancer today? 
    <SelectField name="Q10" />
    <h2>Women's Edu</h2>
    Can we teach you about women's health? For adults, we will be sharing about menstrual health and breast self examinations. For girls aged 10-18 years old, we will be sharing about menstrual health only.
    <SelectField name="Q11" />
    <h2>Doctors' consult</h2>
    Would you like to see a doctor today? (You will be asked to see the doctor if your test results are abnormal, but would you otherwise want to see the doctor?)
    <SelectField name="Q12" />
    <h2>Eye screening</h2>
    Can we check your eyes/vision?
    <SelectField name="Q13" />
    <h2>Education</h2>
    Can we teach you about healthy lifestyles and how to prevent common diseases like diabetes and high blood pressure?
    <SelectField name="Q14" />
    </Fragment>
  ),


  "Height & weight": (
    <Fragment>
      <h2>Height and Weight</h2>
      <TextField name="height" />
      <br />
      <TextField name="weight" />
      <br />
      <h2>Waist:Hip</h2>
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
      Chief complaint
      <SelectField name="Q1" />
      <DisplayIf condition={context => Array.isArray(context.model.Q1) && context.model.Q1.includes('Others (free text)')}><Fragment>
        Other complaints
        <TextField name="otherComplaints" />
      </Fragment></DisplayIf>
      Doctors' notes/advice
      <LongTextField name="Q2" />
      <BoolField name="Q3" />
      Referral details
      <LongTextField name="Q4" />
      Name of doctor
      <TextField name="Q5" />
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
      Completed breast examination?
      <BoolField name="breastCompleted" />
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
  },

  "Education" : {
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
  }

  "Post-Screening Feedback":(
    <Fragment>
      I have had a good experience at the screening
      <SelectField name="Q1" />
      I came for the screening because: (Select all that apply)
      <AutoField name="Q2" />
      I know that regular health screening is important
      <SelectField name="Q3" />
      I know that it is important to detect chronic diseases and cancers early
      <SelectField name="Q4" />
      I am willing to take the trouble to attend health screenings
      <SelectField name="Q5" />
      I am willing to attend my follow-up sessions
      <SelectField name="Q6" />
      The student volunteers attended to my needs
      <SelectField name="Q7" />
      The student volunteers were well-trained
      <SelectField name="Q8" />
      The waiting time to enter the screening was reasonable
      <SelectField name="Q9" />
      The waiting time for each station was reasonable
      <SelectField name="Q10" />
      The flow of the screening was easy to follow
      <SelectField name="Q11" />
      I would recommend my family/friends to attend this screening
      <SelectField name="Q12" />
      What encouraged you to come for our event? Select all that apply
      <AutoField name="Q13" />
      How often do you attend a health screening?
      <SelectField name="Q14" />
    </Fragment>
  ),

};