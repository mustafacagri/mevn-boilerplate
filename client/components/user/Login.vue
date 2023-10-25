<script setup>
import { useUserStore } from '@/store/user'
import { useMessageStore } from '@/store/message'
import { regexEmail } from '@/utils/regex'
import { nextTick } from 'vue'

const route = useRoute()
const router = useRouter()

const userStore = useUserStore()
const messageStore = useMessageStore()

const emit = defineEmits(['updateComponent'])

const visibleEye = ref(true)
const isSubmitting = ref(false)
const formData = ref({ email: 'cagri@cagri.com', password: 'cagritest' })

const login = () => {
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

  userStore.login({ ...formData.value }).then(res => {
    if (res) {
      router.push('/user')
    } else {
      isSubmitting.value = false
    }
  })
}

onMounted(async () => {
  await nextTick() // https://stackoverflow.com/questions/76527094/nuxt-3-and-vue-3-onmounted-call-function-usefetch-function-not-getting-data-form
  const { type, email, authCode } = route.query

  if (type === 'activate') {
    userStore.activate({ email, authCode }).then(res => {
      if (res) {
        router.push('/user')
      }
    })
  }
})
</script>

<template>
  <utilsGetErrorSuccess />

  <div id="signinup" class="card">
    <div class="card-body">
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
        <div class="col-sm-4"></div>
        <div class="col-sm-8">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="remember" />
            <label class="form-check-label" for="remember"> Remember me</label>
          </div>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-sm-12">
          <button @click="login()" :disabled="isSubmitting" class="btn btn-primary">Sign In</button>
        </div>
      </div>
      <hr />
      <div class="text-center">
        New on our platform?
        <span class="row-pointer" @click="emit('updateComponent', false)">Create an account</span>
      </div>
    </div>
  </div>
</template>
