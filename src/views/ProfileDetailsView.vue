<template>
  <br>
  <br>
  <br>
  <br>
  <h1 align="center">Profile</h1>
  <br>
  <v-container fluid>
    <v-row>
      <!-- Aside -->
      <v-col cols="3">
        <v-card class="elevation-2">
          <v-card-title>
            <h3>Organizations</h3>
          </v-card-title>
          <v-list dense>
            <v-list-item @click="createNewOrganization">
              <v-list-item-title>Create New Organization</v-list-item-title>
            </v-list-item>
            <v-list-item v-for="organization in organizations" :key="organization.OrganizationID" @click="loadOrganizationDetails(organization)">
              <v-list-item-title>{{ organization.organizationName }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <!-- Main -->
      <v-col cols="9">
        <!-- Render the current component dynamically based on the currentComponent data -->
        <component :is="currentComponent" :organizationData="selectedOrganizationData" />
      </v-col>
    </v-row>
  </v-container>
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
    createNewOrganization() {
      this.currentComponent = OrganizationComponent;
      this.selectedOrganizationData = null;
    },
    async fetchData() {
      await this.$store.dispatch('fetchOrganizations');
    },
  },
  async mounted() {
    await this.fetchData();
  }
};
</script>

<style scoped>
.v-card {
  height: 100%;
}

.v-list-item:hover {
  cursor: pointer;
}
</style>
