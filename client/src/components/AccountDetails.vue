<template>
  <img :src="account.picture" alt="Account Picture" :title="account.name" class="img-account my-2">
      <p>Username: {{ account.name }}</p>
      <p>Email: {{ account.email }}</p>
</template>


<script>
import { Account } from '../models/Account';


export default {
    props: {
        account: { type: Account, required: true }
    },
    setup(){
    return {  }
    }
};
</script>


<style lang="scss" scoped>

</style>