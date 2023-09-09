<script setup>
import { useMessageStore, usePostStore } from '@/store'
import { isActive } from '@tiptap/vue-3'
const postStore = usePostStore()

const props = defineProps(['comment', 'isLoaded', 'postId'])
const { postId } = props

const isLoading = ref(false)
const isUpdating = ref(false)
const updateComment = data => {
  isLoading.value = true
  postStore.updateComment({ postId, comment: { ...data } })
}

const initialFormValues = { name: '', email: '', comment: '', isActive: false }
const formData = ref({ ...initialFormValues })

const update = data => {
  isUpdating.value = true

  formData.value = { ...data }
}

watch(
  () => props.isLoaded,
  (newData, _oldData) => {
    if (newData) {
      isLoading.value = false
      isUpdating.value = false
    }
  },
)
</script>

<template>
  <VCard
    v-if="comment"
    class="mt-5"
    :class="comment?.isActive ? 'approvedCard' : 'notApprovedCard'"
  >
    <VContainer class="pb-0 pt-2">
      <VRow
        v-if="isUpdating"
        class="pt-2 pb-3"
      >
        <VCol cols="12"
          ><VTextField
            v-model="formData.name"
            :rules="rules"
            label="Name"
          />
        </VCol>
        <VCol cols="12"
          ><VTextField
            v-model="formData.email"
            :rules="rules"
            label="Email"
        /></VCol>
        <VCol cols="12"
          ><VTextarea
            clearable
            v-model="formData.comment"
            :rules="rules"
            label="Comment"
          />
        </VCol>
        <VCol cols="12">
          <v-radio-group
            v-model="formData.isActive"
            inline
          >
            <VRadio
              label="Not Approved"
              :value="false"
            ></VRadio>
            <VRadio
              label="Approved"
              :value="true"
            ></VRadio>
          </v-radio-group>
        </VCol>
        <VCol cols="12">
          <VBtn
            v-if="isLoading"
            color="primary"
            class="mr-2"
          >
            <VIcon icon="mdi-progress-clock"></VIcon
          ></VBtn>

          <VBtn
            :disabled="isLoading"
            color="success"
            class="mr-2"
            @click="updateComment({ ...formData })"
            >Save</VBtn
          >

          <VBtn
            :disabled="isLoading"
            color="error"
            @click="isUpdating = false"
            >Cancel</VBtn
          >
        </VCol>
      </VRow>
      <VRow v-if="!isUpdating">
        <VCol
          cols="8"
          class="v-card-title"
        >
          {{ comment?.name }}
        </VCol>
        <VCol
          cols="4"
          class="text-right"
        >
          <VIcon
            v-if="!isUpdating"
            icon="mdi-pencil"
            color="warning"
            class="mr-2"
            @click="update(comment)"
          ></VIcon>
          <VIcon
            v-if="typeof comment?.isActive === 'boolean' && !isLoading"
            :icon="comment?.isActive ? 'mdi-close' : 'mdi-check'"
            :color="comment?.isActive ? 'error' : 'success'"
            @click="updateComment({ ...comment, isActive: !comment?.isActive })"
          />
          <VIcon
            v-if="isLoading"
            icon="mdi-progress-clock"
            color="primary"
          ></VIcon>
        </VCol>
      </VRow>
    </VContainer>

    <VCardText
      v-if="!isUpdating"
      class="pt-0 pb-3"
      >{{ comment.comment }}
      <p class="mt-2 mb-0">{{ comment.createdTime }}</p>
    </VCardText>
  </VCard>
</template>
