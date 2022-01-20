<template>
  <b-form @submit.prevent="registration">
    <h1>Signup page</h1>
    <b-container fluid class="w-50">
      <b-form-group label="username">
        <b-form-input v-model="form.username" />
      </b-form-group>
      <b-form-group label="email">
        <b-form-input v-model="form.email" />
      </b-form-group>
      <b-form-group label="password">
        <b-form-input v-model="form.password" type="password"/>
      </b-form-group>
      <b-form-group label="confirm">
        <b-form-input v-model="form.passwordConfirm" type="password"/>
      </b-form-group>
      {{form}}
      <b-form-invalid-feedback :state="validation">
        Пароли должны совпадать!
      </b-form-invalid-feedback>
      <b-form-group class="text-center m-2">
        <b-button type="submit">Sign up</b-button>
        <b-button @click="rnd">Random11</b-button>
      </b-form-group>
      <hr/>
      <b-alert show variant="danger" v-show="error">{{ error }}</b-alert>
    </b-container>
  </b-form>
</template>

<script>

export default {
  name: "SignUp",
  auth: false,
  data() {
    return {
      error: '',
      form: {},
    }
  },
  computed: {
    validation() {
      return this.form.password === this.form.passwordConfirm;
    }
  },
  methods: {
    async registration() {
      console.log('zzzzzzzz')
      try {
        let response = await this.$axios.$post('/auth/signup', this.form);
        console.log(response);
        this.$router.push('/user/login');
      } catch (err) {
        console.log(err.message)
      }
    },
    rnd(){
      this.form.username= Math.random();
      this.form.email= Math.random() + '@aaa.com';
      this.form.password= '123';
      this.form.passwordConfirm= '123';
      this.error = this.form.username;
    },
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>
