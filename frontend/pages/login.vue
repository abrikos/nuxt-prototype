<template>
  <div>
    <loginGoogle :userData.sync="userData"/>
    <loginFacebook :userData.sync="userData"/>
  </div>
</template>

<script>
import loginGoogle from '@/components/loginGoogle';
import LoginFacebook from '@/components/loginFacebook';

export default {
  name: "login",
  components: {LoginFacebook, loginGoogle},
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
