<script>
import { RouterView } from "vue-router";
import { getAccessToken } from "./spotify";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  data() {
    return {
      accessToken: '',
    };
  },
  components: {
    Footer,
  },
  mounted() {
    this.accessToken = getAccessToken()
  }
};
</script>

<template>
  <div>
    <router-view v-if="accessToken != null" name="home"></router-view>
    <router-view v-else-if="accessToken === null" name="login"></router-view>
    <Footer />
  </div>
</template>
