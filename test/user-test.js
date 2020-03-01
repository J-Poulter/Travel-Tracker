import chai from 'chai';
const expect = chai.expect;
// import loginData from '../src/loginData';

import User from '../src/user';
const spies = require('chai-spies');
chai.use(spies);

let user, loginData;

describe('User', () => {

  beforeEach(() => {
    user = new User({"id":11,"name":"Joy Dovington","travelerType":"history buff"});
    loginData = ['traveler1',
      'traveler2',
      'traveler3',
      'traveler4',
      'traveler5',
      'traveler6',
      'traveler7',
      'traveler8',
      'traveler9',
      'traveler10']
  });

  it('should be a function', () => {
    expect(User).to.be.a('function')
  });

  it('should be an instantiation of User class', () => {
    expect(user).to.be.an.instanceof(User)
  });

  it('should have an id property', () => {
    expect(user.id).to.deep.equal(11)
  });

  it('should have a name property', () => {
    expect(user.name).to.deep.equal('Joy Dovington')
  });

  it('should have a travelerType property', () => {
    expect(user.travelerType).to.deep.equal('history buff')
  });

  it('should be able to log in', () => {
    global.domUpdates = {};
    chai.spy.on(domUpdates, ['populateTravelerPage'], () => {})
    user.logIn('traveler8', 'traveler2020', loginData);
    expect(domUpdates.populateTravelerPage).to.be.called(1);
    expect(domUpdates.populateTravelerPage).to.be.called.with(8)
  });

  it.skip('should be able to display trips', () => {
    expect(user.displayTrips()).to.deep.equal()
  });

  it.skip('should be able to display requests', () => {
    expect(user.displayRequests()).to.deep.equal()
  });
});
