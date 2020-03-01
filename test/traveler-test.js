import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/traveler';
import User from '../src/user';

let trip1, trip2, trip3, trip4, trip5, trip6, trip7, trip8, trip9, trip10, trip11, trip12, tripsData, user, traveler;

describe('Traveler', () => {

  beforeEach(() => {
    trip1 = {"id":31,"userID":11,"destinationID":33,"travelers":3,"date":"2020/12/19","duration":15,"status":"approved","suggestedActivities":[]}
    trip2 = {"id":32,"userID":34,"destinationID":36,"travelers":5,"date":"2020/05/06","duration":6,"status":"approved","suggestedActivities":[]}
    trip3 = {"id":33,"userID":6,"destinationID":36,"travelers":5,"date":"2020/03/26","duration":19,"status":"approved","suggestedActivities":[]}
    trip4 = {"id":34,"userID":32,"destinationID":14,"travelers":5,"date":"2019/08/02","duration":5,"status":"approved","suggestedActivities":[]}
    trip5 = {"id":35,"userID":36,"destinationID":1,"travelers":3,"date":"2020/10/23","duration":16,"status":"approved","suggestedActivities":[]}
    trip6 = {"id":36,"userID":30,"destinationID":26,"travelers":5,"date":"2019/10/20","duration":17,"status":"approved","suggestedActivities":[]}
    trip7 = {"id":37,"userID":49,"destinationID":24,"travelers":2,"date":"2021/02/20","duration":18,"status":"approved","suggestedActivities":[]}
    trip8 = {"id":38,"userID":47,"destinationID":20,"travelers":2,"date":"2020/11/16","duration":10,"status":"approved","suggestedActivities":[]}
    trip9 = {"id":39,"userID":42,"destinationID":25,"travelers":3,"date":"2019/10/22","duration":7,"status":"approved","suggestedActivities":[]}
    trip10 = {"id":40,"userID":29,"destinationID":50,"travelers":3,"date":"2020/10/31","duration":13,"status":"approved","suggestedActivities":[]}
    trip11 = {"id":41,"userID":3,"destinationID":25,"travelers":3,"date":"2020/08/30","duration":11,"status":"approved","suggestedActivities":[]}
    trip12 = {"id":42,"userID":11,"destinationID":32,"travelers":1,"date":"2020/08/08","duration":14,"status":"approved","suggestedActivities":[]}
    tripsData = [trip1, trip2, trip3, trip4, trip5, trip6, trip7, trip8, trip9, trip10, trip11, trip12];
    user = new User({"id":11,"name":"Joy Dovington","travelerType":"history buff"})
    traveler = new Traveler(user, tripsData)
  });

  it('should be a function', () => {
    expect(Traveler).to.be.a('function')
  });

  it('should be an instantiation of Traveler class', () => {
    expect(traveler).to.be.an.instanceof(Traveler)
  });

  it('should have a property that contains that users trips', () => {
    expect(traveler.usersTrips).to.deep.equal([trip1, trip12])
  });

  it.skip('should be able to make a trip request', () => {
    expect(traveler.makeTripRequest()).to.deep.equal()
  });

  it.skip('should be able to calculate the total amount they spent so far', () => {
    expect(traveler.calculateTotalSpent()).to.deep.equal()
  });
})
