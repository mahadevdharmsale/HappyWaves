<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router';
import Storage from '@/utils/Storage';
import MenuItems from '@/utils/MenuItems';
import type { MenuItem } from 'primevue/menuitem';
import Dropdown from 'primevue/dropdown'; // ✅ Import Dropdown
import Button from 'primevue/button'; // ✅ Import Button
import Popover from 'primevue/overlaypanel'; // ✅ Import Popover
import PanelMenu from 'primevue/panelmenu';
import Drawer from 'primevue/sidebar';

const showLeftNav = ref(true);
const isMobile = ref(false);
const op = ref();
const status = ref("Offline"); // Default status is "Offline"

const toggle = (event: Event) => {
  op.value.toggle(event);
};

const logout = () => {
  Storage.clearData();
  router.push({ name: 'login' });
};
</script>

<template>
  <main>
    <header class="flex items-center justify-between p-4 bg-white text-gray-800">
      <div class="flex items-center">
        <img src="/src/assets/Happy_waves.png" class="h-12 w-auto" alt="Logo" />
      </div>
        <div class="flex space-x-4">
          <Button :label="Storage.getAdminName()" icon="fas fa-user-circle" severity="secondary" @click="toggle" rounded/>
          <Popover ref="op" :dismissable="true">
            <div class="flex flex-col p-3">
              <p class="p-1 font-bold border-b-2">Admin Profile</p>
              <p class="px-3 py-1">Name: <b>{{ Storage.getAdminName() }}</b></p>
              <p class="px-3 py-1">Email: <b>{{ Storage.getAdminEmail() }}</b></p>
              <p class="px-3 py-1">Role: <b>{{ Storage.getAdminRole() }}</b></p>
              <p class="px-3 py-1">ID/Phone No: <b>{{ Storage.getAdminId() }}</b></p>
              <p class="px-3 py-1 font-bold">Status:</p>
              <!-- ✅ Fix: Ensure Dropdown works properly -->
              <Dropdown v-model="status" :options="['Online', 'Offline']" placeholder="Select Status" class="custom-dropdown" />
            </div>
            <button
                class="text-red-500 border-2 w-full p-1 rounded-md border-red-500 hover:text-white hover:bg-red-600"
                @click="logout">
                  <i class="fa fa-sign-out mr-2"></i>Signout
            </button>
          </Popover>
        </div>
      </header>

      <div class="flex w-full">
        <aside class="bg-white shadow-lg w-72 m-2 rounded-xl min-h-screen p-2 flex flex-col justify-between" v-if="showLeftNav">
          <PanelMenu :model="MenuItems.ADMIN_MENU_ITEMS" multiple class="sidebar">
            <template #item="{ item }">
              <a v-ripple class="flex items-center px-4 py-2 cursor-pointer group">
                <span :class="[item.icon, '']" />
                <span :class="['ml-2', { ' font-medium': item.items }]">{{ item.label }}</span>
                <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
                <span v-if="item.items" class="pi pi-angle-down text-primary ml-auto" />
              </a>
            </template>
          </PanelMenu>
        </aside>

        <Drawer v-model:visible="isMobile" header="Menu" role="region">
          <PanelMenu :model="MenuItems.ADMIN_MENU_ITEMS" multiple class="sidebar">
            <template #item="{ item }">
              <a v-ripple class="flex items-center px-4 py-2 cursor-pointer group">
                <span :class="[item.icon, '']" />
                <span :class="['ml-2', { ' font-medium': item.items }]">{{ item.label }}</span>
                <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
                <span v-if="item.items" class="pi pi-angle-down text-primary ml-auto" />
              </a>
            </template>
          </PanelMenu>
        </Drawer>

        <main class="w-full m-2">
          <RouterView class="bg-white"/>
        </main>
      </div>
  </main>
</template>

<style>
/* ✅ Fix: Apply styles properly for dropdown */
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
