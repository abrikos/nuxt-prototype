<template>
  <div>
    <b-sidebar
      id="global-sidebar"
      :title="sidebar.name"
      :width="widthCalc"
      right
      shadow="lg"
      backdrop
    >
      <div class="px-3 py-2">
        <Filters v-if="sidebar.name==='filter'"/>
        <LoginForm v-if="sidebar.name==='login'"/>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  computed:{
    sidebar(){
      return this.$store.state.sidebar
    },
    widthCalc(){
      switch (this.$store.state.sidebar.name){
        case 'login': return '40%'
        default: return '80%'
      }
    }
  }
}
</script>

<style lang="sass">
#global-sidebar
  background-color: red
  border-radius: 30px 0% 0% 30px
  button.close
    position: relative
    left: -100px
    top: 50px
    border-radius: 20px
    border: none
</style>
