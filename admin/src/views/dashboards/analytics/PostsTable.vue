<script setup>
import { usePostStore } from '@/store/all'
import MTable from '@/components/utils/Table.vue' // lets create a beatiful package for vue3 data table, as the vuetify does not have it yet!11!!1!!1!!!

const postStore = usePostStore()
const data = computed(() => {
  return postStore.getLastXPosts(5).map(item => {
    if (item?.postCategories.length > 0) {
      item.categories = item.postCategories.map(cat => cat.name).join(', ')
    }

    return item
  })
})

const headers = [
  { text: 'TITLE', value: 'title' },
  { text: 'HIT', value: 'hit' },
  { text: 'DATE', value: 'date' },
  { text: 'URL', value: 'url' },
  { text: 'CATEGORIES', value: 'categories' },
  { text: 'COMMENTS', value: 'comments', class: 'text-center' },
  { text: 'ACTION', value: 'action', class: 'text-center' },
]
</script>

<template>
  <VCard>
    <!-- <MTable
      :headers="headers"
      :items="data"
    >
      <template #item.action="{ item }">
        <VBtn
          color="success"
          :to="'post/' + item._id"
        >
          <VIcon icon="mdi-pencil" />
        </VBtn>
      </template>
    </MTable> -->

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
            :class="header?.class"
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
            <VBtn
              :color="row.noOfNotActives > 0 ? 'warning' : 'primary'"
              :to="'comments/' + row._id"
            >
              <VIcon
                icon="mdi-comment"
                class="mr-2"
              />{{ row.noOfNotActives }} / {{ row.noOfComments }}
            </VBtn>
          </td>
          <td>
            <VBtn
              color="success"
              :to="'post/' + row._id"
            >
              <VIcon icon="mdi-pencil" />
            </VBtn>
          </td>
        </tr>
      </tbody>
    </VTable>
  </VCard>
</template>
