<script setup>
import { useUserStore } from '@/store/user'
import { useMessageStore } from '@/store/message'
import { regexEmail } from '@/utils/regex'

const emit = defineEmits(['updateComponent'])

const userStore = useUserStore()
const { signup: signupAction } = userStore
const messageStore = useMessageStore()

const visibleEye = ref(true)
const visibleEye2 = ref(true)
const isSubmitting = ref(false)
const initialFormData = { email: 'cagri@cagri.com', username: 'cagritest', password: 'cagritest', repassword: 'cagritest' }
const formData = ref({ ...initialFormData })

const signup = () => {
  isSubmitting.value = true

  for (const [key, value] of Object.entries(formData.value)) {
    let error

    if (!value) {
      error = `${key} is a mandatory field!`
    } else if (!regexEmail(formData.value?.email)) {
      error = 'You must enter a valid email address'
    }

    if (error) {
      messageStore.setError({ error })

      setTimeout(() => {
        isSubmitting.value = false
      }, 2000) // prevent serial clicks

      return
    }
  }

  userStore.signup({ ...formData.value }).then(res => {
    if (res) {
      formData.value = { ...initialFormData }
    }
  })

  setTimeout(() => {
    isSubmitting.value = false
  }, 2000) // prevent serial clicks
}
</script>

<template>
  <utilsGetErrorSuccess />

  <div id="signinup" class="card">
    <div class="card-body">
      <div class="form-group row mb-2">
        <label for="username" class="col-sm-4 col-form-label">Username</label>
        <div class="col-sm-8">
          <input
            type="email"
            autocomplete="false"
            class="form-control"
            id="username"
            placeholder="Username"
            v-model="formData.username"
          />
        </div>
      </div>

      <div class="form-group row mb-2">
        <label for="email" class="col-sm-4 col-form-label">Email</label>
        <div class="col-sm-8">
          <input
            type="email"
            autocomplete="false"
            class="form-control"
            id="email"
            placeholder="Email"
            v-model="formData.email"
          />
        </div>
      </div>

      <div class="form-group row mb-2">
        <label for="password" class="col-sm-4 col-form-label">Password</label>
        <div class="col-sm-8">
          <div id="passwordColumn">
            <input
              :type="visibleEye ? 'password' : 'text'"
              class="form-control"
              id="password"
              placeholder="Password"
              v-model="formData.password"
            />
            <ClientOnly>
              <font-awesome-icon
                :icon="visibleEye ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"
                @click="visibleEye = !visibleEye"
              />
            </ClientOnly>
          </div>
        </div>
      </div>

      <div class="form-group row mb-2">
        <label for="repassword" class="col-sm-4 col-form-label">Re-Password</label>
        <div class="col-sm-8">
          <div id="passwordColumn">
            <input
              :type="visibleEye2 ? 'password' : 'text'"
              class="form-control"
              id="repassword"
              placeholder="Re-Password"
              v-model="formData.repassword"
            />
            <ClientOnly>
              <font-awesome-icon
                :icon="visibleEye2 ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"
                @click="visibleEye2 = !visibleEye2"
              />
            </ClientOnly>
          </div>
        </div>
      </div>

      <div class="form-group row">
        <div class="col-sm-12">
          <button @click="signup()" :disabled="isSubmitting" class="btn btn-primary">Sign Up</button>
        </div>
      </div>
      <hr />
      <div class="text-center">
        Already have an account?
        <span class="row-pointer" @click="$emit('updateComponent', true)">Sign in instead</span>
      </div>
    </div>
  </div>
</template>
