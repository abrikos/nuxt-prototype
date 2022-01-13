<template>
  <div>
    Cabinet
  </div>
</template>

<script>
export default {
  name: "cabinet",
  middleware: 'auth',
  mounted() {
    console.log(this.$store.state.use)
    // if (!this.$store.state.user) this.$router.push('/signin')
  }
}
</script>

<style scoped>

</style>
