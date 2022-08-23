<script>
export default {
  name: 'Track',
  props: {
    track: Object,
  }
}
</script>

<template>
  <h1>
    {{track.name}} - {{track.artists[0].name}}
  </h1>
</template>