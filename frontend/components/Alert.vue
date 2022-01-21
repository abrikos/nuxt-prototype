<template>
  <b-alert
    v-if="!!alert"
    :variant="alert.variant"
    show
  >
    {{ alert.message }}
  </b-alert>
</template>

<script>
export default {
  name: "Alert",
  computed: {
    alert() {
      return this.$store.getters.getAlert
    },
    timer() {
      return this.$store.getters.getAlertTimer
    }
  },
  created() {
    setInterval(() => {
      console.log(this.$store.getters.getAlertTimer)
      if(this.$store.getters.getAlertTimer > 0)
        this.$store.commit('setAlertTimer', this.$store.getters.getAlertTimer -1)
      else if(this.$store.getters.getAlert)
        this.$store.commit('setAlert')
    }, 1000)
  }
}
</script>

<style scoped lang="sass">
button
  cursor: none
</style>
