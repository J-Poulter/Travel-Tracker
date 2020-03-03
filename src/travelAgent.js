import User from './user';
import Trip from './trip';
var moment = require('moment');

class TravelAgent extends User {
  constructor(user, tripsData, destinationsData) {
    super(user, tripsData, destinationsData)
  }

  searchUserDetails(searchWord, travelersData) {
    let searchThis = searchWord.toLowerCase();
    return travelersData.filter(traveler => traveler.name.toLowerCase().includes(searchThis))
  }

  async approveTripRequest(tripID) { 
    let thisTrip = {"id": tripID, "status": "approved"}
    let res = await window.fetch("https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/updateTrip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify(thisTrip),
    })
    let req = await res.json();
    console.log(req)
  }

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
    let presentTrips = this.tripsData.filter(trip => {
      let datesInfo = this.getDateInformation(trip)
      if (datesInfo[0] > datesInfo[1] && datesInfo[0] < datesInfo[2]) {
        return trip
      }
    })
    return presentTrips;
  }

  async deleteUpcomingTrip(tripID) {
    let thisTrip = {"id": tripID}
    let res = await window.fetch("https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips", {
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
