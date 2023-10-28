<script setup>
import { useUserStore } from '@/store'
const userStore = useUserStore()

const router = useRouter()
const topItems = ref([
  { text: 'Profile', to: '/user/profile', icon: 'fa-solid fa-user' },
  { text: 'Tickets', to: '/user/tickets', icon: 'fa-solid fa-envelope' },
  { text: 'Todos', to: '/user/todos', icon: 'fa-solid fa-check' }
])
const logout = () => {
  userStore.logout().then(() => {
    router.push('/')
  })
}
</script>

<template>
  <div id="topItems">
    <template v-for="item in topItems" :key="item.to">
      <router-link v-if="item?.to" :to="item.to">
        <span><Icon :icon="item.icon" class="mr-2" /></span>
        {{ item.text }}
      </router-link>
    </template>
    <a @click="logout()">
      <Icon icon="fa-solid fa-user-times" class="mr-2" />
      Logout
    </a>
  </div>
</template>
