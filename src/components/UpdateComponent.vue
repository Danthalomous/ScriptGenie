<template>
  <v-container>
    <v-form @submit.prevent="submitForm">
      <!-- Organization Div -->
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="organizationData.venueName" label="Venue Name" placeholder="Nampa Christian Orchard Campus" outlined></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="organizationData.facilityName" label="Facility Name" placeholder="Barr Field" outlined></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="organizationData.organizationName" label="Organization Name" placeholder="Nampa Christian" outlined></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="organizationData.teamName" label="Team Name" placeholder="Trojans" outlined></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <select id="conferenceRelevance" v-model="organizationData.conferenceRelevance">
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
              <v-text-field v-model="organizationData.competitionLevel" label="Competition Level" placeholder="High School" outlined></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- Roster Div -->
      <v-row v-for="(roster, index) in organizationData.rosters" :key="index">
        <v-col cols="12">
          <v-text-field v-model="roster.rosterName" label="Roster Name" placeholder="Nampa Christian High School Football" outlined></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="roster.coachName" label="Coach Name" placeholder="Billy Bob" outlined></v-text-field>
        </v-col>
        <v-col cols="12">
          <h2>Add Players:</h2>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="player.playerName" label="Player Name" placeholder="Jimmy Johnson" outlined></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="player.playerPosition" label="Player Position" placeholder="Quarterback" outlined></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="player.playerNumber" label="Player Number" type="number" placeholder="0" outlined></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-checkbox v-model="player.playerIsStarting" label="Player Is Starting"></v-checkbox>
        </v-col>
        <v-col cols="12">
          <v-btn @click="addPlayer(index)">Add Player</v-btn>
<v-list>
  <v-list-item v-for="(player, index) in roster.roster" :key="index">
    <v-list-item-content>
      <v-row align="center">
        <v-col cols="10">
          {{ player.playerName }}
        </v-col>
        <v-col cols="2">
          <v-btn color="#FF5964" @click="deletePlayer(roster.roster, player)">Delete Player</v-btn>
        </v-col>
      </v-row>
    </v-list-item-content>
  </v-list-item>
</v-list>

        </v-col>
      </v-row>

      <v-btn color="#00D9FF" type="submit" block><p class="custom-font-color">Update</p></v-btn>
      <br>
    </v-form>
    <!-- Delete button -->
    <v-btn color="#FF0000" @click="deleteData" block><p class="custom-font-color">Delete Organization</p></v-btn>
  </v-container>
  <br>
  <br>
</template>
  
  <script>
  import axios from 'axios';
  import { v4 as uuidv4 } from 'uuid';
  
  export default {
    props: {
      organizationData: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        player: {
          playedID: uuidv4,
          playerName: '',
          playerPosition: '',
          playerNumber: '',
          playerIsStarting: false,
        },
        defaultId: '92b9eebb-3ee4-44c3-8a68-17f2c980a271',
        newPlayers: [],
        rosterIds: [],
      };
    },
    methods: {
      async submitForm() {
        if (!this.validateForm()) {
    return;
      }

    try {
    // Update organization data
    const organizationResponse = await axios.put(
      'https://localhost:7273/profile/update/organization',
      { Model: this.organizationData }
    );
    console.log("Organization Response:", organizationResponse.data);

    // Update rosters
    for (const roster of this.organizationData.rosters) {
      const rosterResponse = await axios.put(
        'https://localhost:7273/profile/update/roster',
        { Model: roster }
      );
      console.log("Roster Response:", rosterResponse.data);
    }

    // Update/Add players:
    for (let i = 0; i < this.rosterIds.length; i++) {
        const playerDataToSend = {
        Model: {
          PlayerID: uuidv4(),
          PlayerName: this.newPlayers[i].playerName,
          PlayerPosition: this.newPlayers[i].playerPosition,
          PlayerNumber: this.newPlayers[i].playerNumber,
          IsStarting: this.newPlayers[i].playerIsStarting,
        },
        Id: this.rosterIds[i], 
      };
    
      const playerResponse = await axios.post(
        'https://localhost:7273/profile/create/player',
        playerDataToSend
      );
      console.log("Player Response:", playerResponse.data); 
    }

    this.clearFormData();

    const currentRoute = this.$route.path;
    this.$router.push({ path: '/empty' }).then(() => {
      this.$router.push({ path: currentRoute });
    });
  } catch (error) {
    console.error('Error:', error);
  }
      },
      async deleteData() {
        try {
        // Delete organization data
        await axios.delete(`https://localhost:7273/profile/delete/organization?organizationID=${this.organizationData.organizationID}`);

        // Delete rosters
        for (const roster of this.organizationData.rosters) {
          await axios.delete(`https://localhost:7273/profile/delete/roster?rosterID=${roster.rosterID}`);
        
          // Delete players
          for (const player of roster.roster) {
            await axios.delete(`https://localhost:7273/profile/delete/player?playerID=${player.playerID}`);
          }
        }

        // Delete players
        for (const player of this.newPlayers) {
          await axios.delete(`https://localhost:7273/profile/delete/player?playerID=${player.playerID}`);
        }


        // Clear form data after deletion
        this.clearFormData();

        const currentRoute = this.$route.path;
    this.$router.push({ path: '/empty' }).then(() => {
      this.$router.push({ path: currentRoute });
    });

        console.log("All data deleted successfully.");
      } catch (error) {
        console.error('Error:', error);
      }
      },
      validateForm() {
        return true;
      },
      clearFormData() {
        this.roster = {
          coachName: '',
          rosterName: '',
          players: [],
        };
        this.player = {
          playerName: '',
          playerPosition: '',
          playerNumber: '',
          playerIsStarting: false,
        };
      },
      addPlayer(rosterIndex) {
        const player = {
          playerID: uuidv4(),
          playerName: this.player.playerName,
          playerPosition: this.player.playerPosition,
          playerNumber: this.player.playerNumber,
          playerIsStarting: this.player.playerIsStarting,
        };
      // Push player to the players array of the specific roster
      this.organizationData.rosters[rosterIndex].roster.push(player);

      // Push the player to newPlayers array so that it can be added to the database
      this.newPlayers.push(player);
      
      const rosterId = this.organizationData.rosters[rosterIndex].rosterID;

      this.rosterIds.push(rosterId);

      // Clear player input fields after adding
      this.player = {
        playerName: '',
        playerPosition: '',
        playerNumber: '',
        playerIsStarting: false,
      };
      },
      async deletePlayer(roster, player) {
  try {
    // Remove player from the roster array
    roster.pop(player);
      
      // Remove the player from newPlayers array
      const newPlayerIndex = this.newPlayers.findIndex(p => p.playerID === player.playerID);
      if (newPlayerIndex !== -1) {
        this.newPlayers.splice(newPlayerIndex, 1);
      }

      // Perform the deletion on the server side
      await axios.delete(`https://localhost:7273/profile/delete/player?playerID=${player.playerID}`);
  } catch (error) {
    console.error('Error deleting player:', error);
  }
},

    },
  };
  </script>
  
  <style scoped>
<styl scoped>
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