import { Meteor } from 'meteor/meteor';
import Links from '/imports/api/links';
import Patientinfo from '/imports/api/patientinfo';
import Stationforms from '/imports/api/stationforms';


function addPatient(name, id, nextStation) {
  Patientinfo.insert({name:name, id:id, nextStation:nextStation, busy:false, createdAt: new Date() });
}

function addForm(station, formData) {
  Stationforms.insert({name:station, data:formData});
}

Meteor.startup(() => {
  Patientinfo.remove({});
  Stationforms.remove({});

  if (Patientinfo.find().count() === 0) {
    Patientinfo.insert({
      name: 'Tom',
      id: 'S1234567A',
      gender: 'male',
      age: '24',
      contactNumber: '12344321',
      spokenLanguages: ['English', 'Others'],
      writtenLanguages: ['English'],
      address: 'Baker Street',
      anyDrugAllergies: 'Yes',
      drugAllergies: 'Panadol',
      nextStation: 'Height & weight',
      busy:false,
      createdAt: new Date()
    });
    Patientinfo.insert({
      name: 'Gary',
      id: 'S7654321Z',
      gender: 'male',
      age: '24',
      contactNumber: '12344321',
      spokenLanguages: ['English', 'Others'],
      writtenLanguages: ['English'],
      address: 'Baker Street',
      anyDrugAllergies: 'No',
      nextStation: 'Height & weight',
      busy:false,
      createdAt: new Date()
    });
  }

  if (Stationforms.find().count() === 0) {
    addForm(
      'Registration',
      [
        ["name","text"],
        ["id","alphanumeric"],
        ["age", "number"]
      ]
    )
  }
});
