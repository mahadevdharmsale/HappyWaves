<script setup lang="ts">
import { ref, onMounted } from 'vue';
import router from '@/router';
import Storage from '@/utils/Storage';
import MenuItems from '@/utils/MenuItems';
import type { MenuItem } from 'primevue/menuitem';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import Popover from 'primevue/overlaypanel';
import PanelMenu from 'primevue/panelmenu';
import Drawer from 'primevue/sidebar';

const showLeftNav = ref(true);
const isMobile = ref(false);
const op = ref();
const status = ref("Offline"); // Default status

const toggle = (event: Event) => {
  op.value.toggle(event);
};

const logout = () => {
  Storage.clearData();
  router.push({ name: 'login' });
};

const checkScreenSize = () => {
  isMobile.value = window.innerWidth <= 768;
  showLeftNav.value = !isMobile.value;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});
</script>

<template>
  <main>
    <header class="flex items-center justify-between p-4 bg-white text-gray-800 shadow-md">
      <div class="flex items-center">
        <img src="/src/assets/Happy_waves.png" class="h-12 w-auto" alt="Logo" />
      </div>
      <div class="flex items-center space-x-4">
        <!-- Status Dropdown -->
        <Dropdown v-model="status" :options="['Online', 'Offline']" placeholder="Select Status" class="custom-dropdown w-32" />

        <!-- Profile Button -->
        <Button :label="Storage.getAdminName()" icon="fas fa-user-circle" severity="secondary" @click="toggle" rounded />

        <!-- Mobile Menu Button -->
        <Button icon="pi pi-bars" class="md:hidden" @click="isMobile = !isMobile" />

        <!-- Popover for Profile Details -->
        <Popover ref="op" :dismissable="true">
          <div class="flex flex-col p-3">
            <p class="p-1 font-bold border-b-2">Admin Profile</p>
            <p class="px-3 py-1">Name: <b>{{ Storage.getAdminName() }}</b></p>
            <p class="px-3 py-1">Email: <b>{{ Storage.getAdminEmail() }}</b></p>
            <p class="px-3 py-1">Role: <b>{{ Storage.getAdminRole() }}</b></p>
            <p class="px-3 py-1">ID/Phone No: <b>{{ Storage.getAdminId() }}</b></p>
          </div>
          <button class="text-red-500 border-2 w-full p-1 rounded-md border-red-500 hover:text-white hover:bg-red-600" @click="logout">
            <i class="fa fa-sign-out mr-2"></i>Signout
          </button>
        </Popover>
      </div>
    </header>

    <div class="flex w-full">
      <aside v-if="showLeftNav" class="bg-white shadow-lg w-72 m-2 rounded-xl min-h-screen p-2 hidden md:flex flex-col justify-between">
        <PanelMenu :model="MenuItems.ADMIN_MENU_ITEMS" multiple class="sidebar" />
      </aside>

      <Drawer v-model:visible="isMobile" header="Menu" role="region" class="md:hidden">
        <PanelMenu :model="MenuItems.ADMIN_MENU_ITEMS" multiple class="sidebar" />
      </Drawer>

      <main class="w-full m-2">
        <RouterView class="bg-white" />
      </main>
    </div>
  </main>
</template>

<style>
.custom-dropdown .p-dropdown {
  background-color: white !important;
  color: black !important;
  border: 1px solid #ccc !important;
}

.custom-dropdown .p-dropdown-panel {
  background-color: white !important;
  border: 1px solid #ccc !important;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.custom-dropdown .p-dropdown-item {
  color: black !important;
  padding: 8px;
}

.custom-dropdown .p-dropdown-item.p-highlight {
  background-color: #007bff !important;
  color: white !important;
}
</style>
