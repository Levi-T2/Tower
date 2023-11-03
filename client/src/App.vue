<template>
  <header class="sticky-top">
    <Navbar />
  </header>
  <main class="bg-img">
    <router-view/>
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}

.bg-img{
  background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvBxpjDdSd3b5KnZKMNvbGnWDShOxELyEsf8XhGRVRLhT5CO5pn3EmNe3wZbdrMSmeReQ&usqp=CAU);
  background-position: center;
  background-size: cover;
}

.tower-font{
  font-family: 'MedievalSharp', cursive;
}
</style>
