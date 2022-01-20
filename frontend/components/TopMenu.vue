<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" sticky>
    <b-navbar-brand to="/">Poker Abrikos</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-show="loggedUser">
        <b-nav-item to="/user/cabinet" :active='$route.name && !!$route.name.match(/cabinet/)'>Кабинет</b-nav-item>
        <b-nav-item to="/user/logs">LOgs</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item
          v-for="locale in availableLocales"
          :key="locale.code"
          @click="switchLocale(locale.code)">
          {{ locale.name }}
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ms-auto">
        <b-nav-item to="/profile" v-show="loggedUser">{{ loggedUser && loggedUser.name }}
        </b-nav-item>
        <b-nav-item to="/user/login" v-show="!loggedUser">Вход</b-nav-item>
        <b-nav-item to="/user/signup" v-show="!loggedUser">Регистрация</b-nav-item>
        <b-nav-item @click="logout" v-show="loggedUser">Выход</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>

export default {
  name: "TopMenu",
  computed: {
    loggedUser() {
      return this.$store.getters.loggedUser;
    },
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$store.commit('logout')
    },
    switchLocale(code){
      this.$i18n.setLocale(code)
    }
  }
}
</script>

<style scoped>

</style>
