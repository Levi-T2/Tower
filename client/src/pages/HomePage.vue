<template>
 <div class="container-fluid">
  <section class="row">
    <div class="col-12 p-5 text-center">
      <p>All your needs for tickets and events in one place!</p>
    </div>
  </section>
  <section class="row justify-content-center align-items-center">
    <TypeBar></TypeBar>
  </section>
  <section class="row justify-content-center align-items-center m-0">
    <div v-for="event in events" :key="event.id" class="col-12 col-md-3 m-4 p-1 event-card-style">
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
import TypeBar from '../components/TypeBar.vue';

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
    components: { EventCard, TypeBar }
}
</script>

<style scoped lang="scss">

.event-card-style {
  box-shadow: 2px 2px 6px 4px rgb(99, 99, 99);
  border-radius: 5px;
  color: white;
  background-color: rgb(4, 10, 31);
}

.event-card-style:hover {
  box-shadow: 2px 2px 8px 6px blueviolet;
}

</style>
