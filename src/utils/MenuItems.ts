import router from "@/router";
import type { MenuItem } from "primevue/menuitem";

export default class MenuItems {
  public static ADMIN_MENU_ITEMS: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'fa fa-tachometer-alt',
      command: () => router.push({ name: 'analyticsDashboard' }),
    },
    {
      label: 'Available Timings',
      icon: 'fa fa-clock',
      command: () => router.push({ name: 'availableTimings' }),
    },
    {
      label: 'Appointments',
      icon: 'fa fa-calendar',
      command: () => router.push({ name: 'appointments' }),
    },
    {
      label: 'Medicines',
      icon: 'fa fa-pills',
      command: () => router.push({ name: 'medicines' }),
    },
    {
      label: 'Profile Settings',
      icon: 'fa fa-user-cog',
      command: () => router.push({ name: 'profileSettings' }),
    },
    {
      label: 'Change Password',
      icon: 'fa fa-key',
      command: () => router.push({ name: 'changePassword' }),
    }
    ,{
      label: 'Logout',
      icon: 'fa fa-sign-out-alt',
      command: () => router.push({ name: 'login' }),
    },
  ];

}
