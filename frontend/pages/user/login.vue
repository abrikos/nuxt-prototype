<template>
  <div>
    <loginGoogle :userData.sync="userData"/>
    <login-password :userData.sync="userData"/>
  </div>
</template>

<script>
import loginGoogle from '@/components/loginGoogle';
import LoginFacebook from '@/components/loginFacebook';
import LoginPassword from '@/components/loginPassword';

export default {
  name: "login",
  auth: false,
  components: {LoginPassword, LoginFacebook, loginGoogle},
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

    },
  }
}
</script>

<style scoped>

</style>
