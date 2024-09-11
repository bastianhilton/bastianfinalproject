import { defineNuxtPlugin } from '#app'
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-dt'
import 'datatables.net-select-dt'
import 'datatables.net-responsive-dt'

export default defineNuxtPlugin((nuxtApp) => {
  DataTable.use(DataTablesCore)

  // Register the DataTable plugin globally
  nuxtApp.vueApp.use(DataTable)
})
