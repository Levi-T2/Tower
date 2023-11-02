<template>
     <div class="p-2">
                <img :src="comment.creator.picture" alt="Comment Picture" class="img-fluid rounded-circle" >
            </div>
            <div class="p-2">
                <p>{{ comment.creator.name }}</p>
                <p>{{ comment.body }}</p>
                <p>Commented At: {{ comment.createdAt.toLocaleDateString() }}</p>
            </div>
</template>


<script>
import { Comment } from '../models/Comment';


export default {
    props: {
        comment: { type: Comment, required: true }
    },
    setup(){
    return {  }
    }
};
</script>


<style lang="scss" scoped>



</style>