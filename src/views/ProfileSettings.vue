<script setup lang="ts">
import { ref } from 'vue';
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

// Data for Profile Settings
const profile = ref({
  profileImage: null,
  firstName: "Dr. MD Shakir",
  lastName: "",
  designation: "",
  phoneNumber: "9844121711",
  emailAddress: "9844121711@gmail.com",
});

// Function to handle Save Changes
const saveChanges = () => {
  console.log("Profile Saved:", profile.value);
  // Add logic here to save profile changes to a backend server
};
</script>

<template>
  <div class="doctor-card p-5 rounded-card">
    <!-- Page Title -->
    <div class="page-title mb-5">
      <h1 class="text-2xl font-semibold text-gray-800">Profile Settings</h1>
    </div>

    <!-- Profile Image Section -->
    <div class="profile-image-section flex items-center mb-5">
      <div>
        <img
          :src="profile.profileImage ? URL.createObjectURL(profile.profileImage) : '/path/to/default-image.png'"
          alt="Profile Image"
          class="w-24 h-24 rounded-full shadow-md"
        />
      </div>
      <div class="ml-5">
        <label class="font-semibold block mb-2">Upload New</label>
        <FileUpload
          name="profileImage"
          mode="basic"
          accept="image/*"
          maxFileSize="1000000"
          @select="e => (profile.profileImage = e.files[0])"
          chooseLabel="Upload New"
        />
      </div>
    </div>

    <!-- Profile Information Section -->
    <div class="profile-information bg-white p-4 rounded-lg shadow-md">
      <h2 class="text-lg font-semibold mb-3 text-gray-700">Information</h2>
      <div class="form grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="firstName" class="font-semibold block mb-2">First Name *</label>
          <InputText id="firstName" v-model="profile.firstName" class="w-full" />
        </div>
        <div>
          <label for="lastName" class="font-semibold block mb-2">Last Name *</label>
          <InputText id="lastName" v-model="profile.lastName" class="w-full" />
        </div>
        <div>
          <label for="designation" class="font-semibold block mb-2">Designation *</label>
          <InputText id="designation" v-model="profile.designation" class="w-full" />
        </div>
        <div>
          <label for="phoneNumber" class="font-semibold block mb-2">Phone Numbers *</label>
          <InputText id="phoneNumber" v-model="profile.phoneNumber" class="w-full" />
        </div>
        <div>
          <label for="emailAddress" class="font-semibold block mb-2">Email Address *</label>
          <InputText id="emailAddress" v-model="profile.emailAddress" type="email" class="w-full" />
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="save-button mt-5 flex justify-end">
      <Button label="Save Changes" icon="pi pi-save" class="p-button-success" @click="saveChanges" />
    </div>
  </div>
</template>

<style scoped>
.profile-settings {
  max-width: 600px;
  margin: 0 auto;
}

.profile-image-section img {
  display: block;
  object-fit: cover;
  border-radius: 50%;
}

label {
  font-weight: bold;
  color: #333;
}
</style>
