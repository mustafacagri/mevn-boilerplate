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
const router = useRouter()

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

const remove = () => {
  todoStore.deleteTodo(id.value).then(res => router.push('/user/todos'))
}
</script>

<template>
  <div v-if="todo" id="Todo">
    <div class="row" v-for="key in Object.keys(mapping)" :key="key">
      <div class="col-3 left">{{ mapping[key] }}:</div>
      <div class="col-9">{{ todo[key] }}</div>
    </div>

    <div class="form-group row actions mt-4">
      <div class="col-sm-9 offset-sm-3">
        <button class="btn mr-5 btn-danger" @click="remove()"><Icon icon="fas fa-close" class="me-2" />Remove</button>
        <router-link :to="`/user/todos/new?_id=${todo?._id}`">
          <button class="btn mr-5 btn-primary"><Icon icon="fas fa-pencil" class="me-2" />Edit</button>
        </router-link>
      </div>
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

  .actions {
    button {
      display: inline-block;
      width: auto;
    }

    button:not(:last-child) {
      margin-right: 10px;
    }
  }
}
</style>
