<template>
    <RouterLink class="text-light" :to="{ name: 'EventDetails', params: { eventId: event.id }}">
        <img :src="event.coverImg" alt="Event Image" class="img-fluid rounded">
           <div>
             <p>{{ event.name }}</p>
             <p>{{ event.location }}</p>
             <p>{{ event.startDate.toLocaleDateString() }}</p>
             <p>Tickets Left: {{ event.capacity }}</p>
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
        return {};
    },
    components: { RouterLink }
};
</script>


<style lang="scss" scoped>

</style>