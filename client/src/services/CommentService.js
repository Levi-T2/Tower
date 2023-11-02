import { api } from "./AxiosService"
import { logger } from "../utils/Logger"
import { Comment } from "../models/Comment"
import { AppState } from "../AppState"
class CommentService {
    async getCommentsByEventId(eventId) {
        const res = await api.get(`api/events/${eventId}/comments`)
        // logger.log(res.data)
        const newComments = res.data.map((comments) => new Comment(comments))
        AppState.comments = newComments
        logger.log(AppState.comments)
    }
    async createComment(formData) {
        const res = await api.post('api/comments', formData)
        logger.log(res.data)
        const newComment = new Comment(res.data)
        AppState.comments.push(newComment)
    }
    async deleteComment(commentId) {
        const res = await api.delete(`api/comments/${commentId}`)
        logger.log(res.data)
        AppState.comments = AppState.comments.filter(
            (comment) => comment.id != commentId
        );
    }
}

export const commentService = new CommentService()