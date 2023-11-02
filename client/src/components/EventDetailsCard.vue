<template>
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
</template>


<script>
import { Event } from '../models/Event';


export default {
    props: {
        event: { type: Event, required: true}
    },
    setup(){
    return {  }
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