<template>
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
</template>


<script>
export default {
    setup(){
        const types = ['Concert', 'Convention', 'Sport', 'Digital']
    return { 
        types,
     }
    }
};
</script>


<style lang="scss" scoped>

</style>