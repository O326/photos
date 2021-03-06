import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Post from '@/pages/Post'
import Upload from '@/pages/Upload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/Login',
      name: 'Login',
      component: Login
    }, {
      path: '/Post',
      name: 'Post',
      component: Post
    }, {
      path: '/upload',
      name: 'Upload',
      component: Upload
    }
  ]
})
