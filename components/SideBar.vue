<template>
  <div>
    <b-sidebar
      id="global-sidebar"
      :title="$store.state.sidebar.name"
      :width="widthCalc"
      right
      shadow="lg"
      backdrop
    >
      <div class="px-3 py-2">
        <Filters v-if="$store.state.sidebar.name==='filter'"/>
        <LoginForm v-if="$store.state.sidebar.name==='login'"/>
        {{className}}
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import Filters from '@/components/Filters';
import LoginForm from '@/components/LoginForm';
export default {
  name: "SideBar",
  components: {LoginForm, Filters},
  computed:{
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
