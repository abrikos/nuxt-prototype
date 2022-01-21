export const state = () => ({
  alert: null,
  alertTimer: 0
})

export const mutations = {
  setAlert(state, payload) {
    if (payload) {
      state.alertTimer = 10;
      const timer = setInterval(() => {
        console.log(state.alertTimer, this)
        this.commit('setAlertTimer', state.alertTimer - 1);
        if (state.alertTimer <= 0) {
          this.commit('setAlert2', null);
          clearInterval(timer);
        }
      }, 1000);
      state.alert = payload;
    }

  },
  setAlert2(state, payload) {
    state.alert = payload;
  },
  setAlertTimer(state, payload) {
    state.alertTimer = payload;
  }
}

export const getters = {
  loggedUser(state) {
    return state.auth.user
  },
  getAlert(state) {
    return state.alert
  },
  getAlertTimer(state) {
    return state.alertTimer
  },
}
