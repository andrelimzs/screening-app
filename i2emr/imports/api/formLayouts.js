import React, { Component } from 'react';

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
import BoolField from 'uniforms-material/BoolField';
import LongTextField from 'uniforms-material/LongTextField';
import Divider from '@material-ui/core/Divider';

// Define the layouts
export const formLayouts = {
  "Registration":
    (<AutoForm ref={(ref) => this.formRef = ref} schema={formSchemas["Registration"]} onSubmit={this.handleSubmit}>
      <TextField name="name" />
      <HiddenField name="id" />
      <SelectField name="gender" />
      <DateField name="birthday" labelProps={{shrink: true, disableAnimation: false}}/>
      <NumField name="age" decimal={false} />
      <TextField name="contactNumber" />
      <ListField name="spokenLanguages" />
    </AutoForm>),

  "Height & weight": (
    <AutoForm ref={(ref) => this.formRef = ref} schema={formSchemas["Height & weight"]} onSubmit={this.handleSubmit}>
      <TextField name="height" />
      <TextField name="weight" />
      <TextField name="waist" />
      <TextField name="hip" />
      <div>
        <SubmitField />
      </div>
    </AutoForm>
  ),

  "CBG & Hb":(
    <AutoForm ref={(ref) => this.formRef = ref} schema={formSchemas["CBG & Hb"]} onSubmit={this.handleSubmit}>
      <NumField name="cbg" />
      <br />
      <NumField name="hb" />
      <br />
      <div>
        <SubmitField />
      </div>
    </AutoForm>
  ),

  "Phlebotomy":(
    <AutoForm ref={(ref) => this.formRef = ref} schema={formSchemas["Phlebotomy"]} onSubmit={this.handleSubmit}>
      <BoolField name="phleboCompleted" />
      <div>
        <SubmitField />
      </div>
    </AutoForm>
  ),

  "Pap Smear":(
    <AutoForm ref={(ref) => this.formRef = ref} schema={formSchemas["Pap Smear"]} onSubmit={this.handleSubmit}>
      <BoolField name="papCompleted" />
      <div>
        <SubmitField />
      </div>
    </AutoForm>
  ),
    
  "Breast Exam":(
    <AutoForm ref={(ref) => this.formRef = ref} schema={formSchemas["Breast Exam"]} onSubmit={this.handleSubmit}>
      <BoolField name="breastCompleted" />
      <BoolField name="abnormalities" />
      <LongTextField name="abDescribe" />
      <BoolField name="fnacCompleted" />
      <BoolField name="eduCompleted" />
      <div>
        <SubmitField />
      </div>
    </AutoForm>
  ),

  "Blood Pressure":(
    <AutoForm ref={(ref) => this.formRef = ref} schema={formSchemas["Blood Pressure"]} onSubmit={this.handleSubmit}>
      <div><NumField name="bp1Sys" /></div>
      <div><NumField name="bp1Dia" /></div>
      <div><NumField name="bp2Sys" /></div>
      <div><NumField name="bp2Dia" /></div>
      <div><NumField name="bp3Sys" /></div>
      <div><NumField name="bp3Dia" /></div>
      <div>
        <SubmitField />
      </div>
    </AutoForm>
  ),

  "Doctors' Consult":(
    <AutoForm ref={(ref) => this.formRef = ref} schema={formSchemas["Doctors' Consult"]} onSubmit={this.handleSubmit}>
      <BoolField name="consCompleted" />
      <BoolField name="refLetter" />
      <div>
        <SubmitField />
      </div>
    </AutoForm>
  ),

  "Eye Screening":(
    <AutoForm ref={(ref) => this.formRef = ref} schema={formSchemas["Eye Screening"]} onSubmit={this.handleSubmit}>
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
      <div>
        <SubmitField />
      </div>
    </AutoForm>
  ),

  "Pre-Women's Education Quiz":(
    <AutoForm ref={(ref) => this.formRef = ref} schema={formSchemas["Pre-Women's Education Quiz"]} onSubmit={this.handleSubmit}>
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
      <div>
        <SubmitField />
      </div>
    </AutoForm>
  ),

  "Post-Women's Education Quiz":(
    <AutoForm ref={(ref) => this.formRef = ref} schema={formSchemas["Post-Women's Education Quiz"]} onSubmit={this.handleSubmit}>
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
      <div>
        <SubmitField />
      </div>
    </AutoForm>
  ),

  "Pre-Education Survey":(
    <AutoForm ref={(ref) => this.formRef = ref} schema={formSchemas["Pre-Education Survey"]} onSubmit={this.handleSubmit}>
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
      <div>
        <SubmitField />
      </div>
    </AutoForm>
  ),

  "Pre-Education Quiz":(
    <AutoForm ref={(ref) => this.formRef = ref} schema={formSchemas["Pre-Education Quiz"]} onSubmit={this.handleSubmit}>
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
      <div>
        <SubmitField />
      </div>
    </AutoForm>
  ),

  "Post-Education Survey":(
    <AutoForm ref={(ref) => this.formRef = ref} schema={formSchemas["Post-Education Survey"]} onSubmit={this.handleSubmit}>
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
      <div>
        <SubmitField />
      </div>
    </AutoForm>
  ),

  "Post-Education Quiz":(
    <AutoForm ref={(ref) => this.formRef = ref} schema={formSchemas["Post-Education Quiz"]} onSubmit={this.handleSubmit}>
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
      <div>
        <SubmitField />
      </div>
    </AutoForm>
  ),

};