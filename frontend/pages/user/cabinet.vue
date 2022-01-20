<template>
  <div>
    Cabinet
    {{loggedUser}}

  </div>
</template>

<script>
export default {
  name: "cabinet",
  computed: {
    loggedUser(){
      return this.$store.getters.loggedUser;
    }
  },
  methods:{
    test(){
      this.$axios.post('user/update', {superUser: false})
    }
  }
}
</script>

<style scoped>

</style>
