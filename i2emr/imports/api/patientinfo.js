import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export default Patientinfo = new Mongo.Collection('patientinfo');

Meteor.methods({
  'patientinfo.insert'(data) {
    for (var elem in data) {
      check(elem, String);
    }

    Patientinfo.insert(data);
  },
  'patientinfo.upsert'(data) {
    for (var elem in data) {
      check(elem, String);
    }

    Patientinfo.upsert(data);
  },
});