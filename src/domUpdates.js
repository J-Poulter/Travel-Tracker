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
    $('main').html('').addClass('destinations-display');
    $('body').removeClass('loginBody').addClass('travelerBody')
    let thisUser = travelersData.find(user => user.id == usersId)
    currentUser = new Traveler(thisUser, tripsData, destinationsData)
    this.createTravelerNavBar()
    this.createDestinationCards();
  },

  populateAgentPage() {
    $('main').html('').addClass('agent-display-page');
    $('body').removeClass('loginBody').addClass('agencyBody')
    currentUser = new TravelAgent({"id":0,"name":'Franky',"travelerType":'Agent'}, tripsData, destinationsData)
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
    $('.traveler-button2').click(() => this.createTravelerTrips(currentUser.usersTrips))
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
    $('main').html('').append(`<div class="description-background-flex"><div class='card destination-description'><h1 align="center">The following locations are all available vacation destinations!</h1><p align="center">(To book a trip, click the image of the destination and fill out all the input fields)</p></div></div>`)
    destinationsData.forEach(destination => {
      $('main').append(
        `<div id='${destination.id}' class='card'>
          <header data-id='${destination.id}'>
          </header>
          <span data-id='${destination.id}' class='destination-name'>${destination.destination}</span>
          <img data-id='${destination.id}' tabindex='0' class='card-picture book-destination' src='${destination.image}' alt='${destination.alt}'>
          <p class="card-cost-info flight-cost">Flight Cost per Person: $${destination.estimatedFlightCostPerPerson}</p>
          <p class="card-cost-info lodging-cost">Lodging Cost per Day: $${destination.estimatedLodgingCostPerDay}</p>
          <div class='request-form'></div>
        </div>`)
        $('.book-destination').click(() => this.openTripRequestForm(event.target.dataset.id)
        )
    })
  },

  openTripRequestForm(dataId, flightCost, lodgingCost) {
    $(event.target).siblings('.request-form').html('').append(
      `<label for='datepicker' class='form-label'>Date(YYYY/MM/DD):</label>
      <input id='datepicker' type='text' class='request-inputs' size='30'>
      <label for='duration' class='form-label'>Duration(days):</label>
      <input id='duration' type='text' class='request-inputs req-estimate-inputs' size='30'>
      <label for='travelersNum' class='form-label'>Number of Travelers:</label>
      <input id='travelersNum' type='text' class='request-inputs req-estimate-inputs' size='30'>
      <button data-id='${dataId}' class='traveler-button submit-request-button'>Submit Trip Request</button>
      <p class='input-missing-warning denied-message'></p>
      `)
      $('.submit-request-button').click(() => {
        let date = $('#datepicker').val()
        let duration = $('#duration').val()
        let travelers = $('#travelersNum').val()
        if (date.length && duration.length && travelers.length) {
          this.createRequestFormat(date, duration, travelers, event.target.dataset.id)
        } else {
          $(event.target).siblings('.input-missing-warning').text('Missing Input Fields!')
        }
      })
  },

  createRequestFormat(date, duration, travelers, id) {
    let completedRequest = {
      "id": Date.now(),
      "userID": currentUser.id,
      "destinationID": Number(id),
      "travelers": Number(travelers),
      "date": date,
      "duration": Number(duration),
      "status": "pending",
      "suggestedActivities": []
    }
    currentUser.makeTripRequest(completedRequest)
    this.updateTripsData()
    let thisTrip = new Trip(completedRequest, destinationsData)
    $(event.target).closest('.request-form').html(`<p class="approved-message">Request Successfully Sent!</p><p>Your Estimated Trip Cost is <u><strong>$${thisTrip.calculateEstimatedCost()}</strong></u></p>`)
  },

  createTravelerTrips(theseTrips) {
    $('main').html('')
    theseTrips.forEach(trip => {
      let curTrip = new Trip(trip, destinationsData)
      let tripDestination = curTrip.returnDestinationDetails()
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
    $('main').prepend(`<div class="description-background-flex"><div class='total-spent'>You have spent <strong><u>$${currentUser.calculateTotalSpent()}</u></strong> in 2020<br><br>
      <p class='filter-by'>Filter My Trips By:</p>
      <button class='filter-buttons approve-button pending-filter'>Pending</button>
      <button class='filter-buttons approve-button approved-filter'>Approved</button><br>
      <button class='filter-buttons approve-button past-filter'>Past</button>
      <button class='filter-buttons approve-button current-filter'>Current</button>
      <button class='filter-buttons approve-button upcoming-filter'>Upcoming</button>
      </div></div>`)
      $('.pending-filter').click(() => this.createTravelerTrips(currentUser.displayRequests()))
      $('.approved-filter').click(() => this.createTravelerTrips(currentUser.displayTrips()))
      $('.past-filter').click(() => this.createTravelerTrips(currentUser.displayPreviousTrips()))
      $('.current-filter').click(() => this.createTravelerTrips(currentUser.displayPresentTrips()))
      $('.upcoming-filter').click(() => this.createTravelerTrips(currentUser.displayUpcomingTrips()))
  },

  createAgentRequestsPage() {
    let allReqs = currentUser.displayRequests()
    $('main').html('').prepend(`<div class='pending-trips-container'>
    <h1 class='request-heading' align='center'>Current Outstanding Trip Requests:</h1>
    <table class='request-table'>
    <th class='request-row-heading'>Id</th>
    <th class='request-row-heading'>Date</th>
    <th class='request-row-heading'>Duration(days)</th>
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
      $(event.target).closest('.request-row').html('<p class="approved-message request-messages">Trip ID# ' + event.target.dataset.id + ' has been approved!</p>')
    })
    $('.deny-button').click(() => {
      currentUser.deleteUpcomingTrip(Number(event.target.dataset.id))
      $(event.target).closest('.request-row').html('<p class="denied-message request-messages">Trip ID#' + event.target.dataset.id + ' has been denied!</p>')
    })
    this.createAgentTodaysTripsTable()
  },

  createAgentTodaysTripsTable() {
    let todaysTrips = currentUser.displayTodaysTrips()
    $('main').append(`<div class='row-two-clear'>
      <div class="todays-trips-container">
      </div>
      </div>
      `)
      $('.todays-trips-container').append(() => {
        if (todaysTrips.length) {
          return `<h1 class="todays-trips-heading">There Are ${todaysTrips.length} Trips Currently in Progress:</h1>`
      } else {
        return `<h1>No Trips Currently in Progress!</h1>`
      }
    })

      todaysTrips.forEach(trip => {
        let tripsUser = travelersData.find(traveler => traveler.id === trip.userID)
        let tripsDestination = destinationsData.find(destination => destination.id === trip.destinationID)
        $('.todays-trips-container').append(`<p class="todays-trips-entry">*${tripsUser.name} (Id#${tripsUser.id}) is on a ${trip.duration} day trip with ${trip.travelers - 1} other traveler(s) visiting ${tripsDestination.destination}! (trip started on ${trip.date})</p>`)
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
