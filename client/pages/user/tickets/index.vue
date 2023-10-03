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

onMounted(() => {
  ticketStore.fetchTickets()
})
</script>

<template>
  <div class="container">
    <div class="d-flex flex-row bd-highlight mb-3">
      <div class="mr-4">
        Status:
        <select v-model="selectedStatus" class="mx-4">
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
        <select v-model="selectedPriority">
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
