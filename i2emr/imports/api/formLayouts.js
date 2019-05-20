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
};