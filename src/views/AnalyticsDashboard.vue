<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import Chart from 'chart.js/auto';
import Conversion from '@/utils/Conversions'; // Ensure this is correctly imported

const dashboardData = ref({
  metrics: {
    totalAppointments: 10,
    medicineKit: 50,
    appointmentsToday: 5,
  },
  upcomingAppointments: [
    {
      id: "Apt0001",
      type: "Online",
      patient: "John Doe",
      appointmentDate: Conversion.toDateFormat("2025-03-15"),
      appointmentTime: "10:00 AM",
    },
    {
      id: "Apt0002",
      type: "Offline",
      patient: "Jane Smith",
      appointmentDate: Conversion.toDateFormat("2025-03-16"),
      appointmentTime: "2:00 PM",
    },
  ],
});

const selectedAppointment = ref(null);
const showDialog = ref(false);

const viewDetails = (appointment) => {
  selectedAppointment.value = appointment;
  showDialog.value = true;
};

const bookingTrends = ref({
  data: [5, 10, 8, 15, 6, 12, 9],
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
});

const bookingTrendsChart = ref<HTMLCanvasElement | null>(null);

const createChart = () => {
  const ctx = bookingTrendsChart.value?.getContext('2d');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: bookingTrends.value.labels,
      datasets: [
        {
          label: 'Weekly Appointments',
          data: bookingTrends.value.data,
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          borderRadius: 5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true },
      },
      scales: {
        x: { grid: { display: false } },
        y: { beginAtZero: true },
      },
    },
  });
};

onMounted(() => {
  nextTick(() => {
    createChart();
  });
});
</script>

<template>
  <div class="analytics-dashboard p-4 md:p-6 rounded-lg bg-white shadow-lg">
    <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Analytics Dashboard</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="metric-card bg-blue-600 text-white p-4 md:p-6 rounded-lg shadow-md">
        <p class="text-base md:text-lg font-semibold">Total Appointments</p>
        <p class="text-2xl md:text-3xl font-bold">{{ dashboardData.metrics.totalAppointments }}</p>
      </div>
      <div class="metric-card bg-green-600 text-white p-4 md:p-6 rounded-lg shadow-md">
        <p class="text-base md:text-lg font-semibold">Medicine Kit</p>
        <p class="text-2xl md:text-3xl font-bold">{{ dashboardData.metrics.medicineKit }}</p>
      </div>
      <div class="metric-card bg-orange-600 text-white p-4 md:p-6 rounded-lg shadow-md">
        <p class="text-base md:text-lg font-semibold">Appointments Today</p>
        <p class="text-2xl md:text-3xl font-bold">{{ dashboardData.metrics.appointmentsToday }}</p>
      </div>
    </div>

    <div class="mt-6 md:mt-8 bg-white p-4 md:p-6 rounded-lg shadow-md">
      <h2 class="text-lg md:text-xl font-semibold text-gray-700 mb-4">Booking Trends</h2>
      <div class="w-full h-64">
        <canvas ref="bookingTrendsChart" class="chart-canvas"></canvas>
      </div>
    </div>

    <div class="appointments-section mt-6 md:mt-8">
      <h2 class="text-lg md:text-xl font-semibold mb-3 text-gray-700">Upcoming Appointments</h2>
      <div class="appointment-card bg-white p-4 rounded-lg shadow-md overflow-auto">
        <table class="w-full text-left border-collapse text-sm md:text-base">
          <thead>
            <tr class="bg-gray-100 text-xs md:text-sm">
              <th class="p-2 md:p-3 border-b">Appointment ID</th>
              <th class="p-2 md:p-3 border-b">Type</th>
              <th class="p-2 md:p-3 border-b">Patient</th>
              <th class="p-2 md:p-3 border-b">Date</th>
              <th class="p-2 md:p-3 border-b">Time</th>
              <th class="p-2 md:p-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="appointment in dashboardData.upcomingAppointments" :key="appointment.id">
              <td class="p-2 md:p-3 border-b">{{ appointment.id }}</td>
              <td class="p-2 md:p-3 border-b">{{ appointment.type }}</td>
              <td class="p-2 md:p-3 border-b">{{ appointment.patient }}</td>
              <td class="p-2 md:p-3 border-b">{{ appointment.appointmentDate }}</td>
              <td class="p-2 md:p-3 border-b">{{ appointment.appointmentTime }}</td>
              <td class="p-2 md:p-3 border-b">
                <button @click="viewDetails(appointment)" class="bg-teal-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-md hover:bg-teal-600">
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
.chart-canvas {
  width: 100%;
  height: 100%;
}
</style>
