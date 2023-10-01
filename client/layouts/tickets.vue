<script setup>
import Header from '@/components/general/Header'
import Footer from '@/components/general/footer'
import TopItems from '@/components/user/TopItems'

import { useTicketStore } from '@/store/ticket'
const ticketStore = useTicketStore()

onMounted(() => {
  if (!ticketStore.statuses) {
    ticketStore.fetchStatuses()
  }

  if (!ticketStore.priorities) {
    ticketStore.fetchPriorities()
  }
})

const sidebarLinks = ref([
  { text: 'Tickets', to: '/user/tickets', icon: 'fa-solid fa-envelope' },
  { text: 'Create New Ticket', to: '/user/tickets/new', icon: 'fa-solid fa-plus' }
])
</script>
<template>
  <Header />
  <TopItems />
  <div class="container">
    <div class="row mt-5">
      <div class="col-3" id="sidebarLinks">
        <template v-for="link in sidebarLinks" :key="link.to">
          <router-link :to="link.to" class="nav-link mb-2">
            <Icon :icon="link.icon" />
            {{ link.text }}
          </router-link>
        </template>
      </div>
      <!--col-3 sidebar-->
      <div class="col-9">
        <div id="Tickets"><slot /></div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped lang="scss">
#Tickets {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 12px 12px 24px 0 #e1e8fa, -12px -12px 24px 0 #e1e8fa;
  padding: 10px 20px;
}

#sidebarLinks {
  a {
    text-align: left;
  }
}
</style>
