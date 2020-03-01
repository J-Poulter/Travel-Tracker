import chai from 'chai';
const expect = chai.expect;
import loginData from '../src/loginData'
import Trip from '../src/trip';

let trip, destinationsData;

describe('Trip', () => {

  beforeEach(() => {

    destinationsData = [{"id":8,"destination":"Tokyo, Japan","estimatedLodgingCostPerDay":125,"estimatedFlightCostPerPerson":1000,"image":"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1971&q=80","alt":"city with people walking in crosswalk and brightly lit shops at night"},{"id":9,"destination":"Amsterdam, Netherlands","estimatedLodgingCostPerDay":100,"estimatedFlightCostPerPerson":950,"image":"https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80","alt":"canal with boats and trees and buildings along the side"},{"id":10,"destination":"Toronto, Canada","estimatedLodgingCostPerDay":90,"estimatedFlightCostPerPerson":450,"image":"https://images.unsplash.com/photo-1535776142635-8fa180c46af7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2756&q=80"},{"id":11,"destination":"Mikonos, Greece","estimatedLodgingCostPerDay":140,"estimatedFlightCostPerPerson":1000,"image":"https://images.unsplash.com/photo-1573783309724-e44b859f5a85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1953&q=80","alt":"cityscape along the water during the day"}]

    trip = new Trip({"id":22,"userID":22,"destinationID":9,"travelers":4,"date":"2020/05/01","duration":19,"status":"pending","suggestedActivities":[]})
  });

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  });

  it('should be an instantiation of the Trip class', () => {
    expect(trip).to.be.an.instanceof(Trip);
  })

  it('should have an id property', () => {
    expect(trip.id).to.deep.equal(22)
  })
  it('should have a userId property', () => {
    expect(trip.userID).to.deep.equal(22)
  })
  it('should have a destinationId property', () => {
    expect(trip.destinationID).to.deep.equal(9)
  })
  it('should have a travelers property', () => {
    expect(trip.travelers).to.deep.equal(4)
  })
  it('should have a date property', () => {
    expect(trip.date).to.deep.equal('2020/05/01')
  })
  it('should have a duration property', () => {
    expect(trip.duration).to.deep.equal(19)
  })
  it('should have a status property', () => {
    expect(trip.status).to.deep.equal('pending')
  })
  it('should have a suggestedActivities property', () => {
    expect(trip.suggestedActivities).to.deep.equal([])
  })

  it('should be able to calculate the estimated cost of the trip', () => {
    expect(trip.calculateEstimatedCost(destinationsData)).to.deep.equal('$6270 (includes $570 agent fee)')
  })
})
