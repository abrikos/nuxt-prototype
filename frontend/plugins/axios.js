export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    console.log(config.method, 'Making request to ', config.url)
  })

  $axios.onError(error => {
    console.warn(error.response && error.response.data)
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
