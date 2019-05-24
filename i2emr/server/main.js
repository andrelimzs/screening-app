import { Meteor } from 'meteor/meteor';
import Links from '/imports/api/links';
import Patientinfo from '/imports/api/patientinfo';
import Stationforms from '/imports/api/stationforms';

import { formLayouts } from '/imports/api/formLayouts';


function addPatient(name, id, nextStation) {
  Patientinfo.insert({name:name, id:id, nextStation:nextStation, busy:false, createdAt: new Date() });
}

function addForm(station, formData) {
  Stationforms.insert({name:station, data:formData});
}

Meteor.startup(() => {
  // Patientinfo.remove({});
  // Stationforms.remove({});

  if (Patientinfo.find().count() === 0) {
    Patientinfo.insert({
      id: '1',
      "Patient Info":{
        name: 'Tom',
        gender: 'male',
        age: '24',
        contactNumber: '12344321',
        spokenLanguages: ['English', 'Others'],
        writtenLanguages: ['English'],
        address: 'Baker Street',
        anyDrugAllergies: 'Yes',
        drugAllergies: 'Panadol',
      },
      stationQueue:["Blood Glucose & Hb", "Blood Pressure", "Phlebotomy", "Doctors' Consult", "Eye Screening", "Education"],
      nextStation: 'Height & weight',
      busy:false,
      createdAt: new Date()
    });
    Patientinfo.insert({
      id: '2',
      "Patient Info":{
        name: 'Gary',
        gender: 'male',
        age: '24',
        contactNumber: '12344321',
        spokenLanguages: ['English', 'Others'],
        writtenLanguages: ['English'],
        address: 'Baker Street',
        anyDrugAllergies: 'No',
      },
      stationQueue:["Blood Glucose & Hb", "Blood Pressure", "Phlebotomy", "Doctors' Consult","Eye Screening", "Education"],
      nextStation: 'Height & weight',
      busy:false,
      createdAt: new Date()
    });
    Patientinfo.insert({
      id: '3',
      "Patient Info":{
        name: 'Reyansh Aditya Vihaan',
        gender: 'male',
        age: '24',
        contactNumber: '12344321',
        spokenLanguages: ['English', 'Others'],
        writtenLanguages: ['English'],
        address: 'Baker Street',
        anyDrugAllergies: 'Yes',
        drugAllergies: 'Panadol',
      },
      stationQueue: [],
      nextStation: 'Education',
      busy:false,
      createdAt: new Date()
    });
  }
});
