<script setup>
import Header from '@/components/general/Header'
import Footer from '@/components/general/footer'
import TopItems from '@/components/user/TopItems'

const sidebarLinks = ref([
  { text: 'Active Tickets', to: '/user/tickets', icon: 'fa-solid fa-envelope' },
  { text: 'Completed Tickets', to: '/user/tickets/closed', icon: 'fa-solid fa-check' },
  { text: 'Deleted Tickets', to: '/user/tickets/deleted', icon: 'fa-solid fa-close' },
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
        <div class="card">
          <div class="card-body"><slot /></div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped lang="scss">
	#sidebarLinks {
		a {text-align: left;}
	}
</style>