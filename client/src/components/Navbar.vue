<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-img px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="fs-3 tower-font">
        <p class="mb-0">
          <i class="mdi mdi-chess-rook"></i>
          Tower
        </p>
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import Login from './Login.vue';
export default {
  setup() {
    return {}
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}

.bg-img{
  background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvBxpjDdSd3b5KnZKMNvbGnWDShOxELyEsf8XhGRVRLhT5CO5pn3EmNe3wZbdrMSmeReQ&usqp=CAU);
  background-position: center;
  background-size: cover;
  border-bottom: 4px ridge whitesmoke;
}

.tower{
  background-image: url(https://www.figma.com/file/5x3vQisCZxtxeQz9xPEyFM/Tower?type=design&node-id=2-21&mode=design&t=S6s5tE4T67LwWW7H-4);
}

.tower-font{
  font-family: 'MedievalSharp', cursive;
}
</style>
