import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketService } from "../services/TicketService.js";

export class TicketController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .get('/:ticketId', this.getTicketById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
            .delete('/:ticketId', this.destroyTicket)
    }

    async getTicketById(request, response, next) {
        try {
            const ticketId = request.params.ticketId
            const ticket = await ticketService.getTicketById(ticketId)
            return response.send(ticket)
        } catch (error) {
            next(error)
        }
    }
    async createTicket(request, response, next) {
        try {
            const ticketData = request.body
            const userId = request.userInfo.id
            ticketData.accountId = userId
            const ticket = await ticketService.createTicket(ticketData)
            return response.send(ticket)
        } catch (error) {
            next(error)
        }
    }
    async destroyTicket(request, response, next) {
        try {
            const ticketId = request.params.ticketId
            const userId = request.userInfo.id
            const destroyedTicket = await ticketService.destroyTicket(ticketId, userId)
            return response.send(destroyedTicket)
        } catch (error) {
            next(error)
        }
    }
}