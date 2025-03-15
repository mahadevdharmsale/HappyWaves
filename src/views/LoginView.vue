<script setup lang="ts">
import ApiService from '@/api/apiutils/ApiService';
import type { LoginRequest } from '@/api/models/login/LoginRequest';
import type { PhoneNoVerificationRequest } from '@/api/models/login/PhoneNoVerificationRequest';
import DefaultButton from '@/components/DefaultButton.vue'
import LoadingComponent from '@/components/LoadingComponent.vue';
import router from '@/router';
import Storage from '@/utils/Storage';
import Validations from '@/utils/Validations';
import type { ToastMessageOptions } from 'primevue';
import { useToast } from "primevue/usetoast"
import { ref } from 'vue';
import * as pack from '../../package.json'

const toast = useToast();
const isLoading = ref(false)
const phoneNumber = ref();
const enteredOTP = ref('');
const otpRequested = ref(false)


if(import.meta.env.VITE_ENVIRONMENT == 'development'){
  phoneNumber.value = '7406492844'
  enteredOTP.value = '123456'
}

function requestOTP() {
  if (!phoneNumber.value ) {
    showToast('Error', 'Phone number cannot be blank', 'error');
    return;
  }
  if (!Validations.validateNumber(phoneNumber.value)) {
    showToast('Error', 'Invalid Phone Number', 'error');
    return;
  }
  if (phoneNumber.value.length != 10 ) {
    showToast('Error', 'Please enter 10 digit Phone Number', 'error');
    return;
  }
  isLoading.value = true
  const request: PhoneNoVerificationRequest ={
    phoneNumber: phoneNumber.value
  }
  setTimeout(() => {
    isLoading.value = false
    otpRequested.value = true
  }, 2000);
}

function submitOTP() {
  if (!enteredOTP.value ) {
    showToast('Error', 'Enter OTP', 'error');
    return;
  }
  if (!Validations.validateNumber(enteredOTP.value)) {
    showToast('Error', 'Invalid OTP', 'error');
    return;
  }
  if (enteredOTP.value.length != 6 ) {
    showToast('Error', 'Please enter 6 digit OTP', 'error');
    return;
  }
  isLoading.value = true

  const request: LoginRequest = {
    phoneNumber: phoneNumber.value,
    otp: enteredOTP.value
  }
  setTimeout(() => {
    isLoading.value = false
    router.push({ name: 'dashboard' })
  }, 2000);

}
function resendOTP() {
  requestOTP()
}

function changePhoneNumber() {
  otpRequested.value = false;
  enteredOTP.value = '';
}

function showToast(summary: string, detail: string, severity: ToastMessageOptions['severity']) {
  toast.add({
    severity,
    summary,
    detail,
    life: 5000,
  });
}
</script>

<template>
  <main class="flex items-center justify-center min-h-screen bg-white/40">
    <Toast class="toast-msg" />
    <LoadingComponent :dialogVisibility="isLoading" text="Please wait while we process the request!" />
      <div class="flex items-center justify-evenly w-full max-w-8xl overflow-hidden">

        <div class="hidden md:block w-1/4 h-full">
          <img src="/src/assets/clogo.png" alt="Cruieseon Cars" class="w-full h-full object-cover" />
        </div>

        <div class="md:w-1/4  p-1">
          <Card class="w-full max-w-lg" style="padding: 1rem; --p-card-shadow: 0 0px 10px 0px rgba(0, 0, 0, 0.425);">
            <template #title>
              <h2 class="text-xl font-semibold text-gray-900">Admin Login</h2>
            </template>

            <template #content>

              <div class="login-card mt-6">

                <!-- Phone Number Field with Icon -->
                <InputGroup v-if="!otpRequested">
                  <InputGroupAddon>+91</InputGroupAddon>
                  <FloatLabel variant="on">
                    <InputText
                      id="phoneNumber"
                      v-model="phoneNumber"
                      placeholder=""
                      @keydown.enter="requestOTP"
                      class="input-text"
                    />
                    <label for="phoneNumber">Phone Number</label>
                  </FloatLabel>
                </InputGroup>
                <p v-if="!otpRequested" class="text-gray-500 text-sm">
                  We'll send a verification code to this number.
                </p>
                <DefaultButton
                  v-if="!otpRequested"
                  title="Request OTP"
                  @click="requestOTP"
                  class="w-full"
                />
                <p v-if="!otpRequested" class="text-center">--OR--</p>

                <DefaultButton
                  v-if="!otpRequested"
                  title="Sign in with Google"
                  brand="google"
                  :outlined="true"
                  @click="requestOTP"
                  class="w-full"
                />

                <!-- OTP Input and Options -->
                <div v-if="otpRequested" class="mt-0 ">

                <p class="text-green-800 text-sm">
                 OTP has been sent to mobile no +91 {{ phoneNumber }}.
                </p>
                  <label for="otp" class="block text-gray-700">Enter OTP</label>
                  <InputOtp
                    v-model="enteredOTP"
                    integerOnly
                    class="input-text"
                    :length="6"
                    @keydown.enter="submitOTP"
                  />

                  <!-- Resend OTP and Change Phone Number Options -->
                  <div class="flex justify-between items-center mt-4">
                    <button
                      @click="resendOTP"
                      class="text-blue-500 hover:underline"
                      :disabled="!otpRequested"
                    >
                      Resend OTP
                    </button>
                    <button
                      @click="changePhoneNumber"
                      class="text-blue-500 hover:underline"
                    >
                      Change Phone Number
                    </button>
                  </div>

                  <!-- Login Button -->
                  <DefaultButton
                    title="Login"
                    @click="submitOTP"
                    class="mt-4 w-full"
                  />
                </div>
              </div>
            </template>
          </Card>
      </div>
    </div>

    <!-- Footer -->
    <div class="absolute bottom-4 flex flex-col md:flex-row justify-center md:justify-between items-center w-full px-4 text-gray-200 text-md">
      <div class="flex-1 hidden md:block"></div> <!-- Spacer for larger screens -->
      <p class="text-center md:text-left">v {{ pack.version }}</p>
      <p class="mt-2 md:mt-0 md:flex-1 md:text-right text-gray-700 ">Powered by <b style="font-weight:600;" class="text-gray-900">Matrex Softwares</b></p>
    </div>
  </main>
</template>

<style>
.toast-msg {
  border-radius: 5rem !important;
}
.login-card {
  margin: 1rem 0;
  display: grid;
  gap: 1rem;
}
</style>
