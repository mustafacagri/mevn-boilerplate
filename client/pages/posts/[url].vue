<script setup>
import { usePostStore } from '~~/store/post'
import { request } from '~~/utils/request'
import Comments from '@/components/post/comments/Index'

const { params } = useRoute()
const apiDomain = import.meta.env.VITE_API_ENDPOINTHOST

const postStore = usePostStore()
const { defaultImage } = postStore

const post = ref({})

onMounted(async () => {
  const { url } = params

  setTimeout(async () => {
    await request('get', `posts/${url}`).then(res => {
      post.value = { ...res }
    })
  }, 0)
})
</script>
<template>
  <div class="card">
    <img class="card-img-top" :src="post.image ? apiDomain + post.image : defaultImage" :alt="post.title" />
    <div v-if="Array.isArray(post.postCategories) && post.postCategories.length > 0" class="categories">
      {{ postStore.printCategoryNamesCommasByCatId(post.postCategories) }}
    </div>
    <div class="card-body">
      <h3 class="card-title">{{ post.title }}</h3>
      <div class="card-text" v-html="post.description" />
    </div>
  </div>
  <Comments :postId="post._id" :comments="post.comments" />
</template>

<style scoped lang="scss">
.card {
  .categories {
    text-align: right;
    position: relative;
    top: -40px;
    background-color: #fff;
    padding: 5px 10px;
    opacity: 0.6;
    margin-bottom: -30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: 1s;
    font-family: 'Concert One', cursive;

    &:hover {
      opacity: 0.8;
      transition: 0.4s;
    }
  }
  .card-body {
    .card-title {
      font-family: 'Concert One', cursive;
    }
  }
}
</style>
