<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import Chart from 'chart.js/auto';

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
      type: "Online",
      patient: "John Doe",
      appointmentDate: "2025-03-15",
      appointmentTime: "10:00 AM",
    },
    {
      id: "Apt0002",
      type: "Offline",
      patient: "Jane Smith",
      appointmentDate: "2025-03-16",
      appointmentTime: "2:00 PM",
    },
  ],
});

// State for selected appointment
const selectedAppointment = ref(null);
const showDialog = ref(false);

// Function to show the dialog box
const viewDetails = (appointment) => {
  selectedAppointment.value = appointment;
  showDialog.value = true;
};

// Booking trends data
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
  <div class="analytics-dashboard p-6 rounded-lg bg-white shadow-lg">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Analytics Dashboard</h1>

    <!-- Top Metrics Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="metric-card bg-blue-600 text-white p-6 rounded-lg shadow-md">
        <p class="text-lg font-semibold">Total Appointments</p>
        <p class="text-3xl font-bold">{{ dashboardData.metrics.totalAppointments }}</p>
      </div>

      <div class="metric-card bg-green-600 text-white p-6 rounded-lg shadow-md">
        <p class="text-lg font-semibold">Medicine Kit</p>
        <p class="text-3xl font-bold">{{ dashboardData.metrics.medicineKit }}</p>
      </div>

      <div class="metric-card bg-orange-600 text-white p-6 rounded-lg shadow-md">
        <p class="text-lg font-semibold">Appointments Today</p>
        <p class="text-3xl font-bold">{{ dashboardData.metrics.appointmentsToday }}</p>
      </div>
    </div>

    <!-- Booking Trends Chart -->
    <div class="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Booking Trends</h2>
      <canvas ref="bookingTrendsChart" class="chart-canvas"></canvas>
    </div>

    <!-- Upcoming Appointments Section -->
    <div class="appointments-section mt-8">
      <h2 class="text-xl font-semibold mb-3 text-gray-700">Upcoming Appointments</h2>
      <div class="appointment-card bg-white p-4 rounded-lg shadow-md">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-100">
              <th class="p-3 border-b">Appointment ID</th>
              <th class="p-3 border-b">Type</th>
              <th class="p-3 border-b">Patient</th>
              <th class="p-3 border-b">Date</th>
              <th class="p-3 border-b">Time</th>
              <th class="p-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="appointment in dashboardData.upcomingAppointments" :key="appointment.id">
              <td class="p-3 border-b">{{ appointment.id }}</td>
              <td class="p-3 border-b">{{ appointment.type }}</td>
              <td class="p-3 border-b">{{ appointment.patient }}</td>
              <td class="p-3 border-b">{{ appointment.appointmentDate }}</td>
              <td class="p-3 border-b">{{ appointment.appointmentTime }}</td>
              <td class="p-3 border-b">
                <button @click="viewDetails(appointment)" class="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600">
                  View Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Appointment Details Modal -->
    <div v-if="showDialog" class="modal-overlay">
      <div class="modal-content">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Appointment Details</h2>
        <div class="appointment-info">
          <p><strong>Appointment ID:</strong> {{ selectedAppointment.id }}</p>
          <p><strong>Type:</strong> {{ selectedAppointment.type }}</p>
          <p><strong>Patient:</strong> {{ selectedAppointment.patient }}</p>
          <p><strong>Date:</strong> {{ selectedAppointment.appointmentDate }}</p>
          <p><strong>Time:</strong> {{ selectedAppointment.appointmentTime }}</p>
        </div>
        <button @click="showDialog = false" class="close-btn">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart-canvas {
  width: 100%;
  height: 250px;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 500px;
  text-align: left;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.appointment-info p {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 12px;
}

.close-btn {
  display: block;
  margin-top: 20px;
  background: #ff4d4d;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
}

.close-btn:hover {
  background: #d43f3f;
}
</style>
