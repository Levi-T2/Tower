<template>
    <div role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <img :src="ticketHolder.profile.picture" alt="Ticket Holder Profile Image" :title="ticketHolder.profile.name"
        class="img-fluid rounded-circle">
    </div>
    <ul class="dropdown-menu text-center p-2 bg-dark">
      <p class="dropdown-item text-light mb-0">Ticket Holder Name: {{ ticketHolder.profile.name }}</p>
    </ul>
</template>


<script>
import { Ticket } from '../models/Ticket';


export default {
    props: {
        ticketHolder: { type: Ticket, required: true}
    },
    setup(){
    return {  }
    }
};
</script>


<style lang="scss" scoped>

</style>