import loginData from './loginData';
import domUpdates from './domUpdates';

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.travelerType = user.travelerType;
  }

  logIn(username, password, loginData) {
    if (loginData.includes(username) && password === 'traveler2020') {
      let usersId = Number(username.slice(8));
      domUpdates.populateTravelerPage(usersId)
    }
    else if (username === 'agency' && password === 'traveler2020') {
      domUpdates.populateAgentPage();
    }
    else {
      domUpdates.loginErrorDisplay()
    }
  }

  displayTrips() {

  }

  displayRequests() {

  }
}

export default User;
