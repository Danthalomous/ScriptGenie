<template>
  <div>
    <form @submit.prevent="submitForm">
      <!-- Organization Div -->
      <div>
        <div>
          <label for="venueName">Venue Name:</label>
          <input type="text" id="venueName" v-model="organizationData.VenueName">
          <span v-if="!isValidAlphabetic(organizationData.VenueName)" class="error-message">
            The Venue Name should only have alphabetic characters.
          </span>
        </div>
        <div>
          <label for="facilityName">Facility Name:</label>
          <input type="text" id="facilityName" v-model="organizationData.FacilityName">
          <span v-if="!isValidAlphabetic(organizationData.FacilityName)" class="error-message">
            The Facility Name should only have alphabetic characters.
          </span>
        </div>
        <div>
          <label for="organizationName">Organization Name:</label>
          <input type="text" id="organizationName" v-model="organizationData.OrganizationName">
          <span v-if="!isValidAlphabetic(organizationData.OrganizationName)" class="error-message">
            The Organization Name should only have alphabetic characters.
          </span>
        </div>
        <div>
          <label for="teamName">Team Name:</label>
          <input type="text" id="teamName" v-model="organizationData.TeamName">
          <span v-if="!isValidAlphabetic(organizationData.TeamName)" class="error-message">
            The Team Name should only have alphabetic characters.
          </span>
        </div>
        <div>
          <label for="conferenceRelevance">Conference Relevance:</label>
          <select id="conferenceRelevance" v-model="organizationData.ConferenceRelevance">
            <option value="">Select</option>
            <option value="1A">1A</option>
            <option value="1B">1B</option>
            <option value="1C">1C</option>
            <option value="2A">2A</option>
            <option value="2B">2B</option>
            <option value="2C">2C</option>
            <option value="3A">3A</option>
            <option value="3B">3B</option>
            <option value="3C">3C</option>
            <option value="4A">4A</option>
            <option value="4B">4B</option>
            <option value="4C">4C</option>
            <option value="5A">5A</option>
            <option value="5B">5B</option>
            <option value="5C">5C</option>
            <option value="6A">6A</option>
            <option value="6B">6B</option>
            <option value="6C">6C</option>
          </select>
        </div>
        <div>
          <label for="competitionLevel">Competition Level:</label>
          <input type="text" id="competitionLevel" v-model="organizationData.CompetitionLevel">
          <span v-if="!isValidAlphaNumeric(organizationData.CompetitionLevel)" class="error-message">
            The Competition Level should only have alpha-numeric characters.
          </span>
        </div>
      </div>
      <!-- Roster Div -->
      <div>
        <div>
          <label for="coachName">Coach Name:</label>
          <input type="text" id="coachName" v-model="roster.coachName">
        </div>
        <div>
          <label for="roster">Roster:</label>
          <div>
            <div>
              <label for="playerName">Player Name:</label>
              <input type="text" id="playerName" v-model="player.playerName">
            </div>
            <div>
              <label for="playerPosition">Player Position:</label>
              <input type="text" id="playerPosition" v-model="player.playerPosition">
            </div>
            <div>
              <label for="playerNumber">Player Number:</label>
              <input type="text" id="playerNumber" v-model="player.playerNumber">
            </div>
            <div>
              <label for="playerIsStarting">Player Is Starting:</label>
              <input type="checkbox" id="playerIsStarting" v-model="player.playerIsStarting">
            </div>
          </div>
          <button type="button" @click="addPlayer">Add Player</button>
          <ul>
            <li v-for="player in roster.players" :key="player.id">
              {{ player.playerName }}
            </li>
          </ul>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default {
  data() {
    return {
      organizationData: {
        OrganizationID: '',
        VenueName: '',
        FacilityName: '',
        OrganizationName: '',
        TeamName: '',
        ConferenceRelevance: '',
        CompetitionLevel: ''
      },
      roster: {
        coachName: '',
        players: [],
      },
      player: {
        playerName: '',
        playerPosition: '',
        playerNumber: '',
        playerIsStarting: false,
      },
      defaultId: '92b9eebb-3ee4-44c3-8a68-17f2c980a271',
    };
  },
  methods: {
    isValidAlphabetic(value) {
      return /^[a-zA-Z\s]+$/.test(value);
    },
    isValidAlphaNumeric(value) {
      return /^[a-zA-Z0-9\s]+$/.test(value);
    },

    async submitForm() {
      // Validate before submission
      if (!this.isValidAlphabetic(this.organizationData.TeamName)) {
        return; // Don't submit if Team Name is invalid
      }
      if (!this.isValidAlphabetic(this.organizationData.VenueName)) {
        return;
      }
      if (!this.isValidAlphabetic(this.organizationData.FacilityName)) {
        return;
      }
      if (!this.isValidAlphabetic(this.organizationData.OrganizationName)) {
        return;
      }
      if (!this.isValidAlphaNumeric(this.organizationData.CompetitionLevel)) {
        return; // Don't submit if Competition Level is invalid
      }

      // Generate OrganizationID
      const organizationID = uuidv4();
      console.log(organizationID); // REMOVE THIS
      this.organizationData.OrganizationID = organizationID;
      
      // Generate RosterID
      const RosterID = uuidv4();
      console.log(RosterID); // REMOVE THIS

      // Generate PlayerID
      const PlayerID = uuidv4();
      console.log(PlayerID); // REMOVE THIS

      // Prepare data to send
      const organizationDataToSend = {
        Model: {
          ...this.organizationData,
          Rosters: [],
        },
        Id: this.defaultId,
      };

      console.log(organizationDataToSend); // REMOVE THIS LINE LATER

      // Prepare data to send
      const rosterDataToSend = {
        Model: {
          RosterID: RosterID,
          CoachName: this.roster.coachName,
          PlayerID: this.defaultId,
          Roster: []
        },
        Id: organizationID,
      };

      console.log(rosterDataToSend); // REMOVE THIS LINE LATER

      try {
        // Make Axios call for organization creation
        const organizationResponse = await axios.post(
          'https://localhost:7273/profile/create/organization',
          organizationDataToSend
        );
        console.log(organizationResponse.data);

        const rosterResponse = await axios.post(
          'https://localhost:7273/profile/create/roster',
          rosterDataToSend
        );

        console.log(rosterResponse.data);

        // Iterate through roster players and make Axios call for each player
    for (const player of this.roster.players) {
      const playerDataToSend = {
        Model: {
          PlayerID: PlayerID,
          PlayerName: player.playerName,
          PlayerPosition: player.playerPosition,
          PlayerNumber: player.playerNumber,
          IsStarting: player.playerIsStarting,
        },
        Id: RosterID, // Use the same RosterID for all players in this roster
      };

      const playerResponse = await axios.post(
        'https://localhost:7273/profile/create/player',
        playerDataToSend
      );
      console.log(playerResponse.data);
    }

        // Clear the data
        this.clearFormData();
      } catch (error) {
        console.error('Error:', error);
      }
    },
    clearFormData() {
      this.organizationData = {
        OrganizationID: '',
        VenueName: '',
        FacilityName: '',
        OrganizationName: '',
        TeamName: '',
        ConferenceRelevance: '',
        CompetitionLevel: '',
      };
      this.roster = {
        coachName: '',
      };
      this.player = {
        playerName: '',
        playerPosition: '',
        playerNumber: '',
        playerIsStarting: false,
      };
      this.players = [];
    },
    addPlayer() {
      this.roster.players.push(this.player);
      this.player = {
        playerName: '',
        playerPosition: '',
        playerNumber: '',
        playerIsStarting: false,
      };
    },
  },
};
</script>

<style>
.error-message {
  color: red;
  font-size: 0.8rem;
}
</style>