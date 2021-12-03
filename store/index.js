export const state = () => ({
  user: null,
  sideBar: null,
})

export const mutations = () => ({
  setSidebarContent(state, name){
    console.log('tttt', name)
    state.sideBar = name;
  },
  auth(state, {user}){
    console.log('zzzzzzzzzzzzzzzzzzzzz', user)
    state.user = user;
  },
  logout(state){
    state.user = null;
  },
  increment (state) {
    state.counter++
  }
})
