import React, { Component, Fragment } from 'react';

import { geriPtConsult } from './infoLayouts/geriPtConsult';
import { geriOtConsult } from './infoLayouts/geriOtConsult';
import { screeningReview } from './infoLayouts/screeningReview';
import { doctorSConsult } from './infoLayouts/doctorSConsult';
import { geriCognitiveFollowUp } from './infoLayouts/geriCognitiveFollowUp';
import { socialService } from './infoLayouts/socialService';
import { dietitian } from './infoLayouts/dietitian';
import { historyTaking } from './infoLayouts/historyTaking';

// Define the layouts
export const infoLayouts = {
  "Geri - PT Consult" : (info) => {
      return geriPtConsult(info)
  },

  "Geri - OT Consult" : (info) => {
    return geriOtConsult(info)
  },

  "Screening Review" : (info) => {
    return screeningReview(info);
  },

  "Doctor's Consult" : (info) => {
    return doctorSConsult(info);
  },

  "Geri - Cognitive Follow Up" : (info) => {
    return geriCognitiveFollowUp(info);
  },

  "Social Service" : (info) => {
    return socialService(info);
  },

  "Dietitian" : (info) => {
    return dietitian(info);
  },

  "History Taking" : (info) => {
    return historyTaking(info);
  },

  "History Taking - Non Phleb" : (info) => {
    return historyTaking(info);
  },

};