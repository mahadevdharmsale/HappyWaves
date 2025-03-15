<script setup lang="ts">
import router from '@/router';
import Storage from '@/utils/Storage';
import { onMounted, ref } from 'vue';
import MenuItems from '@/utils/MenuItems'
import type { MenuItem } from 'primevue/menuitem'

const showLeftNav = ref(true)
const isMobile = ref(false)
const op = ref()
const toggle = (event: Event) => {
  op.value.toggle(event)
}

onMounted(() => {
  if (window.innerWidth <= 768) {
    showLeftNav.value = false
    isMobile.value = false
  }
})
const logout = () => {
  Storage.clearData()
  router.push({
    name: 'login'
  })
}
</script>

<template>
  <main class="">
    <header class="flex items-center justify-between p-4 bg-white text-gray-800">
        <div class="flex items-center justify-start">
           <img src="/src/assets/clogo.png" class=" w-1/3 h-1/3"/>
          </div>
        <div class="flex space-x-4">
          <Button :label="Storage.getAdminName()" icon="fas fa-user-circle" severity="secondary" @click="toggle"  rounded/>
          <Popover ref="op" :dismissable="true" @click="toggle">
            <div class="flex-row p-3">
              <p class="p-1 font-bold border-b-2">Admin Profile</p>
              <p class="px-3 py-1">Name: <b>{{ Storage.getAdminName() }}</b></p>
              <p class="px-3 py-1">Email: <b>{{ Storage.getAdminEmail() }}</b></p>
              <p class="px-3 py-1">Role: <b>{{ Storage.getAdminRole() }}</b></p>
              <p class="px-3 py-1">ID/Phone No: <b>{{ Storage.getAdminId() }}</b></p>
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
        <div>
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
        </div>

        <div class="flex-col justify-between">
        </div>
      </aside>
      <Drawer v-model:visible="isMobile" header="Menu" role="region">
        <PanelMenu :model="items" multiple class="sidebar">
            <template #item="{ item }" >
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

.custom-menu {
  background-color: transparent !important;
  color: white !important;
  border: none !important;
}

.custom-menu-item {
  color: white !important;
  background-color: transparent !important;
  padding: 0.5rem !important;
  border-radius: 0.25rem;
  margin-bottom: 10px !important;
}

.custom-menu-item:hover, .custom-menu-item:active {
  background-color: #FFFFF6 !important;
  color: black !important;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-enter-from, .slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-enter-to, .slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
