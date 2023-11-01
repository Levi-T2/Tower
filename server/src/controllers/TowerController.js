import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerService } from "../services/TowerService.js";
import BaseController from "../utils/BaseController.js";
import { commentService } from "../services/CommentService.js";

export class TowerController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getEvents)
            .get('/:eventId', this.getEventById)
            .get('/:eventId/comments', this.getCommentsByEventId)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:eventId', this.editEvent)
            .delete('/:eventId', this.cancelEvent)
    }

    async getEvents(request, response, next) {
        try {
            const events = await towerService.getEvents()
            return response.send(events)
        } catch (error) {
            next(error)
        }
    }
    async getEventById(request, response, next) {
        try {
            const eventId = request.params.eventId
            const event = await towerService.getEventById(eventId)
            return response.send(event)
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
    async cancelEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const userId = request.userInfo.id
            const event = await towerService.cancelEvent(eventId, userId)
            return response.send(event)
        } catch (error) {
            next(error)
        }
    }
    async editEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const userId = request.userInfo.id
            const eventData = request.body
            const updatedEvent = await towerService.editEvent(eventId, userId, eventData)
            return response.send(updatedEvent)
        } catch (error) {
            next(error)
        }
    }
    async getCommentsByEventId(request, response, next) {
        try {
            const eventId = request.params.eventId
            const comments = await commentService.getCommentsByEventId(eventId)
            return response.send(comments)
        } catch (error) {
            next(error)
        }

    }
}