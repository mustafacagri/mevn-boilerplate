<script setup>
import H3 from './H3.vue'
const titles = [
  {
    title: 'Platform',
    content: [
      { url: '#', name: 'Home' },
      { url: '#', name: 'Features' },
      { url: '#', name: 'API' },
      { url: '#', name: 'Pricing' },
      { url: '#', name: "What's New" }
    ]
  },
  {
    title: 'Resources',
    content: [
      { url: '#', name: 'Documentation' },
      { url: '#', name: 'FAQ' },
      { url: '#', name: 'Blog' },
      { url: '#', name: 'Contact' }
    ]
  }
]
</script>

<template>
  <div class="container">
    <div id="Footer">
      <div class="logo">mustafacagri</div>
      <div class="row">
        <H3 v-for="h3 in titles" :key="h3.id" :data="h3"></H3>
        <div class="col-md-6">
          <h3>In Partnership With</h3>
          <div class="row">
            <div class="col-md-6"><i class="logos github"></i></div>
            <div class="col-md-6"><i class="logos npm"></i></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
// https://github.com/mustafacagri/vue-js-footer

$color: #353353;
$color2: #e3403a;
$color3: #747589;
$color4: #ffd15c;
@mixin font-size-xs {
  font-size: 12px;
}
@mixin font-size-md {
  font-size: 14px;
}
@mixin font-size-nm {
  font-size: 16px;
}
@mixin font-size-lg {
  font-weight: bold;
  font-size: 21px;
  font-family: 'Concert One', cursive;
  letter-spacing: 2px;
}
@mixin font-size-xl {
  font-weight: bold;
  font-size: 30px;
  font-family: 'Concert One', cursive;
  letter-spacing: 3px;
}

.container-fluid {
  max-width: 1600px;
}

#Footer {
  background-color: #fff;
  padding: 50px;
  margin-top: 30px;
  border-radius: 5px;
  box-shadow: 12px 12px 24px 0 #e1e8fa, -12px -12px 24px 0 #e1e8fa;
  .logo {
    color: $color;
    margin-bottom: 50px;
    @include font-size-xl;
  }
  h3 {
    color: $color2;
    @include font-size-lg;
  }
  a {
    color: $color3;
    display: block;
    margin-top: 15px;
    &:hover {
      color: $color2;
    }
  }
  .logos {
    background: url('@/assets/img/logos.png') no-repeat;
    width: 200px;
    height: 200px;
    display: inline-block;
  }
  .github {
    background-position: 0 0;
  }
  .npm {
    background-position: -200px 0;
  }
}
</style>
