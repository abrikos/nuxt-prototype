export const state = () => ({
  user: null,
})

export const mutations = () => ({
  auth(state, {user}){
    state.user = user;
  },
  logout(state){
    state.user = null;
  },
  increment (state) {
    state.counter++
  }
})
