<script setup>
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'
import { useTicketStore } from '@/store'
import { timeDisplay } from '@/utils'
const ticketStore = useTicketStore()

const router = useRouter()

let initialTickets
const tickets = ref()

const selectedStatus = ref(null)
const selectedPriority = ref(null)

onMounted(() => {
  ticketStore.fetchTickets().then(res => {
    initialTickets = [...ticketStore.getTickets]
    tickets.value = [...ticketStore.getTickets]
  })
})

const ticketsUpdated = () => {
  tickets.value = initialTickets.filter(ticket => {
    if (selectedStatus.value && selectedPriority.value) {
      return ticket.status._id === selectedStatus.value && ticket.priority._id === selectedPriority.value
    } else if (selectedStatus.value) {
      return ticket.status._id === selectedStatus.value
    } else if (selectedPriority.value) {
      return ticket.priority._id === selectedPriority.value
    } else {
      return true
    }
  })
}

const headers = ref([
  { title: 'Id', key: '_id', align: ' d-none' },
  { title: 'Customer', key: 'customer' },
  { title: 'Subject', key: 'subject' },
  { title: 'Status', key: 'status' },
  { title: 'Priority', key: 'priority' },
  // { title: 'Created Time', key: 'createdTime' },
  { title: 'Last Time', key: 'lastUpdatedDate' },
  { title: 'Last Response', key: 'lastUpdatedBy' },
  { title: 'Action', key: 'action' },
])

const edit = id => {
  router.push(`/tickets/${id}`)
}
</script>

<template>
  <VDataTable
    v-if="tickets"
    items-per-page="10"
    :headers="headers"
    :items="tickets"
  >
    <template #[`item.customer`]="{ item }"> {{ item.columns.customer?.username || '-' }} </template>
    <template #[`item.lastUpdatedBy`]="{ item }">
      <span :class="{ 'text-error': item.columns?.lastUpdatedBy?._id === item.columns?.customer?._id }">{{
        item.columns?.lastUpdatedBy?.username
      }}</span>
    </template>
    <template #[`item.status`]="{ item }">{{ item.columns.status?.name || '-' }}</template>
    <template #[`item.priority`]="{ item }">{{ item.columns.priority?.name || '-' }}</template>
    <template #[`item.action`]="{ item }">
      <VBtn
        @click="edit(item.columns._id)"
        class="mr-2"
      >
        <VIcon icon="mdi-envelope" />
      </VBtn>
    </template>
    <template #[`item.lastUpdatedDate`]="{ item }">
      <span v-if="item.columns.lastUpdatedDate">{{ timeDisplay(item.columns.lastUpdatedDate) }}</span>
    </template>
    <template #[`item.createdTime`]="{ item }">
      <span v-if="item.columns.createdTime">{{ timeDisplay(item.columns.createdTime) }}</span>
    </template>
  </VDataTable>
  <VSkeletonLoader
    v-else
    class="mx-auto"
    elevation="12"
    max-width="400"
    type="table-heading, list-item-two-line, image, table-tfoot"
  />
</template>
