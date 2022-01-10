<template>
  <div>
    <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure" />
    <button @click="test">Test Auth</button>
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
    test(){
      this.$axios.$get('auth')
    },
    onSuccess(data){
      this.$axios.$post('login/google', data)
        .then(user => {
          this.$store.commit('setUser', user);
          this.$router.push('/cabinet')
        });
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
