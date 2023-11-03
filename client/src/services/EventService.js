import { AppState } from "../AppState"
import { Event } from "../models/Event"
import { Ticket } from "../models/Ticket"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class EventService {
    async getEvents() {
        const res = await api.get('api/events')
        // logger.log(res.data)
        const newEvents = res.data.map((events) => new Event(events))
        AppState.events = newEvents
        // logger.log(AppState.events)
    }
    async getEventById(eventId) {
        const res = await api.get(`api/events/${eventId}`)
        // logger.log(res.data)
        AppState.activeEvent = new Event(res.data)
    }
    async getTicketsForEvent(eventId) {
        const res = await api.get(`api/events/${eventId}/tickets`)
        logger.log(res.data)
        const ticketHolders = res.data.map((ticket) => new Ticket(ticket))
        AppState.ticketHolders = ticketHolders
        logger.log(AppState.ticketHolders)
    }
    async createEvent(formData) {
        const res = await api.post('api/events', formData)
        const newEvent = new Event(res.data)
        AppState.events.push(newEvent)
        return newEvent
    }
    async cancelEvent(eventId) {
        const res = await api.delete(`api/events/${eventId}`)
        logger.log(res.data)
        AppState.events = AppState.events.filter(
            (event) => event.id != eventId
        );
        Pop.toast(`The Event Was Successfully Cancelled`)
    }
    clearAppState() {
        AppState.activeEvent = null
        AppState.ticketHolders = []
        AppState.comments = []
    }
}

export const eventService = new EventService()