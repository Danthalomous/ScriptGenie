<template>
  <br>
  <br>
  <br>
  <br>
    <h1 align="center" class="custom-font">Script Genie</h1>
  <br>
  <v-container>
    <v-form @submit.prevent="submitForm">
    <!-- Dropdowns for organizations, and sport -->
    <div class="dropdown-container" align="center">
        <select id="sport" v-model="selectedSport">
          <option value="" disabled selected>Select a sport</option> 
          <option v-for="sport in sports" :key="sport">{{ sport }}</option>
        </select>
        <select id="homeOrganization" v-model="selectedHomeOrganization" @change="updateHomeOrganization">
          <option value="" disabled selected>Select a home organization</option> 
          <option value="">Other</option>
          <option v-for="org in organizations" :key="org.OrganizationID" :value="org">{{ org.organizationName }}</option>
        </select>
        <select id="awayOrganization" v-model="selectedAwayOrganization" @change="updateAwayOrganization">
          <option value="" disabled selected>Select an away organization</option> 
          <option value="">Other</option>
          <option v-for="org in organizations" :key="org.OrganizationID" :value="org">{{ org.organizationName }}</option>
        </select>
    </div>
    <br>
      <div align="center">
        <label>Date of Event: </label>
        <input type="date" v-model="dateAndTime" />
      </div>
    <br>
    <br>
    <v-row justify="center">
      <!-- Home Organization -->
      <v-col>
        <h3>Home Organization:</h3>
        <br>
        <div>
          <v-text-field clearable label="Venue Name" variant="outlined" v-model="homeOrganizationData.VenueName" />
          <span v-if="!isValidAlphabetic(homeOrganizationData.VenueName)" class="error-message">
            The Venue Name should only have alphabetic characters.
          </span>
        </div>
        <div>
          <v-text-field clearable label="Facility Name" variant="outlined" v-model="homeOrganizationData.FacilityName" />
          <span v-if="!isValidAlphabetic(homeOrganizationData.FacilityName)" class="error-message">
            The Facility Name should only have alphabetic characters.
          </span>
        </div>
        <div>
          <v-text-field clearable label="Organization Name" variant="outlined" v-model="homeOrganizationData.OrganizationName" />
          <span v-if="!isValidAlphabetic(homeOrganizationData.OrganizationName)" class="error-message">
            The Organization Name should only have alphabetic characters.
          </span>
        </div>
        <div>
          <v-text-field clearable label="Team Name" variant="outlined" v-model="homeOrganizationData.TeamName" />
          <span v-if="!isValidAlphabetic(homeOrganizationData.TeamName)" class="error-message">
            The Team Name should only have alphabetic characters.
          </span>
        </div>
        <div>
          <select id="conferenceRelevance" v-model="homeOrganizationData.ConferenceRelevance">
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
        </div>
        <div>
          <v-text-field clearable label="Competition Level" variant="outlined" v-model="homeOrganizationData.CompetitionLevel" />
          <span v-if="!isValidAlphaNumeric(homeOrganizationData.CompetitionLevel)" class="error-message">
            The Competition Level should only have alpha-numeric characters.
          </span>
        </div>
      </v-col>
      <!-- Away Organization -->
      <v-col>
        <h3>Away Organization:</h3>
        <br>
        <div>
          <v-text-field clearable label="Venue Name" variant="outlined" v-model="awayOrganizationData.VenueName" />
          <span v-if="!isValidAlphabetic(awayOrganizationData.VenueName)" class="error-message">
            The Venue Name should only have alphabetic characters.
          </span>
        </div>
        <div>
          <v-text-field clearable label="Facility Name" variant="outlined" v-model="awayOrganizationData.FacilityName" />
          <span v-if="!isValidAlphabetic(awayOrganizationData.FacilityName)" class="error-message">
            The Facility Name should only have alphabetic characters.
          </span>
        </div>
        <div>
          <v-text-field clearable label="Organization Name" variant="outlined" v-model="awayOrganizationData.OrganizationName" />
          <span v-if="!isValidAlphabetic(awayOrganizationData.OrganizationName)" class="error-message">
            The Organization Name should only have alphabetic characters.
          </span>
        </div>
        <div>
          <v-text-field clearable label="Team Name" variant="outlined" v-model="awayOrganizationData.TeamName" />
          <span v-if="!isValidAlphabetic(awayOrganizationData.TeamName)" class="error-message">
            The Team Name should only have alphabetic characters.
          </span>
        </div>
        <div>
          <select id="conferenceRelevance" v-model="awayOrganizationData.ConferenceRelevance">
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
        </div>
        <div>
          <v-text-field clearable label="Competition Level" variant="outlined" v-model="awayOrganizationData.CompetitionLevel" />
          <span v-if="!isValidAlphaNumeric(awayOrganizationData.CompetitionLevel)" class="error-message">
            The Competition Level should only have alpha-numeric characters.
          </span>
        </div>
      </v-col> 
    </v-row>
    <!-- PAA Messages -->
    <div>
        <h3>PAA Messages (please check all messages you want to include in your script):</h3>
        <!-- Check boxes for the computed properties and PAA messages -->
        <div>
            <v-checkbox label="Welcome Message" v-model="welcomeMessage.enabled" @change="updateWelcomeMessageEnabled()"></v-checkbox>
        </div>
        <div>
          <v-checkbox label="Live Stream" v-model="liveStream.enabled" @change="updateLiveStreamEnabled()"></v-checkbox>
          <v-text-field clearable :disabled="!liveStream.enabled" label="Live Stream Provider" variant="outlined" v-model="liveStream.network" />
            <span v-if="!isValidAlphabetic(liveStream.network)" class="error-message">
            The Live Stream provider should only have alphabetic characters.
          </span>
        </div>
        <div>
          <v-checkbox label="Sportsmanship" v-model="sportsmanship.enabled" @change="updateSportsmanshipEnabled()"></v-checkbox>
          <v-text-field clearable :disabled="!sportsmanship.enabled" label="Sportsmanship Governing Authority" variant="outlined" v-model="sportsmanship.governingAuthority" />
            <span v-if="!isValidAlphaNumeric(sportsmanship.governingAuthority)" class="error-message">
            The Governing Authority should only have alphabetic characters.
          </span>
        </div>
        <div>
          <v-checkbox label="Concessions" v-model="concessions.enabled" @change="updateConcessionsEnabled()"></v-checkbox>
        </div>
        <div>
          <v-checkbox label="Merchandise" v-model="merchandise.enabled" @change="updateMerchandiseEnabled()"></v-checkbox>
        </div>
        <div>
          <v-checkbox label="Referees" v-model="referees.enabled" @change="updateRefereesEnabled()"></v-checkbox>
        </div>
        <div>
          <v-checkbox label="End Of Event Message" v-model="endOfEvent.enabled" @change="updateEndOfEventEnabled()"></v-checkbox>
        </div>
        <div>
          <v-checkbox label="Goodbye Message" v-model="goodbyeMessage.enabled" @change="updateGoodbyeMessageEnabled()"></v-checkbox>
        </div>
        <div>
          <v-checkbox label="Next Game Info" v-model="nextGameData.enabled" @change="updateNextGameDataEnabled()"></v-checkbox>
            <div v-if="nextGameData.enabled">
              <label>Date:</label>
              <input type="date" v-model="nextGameData.date" />
              <br>
              <br>
              <v-text-field clearable label="Opponent Name" variant="outlined" v-model="nextGameData.nextOpponentName" />
              <span v-if="!isValidAlphabetic(nextGameData.nextOpponentName)" class="error-message">
                The Opponent Name should only have alphabetic characters.
              </span>
              <br>

              <v-text-field clearable label="Opponent Mascot" variant="outlined" v-model="nextGameData.nextOpponentMascot" />
              <span v-if="!isValidAlphabetic(nextGameData.nextOpponentMascot)" class="error-message">
                The Opponent Mascot should only have alphabetic characters.
              </span>
              <br>

              <v-text-field clearable label="Game Location" variant="outlined" v-model="nextGameData.nextGameLocation" />
              <span v-if="!isValidAlphabetic(nextGameData.nextGameLocation)" class="error-message">
                The Game Location should only have alphabetic characters.
              </span>
              <br>
            </div>
        </div>
        <div>
          <v-checkbox label="Prayer" v-model="prayer.enabled" @change="updatePrayerEnabled()"></v-checkbox>
          <v-text-field clearable :disabled="!prayer.enabled" label="Name of Person Praying" variant="outlined" v-model="prayer.personPraying" />
            <span v-if="!isValidAlphabetic(prayer.personPraying)" class="error-message">
            The Person Praying should only have alphabetic characters.
          </span>
        </div>
        <div>
          <v-checkbox label="National Anthem" v-model="nationalAnthem.enabled" @change="updateNationalAnthemEnabled()"></v-checkbox>
          <v-text-field clearable :disabled="!nationalAnthem.enabled" label="National Anthem Performers" variant="outlined" v-model="nationalAnthem.personSinging" />
            <span v-if="!isValidAlphabetic(nationalAnthem.personSinging)" class="error-message">
            The Person(s) Performing should only have alphabetic characters.
          </span>
        </div>
        <div>
          <v-checkbox label="Rosters" v-model="rosters.enabled" @change="updateRosterEnabled()"></v-checkbox>
            <div v-if="rosters.enabled">
              <v-checkbox label="Home Roster" v-model="rosters.homeRosterEnabled" @change="updateHomeRosterEnabled()"></v-checkbox>
              <v-checkbox label="Away Roster" v-model="rosters.awayRosterEnabled" @change="updateAwayRosterEnabled()"></v-checkbox>
            </div>
        </div>
    </div>
      <v-btn color="#FF5964" type="submit" block>Generate Script</v-btn>
   </v-form>
   <br>
   <br>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { PDFDocument, rgb} from 'pdf-lib';

export default {
    data() {
      return {
      dateAndTime: new Date(),
      sports: ["Basketball", "Football", "Volleyball"],
      selectedSport: '',
      selectedHomeOrganization: '',
      selectedAwayOrganization: '',
      homeOrganizationData: {
        OrganizationID: '',
        VenueName: '',
        FacilityName: '',
        OrganizationName: '',
        TeamName: '',
        ConferenceRelevance: '',
        CompetitionLevel: '',
        Roster: {},
        CoachName: ''
      },
      awayOrganizationData: {
        OrganizationID: '',
        VenueName: '',
        FacilityName: '',
        OrganizationName: '',
        TeamName: '',
        ConferenceRelevance: '',
        CompetitionLevel: '',
        Roster: {},
        CoachName: ''
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
      this.homeOrganizationData.Roster = this.selectedHomeOrganization.rosters[0];
      this.homeOrganizationData.CoachName = this.selectedHomeOrganization.rosters[0].coachName;
    },
    updateAwayOrganization() {
      this.awayOrganizationData.OrganizationID = this.selectedAwayOrganization.organizationID;
      this.awayOrganizationData.VenueName = this.selectedAwayOrganization.venueName;
      this.awayOrganizationData.FacilityName = this.selectedAwayOrganization.facilityName;
      this.awayOrganizationData.OrganizationName = this.selectedAwayOrganization.organizationName;
      this.awayOrganizationData.TeamName = this.selectedAwayOrganization.teamName;
      this.awayOrganizationData.ConferenceRelevance = this.selectedAwayOrganization.conferenceRelevance;
      this.awayOrganizationData.CompetitionLevel = this.selectedAwayOrganization.competitionLevel;
      this.awayOrganizationData.Roster = this.selectedAwayOrganization.rosters[0];
      this.awayOrganizationData.CoachName = this.selectedAwayOrganization.rosters[0].roster.coachName;
    },
    async submitForm() {
      const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    // Add content to the PDF document
    const { height } = page.getSize();
    const fontSize = 12;
    let textX = 50;
    let textY = height - 4 * fontSize;

    page.drawText(`Date: ${this.dateAndTime}; Sport: ${this.selectedSport}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
    textY -= fontSize;

    // Home Organization
    page.drawText('Home Organization Information:', { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
    textY -= fontSize * 2;
    page.drawText(`Venue Name: ${this.homeOrganizationData.VenueName}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
    textY -= fontSize;
    page.drawText(`Facility Name: ${this.homeOrganizationData.FacilityName}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
    textY -= fontSize;
    page.drawText(`Organization Name: ${this.homeOrganizationData.OrganizationName}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
    textY -= fontSize;
    page.drawText(`Team Name: ${this.homeOrganizationData.TeamName}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
    textY -= fontSize;
    page.drawText(`Conference Relevance: ${this.homeOrganizationData.ConferenceRelevance}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
    textY -= fontSize;
    page.drawText(`Competition Level: ${this.homeOrganizationData.CompetitionLevel}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });

    // Away Organization
    textY -= fontSize * 2;
    page.drawText('Away Organization Information:', { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
    textY -= fontSize * 2;
    page.drawText(`Venue Name: ${this.awayOrganizationData.VenueName}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
    textY -= fontSize;
    page.drawText(`Facility Name: ${this.awayOrganizationData.FacilityName}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
    textY -= fontSize;
    page.drawText(`Organization Name: ${this.awayOrganizationData.OrganizationName}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
    textY -= fontSize;
    page.drawText(`Team Name: ${this.awayOrganizationData.TeamName}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
    textY -= fontSize;
    page.drawText(`Conference Relevance: ${this.awayOrganizationData.ConferenceRelevance}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
    textY -= fontSize;
    page.drawText(`Competition Level: ${this.awayOrganizationData.CompetitionLevel}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });

      // PAA messages
      if (this.welcomeMessage.enabled) {
        textY -= fontSize * 2;
        page.drawText(`Welcome Message: ${this.welcomeMessage.message}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
      }
      if (this.liveStream.enabled) {
        textY -= fontSize * 2;
        page.drawText(`Live Stream: ${this.liveStream.network}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
      }
      if (this.sportsmanship.enabled) {
        textY -= fontSize * 2;
        page.drawText(`Sportsmanship: ${this.sportsmanship.message}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
      }
      if (this.concessions.enabled) {
        textY -= fontSize * 2;
        page.drawText(`Concessions: ${this.concessions.message}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
      }
      if (this.merchandise.enabled) {
        textY -= fontSize * 2;
        page.drawText(`Merchandise: ${this.merchandise.message}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
      }
      if (this.referees.enabled) {
        textY -= fontSize * 2;
        page.drawText(`Referees: ${this.referees.message}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
      }
      if (this.endOfEvent.enabled) {
        textY -= fontSize * 2;
        page.drawText(`End of Event: ${this.endOfEvent.message}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
      }
      if (this.goodbyeMessage.enabled) {
        textY -= fontSize * 2;
        page.drawText(`Goodbye Message: ${this.goodbyeMessage.message}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
      }
      if (this.nextGameData.enabled) {
        textY -= fontSize * 2;
        page.drawText(`Next Game Data:`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
        textY -= fontSize;
        page.drawText(`Date: ${this.nextGameData.date}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
        textY -= fontSize;
        page.drawText(`Opponent Name: ${this.nextGameData.nextOpponentName}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
        textY -= fontSize;
        page.drawText(`Opponent Mascot: ${this.nextGameData.nextOpponentMascot}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
        textY -= fontSize;
        page.drawText(`Game Location: ${this.nextGameData.nextGameLocation}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
      }
      if (this.prayer.enabled) {
        textY -= fontSize * 2;
        page.drawText(`Prayer: ${this.prayer.personPraying}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
      }
      if (this.nationalAnthem.enabled) {
        textY -= fontSize * 2;
        page.drawText(`National Anthem: ${this.nationalAnthem.personSinging}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
      }

      // Add roster data if enabled
if (this.rosters.homeRosterEnabled) {
    textY -= fontSize * 2;
    page.drawText('Home Roster:', { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });

    textY -= fontSize * 2;
    page.drawText(`Coach Name: ${this.homeOrganizationData.Roster.coachName}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });

    // Iterate through players
    this.homeOrganizationData.Roster.roster.forEach((player, index) => {
        textY -= fontSize * 2;
        page.drawText(`Player ${index + 1}:`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
        textY -= fontSize;
        page.drawText(`Name: ${player.playerName}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
        textY -= fontSize;
        page.drawText(`Position: ${player.playerPosition}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
        textY -= fontSize;
        page.drawText(`Number: ${player.playerNumber}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
        textY -= fontSize;
        page.drawText(`Starting: ${player.playerIsStarting ? 'Yes' : 'No'}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
    });
}

if (this.rosters.awayRosterEnabled) {
    textY -= fontSize * 2;
    page.drawText('Away Roster:', { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });

    textY -= fontSize * 2;
    page.drawText(`Coach Name: ${this.awayOrganizationData.Roster.coachName}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });

    // Iterate through players
    this.awayOrganizationData.Roster.roster.forEach((player, index) => {
        textY -= fontSize * 2;
        page.drawText(`Player ${index + 1}:`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
        textY -= fontSize;
        page.drawText(`Name: ${player.playerName}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
        textY -= fontSize;
        page.drawText(`Position: ${player.playerPosition}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
        textY -= fontSize;
        page.drawText(`Number: ${player.playerNumber}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
        textY -= fontSize;
        page.drawText(`Starting: ${player.playerIsStarting ? 'Yes' : 'No'}`, { x: textX, y: textY, size: fontSize, color: rgb(0, 0, 0) });
    });
}

      // Save the PDF document as a blob
      const pdfBytes = await pdfDoc.save();

      // Trigger download
      this.downloadFile(pdfBytes);
    },
    downloadFile(pdfBytes) {
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'script.pdf';
      link.click();
    },
  },
  computed: {
    ...mapGetters(['organizations']),
  },
  mounted() {
    console.log(this.organizations);

    console.log("Params: " + this.$route.query.selectedSport);
    const routeParameter = this.$route.query.selectedSport;

    if(routeParameter) {
      this.selectedSport = routeParameter;
    }
  },
}
</script>

<style scoped>
.custom-font {
  font-family: 'Parisienne', sans-serif;
}

.dropdown-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
}

select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 1px solid #ccc;
  padding: 8px;
  font-size: 16px;
  width:100%;
  box-sizing: border-box;
  background-color: #fff;
  cursor: pointer;
  margin-bottom: 20px;
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

input[type="date"] {
  border: 1px solid #ccc; /* Thin border */
  padding: 5px; /* Optional: Add some padding */
}

.v-text-field {
  width: 100%;
}

</style>