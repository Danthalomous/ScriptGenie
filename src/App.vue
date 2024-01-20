<!-- App.vue -->
<template>
  <header>
    <h1 align="center">[TITLE]</h1>
    <div align="center" id="nav">
      <router-link to="/">home</router-link> |
      <router-link v-if="loggedIn" to="/profile"> profile</router-link> |
      <router-link to="/about"> about</router-link> |
      <div @click="toggleModal">login/register</div>
      <component :is="currentModalComponent" @close="closeModal" :is-visible="showLoginModal" />
    </div>
    <router-view/>
  </header>
</template>


<script>
import LoginModal from './components/LoginModal.vue';

export default {
  data() {
    return {
      showLoginModal: false,
      loggedIn: true, // You can replace this with your actual authentication check
      currentModalComponent: null,
    };
  },
  methods: {
    toggleModal() {
      console.log("Toggle modal called");
      this.showLoginModal = !this.showLoginModal;
      this.currentModalComponent = this.showLoginModal ? 'LoginModal' : null;
    },
    closeModal() {
      this.showLoginModal = false;
      this.currentModalComponent = null;
    },
  },
  components: {
    LoginModal,
  },
};
</script>

<style>
/* Your global styles here */
</style>
