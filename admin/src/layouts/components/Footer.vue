<template>
  <div class="w-100 h-100 d-flex align-center justify-space-between">
    <!-- 👉 Footer: left content -->
    <span class="d-flex align-center">
      &copy;
      {{ new Date().getFullYear() }}
      Made With
      <VIcon
        icon="mdi-heart-outline"
        color="error"
        size="1.25rem"
        class="mx-1"
      />
    </span>
    <!-- 👉 Footer: right content -->
    <span class="d-md-flex gap-x-4 text-primary d-none">
      <a
        href="https://github.com/mustafacagri/mevn-stack-boilerplate"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary ms-1"
      > MEVN
        Stack Boilerplate</a>
      <a
        href="https://demos.themeselection.com/materio-vuetify-vuejs-admin-template-free/demo/"
        target="noopener noreferrer"
      >
        Vuejs 3 Admin Template
      </a>
    </span>
  </div>
</template>
