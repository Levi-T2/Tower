<template>
    <div>
        <p>{{ ticket.event.name }}</p>
          <p>{{ ticket.event.location }}</p>
          <p>{{ new Date(ticket.event.startDate).toLocaleDateString() }}</p>
    </div>
    <div>
        <img :src="ticket.event.coverImg" class="img-fluid rounded">
    </div>
    <div class="text-center my-3">
        <button @click="refundTicket(ticket.id)" class="btn btn-danger"> Refund Ticket
            <i class="mdi mdi-cash"></i>
        </button>
    </div>
</template>


<script>
import { Ticket } from '../models/Ticket';
import { ticketService } from '../services/TicketService';
import Pop from '../utils/Pop';


export default {
    props: {
        ticket: { type: Ticket, required:true}
    },
    setup(){
    return { 
        async refundTicket(ticketId) {
            try {
                const yes = await Pop.confirm(`Are you sure you want to refund your ticket?`)
                if(!yes) {
                    return
                }
                await ticketService.refundTicket(ticketId)
            } catch (error) {
                Pop.error(error)
            }
        }
     }
    }
};
</script>


<style lang="scss" scoped>

</style>