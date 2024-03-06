<template>
    <h1 align="center">Script Genie</h1>
  <form @submit.prevent="submitForm">
    <!-- Dropdowns for organizations, and sport -->
    <div align="center">
      <label for="sport">Select Sport:</label>
        <select id="sport" v-model="selectedSport">
          <option v-for="sport in sports" :key="sport">{{ sport }}</option>
        </select>
        <label for="homeOrganization">Home Organization:</label>
        <select id="homeOrganization" v-model="selectedHomeOrganization" @change="updateHomeOrganization">
          <option value="">Other</option>
          <option v-for="org in organizations" :key="org.OrganizationID" :value="org">{{ org.organizationName }}</option>
        </select>
        <label for="awayOrganization">Away Organization:</label>
        <select id="awayOrganization" v-model="selectedAwayOrganization" @change="updateAwayOrganization">
          <option value="">Other</option>
          <option v-for="org in organizations" :key="org.OrganizationID" :value="org">{{ org.organizationName }}</option>
        </select>
      </div>
      <div align="center">
        <label>Date:</label>
        <input type="date" v-model="dateAndTime" />
      </div>
    <!-- Home Organization -->
    <div>
        <h2>Home Organization:</h2>
        <div>
          <label for="venueName">Venue Name:</label>
          <input type="text" id="venueName" v-model="homeOrganizationData.VenueName">
          <span v-if="!isValidAlphabetic(homeOrganizationData.VenueName)" class="error-message">
            The Venue Name should only have alphabetic characters.
          </span>
        </div>
        <div>
          <label for="facilityName">Facility Name:</label>
          <input type="text" id="facilityName" v-model="homeOrganizationData.FacilityName">
          <span v-if="!isValidAlphabetic(homeOrganizationData.FacilityName)" class="error-message">
            The Facility Name should only have alphabetic characters.
          </span>
        </div>
        <div>
          <label for="organizationName">Organization Name:</label>
          <input type="text" id="organizationName" v-model="homeOrganizationData.OrganizationName">
          <span v-if="!isValidAlphabetic(homeOrganizationData.OrganizationName)" class="error-message">
            The Organization Name should only have alphabetic characters.
          </span>
        </div>
        <div>
          <label for="teamName">Team Name:</label>
          <input type="text" id="teamName" v-model="homeOrganizationData.TeamName">
          <span v-if="!isValidAlphabetic(homeOrganizationData.TeamName)" class="error-message">
            The Team Name should only have alphabetic characters.
          </span>
        </div>
        <div>
          <label for="conferenceRelevance">Conference Relevance:</label>
          <select id="conferenceRelevance" v-model="homeOrganizationData.ConferenceRelevance">
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
          <input type="text" id="competitionLevel" v-model="homeOrganizationData.CompetitionLevel">
          <span v-if="!isValidAlphaNumeric(homeOrganizationData.CompetitionLevel)" class="error-message">
            The Competition Level should only have alpha-numeric characters.
          </span>
        </div>
    </div>
    <!-- Away Organization -->
    <div>
        <h2>Away Organization:</h2>
        <div>
          <label for="venueName">Venue Name:</label>
          <input type="text" id="venueName" v-model="awayOrganizationData.VenueName">
          <span v-if="!isValidAlphabetic(awayOrganizationData.VenueName)" class="error-message">
            The Venue Name should only have alphabetic characters.
          </span>
        </div>
        <div>
          <label for="facilityName">Facility Name:</label>
          <input type="text" id="facilityName" v-model="awayOrganizationData.FacilityName">
          <span v-if="!isValidAlphabetic(awayOrganizationData.FacilityName)" class="error-message">
            The Facility Name should only have alphabetic characters.
          </span>
        </div>
        <div>
          <label for="organizationName">Organization Name:</label>
          <input type="text" id="organizationName" v-model="awayOrganizationData.OrganizationName">
          <span v-if="!isValidAlphabetic(awayOrganizationData.OrganizationName)" class="error-message">
            The Organization Name should only have alphabetic characters.
          </span>
        </div>
        <div>
          <label for="teamName">Team Name:</label>
          <input type="text" id="teamName" v-model="awayOrganizationData.TeamName">
          <span v-if="!isValidAlphabetic(awayOrganizationData.TeamName)" class="error-message">
            The Team Name should only have alphabetic characters.
          </span>
        </div>
        <div>
          <label for="conferenceRelevance">Conference Relevance:</label>
          <select id="conferenceRelevance" v-model="awayOrganizationData.ConferenceRelevance">
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
          <input type="text" id="competitionLevel" v-model="awayOrganizationData.CompetitionLevel">
          <span v-if="!isValidAlphaNumeric(awayOrganizationData.CompetitionLevel)" class="error-message">
            The Competition Level should only have alpha-numeric characters.
          </span>
        </div>
    </div> 
    <!-- PAA Messages -->
    <div>
        <h3>PAA Messages (please check all messages you want to include in your script):</h3>
        <!-- Check boxes for the computed properties and PAA messages -->
        <div>
            <input 
                type="checkbox" 
                id="welcomeMessage" 
                v-model="welcomeMessage.enabled"
                @change="updateWelcomeMessageEnabled()"
                >
            <label for="welcomeMessage">Welcome Message</label>
        </div>
        <div>
            <input 
                type="checkbox" 
                id="liveStream" 
                v-model="liveStream.enabled"
                @change="updateLiveStreamEnabled()"
                >
            <label for="liveStream">Live Stream</label>
            <input
                type="text"
                id="liveStreamMessage"
                v-model="liveStream.network"
            >
            <span v-if="!isValidAlphabetic(liveStream.network)" class="error-message">
            The Live Stream provider should only have alphabetic characters.
          </span>
        </div>
        <div>
            <input 
                type="checkbox" 
                id="sportsmanship" 
                v-model="sportsmanship.enabled"
                @change="updateSportsmanshipEnabled()"
                >
            <label for="sportsmanship">Sportsmanship</label>
            <input
                type="text"
                id="sportsmanshipPolicy"
                v-model="sportsmanship.governingAuthority"
            >
            <span v-if="!isValidAlphaNumeric(sportsmanship.governingAuthority)" class="error-message">
            The Governing Authority should only have alphabetic characters.
          </span>
        </div>
        <div>
            <input 
                type="checkbox" 
                id="concessions" 
                v-model="concessions.enabled"
                @change="updateConcessionsEnabled()"
                >
            <label for="concessions">Concessions</label>
        </div>
        <div>
            <input 
                type="checkbox" 
                id="merchandise" 
                v-model="merchandise.enabled"
                @change="updateMerchandiseEnabled()"
                >
            <label for="merchandise">Merchandise Plug</label>
        </div>
        <div>
            <input 
                type="checkbox" 
                id="referees" 
                v-model="referees.enabled"
                @change="updateRefereesEnabled()"
                >
            <label for="checkbox">Referees</label>
        </div>
        <div>
          <input 
                type="checkbox" 
                id="endOfEvent" 
                v-model="endOfEvent.enabled"
                @change="updateEndOfEventEnabled()"
                >
            <label for="endOfEvent">End Of Event Message</label>
        </div>
        <div>
          <input 
                type="checkbox" 
                id="goodbyeMessage" 
                v-model="goodbyeMessage.enabled"
                @change="updateGoodbyeMessageEnabled()"
                >
            <label for="goodbyeMessage">Goodbye Message</label>
        </div>
        <div>
          <input 
                type="checkbox" 
                id="nextGame" 
                v-model="nextGameData.enabled"
                @change="updateNextGameDataEnabled()"
                >
            <label for="nextGame">Next Game Info: </label>
            <div v-if="nextGameData.enabled">
              <label>Date:</label>
              <input type="date" v-model="nextGameData.date" />
              <br>

              <!-- TODO: Add the ability to select existing organization to autofill these -->
              <label>Opponent Name:</label>
              <input type="text" v-model="nextGameData.nextOpponentName" />
              <span v-if="!isValidAlphabetic(nextGameData.nextOpponentName)" class="error-message">
                The Opponent Name should only have alphabetic characters.
              </span>
              <br>

              <label>Opponent Mascot:</label>
              <input type="text" v-model="nextGameData.nextOpponentMascot" />
              <span v-if="!isValidAlphabetic(nextGameData.nextOpponentMascot)" class="error-message">
                The Opponent Mascot should only have alphabetic characters.
              </span>
              <br>

              <label>Game Location:</label>
              <input type="text" v-model="nextGameData.nextGameLocation" />
              <span v-if="!isValidAlphabetic(nextGameData.nextGameLocation)" class="error-message">
                The Game Location should only have alphabetic characters.
              </span>
              <br>
            </div>
        </div>
        <div>
            <input 
                type="checkbox" 
                id="prayer" 
                v-model="prayer.enabled"
                @change="updatePrayerEnabled()"
                >
            <label for="prayer">Prayer:</label>
            <br>
            <label for="prayerPerson">Name of Person Praying: </label>
            <input
                type="text"
                id="prayerPerson"
                v-model="prayer.personPraying"
            >
            <span v-if="!isValidAlphabetic(prayer.personPraying)" class="error-message">
            The Person Praying should only have alphabetic characters.
          </span>
        </div>
        <div>
            <input 
                type="checkbox" 
                id="nationalAnthem" 
                v-model="nationalAnthem.enabled"
                @change="updateNationalAnthemEnabled()"
                >
            <label for="nationalAnthem">National Anthem:</label>
            <br>
            <label for="nationalAnthemSinger">National Anthem Performers: </label>
            <input
                type="text"
                id="nationalAnthemSinger"
                v-model="nationalAnthem.personSinging"
            >
            <span v-if="!isValidAlphabetic(nationalAnthem.personSinging)" class="error-message">
            The Person(s) Performing should only have alphabetic characters.
          </span>
        </div>
        <div>
          <input 
                type="checkbox" 
                id="roster" 
                v-model="rosters.enabled"
                @change="updateRosterEnabled()"
                >
            <label for="roster">Rosters: </label>
            <div v-if="rosters.enabled">
              <input 
                type="checkbox" 
                id="homeRoster" 
                v-model="rosters.homeRosterEnabled"
                @change="updateHomeRosterEnabled()"
                >
              <label for="homeRoster">Home Roster: </label>
              <!-- Add dropdown with existing rosters for home organization -->
            <br>
            <input 
                type="checkbox" 
                id="awayRoster" 
                v-model="rosters.awayRosterEnabled"
                @change="updateAwayRosterEnabled()"
                >
            <label for="awayRoster">Away Roster: </label>
            <!-- TODO: Add dropdown with existing rosters for away organization -->
            </div>
        </div>
    </div>
    <button type="submit">Generate Script</button>
   </form>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
      return {
      dateAndTime: new Date(),
      sports: ["Basketball", "Football", "Volleyball"],
      selectedSport: '',
      selectedHomeOrganization: null,
      selectedAwayOrganization: null,
      homeOrganizationData: {
        OrganizationID: '',
        VenueName: '',
        FacilityName: '',
        OrganizationName: '',
        TeamName: '',
        ConferenceRelevance: '',
        CompetitionLevel: ''
      },
      awayOrganizationData: {
        OrganizationID: '',
        VenueName: '',
        FacilityName: '',
        OrganizationName: '',
        TeamName: '',
        ConferenceRelevance: '',
        CompetitionLevel: ''
      },
      homeRosterData: {
        coachName: '',
        rosterName: '',
        players: [],
      },
      awayRosterData: {
        coachName: '',
        rosterName: '',
        players: [],
      },
      homePlayerData: {
        playerName: '',
        playerPosition: '',
        playerNumber: '',
        playerIsStarting: false,
      },
      awayPlayerData: {
        playerName: '',
        playerPosition: '',
        playerNumber: '',
        playerIsStarting: false,
      },
      welcomeMessage: {
        message: '',
        enabled: false
      },
      liveStream: {
        network: '',
        enabled: false
      },
      sportsmanship: {
        governingAuthority: '',
        enabled: false
      },
      concessions: {
        message: '',
        enabled: false
      },
      merchandise: {
        message: '',
        enabled: false
      },
      referees: {
        message: '',
        enabled: false
      },
      endOfEvent: {
        message: '',
        enabled: false
      },
      goodbyeMessage: {
        message: '',
        enabled: false
      },
      nextGameData: {
        date: '',
        nextOpponentName: '',
        nextOpponentMascot: '',
        nextGameLocation: '',
        enabled: false
      },
      prayer: {
        personPraying: '',
        enabled: false
      },
      nationalAnthem: {
        personSinging: '',
        enabled: false
      },
      rosters: {
        enabled: false,
        homeRosterEnabled: false,
        awayRosterEnabled: false
        // TODO: Add the roster data into here for the dropdowns
      }
    }    
  },
  methods: {
    isValidAlphabetic(value) {
      return /^[a-zA-Z\s]+$/.test(value);
    },
    isValidAlphaNumeric(value) {
      return /^[a-zA-Z0-9\s]+$/.test(value);
    },
    isValidNumber(value) {
      return /^[0-9]+$/.test(value);
    },
    updateWelcomeMessageEnabled() {
        this.welcomeMessage.enabled = event.target.checked;
    },
    updateLiveStreamEnabled() {
        this.liveStream.enabled = event.target.checked;
    },
    updateSportsmanshipEnabled() {
        this.sportsmanship.enabled = event.target.checked;
    },
    updateConcessionsEnabled() {
        this.concessions.enabled = event.target.checked;
    },
    updateMerchandiseEnabled() {
        this.merchandise.enabled = event.target.checked;
    },
    updateRefereesEnabled() {
        this.referees.enabled = event.target.checked;
    },
    updateEndOfEventEnabled() {
      this.endOfEvent.enabled = event.target.checked;
    },
    updateGoodbyeMessageEnabled() {
      this.goodbyeMessage.enabled = event.target.checked;
    },
    updateNextGameDataEnabled() {
      this.nextGameData.enabled = event.target.checked;
    },
    updatePrayerEnabled() {
      this.prayer.enabled = event.target.checked;
    },
    updateNationalAnthemEnabled() {
      this.nationalAnthem.enabled = event.target.checked;
    },
    updateRosterEnabled() {
      this.rosters.enabled = event.target.checked;
    },
    updateHomeRosterEnabled() {
      this.rosters.homeRosterEnabled = event.target.checked; 
    },
    updateAwayRosterEnabled() {
      this.rosters.awayRosterEnabled = event.target.checked;
    },
    updateHomeOrganization() {
      // Else Update Form
      this.homeOrganizationData.OrganizationID = this.selectedHomeOrganization.organizationID;
      this.homeOrganizationData.VenueName = this.selectedHomeOrganization.venueName;
      this.homeOrganizationData.FacilityName = this.selectedHomeOrganization.facilityName;
      this.homeOrganizationData.OrganizationName = this.selectedHomeOrganization.organizationName;
      this.homeOrganizationData.TeamName = this.selectedHomeOrganization.teamName;
      this.homeOrganizationData.ConferenceRelevance = this.selectedHomeOrganization.conferenceRelevance;
      this.homeOrganizationData.CompetitionLevel = this.selectedHomeOrganization.competitionLevel;
    },
    updateAwayOrganization() {
      this.awayOrganizationData.OrganizationID = this.selectedAwayOrganization.organizationID;
      this.awayOrganizationData.VenueName = this.selectedAwayOrganization.venueName;
      this.awayOrganizationData.FacilityName = this.selectedAwayOrganization.facilityName;
      this.awayOrganizationData.OrganizationName = this.selectedAwayOrganization.organizationName;
      this.awayOrganizationData.TeamName = this.selectedAwayOrganization.teamName;
      this.awayOrganizationData.ConferenceRelevance = this.selectedAwayOrganization.conferenceRelevance;
      this.awayOrganizationData.CompetitionLevel = this.selectedAwayOrganization.competitionLevel;
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
    }
  },
  computed: {
    ...mapGetters(['organizations']),
  },
  mounted() {
    console.log(this.organizations);
  },
}
</script>