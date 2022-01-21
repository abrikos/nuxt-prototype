<template>
  <b-form @submit.prevent="update">
    <h1>{{ $t('Cabinet') }}</h1>
    <b-container fluid class="w-50">
      <b-form-group :label="$t('Username')">
        <b-form-input :value="username" disabled/>
      </b-form-group>
      <b-form-group :label="$t('Alias')">
        <b-form-input v-model="alias"/>
      </b-form-group>
      <b-form-group :label="$t('Avatar')">
        <b-form-input v-model="avatar"/>
      </b-form-group>
      <b-form-group class="text-center m-2">
        <b-button type="submit">{{ $t('Save') }}</b-button>
      </b-form-group>
      <hr/>
    </b-container>
  </b-form>
</template>

<script>
export default {
  name: "cabinet",
  data() {
    return {
      alias: this.$store.getters.loggedUser.name,
      avatar: this.$store.getters.loggedUser.avatar,
      username: this.$store.getters.loggedUser.username,
    }
  },
  methods: {
    update() {
      const {alias, avatar} = this
      this.$axios.$post('/user/update', {alias, avatar})
        .then(user=>this.$auth.setUser(user))
        .catch(error => {
          this.$store.commit('setAlert', error)
        })

    }
  }
}
</script>

<style scoped>

</style>
