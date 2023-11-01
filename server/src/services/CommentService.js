import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CommentService {
    async createComment(commentData) {
        const event = await dbContext.Comments.create(commentData)
        await event.populate('creator', 'name picture')
        return event
    }
    async getCommentById(commentId) {
        const comment = await dbContext.Comments.findById(commentId).populate('creator', 'name picture')
        if (!comment) {
            throw new BadRequest(`Couldn't find the comment with the Id supplied: ${commentId}`)
        }
        return comment
    }
    async getCommentsByEventId(eventId) {
        const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator', 'name picture')
        return comments
    }
    async destroyComment(commentId, userId) {
        const commentToBeDeleted = await this.getCommentById(commentId)
        if (userId != commentToBeDeleted.creatorId.toString()) {
            throw new Forbidden(`You lack the authorization to delete this comment: ${commentId}`)
        }
        await commentToBeDeleted.remove()
        return `The comment was deleted from the Database`
    }

}

export const commentService = new CommentService()