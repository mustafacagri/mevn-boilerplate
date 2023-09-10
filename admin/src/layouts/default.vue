<script setup>
import DefaultLayoutWithVerticalNav from './components/DefaultLayoutWithVerticalNav.vue'
import { useMainStore } from '@/store'

onBeforeMount(() => {
  useMainStore().init()
})
</script>

<template>
  <DefaultLayoutWithVerticalNav />
</template>

<style lang="scss">
@use '@layouts/styles/default-layout';
</style>
