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
  )
    
};