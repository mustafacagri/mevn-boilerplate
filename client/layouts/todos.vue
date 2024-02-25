<script setup>
import Header from '@/components/general/Header'
import Footer from '@/components/general/footer'
import TopItems from '@/components/user/TopItems'

import { useTodoStore } from '@/store/todo'
const todoStore = useTodoStore()

const router = useRoute()

const selectedStatus = ref(null)
const selectedPriority = ref(null)

onMounted(() => {
  todoStore.fetchStatusesAndPriorities()
})

const sidebarLinks = ref([
  { text: 'Todos', to: '/user/todos', icon: 'fa-solid fa-envelope' },
  { text: 'Create New Todo', to: '/user/todos/new', icon: 'fa-solid fa-plus' }
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

        <div v-if="router?.path === '/user/todos'" class="picklists">
          <a v-if="todoStore.getStatuses" class="nav-link mb-2">
            Status:
            <select v-model="selectedStatus" id="selectedStatus" @change="todoStore.selectedStatus = selectedStatus">
              <option :value="null">All</option>
              <option
                v-if="todoStore.getStatuses"
                v-for="(status, index) in todoStore.getStatuses"
                :key="index"
                :value="status?._id"
              >
                {{ status?.name }}
              </option>
            </select>
          </a>

          <a v-if="todoStore.getPriorities" class="nav-link mb-2">
            Priority:
            <select
              v-model="selectedPriority"
              id="selectedPriority"
              @change="todoStore.selectedPriority = selectedPriority"
            >
              <option :value="null">All</option>
              <option
                v-if="todoStore.getPriorities"
                v-for="(priority, index) in todoStore.getPriorities"
                :key="index"
                :value="priority?._id"
              >
                {{ priority?.name }}
              </option>
            </select>
          </a>
        </div>
      </div>
      <!--col-3 sidebar-->
      <div class="col-9">
        <utilsGetErrorSuccess />
        <div id="Todos"><NuxtPage /></div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped lang="scss">
#Todos {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 12px 12px 24px 0 #e1e8fa, -12px -12px 24px 0 #e1e8fa;
  padding: 10px 20px;
}

#sidebarLinks {
  a {
    text-align: left;
  }

  > .picklists > a {
    display: flex;
    justify-content: space-between;
  }

  select {
    margin-left: 10px;
  }
}
</style>
