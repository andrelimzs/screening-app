import React, { Component, Fragment } from 'react';

import { geriPtConsult } from './infoLayouts/geriPtConsult'
import { geriOtConsult } from './infoLayouts/geriOtConsult'

// Define the layouts
export const infoLayouts = {
  "Geri - PT Consult" : (info) => {
      return geriPtConsult(info)
  },

  "Geri - OT Consult" : (info) => {
    return geriOtConsult(info)
},
};