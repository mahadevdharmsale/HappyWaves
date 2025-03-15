<script setup lang="ts">
import { ref } from 'vue';

// Define the dashboard data
const dashboardData = ref({
  metrics: {
    totalAppointments: 10,
    medicineKit: 50,
    appointmentsToday: 5,
  },
  upcomingAppointments: [
    {
      id: "Apt0001",
      type: "Video Appointment",
      patient: "John Doe",
      appointmentDate: "2025-03-15",
      appointmentTime: "10:00 AM",
      imgSrc: "/path/to/default-img.png", // Placeholder image path
    },
    {
      id: "Apt0002",
      type: "In-person Appointment",
      patient: "Jane Smith",
      appointmentDate: "2025-03-16",
      appointmentTime: "2:00 PM",
      imgSrc: "/path/to/default-img.png", // Placeholder image path
    },
  ],
});
</script>

<template>
  <div class="doctor-card p-5 rounded-card">
     <!-- Dashboard Title -->
     <div class="dashboard-title mb-5">
      <h1 class="text-2xl font-semibold text-gray-800">Analytics Dashboard</h1>
    </div>
    <!-- Top Metrics Section -->
    <div class="dashboard-metrics flex flex-row justify-between gap-8">
      <Card class="metric-card bg-blue-100 text-blue-700 p-8 text-center rounded-lg shadow-md">
        <template #title>Total Appointments</template>
        <template #content>
          <p class="metric-value">{{ dashboardData.metrics.totalAppointments }}</p>
        </template>
      </Card>

      <Card class="metric-card bg-green-100 text-green-700 p-8 text-center rounded-lg shadow-md">
        <template #title>Medicine Kit</template>
        <template #content>
          <p class="metric-value">{{ dashboardData.metrics.medicineKit }}</p>
        </template>
      </Card>

      <Card class="metric-card bg-orange-100 text-orange-700 p-8 text-center rounded-lg shadow-md">
        <template #title>Appointments Today</template>
        <template #content>
          <p class="metric-value">{{ dashboardData.metrics.appointmentsToday }}</p>
        </template>
      </Card>
    </div>

    <!-- Upcoming Appointments Section -->
    <div class="appointments-section mt-8">
      <h2 class="text-xl font-semibold mb-3 text-gray-700">Upcoming Appointments</h2>
      <div class="appointment-card bg-white p-4 rounded-lg shadow-md">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-100">
              <th class="p-3 border-b">Img</th>
              <th class="p-3 border-b">Appointment ID</th>
              <th class="p-3 border-b">Type</th>
              <th class="p-3 border-b">Patient</th>
              <th class="p-3 border-b">Appointment Date</th>
              <th class="p-3 border-b">Appointment Time</th>
              <th class="p-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="appointment in dashboardData.upcomingAppointments" :key="appointment.id">
              <td class="p-3 border-b">
                <img :src="appointment.imgSrc" alt="Appointment Image" class="w-12 h-12 rounded-md" />
              </td>
              <td class="p-3 border-b">{{ appointment.id }}</td>
              <td class="p-3 border-b">{{ appointment.type }}</td>
              <td class="p-3 border-b">{{ appointment.patient }}</td>
              <td class="p-3 border-b">{{ appointment.appointmentDate }}</td>
              <td class="p-3 border-b">{{ appointment.appointmentTime }}</td>
              <td class="p-3 border-b">
                <button class="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600">
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
.analytics-dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-metrics {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
}

.metric-card {
  text-align: center;
  flex: 1;
}

.metric-value {
  font-size: 2.5rem;
  font-weight: bold;
}

.appointment-card {
  margin-top: 1.5rem;
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

img {
  display: block;
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 8px;
}
</style>
