<template>
   This is the event details page
</template>


<script>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop';
import { eventService } from '../services/EventService';


export default {
    setup(){
        const route = useRoute()
        onMounted(() => [
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
    return { 
        route,
     }
    }
};
</script>


<style lang="scss" scoped>

</style>