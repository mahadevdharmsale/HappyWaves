<script setup lang="ts">
import { ref } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { useToast } from "primevue/usetoast";
import FloatLabel from 'primevue/floatlabel';

// Data for password fields
const oldPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

const toast = useToast();

// Function to handle Save Changes
const saveChanges = () => {
  if (!oldPassword.value || !newPassword.value || !confirmPassword.value) {
    toast.add({
      severity: "error",
      summary: "Validation Error",
      detail: "Please fill all fields",
      life: 3000,
    });
    return;
  }

  if (newPassword.value !== confirmPassword.value) {
    toast.add({
      severity: "error",
      summary: "Mismatch Error",
      detail: "New Password and Confirm Password do not match",
      life: 3000,
    });
    return;
  }

  toast.add({
    severity: "success",
    summary: "Password Changed",
    detail: "Your password has been successfully updated",
    life: 3000,
  });

  // Reset fields (Optional, adjust as needed)
  oldPassword.value = "";
  newPassword.value = "";
  confirmPassword.value = "";
};

// Function to handle Cancel
const cancelChanges = () => {
  oldPassword.value = "";
  newPassword.value = "";
  confirmPassword.value = "";
};
</script>

<template>
  <div class="doctor-card p-5 rounded-card">
    <!-- Page Title -->
    <div class="page-title mb-5">
      <h1 class="text-2xl font-semibold text-gray-800">Change Password</h1>
    </div>

    <!-- Password Form -->
    <div class="password-form bg-white p-4 rounded-lg shadow-md">
      <div class="form-grid grid gap-4">
        <!-- Old Password Field -->
        <FloatLabel>
          <InputText id="oldPassword" type="password" v-model="oldPassword" class="w-full short-input" />
          <label for="oldPassword">Old Password</label>
        </FloatLabel>

        <!-- New Password Field -->
        <FloatLabel>
          <InputText id="newPassword" type="password" v-model="newPassword" class="w-full short-input" />
          <label for="newPassword">New Password</label>
        </FloatLabel>

        <!-- Confirm Password Field -->
        <FloatLabel>
          <InputText id="confirmPassword" type="password" v-model="confirmPassword" class="w-full short-input" />
          <label for="confirmPassword">Confirm Password</label>
        </FloatLabel>
         <!-- Action Buttons -->
    <div class="action-buttons mt-5 flex justify-end gap-4">
      <Button label="Cancel" class="p-button-secondary" @click="cancelChanges" />
      <Button label="Save Changes" class="p-button-success" @click="saveChanges" />
    </div>
      </div>
    </div>

   
  </div>
</template>

<style scoped>
.change-password {
  max-width: 400px; /* Adjust max width to make the form compact */
  margin: 0 auto;
}

.form-grid {
  display: grid;
  gap: 2rem; /* Spacing between rows */
}

.short-input {
  max-width: 30%; /* Keeps inputs compact yet scalable */
}

button {
  cursor: pointer;
}
</style>
