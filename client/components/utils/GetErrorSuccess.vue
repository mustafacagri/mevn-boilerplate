<script setup>
import { useMessageStore } from '@/store/message'
const messageStore = useMessageStore()
</script>

<template>
  <div v-if="messageStore.getError" class="alert alert-danger" role="alert">
    {{ messageStore.getError }}
  </div>

  <div v-if="messageStore.getIsSuccess" class="alert alert-success" role="alert">
    {{ messageStore.getIsSuccess }}
  </div>
</template>
