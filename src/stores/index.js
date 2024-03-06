// store/index.js
import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    authToken: null,
    userID: null,
    organizations: [],
  },
  mutations: {
    setAuthToken(state, token) {
      state.authToken = token;
    },
    setOrganizations(state, organizations) {
      state.organizations = organizations;
    },
    clearAuthToken(state) {
      state.authToken = null;
    },
    setUserID(state, userID) {
      state.userID = userID;
    },
  },
  actions: {
    async login({ commit }, token) {
      try {
        commit('setAuthToken', token);

        // fetch organizations data
        const organizationsResponse = await axios.get('https://localhost:7273/profile/fetchAll/organizations?userID=' + this.getters.userID);
        const organizations = organizationsResponse.data;
        
        // Looping through all organizations and adding the appropriate rosters to them
        for(let i = 0; i < organizations.length; i++) {
          const rostersResponse = await axios.get('https://localhost:7273/profile/fetchAll/rosters?organizationID=' + organizations[i].organizationID);

          for(let j = 0; j < rostersResponse.data.length; j++) {
            if(rostersResponse.data[j] == null)
              console.log("No roster found for organization: " + organizations[i].organizationName); // TODO: REMOVE THIS LATER

            organizations[i].rosters.push(rostersResponse.data[j])
          }
        }

        // Looping through all organizations rosters and adding the appropriate players to them
        for(let i = 0; i < organizations.length; i++) {
          for(let j = 0; j < organizations[i].rosters.length; j++) {
            const playersResponse = await axios.get('https://localhost:7273/profile/fetchAll/player?rosterID=' + organizations[i].rosters[j].rosterID);

            // Add each player to the roster
            for(let k = 0; k < playersResponse.data.length; k++) {
              organizations[i].rosters[j].roster.push(playersResponse.data[k])
            }
          }
        }

        commit('setOrganizations', organizations);
      }
      catch (error) {
        console.log(error);
      }

    },
    logout({ commit }) {
      commit('clearAuthToken');
    },
    userID({ commit }, id) {
      commit('userID', id);
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.authToken,
    authToken: (state) => state.authToken,
    userID: (state) => state.userID,
    organizations: (state) => state.organizations,
  },
});
