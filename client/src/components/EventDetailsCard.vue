<template>
    <div>
        <p v-if="(event.capacity - event.ticketCount) <= 0" class="mb-0 text-center fs-2 tower-font text-danger">Sold Out</p>
        <div v-if="event.creator.id == account.id" class="p-1 text-end">
             <button v-if="event.isCanceled == false" @click="cancelEvent()" class="btn btn-danger">Cancel Event</button>

            </div>
            <div class="text-center">
                <img :src="event.coverImg" alt="Event Image" class="event-img">
            </div>
        <div class="p-4">
            <p class="fw-bold mb-0">{{ event.name }}</p>
            <p class="text-end">{{ event.startDate.toLocaleDateString() }}</p>
            <p>{{ event.location }}</p>
            <p>{{ event.description }}</p>
            <p>{{ event.capacity - event.ticketCount }} Spots Left</p>
            <div v-if="(event.capacity - event.ticketCount) <= 0" class="text-end">
                <p class="text-danger fw-bold rounded-pill mb-0">Event is Sold Out 😔</p>
            </div>
            <div v-else-if="event.isCanceled == true" class="text-end">
                <p class="text-danger fw-bold rounded-pill mb-0">Event is cancelled</p>
            </div>
            <div v-else class="text-end">
                <button @click="buyTicket()"  class="btn btn-success rounded-pill">Buy Ticket</button>
                <p v-if="isTicketHolder" class="text-success mt-4">You have a ticket for this Event</p>
            </div>
        </div>
    </div>
</template>


<script>
import { computed } from 'vue';
import { Event } from '../models/Event';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { eventService } from '../services/EventService';
import { useRoute } from 'vue-router';
import { ticketService } from '../services/TicketService'


export default {
    props: {
        event: { type: Event, required: true},
    },
    setup(){
        const route = useRoute()
    return { 
        route,
        account: computed(() => AppState.account),
        isTicketHolder: computed(() => 
        AppState.ticketHolders.find (
            (ticketHolder) => ticketHolder.profile.id == AppState.account.id
        )),
        async cancelEvent() {
            try {
                const yes = await Pop.confirm(`Are sure you want to cancel this event? This can't be undone.`)
                if(!yes) {
                    return
                }
                const eventId = route.params.eventId
                await eventService.cancelEvent(eventId)
            } catch (error) {
                Pop.error(error)
            }
        },
        async buyTicket() {
                try {
                    const yes = await Pop.confirm(`Are you sure you want to buy a ticket for this event?`)
                    if(!yes) {
                        return
                    }
                  
                    const eventId = route.params.eventId
                    await ticketService.buyTicket(eventId)
                } catch (error) {
                    Pop.error(error)
                }
            },
     }
    }
};
</script>


<style lang="scss" scoped>
.event-img{
    height: 40dvh;
    background-position: center;
    object-fit: cover;
    border-radius: 5px;
}


@media (max-width: 768px) {
    .event-img{
    height: 24dvh;
    background-position: center;
    object-fit: cover;
    border-radius: 5px;
}
}
</style>