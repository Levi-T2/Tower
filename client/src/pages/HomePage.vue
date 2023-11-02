<template>
 <div class="container-fluid">
  <section class="row">
    <div class="col-12 p-5 text-center">
      <p>All your needs for tickets and events in one place!</p>
    </div>
  </section>
  <section class="row justify-content-center align-items-center">
    <div class="col-12 col-md-3 bg-dark rounded-pill p-2 m-1 d-flex justify-content-center">
      <button data-bs-toggle="modal" data-bs-target="#eventForm" class="btn btn-primary rounded-pill w-100">Create Event</button>
    </div>
    <div class="col-12 col-md-10">
      <div class="bg-dark rounded-pill p-1 m-1 d-flex">
        <button class="btn btn-secondary w-100 m-2 rounded-pill">All</button>
        <button 
        v-for="type in types" 
        :key="type" 
        class="btn btn-secondary w-100 m-2 rounded-pill">{{ type }}</button>
      </div>
    </div>
  </section>
  <section class="row justify-content-center align-items-center">
    <div v-for="event in events" :key="event.id" class="col-12 col-md-2 m-3 p-1 bg-dark rounded">
   <EventCard :event="event"></EventCard>
    </div>
  </section>
 </div>
 <EventFormModal></EventFormModal>
</template>

<script>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop';
import { eventService } from '../services/EventService';
import { AppState } from "../AppState";
import EventCard from '../components/EventCard.vue';

export default {
    setup() {
      const types = ['Concert', 'Convention', 'Sport', 'Digital']
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
          types,
            events: computed(() => AppState.events)
        };
    },
    components: { EventCard }
}
</script>

<style scoped lang="scss">
</style>
