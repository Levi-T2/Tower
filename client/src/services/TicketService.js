import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class TicketService {
    async buyTicket(eventId) {
        logger.log(eventId)
       const res = await api.post('api/tickets', eventId)
       logger.log(res.data)
       const newTicketHolder = new Ticket(res.data)
       AppState.ticketHolders = newTicketHolder
       Pop.toast('You got a ticket for this event!')
    }
}

export const ticketService = new TicketService()