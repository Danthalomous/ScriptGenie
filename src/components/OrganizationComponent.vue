<template>
  <v-container>
    <v-form @submit.prevent="submitForm">
      <!-- Organization Div -->
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="organizationData.VenueName" label="Venue Name" placeholder="Nampa Christian Orchard Campus" outlined></v-text-field>
              <span v-if="!isValidAlphabetic(organizationData.VenueName)" class="error-message">The Venue Name should only have alphabetic characters.</span>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="organizationData.FacilityName" label="Facility Name" placeholder="Barr Field" outlined></v-text-field>
              <span v-if="!isValidAlphabetic(organizationData.FacilityName)" class="error-message">The Facility Name should only have alphabetic characters.</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="organizationData.OrganizationName" label="Organization Name" placeholder="Nampa Christian" outlined></v-text-field>
              <span v-if="!isValidAlphabetic(organizationData.OrganizationName)" class="error-message">The Organization Name should only have alphabetic characters.</span>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="organizationData.TeamName" label="Team Name" placeholder="Trojans" outlined></v-text-field>
              <span v-if="!isValidAlphabetic(organizationData.TeamName)" class="error-message">The Team Name should only have alphabetic characters.</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <select id="conferenceRelevance" v-model="organizationData.ConferenceRelevance">
            <option value="">Select Conference Relevance</option>
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
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="organizationData.CompetitionLevel" label="Competition Level" placeholder="High School" outlined></v-text-field>
              <span v-if="!isValidAlphaNumeric(organizationData.CompetitionLevel)" class="error-message">The Competition Level should only have alpha-numeric characters.</span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- Roster Div -->
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="roster.rosterName" label="Roster Name" placeholder="Nampa Christian Football" outlined></v-text-field>
          <span v-if="!isValidAlphabetic(roster.rosterName)" class="error-message">A Roster Name should only contain alphabetic characters.</span>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="roster.coachName" label="Coach Name" placeholder="Billy Bob" outlined></v-text-field>
          <span v-if="!isValidAlphabetic(roster.coachName)" class="error-message">A Coach Name should only contain alphabetic characters.</span>
        </v-col>
        <v-col cols="12">
          <h2>Add Players:</h2>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="player.playerName" label="Player Name" placeholder="Jimmy Johnson" outlined></v-text-field>
          <span v-if="!isValidAlphabetic(player.playerName)" class="error-message">A Player Name should only contain alphabetic characters.</span>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="player.playerPosition" label="Player Position" placeholder="Quarterback" outlined></v-text-field>
          <span v-if="!isValidAlphabetic(player.playerPosition)" class="error-message">A Player Position should only contain alphabetic characters.</span>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="player.playerNumber" label="Player Number" type="number" placeholder="0" outlined></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-checkbox v-model="player.playerIsStarting" label="Player Is Starting"></v-checkbox>
        </v-col>
        <v-col cols="12">
          <v-btn @click="addPlayer">Add Player</v-btn>
<v-list>
  <v-list-item v-for="(player, index) in roster.players" :key="index">
    <v-list-item-content>
      <v-row align="center">
        <v-col cols="10">
          {{ player.playerName }}
        </v-col>
        <v-col cols="2">
          <v-btn color="#FF5964" @click="deletePlayer(index)">Delete Player</v-btn>
        </v-col>
      </v-row>
    </v-list-item-content>
  </v-list-item>
</v-list>

        </v-col>
      </v-row>

      <v-btn color="#00D9FF" type="submit" block><p class="custom-font-color">Create Organziation</p></v-btn>
      <br>
      <br>
      <br>
    </v-form>
  </v-container>
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
        CompetitionLevel: '',
        Rosters: []
      },
      roster: {
        coachName: '',
        rosterName: '',
        players: [],
      },
      player: {
        playerName: '',
        playerPosition: '',
        playerNumber: 0,
        playerIsStarting: false,
      },
      defaultId: this.$store.getters.userID,
    };
  },
  methods: {
    isValidAlphabetic(value) {
      if(value == '')
        return true;

      return /^[a-zA-Z\s]+$/.test(value);
    },
    isValidAlphaNumeric(value) {
      if(value == null || value == '')
        return true;

      return /^[a-zA-Z0-9\s]+$/.test(value);
    },
    isValidNumber(value) {
      return /^[0-9]+$/.test(value);
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
      if(!this.isValidAlphabetic(this.roster.rosterName)) {
        return; // Don't submit if Roster Name is invalid
      }
      if(!this.isValidAlphabetic(this.roster.coachName) || this.roster.coachName == null) {
        return; // Don't submit if Coach Name is invalid
      }
      if(!this.isValidAlphabetic(this.player.playerName) || this.player.playerName == null) {
        return; // Don't submit if Player Name is invalid
      }
      if(!this.isValidAlphabetic(this.player.playerPosition) || this.player.playerPosition == null) {
        return; // Don't submit if Player Position is invalid
      }

      // Generate OrganizationID
      const organizationID = uuidv4();
      console.log(organizationID); // REMOVE THIS
      this.organizationData.OrganizationID = organizationID;
      
      // Generate RosterID
      const RosterID = uuidv4();

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
          RosterName: this.roster.rosterName,
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
          PlayerID: uuidv4(),
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

      const currentRoute = this.$route.path;
    this.$router.push({ path: '/empty' }).then(() => {
      this.$router.push({ path: currentRoute });
    });
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
        Rosters: [],
      };
      this.roster = {
        rosterName: '',
        coachName: '',
      };
      this.player = {
        playerName: '',
        playerPosition: '',
        playerNumber: '0',
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
    deletePlayer() {
      this.roster.players.pop(this.player);
    },
  },
};
</script>

<style scoped>
.error-message {
  color: red;
  font-size: 0.8rem;
}

.custom-font-color {
  color: #f2f2f2;
}

select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 1px solid #ccc; /* Add border */
  padding: 8px;
  font-size: 16px;
  width:100%;
  box-sizing: border-box;
  background-color: #fff;
  cursor: pointer;
  margin-bottom: 20px;
  border-radius: 4px; /* Add border-radius for rounded corners */
  position: relative; /* Add relative position for custom arrow icon */
}

/* Custom arrow icon */
select::after {
  content: '\25BC'; /* Unicode character for down arrow */
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
}

/* Hover state */
select:hover {
  border-color: #aaa;
}

/* Focus state */
select:focus {
  outline: none;
  border-color: #007bff;
}

/* Disabled state */
select:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>