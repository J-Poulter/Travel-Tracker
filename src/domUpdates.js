import $ from 'jquery';
import User from './user';
import TravelAgent from './travelAgent';
import Traveler from './traveler';
import Trip from './trip';
import datepicker from 'js-datepicker'

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
    this.createAgentNavBar()
    this.createAgentRequestsPage()
  },

  loginErrorDisplay() {
    $('.login-container').append("<p class='warning-text'>Login Failed: Incorrect Username or Password</p>")
    $('.login-fields').val('')
  },

  createTravelerNavBar() {
    $('body').prepend(`
      <nav class='traveler-nav'>Welcome ${currentUser.name}!
      <div class='traveler-button-container'>
      <button class='traveler-button traveler-button1'>All Destinations</button>
      <button class='traveler-button traveler-button2'>My Trips Information</button>
      </div></nav>
    `)
    $('.traveler-button1').click(() => this.createDestinationCards())
    $('.traveler-button2').click(() => this.createTravelerTrips())
  },

  createAgentNavBar() {
    $('body').prepend(`
      <nav class='traveler-nav'>Welcome ${currentUser.name}!
      <div class='traveler-button-container'>
      <button class='traveler-button agent-button agent-button1'>Pending Requests</button>
      <button class='traveler-button agent-button agent-button2'>Search Users</button>
      </div></nav>
    `)
    $('.agent-button1').click(() => {
      this.updateTripsData();
      this.createAgentRequestsPage();
    })
    $('.agent-button2').click(() => this.createAgentSearchPage())
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

        // $('.book-destination').click(() => )

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
  },

  createAgentRequestsPage() {
    let allReqs = currentUser.displayRequests()
    $('main').html('').prepend(`<div class='pending-trips-container'>
    <table class='request-table'>
    <th class='request-row-heading'>Id</th>
    <th class='request-row-heading'>Date</th>
    <th class='request-row-heading'>Duration</th>
    <th class='request-row-heading'>Approve</th>
    <th class='request-row-heading'>Deny</th>
    </table>
    </div>`)
    allReqs.forEach(request => {
      $('.request-table').append(
        `<tr class='request-row request${request.id}'>
          <td>${request.id}</td>
          <td>${request.date}</td>
          <td>${request.duration}</td>
          <td><button data-id='${request.id}' class='approve-button'>Approve Request</button></td>
          <td><button data-id='${request.id}' class='deny-button'>Deny Request</button></td>
        `)
    })
    $('.approve-button').click(() => {
      currentUser.approveTripRequest(Number(event.target.dataset.id))
      $(event.target).closest('.request-row').html('<p class="approved-message">This Trip has been approved!</p>')
    })
    $('.deny-button').click(() => {
      currentUser.deleteUpcomingTrip(Number(event.target.dataset.id))
      $(event.target).closest('.request-row').html('<p class="denied-message">This Trip has been denied!</p>')
    })
  },

  createAgentSearchPage() {
    $('main').html('')
  },

  async updateTripsData() {
    let res = await fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips')
      let tripRes = await res.json();
      tripsData = await tripRes.trips;
      currentUser.tripsData = tripsData;
  }
}


export default domUpdates;
