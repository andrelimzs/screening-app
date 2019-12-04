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
import { Children } from 'react';
import { Table, TableBody, TableCell, TableRow, TableHead } from '@material-ui/core';

// Define DisplayIf
// Used to display fields depending on another field's response
const DisplayIf = ({ children, condition }, { uniforms }) => (condition(uniforms) ? Children.only(children) : nothing);
DisplayIf.contextTypes = BaseField.contextTypes;

// Use to calculate values from uniform.model.<>
const SomeComp =
  ({ calculation }, { uniforms: { model, onChange, error } }) => (calculation(model));

SomeComp.contextTypes = BaseField.contextTypes;

function getScore(model, questionList, expectedAnswer) {
  let score = 0;
  questionList.forEach(function (question) {
    if (question in model && model[question] === expectedAnswer) {
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
  if (typeof (model['geriFrailScaleQ4']) !== "undefined" && model['geriFrailScaleQ4'].length > 4) {
    score += 1
  }
  if (typeof (model['geriFrailScaleQ5']) !== "undefined" && model['geriFrailScaleQ5'] > 5) {
    score += 1
  }

  return score;
}

function getSppbScore(model) {
  let score = 0;
  if (typeof (model['geriSppbQ2']) !== "undefined") {
    score += parseInt(model['geriSppbQ2'].slice(0))
  }
  if (typeof (model['geriSppbQ6']) !== "undefined") {
    const num = parseInt(model['geriSppbQ6'].slice(0))
    if (!Number.isNaN(num)) {
      score += num
    }
  }
  if (typeof (model['geriSppbQ8']) !== "undefined") {
    score += parseInt(model['geriSppbQ8'].slice(0))
  }
  return score;
}

function getBmi(model) {
  if (typeof (model['heightAndWeightQ3']) !== "undefined" && typeof (model['heightAndWeightQ1']) !== "undefined") {
    const bmi = model['heightAndWeightQ3'] / (model['heightAndWeightQ1']) / (model['heightAndWeightQ1'])
    return Number(Math.round(bmi + 'e2') + 'e-2') // rounds to 2dp
  }
}

function getRatio(model) {
  if (typeof (model['heightAndWeightQ5']) !== "undefined" && typeof (model['heightAndWeightQ6']) !== "undefined") {
    const ratio = model['heightAndWeightQ5'] / (model['heightAndWeightQ6'])
    return Number(Math.round(ratio + 'e1') + 'e-1') // rounds to 2dp
  }
}

function getGlucoseRisk(model) {
  if (typeof (model['totalScore']) !== "undefined") {
    const score = model['totalScore']
    let risk = "";
    if (score <= 20) {
      risk = "Low"
    } else if (score < 50) {
      risk = "Medium"
    } else {
      risk = "High"
    }
    return String(risk)
  }
}

// Define the layouts
export const formLayouts = {
  "Basic Patient Information": (info) => (
    <Fragment>
      <h2>1. BASIC PATIENT INFORMATION</h2>
      1. Name
      <TextField name="basicPatientInformationQ1" label="Basic Patient Information Q1" />
      2. Gender
      <RadioField name="basicPatientInformationQ2" label="Basic Patient Information Q2" />
      <DisplayIf condition={(context) => (typeof (context.model.basicPatientInformationQ2) !== "undefined" && context.model.basicPatientInformationQ2 === "Female")}>
        <Fragment>
          Pregnant
          <RadioField name="basicPatientInformationQ12" label="basicPatientInformationQ12" />
        </Fragment>
      </DisplayIf>
      3. Birthdate
      <TextField name="basicPatientInformationQ3" label="Basic Patient Information Q3" />
      4. Age <br />
      <NumField name="basicPatientInformationQ4" label="Basic Patient Information Q4" /><br />
      5. District Name
      <TextField name="basicPatientInformationQ5" label="Basic Patient Information Q5" />
      6. Address
      <TextField name="basicPatientInformationQ6" label="Basic Patient Information Q6" />
      7. Zip Code
      <TextField name="basicPatientInformationQ7" label="Basic Patient Information Q7" />
      8. Contact Number <br />
      <NumField name="basicPatientInformationQ8" label="Patient Information Q8" /><br /><br></br>
      9. Spoken Language
      <TextField name="basicPatientInformationQ9" label="Basic Patient Information Q9" />
      10. Any drug allergic?
      <RadioField name="basicPatientInformationQ10" label="Basic Patient Information Q10" />
      <DisplayIf condition={(context) => (typeof (context.model.basicPatientInformationQ10) !== "undefined" && context.model.basicPatientInformationQ10 === "Yes, pls specify")}>
        <Fragment>
          Pls Specify.
          <TextField name="basicPatientInformationQ13" label="basicPatientInformationQ13" />
        </Fragment>
      </DisplayIf>
      11. Do you have any blood borne diseases?
      <RadioField name="basicPatientInformationQ11" label="Basic Patient Information Q11" />
      <DisplayIf condition={(context) => (typeof (context.model.basicPatientInformationQ11) !== "undefined" && context.model.basicPatientInformationQ11 === "Yes, pls specify")}>
        <Fragment>
          Pls Specify. **Patient not allowed to do Phlebotomy.
          <TextField name="basicPatientInformationQ14" label="basicPatientInformationQ14" />
        </Fragment>
      </DisplayIf>

    </Fragment>
  ),

  "Patient Profiling": (info) => (
    <Fragment>
      <h2>2. PATIENT PROFILING</h2>
      <h2>2.1 TB SCREENING</h2>
      2.1.1. Have you ever been diagnosed with tuberculosis?
		<RadioField name="patientProfilingQ1" label="Patient Profiling Q1" />
      <DisplayIf condition={(context) => (typeof (context.model.patientProfilingQ1) !== "undefined" && context.model.patientProfilingQ1 === "Yes")}>
        <Fragment>
          <font color="red"> **Immediate Doctor's Consult</font><br></br>
          Pls Specify.
          <TextField name="patientProfilingQ21" label="patientProfilingQ21" />
        </Fragment>
      </DisplayIf>
      2.1.2. Have you ever lived with someone with tuberculosis?
		<RadioField name="patientProfilingQ2" label="Patient Profiling Q2" />
      <DisplayIf condition={(context) => (typeof (context.model.patientProfilingQ2) !== "undefined" && context.model.patientProfilingQ2 === "Yes")}>
        <Fragment>
          <font color="red"> **Immediate Doctor's Consult</font><br></br>
          Pls Specify.
          <TextField name="patientProfilingQ22" label="patientProfilingQ22" />
        </Fragment>
      </DisplayIf>
      2.1.3. Do you have any of the following symptoms? Select all that apply
		<RadioField name="patientProfilingQ3" label="Patient Profiling Q3" />
      <DisplayIf condition={(context) => (typeof (context.model.patientProfilingQ3) !== "undefined" && context.model.patientProfilingQ3 === "Yes")}>
        <Fragment>
          <font color="red"> **Immediate Doctor's Consult</font><br></br>
          Pls Specify.
          <SelectField name="patientProfilingQ23" checkboxes="true" label="patientProfilingQ23" />
        </Fragment>
      </DisplayIf>
      <h2>2.2 MEDICAL HISTORY</h2>
      2.2.1. Do you have any of the following medical conditions?
		<SelectField name="patientProfilingQ4" checkboxes="true" label="Patient Profiling Q4" />
      <h2>2.3 MEDICAL HISTORY: OTHERS</h2>
      2.3.1. Do you have other medical conditions we should take note of? (if none, indicate NIL)
		<TextField name="patientProfilingQ5" label="Patient Profiling Q5" />
      2.3.2. How are you managing these conditions? (check-ups, medicines, diet/exercise, others)
		<TextField name="patientProfilingQ6" label="Patient Profiling Q6" />
      2.3.3. Where do you go to for routine healthcare?
		<TextField name="patientProfilingQ7" label="Patient Profiling Q7" />
      2.3.4. Where do you go to for emergency medical services (eg. fall, injury, fainting)?
		<TextField name="patientProfilingQ8" label="Patient Profiling Q8" />
      2.3.5. Are you taking any other medications? (If yes, indicate what medication and why. If none, indicate NIL)
		<TextField name="patientProfilingQ9" label="Patient Profiling Q9" />
      <h2>2.4  BARRIERS TO HEALTHCARE</h2>
      2.4.1 What type of doctor do you see for your existing conditions?
		<RadioField name="patientProfilingQ10" label="Patient Profiling Q10" />
      <DisplayIf condition={(context) => (typeof (context.model.patientProfilingQ10) !== "undefined" && context.model.patientProfilingQ10 === "Seldom/Never visits the doctor")}>
        <Fragment>
          Pls Specify Why.
          <TextField name="patientProfilingQ24" label="patientProfilingQ24" />
        </Fragment>
      </DisplayIf>
      <h2>2.5 SMOKING</h2>
      2.5.1. Do you currently smoke?
		<RadioField name="patientProfilingQ11" label="Patient Profiling Q11" />
      <DisplayIf condition={(context) => (typeof (context.model.patientProfilingQ11) !== "undefined" && context.model.patientProfilingQ11 === "Yes")}>
        <Fragment>
          2.5.1.1. How much do you smoke?
          <TextField name="patientProfilingQ25" label="patientProfilingQ25" /> <br></br>
          2.5.1.2 What do you smoke?
          <SelectField name="patientProfilingQ26" checkboxes="true" label="patientProfilingQ26" /> <br></br>
          2.5.1.3 How many years have you been smoking for? (Rounded up)
          <NumField name="patientProfilingQ27" label="Patient Profiling Q27" /><br></br>
        </Fragment>
      </DisplayIf>
      <DisplayIf condition={(context) => (typeof (context.model.patientProfilingQ11) !== "undefined" && context.model.patientProfilingQ11 === "No")}>
        <Fragment>
          2.5.1.1. Have you smoke before?
          <RadioField name="patientProfilingQ28" label="patientProfilingQ28" /> <br></br>
        </Fragment>
      </DisplayIf>
      2.5.2 Do you chew pann or tobacoo?
		<RadioField name="patientProfilingQ12" label="Patient Profiling Q12" />
      <h2>2.6 SOCIAL HISTORY</h2>
      2.6.1 What is your occupation?
		<TextField name="patientProfilingQ13" label="Patient Profiling Q13" />
      2.6.2 If occupation is "Farming/Ariculture', do you use pesticides in your farming?
		<RadioField name="patientProfilingQ14" label="Patient Profiling Q14" />
      2.6.3 Monthly Income? (optional) <br />
      <NumField name="patientProfilingQ15" label="Patient Profiling Q15" /><br />
      2.6.4 Marital Status
		<RadioField name="patientProfilingQ16" label="Patient Profiling Q16" />
      2.6.5 Number of Children <br />
      <NumField name="patientProfilingQ17" label="Patient Profiling Q17" /><br />
      2.6.6 How many people live in your household (including you)? <br />
      <NumField name="patientProfilingQ18" label="Patient Profiling Q18" /><br />
      2.6.7 How many people in your household contribute to household income? <br />
      <NumField name="patientProfilingQ19" label="Patient Profiling Q19" /><br />
      2.6.8 What is your highest education level?
		<RadioField name="patientProfilingQ20" label="Patient Profiling Q20" />
    </Fragment>
  ),

  "Height and Weight": (info) => (
    <Fragment>
      <h2>1. HEIGHT & WEIGHT</h2>
      1.1 Height (m) <br />
      <NumField name="heightAndWeightQ1" label="Height and Weight Q1" /><br />
      Percentile
		<RadioField name="heightAndWeightQ2" label="Height and Weight Q2" />
      1.2 Weight (kg) <br />
      <NumField name="heightAndWeightQ3" label="Height and Weight Q3" /><br />
      Percentile
		<RadioField name="heightAndWeightQ4" label="Height and Weight Q4" />
      <h2>1.3 BMI</h2>
      {/* <TextField name = "calculateBMI" label="BMI"/><br></br> */}
      <SomeComp calculation={(model) => (
        <h3>
          BMI:
              {model['calculateBMI'] = getBmi(model)}
        </h3>
      )} />
      <h2>2. WAIST : HIP </h2>
      2.1 Waist Circumference (cm) <br />
      <NumField name="heightAndWeightQ5" label="Height and Weight Q5" /><br />
      2.2 Hip Circumfernce (cm) <br />
      <NumField name="heightAndWeightQ6" label="Height and Weight Q6" /><br />
      <h2>2.3 Waist : Hip Ratio</h2>
      <SomeComp calculation={(model) => (
        <h3>
          Ratio:
              {model['calculateRatio'] = getRatio(model)}
        </h3>
      )} />
      <h2>Overview </h2>
      Doctor Consult?
    <RadioField name="overview" label="overview" /><br />
    </Fragment>
  ),

  "Blood Glucose and Hb": (info) => (
    <Fragment>
      <h2>3. BLOOD GLUCOSE AND HEMOGLOBIN</h2>
      3.1. Have you previously been diagnosed with diabetes?
		<RadioField name="bloodGlucoseAndHbQ1" label="Blood Glucose and Hb Q1" />
      <DisplayIf condition={(context) => (typeof (context.model.bloodGlucoseAndHbQ1) !== "undefined" && context.model.bloodGlucoseAndHbQ1 === "No")}>
        <Fragment>
          3.1.1. Age
          <RadioField name="bloodGlucoseAndHbQ2" label="Blood Glucose and Hb Q2" />
          3.1.2. Waist circumference (refer to Waist:Hip Ratio section)
          <RadioField name="bloodGlucoseAndHbQ3" label="Blood Glucose and Hb Q3" />
          3.1.3. Physical activity
          <RadioField name="bloodGlucoseAndHbQ4" label="Blood Glucose and Hb Q4" />
          3.1.4. Family history
          <RadioField name="bloodGlucoseAndHbQ5" label="Blood Glucose and Hb Q5" />
          Total Score
          <NumField name="totalScore" label="totalScore" /> <br />
          <SomeComp calculation={(model) => (
            <h3>
              Risk level:
                {model['riskLevel'] = getGlucoseRisk(model)}
            </h3>
          )} />
        </Fragment>
      </DisplayIf>
      3.2. Blood Glucose
		<TextField name="bloodGlucoseAndHbQ6" label="Blood Glucose and Hb Q6" />
      3.3. Hemoglobin (g/dL) <br />
      <NumField name="bloodGlucoseAndHbQ7" label="Blood Glucose and Hb Q7" /><br />
      Overview : Doctor Consult?
		<RadioField name="bloodGlucoseAndHbQ8" label="Blood Glucose and Hb Q8" />
    </Fragment>
  ),

  "Blood Pressure": (info) => (
    <Fragment>
      <h2>4. BLOOD PRESSURE</h2>
      <h2>4.1. BP 1st Taking</h2>
      4.1.1. Systolic Blood Pressure <br />
      <NumField name="bpQ1" label="BP Q1" /><br />
      4.1.2. Diastolic Blood Pressure  <br />
      <NumField name="bpQ2" label="BP Q2" /><br />
      <h2>4.2. BP 2nd Taking</h2>
      4.2.1. Systolic Blood Pressure <br />
      <NumField name="bpQ3" label="BP Q3" /><br />
      4.2.2. Diastolic Blood Pressure  <br />
      <NumField name="bpQ4" label="BP Q4" /><br />
      <h2>4.3. BP 3rd Taking</h2>
      4.3.1. Systolic Blood Pressure <br />
      <NumField name="bpQ5" label="BP Q5" /><br />
      4.3.2. Diastolic Blood Pressure  <br />
      <NumField name="bpQ6" label="BP Q6" /><br />
      <h2>4.4. BP average</h2>
      4.4.1. Systolic Blood Pressure <br />
      <NumField name="bpQ7" label="BP Q7" /><br />
      4.4.2. Diastolic Blood Pressure  <br />
      <NumField name="bpQ8" label="BP Q8" /><br />
      Overall
		<RadioField name="bpQ9" label="BP Q9" />

    </Fragment>
  ),

  "Phlebo": (info) => (
    <Fragment>
      <h2>5. PHLEBO</h2>
      Completed?
		<RadioField name="phleboQ1" label="Phlebo Q1" />

    </Fragment>
  ),

  "Pap Smear": (info) => (
    <Fragment>
      <h2>6. PAP SMEAR</h2>
      Completed?
		<RadioField name="papSmearQ1" label="Pap Smear Q1" />
      Notes (if any)
		<LongTextField name="papSmearQ2" label="Pap Smear Q2" />
      Doctors' consult required?
		<RadioField name="papSmearQ3" label="Pap Smear Q3" />

    </Fragment>
  ),

  "Breast Screening": (info) => (
    <Fragment>
      <h2>7. BREAST SCREENING</h2>
      7.1. Completed breast examination?
		<RadioField name="breastScreeningQ1" label="Breast Screening Q1" />
      <DisplayIf condition={(context) => (typeof (context.model.breastScreeningQ1) !== "undefined" && context.model.breastScreeningQ1 === "Yes")}>
        <Fragment>
          7.1.1. Any abnormalities noted (e.g. lumps, skin changes)?
		    <RadioField name="breastScreeningQ2" label="Breast Screening Q2" /> <br></br>
          <DisplayIf condition={(context) => (typeof (context.model.breastScreeningQ2) !== "undefined" && context.model.breastScreeningQ2 === "Yes")}>
            <Fragment>
              7.1.1.1.  If yes to Q2, please describe the abnormalities
		            <TextField name="breastScreeningQ3" label="Breast Screening Q3" />
              7.1.1.2.  If yes to Q2, FNAC done?
		            <RadioField name="breastScreeningQ4" label="Breast Screening Q4" />
            </Fragment>
          </DisplayIf>
        </Fragment>
      </DisplayIf>
      Doctor Consult?
		<RadioField name="breastScreeningQ5" label="Breast Screening Q5" />

    </Fragment>
  ),
  "Post-screening feedback": (info) => (
    <Fragment>
      1. I have had a good experience at the screening
    <SelectField name="postScreeningFeedbackQ1" label="Post-screening feedback Q1" />
      2. I came for the screening because: (Select all that apply)
    <SelectField name="postScreeningFeedbackQ2" checkboxes="true" label="Post-screening feedback Q2" />
      3. I know that regular health screening is important
    <SelectField name="postScreeningFeedbackQ3" label="Post-screening feedback Q3" />
      4. I know that it is important to detect chronic diseases and cancers early
    <SelectField name="postScreeningFeedbackQ4" label="Post-screening feedback Q4" />
      5. I am willing to take the trouble to attend health screenings
    <SelectField name="postScreeningFeedbackQ5" label="Post-screening feedback Q5" />
      6. I am willing to attend my follow-up sessions
    <SelectField name="postScreeningFeedbackQ6" label="Post-screening feedback Q6" />
      7. The student volunteers attended to my needs
    <SelectField name="postScreeningFeedbackQ7" label="Post-screening feedback Q7" />
      8. The student volunteers were well-trained
    <SelectField name="postScreeningFeedbackQ8" label="Post-screening feedback Q8" />
      9. The waiting time to enter the screening was reasonable
    <SelectField name="postScreeningFeedbackQ9" label="Post-screening feedback Q9" />
      10. The waiting time for each station was reasonable
    <SelectField name="postScreeningFeedbackQ10" label="Post-screening feedback Q10" />
      11. The flow of the screening was easy to follow
    <SelectField name="postScreeningFeedbackQ11" label="Post-screening feedback Q11" />
      12. I would recommend my family/friends to attend this screening
    <SelectField name="postScreeningFeedbackQ12" label="Post-screening feedback Q12" />
      13. What encouraged you to come for our event? Select all that apply
    <SelectField name="postScreeningFeedbackQ13" checkboxes="true" label="Post-screening feedback Q13" />
      14. How often do you attend a health screening?
    <SelectField name="postScreeningFeedbackQ14" label="Post-screening feedback Q14" />

    </Fragment>
  ),

  "Doctors' Consult": (info) => (
    <Fragment>
      1. Chief complaint
    <SelectField name="doctorsConsultQ1" checkboxes="true" label="Doctors' Consult Q1" />
      2. Doctors' notes/advice
    <LongTextField name="doctorsConsultQ2" label="Doctors' Consult Q2" />
      3. Provided with referral letter?
    <SelectField name="doctorsConsultQ3" label="Doctors' Consult Q3" />
      <DisplayIf condition={context => context.model.doctorsConsultQ3 === "Yes"}>
        <Fragment>
          4. Referral details
      <LongTextField name="doctorsConsultQ4" label="Doctors' Consult Q4" />
        </Fragment>
      </DisplayIf>
      5. Name of doctor
    <TextField name="doctorsConsultQ5" label="Doctors' Consult Q5" />

    </Fragment>
  ),

  "Eye Screening": (info) => (
    <Fragment>
      1. Does the participant use spectacles?
    <RadioField name="eyeScreeningQ1" label="Eye Screening Q1" />

      <h4>Visual Acuity</h4>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">Right Eye</TableCell>
            <TableCell align="left">Left Eye</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="left">Without glasses</TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ2" label="Eye Screening Q2" />
            </TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ3" label="Eye Screening Q3" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">With glasses</TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ4" label="Eye Screening Q4" />
            </TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ5" label="Eye Screening Q5" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Near vision</TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ6" label="Eye Screening Q6" />
            </TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ7" label="Eye Screening Q7" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <h4>Findings in the Eye</h4>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">Right Eye</TableCell>
            <TableCell align="left">Left Eye</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="left">Lids</TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ8" label="Eye Screening Q8" />
            </TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ9" label="Eye Screening Q9" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Conjunctiva</TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ10" label="Eye Screening Q10" />
            </TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ11" label="Eye Screening Q11" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Cornea</TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ12" label="Eye Screening Q12" />
            </TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ13" label="Eye Screening Q13" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Anterior segment</TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ14" label="Eye Screening Q14" />
            </TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ15" label="Eye Screening Q15" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Iris</TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ16" label="Eye Screening Q16" />
            </TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ17" label="Eye Screening Q17" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Pupil</TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ18" label="Eye Screening Q18" />
            </TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ19" label="Eye Screening Q19" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Lens</TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ20" label="Eye Screening Q20" />
            </TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ21" label="Eye Screening Q21" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Ocular movements</TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ22" label="Eye Screening Q22" />
            </TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ23" label="Eye Screening Q23" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">IOP</TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ24" label="Eye Screening Q24" />
            </TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ25" label="Eye Screening Q25" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Duct</TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ26" label="Eye Screening Q26" />
            </TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ27" label="Eye Screening Q27" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <h4>Posterior segment examination</h4>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">Right Eye</TableCell>
            <TableCell align="left">Left Eye</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="left">CDR</TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ28" label="Eye Screening Q28" />
            </TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ29" label="Eye Screening Q29" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Macula</TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ30" label="Eye Screening Q30" />
            </TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ31" label="Eye Screening Q31" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Retina</TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ32" label="Eye Screening Q32" />
            </TableCell>
            <TableCell align="left">
              <TextField name="eyeScreeningQ33" label="Eye Screening Q33" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      34. Diagnosis
  <TextField name="eyeScreeningQ34" label="Eye Screening Q34" />
      35. Advice
  <TextField name="eyeScreeningQ35" label="Eye Screening Q35" />
      36. Name of doctor
  <TextField name="eyeScreeningQ36" label="Eye Screening Q36" />
    </Fragment>
  ),

  "Screening Review": (info) => (
    <Fragment />
  ),

};