export const state = () => ({
  alert: null,
})

export const mutations = {
  setAlert(state, payload) {
    state.alert = payload;
    state.alert.timer = 10;
    const timer = setInterval(() => {
      state.alert.timer--;
      this.commit('setAlert2', state.alert);
      if (state.alert.timer <= 0) {
        this.commit('setAlert2', null);
        clearInterval(timer);
      }
    }, 1000);
  },
  setAlert2(state, payload) {
    state.alert = payload;
  }
}

export const getters = {
  loggedUser(state) {
    return state.auth.user
  },
  getAlert(state) {
    return state.alert
  }
}
