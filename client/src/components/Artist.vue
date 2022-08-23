<script>
export default {
  name: 'Artist',
  props: {
    artist: Object,
  }
}
</script>

<template>
  <h1>
    {{artist.name}}
  </h1>
</template>