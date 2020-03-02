import chai from 'chai';
const expect = chai.expect;
import User from '../src/user'
import TravelAgent from '../src/travelAgent';

let trip1, trip2, trip3, trip4, tripsData, destination1, destination2, destination3, destination4, destinationsData, travelAgent;

describe('TravelAgent', () => {

  beforeEach(() => {
    trip1 = {"id":31,"userID":11,"destinationID":33,"travelers":3,"date":"2020/12/19","duration":15,"status":"approved","suggestedActivities":[]}
    trip2 = {"id":40,"userID":29,"destinationID":50,"travelers":3,"date":"2020/10/31","duration":13,"status":"approved","suggestedActivities":[]}
    trip3 = {"id":41,"userID":3,"destinationID":25,"travelers":3,"date":"2020/08/30","duration":11,"status":"approved","suggestedActivities":[]}
    trip4 = {"id":42,"userID":11,"destinationID":32,"travelers":1,"date":"2020/08/08","duration":14,"status":"approved","suggestedActivities":[]}
    tripsData = [trip1, trip2, trip3, trip4]
    destination1 = {"id":32,"destination":"Kathmandu, Nepal","estimatedLodgingCostPerDay":45,"estimatedFlightCostPerPerson":1200,"image":"https://images.unsplash.com/photo-1558799401-1dcba79834c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80","alt":"temple with buntings during daytime"}
    destination2 = {"id":33,"destination":"Brussels, Belgium","estimatedLodgingCostPerDay":1000,"estimatedFlightCostPerPerson":110,"image":"https://images.unsplash.com/photo-1559113202-c916b8e44373?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80","alt":"brown concrete gate"}
    destination3 = {"id":25,"destination":"New York, New York","estimatedLodgingCostPerDay":175,"estimatedFlightCostPerPerson":200,"image":"https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80","alt":"people crossing the street during the day surrounded by tall buildings and advertisements"}
    destination4 = {"id":50,"destination":"Hobart, Tasmania","estimatedLodgingCostPerDay":1400,"estimatedFlightCostPerPerson":75,"image":"https://images.unsplash.com/photo-1506982724953-b1fbe939e1e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80","alt":"person sitting on brown rock in front of body of water"}
    destinationsData = [destination1, destination2, destination3, destination4]
    travelAgent = new TravelAgent({"id":0,"name":'Franky',"travelerType":'Agent'}, tripsData, destinationsData)
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

  it.skip('should be able to approve or reject a trip request', () => {
    expect(travelAgent.approveOrDenyTripRequest()).to.deep.equal()
  });

  it('should be able to calculate their income for the year', () => {
    expect(travelAgent.calculateYearsIncome()).to.deep.equal(3810)
  });

  it.skip('should be able to display all of todays trips', () => {
    expect(travelAgent.displayTodaysTrips()).to.deep.equal()
  });

  it.skip('should be able to delete an upcoming trip', () => {
    expect(travelAgent.deleteUpcomingTrip()).to.deep.equal()
  });
})
