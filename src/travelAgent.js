import User from './user';
import Trip from './trip';
var moment = require('moment');
//moment().format(); Correct format??
moment().format('YYYY MMMM Do');

class TravelAgent extends User {
  constructor(user, tripsData, destinationsData) {
    super(user, tripsData, destinationsData)
  }

  searchUserDetails() {

  }

  async approveOrDenyTripRequest(tripID, determination) { //NEEDS TO BE AN OBJ WITH ID AND APPROVED/DENIED STATUS ONLY//
    let thisTrip = {
      id: tripID,
      status: determination
    }
    let res = await fetch("https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/updateTrip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify(thisTrip),
    })
    let req = await res.json();
    console.log(req)
  }

  // denyTripRequest() { //NEEDS TO BE AN OBJ WITH ID AND APPROVED STATUS ONLY//
  //   let res = await fetch("https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/updateTrip", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     }, body: JSON.stringify(thisTrip),
  //   })
  //   let req = await res.json();
  //   console.log(req)
  // }

  calculateYearsIncome() {
    let thisYearsTrips = this.tripsData.filter(trip => trip.status === 'approved' && trip.date.includes(2020))
    let totalIncome = thisYearsTrips.reduce((totalSpent, curTrip) => {
      let trip = new Trip(curTrip, this.destinationsData);
      totalSpent += trip.calculateEstimatedCost()
      return totalSpent;
    }, 0) / 1.1 * 0.1
    return Math.floor(totalIncome)
  }

  displayTodaysTrips() {

  }

  async deleteUpcomingTrip(tripID) {
    let thisTrip = {"id": tripID}
    let res = fetch("https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify(thisTrip)
    })
    let req = await res.json()
    console.log(req)
  }
}

export default TravelAgent;
