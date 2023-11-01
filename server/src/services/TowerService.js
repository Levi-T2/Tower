import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TowerService {
    async getEvents() {
        const events = await dbContext.TowerEvents.find().populate('creator', 'name picture')
        return events
    }
    async getEventById(eventId) {
        const event = await dbContext.TowerEvents.findById(eventId).populate('creator', 'name picture')
        if (!event) {
            throw new BadRequest(`Couldn't find the event with the Id provided: ${eventId}`)
        }
        return event
    }
    async createEvent(eventData) {
        const event = await dbContext.TowerEvents.create(eventData)
        await event.populate('creator', 'name picture')
        return event
    }
    async cancelEvent(eventId, userId) {
        const event = await this.getEventById(eventId)
        if (userId != event.creatorId.toString()) {
            throw new Forbidden(`You lack the authorization to cancel this event: ${eventId}`)
        }
        event.isCanceled = !event.isCanceled
        await event.save()
        return event
    }
    async editEvent(eventId, userId, eventData) {
        const eventUpdating = await this.getEventById(eventId)
        if (userId != eventUpdating.creatorId.toString()) {
            throw new Forbidden(`You lack the authorization to edit this event: ${eventId}`)
        }

        eventUpdating.startDate = eventData.startDate || eventUpdating.startDate
        eventUpdating.name = eventData.name || eventUpdating.name
        eventUpdating.description = eventData.description || eventUpdating.description
        eventUpdating.type = eventData.type || eventUpdating.type
        eventUpdating.location = eventData.location || eventUpdating.location
        eventUpdating.coverImg = eventData.coverImg || eventUpdating.coverImg

        await eventUpdating.save()
        return eventUpdating
    }
}

export const towerService = new TowerService()