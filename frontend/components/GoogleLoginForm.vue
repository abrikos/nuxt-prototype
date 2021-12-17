<template>
  <div>
    <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure">Login</GoogleLogin>
  </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';
export default {
  name: "LoginForm",
  data() {
    return {
      // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
      params: {
        client_id: "215547990872-9ggmlbv72dpnhuho5uclpn4a2hhrs96j.apps.googleusercontent.com"
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      }
    }
  },
  mounted() {
    console.log(process.env);
  },
  methods:{
    onSuccess(data){
      console.log(data)
      this.$axios.$post('/login/google', data)
    },
    onFailure(data){
      console.error(data)
    }
  },
  components: {
    GoogleLogin
  }
}
</script>

<style scoped>

</style>
