class Trip {
  constructor(trip) {
    this.id = trip.id;
    this.userID = trip.userID;
    this.destinationID = trip.destinationID;
    this.travelers = trip.travelers;
    this.date = trip.date;
    this.duration = trip.duration;
    this.status = trip.status;
    this.suggestedActivities = trip.suggestedActivities;
  }

    calculateEstimatedCost(destinationsData) {
      let thisDestination = destinationsData.find(location => location.id === this.destinationID);
      let flightCost = thisDestination.estimatedFlightCostPerPerson * this.travelers;
      let lodgingCost = thisDestination.estimatedLodgingCostPerDay * this.duration;
      let combinedCost = flightCost + lodgingCost;
      let agentFee = combinedCost * 0.1;
      let totalCost = agentFee + combinedCost
      return `$${totalCost} (includes $${agentFee} agent fee)`
    }
}

export default Trip;
