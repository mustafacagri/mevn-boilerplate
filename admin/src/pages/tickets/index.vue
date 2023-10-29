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
    <template v-slot:item.customer="{ value }">{{ value?.username || '-' }} </template>
    <template v-slot:item.lastUpdatedBy="{ item }">
      <span :class="{ 'text-error': item?.lastUpdatedBy?._id === item?.customer?._id }">{{
        item?.lastUpdatedBy?.username
      }}</span>
    </template>
    <template v-slot:item.status="{ value }">{{ value?.name || '-' }}</template>
    <template v-slot:item.priority="{ value }">{{ value?.name || '-' }}</template>

    <template v-slot:item.action="{ item }">
      <VBtn
        @click="edit(item._id)"
        class="mr-2"
      >
        <VIcon icon="mdi-envelope" />
      </VBtn>
    </template>
    <template v-slot:item.lastUpdatedDate="{ value }">
      <span v-if="value">{{ timeDisplay(value) }}</span>
    </template>
    <template v-slot:item.createdTime="{ value }">
      <span v-if="value">{{ timeDisplay(value) }}</span>
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
