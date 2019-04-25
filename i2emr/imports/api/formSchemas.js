import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// Define the schema
export const infoSchema = new SimpleSchema({
    name: {
        type: String,
        regEx: /^\D+$/,
        label: "Name",
    },
    id: {
        type: String,
        regEx: /^[A-z][0-9]{7}[A-z]$/,
        label: "ID",
    }
});