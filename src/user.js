class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.travelerType = user.travelerType;
  }

  logIn(userName, password) {
    if (userName ===  traveler/*find function to have nums 1-50*/ && password = 'travel2020') {
      domUpdates.populateTravelerPage()
    } else if (userName === 'agency' && password === 'travel2020') {
      domUpdates.populateAgentPage()
    } else {
      domUpdates.loginErrorDisplay()
    }
  }

  displayTrips() {

  }

  displayRequests() {

  }
}

export default User;
