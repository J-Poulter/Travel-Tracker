import User from './user';
import Trip from './trip';

class Traveler extends User {
  constructor(user, tripsData, destinationsData) {
    super(user, tripsData, destinationsData)
    this.usersTrips = this.tripsData.filter(usertrip => usertrip.userID === this.id);
  }

  async makeTripRequest(thisTrip) { //NEEDS TO BE FORMAT OF TRIP OBJ//
    let res = await fetch("https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify(thisTrip),
    })
      let req = await res.json();
      console.log(req)
    }

  calculateTotalSpent() {
    let approvedTrips = this.usersTrips.filter(trip => trip.status === 'approved' && trip.date.includes('2020'));
    return approvedTrips.reduce((total, curTrip) => {
      let trip = new Trip(curTrip, this.destinationsData);
      total += trip.calculateEstimatedCost()
      return total;
    }, 0)
  }

  displayPreviousTrips() {
    // return this.usersTrips.filter(trip => trip.date < Date.Now())
  }

  displayPresentTrips() {
    // return this.usersTrips.filter(trip => trip.date < Date.Now < trip.date+duration())
  }

  displayUpcomingTrips() {
    // return this.usersTrips.filter(trip => trip.date > Date.Now())
  }
}

export default Traveler;
