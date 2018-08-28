<template>
  <div class="photo-swiper">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(img, index) in item.imgs" :key="index">
        <img :src="img" :alt="item.title" class="swiper-img">
      </swiper-slide>
      <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>

export default {
  name: 'PhotoSwiper',
  props: {
    item: {
      type: Object
    },
    swiperOption: {
      type: Object,
      default: function () {
        return {
          spaceBetween: 30,
          effect: 'fade',
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    }
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.photo-swiper {
  margin: 10px auto;
  background: #aaa;
}
// .swiper-slide {
// }
.swiper-img {
  width: 100%;
}
</style>
