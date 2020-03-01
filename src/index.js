// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
import domUpdates from './domUpdates';
import User from './user';
import TravelAgent from './travelAgent';
import Traveler from './traveler';
import Trip from './trip';
import loginData from './loginData'
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import './images/LoginBackground.jpg';
import './images/TravelBackground.jpg';
import './images/Traveler.jpg'

let logInButton = document.querySelector('#sub-button');
let usernameInput = document.querySelector('#usernameInput');
let passwordInput = document.querySelector('#passwordInput');

let destinationsData, tripsData, travelersData;
let user = new User(0, 'blank', 'none');

logInButton.addEventListener('click', loginHelper)

obtainData();

async function obtainData() {
  let res = await fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/destinations/destinations')
    let destRes = await res.json();
    destinationsData = await destRes.destinations;
  let res2 = await fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips')
    let tripRes = await res2.json();
    tripsData = await tripRes.trips;
  let res3 = await fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers')
    let travRes = await res3.json();
    travelersData = travRes.travelers;
}

function loginHelper() {
  let usernameInfo = usernameInput.value
  let passwordInfo = passwordInput.value
  domUpdates.transferData(destinationsData, tripsData, travelersData)
  user.logIn(usernameInfo, passwordInfo, loginData)
}
// console.log('This is the JavaScript entry file - your code begins here.');
