import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import {
  Badge,
  Button,
  FileUpload,
  Image,
  InputGroup,
  InputGroupAddon,
  InputOtp,
  Knob,
  MegaMenu,
  Menu,
  PanelMenu,
  StepItem,
  StepList,
  StepPanel,
  StepPanels,
  Stepper,
  Textarea,
  ToastService,
  ToggleSwitch
} from 'primevue'
import { definePreset } from '@primevue/themes'
import Theme from '@/configs/Theme'
import { Tag } from 'primevue'
import { Dialog } from 'primevue'
import { Card } from 'primevue'
import { Divider } from 'primevue'
import { FloatLabel } from 'primevue'
import { ProgressBar } from 'primevue'
import { Toast } from 'primevue'
import { InputText } from 'primevue'
import { InputMask } from 'primevue'
import { Password } from 'primevue'
import { Avatar } from 'primevue'
import { Menubar } from 'primevue'
import { Select } from 'primevue'
import { DatePicker } from 'primevue'
import { DataTable } from 'primevue'
import { Column } from 'primevue'
import { InputNumber } from 'primevue'
import { Chip } from 'primevue'
import { Popover } from 'primevue'
import { Drawer } from 'primevue'
import { ConfirmDialog } from 'primevue'
import { ToggleButton } from 'primevue'
import { SelectButton } from 'primevue'
import { Panel } from 'primevue'
import { Fieldset } from 'primevue'
import { Accordion } from 'primevue'
import Step from 'primevue/step';
import Chart from 'primevue/chart'

const app = createApp(App)

app.component("Button", Button)
app.component('Tag', Tag)
app.component('Dialog', Dialog)
app.component('Card', Card)
app.component('Divider', Divider)
app.component('FloatLabel', FloatLabel)
app.component('ProgressBar', ProgressBar)
app.component('Toast', Toast)
app.component('InputText', InputText)
app.component('InputMask', InputMask)
app.component('Password', Password)
app.component('Avatar', Avatar)
app.component('Menubar', Menubar)
app.component('Select', Select)
app.component('DatePicker', DatePicker)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('InputNumber', InputNumber)
app.component('Image', Image)
app.component('Chip', Chip)
app.component('Popover', Popover)
app.component('Drawer', Drawer)
app.component('ConfirmDialog', ConfirmDialog)
app.component('ToggleButton', ToggleButton)
app.component('SelectButton', SelectButton)
app.component('Panel', Panel)
app.component('Chart', Chart)
app.component('Fieldset', Fieldset)
app.component('Accordion', Accordion)
app.component('Menu', Menu)
app.component('Badge', Badge)
app.component("PanelMenu", PanelMenu)
app.component('MegaMenu', MegaMenu)
app.component('FileUpload', FileUpload)
app.component('TextArea', Textarea)
app.component('Menubar', Menubar)
app.component('InputOtp', InputOtp)
app.component('InputGroup', InputGroup)
app.component('Knob', Knob)
app.component('InputGroupAddon', InputGroupAddon)
app.component('Toast', Toast)
app.component('Stepper', Stepper)
app.component('StepList', StepList)
app.component('StepPanels', StepPanels)
app.component('StepPanel', StepPanel)
app.component('StepItem', StepItem)
app.component('Step', Step)
app.component('ToggleSwitch', ToggleSwitch)
app.use(ToastService)
app.use(router)

const background = Theme.getBackgroundColor()
const surface = Theme.getSurfaceColor()
const primary  = Theme.getPrimaryColor()
const secondary = Theme.getSecondaryColor()

const isDarkMode = Theme.getVisiualMode()

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: `{${primary}.50}`,
      100: `{${primary}.100}`,
      200: `{${primary}.200}`,
      300: `{${primary}.300}`,
      400: `{${primary}.400}`,
      500: `{${primary}.500}`,
      600: `{${primary}.600}`,
      700: `{${primary}.700}`,
      800: `{${primary}.800}`,
      900: `{${primary}.900}`,
      950: `{${primary}.950}`
    },
    secondary: {
      50: `{${secondary}.50}`,
      100: `{${secondary}.100}`,
      200: `{${secondary}.200}`,
      300: `{${secondary}.300}`,
      400: `{${secondary}.400}`,
      500: `{${secondary}.500}`,
      600: `{${secondary}.600}`,
      700: `{${secondary}.700}`,
      800: `{${secondary}.800}`,
      900: `{${secondary}.900}`,
      950: `{${secondary}.950}`,
    },
    surface: {
      0: '#ffffff',
      50:`{${surface}.50}`,
      100:`{${surface}.100}`,
      200:`{${surface}.200}`,
      300:`{${surface}.300}`,
      400:`{${surface}.400}`,
      500:`{${surface}.500}`,
      600:`{${surface}.600}`,
      700:`{${surface}.700}`,
      800:`{${surface}.800}`,
      900:`{${surface}.900}`,
      950:`{${surface}.950}`,
    },
    colorScheme: {
      light: {
        primary: {
          color: `{${primary}.950}`,
          inverseColor: '#ffffff',
          hoverColor: `{${primary}.900}`,
          activeColor: `{${primary}.800}`
        },
        highlight: {
          background: `{${primary}.950}`,
          focusBackground: `{${primary}.700}`,
          color: '#ffffff',
          focusColor: '#ffffff'
        }
      },
      dark: {
        primary: {
          color: `{${primary}.50}`,
          inverseColor: `{${primary}.950}`,
          hoverColor: `{${primary}.100}`,
          activeColor: `{${primary}.200}`
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)'
        }
      }
    }
  }
});
if (background && !isDarkMode){
  document.body.style.backgroundColor = background
}
if(isDarkMode){
  app.use(PrimeVue, {
    theme: {
      preset: MyPreset,

    }
  });
}
else {
  app.use(PrimeVue, {
    theme: {
      preset: MyPreset,
      options: {
        darkModeSelector: 'none',
      }
    }
  });
}

app.mount('#app')
