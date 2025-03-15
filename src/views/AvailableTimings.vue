<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from "primevue/usetoast";
import DefaultButton from "@/components/DefaultButton.vue";

// Initialize doctor availability
const availableTimings = ref<{ day: string; startTime: string; endTime: string }[]>([
  { day: "Monday", startTime: "09:00 AM", endTime: "05:00 PM" },
  { day: "Wednesday", startTime: "10:00 AM", endTime: "04:00 PM" },
]);

// Temporary variables for adding new availability
const selectedDay = ref<string>();
const startTime = ref<string>();
const endTime = ref<string>();

const toast = useToast();

// Function to add a new timing
const addTiming = () => {
  if (!selectedDay.value || !startTime.value || !endTime.value) {
    toast.add({
      severity: "error",
      summary: "Validation Error",
      detail: "Please fill all required fields",
      life: 3000,
    });
    return;
  }

  // Add to availability list
  availableTimings.value.push({
    day: selectedDay.value,
    startTime: startTime.value,
    endTime: endTime.value,
  });

  toast.add({
    severity: "success",
    summary: "Success",
    detail: "Availability added successfully",
    life: 3000,
  });

  // Reset fields
  selectedDay.value = "";
  startTime.value = "";
  endTime.value = "";
};

// Function to remove an existing timing
const removeTiming = (index: number) => {
  availableTimings.value.splice(index, 1);
  toast.add({
    severity: "warn",
    summary: "Removed",
    detail: "Availability removed",
    life: 3000,
  });
};
</script>

<template>
  <div class="doctor-card p-5 rounded-card">
    <!-- Page Title -->
    <div class="page-title mb-5">
      <h1 class="text-2xl font-semibold text-gray-800">Manage Availability</h1>
    </div>

    <!-- Current Availability Section -->
    <div class="current-availability mt-4">
      <h2 class="text-lg font-semibold mb-3 text-gray-700">Current Availability</h2>
      <div v-if="availableTimings.length" class="availability-list bg-white p-4 rounded-lg shadow-md">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-100">
              <th class="p-3 border-b">Day</th>
              <th class="p-3 border-b">Start Time</th>
              <th class="p-3 border-b">End Time</th>
              <th class="p-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(timing, index) in availableTimings" :key="index">
              <td class="p-3 border-b">{{ timing.day }}</td>
              <td class="p-3 border-b">{{ timing.startTime }}</td>
              <td class="p-3 border-b">{{ timing.endTime }}</td>
              <td class="p-3 border-b">
                <button
                  class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  @click="removeTiming(index)"
                >
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else class="text-gray-600">No availability has been added yet.</p>
    </div>

    <!-- Add New Timing Section -->
    <div class="add-availability mt-8">
      <h2 class="text-lg font-semibold mb-3 text-gray-700">Add Availability</h2>
      <div class="form grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow-md">
        <div>
          <label for="day" class="font-semibold block mb-2">Day</label>
          <Dropdown
            id="day"
            v-model="selectedDay"
            :options="['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']"
            placeholder="Select Day"
            class="w-full"
          />
        </div>
        <div>
          <label for="startTime" class="font-semibold block mb-2">Start Time</label>
          <InputText id="startTime" v-model="startTime" placeholder="e.g., 09:00 AM" class="w-full" />
        </div>
        <div>
          <label for="endTime" class="font-semibold block mb-2">End Time</label>
          <InputText id="endTime" v-model="endTime" placeholder="e.g., 05:00 PM" class="w-full" />
        </div>
      </div>
      <div class="flex justify-end gap-3 mt-4">
        <DefaultButton @click="addTiming" title="Add Availability" icon="fa-solid fa-plus" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.available-timings {
  max-width: 900px;
  margin: 0 auto;
}

.availability-list {
  margin-top: 1.5rem;
}

form {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

button {
  cursor: pointer;
}
</style>
