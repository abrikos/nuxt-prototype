<template>
  <div>
    <b-sidebar id="global-sidebar" title="Sidebar" right shadow="lg" backdrop>
      <div class="px-3 py-2">
        {{content}}
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  props: ['content']
}
</script>

<style lang="sass">
#global-sidebar
  background-color: red
  margin: 50px 0 50px
  width: 80%
  height: 90%
  border-radius: 30px 0% 0% 30px
  button
    position: relative
    left: -100px
    top: 50px
    border-radius: 20px
    border: none
</style>
