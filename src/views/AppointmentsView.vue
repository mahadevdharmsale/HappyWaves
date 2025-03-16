<script setup lang="ts">
import { ref, computed } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Calendar from "primevue/calendar";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

const totalAppointments = ref([
  { patient: "Chris Evans", appointmentDate: "2025-03-10", appointmentTime: "9:00 AM" },
  { patient: "Scarlett Johansson", appointmentDate: "2025-03-11", appointmentTime: "10:15 AM" },
  { patient: "Robert Downey Jr.", appointmentDate: "2025-03-16", appointmentTime: "3:00 PM" },
  { patient: "Tom Holland", appointmentDate: "2025-03-16", appointmentTime: "1:45 PM" },
  { patient: "John Doe", appointmentDate: "2025-03-17", appointmentTime: "10:00 AM" },
]);

const selectedDate = ref(new Date());
const showDetailsModal = ref(false);
const showRescheduleModal = ref(false);
const selectedAppointment = ref(null);
const newDate = ref("");
const newTime = ref(null);

const parseTime = (time: string): number => {
  const [hour, minute] = time.match(/\d+/g)!.map(Number);
  const isPM = time.includes("PM");
  return (isPM && hour !== 12 ? hour + 12 : hour === 12 && !isPM ? 0 : hour) * 60 + minute;
};

const sortedAppointments = computed(() => {
  return [...totalAppointments.value].sort((a, b) => {
    const dateA = new Date(a.appointmentDate).getTime();
    const dateB = new Date(b.appointmentDate).getTime();
    if (dateA !== dateB) return dateA - dateB;
    return parseTime(a.appointmentTime) - parseTime(b.appointmentTime);
  });
});


const filteredAppointments = computed(() => {
  if (!selectedDate.value) return totalAppointments.value;

  // Ensure the selected date is properly formatted to match appointmentDate format
  const formattedDate = selectedDate.value instanceof Date
    ? selectedDate.value.toLocaleDateString("en-CA") // Format: YYYY-MM-DD (Canada locale avoids MM/DD issues)
    : selectedDate.value;

  return totalAppointments.value.filter(appt => appt.appointmentDate === formattedDate);
});

// const filteredAppointments = computed(() => {
//   if (!selectedDate.value) return totalAppointments.value;

//   // Format selectedDate to "YYYY-MM-DD"
//   const formattedDate = new Date(selectedDate.value).toISOString().split("T")[0];

//   return totalAppointments.value.filter(appt => appt.appointmentDate === formattedDate);
// });

// const filteredAppointments = computed(() => {
//   if (!selectedDate.value) return sortedAppointments.value;
//   const formattedDate = selectedDate.value.toISOString().split("T")[0];
//   return sortedAppointments.value.filter(appt => appt.appointmentDate === formattedDate);
// });

const openDetailsModal = (appointment: any) => {
  selectedAppointment.value = appointment;
  showDetailsModal.value = true;
};

const openRescheduleModal = (appointment: any) => {
  selectedAppointment.value = { ...appointment };
  newDate.value = appointment.appointmentDate;
  newTime.value = null;
  showRescheduleModal.value = true;
};

const rescheduleAppointment = () => {
  if (!selectedAppointment.value || !newTime.value) return;

  const index = totalAppointments.value.findIndex(
    (appt) =>
      appt.patient === selectedAppointment.value?.patient &&
      appt.appointmentDate === selectedAppointment.value?.appointmentDate &&
      appt.appointmentTime === selectedAppointment.value?.appointmentTime
  );

  if (index !== -1) {
    totalAppointments.value[index] = {
      patient: selectedAppointment.value.patient,
      appointmentDate: newDate.value,
      appointmentTime: newTime.value.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }),
    };
  }

  showRescheduleModal.value = false;
};
</script>

<template>
  <div class="doctor-card p-6 rounded-card space-y-8">
    <h1 class="text-3xl font-semibold mb-4">Manage Appointments</h1>

    <div class="mb-2">
  <label class="block text-sm font-medium mb-1">Select Date:</label>
  <Calendar v-model="selectedDate" dateFormat="yy-mm-dd" class="w-32 p-1 text-sm" />
</div>


    <div class="total-appointments">
      <h2 class="text-lg font-semibold mb-4 text-gray-700">Total Appointments</h2>
      <div class="appointment-list bg-white p-6 rounded-lg shadow-md">
        <DataTable :value="filteredAppointments" paginator :rows="5" responsiveLayout="scroll">
          <Column field="patient" header="Patient" />
          <Column field="appointmentDate" header="Appointment Date" />
          <Column field="appointmentTime" header="Appointment Time" />
          <Column header="Actions">
            <template #body="slotProps">
              <button @click="openDetailsModal(slotProps.data)" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2">
                View Details
              </button>
              <button @click="openRescheduleModal(slotProps.data)" class="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
                Reschedule
              </button>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <Dialog v-model:visible="showDetailsModal" header="Appointment Details" :modal="true" class="w-1/3">
      <div class="p-4 space-y-4">
        <p><strong>Patient:</strong> {{ selectedAppointment?.patient }}</p>
        <p><strong>Date:</strong> {{ selectedAppointment?.appointmentDate }}</p>
        <p><strong>Time:</strong> {{ selectedAppointment?.appointmentTime }}</p>
      </div>
      <template #footer>
        <Button label="Close" icon="pi pi-times" class="p-button-secondary" @click="showDetailsModal = false" />
      </template>
    </Dialog>

    <Dialog v-model:visible="showRescheduleModal" header="Reschedule Appointment" :modal="true" class="w-1/3">
      <div class="p-4">
        <label class="block mb-2 font-semibold">New Date:</label>
        <input v-model="newDate" type="date" class="w-full p-2 border rounded mb-3" />

        <label class="block mb-2 font-semibold">New Time:</label>
        <Calendar v-model="newTime" timeOnly hourFormat="12" class="w-full" />
      </div>
      <template #footer>
        <Button label="Save" icon="pi pi-check" class="p-button-success" @click="rescheduleAppointment" />
        <Button label="Cancel" icon="pi pi-times" class="p-button-secondary" @click="showRescheduleModal = false" />
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
.doctor-card {
  max-width: auto;
  margin: 0 auto;
}
</style>
