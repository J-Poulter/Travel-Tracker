import $ from 'jquery';
import User from './user';
import TravelAgent from './travelAgent';
import Traveler from './traveler';
import Trip from './trip';

let currentUser, destinationsData, tripsData, travelersData;




let domUpdates = {

  transferData(destinations, trips, travelers) {
    destinationsData = destinations;
    tripsData = trips;
    travelersData = travelers;
  },

  populateTravelerPage(usersId) {
    $('main').html('');
    $('body').removeClass('loginBody').addClass('travelerBody')
    let thisUser = travelersData.find(user => user.id == usersId)
    currentUser = new Traveler(thisUser, tripsData)
    console.log(currentUser)
    // currentUser = new User()
  },

  populateAgentPage() {
    $('main').html('');
    $('body').removeClass('loginBody').addClass('agencyBody')
    console.log(travelersData)
  },

  loginErrorDisplay() {
    return
  }
}


export default domUpdates;
