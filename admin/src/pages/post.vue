<script setup>
// this file needs to be refactored ASAP!!!!
// we can not send the FormData to the store or request.js to create / update the post, that's why the structure is here!

import { useRoute } from 'vue-router'
import { useMessageStore, usePostStore } from '@/store'
import TipTap from '@/components/utils/TipTap.vue'

import axios from 'axios'

const messageStore = useMessageStore()
const postStore = usePostStore()

const route = useRoute()
const id = computed(() => route.params.id)

const STRINGS = ref(
  id.value ? { title: 'Update The Post', updateCreate: 'Update' } : { title: 'Create a Post', updateCreate: 'Create' },
)

const files = ref([])
const breadcrumbs = ref()

const valid = ref()
const formData = ref({})
const isSuccess = computed(() => messageStore.getIsSuccess)
const postCategories = computed(() => postStore.getPostCategories)

const selectedCategories = ref([])

const apiDomain = import.meta.env.VITE_API_DOMAIN

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
      disabled: true,
    },
  ]

  if (post?.title) {
    breadcrumbs.value = [...staticBreadcrumbs, ...breadcrumb]
  }
}

watch(
  () => postStore.getPostByIdCategoryId(route.params.id),
  (newData, _oldData) => {
    formData.value = newData
    initialize(formData.value)
  },
)

const uploadFile = event => {
  files.value = event.target.files
}

onMounted(() => {
  if (id.value) {
    formData.value = postStore.getPostByIdCategoryId(route.params.id)
  }
})

const update = async () => {
  const sendingFormData = new FormData()

  for (const [key, value] of Object.entries(formData.value)) {
    if (key === 'postCategories') {
      const postCategories = []

      for (const [_key, category] of Object.entries(value)) {
        postCategories.push(category)
      }

      sendingFormData.append('postCategories', postCategories)
    } else {
      sendingFormData.append(key, value)
    }
  }

  for (const i of Object.keys(files.value)) {
    sendingFormData.append('files', files.value[i])
  }

  const token = localStorage.getItem('token')

  const contentType = 'multipart/form-data'
  const headers = {
    'x-access-token': token,
    'content-type': contentType,
  }

  let postSettings = { url: 'admin/posts', type: 'post' }

  if (id.value) {
    // we will update the post, not create a new one
    postSettings = { url: 'admin/posts/' + id.value, type: 'put' }
  }

  axios[postSettings.type](import.meta.env.VITE_API_ENDPOINT + postSettings.url, sendingFormData, {
    headers,
  })
    .then(res => {
      const message = res.data?.message

      if (!res?.data?.isSuccess) {
        messageStore.setError({ error: message })
      } else if (message) {
        messageStore.setIsSuccess({ message })

        if (!id.value) {
          formData.value = {} // clear the formData after we successfully create a Post
        }
      }
    })
    .catch(error => messageStore.setError({ error }))
}

const rules = {
  title: [v => !!v || 'Title is required'],
  url: [v => !!v || 'URL is required'],
  postCategories: [v => v.length > 0 || 'You must select at least one post category'],
  hit: [v => !isNaN(parseInt(v)) || 'HIT is required'],
}
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
          v-if="isSuccess"
          border="bottom"
          color="success"
          dark
          class="text-center mb-4"
        >
          {{ isSuccess }}
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

        <VCard
          :title="STRINGS.title"
          class="pa-4 pt-7"
        >
          <VCardText v-if="!!formData">
            <VForm
              v-model="valid"
              lazy-validation
              @submit.prevent="() => {}"
            >
              <VRow>
                <!-- title -->
                <VCol cols="12">
                  <VTextField
                    v-model="formData.title"
                    label="Title"
                    :counter="55"
                    :rules="rules.title"
                    required
                  />
                </VCol>
              </VRow>
              <VRow>
                <!-- url -->
                <VCol cols="12">
                  <VTextField
                    v-model="formData.url"
                    label="URL"
                    :rules="rules.url"
                    required
                  />
                </VCol>
              </VRow>
              <VRow>
                <!-- hit -->
                <VCol cols="12">
                  <VTextField
                    v-model="formData.hit"
                    label="HIT"
                    type="number"
                    :rules="rules.hit"
                    required
                  />
                </VCol>
              </VRow>
              <VRow>
                <!-- postCategories -->
                <VCol cols="12">
                  <VSelect
                    v-model="formData.postCategories"
                    :items="postCategories"
                    label="Categories"
                    item-title="name"
                    item-value="_id"
                    multiple
                    required
                    :rules="rules.postCategories"
                    name="postCategories[]"
                    hint="Pick some categories"
                  />
                </VCol>
              </VRow>
              <VRow v-if="id">
                <!-- createdTime -->
                <VCol cols="12">
                  <VTextField
                    v-model="formData.createdTime"
                    label="Created Time"
                    disabled=""
                  />
                </VCol>
              </VRow>

              <VRow class="my-3">
                <!-- post image -->
                <VCol cols="4">
                  <p>Post Image:</p>
                  <input
                    type="file"
                    multiple
                    @change="uploadFile"
                  />
                </VCol>
                <VCol
                  v-if="formData.image"
                  cols="8"
                >
                  <img :src="apiDomain + formData.image" />
                </VCol>
              </VRow>

              <VRow>
                <!-- description -->
                <VCol cols="12">
                  <TipTap v-model="formData.description" />
                </VCol>
              </VRow>

              <VRow>
                <VCol cols="12">
                  <VBtn
                    :disabled="!valid"
                    @click="update"
                  >
                    {{ STRINGS.updateCreate }}
                  </VBtn>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped lang="scss">
img {
  max-width: 100%;
}
</style>
