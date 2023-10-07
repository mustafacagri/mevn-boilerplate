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

const id = computed(() => route.params?.id)

onMounted(() => {
  request('get', 'tickets/' + id.value).then(res => {
    ticket.value = res

    ticket.value?.priority && (ticket.value.priority = ticket.value?.priority?.name || '-')
    ticket.value?.status && (ticket.value.status = ticket.value?.status?.name || '-')
    ticket.value?.createdTime && (ticket.value.createdTime = timeDisplay(ticket.value?.createdTime) || '-')
    ticket.value?.lastUpdatedBy && (ticket.value.lastUpdatedBy = ticket.value?.lastUpdatedBy?.username || '-')
    ticket.value?.lastUpdatedDate && (ticket.value.lastUpdatedDate = timeDisplay(ticket.value?.lastUpdatedDate) || '-')
  })
})

const addComment = comment => {
  ticket.value.comments.push(comment)
}
</script>

<template>
  <div v-if="ticket" id="Ticket">
    <div class="row" v-for="key in Object.keys(mapping)" :key="key">
      <div class="col-3 left">{{ mapping[key] }}:</div>
      <div class="col-9">{{ ticket[key] }}</div>
    </div>
    <userTicketComment
      v-if="ticket?.comments"
      v-for="(comment, index) in ticket.comments"
      :key="index"
      :comment="comment"
    />
    <userTicketNewComment v-if="id" :id="id" @addComment="addComment" />
  </div>
	<utilsSkeleton v-else />

</template>

<style scoped lang="scss">
#Ticket {
  padding-top: 20px;

  .row {
    margin-bottom: 10px;

    &:after {
      content: '';
      display: table;
      clear: both;
      width: 100%;
      height: 1px;
      background-color: #eee;
      margin-top: 10px;
    }

    .left {
      text-align: right;
      padding-right: 10px;
    }
  }
}
</style>
