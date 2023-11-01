<template>
 <div class="container-fluid">
  <section class="row">
    <div class="col-12">
      <p>All your needs for tickets and events in one place!</p>
    </div>
  </section>
  <section class="row">
    <div class="col-12">
      <div>
        <p>PlaceHolder for navigation bar based on type</p>
      </div>
    </div>
  </section>
  <section class="row justify-content-center align-items-center">
    <div v-for="event in events" :key="event.id" class="col-12 col-md-2 m-3 p-1 bg-dark rounded">
   <EventCard :event="event"></EventCard>
    </div>
  </section>
 </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop';
import { eventService } from '../services/EventService';
import { AppState } from "../AppState";
import EventCard from '../components/EventCard.vue';

export default {
    setup() {
        onMounted(() => {
            getEvents();
        });
        async function getEvents() {
            try {
                await eventService.getEvents();
            }
            catch (error) {
                Pop.error(error);
            }
        }
        return {
            events: computed(() => AppState.events)
        };
    },
    components: { EventCard }
}
</script>

<style scoped lang="scss">
</style>
