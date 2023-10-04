<script setup>
definePageMeta({
  layout: 'tickets',
  middleware: 'auth'
})

import { timeDisplay } from '@/utils/time'
import { useTicketStore } from '@/store'
const ticketStore = useTicketStore()

const selectedStatus = ref(null)
const selectedPriority = ref(null)
let initialTickets
const tickets = ref()

onMounted(() => {
  ticketStore.fetchTickets().then(res => {
    if (res) {
      initialTickets = [...ticketStore.getTickets]
      tickets.value = [...ticketStore.getTickets]
    }
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
</script>

<template>
  <div v-if="ticketStore.getStatuses && ticketStore.getPriorities" class="container">
    <div class="d-flex mb-4">
      <div class="mr-4">
        Status:
        <select v-model="selectedStatus" class="mx-4" @change="ticketsUpdated()">
          <option :value="null">All</option>
          <option
            v-if="ticketStore.getStatuses"
            v-for="(status, index) in ticketStore.getStatuses"
            :key="index"
            :value="status?._id"
          >
            {{ status?.name }}
          </option>
        </select>
      </div>
      <div class="mr-2">
        Priority:
        <select v-model="selectedPriority" @change="ticketsUpdated()">
          <option :value="null">All</option>
          <option
            v-if="ticketStore.getPriorities"
            v-for="(priority, index) in ticketStore.getPriorities"
            :key="index"
            :value="priority?._id"
          >
            {{ priority?.name }}
          </option>
        </select>
      </div>
    </div>
  </div>

  <div v-if="tickets && Array.isArray(tickets) && tickets.length === 0" class="alert alert-danger" role="alert">
    There is no ticket <span v-if="selectedPriority || selectedStatus">with these filters!</span>
  </div>

  <table v-else-if="tickets" class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Subject</th>
        <th>Status</th>
        <th>Priority</th>
        <th># Comment</th>
        <th>Created</th>
        <th>Last</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(ticket, index) in tickets" :key="index">
        <td>
          <router-link :to="'/user/tickets/' + ticket._id">{{ ticket?.subject }}</router-link>
        </td>
        <td>{{ ticket?.status?.name }}</td>
        <td>{{ ticket?.priority?.name }}</td>
        <td>{{ ticket?.commentsCount }}</td>
        <td>{{ timeDisplay(ticket?.createdTime) }}</td>
        <td>{{ ticket?.lastUpdatedBy?.username }} - {{ timeDisplay(ticket?.lastUpdatedDate) }}</td>
      </tr>
    </tbody>
  </table>

  <p v-else class="placeholder-glow">
    <span class="placeholder col-12 placeholder-lg"></span>
    <span class="placeholder col-7"></span>
    <span class="placeholder col-6"></span>
    <span class="placeholder col-8"></span>
  </p>
</template>
