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
}

export default Trip;
