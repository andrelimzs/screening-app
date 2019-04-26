import SimpleSchema from 'simpl-schema';

import Patientinfo from '/imports/api/patientinfo';

// Customise validation error messages
SimpleSchema.setDefaultMessages({
  messages: {
    en: {
      "IDnotUnique": "ID is already registered",
    },
  },
});

// Define the schema
export const formSchemas = {
  "Registration":
  new SimpleSchema({
    name: {
      type: String,
      regEx: /^\D+$/,
      label: "Name",
    },
    id: {
      type: String,
      regEx: /^[A-z][0-9]{7}[A-z]$/,
      label: "ID",
      custom: function () {
        if (Meteor.isClient && this.isSet) {
          // Do a blocking, direct database query
          // This is important, AutoFrom validation will not work otherwise
          if (Patientinfo.find({id:this.value}).count() !== 0) {
            // console.log("ID not unique");
            return "IDnotUnique";
          }
        }
      }
    },
  }),

  "Height & weight":
  new SimpleSchema({
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    waist: {
      type: Number,
    },
  }),

  "CBG & Hb":
  new SimpleSchema({
    cbg: {
      type: Number,
    },
    hb: {
      type: Number,
    },
  }),

  "Phlebotomy": 
  new SimpleSchema({
    blood: {
      type: Number,
    },
  }),

  "Blood pressure":
  new SimpleSchema({
    bp: {
      type: Number,
    },
  }),
}