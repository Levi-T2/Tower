<template>
 <p class="fw-bold ticket-txt text-center p-1">Ticket Holders</p>
        <img :src="ticketHolder.profile.picture" alt="Ticket Holder Profile Image" :title="ticketHolder.profile.name"
        class="img-fluid rounded-circle">
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

.ticket-txt {
    border-bottom: 2px solid white;
}
</style>