<script setup lang="ts">
import { ref } from 'vue';

// Dummy data for Upcoming Appointments
const upcomingAppointments = ref([
  {
    patient: "John Doe",
    appointmentDate: "2025-03-15",
    appointmentTime: "10:00 AM",
  },
  {
    patient: "Jane Smith",
    appointmentDate: "2025-03-16",
    appointmentTime: "2:00 PM",
  },
  {
    patient: "Michael Brown",
    appointmentDate: "2025-03-17",
    appointmentTime: "11:30 AM",
  },
]);

// Dummy data for Total Appointments
const totalAppointments = ref([
  {
    patient: "Chris Evans",
    appointmentDate: "2025-03-10",
    appointmentTime: "9:00 AM",
  },
  {
    patient: "Scarlett Johansson",
    appointmentDate: "2025-03-11",
    appointmentTime: "10:15 AM",
  },
  {
    patient: "Robert Downey Jr.",
    appointmentDate: "2025-03-12",
    appointmentTime: "3:00 PM",
  },
  {
    patient: "Tom Holland",
    appointmentDate: "2025-03-13",
    appointmentTime: "1:45 PM",
  },
]);
</script>

<template>
  <div class="doctor-card p-5 rounded-card">
    <!-- Page Title -->
    <div class="page-title mb-5">
      <h1 class="text-2xl font-semibold text-gray-800">Manage Appointments</h1>
    </div>

    <!-- Upcoming Appointments Section -->
    <div class="upcoming-appointments mt-4">
      <h2 class="text-lg font-semibold mb-3 text-gray-700">Upcoming Appointments</h2>
      <div class="appointment-list bg-white p-4 rounded-lg shadow-md">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-100">
              <th class="p-3 border-b">Patient</th>
              <th class="p-3 border-b">Appointment Date</th>
              <th class="p-3 border-b">Appointment Time</th>
              <th class="p-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(appointment, index) in upcomingAppointments" :key="index">
              <td class="p-3 border-b">{{ appointment.patient }}</td>
              <td class="p-3 border-b">{{ appointment.appointmentDate }}</td>
              <td class="p-3 border-b">{{ appointment.appointmentTime }}</td>
              <td class="p-3 border-b">
                <button class="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600">
                  Reschedule
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Total Appointments Section -->
    <div class="total-appointments mt-8">
      <h2 class="text-lg font-semibold mb-3 text-gray-700">Total Appointments</h2>
      <div class="appointment-list bg-white p-4 rounded-lg shadow-md">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-100">
              <th class="p-3 border-b">Patient</th>
              <th class="p-3 border-b">Appointment Date</th>
              <th class="p-3 border-b">Appointment Time</th>
              <th class="p-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(appointment, index) in totalAppointments" :key="index">
              <td class="p-3 border-b">{{ appointment.patient }}</td>
              <td class="p-3 border-b">{{ appointment.appointmentDate }}</td>
              <td class="p-3 border-b">{{ appointment.appointmentTime }}</td>
              <td class="p-3 border-b">
                <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  View Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.appointments-view {
  max-width: 1200px;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  text-align: left;
  padding: 1rem;
  border-bottom: 1px solid #e5e5e5;
}

button {
  cursor: pointer;
}
</style>
