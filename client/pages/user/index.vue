<script setup>
definePageMeta({
  middleware: 'auth'
})

import { useUserStore } from '@/store'
</script>
<template>useUserStore().getToken: {{ useUserStore().getToken }}</template>
