<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import Calendar from "primevue/calendar";
import DefaultButton from "@/components/DefaultButton.vue";
import Conversion from "@/utils/Conversions"; // Import Conversion class

// Initialize doctor availability
const availableTimings = ref<{ dateRange: string; startTime: string; endTime: string }[]>([
  { dateRange: "20 Mar 2025 - 22 Mar 2025", startTime: "09:00 AM", endTime: "05:00 PM" },
  { dateRange: "25 Mar 2025 - 27 Mar 2025", startTime: "10:00 AM", endTime: "04:00 PM" },
]);

// Temporary variables for adding new availability
const dateRange = ref<Date[] | null>(null);
const startTime = ref<Date | null>(null);
const endTime = ref<Date | null>(null);
const toast = useToast();

// Function to format the date range using Conversion.toDateFormat
const formatDateRange = (range: Date[] | null) => {
  if (!range || range.length < 2) return "";
  return `${Conversion.toDateFormat(range[0].getTime())} - ${Conversion.toDateFormat(range[1].getTime())}`;
};

// Function to format time as AM/PM
const formatTime = (time: Date | null) => {
  if (!time) return "";
  return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
};

// Function to validate and add a new timing
const addTiming = () => {
  if (!dateRange.value || !startTime.value || !endTime.value) {
    toast.add({
      severity: "error",
      summary: "Validation Error",
      detail: "Please fill all required fields",
      life: 3000,
    });
    return;
  }

  // Validate date range (must be today or future)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (dateRange.value[0] < today || dateRange.value[1] < today) {
    toast.add({
      severity: "error",
      summary: "Invalid Date Range",
      detail: "Selected dates must be today or in the future.",
      life: 3000,
    });
    return;
  }

  // Ensure start and end times are different
  if (startTime.value.getTime() === endTime.value.getTime()) {
    toast.add({
      severity: "error",
      summary: "Invalid Time Selection",
      detail: "Start time and end time cannot be the same.",
      life: 3000,
    });
    return;
  }

  // Ensure end time is after start time within the same day
  const startHour = startTime.value.getHours();
  const startMinutes = startTime.value.getMinutes();
  const endHour = endTime.value.getHours();
  const endMinutes = endTime.value.getMinutes();

  if (endHour < startHour || (endHour === startHour && endMinutes <= startMinutes)) {
    toast.add({
      severity: "error",
      summary: "Invalid Time Selection",
      detail: "End time must be later than start time on the same day.",
      life: 3000,
    });
    return;
  }

  // Check for duplicate date ranges
  const newDateRange = formatDateRange(dateRange.value);
  const isDuplicate = availableTimings.value.some((timing) => timing.dateRange === newDateRange);

  if (isDuplicate) {
    toast.add({
      severity: "error",
      summary: "Duplicate Entry",
      detail: "This date range is already added.",
      life: 3000,
    });
    return;
  }

  // Add new timing
  availableTimings.value.push({
    dateRange: newDateRange,
    startTime: formatTime(startTime.value),
    endTime: formatTime(endTime.value),
  });

  toast.add({
    severity: "success",
    summary: "Success",
    detail: "Availability added successfully",
    life: 3000,
  });

  // Reset form fields
  dateRange.value = null;
  startTime.value = null;
  endTime.value = null;
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
    <!-- Toast Messages -->
    <Toast />

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
              <th class="p-3 border-b">Date Range</th>
              <th class="p-3 border-b">Start Time</th>
              <th class="p-3 border-b">End Time</th>
              <th class="p-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(timing, index) in availableTimings" :key="index">
              <td class="p-3 border-b">{{ timing.dateRange }}</td>
              <td class="p-3 border-b">{{ timing.startTime }}</td>
              <td class="p-3 border-b">{{ timing.endTime }}</td>
              <td class="p-3 border-b">
                <button class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" @click="removeTiming(index)">
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
          <label for="dateRange" class="font-semibold block mb-2">Date Range</label>
          <Calendar id="dateRange" v-model="dateRange" selectionMode="range" :manualInput="false" class="w-full" :minDate="new Date()" />
        </div>
        <div>
          <label for="startTime" class="font-semibold block mb-2">Start Time</label>
          <Calendar id="startTime" v-model="startTime" timeOnly hourFormat="12" class="w-full" />
        </div>
        <div>
          <label for="endTime" class="font-semibold block mb-2">End Time</label>
          <Calendar id="endTime" v-model="endTime" timeOnly hourFormat="12" class="w-full" />
        </div>
      </div>
      <div class="flex justify-end gap-3 mt-4">
        <DefaultButton @click="addTiming" title="Add Availability" icon="fa-solid fa-plus" />
      </div>
    </div>
  </div>
</template>
