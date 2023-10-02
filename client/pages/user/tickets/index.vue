<script setup>
definePageMeta({
  layout: 'tickets',
  middleware: 'auth'
})

import { timeDisplay } from '@/utils/time'
import { useTicketStore } from '@/store'
const ticketStore = useTicketStore()

onMounted(() => {
  ticketStore.fetchTickets()
})
</script>

<template>
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Subject</th>
        <th>Status</th>
        <th>Priority</th>
        <th>Created</th>
        <th>Last</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(ticket, index) in ticketStore.getTickets" :key="index">
        <td>
          <router-link :to="'/user/tickets/' + ticket._id">{{ ticket?.subject }}</router-link>
        </td>
        <td>{{ ticket?.status?.name }}</td>
        <td>{{ ticket?.priority?.name }}</td>
        <td>{{ timeDisplay(ticket?.createdTime) }}</td>
        <td>{{ ticket?.lastUpdatedBy?.username }} - {{ timeDisplay(ticket?.lastUpdatedDate) }}</td>
      </tr>
    </tbody>
  </table>
</template>
