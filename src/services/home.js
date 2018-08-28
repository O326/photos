import axios from 'axios'

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

export function getBlogs () {
  return get('//webhostapi.000webhostapp.com/database/blog/query.php')
}
