<script setup lang="ts">
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

// Dummy Data for Medicines
const medicines = ref([
  { id: 1, medicine: 'Paracetamol', stock: 150 },
  { id: 2, medicine: 'Aspirin', stock: 200 },
  { id: 3, medicine: 'Amoxicillin', stock: 75 },
  { id: 4, medicine: 'Ciprofloxacin', stock: 50 },
  { id: 5, medicine: 'Ibuprofen', stock: 120 },
]);
</script>

<template>
  <div class="doctor-card p-5 rounded-card">
    <!-- Page Title -->
    <div class="page-title mb-5">
      <h1 class="text-2xl font-semibold text-gray-800">Manage Medicines</h1>
    </div>

    <!-- Medicines Table -->
    <div class="medicines-table bg-white p-4 rounded-lg shadow-md">
      <DataTable :value="medicines" class="p-datatable-sm" paginator :rows="5">
        <Column field="id" header="ID" sortable></Column>
        <Column field="medicine" header="Medicine" sortable></Column>
        <Column field="stock" header="Stock" sortable></Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
.medicines-view {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  margin-bottom: 1.5rem;
}

.medicines-table {
  padding: 1rem;
}
</style>
