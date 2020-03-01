import User from './user';

class Traveler extends User {
  constructor(user, tripsData) {
    super(user)
    this.usersTrips = tripsData.filter(usertrip => usertrip.userID === this.id);
  }

  async makeTripRequest(thisTrip) {
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

  }
}

export default Traveler;
