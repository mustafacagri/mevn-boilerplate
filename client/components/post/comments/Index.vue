<script setup>
import New from './New'

const props = defineProps({
  postId: String,
  comments: Array
})

const showDate = value => {
  const response = new Date(value)

  return response.toLocaleString()
}
</script>

<template>
  <div class="card mt-5">
    <div class="card-body">
      <h3 class="card-title">Comments</h3>

      <div v-if="Array.isArray(comments) && comments.length > 0">
        <div v-for="comment in comments" :key="comment.id">
          <div class="row">
            <div class="col-md-6">
              {{ comment.name }} <span v-if="comment.email" class="ml-2">({{ comment.email }})</span>
            </div>
            <div class="col-md-6" align="right">
              {{ showDate(comment.createdTime) }}
            </div>
          </div>
          <div class="col-12 mt-2">{{ comment.comment }}</div>
          <hr class="my-3" />
        </div>
      </div>

      <New :postId="postId"></New>
    </div>
  </div>
</template>
