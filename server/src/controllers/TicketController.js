import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketService } from "../services/TicketService.js";

export class TicketController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
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
}