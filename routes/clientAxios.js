import axios from "axios";
const clientAxios = axios.create();
clientAxios.interceptors.response.use(
  res => res,
  err => {
    if (err.response.status > 300) {
      console.log(err.response)
      return Promise.reject({message: err.response.data.message || err.response.statusText, status: err.response.status, url: err.response.config.url});
    }
  }
)

async function fetch(options){
  //http://test1.softorium.pro
  //TODO get it from .env
  options.url = `${process.env.REMOTE_SERVER || ''}${options.url}`;
  return clientAxios(options)
}

export default fetch;
