import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class TicketService {
    async buyTicket(eventId) {
         const ticketData = { eventId: eventId}
       const res = await api.post('api/tickets', ticketData)
       logger.log(res.data)
       const newTicketHolder = new Ticket(res.data)
       AppState.ticketHolders.push(newTicketHolder)
       AppState.activeEvent.ticketCount++
       Pop.toast('You got a ticket for this event!')
    }
async refundTicket(ticketId) {
    const res = await api.delete(`api/tickets/${ticketId}`)
    logger.log(res.data)
    AppState.myTickets = AppState.myTickets.filter(
        (ticket) => ticket.id != ticketId
    );
}
}

export const ticketService = new TicketService()