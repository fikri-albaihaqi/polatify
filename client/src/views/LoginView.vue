<script>
import Button from '../components/Button.vue'
import { login } from '../spotify/index.js'

export default {
  name: 'login',
  components: {
    Button,
  },
  methods: {
    signin() {
      login()
    }
  }
}

</script>

<template>
  <div class="bg-background h-screen flex flex-col justify-center items-center">
    <h1 class="text-6xl font-righteous text-primary mb-8">Spofestify</h1>
    <a href="http://localhost:8888/login">
      <Button
        @click="signin"
        :text="'LOG IN TO SPOTIFY'"
        :class="['rounded-full', 'py-2', 'px-8', 'bg-secondary', 'font-medium', 'hover:bg-secondary-shade']"
      />
    </a>
  </div>
</template>