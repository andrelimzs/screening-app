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
      name: 'Tom',
      id: '1',
      gender: 'male',
      age: '24',
      contactNumber: '12344321',
      spokenLanguages: ['English', 'Others'],
      writtenLanguages: ['English'],
      address: 'Baker Street',
      anyDrugAllergies: 'Yes',
      drugAllergies: 'Panadol',
      stationQueue:["Height & weight", "CBG & Hb", "Phlebotomy", "Pap Smear", "Breast Exam", "Blood Pressure", "Doctors' Consult", "Eye Screening", "Women's Edu", "Education"],
      nextStation: 'Height & weight',
      busy:false,
      createdAt: new Date()
    });
    Patientinfo.insert({
      name: 'Gary',
      id: '2',
      gender: 'male',
      age: '24',
      contactNumber: '12344321',
      spokenLanguages: ['English', 'Others'],
      writtenLanguages: ['English'],
      address: 'Baker Street',
      anyDrugAllergies: 'No',
      stationQueue: ["Height & weight", "CBG & Hb", "Phlebotomy", "Pap Smear", "Breast Exam", "Blood Pressure", "Doctors' Consult", "Eye Screening", "Women's Edu", "Education"],
      nextStation: 'Height & weight',
      busy:false,
      createdAt: new Date()
    });
    Patientinfo.insert({
      name: 'Reyansh Aditya Vihaan',
      id: '3',
      gender: 'male',
      age: '24',
      contactNumber: '12344321',
      spokenLanguages: ['English', 'Others'],
      writtenLanguages: ['English'],
      address: 'Baker Street',
      anyDrugAllergies: 'Yes',
      drugAllergies: 'Panadol',
      stationQueue: ['Done'],
      nextStation: 'Education',
      busy:false,
      createdAt: new Date()
    });
  }
});
