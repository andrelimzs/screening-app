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
};