<script setup>
import { useUserStore } from '@/store'
const userStore = useUserStore()

const props = defineProps({
  user: Object,
})

const dialog = ref(false)

const remove = () => {
  userStore.removeUser({ ...props.user })
  dialog.value = false
}
</script>

<template>
  <VBtn color="error">
    <VIcon icon="mdi-close" />

    <VDialog
      v-model="dialog"
      activator="parent"
      width="400"
    >
      <VCard>
        <VCardText class="text-center">
          <div class="mb-2">
            Are you sure to remove the user?
            <p class="mt-2">
              username: <strong>{{ user?.username }} </strong><br />
              email: <strong>{{ user?.email }} </strong>
            </p>
          </div>
          <VBtn
            color="error"
            class="mr-2"
            @click="remove()"
          >
            <VIcon
              icon="mdi-close"
              class="mr-2"
            />
            Remove
          </VBtn>

          <VBtn
            color="primary"
            @click="dialog = false"
          >
            Cancel
          </VBtn>
        </VCardText>
      </VCard>
    </VDialog>
  </VBtn>
</template>
