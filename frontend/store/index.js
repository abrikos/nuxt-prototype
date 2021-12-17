export const state = () => ({
  user: null,
  sideBar: null,
})

export const mutations = () => ({
  setSidebarContent(state, name){
    state.sideBar = name;
  },
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
