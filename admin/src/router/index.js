import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import { useUserStore } from '@/store'
import singlePost from '@/pages/post.vue'
import commentsOfPost from '@/pages/comments.vue'
import singlePostCategory from '@/pages/postCategory.vue'

import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...setupLayouts(routes)],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.addRoute({
  name: 'singlePost',
  path: '/post/:id',
  components: { default: singlePost, NavbarThemeSwitcher },
})

router.addRoute({
  name: 'commentsOfPost',
  path: '/comments/:id',
  components: { default: commentsOfPost, NavbarThemeSwitcher },
})

router.addRoute({
  name: 'singlePostCategory',
  path: '/postCategory/:id',
  components: { default: singlePostCategory, NavbarThemeSwitcher },
})

router.beforeEach(async (to, from) => {
  const userStore = await useUserStore()
  let isAdmin = false

  if (!(to.name === 'login' || to.name === 'register')) {
    isAdmin = (await userStore.isAdmin()) === true
  }

  if (
    // make sure the user is authenticated ❗️ Avoid an infinite redirect
    !isAdmin &&
    !(to.name === 'login' || to.name === 'register')
  ) {
    // redirect the user to the login page
    return { name: 'login' }
  } else if (isAdmin && (to.name === 'login' || to.name === 'register')) {
    return { name: 'index' }
  }
})

export default router
