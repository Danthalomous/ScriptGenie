<template>
  <br>
    <div class="hero-banner">
        <!-- Formatting -->
        <div>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
        </div>
        <h2 align="center" class="custom-font-color">Max-Pro Scripts</h2>
        <div align="center" id="nav">
          <router-link to="/" class="nav-link">home |</router-link>
          <router-link v-if="loggedIn" to="/profile" class="nav-link">  profile |</router-link>
          <router-link to="/about" class="nav-link"> about |</router-link>
          <tag @click="toggleModal" class="nav-link">  login/register</tag>
          <component :is="currentModalComponent" @close="closeModal" :is-visible="showLoginModal" />
        </div>
        <br>
        <br>
        <div align="center">
          <v-btn 
            @click="navigateToScriptGenie" 
            variant="flat" 
            rounded="lg" 
            size="x-large" 
            color="#FF5964" 
            class="custom-font text-lowercase custom-font-size"
          >
          Script Genie
        </v-btn>
        </div>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <v-container>
          <v-row class="justify-center">
            <v-card v-if="loggedIn" :variant="elevated" width="175" height="250" href="/profile" color="#FF5964" hover>
              <v-card-item>
                  <br>
                  <div class="text-h6 mb-1" align="center">
                    <p class="custom-font custom-font-size">Profile</p>
                    <!-- Centered icon -->
                    <div class="icon-container">
                      <img src="../assets/ClipboardIcon.svg" alt="Profile Image">
                    </div>
                  </div>
              </v-card-item>
            </v-card>
            <v-card class="custom-card" :variant="elevated" width="175" height="250" @click="generateUrl('Football')" hover>
              <v-card-item>
                  <br>
                  <div class="text-h6 mb-1" align="center">
                    <p class="custom-font custom-font-size">Football</p>
                    <!-- Centered icon -->
                    <div class="icon-container">
                      <img src="../assets/FootballIcon.svg" alt="Profile Image">
                    </div>
                  </div>
              </v-card-item>
            </v-card>
            <v-card class="custom-card" :variant="elevated" width="175" height="250" @click="generateUrl('Basketball')" hover>
              <v-card-item>
                  <br>
                  <div class="text-h6 mb-1" align="center">
                    <p class="custom-font custom-font-size">Basketball</p>
                    <!-- Centered icon -->
                    <div class="icon-container">
                      <img src="../assets/BasketballIcon.svg" alt="Profile Image">
                    </div>
                  </div>
              </v-card-item>
            </v-card>
            <v-card class="custom-card" :variant="elevated" width="175" height="250" @click="generateUrl('Volleyball')" hover>
              <v-card-item>
                  <br>
                  <div class="text-h6 mb-1" align="center">
                    <p class="custom-font custom-font-size">Volleyball</p>
                    <!-- Centered icon -->
                    <div class="icon-container">
                      <img src="../assets/VolleyballIcon.svg" alt="Profile Image">
                    </div>
                  </div>
              </v-card-item>
            </v-card>
          </v-row>
        </v-container>
      <!-- Body -->
      <body>
        <br>
        <br>
        <div>
        <h1 align="center">Our Mission</h1>

        <v-container>
    <v-row>
      <v-col cols="6">
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat.
            Quisque velit nisi, pretium ut lacinia in, elementum id enim. Donec sollicitudin molestie malesuada.
            Nulla quis lorem ut libero malesuada feugiat. Quisque velit nisi, pretium ut lacinia in, elementum id enim.
            Donec sollicitudin molestie malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nulla quis lorem ut libero malesuada feugiat. Quisque velit nisi, pretium ut lacinia in, elementum id enim.
          </p>
          <br>
          <p>
            Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada feugiat. Quisque velit nisi,
            pretium ut lacinia in, elementum id enim. Donec sollicitudin molestie malesuada. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Quisque velit nisi, pretium ut lacinia
            in, elementum id enim. Donec sollicitudin molestie malesuada.
          </p>
        </div>
      </v-col>
      <v-col cols="6">
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat.
            Quisque velit nisi, pretium ut lacinia in, elementum id enim. Donec sollicitudin molestie malesuada.
            Nulla quis lorem ut libero malesuada feugiat. Quisque velit nisi, pretium ut lacinia in, elementum id enim.
            Donec sollicitudin molestie malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis
            lorem ut libero malesuada feugiat. Quisque velit nisi, pretium ut lacinia in, elementum id enim.
          </p>
          <br>
          <p>
            Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada feugiat. Quisque velit nisi,
            pretium ut lacinia in, elementum id enim. Donec sollicitudin molestie malesuada. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Quisque velit nisi, pretium ut lacinia
            in, elementum id enim. Donec sollicitudin molestie malesuada.
          </p>
        </div>
      </v-col>
    </v-row>
  </v-container>
      </div>
      </body>
    </div>
  </template>
  
  <script>
  import LoginModal from '../components/LoginModal.vue';
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
      },
      scriptGenieLinkName() {
        return this.loggedIn ? 'script-genie-w-account' : 'script-genie-wo-account';
      },
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
      navigateToScriptGenie() {
        const route = this.scriptGenieLink;

        this.$router.push(route);
      },
      navigateToProfile() {
        const route = '/profile';

        this.$router.push(route);
      },
      generateUrl(paramValue) {
        const route = this.scriptGenieLinkName + '?selectedSport=' + paramValue;

        this.$router.push(route);
      }
    },
    components: {
      LoginModal,
    },
  };
  </script>
  
  <style scoped>
  .custom-card:hover {
    background-color: #00D9FF;
  }

  .hero-banner {
      width: 100%;
      height: 94vh; /* Adjust height as needed */
      background-image: url("../assets/backgroundImage.png");
      background-size: cover;
      background-position: center;
      position: relative; /* Ensure positioning of overlay content */
      background-color: #F1F1F1;
  }
  
  .nav-link {
    color: white;
    text-decoration: none;  
  }

  .nav-link:hover {
    color: #DADDDA;
    cursor: pointer;
  }

  .overlay-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      /* Additional styling for your overlay content */
  }

  .custom-no-gutters {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .icon-container {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-container::after {
  content: "";
  display: block;
  padding-top: 100%; /* Maintain aspect ratio for square icon */
}

.icon-container v-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.custom-font {
  font-family: 'Parisienne', sans-serif;
}

.custom-font-size {
  font-size: 1.35em;
}

.custom-font-color {
  color: white;
}
</style>  