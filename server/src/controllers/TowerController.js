import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerService } from "../services/TowerService.js";
import BaseController from "../utils/BaseController.js";

export class TowerController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getEvents)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
    }

    async getEvents(request, response, next) {
        try {
            const events = await towerService.getEvents()
            return response.send(events)
        } catch (error) {
            next(error)
        }
    }
    async createEvent(request, response, next) {
        try {
            const eventData = request.body
            const userId = request.userInfo.id
            eventData.creatorId = userId
            const event = await towerService.createEvent(eventData)
            return response.send(event)
        } catch (error) {
            next(error)
        }
    }
}