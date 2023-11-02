<template>
    <div>
        <img :src="event.coverImg" alt="Event Image" class="event-img">
        <div class="p-4">
            <p class="fw-bold mb-0">{{ event.name }}</p>
            <p class="text-end">{{ event.startDate.toLocaleDateString() }}</p>
            <p>{{ event.location }}</p>
            <p>{{ event.description }}</p>
            <p>{{ event.capacity }} Spots Left</p>
            <div v-if="event.isCanceled == true" class="text-end">
                <button class="btn btn-info rounded-pill">Event is cancelled, no ticket</button>
            </div>
            <div v-else class="text-end">
                <button @click="buyTicket(event.id)" class="btn btn-success rounded-pill">Buy Ticket</button>
            </div>
        </div>
    </div>
    <div v-if="event.creator.id == account.id" class="p-1 text-center">
         <button @click="cancelEvent()" class="btn btn-danger">Cancel Event</button>
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
import { logger } from '../utils/Logger';


export default {
    props: {
        event: { type: Event, required: true}
    },
    setup(){
        const route = useRoute()
    return { 
        route,
        account: computed(() => AppState.account),
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
        async buyTicket(eventId) {
                try {
                    const yes = await Pop.confirm(`Are you sure you want to buy a ticket for this event?`)
                    if(!yes) {
                        return
                    }
                    debugger
                    await ticketService.buyTicket(eventId)
                } catch (error) {
                    Pop.error(error)
                }
            }
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
</style>