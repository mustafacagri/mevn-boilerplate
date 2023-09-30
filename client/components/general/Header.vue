<script setup>
import { storeToRefs } from 'pinia'
import { useHomepageStore } from '~/store/homepage'
import { useUserStore } from '~/store/user'
const homepageStore = useHomepageStore()
const userStore = useUserStore()

const initialLoginOrUser = { to: '/login', text: 'Login', icon: 'fa-solid fa-users' }
const loginOrUser = computed(() =>
  userStore.getToken
    ? { text: useUserStore().getUser?.username, to: '/user', icon: 'fa-solid fa-user' }
    : { ...initialLoginOrUser }
)

const getHeaderItems = computed(() => [...homepageStore.getHeaderItems, loginOrUser.value])
</script>

<template>
  <header>
    <template v-for="(item, index) in getHeaderItems" :key="index">
      <router-link v-if="item?.to" :to="item.to">
        <span><Icon :icon="item.icon" class="mr-2" /></span>
        {{ item.text }}
      </router-link>
    </template>
  </header>
</template>

<style scoped lang="scss">
header {
  width: 90%;
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 0 auto;
  margin-bottom: 1rem;
  justify-content: center;
  display: flex;

  a {
    font-family: 'Concert One', cursive;
    background-color: white;
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    color: hsla(160, 100%, 37%, 1);

    &:hover {
      background-color: hsla(160, 100%, 37%, 1);
      color: white;
      text-decoration: none;
    }
  }

  .router-link-active,
  .router-link-exact-active {
    background-color: hsla(160, 100%, 37%, 1);
    color: white;
  }
}
</style>
