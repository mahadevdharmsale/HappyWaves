<script setup lang="ts">
import ApiService from '@/api/apiutils/ApiService';
import type { LoginRequest } from '@/api/models/login/LoginRequest';
import DefaultButton from '@/components/DefaultButton.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import router from '@/router';
import Storage from '@/utils/Storage';
import Validations from '@/utils/Validations';
import type { ToastMessageOptions } from 'primevue';
import { useToast } from "primevue/usetoast";
import { ref } from 'vue';
import * as pack from '../../package.json';
import Dropdown from 'primevue/dropdown';


const toast = useToast();
const isLoading = ref(false);
const phoneNumber = ref('');
const password = ref('');
const loginType = ref('Offline');

if (import.meta.env.VITE_ENVIRONMENT == 'development') {
  phoneNumber.value = '7406492844';
  password.value = 'password123';
}

function login() {
  if (!phoneNumber.value || !password.value) {
    showToast('Error', 'Phone number and password cannot be blank', 'error');
    return;
  }
  if (!Validations.validateNumber(phoneNumber.value) || phoneNumber.value.length !== 10) {
    showToast('Error', 'Invalid Phone Number', 'error');
    return;
  }
  if (password.value.length < 6) {
    showToast('Error', 'Password must be at least 6 characters', 'error');
    return;
  }

  isLoading.value = true;
  const request: LoginRequest = {
    phoneNumber: phoneNumber.value,
    password: password.value,
    loginType: loginType.value,
  };

  setTimeout(() => {
    isLoading.value = false;
    router.push({ name: 'dashboard' });
  }, 2000);
}

function showToast(summary: string, detail: string, severity: ToastMessageOptions['severity']) {
  toast.add({ severity, summary, detail, life: 5000 });
}
</script>

<template>
  <main class="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat px-4 md:px-8 lg:px-16" style="background-image: url('/src/assets/Hospital.jpeg');">
    <div class="absolute inset-0 bg-blue-200 bg-opacity-10"></div>
    <Toast class="toast-msg" />
    <LoadingComponent :dialogVisibility="isLoading" text="Logging in..." />
    <div class="flex items-center justify-evenly w-full max-w-8xl overflow-hidden">
      <div class="hidden md:block md:w-1/3 lg:w-1/4">
        <img src="/src/assets/Happy_waves.png" alt="Company Logo" class="w-full h-auto brightness-125" />
      </div>
      <div class="w-full md:w-1/2 lg:w-1/3 p-8 bg-white shadow-2xl rounded-2xl backdrop-blur-md bg-opacity-90 border border-gray-200">
        <h2 class="text-3xl font-bold text-gray-900 text-center mb-8">Admin Login</h2>
        <div class="space-y-6">
          <InputGroup>
            <InputGroupAddon class="font-bold text-gray-700">+91</InputGroupAddon>
            <FloatLabel>
              <InputText v-model="phoneNumber" placeholder="" class="w-full text-lg py-3 px-4 border rounded-lg" @keydown.enter="login" />
              <label class="text-gray-500">Phone Number</label>
            </FloatLabel>
          </InputGroup>
          <FloatLabel>
            <InputText type="password" v-model="password" placeholder="" class="w-full text-lg py-3 px-4 border rounded-lg" @keydown.enter="login" />
            <label class="text-gray-500">Password</label>
          </FloatLabel>
          <FloatLabel>
            <Dropdown v-model="loginType" :options="['Online', 'Offline']" class="w-full text-lg  px-4 border rounded-lg" />
            <label class="text-gray-500">Login Type</label>
          </FloatLabel>
          <DefaultButton title="Login" @click="login" class="w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800" />
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.toast-msg {
  border-radius: 5rem !important;
}
</style>
