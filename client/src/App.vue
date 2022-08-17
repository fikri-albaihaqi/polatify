<script>
import { RouterLink, RouterView } from 'vue-router'
import { getAccessToken } from './spotify';

export default {
  name: 'App',
  data() {
   return {
      accessToken: getAccessToken()
    }
  }
}
</script>

<template>
  <router-view v-if="accessToken" name="home"></router-view>
  <router-view v-else name="login"></router-view>
</template>
