export const state = () => ({
  user: null,
})

export const mutations = {
  setUser(state, payload){
    state.user = payload;
  },
  logout(state){
    state.user = null;
  }
}

export const getters = {
  loggedUser(state){
    return state.auth.user
  }
}
