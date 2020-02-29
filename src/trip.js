class Trip {
  constructor(trip) {
    this.id = trip.id;
    this.userId = trip.userId;
    this.destinationId = trip.destinationId;
    this.travelers = trip.travelers;
    this.date = trip.date;
    this.duration = trip.duration;
    this.status = trip.status;
    this.suggestedActivities = trip.suggestedActivities;
  }

//     calculateEstimatedCost() {
//       let thisDestination = destinationData.find(location => location.id === this.id);
//       let currentDestination = new Destination(thisDestination);
//       let flightCost = currentDestination.estimatedFlightCostPerPerson * this.travelers;
//       let lodgingCost = currentDestination.estimatedLodgingCostPerDay * this.duration;
//       return '$' + (flightCost + lodgingCost);
//     }
}

export default Trip;
