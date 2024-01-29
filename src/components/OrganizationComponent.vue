<template>
    <div>
      <form @submit.prevent="submitForm">
        <div>
          <label for="venueName">Venue Name:</label>
          <input type="text" id="venueName" v-model="formData.VenueName">
          <span v-if="!isValidAlphabetic(formData.VenueName)" class="error-message">
            The Venue Name should only have alphabetic characters.
          </span>
        </div>
        <div>
          <label for="facilityName">Facility Name:</label>
          <input type="text" id="facilityName" v-model="formData.FacilityName">
          <span v-if="!isValidAlphabetic(formData.FacilityName)" class="error-message">
            The Facility Name should only have alphabetic characters.
          </span>
        </div>
        <div>
          <label for="organizationName">Organization Name:</label>
          <input type="text" id="organizationName" v-model="formData.OrganizationName">
          <span v-if="!isValidAlphabetic(formData.OrganizationName)" class="error-message">
            The Organization Name should only have alphabetic characters.
          </span>
        </div>
        <div>
          <label for="teamName">Team Name:</label>
          <input type="text" id="teamName" v-model="formData.TeamName">
          <span v-if="!isValidAlphabetic(formData.TeamName)" class="error-message">
            The Team Name should only have alphabetic characters.
          </span>
        </div>
        <div>
        <label for="conferenceRelevance">Conference Relevance:</label>
        <select id="conferenceRelevance" v-model="formData.ConferenceRelevance">
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
          <input type="text" id="competitionLevel" v-model="formData.CompetitionLevel">
          <span v-if="!isValidAlphaNumeric(formData.CompetitionLevel)" class="error-message">
            The Competition Level should only have alpha-numeric characters.
          </span>
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
        formData: {
          VenueName: '',
          FacilityName: '',
          OrganizationName: '',
          TeamName: '',
          ConferenceRelevance: '',
          CompetitionLevel: ''
        },
        defaultId: '92b9eebb-3ee4-44c3-8a68-17f2c980a271'
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
        if (!this.isValidAlphabetic(this.formData.TeamName)) {
          return; // Don't submit if Team Name is invalid
        }
        if (!this.isValidAlphabetic(this.formData.VenueName)) {
            return;
        }
        if (!this.isValidAlphabetic(this.formData.FacilityName)) {
            return;
        }
        if (!this.isValidAlphabetic(this.formData.OrganizationName)) {
            return;
        }
        if (!this.isValidAlphaNumeric(this.formData.CompetitionLevel)) {
          return; // Don't submit if Competition Level is invalid
        }
  
        // Generate OrganizationID
        const OrganizationID = uuidv4();
  
        // Prepare data to send
        const dataToSend = {
          Model: {
            OrganizationID,
            Rosters: [], // Empty array
            ...this.formData // Spread other form data
          },
          Id: this.defaultId
        };
  
        try {
          // Make Axios call
          const response = await axios.post('https://localhost:7273/profile/create/organization', dataToSend);
          console.log(response.data);

          // Clear the data
          this.clearFormData();
        } catch (error) {
          console.error('Error:', error);
        }
      },
      clearFormData() {
        this.formData = {
        VenueName: '',
        FacilityName: '',
        OrganizationName: '',
        TeamName: '',
        ConferenceRelevance: '',
        CompetitionLevel: ''
      };
      }
    }

  };
  </script>
  
  <style>
  .error-message {
    color: red;
    font-size: 0.8rem;
  }
  </style>
  