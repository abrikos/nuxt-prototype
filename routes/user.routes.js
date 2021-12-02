import clientAxios from './clientAxios';

const userRoutes = {
  changePassword(data) {
    return new Promise((resolve, reject) => {
      clientAxios({url: '/api/password/change', method: 'post', data})
        .then((r) => resolve(r.data))
        .catch(reject)
    })
  },
  changeEmail(data) {
    return new Promise((resolve, reject) => {
      clientAxios({url: '/api/email/change', method: 'post', data})
        .then((r) => resolve(r.data))
        .catch(reject)
    })
  },
  signup(data) {
    return new Promise((resolve, reject) => {
      clientAxios({url: '/api/signup', method: 'post', data})
        .then((r) => resolve(r.data))
        .catch(reject)
    })
  },
  auth() {
    return new Promise((resolve, reject) => {
      clientAxios({url: '/api/auth', method: 'get'})
        .then((r) => resolve(r.data))
        .catch(reject)
    })
  },
  list() {
    return new Promise((resolve, reject) => {
      clientAxios({url: '/api/user/list', method: 'get'})
        .then((r) => resolve(r.data))
        .catch(reject)
    })
  },
  view(id) {
    return new Promise((resolve, reject) => {
      clientAxios({url: `/api/user/${id}/view`, method: 'get'})
        .then((r) => resolve(r.data))
        .catch(reject)
    })
  },
  update(id, data) {
    return new Promise((resolve, reject) => {
      clientAxios({url: `/api/user/${id}/update`, method: 'post', data})
        .then((r) => resolve(r.data))
        .catch(reject)
    })
  },
  logout() {
    return new Promise((resolve, reject) => {
      clientAxios({url: '/api/logout', method: 'get'})
        .then((r) => resolve(r.data))
        .catch(reject)
    })
  },
  loginPassword(data) {
    return new Promise((resolve, reject) => {
      clientAxios({url: '/api/login/password', method: 'post', data})
        .then((r) => resolve(r.data))
        .catch(reject)
    })
  }
}

export default userRoutes;
