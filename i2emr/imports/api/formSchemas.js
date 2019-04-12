import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// Define the schema
const infoSchema = new SimpleSchema({
Name: {
    type: String,
    label: "Name",
    max: 200
},
id: {
    type: String,
    label: "id"
},
Height: {
    type: Number,
    label: "Height",
    min: 0
},
Weight: {
    type: Number,
    label: "Weight",
    min: 0
}
});