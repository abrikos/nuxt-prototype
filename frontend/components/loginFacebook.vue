<template>
  <facebook-login class="button"
                  appId="326022817735322"
                  @login="getUserData"
                  @logout="onLogout"
                  @get-initial-status="getUserData">
  </facebook-login>
</template>

<script>
import facebookLogin from 'facebook-login-vuejs';

export default {
  components: {
    facebookLogin
  },
  name: "loginFacebook",
  methods:{
    getUserData(data){
      console.log('getUser', data);
    },
    onLogout(data){
      console.log('onLogout', data);
    }
  }
}
</script>

<style scoped>

</style>
