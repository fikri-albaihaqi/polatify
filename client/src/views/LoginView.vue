<script>
import Button from '../components/Button.vue'

export default {
  name: 'login',
  components: {
    Button,
  }
}

</script>

<template>
  <div class="bg-background h-screen flex flex-col justify-center items-center">
    <h1 class="text-6xl font-righteous text-primary mb-8">Spofestify</h1>
    <a href="http://localhost:8888/login">
      <Button 
        :text="'LOG IN TO SPOTIFY'"
        :class="['rounded-full', 'py-2', 'px-4', 'bg-secondary', 'font-medium', 'hover:bg-secondary-shade']"
      />
    </a>
  </div>
</template>