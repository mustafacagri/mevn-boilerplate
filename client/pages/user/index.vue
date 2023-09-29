<script setup>
definePageMeta({
  middleware: 'auth'
})

import { useUserStore } from '@/store'
const userStore = useUserStore()
const route = useRouter()

const logout = () => {
  userStore.logout().then(() => {
    route.push('/')
  })
}
</script>
<template>
  <div id="topItems">
    <a @click="logout()">
      <Icon icon="fa-solid fa-user-times" class="mr-2" />
      Logout
    </a>
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
