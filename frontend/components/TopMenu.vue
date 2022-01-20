<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" sticky>
    <b-navbar-brand to="/">Poker Abrikos</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-show="loggedUser">
        <b-nav-item to="/user/cabinet" :active='$route.name && !!$route.name.match(/cabinet/)'>{{ $t('Cabinet') }}</b-nav-item>
        <b-nav-item to="/user/logs">LOgs</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown :text="localeName" right>
          <b-dropdown-item
            v-for="locale in availableLocales"
            :key="locale.code"
            @click="switchLocale(locale.code)">
            {{ locale.name }}
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <b-navbar-nav class="ms-auto">
        <b-nav-item to="/profile" v-show="loggedUser">{{ loggedUser && loggedUser.name }}
        </b-nav-item>
        <b-nav-item to="/user/login" v-show="!loggedUser">{{ $t('Login') }}</b-nav-item>
        <b-nav-item to="/user/signup" v-show="!loggedUser">{{ $t('Signup') }}</b-nav-item>
        <b-nav-item @click="logout" v-show="loggedUser">{{ $t('Logout') }}</b-nav-item>
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
      return this.$i18n.locales.filter(l => l.code !== this.$i18n.locale)
    },
    localeName() {
      const locale = this.$i18n.locales.find(l => l.code === this.$i18n.locale)
      return locale.name
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$store.commit('logout')
    },
    switchLocale(code) {
      this.$i18n.setLocale(code)
    }
  }
}
</script>

<style scoped>

</style>
