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
    <br>
    <router-link :to="scriptGenieLink">Script Genie</router-link>
  </header>
  <router-view/>
</template>

<script>
import LoginModal from './components/LoginModal.vue';
import { mapGetters } from 'vuex'; // Import mapGetters from Vuex

export default {
  data() {
    return {
      showLoginModal: false,
      currentModalComponent: null,
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated']), // Map isAuthenticated getter from Vuex store
    loggedIn() {
      return this.isAuthenticated; // Use isAuthenticated getter to determine authentication status
    },
    scriptGenieLink() {
      return this.loggedIn ? '/script-genie-w-account' : '/script-genie-wo-account'; // Dynamically set Script Genie link based on authentication status
    }
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
