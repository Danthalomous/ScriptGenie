<!-- App.vue -->
<template>
  <header>
    <h1 align="center">[TITLE]</h1>
    <div align="center" id="nav">
      <router-link to="/">home</router-link> |
      <router-link v-if="loggedIn" to="/profile"> profile</router-link> |
      <router-link to="/about"> about</router-link> |
      <div @click="toggleModal">login/register</div>
      <div v-if="showLoginModal" class="modal">
        <div class="modal-content">
          <h2>Login</h2>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" placeholder="Enter your email" />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" placeholder="Enter your password" />
          </div>
          <button @click="closeModal">Close</button>
        </div>
      </div>
    </div>
    <router-view/>
  </header>
</template>

<script>
export default {
  data() {
    return {
      showLoginModal: false,
      loggedIn: true,
    };
  },
  methods: {
    toggleModal() {
      console.log("Toggle modal called");
      this.showLoginModal = !this.showLoginModal;
    },
    closeModal() {
      this.showLoginModal = false;
    },
  },
};
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
}
</style>
