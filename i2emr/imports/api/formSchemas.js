import { SimpleSchema } from 'meteor/aldeed:simple-schema';

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