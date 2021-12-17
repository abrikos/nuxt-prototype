<template>
  <div class="p-3">
    <b-alert show variant="danger"  class="text-center">
      {{error.statusCode}} {{error.message}}
    </b-alert>
    <div>Ошибка {{error}}</div>
    <NuxtLink to="/">На главную</NuxtLink>

  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error' // you can set a custom layout for the error page
}
</script>
