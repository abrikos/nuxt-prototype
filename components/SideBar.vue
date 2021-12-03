<template>
  <div>
    <b-sidebar id="global-sidebar" :title="$store.state.sidebar.name" right shadow="lg" backdrop>
      <div class="px-3 py-2">
        <Filters v-if="$store.state.sidebar.name==='filter'"/>
        <LoginForm v-if="$store.state.sidebar.name==='login'"/>
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
}
</script>

<style lang="sass">
#global-sidebar
  background-color: red
  margin: 50px 0 50px
  width: 80%
  height: 90%
  border-radius: 30px 0% 0% 30px
  button.close
    position: relative
    left: -100px
    top: 50px
    border-radius: 20px
    border: none
</style>
