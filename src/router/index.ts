import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import LeftAndTopLayout from '@/views/LeftAndTopLayout.vue'

import AnalyticsDashboard from '@/views/AnalyticsDashboard.vue'
import AvailableTimings from '@/views/AvailableTimings.vue'
import AppointmentsView from '@/views/AppointmentsView.vue'
import MedicinesView from '@/views/MedicinesView.vue'
import ProfileSettings from '@/views/ProfileSettings.vue'
import ChangePassword from '@/views/ChangePassword.vue'


const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: LeftAndTopLayout,
      children: [
        {
          path: 'analytics-dashboard',
          name: 'analyticsDashboard',
          component: AnalyticsDashboard
        },
        
       
       
        {
          path: 'Available-Timings',
          name: 'availableTimings',
          component: AvailableTimings
        },
        {
          path: 'Appointments',
          name: 'appointments',
          component: AppointmentsView,
        },
        {
          path: 'Medicines',
          name: 'medicines',
          component: MedicinesView,
        },
        {
          path: 'Profile-Settings',
          name: 'profileSettings',
          component: ProfileSettings,
        },
        {
          path: 'Change-Password',
          name: 'changePassword',
          component: ChangePassword,
        },
        // {
        //   path: 'Logout',
        //   name: 'logout',
        //   component: LogoutView,
        // }
        
      ]
    },
  ],
})

export default router
