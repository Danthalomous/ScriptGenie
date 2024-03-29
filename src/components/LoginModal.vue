<!-- LoginModal.vue -->
<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">X</button>
      <div class="tab-buttons">
        <button :class="{ active: activeTab === 'login' }" @click="setActiveTab('login')">Login</button>
        <button :class="{ active: activeTab === 'register' }" @click="setActiveTab('register')">Register</button>
      </div>
      <form v-if="activeTab === 'login'" @submit.prevent="login">
        <div>
          <input 
            type="text" 
            v-model="email" 
            required 
            placeholder="Email"
            class="custom-input"
          >
        </div>
        <div class="input-group">
          <input 
            type="password" 
            v-model="password" 
            required 
            placeholder="Password"
            class="custom-input"
          >
        </div>
        <br>
        <button type="submit" class="submit-button"><p class="custom-font-color">Login</p></button>
        <br>
        <p align="right" class="custom-font-color">Forgot Password?</p>
      </form>
      <!-- Register Form -->
      <form v-if="activeTab === 'register'" @submit.prevent="register">
        <div class="input-group">
          <input 
            type="text" 
            v-model="email" 
            @input="validateEmail"
            required 
            placeholder="Email"
            class="custom-input"
          >
        </div>
        <!-- Display email format error message -->
        <div v-if="emailFormatError" class="alert-box error-box">Email is invalid</div>
        <div class="input-group">
          <input 
            type="password" 
            v-model="password"
            @input="validatePassword" 
            required 
            placeholder="Password"
            class="custom-input"
          >
        </div>
        <!-- Display password format error messages -->
        <div v-if="passwordLengthError" class="alert-box error-box">Password needs to be 6-18 characters long</div>
        <div v-if="passwordSpecialCharError" class="alert-box error-box">Password needs to have at least one special character: @ $ % & *</div>
        <div v-if="passwordCapitalError" class="alert-box error-box">Password needs to have at least one capital letter</div>
        <div v-if="passwordNumberError" class="alert-box error-box">Password needs to have at least one number 0-9</div>
        <div class="input-group">
          <input 
            type="password" 
            v-model="confirmPassword"
            @input="validateConfirmPassword" 
            required 
            placeholder="Confirm Password"
            class="custom-input"
          >
        </div>
        <!-- Display confirm password error message -->
        <div v-if="confirmPasswordError" class="alert-box error-box">Passwords do not match</div>
        <br>
        <button type="submit" class="submit-button"><p class="custom-font-color">Register</p></button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    isVisible: Boolean,
  },
  data() {
    return {
      activeTab: 'login',
      email: '',
      password: '',
      confirmPassword: '',
      emailFormatError: false,
      passwordLengthError: false,
      passwordSpecialCharError: false,
      passwordCapitalError: false,
      passwordNumberError: false,
      confirmPasswordError: false,
    };
  },
  mounted() {
  },
  methods: {
    closeModal() {
      this.$emit('close'); // Emit an event to notify the parent
    },
    openModal() {
      // Additional logic here if needed
    },
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    async login() {
      try {
        const loginResponse = await axios.post('https://localhost:7273/login/ProcessLogin', {
          email: this.email,
          password: this.password,
        });

        const token = loginResponse.data.token; // Store the token locally

        // Get the user ID and store it
        const userIDResponse = await axios.get('https://localhost:7273/login/GetUserID?email=' + this.email);
        const userID = userIDResponse.data;

        // Use Vuex action to store the user ID
        this.$store.commit('setUserID', userID);

        // Use Vuex action to store the token
        this.$store.dispatch('login', token);

        this.closeModal();
      } catch (error) {
        console.error('Login failed:', error.message);
      }
    },
    async register() {
      try {
        // Check if password and confirm password match
        if (this.password !== this.confirmPassword) {
          this.confirmPasswordError = true;
          console.error("Passwords do not match");
          return;
        } else {
          this.confirmPasswordError = false;
        }

        // Validate email format
        if (!this.isValidEmail(this.email)) {
          this.emailFormatError = true;
          return;
        } else {
          this.emailFormatError = false;
        }

        // Validate password
        this.validatePassword(this.password);

        // Make a POST request to your backend API for registration
        const response = await axios.post('https://localhost:7273/register/ProcessRegister', {
          email: this.email,
          password: this.password,
        });

        // Handle the response as needed (e.g., store token)
        const token = response.data.token;
        console.log('Registration successful. Token:', token);

        // Optionally, you can automatically log in the user after registration
        await this.login();

        // Close the modal or perform other actions
        this.closeModal();
      } catch (error) {
        // Handle registration error
        console.error('Registration failed:', error.message);
      }
    },
    validatePassword() {
      // Reset password-related errors
      this.passwordLengthError = false;
      this.passwordSpecialCharError = false;
      this.passwordCapitalError = false;
      this.passwordNumberError = false;

      // Password length validation
      if ((this.password.length < 6 || this.password.length > 18) && this.password.length > 0) {
        this.passwordLengthError = true;
      }

      // Password special character validation
      if ((!/[!@#$%^&*]/.test(this.password)) && this.password.length > 0) {
        this.passwordSpecialCharError = true;
      }

      // Password capital letter validation
      if ((!/[A-Z]/.test(this.password)) && this.password.length > 0) {
        this.passwordCapitalError = true;
      }

      // Password number validation
      if ((!/\d/.test(this.password)) && this.password.length > 0) {
        this.passwordNumberError = true;
      }
    },
    validateEmail() {
      // Reset email format error
      this.emailFormatError = false;

      // Validate email format
      if ((!this.isValidEmail(this.email)) && this.email.length > 0) {
        this.emailFormatError = true;
      }
    },
    validateConfirmPassword() {
      // Reset confirm password error
      this.confirmPasswordError = false;

      // Validate if passwords match
      if ((this.password !== this.confirmPassword) && this.confirmPassword.length > 0) {
        this.confirmPasswordError = true;
      }
    },
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email) && email.length > 0;
    },
  },
  watch: {
    isVisible(value) {
      console.log('isVisible changed: ', value);
      if (value) {
        // If the modal becomes visible, emit an event to notify the parent
        this.$emit('open');
      }
    },
  },
};
</script>

<style scoped>
.custom-input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: white;
  box-sizing: border-box; /* Ensure padding is included in the width */
  margin-bottom: 10px; /* Adjust spacing between input fields */
}

.submit-button {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  background-color: #00D9FF;
  box-sizing: border-box; /* Ensure padding is included in the width */
  margin-bottom: 10px; /* Adjust spacing between input fields */
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* Ensure the modal is on top of other elements */
}

.modal-content {
  background: #F1F1F1;
  width: 325px;
  padding: 20px;
  border-radius: 8px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 18px;
  color: #000000;
  z-index: 1;
}

.tab-buttons {
  display: flex;
  margin-bottom: 10px;
}

.tab-buttons button {
  flex: 1;
  padding: 10px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
}

.tab-buttons button.active {
  background-color: #FF5964;
  color: #fff;
}

.alert-box {
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #d9534f;
  border-radius: 4px;
  color: #d9534f;
  background-color: #f2dede;
}

.error-box {
  color: #a94442;
  background-color: #f2dede;
  border-color: #ebccd1;
}

.custom-font-color {
  color: #FFFFFF;
}
</style>
