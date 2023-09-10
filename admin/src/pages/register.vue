<script setup>
import authV1MaskDark from '@/assets/images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@/assets/images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@/assets/images/pages/auth-v1-tree-2.png'
import authV1Tree from '@/assets/images/pages/auth-v1-tree.png'
import logo from '@/assets/logo.svg?raw'
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import { request } from '@/utils'
import { useTheme } from 'vuetify'
import { useMessageStore } from '@/store'

const messageStore = useMessageStore()

const username = ref('')
const password = ref('')
const email = ref('')

const initialFormValues = { username: '', email: '', password: '', privacyPolicies: false }

const form = ref({ ...initialFormValues })
const vuetifyTheme = useTheme()
const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})
const isPasswordVisible = ref(false)

const valid = ref()
const rules = {
  username: [v => !!v || 'Username is required'],
  password: [v => !!v || 'Password is required'],
  email: v => {
    if (/^(([\w{1,100}-]+\.?)+\w+){1,100}@([a-zA-Z0-9+-]{1,100}\.){1,100}[a-zA-Z]{1,100}$/.test(v)) return true

    return 'Must be a valid e-mail'
  },
  privacyPolicies: [v => !!v || 'Privacy Policy & Terms should be checked'],
}

const signup = async () => {
  if (!valid.value) {
    const error = 'Please fill the form!'
    messageStore.setErrorClear({ error })
  } else {
    const { username, password, email } = form.value

    await request(
      'post',
      'auth/signup',
      {
        username,
        password,
        email,
      },
      60_000, // the message will stay here for 60 seconds
    )
      .then(res => {
        if (res?.isSuccess) {
          form.value = { ...initialFormValues }
        }
      })
      .catch(err => {
        messageStore.setError({ error: err.message })
      })
  }
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VAlert
        v-if="messageStore.error"
        border="bottom"
        color="error"
        dark
        class="text-center"
      >
        {{ messageStore.error }}
      </VAlert>

      <VAlert
        v-if="messageStore.getIsSuccess"
        border="bottom"
        color="success"
        dark
        class="text-center"
      >
        {{ messageStore.getIsSuccess }}
      </VAlert>

      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div v-html="logo" />
          </div>
        </template>

        <VCardTitle class="font-weight-semibold text-2xl text-uppercase"> MEVN BOILERPLATE </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">Adventure starts here 🚀</h5>
        <p class="mb-0">Make your app management easy and fun!</p>
      </VCardText>

      <VCardText>
        <VForm
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
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
              <div class="d-flex align-center mt-1 mb-4">
                <VCheckbox
                  id="privacy-policy"
                  v-model="form.privacyPolicies"
                  :rules="rules.privacyPolicies"
                  inline
                />
                <VLabel
                  for="privacy-policy"
                  style="opacity: 1"
                >
                  <span class="me-1">I agree to</span>
                  <a
                    href="javascript:void(0)"
                    class="text-primary"
                    >privacy policy & terms</a
                  >
                </VLabel>
              </div>

              <VBtn
                block
                @click="signup"
              >
                Sign up
              </VBtn>
            </VCol>

            <!-- login instead -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>Already have an account?</span>
              <RouterLink
                class="text-primary ms-2"
                to="login"
              >
                Sign in instead
              </RouterLink>
            </VCol>

            <VCol
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol>

            <!-- auth providers -->
            <VCol
              cols="12"
              class="text-center"
            >
              <AuthProvider />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <VImg
      class="auth-footer-start-tree d-none d-md-block"
      :src="authV1Tree"
      :width="250"
    />

    <VImg
      :src="authV1Tree2"
      class="auth-footer-end-tree d-none d-md-block"
      :width="350"
    />

    <!-- bg img -->
    <VImg
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
    />
  </div>
</template>

<style lang="scss">
@use '@core/scss/pages/page-auth.scss';
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
