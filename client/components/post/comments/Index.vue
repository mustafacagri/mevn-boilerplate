<script setup>
import New from './New'

const props = defineProps({
  postId: Number
})
</script>

<template>
  <div class="card mt-5">
    <div class="card-body">
      <h3 class="card-title">Comments</h3>
      <New :postId="postId"></New>
    </div>
  </div>
</template>
