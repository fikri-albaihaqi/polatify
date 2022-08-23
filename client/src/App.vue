<script>
import { RouterLink, RouterView } from 'vue-router'
import { getAccessToken } from './spotify'

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
  <router-view v-if="accessToken != null" name="home"></router-view>
  <router-view v-else-if="accessToken === null" name="login"></router-view>
  <router-view v-else></router-view>
</template>
