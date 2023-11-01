import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { towerService } from "./TowerService.js"

class TicketService {
    async getTicketById(ticketId) {
        const ticket = await dbContext.Tickets.findById(ticketId).populate('profile', 'name picture')
        if (!ticket) {
            throw new BadRequest(`Couldn't find a ticket with the id that was supplied: ${ticketId}`)
        }
        return ticket
    }
    async getTicketsByEventId(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId: eventId }).populate('profile', 'name picture')
        return tickets
    }
    async getTicketsForUser(userId) {
        const tickets = await dbContext.Tickets.find({ accountId: userId })
            .populate({
                path: 'event',
                populate: {
                    path: 'ticketCount'
                }
            })
        return tickets
    }
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
    async destroyTicket(ticketId, userId) {
        const ticketToBeDeleted = await this.getTicketById(ticketId)
        if (userId != ticketToBeDeleted.accountId.toString()) {
            throw new Forbidden(`You lack the authorization to delete this ticket: ${ticketId}`)
        }
        await ticketToBeDeleted.remove()
        return `The ticket was deleted from the database`
    }

}

export const ticketService = new TicketService()