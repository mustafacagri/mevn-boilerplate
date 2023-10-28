<script setup>
import Comment from '@/components/Posts/Comment.vue'

import { useRoute } from 'vue-router'
import { useMessageStore, usePostStore } from '@/store'

import axios from 'axios'
import { computed, reactive } from 'vue'

const messageStore = useMessageStore()
const postStore = usePostStore()
const type = ref('all')
const post = computed(() => postStore.getPostByIdCategoryId(route.params.id))
const comments = computed(() => {
  if (typeof type.value !== 'boolean') {
    return post.value?.comments
  } else {
    return post.value?.comments?.filter(comment => comment?.isActive === type.value)
  }
})

const breadcrumbs = ref()

const route = useRoute()
const id = computed(() => route.params.id)

const initialize = post => {
  const staticBreadcrumbs = [
    {
      title: 'Dashboard',
      to: '/',
    },
    {
      title: 'Posts',
      to: '/posts',
    },
  ]

  const breadcrumb = [
    {
      title: post?.title,
      to: '/post/' + post?._id,
    },
    {
      title: 'Comments',
      disabled: true,
    },
  ]

  if (post?.title) {
    breadcrumbs.value = [...staticBreadcrumbs, ...breadcrumb]
  }
}

const updateCommentTypes = value => {
  type.value = value
}

watch(
  () => postStore.getPostById(route.params.id),
  (_newData, _oldData) => {
    initialize(post.value)
  },
)

onMounted(() => {
  if (id.value) {
    initialize(post.value)
  }
})
</script>

<template>
  <VContainer>
    <VRow>
      <VCol cols="12">
        <VAlert
          v-if="messageStore.error"
          border="bottom"
          color="error"
          dark
          class="text-center mb-4"
        >
          {{ messageStore.error }}
        </VAlert>
        <VAlert
          v-if="messageStore.isSuccess"
          border="bottom"
          color="success"
          dark
          class="text-center mb-4"
        >
          {{ messageStore.isSuccess }}
        </VAlert>

        <VBreadcrumbs
          :items="breadcrumbs"
          class="pt-0 mb-3"
        >
          <template v-slot:prepend>
            <VIcon
              size="small"
              icon="mdi-home"
            ></VIcon>
          </template>
          <template v-slot:divider>
            <v-icon icon="mdi-forward"></v-icon>
          </template>
        </VBreadcrumbs>

        <VBtn
          color="primary"
          class="mr-2"
          @click="updateCommentTypes('all')"
          :disabled="!(type === false || type === true)"
          >ALL</VBtn
        >
        <VBtn
          color="warning"
          class="mr-2"
          @click="updateCommentTypes(false)"
          :disabled="type === false"
          >Not Approved</VBtn
        >
        <VBtn
          color="success"
          @click="updateCommentTypes(true)"
          :disabled="type === true"
          >Approved</VBtn
        >

        <VContainer>
          <VRow>
            <VCol
              cols="6"
              v-for="comment in comments"
              :key="comment?._id"
            >
              <Comment
                :comment="comment"
                :postId="post._id"
                :isLoaded="comment?.isLoaded"
              />
            </VCol>
          </VRow>
        </VContainer>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped lang="scss">
img {
  max-width: 100%;
}

.approvedCard {
  border-bottom: 3px solid green !important;
}
.notApprovedCard {
  border-bottom: 3px solid red !important;
}
</style>
