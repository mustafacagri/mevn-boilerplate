<script setup>
import { usePostStore } from '~~/store/post'
const postStore = usePostStore()

const getPostCategories = computed(() => postStore.getPostCategories)
</script>
<template>
  <div v-if="getPostCategories" class="container mt-5" id="PostCategories">
    <div class="row">
      <div class="col-md-4" v-for="item in getPostCategories" :key="item.id">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <div class="card-text">
              <ul>
                <li v-for="post in postStore.getPostsByCategoryId(item._id)" :key="post._id">
                  <router-link :to="'/posts/' + post.url">{{ post.title }}</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-body {
  .card-title {
    font-family: 'Concert One', cursive;
  }
  .card-text {
    a {
      font-family: 'Concert One', cursive;
    }
  }
}
</style>
