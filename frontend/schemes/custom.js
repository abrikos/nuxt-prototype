import {LocalScheme} from '~auth/runtime'

export default class CustomScheme extends LocalScheme {
  setUser(user){
    console.log('gggggggg', this, user)
  }
  // Override `fetchUser` method of `local` scheme
  async fetchUser(endpoint) {
    if (!this.$auth.ctx.route.path.match('/user')) return;
    const token = this.$auth.strategy.token.get();
    console.log('SSSSSSSSSSScheme', token, this.check())
    // Token is required but not available
    if (!this.check().valid) {
      return
    }

    // User endpoint is disabled.
    if (!this.options.endpoints.user) {
      this.$auth.setUser({})
      return
    }
    const ep = {headers:{}};
    ep.headers[this.$auth.strategies.custom.options.token.name] = token.uid;

    // Try to fetch user and then set
    return this.$auth.requestWith(
      this.name,
      ep,
      this.options.endpoints.user,
    ).then((response) => {
      const user = response.data
      // Transform the user object
      const customUser = {
        ...user,
        // fullName: user.firstName + ' ' + user.lastName,
        roles: ['user']
      }

      // Set the custom user
      // The `customUser` object will be accessible through `this.$auth.user`
      // Like `this.$auth.user.fullName` or `this.$auth.user.roles`
      this.$auth.setUser(customUser)

      return response
    }).catch((error) => {
      console.warn(error)
      this.$auth.callOnError(error, {method: 'fetchUser'})
    })
  }
}
