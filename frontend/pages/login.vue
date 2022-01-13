<template>
  <div>
    <LoginForm/>
    <form @submit.prevent="userLogin">
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
  </div>
</template>

<script>
import LoginForm from '@/components/GoogleLoginForm';

export default {
  name: "login",
  components: {LoginForm},
  data() {
    return {
      login: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith('google', {data: this.login})
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
