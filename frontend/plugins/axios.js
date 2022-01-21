export default function ({app, $axios}) {
  $axios.onRequest(config => {
    const token = app.$auth.strategy.token.get();
    if (token) {
      config.headers[app.$auth.strategies.custom.options.token.name] = token.uid;
    }
    console.log(config.method, 'to', config.url)
  })

  $axios.onError(error => {
    console.warn(error.response, error.response.data)
    if(error.response) {
      error.response.data.variant = 'danger';
      return Promise.reject(error.response.data);
    }
  })
}
