<script setup>
import { useUserStore } from '@/store'
import Header from '@/components/general/Header'
import Footer from '@/components/general/footer'

const userStore = useUserStore()
const route = useRouter()

const topItems = ref([{ text: 'Tickets', to: '/user/tickets', icon: 'fa-solid fa-envelope' }])
const logout = () => {
  userStore.logout().then(() => {
    route.push('/')
  })
}
</script>

<template>
  <div>
    <Header />
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
    <div class="container">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style scoped lang="scss">
#topItems {
  text-align: center;

  a {
    font-family: 'Concert One', cursive;
    background-color: #f0f0f0;
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    color: hsla(160, 100%, 37%, 1);
    cursor: pointer;

    &:hover {
      background-color: hsla(160, 100%, 37%, 1);
      color: #f0f0f0;
      text-decoration: none;
    }
  }

  .router-link-active,
  .router-link-exact-active {
    background-color: hsla(160, 100%, 37%, 1);
    color: #f0f0f0;
  }
}
</style>
