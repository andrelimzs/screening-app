import React, { Component } from 'react';

import { formSchemas } from '/imports/api/formSchemas';

import AutoForm from 'uniforms-material/AutoForm';

// Define the layouts
export const formLayouts = {
  "Registration":
    (<AutoForm
      ref={(ref) => this.formRef = ref}
      schema={formSchemas["Registration"]}
      onSubmit={this.handleSubmit}
      grid={12}
    />),
};