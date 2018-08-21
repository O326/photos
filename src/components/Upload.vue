<template>
  <div class="upload-comp">
    <img :src="logo" :alt="title" class="logo">
    <h1>{{ title }}</h1>
    <div class="upload-box">
      <span>{{ btnText }}</span>
      <div
        class="file-progress"
        :style="{
          width: uploadPercent,
          opacity: uploadOpacity,
          background: uploadColor
        }"
      />
      <input class="file-input" type="file" id="select" />
    </div>
    <div class="preview-box">
      <div class="preview-img" @click="onCopyImgUrl">
        <img :src="previewImg" :alt="previewImg" height="100%" >
      </div>
      <p><a :href="previewImg">{{ previewImg }}</a></p>
    </div>
  </div>
</template>

<script>
import * as qiniu from 'qiniu-js'
import axios from 'axios'

const COLOR = {
  BLUE: '#1BA7DE',
  RED: '#FF0000'
}
const CDN_DOMAIN = 'http://pdtqbf99x.bkt.clouddn.com/'
const TOKEN_URL = '//webhostapi.000webhostapp.com/qiniu-api/upload-tokens.php'

export default {
  name: 'Upload',
  data () {
    return {
      logo: '//qiniu.staticfile.org/static/images/qiniu_logo.5249e634.png',
      title: '七牛云图片上传',
      btnText: '选择文件',
      uploadPercent: '0%',
      uploadOpacity: 1,
      uploadColor: COLOR.BLUE,
      previewImg: ''
    }
  },
  mounted () {
    axios.get(TOKEN_URL).then(res => {
      this.initFileInput(res.data)
    })
  },
  methods: {
    initFileInput (token) {
      let config = {
        useCdnDomain: true,
        region: qiniu.region.z2
      }
      let putExtra = {
        fname: '',
        params: {},
        mimeType: null
      }
      const app = this
      $('#select').change(function () {
        let file = this.files[0]
        let key = file.name
        let observable = qiniu.upload(file, key, token, putExtra, config)
        app.uploadColor = COLOR.BLUE

        const next = (response) => {
          const per = response.total.percent + '%'
          app.uploadPercent = per
          app.uploadOpacity = 0.6
        }
        const error = () => {
          app.uploadPercent = '100%'
          app.uploadOpacity = 0.4
          app.uploadColor = COLOR.RED
          app.btnText = '网络错误请重试'
        }
        const complete = (res) => {
          console.log(res)
          setTimeout(() => {
            app.uploadOpacity = 0
          }, 1000)
          app.getImageInfo(res)
          app.previewImg = CDN_DOMAIN + res.key
        }
        // 调用sdk上传接口获得相应的observable，控制上传和暂停
        observable.subscribe(next, error, complete)
      })
    },
    getImageInfo (imgInfo) {
      qiniu.exif(imgInfo.key, CDN_DOMAIN).then(res => {
        console.log(res)
      })
    },
    onCopyImgUrl () {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo {
  width: 100px;
  height: 100px;
}
.upload-box {
  position: relative;
  margin: 0 auto;
  width: 15em;
  height: 5em;
  font-size: 20px;
  line-height: 5em;
  background-color: #eee;
  border: .1em dashed #ddd;
  border-radius: .5em;
  overflow: hidden;
}
.file-input, .file-progress {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: pointer;
}
.file-input {
  opacity: 0;
}
.file-progress {
  opacity: .6;
  transition: all .5s ease-in-out;
}

.preview-box {
  margin: 10px auto;
  width: 600px;
  height: 200px;
  padding: 10px;
}
.preview-img {
  position: relative;
  height: 200px;
  display: inline-block;
}
.preview-img:hover::before {
  content: '点击复制链接';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: .5;
  background: #000;
  color: #fff;
  text-align: center;
  line-height: 200px;
  transition: all .5s ease-in;
  cursor: pointer;
}
</style>
