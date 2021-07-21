#  i2Eye/PHS Screening App

## Quick setup
 1. Install Chocolatey
 https://chocolatey.org/install
 
 1. Install Meteor
 https://www.meteor.com/install

 1. Install node/npm

 1. Go to `i2emr` folder

 1. Run `npm install`

 1. Run the app using `meteor`

## Brief History
Project i2Eye is an overseas community involvement project (OCIP) based in Madhya Pradesh, India with the aim of improving the health of locals through health screening interventions and education. This app was written to enable remote health screenings with the limited manpower available.


## Implementation Details
[MeteorJS](https://www.meteor.com/) is used with React and MongoDB.

### 1. Designed to be deployed locally on the intranet
This was done because of:

**Infrastructure** - There was no reliable internet connection at the i2eye screening locations.

**Security** - Medical information is sensitive and there are stringent and costly requirements to meet to store it on a remote server. Storing everything locally bypasses all that complexity, without compromising participant privacy.

**Portability** - The screening app can be easily transported and quickly set up, with only a laptop and a wireless router.

### 2. Written in NodeJS
This was chosen because it is:

**Scalable** - Asynchronous architecture allows for a massive number of simultaneous connections. This was important as the number of users (volunteers) can increase to meet demand.

**Unified** - And can handle both frontend and backend. This makes the project easier to maintain, as well as pass down to future student volunteers.


## Deployment Details
Follow these instructions:
1. https://guide.meteor.com/deployment.html#custom-deployment
2. Find out the version of Node Meteor is using, then install it using [NVM](https://github.com/coreybutler/nvm-windows)
3. Deploy using [PM2](https://github.com/Unitech/pm2) for multithreading and load balancing.
