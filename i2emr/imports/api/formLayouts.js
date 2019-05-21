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

  "Height & weight": (
    <Fragment>
      <NumField name="height" />
      <br />
      <NumField name="weight" />
      <br />
      <NumField name="waist" />
      <br />
      <NumField name="hip" />
    </Fragment>
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