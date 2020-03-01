import chai from 'chai';
const expect = chai.expect;
import User from '../src/user'
import TravelAgent from '../src/travelAgent';

let user, travelAgent;

describe('TravelAgent', () => {

  beforeEach(() => {
    user = new User({"id":0,"name":'Franky',"travelerType":'Agent'})
    travelAgent = new TravelAgent(user)
  });

  it('should be a function', () => {
    expect(TravelAgent).to.be.a('function')
  });

  it('should be an instantiation of Traveler class', () => {
    expect(travelAgent).to.be.an.instanceof(TravelAgent)
  });

  it.skip('should be able to search for a users details', () => {
    expect(travelAgent.searchUserDetails()).to.deep.equal()
  });

  it.skip('should be able to approve a trip request', () => {
    expect(travelAgent.approveTripRequest()).to.deep.equal()
  });

  it.skip('should be able to ', () => {
    expect(travelAgent.denyTripRequest()).to.deep.equal()
  });

  it.skip('should be able to calculate their income for the year', () => {
    expect(travelAgent.calculateYearsIncome()).to.deep.equal()
  });

  it.skip('should be able to display all of todays trips', () => {
    expect(travelAgent.displayTodaysTrips()).to.deep.equal()
  });

  it.skip('should be able to delete an upcoming trip', () => {
    expect(travelAgent.deleteUpcomingTrip()).to.deep.equal()
  });
})
