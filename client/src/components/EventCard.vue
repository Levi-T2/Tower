<template>
    <RouterLink class="text-light" :to="{ name: 'EventDetails', params: { eventId: event.id }}">
        <div class="text-center">
            <img :src="event.coverImg" alt="Event Image" class="event-img rounded my-4">
        </div>
           <div class="p-2">
             <p>{{ event.name }}</p>
             <p>{{ event.location }}</p>
             <p>{{ event.startDate.toLocaleDateString() }}</p>
             <p>Tickets Left: {{ event.capacity }}</p>
             <marquee v-if="event.isCanceled == true" class="bg-danger rounded p-1">This event has been canceled 😥</marquee>
           </div>
    </RouterLink>
</template>


<script>
import { RouterLink } from 'vue-router';
import { Event } from '../models/Event';


export default {
    props: {
        event: { type: Event, required: true }
    },
    setup() {
        return {
        };
    },
    components: { RouterLink }
};
</script>


<style lang="scss" scoped>

.event-img{
    height: 15rem;
    width: 15rem;
    background-position: center;
    object-fit: cover;
}

</style>