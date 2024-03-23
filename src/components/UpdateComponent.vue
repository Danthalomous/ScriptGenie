<template>
    <div>
      <form @submit.prevent="submitForm">
        <!-- Organization Div -->
        <div>
          <div>
            <label for="venueName">Venue Name:</label>
            <input type="text" id="venueName" v-model="organizationData.venueName">
          </div>
          <div>
            <label for="facilityName">Facility Name:</label>
            <input type="text" id="facilityName" v-model="organizationData.facilityName">
          </div>
          <div>
            <label for="organizationName">Organization Name:</label>
            <input type="text" id="organizationName" v-model="organizationData.organizationName">
          </div>
          <div>
            <label for="teamName">Team Name:</label>
            <input type="text" id="teamName" v-model="organizationData.teamName">
          </div>
          <div>
            <label for="conferenceRelevance">Conference Relevance:</label>
            <select id="conferenceRelevance" v-model="organizationData.conferenceRelevance">
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
            <input type="text" id="competitionLevel" v-model="organizationData.competitionLevel">
          </div>
        </div>
        <!-- Roster Div -->
    <div v-for="(roster, rosterIndex) in organizationData.rosters" :key="rosterIndex">
      <div>
        <label :for="'rosterName' + rosterIndex">Roster Name:</label>
        <input :type="'text'" :id="'rosterName' + rosterIndex" v-model="roster.rosterName">
      </div>
      <div>
        <label :for="'coachName' + rosterIndex">Coach Name:</label>
        <input :type="'text'" :id="'coachName' + rosterIndex" v-model="roster.coachName">
      </div>
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
        <input type="number" id="playerNumber" v-model="player.playerNumber">
      </div>
      <div>
        <label for="playerIsStarting">Player Is Starting:</label>
        <input type="checkbox" id="playerIsStarting" v-model="player.playerIsStarting">
      </div>
      <button type="button" @click="addPlayer(rosterIndex)">Add Player</button>
      <ul>
        <!-- Display players of the current roster -->
        <li v-for="player in roster.players" :key="player.id">
          {{ player.playerName }}
        </li>
      </ul>
    </div>
    <!-- Display all players -->
    <div>
      <h3>All Players</h3>
      <ul>
        <li v-for="(roster, rosterIndex) in organizationData.rosters" :key="rosterIndex">
          <ul>
            <li v-for="player in roster.roster" :key="player.id">
              {{ player.playerName }}
              <button type="button" @click="deletePlayer(player, rosterIndex)">Delete Player</button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
        <br>
        <button type="submit">Update</button>
      </form>
      <br>
      <!-- Delete button -->
      <button type="button" @click="deleteData">Delete Organization</button>
    </div>
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
      async deletePlayer(player, rosterIndex) {
  try {
    // Find the index of the player to delete in the roster
    const indexToDelete = this.organizationData.rosters[rosterIndex].roster.findIndex(p => p.playerID === player.playerID);
    
    if (indexToDelete !== -1) {
      // Remove the player from the roster
      this.organizationData.rosters[rosterIndex].roster.splice(indexToDelete, 1);
      
      // Remove the player from newPlayers array
      const newPlayerIndex = this.newPlayers.findIndex(p => p.playerID === player.playerID);
      if (newPlayerIndex !== -1) {
        this.newPlayers.splice(newPlayerIndex, 1);
      }
      
      // Remove the player from rosterIds array if needed
      if (this.rosterIds.length > rosterIndex) {
        this.rosterIds.splice(rosterIndex, 1);
      }

      // Perform the deletion on the server side
      await axios.delete(`https://localhost:7273/profile/delete/player?playerID=${player.playerID}`);

    } else {
      console.error('Player not found in roster.');
    }
  } catch (error) {
    console.error('Error deleting player:', error);
  }
},

    },
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  