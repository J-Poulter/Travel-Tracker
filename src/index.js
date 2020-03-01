// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
import domUpdates from './domUpdates';
import User from './user';
import TravelAgent from './travelAgent';
import Traveler from './traveler';
import Trip from './trip';
// import Destination from './destination';
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import './images/LoginBackground.jpg';
import './images/TravelBackground.jpg';

let logInButton = document.querySelector('#sub-button');
let usernameInput = document.querySelector('#usernameInput');
let passwordInput = document.querySelector('#passwordInput');

let destinationsData, tripsData, travelersData;
// logInButton.addEventListener('click', user.logIn(usernameInput.value, passwordInput.value))
// window.addEventListener('onload', obtainData);
logInButton.addEventListener('click', obtainData)

async function obtainData() {
  let res = await fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/destinations/destinations')
    destinationsData = await res.json();

  let res2 = await fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips')
    tripsData = await res2.json();

  let res3 = await fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers')
    travelersData = await res3.json();
    
    console.log(destinationsData)
    console.log(tripsData)
    console.log(travelersData)
}

// console.log('This is the JavaScript entry file - your code begins here.');
