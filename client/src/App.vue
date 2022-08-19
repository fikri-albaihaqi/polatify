<script>
import { RouterLink, RouterView } from 'vue-router'
import { token } from './spotify'

export default {
  name: 'App',
  data() {
   return {
      accessToken: token
    }
  }
}
</script>

<template>
  <router-view v-if="accessToken" name="home"></router-view>
  <router-view v-else name="login"></router-view>
  <router-view></router-view>
</template>
