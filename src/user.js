class User {
  constructor(user, tripsData, destinationsData) {
    this.id = user.id;
    this.name = user.name;
    this.travelerType = user.travelerType;
    this.tripsData = tripsData;
    this.destinationsData = destinationsData;
  }

  displayTrips() {
    if (this.id === 0) {
      return this.tripsData.filter(trip => trip.status === 'approved')
    } else {
      return this.tripsData.filter(trip => trip.userID === this.id)
    }

  }

  displayRequests() {
    if (this.id === 0) {
      return this.tripsData.filter(trip => trip.status === 'pending')
    } else {
      return this.tripsData.filter(trip => trip.status === 'pending' && trip.userID === this.id)
    }
  }
}

export default User;
