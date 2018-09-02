import axios from 'axios'
import qs from 'qs'

function get (url) {
  return new Promise((resolve, reject) => {
    return axios.get(url).then(result => {
      if (result.status === 200) {
        resolve(result.data)
      } else {
        reject(result)
      }
    }).catch(result => {
      reject(result)
    })
  })
}

export function gotoLogin () {
  location.href = location.origin + location.pathname + '#/login'
}

export function post (url, data) {
  return new Promise((resolve, reject) => {
    const now = +new Date()
    const preTime = localStorage.getItem('last_login_time')
    if (preTime && now - parseInt(preTime) > 1000 * 60 * 60) {
      gotoLogin()
      return
    }

    return axios({
      method: 'post',
      url,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify(data)
    }).then(res => {
      if (res.data === 'SUCCESS') {
        resolve(res.data)
      } else if (res.data.indexOf('UNLOGIN') === 0) {
        gotoLogin()
      } else {
        alert(res.data)
      }
    })
  })
}

export function getBlogs () {
  return get('//webhostapi.000webhostapp.com/database/blog/query.php')
}
