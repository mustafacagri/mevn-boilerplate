<script setup>
import Header from '@/components/general/Header'
import Footer from '@/components/general/footer'
</script>

<template>
  <div>
    <Header />
    <div class="container">
      <slot />
    </div>
    <Footer />
  </div>
</template>
