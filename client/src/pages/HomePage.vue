<template>
 <div class="container-fluid bg-img">
  <section class="row">
    <Banner></Banner>
  </section>
  <section class="row justify-content-center align-items-center">
    <div class="col-11 col-md-3 bg-dark rounded-pill p-2 m-1 d-flex justify-content-center border-style">
      <button data-bs-toggle="modal" data-bs-target="#eventForm" class="btn btn-primary rounded-pill w-100">Create Event</button>
    </div>
    <div class="col-12 col-md-10">
      <div class="p-2 m-1 type-selector border-style">
        <button @click="changeType('')" class="btn btn-secondary w-100 m-2 rounded-pill">All</button>
        <button @click="changeType(type)"
        v-for="type in types" 
        :key="type" 
        class="btn btn-secondary w-100 m-2 rounded-pill">{{ type }}</button>
      </div>
    </div>
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
import { computed, onMounted, ref } from 'vue';
import Pop from '../utils/Pop';
import { eventService } from '../services/EventService';
import { AppState } from "../AppState";
import EventCard from '../components/EventCard.vue';
import Banner from '../components/Banner.vue';

export default {
    setup() {
      const types = ['concert', 'convention', 'sport', 'digital']
      const filteredType = ref("")
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
          filteredType,
            events: computed(() => {
              if (filteredType.value) { 
                return AppState.events.filter(
                  (event) => event.type == filteredType.value
                );
              } else {
                return AppState.events
              }
            }),
            changeType(type) {
              filteredType.value = type
            },
            
        };
    },
    components: { EventCard, Banner }
}
</script>

<style scoped lang="scss">

.event-card-style {
  box-shadow: 2px 2px 4px 3px rgb(41, 41, 41);
  border-radius: 5px;
  color: white;
  background-color: rgba(4, 10, 31, 0.596);
  transition: ease-in-out 0.25s;
  border: 2px solid rgba(245, 245, 245, 0.226);
}

.event-card-style:hover {
  box-shadow: 2px 2px 9px 7px orange;
}

.border-style{
  border: 4px ridge whitesmoke;
}

.type-selector{
  display: flex;
  background-color: rgba(4, 10, 31, 0.596);
  border-radius: 50px;
}

@media (max-width: 768px) {
  .type-selector{
  display: flex;
  background-color: rgba(4, 10, 31, 0.596);
  border-radius: 20px;
  flex-direction: column;
  align-items: center;
}
}
</style>
