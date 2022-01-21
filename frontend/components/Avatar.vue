<template>
  <img :src="avatar || '/no-avatar.png'" alt="avatar" class="user-avatar"/>
</template>

<script>
export default {
  name: "Avatar",
  props: {avatar:String},
}
</script>

<style scoped>

</style>
