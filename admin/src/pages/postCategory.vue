<script setup>
import { useRoute } from 'vue-router'
import { useMessageStore, usePostStore } from '@/store'

const messageStore = useMessageStore()
const postStore = usePostStore()

const route = useRoute()
const id = computed(() => route.params.id)

const STRINGS = ref(
  id.value
    ? { title: 'Update The Post Category', updateCreate: 'Update' }
    : { title: 'Create a Post Category', updateCreate: 'Create' },
)

const valid = ref()
const formData = ref({})
const isSuccess = computed(() => messageStore.getIsSuccess)

const selectedCategories = ref([])

watch(
  () => postStore.getPostCategoryById(route.params.id),
  (newData, _oldData) => {
    formData.value = newData
  },
)

onMounted(() => {
  if (route.params.id) {
    formData.value = postStore.getPostCategoryById(route.params.id)
  }
})

const rules = {
  name: [v => !!v || 'Post category name is required'],
}

const update = () => {
  if (!valid) {
    messageStore.setError({ message: 'You should fill all fields' })
  } else {
    postStore.updatePostCategory(formData.value)
  }
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
                    v-model="formData.name"
                    label="Category Name"
                    :counter="55"
                    :rules="rules.name"
                    required
                  />
                </VCol>
              </VRow>

              <VRow>
                <!-- title -->
                <VCol cols="12">
                  <VTextField
                    v-model="formData.url"
                    label="URL"
                    :counter="55"
                    :rules="rules.url"
                  />
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
