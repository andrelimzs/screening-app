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
Patientinfo.remove({});
Stationforms.remove({});

  // Reset all patients who were midway through a station
  Patientinfo.update({ busy: true },{
    $set:{ busy: false }
  }, { multi: true });

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
      stationQueue:["Height & weight", "Blood Glucose & Hb", "Blood Pressure", "Phlebotomy", "Doctors' Consult", "Eye Screening", "Education"],
      nextStation: 'Height & weight',
      busy:false,
      lastSubmit: new Date(),
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
      stationQueue:["Height & weight", "Blood Glucose & Hb", "Blood Pressure", "Phlebotomy", "Doctors' Consult","Eye Screening", "Education"],
      nextStation: 'Height & weight',
      busy:false,
      lastSubmit: new Date(),
      createdAt: new Date()
    });
    Patientinfo.insert({
      id: '3',
      "Patient Info":{
        name: 'Lisa',
        gender: 'female',
        age: '21',
        contactNumber: '12344321',
        spokenLanguages: ['English', 'Others'],
        writtenLanguages: ['English'],
        address: 'Baker Street',
        anyDrugAllergies: 'Yes',
        drugAllergies: 'Panadol',
      },
      "Blood Glucose & Hb": [{"docConsultForBloodGlucAndHb": true}],
      stationQueue: ["Doctors' Consult","Eye Screening", "Education"],
      nextStation: "Doctors' Consult",
      busy:false,
      createdAt: new Date()
    });

    Patientinfo.insert({
      id: '4',
      "Patient Info":{
        name: 'John',
        gender: 'male',
        age: '24',
        contactNumber: '12344321',
        spokenLanguages: ['English', 'Others'],
        writtenLanguages: ['English'],
        address: 'Baker Street',
        anyDrugAllergies: 'No',
      },
      "Height & weight": [{"waist": 86}],
      stationQueue:["Blood Glucose & Hb", "Blood Pressure", "Phlebotomy", "Doctors' Consult","Eye Screening", "Education","Post-Screening Feedback"],
      nextStation: "Blood Glucose & Hb",
      busy:false,
      lastSubmit: new Date(),
      createdAt: new Date()
    });
    Patientinfo.insert({
      id: '5',
      "Patient Info":{
        name: 'Vincent',
        gender: 'male',
        age: '24',
        contactNumber: '12344321',
        spokenLanguages: ['English', 'Others'],
        writtenLanguages: ['English'],
        address: 'Baker Street',
        anyDrugAllergies: 'No',
      },
      stationQueue:["Blood Pressure", "Phlebotomy", "Doctors' Consult","Eye Screening", "Education","Post-Screening Feedback"],
      nextStation: "Blood Pressure",
      busy:false,
      lastSubmit: new Date(),
      createdAt: new Date()
    });
    Patientinfo.insert({
      id: '6',
      "Patient Info":{
        name: 'George',
        gender: 'male',
        age: '24',
        contactNumber: '12344321',
        spokenLanguages: ['English', 'Others'],
        writtenLanguages: ['English'],
        address: 'Baker Street',
        anyDrugAllergies: 'No',
      },
      stationQueue:["Phlebotomy", "Doctors' Consult","Eye Screening", "Education","Post-Screening Feedback"],
      nextStation: "Phlebotomy",
      busy:false,
      lastSubmit: new Date(),
      createdAt: new Date()
    });
    Patientinfo.insert({
      id: '7',
      "Patient Info":{
        name: 'Fred',
        gender: 'male',
        age: '24',
        contactNumber: '12344321',
        spokenLanguages: ['English', 'Others'],
        writtenLanguages: ['English'],
        address: 'Baker Street',
        anyDrugAllergies: 'No',
      },
      stationQueue:["Eye Screening", "Education","Post-Screening Feedback"],
      nextStation: "Eye Screening",
      busy:false,
      lastSubmit: new Date(),
      createdAt: new Date()
    });
    Patientinfo.insert({
      id: '8',
      "Patient Info":{
        name: 'Ted',
        gender: 'male',
        age: '24',
        contactNumber: '12344321',
        spokenLanguages: ['English', 'Others'],
        writtenLanguages: ['English'],
        address: 'Baker Street',
        anyDrugAllergies: 'No',
      },
      "Blood Glucose & Hb": [{"docConsultForBloodGlucAndHb": true}],
      "Blood Pressure": [{"docConsultForBP": true}],
      "Height & weight": [{"bmi":30,"waistHipRatio":0.91}],
      stationQueue:["Education","Post-Screening Feedback"],
      nextStation: "Education",
      busy:false,
      lastSubmit: new Date(),
      createdAt: new Date()
    });
    Patientinfo.insert({
      id: '9',
      "Patient Info":{
        name: 'Mary',
        gender: 'female',
        age: '24',
        contactNumber: '12344321',
        spokenLanguages: ['English', 'Others'],
        writtenLanguages: ['English'],
        address: 'Baker Street',
        anyDrugAllergies: 'No',
      },
      stationQueue:["Pap Smear", "Breast Exam", "Women's Edu", "Doctors' Consult","Eye Screening", "Education","Post-Screening Feedback"],
      nextStation: "Pap Smear",
      busy:false,
      lastSubmit: new Date(),
      createdAt: new Date()
    });
    Patientinfo.insert({
      id: '10',
      "Patient Info":{
        name: 'Jenny',
        gender: 'female',
        age: '24',
        contactNumber: '12344321',
        spokenLanguages: ['English', 'Others'],
        writtenLanguages: ['English'],
        address: 'Baker Street',
        anyDrugAllergies: 'No',
      },
      stationQueue:["Breast Exam", "Women's Edu", "Doctors' Consult","Eye Screening", "Education","Post-Screening Feedback"],
      nextStation: "Breast Exam",
      busy:false,
      lastSubmit: new Date(),
      createdAt: new Date()
    });
    Patientinfo.insert({
      id: '11',
      "Patient Info":{
        name: 'Gaby',
        gender: 'female',
        age: '24',
        contactNumber: '12344321',
        spokenLanguages: ['English', 'Others'],
        writtenLanguages: ['English'],
        address: 'Baker Street',
        anyDrugAllergies: 'No',
      },
      stationQueue:["Women's Edu", "Doctors' Consult","Eye Screening", "Education","Post-Screening Feedback"],
      nextStation: "Women's Edu",
      busy:false,
      lastSubmit: new Date(),
      createdAt: new Date()
    });
  }
});
