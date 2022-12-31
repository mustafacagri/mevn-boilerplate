<script setup>
import { usePostStore } from '@/store/all'
import { Types } from 'mongoose'

const route = useRoute()

const postStore = usePostStore()
let data = []

if (Types.ObjectId.isValid(route?.query?.categoryId)) {
  data = computed(() => {
    return postStore.getPostsWithCatNamesByCatId(route.query.categoryId)
  })
} else {
  data = computed(() => {
    return postStore.showPostsWithCatNames
  })
}

const headers = [
  { text: 'TITLE', value: 'title' },
  { text: 'HIT', value: 'hit' },
  { text: 'DATE', value: 'date' },
  { text: 'URL', value: 'url' },
  { text: 'CATEGORIES', value: 'categories' },
  { text: 'ACTION', value: 'action' },
]
</script>

<template>
  <VCard>
    <VCardTitle class="text-right">
      <VBtn
        class="ma-2"
        color="success"
        to="post"
      >
        Create New Post
      </VBtn>
    </VCardTitle>
    <VTable
      :headers="headers"
      :items="data"
      class="table-rounded"
      hide-default-footer
    >
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header.value"
            scope="col"
          >
            {{ header.text }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="row in data"
          :key="row._id"
        >
          <td v-text="row.title" />
          <td v-text="row.hit" />
          <td v-text="row.createdTime" />
          <td v-text="row.url" />
          <td v-text="row.categories" />
          <td>
            <VBtn :to="'post/' + row._id">
              <VIcon icon="mdi-pencil" />
            </VBtn>
          </td>
        </tr>
      </tbody>
    </VTable>
  </VCard>
</template>
