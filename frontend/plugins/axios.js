import https from 'https';
export default function ({ $axios, redirect }) {
  $axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });
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
