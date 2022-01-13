export default async function ({store, redirect, route, app}) {
  if (!store.getters.loggedUser) {
    const path = encodeURIComponent(route.path);
    console.log('Not logged Auth middle')
    const res = await app.$axios.$get('auth')
      .catch((e) => {
        console.warn(e.message)
      })
    if (!res) return redirect(`/login?redirectUrl=${path}`);
    app.$auth.setUser(res)
  }
}
