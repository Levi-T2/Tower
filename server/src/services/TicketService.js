import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { towerService } from "./TowerService.js"

class TicketService {
    async createTicket(ticketData) {
        const event = await towerService.getEventById(ticketData.eventId)
        if (event.isCanceled == true) {
            throw new Forbidden(`This Event Has Been Cancelled And Can No Longer Be Interfaced With: ${event}`)
        }

        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('profile', 'name picture')
        await ticket.populate('event')
        return ticket
    }

}

export const ticketService = new TicketService()