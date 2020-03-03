import chai from 'chai';
const expect = chai.expect;
import User from '../src/user';

let trip1, trip2, trip3, trip4, trip5, tripsData, user;

describe('User', () => {

  beforeEach(() => {
    trip1 = {"id":31,"userID":11,"destinationID":33,"travelers":3,"date":"2020/12/19","duration":15,"status":"approved","suggestedActivities":[]}
    trip2 = {"id":40,"userID":29,"destinationID":50,"travelers":3,"date":"2020/10/31","duration":13,"status":"approved","suggestedActivities":[]}
    trip3 = {"id":41,"userID":3,"destinationID":25,"travelers":3,"date":"2020/08/30","duration":11,"status":"approved","suggestedActivities":[]}
    trip4 = {"id":42,"userID":11,"destinationID":32,"travelers":1,"date":"2020/08/08","duration":14,"status":"approved","suggestedActivities":[]}
    trip5 = {"id":22,"userID":11,"destinationID":35,"travelers":1, "date":"2020/05/03","duration":11,"status":"pending","suggestedActivities":[]}
    tripsData = [trip1, trip2, trip3, trip4, trip5]

    user = new User({"id":11,"name":"Joy Dovington","travelerType":"history buff"}, tripsData);
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

  it('should be able to display trips', () => {
    expect(user.displayTrips()).to.deep.equal([trip1, trip4])
  });

  it('should be able to display requests', () => {
    expect(user.displayRequests()).to.deep.equal([trip5])
  });
});
