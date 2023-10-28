<script setup>
definePageMeta({
  layout: 'todos',
  middleware: 'auth'
})

import { request } from '@/utils/request'
import { timeDisplay } from '@/utils/time'
import { useTodoStore } from '@/store'
const todoStore = useTodoStore()

const route = useRoute()

const todo = ref(null)
const mapping = {
  title: 'Title',
  priority: 'Priority',
  status: 'Status',
  createdTime: 'Created Time',
  lastUpdatedDate: 'Last Updated Date',
  description: 'Description'
}

const id = computed(() => route.params?.id)

onMounted(() => {
  request('get', 'todos/' + id.value).then(res => {
    todo.value = res

    todo.value?.priority && (todo.value.priority = todo.value?.priority?.name || '-')
    todo.value?.status && (todo.value.status = todo.value?.status?.name || '-')
    todo.value?.createdTime && (todo.value.createdTime = timeDisplay(todo.value?.createdTime) || '-')
    todo.value?.lastUpdatedDate && (todo.value.lastUpdatedDate = timeDisplay(todo.value?.lastUpdatedDate) || '-')
  })
})

const addComment = comment => {
  todo.value.comments.push(comment)
}
</script>

<template>
  <div v-if="todo" id="Todo">
    <div class="row" v-for="key in Object.keys(mapping)" :key="key">
      <div class="col-3 left">{{ mapping[key] }}:</div>
      <div class="col-9">{{ todo[key] }}</div>
    </div>
  </div>
  <utilsSkeleton v-else />
</template>

<style scoped lang="scss">
#Todo {
  padding-top: 20px;

  .row {
    margin-bottom: 10px;

    &:after {
      content: '';
      display: table;
      clear: both;
      width: 100%;
      height: 1px;
      background-color: #eee;
      margin-top: 10px;
    }

    .left {
      text-align: right;
      padding-right: 10px;
    }
  }
}
</style>
