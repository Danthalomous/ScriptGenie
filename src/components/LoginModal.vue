<!-- LoginModal.vue -->
<template>
  <div ref="loginModal" v-if="isVisible" class="modal">
    <div class="modal-content">
      <h2>Login or Register</h2>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
    };
  },
  mounted() {
    console.log("LoginModal.vue was mounted");
  },
  methods: {
    closeModal() {
      this.isVisible = false;
    },
    openModal() {
      console.log("openModal called");
      this.isVisible = true;
    },
  },
  watch: {
    isVisible(value) {
      console.log('isVisible changed: ', value)
      if (value) {
        // If the modal becomes visible, emit an event to notify the parent
        this.$emit('open');
      }
    },
  },
};
</script>

<style scoped>
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
