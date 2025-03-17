<script setup lang="ts">
import { onMounted } from 'vue';
import router from './router';


onMounted (() => {
  router.push({
    name: 'login'
  })
})
</script>



<template>
<!--  All the UI code should start from HomeView.vue. This components should be used only for global changes.-->
  <RouterView/>
</template>
