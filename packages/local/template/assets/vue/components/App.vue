<template>
  <div class="app">
    <p>{{ message }}</p>
  </div>
</template>

<script>
module.exports = {
  data () {
    return {
      message: 'Hello Vue!'
    }
  }
}
</script>

<style scoped>
p {
  font-size: var(--bold);
}
</style>
