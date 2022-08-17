<template>
  <button @click="onClick()" class="">{{ text }}</button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: String,
    color: String,
    fontSize: String,
  },
  methods: {
    onClick() {
      this.$emit('btn-click')
    }
  }
};
</script>