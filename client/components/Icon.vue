<script setup>
const props = defineProps({
  icon: String,
  class: { type: String, default: '' }
})
</script>

<template>
  <ClientOnly><font-awesome-icon v-if="icon" :icon="icon" :class="class" /></ClientOnly>
</template>
