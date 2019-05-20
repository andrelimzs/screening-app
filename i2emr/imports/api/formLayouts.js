import React, { Component } from 'react';

import { formSchemas } from '/imports/api/formSchemas';

import AutoForm from 'uniforms-material/AutoForm';
import AutoField from 'uniforms-material/AutoField';
import TextField from 'uniforms-material/TextField';
import SubmitField from 'uniforms-material/SubmitField';

// Define the layouts
export const formLayouts = {
  "Registration":
    (<AutoForm
      ref={(ref) => this.formRef = ref}
      schema={formSchemas["Registration"]}
      onSubmit={this.handleSubmit}
      grid={12}
    />),

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