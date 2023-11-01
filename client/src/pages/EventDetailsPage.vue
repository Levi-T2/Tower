<template>
   <div class="container-fluid">
    <section v-if="event" class="row justify-content-center">
        <div class="col-11 d-flex bg-dark m-2 p-3 event-card">
            <img :src="event.coverImg" alt="Event Image" class="event-img">
            <div class="p-4">
                <p class="fw-bold mb-0">{{ event.name }}</p>
                <p class="text-end">{{ event.startDate.toLocaleDateString() }}</p>
                <p>{{ event.location }}</p>
                <p>{{ event.description }}</p>
                <p>{{ event.capacity }} Spots Left</p>
                <div class="text-end">
                    <button class="btn btn-success rounded-pill">Buy Ticket</button>
                </div>
            </div>
        </div>
    </section>
    <section class="row">
        <div class="col-12">
            <p>PlaceHolder for people attending this event</p>
        </div>
    </section>
    <section class="row">
        <div class="col-12">
            <p>Place holder for the comment section with a comment form</p>
        </div>
    </section>
   </div>
</template>


<script>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop';
import { eventService } from '../services/EventService';
import { AppState } from "../AppState";


export default {
    setup(){
        const route = useRoute()
        onMounted(() => [
            clearAppState(),
            getEventById()
        ]);
        async function getEventById() {
            try {
                const eventId = route.params.eventId
                await eventService.getEventById(eventId)
            } catch (error) {
                Pop.error(error)
            }
        }   
       function clearAppState() {
        try {
            eventService.clearAppState()
        } catch (error) {
            Pop.error(error)
        }
        }
    return { 
        route,
        event: computed(() => AppState.activeEvent)
     }
    }
};
</script>


<style lang="scss" scoped>

.event-img{
    width: 55dvh;
    background-position: center;
    object-fit: cover;
    border-radius: 5px;
}

.event-card{
    border-radius: 5px;
    border: 3px solid rgb(223, 223, 4) ;
}
</style>