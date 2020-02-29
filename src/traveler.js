import User from './user';


class Traveler extends User {
  constructor(user, usersTrips) {
    super(user)
    this.usersTrips = usersTrips
  }

  makeTripRequest() {
    let request = {

    }
  }

  calculateTotalSpent() {

  }
}

export default Traveler;
