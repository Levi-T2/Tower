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
}

export const commentService = new CommentService()