<template>
   <div class="container-fluid">
    <section v-if="event" class="row justify-content-center">
        <div class="col-11 d-flex bg-dark m-2 p-3 event-card">
       <EventDetailsCard :event="event"></EventDetailsCard>
        </div>
    </section>
    <section class="row justify-content-center align-items-center">
        <div v-for="ticketHolder in ticketHolders" :key="ticketHolder.id" class="col-12 col-md-9 bg-dark ticket-holders">
       <TicketHolders :ticketHolder="ticketHolder"></TicketHolders>
        </div>
    </section>
    <section class="row justify-content-center align-items-center">
        <div v-for="comment in comments" :key="comment.id" class="col-12 col-md-9 bg-dark mt-3 p-2 d-flex align-items-center comment-section">
           <CommentCard :comment="comment"></CommentCard>
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
import EventDetailsCard from '../components/EventDetailsCard.vue';
import TicketHolders from '../components/TicketHolders.vue';
import { commentService } from '../services/CommentService';
import CommentCard from '../components/CommentCard.vue';


export default {
    setup() {
        const route = useRoute();
        onMounted(() => [
            clearAppState(),
            getEventById(),
            getTicketsForEvent(),
            getCommentsByEventId()
        ]);
        async function getEventById() {
            try {
                const eventId = route.params.eventId;
                await eventService.getEventById(eventId);
            }
            catch (error) {
                Pop.error(error);
            }
        }
        function clearAppState() {
            try {
                eventService.clearAppState();
            }
            catch (error) {
                Pop.error(error);
            }
        }
        async function getTicketsForEvent() {
            try {
                const eventId = route.params.eventId
                await eventService.getTicketsForEvent(eventId)
            } catch (error) {
                Pop.error(error)
            }
        }
        async function getCommentsByEventId() {
            try {
                const eventId = route.params.eventId
                await commentService.getCommentsByEventId(eventId)
            } catch (error) {
                Pop.error(error)
            }
        }
        return {
            route,
            event: computed(() => AppState.activeEvent),
            ticketHolders: computed(() => AppState.ticketHolders),
            comments: computed(() => AppState.comments)
        };
    },
    components: { EventDetailsCard, TicketHolders, CommentCard }
};
</script>


<style lang="scss" scoped>



.event-card{
    border-radius: 5px;
    border: 3px solid rgb(223, 223, 4) ;
}

.ticket-holders {
    padding: 1rem;
    border-radius: 6px;
    border:3px solid rgb(223, 223, 4) ;
}

.comment-section {
    padding: 1rem;
    border-radius: 6px;
    border:3px solid rgb(223, 223, 4) ;
}


</style>