<template>
  <v-app>
    <v-app-bar app color="#646464" light fixed :elevation="5">
      <template v-slot:append>
        <v-app-bar-nav-icon class="mr-4" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer color="#646464" v-model="drawer" location="right">
      <v-list>
        <v-list-item v-for="link in filteredLinks" :key="link.to" link :to="link.to">
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer app color="#646464" fixed>
      <span>&copy; 2024 Script Genie</span>
    </v-footer>
    <router-view />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'; // Import mapGetters from Vuex

export default {
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated']), // Map isAuthenticated getter from Vuex store
    loggedIn() {
      return this.isAuthenticated; // Use isAuthenticated getter to determine authentication status
    },
    scriptGenieLink() {
      return this.loggedIn ? '/script-genie-w-account' : '/script-genie-wo-account'; // Dynamically set Script Genie link based on authentication status
    },
    links() {
      // Define your navigation links here
      return [
        { text: 'Home', to: '/' },
        { text: 'Profile', to: '/profile', authenticated: true },
        { text: 'About', to: '/about' },
        { text: 'Script Genie', to: this.scriptGenieLink },
      ];
    },
    filteredLinks() {
      return this.links.filter(link => !link.authenticated || this.loggedIn);
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
};
</script>

<style scoped>
body {
  backbround-color: #F1F1F1
}
</style>
