<template>
    <div class="container">
      <aside class="aside">
        <ul>
          <li v-for="organization in organizations" :key="organization.OrganizationID">
            <!-- Use a button or any other clickable element to trigger the loadOrganizationDetails method -->
            <button @click="loadOrganizationDetails(organization)">
              {{ organization.OrganizationName }}
            </button>
          </li>
        </ul>
      </aside>
      <main class="main">
        <!-- Render the current component dynamically based on the currentComponent data -->
        <component :is="currentComponent" :organizationData="selectedOrganizationData" />
      </main>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  import OrganizationComponent from '../components/OrganizationComponent.vue';
  import UpdateComponent from '../components/UpdateComponent.vue';
  
  export default {
    computed: {
      // Map the organizations getter from Vuex store
      ...mapGetters(['organizations']),
    },
    data() {
      return {
        currentComponent: OrganizationComponent, // Default component to render
        selectedOrganizationData: null, // Data of the selected organization
      };
    },
    methods: {
      // Method to load organization details and switch to UpdateComponent
      loadOrganizationDetails(organization) {
        this.selectedOrganizationData = organization; // Set the selected organization data
        this.currentComponent = UpdateComponent; // Switch to UpdateComponent
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
  }
  .aside {
    width: 200px;
    height: 100%;
    background-color: lightblue;
    border: 1px solid;
  }

  button {
  min-width: 100px; /* Adjust as needed */
  min-height: 40px; /* Adjust as needed */
}
  .main {
    flex: 1;
  }
  </style>
  