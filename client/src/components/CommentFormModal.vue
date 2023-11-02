<template>
<div class="modal fade" id="commentForm" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
        <form @submit.prevent="createComment()">
            <div>
                <label for="commentBody" class="form-label">Comment Body</label>
                <input v-model="editable.body" type="text" class="form-control" id="commentBody">
            </div>
            <div class="mt-3 text-end">
                <button class="btn btn-success" type="submit">Create Comment</button>
            </div>
        </form>
      </div>
      <div class="modal-footer">
      </div>
    </div>
  </div>
</div>

</template>


<script>
import { ref } from 'vue';
import Pop from '../utils/Pop';
import { commentService } from '../services/CommentService';
import { Modal } from 'bootstrap';
import { useRoute } from 'vue-router';


export default {
    setup(){
        const route = useRoute();
        const editable = ref({})
    return { 
        editable,
        route,
        async createComment() {
            try {
                const eventId = route.params.eventId
                const formData = editable.value
                formData.eventId = eventId
                await commentService.createComment(formData)
                Modal.getOrCreateInstance('#commentForm').hide()
            } catch (error) {
                Pop.error
            }
        }
     }
    }
};
</script>


<style lang="scss" scoped>

</style>