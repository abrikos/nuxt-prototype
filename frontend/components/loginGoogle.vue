<template>
  <div>
    <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"/>
    <button @click="test">Test Auth</button>
  </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';

export default {
  name: "loginGoogle",
  data() {
    return {
      // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
      params: {
        client_id: "215547990872-9ggmlbv72dpnhuho5uclpn4a2hhrs96j.apps.googleusercontent.com"
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
        longtitle: false
      }
    }
  },
  methods: {
    test() {
      console.log('x22')
    },
    onSuccess(data) {
      this.$nuxt.$emit('userLogged', data)
    },
    onFailure(data) {
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
