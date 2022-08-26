<script>
import Button from "../components/Button.vue";
import { login } from "../spotify/index.js";
import Footer from "../components/Footer.vue";

export default {
  name: "login",
  components: {
    Button,
    Footer,
  },
  methods: {
    signin() {
      login();
    },
  },
};
</script>

<template>
  <div class="h-screen flex flex-col justify-center items-center font-poppins">
    <div class="flex flex-col items-center mt-auto">
      <img class="w-3/4 lg:w-full" src="../assets/logo.svg" alt="" />
      <a href="http://localhost:8888/login">
        <Button
          @click="signin"
          :text="'Log In To Spotify'"
          :class="[
            'rounded-full',
            'py-2',
            'px-8',
            'my-4',
            'bg-secondary',
            'font-medium',
            'hover:bg-secondary-shade',
            'text-dark',
          ]"
        />
      </a>
    </div>
    <Footer></Footer>
  </div>
</template>