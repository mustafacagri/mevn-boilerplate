<script setup>
import { useHomepageStore } from '~/store/homepage'
const homepageStore = useHomepageStore()
</script>

<template>
  <header>
    <template v-for="item in useHomepageStore().getHeaderItems" :key="item.id">
      <router-link :to="item.to">
        <span><font-awesome-icon v-if="item.icon" :icon="item.icon" class="mr-2"></font-awesome-icon></span>
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
