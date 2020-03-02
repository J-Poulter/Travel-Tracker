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
    $('main').addClass('destinations-display')
    this.createDestinationCards();

    let thisUser = travelersData.find(user => user.id == usersId)
    currentUser = new Traveler(thisUser, tripsData, destinationsData)
    let spent = currentUser.calculateTotalSpent()
    console.log(currentUser)
    console.log(spent)
    let trips = currentUser.displayTrips()
    console.log(trips)
    let pending = currentUser.displayRequests();
    console.log(pending)

    this.createTravelerNavBar()
    // currentUser = new User()
  },

  populateAgentPage() {
    $('main').html('');
    $('body').removeClass('loginBody').addClass('agencyBody')
    currentUser = new TravelAgent({"id":0,"name":'Franky',"travelerType":'Agent'}, tripsData, destinationsData)
    console.log(currentUser)
    //FIND PROPER PLACE FOR FUNCTION BELOW
    let income = currentUser.calculateYearsIncome()
    console.log(income)
    let requests = currentUser.displayRequests();
    console.log(requests)

  },

  loginErrorDisplay() {
    $('.login-container').append("<p class='warning-text'>Login Failed: Incorrect Username or Password</p>")
    $('.login-fields').val('')
  },

  createTravelerNavBar() {
    $('body').prepend(`
      <nav class='traveler-nav'>Welcome ${currentUser.name}!
      <div class='traveler-button-container'>
      <button class='traveler-button traveler-button2'>All Destinations</button>
      <button class='traveler-button traveler-button1'>My Trips Information</button>
      </div></nav>
    `)
    $('.traveler-button1').click(() => this.createTravelerTrips())
    $('.traveler-button2').click(() => this.createDestinationCards())
  },

  createDestinationCards() {
    $('main').html('')
    destinationsData.forEach(destination => {
      $('main').prepend(
        `<div id='${destination.id}' class='card'>
        <header data-id='${destination.id}'>
        </header>
        <span data-id='${destination.id}' class='destination-name'>${destination.destination}</span>
        <img data-id='${destination.id}' tabindex='0' class='card-picture book-destination' src='${destination.image}' alt='${destination.alt}'>
        <p class="card-cost-info">Flight Cost per Person: $${destination.estimatedFlightCostPerPerson}</p>
        <p class="card-cost-info">Lodging Cost per Day: $${destination.estimatedLodgingCostPerDay}</p>
        </div>`)
    })
  },

  createTravelerTrips() {
    $('main').html('')
    currentUser.usersTrips.forEach(trip => {
      let curTrip = new Trip(trip, destinationsData)
      console.log(curTrip)
      let tripDestination = curTrip.returnDestinationDetails()
      console.log(tripDestination)
      console.log(curTrip)
      $('main').prepend(
        `<div class='travelers-trips card'>
        <img tabindex='0' class='card-picture' src='${tripDestination.image}' alt='${tripDestination.alt}'>
        <p class='traveler-trips-info'><span class='traveler-trips-span'>Location:</span>  ${tripDestination.destination}</p>
        <p class='traveler-trips-info'><span class='traveler-trips-span'>Trip Cost:</span>  $${curTrip.calculateEstimatedCost()}</p>
        <p class='traveler-trips-info'><span class='traveler-trips-span'>Status:</span>  ${curTrip.status}</p>
        <p class='traveler-trips-info'><span class='traveler-trips-span'>Starting Date:</span>  ${curTrip.date}</p>
        <p class='traveler-trips-info'><span class='traveler-trips-span'># of Travelers:</span>  ${curTrip.travelers}</p>
        </div>
        `)
    })
    $('main').prepend(`<div class='total-spent'>You have spent $${currentUser.calculateTotalSpent()} in 2020
      <p>Filter My Trips By:</p>
      <button class='filter-buttons'>Pending</button>
      <button class='filter-buttons'>Approved</button><br>
      <button class='filter-buttons'>Past</button>
      <button class='filter-buttons'>Current</button>
      <button class='filter-buttons'>Upcoming</button>
      </div>`)

  }


}


export default domUpdates;
