import { createVuetify } from 'vuetify'
import defaults from './defaults'
import { icons } from './icons'
import theme from './theme'

import { VDataTable, VDataTableServer, VDataTableVirtual } from 'vuetify/labs/VDataTable'

// Styles
import '@core/scss/libs/vuetify/index.scss'
import 'vuetify/styles'
export default createVuetify({
  defaults,
  icons,
  theme,
  components: {
    VDataTable,
    VDataTableServer,
    VDataTableVirtual,
  },
})
