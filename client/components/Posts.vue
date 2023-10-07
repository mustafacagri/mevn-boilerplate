<script setup="props, {}">
import { usePostStore } from '~/store/post'

const props = defineProps({
  records: Number
})

const postStore = usePostStore()
const getPosts = computed(() => (props.records === 0 ? postStore.getPosts : postStore.getLastXPosts(props.records)))

const apiDomain = import.meta.env.VITE_API_ENDPOINTHOST
const { defaultImage } = postStore
</script>

<template>
  <div v-if="Array.isArray(getPosts) && getPosts.length > 0" class="container mt-5" id="Posts">
    <div class="row">
      <div class="col-md-4" v-for="item in getPosts" :key="item.id">
        <div class="card mb-4 post">
          <img class="card-img-top" :src="item.image ? apiDomain + item.image : defaultImage" :alt="item.title" />
          <div v-if="Array.isArray(item.postCategories) && item.postCategories.length > 0" class="categories">
            {{ postStore.printCategoryNamesCommasByCatId(item.postCategories) }}
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ item.title }}</h5>
            <div class="card-text"><div v-html="item.description"></div></div>
            <router-link :to="'/posts/' + item.url" class="btn btn-primary read-more">Read more...</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <utilsSkeleton v-else />
</template>

<style scoped lang="scss">
@import '~/assets/scss/mixins.scss';

#Posts {
  .post {
    position: relative;

    .card-img-top {
      height: 250px;
    }

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

      .card-text {
        font-weight: 200;
        margin-bottom: 10px;
        @include text-ellipsis($lines: 3);
      }

      .read-more {
        font-family: 'Concert One', cursive;
      }
    }
  }
}
</style>
