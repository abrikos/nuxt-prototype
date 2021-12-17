<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" sticky>
    <b-navbar-brand to="/">Softorium Admin</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-show="$store.state.user">
        <b-nav-item to="/post-list" :active='$route.name && !!$route.name.match(/^post/)'>Посты</b-nav-item>
        <b-nav-item to="/type" :active='$route.name ==="type"'>Типы постов</b-nav-item>
        <b-nav-item to="/word" :active='$route.name ==="word"'>Ключевые слова</b-nav-item>
        <b-nav-item to="/tag">Тэги</b-nav-item>
        <b-nav-item to="/file">Файлы</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ms-auto">
        <b-nav-item to="/profile" v-show="$store.state.user">{{ $store.state.user && $store.state.user.username }}
        </b-nav-item>
        <b-nav-item to="/signin" v-show="!$store.state.user">Вход</b-nav-item>
        <b-nav-item to="/signup" v-show="!$store.state.user">Регистрация</b-nav-item>
        <b-nav-item to="/logout" v-show="$store.state.user">Выход</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>

export default {
  name: "TopMenu",
}
</script>

<style scoped>

</style>
