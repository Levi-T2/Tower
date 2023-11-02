<template>
   <div class="modal fade" id="eventForm" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Event Details</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="createEvent()">
            <div class="mb-3">
                <label for="eventName" class="form-label">Name</label>
                <input v-model="editable.name" type="text" class="form-control" id="eventName" required="true">
            </div>
            <div class="mb-3">
                <label for="eventLocation" class="form-label">Location</label>
                <input v-model="editable.location" type="text" class="form-control" id="eventLocation" required="true">
            </div>
            <div class="mb-3">
             <select v-model="editable.type" class="form-select" aria-label="Default select example" required="true">
                <option v-for="type in types" 
                :key="type" :value="type">
                {{ type }}</option></select>

            </div>
            <div class="mb-3">
                <label for="eventDate" class="form-label">Event Date</label>
                <input v-model="editable.startDate" type="date" class="form-control" id="eventDate" required="true">
            </div>
            <div class="mb-3">
                <label for="eventCapacity" class="form-label">Event Capacity</label>
                <input v-model="editable.capacity" type="number" class="form-control" id="eventCapacity" min="1" max="1000" required="true">
            </div>
            <div class="mb-3">
                <label for="eventImg" class="form-label">Cover Img</label>
                <input v-model="editable.coverImg" type="url" class="form-control" id="eventImg" required="true">
            </div>
            <div class="mb-3">
                <label for="eventDesc" class="form-label">Description</label>
                <textarea v-model="editable.description" type="text" class="form-control" id="eventDesc" required="true"></textarea>
            </div>
            <div class="text-end">
                <button type="submit" class="btn btn-success">Create Event</button>
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
import { eventService } from '../services/EventService';
import { Modal } from 'bootstrap';


export default {
    setup(){
        const editable = ref({})
    return { 
        editable,
         types: ['concert', 'convention', 'sport', 'digital'],
         async createEvent() {
            try {
                const formData = editable.value
                await eventService.createEvent(formData)
                Modal.getOrCreateInstance('#eventForm').hide()
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