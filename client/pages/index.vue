<script setup>
import { storeToRefs } from 'pinia'
import { useHomepageStore } from '~/store/homepage'
import { TextIconNumber } from '@/components/box'
import Posts from '@/views/home/Posts'
import { nextTick } from 'vue'

const homepageStore = useHomepageStore()

const getStats = computed(() => homepageStore.getStats)

const boxData = computed(() =>
  Object.keys(getStats?.value).length === 0
    ? []
    : [
        { title: 'Hit', subTitle: 'Last week', value: getStats.value.postHits, percentage: -12, icon: 'star' },
        { title: 'User', subTitle: 'Last week', value: getStats.value.user, percentage: 98, icon: 'users' },
        {
          title: 'Post Category',
          subTitle: 'Last week',
          value: getStats.value.postCategory,
          percentage: -48,
          icon: 'folder'
        },
        { title: 'Post', subTitle: 'Last week', value: getStats.value.post, percentage: 22, icon: 'pencil' }
      ]
)

onMounted(async () => {
  await nextTick() // https://stackoverflow.com/questions/76527094/nuxt-3-and-vue-3-onmounted-call-function-usefetch-function-not-getting-data-form
  homepageStore.init()
})
</script>

<template>
  <div>
    <div class="row" v-if="getStats?.user">
      <div v-if="boxData.length > 0" class="col-md-3" v-for="box in boxData" :key="box.id">
        <TextIconNumber
          :title="box.title"
          :subTitle="box.subTitle"
          :number="box.value"
          :percentage="box.percentage"
          :icon="box?.icon"
        ></TextIconNumber>
      </div>
    </div>
    <utilsSkeleton v-else />

    <Posts :records="3" />
  </div>
</template>
