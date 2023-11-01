
export class Event {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.location = data.location
        this.ticketCount = data.ticketCount
        this.type = data.type
        this.coverImg = data.coverImg
        this.capacity = data.capacity
        this.startDate = new Date(data.startDate)
        this.description = data.description
        this.creator = data.creator
        this.isCanceled = data.isCanceled
    }
}