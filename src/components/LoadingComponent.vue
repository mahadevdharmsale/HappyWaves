<template>
  <div>
    <Dialog :visible="dialogVisibility" modal :closable="false" position="center"
            :block-scroll="true" :draggable="false">
      <div class="dialog-content">
        <span class="loader"><span class="loader-inner"></span></span>
      </div>
      <div class="dialog-header">
        <h4>{{ text }}</h4>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  dialogVisibility: {
    type: Boolean,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.dialog-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  padding: 1.5rem;
}

.dialog-header {
  margin-top: 1rem;
  font-size: 1.2rem;
  text-align: center;
}

.loader {
  display: inline-block;
  position: relative;
  height: 40px;
  width: 40px;
  border: 6px solid #002F6D;
  top: 50%;
  animation: loader 2s infinite ease;
}

.loader-inner {
  vertical-align: top;
  display: inline-block;
  width: 100%;
  background-color: #002F6D;
  animation: loader-inner 2s infinite ease-in;
}

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(180deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes loader-inner {
  0% {
    height: 0%;
    width: 20px;
    height: 20px;
  }

  25% {
    height: 0%;
    width: 30px;
    height: 30px;
  }

  50% {
    height: 100%;
    width: 35px;
    height: 35px;
  }

  75% {
    height: 100%;
    width: 40px;
    height: 40px;
  }

  100% {
    height: 0%;
    width: 20px;
    height: 20px;
  }
}
</style>
