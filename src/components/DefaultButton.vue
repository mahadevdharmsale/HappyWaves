<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: false
  },
  brand: {
    type: String,
    required: false
  },
  outlined: {
    type: Boolean,
    default: false
  },
  rounded: {
    type: Boolean,
    default: false
  },
  severity: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false
  }
});

const emit = defineEmits<{
  (e: 'click'): void;
}>();
</script>

<template>
  <Button
    :label="title"
    :icon="icon ? `fas fa-${icon}` : brand  ? `fab fa-${brand}` : ''"
    :class="[
      'p-button',
      outlined ? 'p-button-outlined' : '',
      severity && !outlined ? `p-button-${severity}` : '',
      severity && outlined ? `p-button-${severity}-outlined` : '',
      rounded ? 'p-button-rounded' : ''
    ]"
    @click="emit('click')"
    :disabled="disabled"
  >
  </Button>
</template>

<style scoped>
/* Base Button Styles */
.p-button {
  font-size: 16px;
  text-transform: capitalize;
  padding: 10px 16px;
  display: flex;
  flex-flow: row nowrap;
  background-color: #002F6D;
  color: white;
  border: none;
  border-radius: 12px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
}

/* Outlined Button Styles */
.p-button-outlined {
  background-color: transparent;
  color: #002F6D;
  border: 1px solid #002F6D;
}

/* Danger Button Styles */
.p-button-danger {
  background-color: #e74c3c;
  color: white;
}

.p-button-danger-outlined {
  background-color: transparent;
  color: red;
  border: 1px solid red;
}

/* Warning Button Styles */
.p-button-warning {
  background-color: #f39c12;
  color: white;
}

.p-button-warning-outlined {
  background-color: transparent;
  color: #f39c12;
  border: 1px solid #f39c12;
}

/* Info Button Styles */
.p-button-info {
  background-color: #3498db;
  color: white;
}

.p-button-info-outlined {
  background-color: transparent;
  color: #3498db;
  border: 1px solid #3498db;
}

/* Secondary Button Styles */
.p-button-secondary {
  background-color: #6c757d;
  color: white;
}

.p-button-secondary-outlined {
  background-color: #F1F5F9;
  color: black;
  border: 0px;
}

/* Success Button Styles */
.p-button-success {
  background-color: #2ecc71;
  color: white;
}

.p-button-success-outlined {
  background-color: transparent;
  color: #2ecc71;
  border: 1px solid #2ecc71;
}
</style>
