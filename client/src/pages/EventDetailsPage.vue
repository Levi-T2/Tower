<template>
   <div class="container-fluid">
    <section v-if="event" class="row justify-content-center">
        <div class="col-12 p-1">
            <marquee v-if="event.isCanceled == true" class="bg-danger rounded p-1">This event has been canceled 😥</marquee>
        </div>
        <div class="col-12 col-md-7 d-flex bg-dark m-2 p-3 event-card flex-column">
       <EventDetailsCard :event="event"></EventDetailsCard>
        </div>
    </section>
    <section v-if="ticketHolders" class="row justify-content-center align-items-center bg-dark ticket-holders m-2">
        <p class="fw-bold ticket-txt text-center p-1">Ticket Holders</p>
        <div v-for="ticketHolder in ticketHolders" :key="ticketHolder.id" class="col-12 col-md-1 d-flex p-2">
                <TicketHolders :ticketHolder="ticketHolder"></TicketHolders>
        </div>
    </section>
    <section class="row justify-content-center align-items-center bg-dark comment-section m-2">
        <div class="col-12 col-md-9 bg-dark">
            <button type="button" class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#commentForm">Comment</button>
        </div>
        <div v-for="comment in comments" :key="comment.id" class="col-12 col-md-9 bg-dark mt-3 p-2 d-flex align-items-center comment-border">
           <CommentCard :comment="comment"></CommentCard>
        </div>
    </section>
   </div>
   <CommentFormModal></CommentFormModal>
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
import CommentFormModal from '../components/CommentFormModal.vue';


export default {
    setup() {
        const route = useRoute();
        onMounted(() => [
            clearAppState(),
            getEventById(),
            getTicketsForEvent(),
            getCommentsByEventId(),
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
    components: { EventDetailsCard, TicketHolders, CommentCard, CommentFormModal }
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

.comment-border {
    border-bottom: 2px solid snow;
}

.ticket-txt {
    border-bottom: 2px solid white;
}


</style>