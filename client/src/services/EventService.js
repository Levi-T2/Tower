import { AppState } from "../AppState"
import { Event } from "../models/Event"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class EventService {
    async getEvents() {
        const res = await api.get('api/events')
        // logger.log(res.data)
        const newEvents = res.data.map((events) => new Event(events))
        AppState.events = newEvents
        logger.log(AppState.events)
    }
    async getEventById(eventId) {
        const res = await api.get(`api/events/${eventId}`)
        // logger.log(res.data)
        AppState.activeEvent = new Event(res.data)
    }
    clearAppState() {
        AppState.activeEvent = null
    }
}

export const eventService = new EventService()