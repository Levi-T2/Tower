<template>
<div class="container-fluid bg-img">
  <section class="row justify-content-center">
    <div class="col-12 col-md-3 account-style p-2 m-4 text-center">
     <AccountDetails :account="account"></AccountDetails>
    </div>
  </section>
  <section class="row justify-content-center align-items-center">
    <div class="col-12 col-md-4 account-style">
      <p class="text-center fw-bold p-3">My Tickets</p>
    </div>
  </section>
  <section class="row justify-content-center">
    <div v-for="ticket in myTickets" :key="ticket.id" class="col-12 col-md-3 ticket-style g-2 m-2 p-2">
      <TicketCard :ticket="ticket"></TicketCard>
    </div>
  </section>
</div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import AccountDetails from '../components/AccountDetails.vue';
import TicketCard from '../components/TicketCard.vue';
export default {
    setup() {
        return {
            account: computed(() => AppState.account),
            myTickets: computed(() => AppState.myTickets)
        };
    },
    components: { AccountDetails, TicketCard }
}
</script>

<style scoped>
.img-account {
  max-width: 110px;
}

.account-style{
  background-color:rgb(4, 10, 31);
  border-radius: 5px;
  color: white;
  border: 5px ridge whitesmoke;
}

.ticket-style{
  background-color:rgb(4, 10, 31);
  border-radius: 9px;
  border: 4px ridge whitesmoke;
  color: white;
  transition: ease-in-out 0.25s;
}

.ticket-style:hover{
  border: 4px ridge blueviolet
}

.bg-img{
  background-image: url(https://www.pixground.com/wp-content/uploads/2023/02/Serene-Forest-Fog-Nature-Scenery-.jpg);
  backdrop-filter: blur(3px);
}
</style>
