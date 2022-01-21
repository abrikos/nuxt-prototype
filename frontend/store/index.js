export const state = () => ({
  alert: null,
  alertTimer: 0
})

export const mutations = {
  setAlert(state, payload) {
    console.log(this)
    if(payload) state.alertTimer = 10;
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
