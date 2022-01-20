<template>
  <b-form @submit.prevent="userLogin">
    <h1>Login page</h1>
    <b-container fluid class="w-50">
      <b-form-group label="Логин">
        <b-form-input v-model="username"></b-form-input>
      </b-form-group>
      <b-form-group label="Пароль">
        <b-form-input v-model="password"></b-form-input>
      </b-form-group>
      <b-form-group class="text-center m-2">
        <b-button type="submit">Вход</b-button>
      </b-form-group>
      <hr/>
      <b-alert show variant="danger" v-show="error">{{ error }}</b-alert>
    </b-container>
  </b-form>
</template>

<script>

export default {
  name: "loginPassword",
  layout: 'admin',
  auth: false,
  data() {
    return {
      username: 'user',
      password: '123',
      error: '',
    }
  },
  methods: {
    async userLogin() {
      try {
        const {username, password} = this;
        const data = {username, password};
        let res = await this.$auth.loginWith('custom', {data});
        this.$auth.setUser(res.data);
        this.$auth.strategy.token.set(res.data.token);
        const redirect = this.$auth.$storage.getUniversal('redirect');
        console.log('TRY TO REDIRECT', redirect);
        this.$router.push(redirect || '/admin/profile');
      } catch (error) {
        this.$set(this, "error", error.message);
      }
    }
  }
}
</script>

<style scoped>

</style>
