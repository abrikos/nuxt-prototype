<template>
  <b-alert
    v-if="!!alert"
    :variant="alert.variant"
    show
  >
    {{alert}}
    {{ alert.message }}
  </b-alert>
</template>

<script>
export default {
  name: "Alert",
  computed: {
    alert() {
      return this.$store.getters.getAlert
    }
  }
}
</script>

<style scoped lang="sass">
button
  cursor: none
</style>
