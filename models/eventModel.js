class Event {
    constructor(id, companyId, createdById, participantsId, monthId, dayId, timeId, location, eventName ){
        this.id = id;
        this.companyId = companyId;
        this.createdById = createdById;
        this.participantsId = participantsId;
        this.monthId = monthId;
        this.dayId = dayId;
        this.timeId = timeId;
        this.location = location;
        this.eventName = eventName;
    }
}

export default Event;