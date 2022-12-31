<script setup>
import { useRoute } from 'vue-router'
import { useMessageStore, usePostStore } from '@/store'
import TipTap from '@/components/utils/TipTap.vue'

const messageStore = useMessageStore()
const postStore = usePostStore()

const route = useRoute()
const id = computed(() => route.params.id)

const STRINGS = ref(
  id.value ? { title: 'Update The Post', updateCreate: 'Update' } : { title: 'Create a Post', updateCreate: 'Create' },
)

const valid = ref()
const formData = ref({})
const isSuccess = computed(() => messageStore.getIsSuccess)
const postCategories = computed(() => postStore.getPostCategories)

const selectedCategories = ref([])

watch(
  () => postStore.getPostByIdCategoryId(route.params.id),
  (newData, _oldData) => {
    formData.value = newData
  },
)

onMounted(() => {
  formData.value = postStore.getPostByIdCategoryId(route.params.id)
})

const rules = {
  title: [v => !!v || 'Title is required'],
  url: [v => !!v || 'URL is required'],
  hit: [v => !isNaN(parseInt(v)) || 'HIT is required'],
}

const update = () => {
  if (!valid) {
    messageStore.setError({ message: 'You should fill all fields' })
  } else {
    postStore.updatePost(formData.value)
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
                  <VAutocomplete
                    v-model="formData.postCategories"
                    :items="postCategories"
                    label="Categories"
                    item-title="name"
                    item-value="_id"
                    multiple
                    hint="Pick some categories"
                  />
                </VCol>
              </VRow>
              <VRow>
                <!-- createdTime -->
                <VCol cols="12">
                  <VTextField
                    v-model="formData.createdTime"
                    label="Created Time"
                    disabled=""
                  />
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
