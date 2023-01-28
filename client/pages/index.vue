<script setup>
import { storeToRefs } from 'pinia'
import { useHomepageStore } from '~/store/homepage'
import { TextIconNumber } from '@/components/box'
import Posts from '@/views/home/Posts'

const homepageStore = useHomepageStore()

const getStats = computed(() => homepageStore.getStats)

// ATTTENTION PLEASE!!!!
const { data } = await useAsyncData('data', () => $fetch(import.meta.env.VITE_API_ENDPOINT + 'homepage/stats')) // if I remove this line, homepageStore.getStats returns an empty object, strange!!!!!!

const boxData = computed(() =>
  Object.keys(getStats?.value).length === 0
    ? []
    : [
        { title: 'Hit', subTitle: 'Last week', value: getStats.value.postHits, percentage: -12 },
        { title: 'User', subTitle: 'Last week', value: getStats.value.user, percentage: 98 },
        { title: 'Post Category', subTitle: 'Last week', value: getStats.value.postCategory, percentage: -48 },
        { title: 'Post', subTitle: 'Last week', value: getStats.value.post, percentage: 22 }
      ]
)
</script>

<template>
  <div>
    <div class="row" v-if="getStats">
      <div class="col-md-3" v-for="box in boxData" :key="box.id">
        <TextIconNumber
          :title="box.title"
          :subTitle="box.subTitle"
          :number="box.value"
          :percentage="box.percentage"
          icon="box?.icon"
        ></TextIconNumber>
      </div>

      <Posts></Posts>
    </div>
  </div>
</template>
