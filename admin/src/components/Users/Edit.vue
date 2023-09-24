<script setup>
import { useUserStore } from '@/store'
const userStore = useUserStore()

const props = defineProps({
  editing: Boolean,
  user: Object,
})

const emit = defineEmits(['updateEditing'])

const initialFormValues = { username: '', email: '', isActive: false, password: '', roles: [] }
const form = ref({ ...initialFormValues })

const isPasswordVisible = ref(false)

const update = () => {
  if (!valid.value) {
    const error = 'Please fill the form correctly!'
    messageStore.setError({ error })
  } else {
    userStore.updateUser({ ...form.value })
    emit('updateEditing', false)
  }
}

const valid = ref()
const rules = {
  username: [v => !!v || 'Username is required'],
  password: [v => !v || !!v || 'Password is required'],
  roles: [v => v.length > 0 || 'Roles is required'],
  email: v => {
    if (/^(([\w{1,100}-]+\.?)+\w+){1,100}@([a-zA-Z0-9+-]{1,100}\.){1,100}[a-zA-Z]{1,100}$/.test(v)) return true

    return 'Must be a valid e-mail'
  },
}
onMounted(() => {
  form.value = { ...props.user }
})
</script>

<template>
  <VForm
    v-if="editing"
    v-model="valid"
    lazy-validation
    @submit.prevent="() => {}"
  >
    <VRow>
      <!-- Username -->
      <VCol cols="12">
        <VTextField
          v-model="form.username"
          label="Username"
          :rules="rules.username"
        />
      </VCol>

      <!-- email -->
      <VCol cols="12">
        <VTextField
          v-model="form.email"
          :rules="[rules.email]"
          label="Email"
          type="email"
        />
      </VCol>

      <!-- password -->
      <VCol cols="12">
        <VTextField
          v-model="form.password"
          label="Password"
          :rules="rules.password"
          :type="isPasswordVisible ? 'text' : 'password'"
          :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
          hint="You can not display users' current passwords here"
          @click:append-inner="isPasswordVisible = !isPasswordVisible"
        />
      </VCol>

      <!-- createdTime -->
      <VCol cols="12">
        <VTextField
          v-model="form.createdTime"
          label="Created Time"
          disabled
        />
      </VCol>

      <!-- isActive -->
      <VCol cols="12">
        <VRadioGroup
          v-model="form.isActive"
          inline
        >
          <VRadio :value="true">
            <template #label>
              <strong class="text-success">Active</strong>
            </template>
          </VRadio>
          <VRadio :value="false">
            <template #label>
              <strong class="text-error">Passive</strong>
            </template>
          </VRadio>
        </VRadioGroup>
      </VCol>

      <VCol cols="12">
        <VSelect
          v-model="form.roles"
          :rules="rules.roles"
          :items="userStore.getRoles"
          item-title="name"
          item-value="_id"
          label="Select Roles"
          multiple
          hint="Select the user roles"
        />
      </VCol>

      <VCol cols="6">
        <VBtn
          block
          color="error"
          @click="emit('updateEditing', false)"
        >
          Cancel
        </VBtn>
      </VCol>

      <VCol cols="6">
        <VBtn
          block
          @click="update"
        >
          Update
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
