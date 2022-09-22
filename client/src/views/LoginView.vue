<script>
import Button from "../components/Button.vue";
import { login } from "../spotify/index.js";

export default {
  name: "login",
  components: {
    Button,
  },
  methods: {
    signin() {
      login();
    },
  },
};
</script>

<template>
    <div class="flex flex-col items-center justify-center font-poppins h-[92vh]">
      <img class="w-3/4 lg:w-1/3" src="../assets/logo.svg" alt="" />
      <h1 class="mb-4 text-center md:text-xl">Top track & artist generator in polaroid photo style</h1>
      <a href="login">
        <Button
          @click="signin"
          :text="'Log In To Spotify'"
          :class="[
            'rounded-full',
            'py-2',
            'px-8',
            'mt-4',
            'bg-secondary',
            'font-bold',
            'hover:bg-secondary-shade',
            'text-dark',
          ]"
        />
      </a>
    </div>
</template>