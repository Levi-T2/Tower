import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentService } from "../services/CommentService.js";

export class CommentController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .get('/:commentId', this.getCommentById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
            .delete('/:commentId', this.destroyComment)
    }
    async getCommentById(request, response, next) {
        try {
            const commentId = request.params.commentId
            const comment = await commentService.getCommentById(commentId)
            return response.send(comment)
        } catch (error) {
            next(error)
        }
    }
    async createComment(request, response, next) {
        try {
            const commentData = request.body
            const userId = request.userInfo.id
            commentData.creatorId = userId
            const comment = await commentService.createComment(commentData)
            return response.send(comment)
        } catch (error) {
            next(error)
        }
    }
    async destroyComment(request, response, next) {
        try {
            const commentId = request.params.commentId
            const userId = request.userInfo.id
            const deletedComment = await commentService.destroyComment(commentId, userId)
            return response.send(deletedComment)
        } catch (error) {
            next(error)
        }
    }
}