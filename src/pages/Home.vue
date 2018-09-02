<template>
  <div class="home-page">
    <header>
      <h1>全锋的相册</h1>
      <p>发现美丽瞬间 用心体验生活</p>
      <div class="photo-content">
        <photo-swiper v-for="item in blogs" :item="item" :key="item.id"/>
      </div>
    </header>
  </div>
</template>

<script>
import PhotoSwiper from '@/components/PhotoSwiper.vue'
import { getBlogs } from '@/services/home'
export default {
  name: 'Home',
  components: {
    PhotoSwiper
  },
  data () {
    return {
      blogs: []
    }
  },
  mounted () {
    getBlogs().then(blogs => {
      this.blogs = blogs.map(i => {
        return {
          id: i.id,
          created_at: i.created_at,
          updated_at: i.updated_at,
          title: i.title,
          type: i.type,
          content: i.content,
          imgs: JSON.parse(i.img_keys),
          imgHost: i.img_host,
          location: i.location
        }
      })
    }).catch(err => {
      console.error(err)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.photo-content {
  width: 800px;
  margin: 0 auto;
}
</style>
