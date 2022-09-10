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
    <div class="flex flex-col items-center mt-auto w-[80%]">
      <img class="w-3/4 lg:w-1/2" src="../assets/logo.svg" alt="" />
      <h1 class="mb-4 text-center md:text-xl">Top track and & artist generator in polaroid photo style</h1>
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
            'font-bold',
            'hover:bg-secondary-shade',
            'text-dark',
          ]"
        />
      </a>
    </div>
    <Footer></Footer>
  </div>
</template>