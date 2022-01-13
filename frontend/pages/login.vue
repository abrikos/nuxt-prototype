<template>
  <div>
    <loginGoogle :userData.sync="userData"/>
    <form @submit.prevent="doLogin">
      <div>
        <label>Username</label>
        <input type="text" v-model="login.username"/>
      </div>
      <div>
        <label>Password</label>
        <input type="text" v-model="login.password"/>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
    {{$router.currentRoute.query}}
  </div>
</template>

<script>
import loginGoogle from '@/components/loginGoogle';

export default {
  name: "login",
  components: {loginGoogle},
  created() {
    this.$nuxt.$on('userLogged', this.doLogin)
  },
  data() {
    return {
      userData: null,
      login: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async doLogin(data) {
      const res = await this.$auth.loginWith('local', {data: {strategy: 'google', data}})
      this.$auth.setUser(res.data);
      await this.$router.push(this.$router.currentRoute.query.redirectUrl || '/')

    }
  }
}
</script>

<style scoped>

</style>
