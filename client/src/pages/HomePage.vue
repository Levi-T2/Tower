<template>
 <div class="container-fluid bg-img">
  <section class="row">
    <div class="col-12 p-5 text-center">
      <p>All your needs for tickets and events in one place!</p>
    </div>
  </section>
  <section class="row justify-content-center align-items-center">
    <div class="col-12 col-md-3 bg-dark rounded-pill p-2 m-1 d-flex justify-content-center border-style">
      <button data-bs-toggle="modal" data-bs-target="#eventForm" class="btn btn-primary rounded-pill w-100">Create Event</button>
    </div>
    <div class="col-12 col-md-10">
      <div class="bg-dark rounded-pill p-1 m-1 d-flex border-style">
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
    components: { EventCard }
}
</script>

<style scoped lang="scss">

.event-card-style {
  box-shadow: 2px 2px 5px 3px rgb(99, 99, 99);
  border-radius: 5px;
  color: white;
  background-color: rgb(4, 10, 31);
  transition: ease-in-out 0.25s;
}

.event-card-style:hover {
  box-shadow: 2px 2px 9px 7px orange;
}

.border-style{
  border: 4px ridge whitesmoke;
}

.bg-img{
  background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvBxpjDdSd3b5KnZKMNvbGnWDShOxELyEsf8XhGRVRLhT5CO5pn3EmNe3wZbdrMSmeReQ&usqp=CAU);
  background-position: center;
  background-size: cover;
}

</style>
