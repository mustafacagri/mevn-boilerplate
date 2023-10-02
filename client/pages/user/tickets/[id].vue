<script setup>
definePageMeta({
  layout: 'tickets',
  middleware: 'auth'
})

import { request } from '@/utils/request'
import { timeDisplay } from '@/utils/time'
import { useTicketStore } from '@/store'
const ticketStore = useTicketStore()

const route = useRoute()

const ticket = ref(null)
const mapping = {
  subject: 'Subject',
  priority: 'Priority',
  status: 'Status',
  createdTime: 'Created Time',
  lastUpdatedBy: 'Last Updated By',
  lastUpdatedDate: 'Last Updated Date',
  description: 'Description'
}

onMounted(() => {
  const { id } = route.params

  request('get', 'tickets/' + id).then(res => {
    ticket.value = res

    ticket.value.priority = ticket.value.priority?.name || '-'
    ticket.value.status = ticket.value.status?.name || '-'
    ticket.value.createdTime = timeDisplay(ticket.value.createdTime) || '-'
    ticket.value.lastUpdatedBy = ticket.value.lastUpdatedBy?.username || '-'
    ticket.value.lastUpdatedDate = timeDisplay(ticket.value.lastUpdatedDate) || '-'
  })
})
</script>

<template>
  <div v-if="ticket" id="Ticket">
    <div class="row" v-for="key in Object.keys(mapping)" :key="key">
      <div class="col-3 left">{{ mapping[key] }}:</div>
      <div class="col-9">{{ ticket[key] }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#Ticket {
  padding-top: 10px;

  .row {
    margin-bottom: 10px;

    &:not(:last-child):after {
      content: '';
      display: table;
      clear: both;
      width: 100%;
      height: 1px;
      background-color: #eee;
      margin-top: 5px;
    }

    .left {
      text-align: right;
      padding-right: 10px;
    }
  }
}
</style>
