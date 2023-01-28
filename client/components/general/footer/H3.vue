<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="col-md-3">
    <h3>{{ data.title }}</h3>
    <a :href="link.url" v-for="link in data.content" :key="link.id">{{ link.name }}</a>
  </div>
</template>
