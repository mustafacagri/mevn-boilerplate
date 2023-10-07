<script setup>
import { useMessageStore } from '@/store/message'
const messageStore = useMessageStore()
</script>

<template>
  <VAlert
    v-if="messageStore.getError"
    closable
    icon="$error"
    color="error"
  >
    {{ messageStore.getError }}</VAlert
  >

  <VAlert
    v-if="messageStore.getIsSuccess"
    closable
    icon="$success"
    color="success"
  >
    {{ messageStore.getIsSuccess }}</VAlert
  >
</template>
