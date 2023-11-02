<template>
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

</style>