<template>
  <div>
    Cabinet
    {{loggedUser}}
  </div>
</template>

<script>
export default {
  name: "cabinet",
  middleware: 'authenticated',
  computed: {
    loggedUser(){
      return this.$store.getters.loggedUser;
    }
  }
}
</script>

<style scoped>

</style>
