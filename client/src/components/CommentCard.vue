<template>
     <div class="p-2">
                <img :src="comment.creator.picture" alt="Comment Picture" class="img-fluid rounded-circle" >
            </div>
            <div class="p-2">
                <p>{{ comment.creator.name }}</p>
                <p>{{ comment.body }}</p>
                <p>Commented At: {{ comment.createdAt.toLocaleDateString() }}</p>
                <button v-if="comment.creator.id == account.id" @click="deleteComment(comment.id)"
                class="btn btn-danger"><i class="mdi mdi-delete"></i></button>
            </div>
</template>


<script>
import { computed } from 'vue';
import { Comment } from '../models/Comment';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { commentService } from '../services/CommentService';


export default {
    props: {
        comment: { type: Comment, required: true }
    },
    setup(){
    return { 
        account: computed(() => AppState.account),
        async deleteComment(commentId) {
            try {
                const yes = await Pop.confirm('Are you certain you want to delete your comment?')
                if(!yes) {
                    return
                }
                await commentService.deleteComment(commentId)
            } catch (error) {
                Pop.error(error)
            }
        }
     }
    }
};
</script>


<style lang="scss" scoped>



</style>