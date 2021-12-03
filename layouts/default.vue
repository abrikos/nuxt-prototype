<template>
  <div>
    <TopMenu/>
    <SideBar content="NuxtLogo"/>
    <b-container class="page-content">
      <b-button v-b-toggle.global-sidebar>Toggle Sidebar</b-button>
      <nuxt/>
    </b-container>

  </div>
</template>

<script>
import userRoutes from '~/routes/user.routes';

export default {
  mounted() {
    userRoutes.auth()
    .then(user=>{
      this.$store.commit('auth', {user})
    })
  }
}
</script>

<style lang="sass">
  body
    background-color: #47494E
    .page-content
      background-color: aliceblue
      min-height: 100vh
    h1
      text-align: center
    .post-words-list
      display: flex
      flex-wrap: wrap
      div
        border: 1px solid silver
        padding: 2px 5px
        margin: 2px
        border-radius: 2px
        cursor: pointer
    table
      thead
        th.post-image
          width: 200px
        th.post-header
          width: 700px
        th
          .sr-only
            display: none
</style>
