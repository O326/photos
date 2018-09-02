<template>
  <div class="post-page">
    <div class="form-box">
      <h1>新建说说</h1>
      <input type="text" v-model="sTitle" placeholder="请输入标题" />
      <input type="text" v-model="sContent" placeholder="请输入内容（200字以内）" />
      <input type="text" v-model="sLocation" placeholder="请输入地点" />
      <input type="date" v-model="sDate" placeholder="请选择时间" />
      <div class="radio-group">
        <label><input type="radio" v-model="sType" value="0"><span>图片</span></label>
        <label><input type="radio" v-model="sType" value="1" disabled><span>文字</span></label>
        <label><input type="radio" v-model="sType" value="2" disabled><span>视频</span></label>
      </div>
      <div class="btn">
        <span>+上传图片</span>
        <div
          class="file-progress"
          :style="{
            width: uploadPercent,
            opacity: uploadOpacity,
            background: uploadColor
          }"
        />
        <input class="file-input" type="file" id="select" accept="image/*" />
      </div>
      <div class="preview-img" v-for="(img, i) in sImgArr" @click="onDeleteImg" :key="img" :data-index="i">
        <img :src="getImgUrl(img)" width="100%" >
      </div>
      <div class="btn btn-submit" @click="onSubmit">提交</div>
    </div>
  </div>
</template>

<script>
import * as qiniu from 'qiniu-js'
import axios from 'axios'
import { post } from '../services/home.js'

const COLOR = {
  BLUE: '#1BA7DE',
  RED: '#FF0000'
}
const IMG_CDN_HOST = '//pdtqbf99x.bkt.clouddn.com/'
const TOKEN_URL = '//webhostapi.000webhostapp.com/qiniu-api/upload-tokens.php'
const API_POST_PATH = '//webhostapi.000webhostapp.com/database/blog/'
const API_POST = {
  CREATE: API_POST_PATH + 'create.php',
  QUERY: API_POST_PATH + 'query.php',
  UPDATE: API_POST_PATH + 'update.php',
  DELETE: API_POST_PATH + 'delete.php'
}

export default {
  name: 'Post',
  data () {
    return {
      sTitle: '',
      sContent: '',
      sCate: '',
      sLocation: '',
      sDate: '',
      sType: '0',
      sImgArr: [],
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
          app.sImgArr.push(res.key)
        }
        // 调用sdk上传接口获得相应的observable，控制上传和暂停
        observable.subscribe(next, error, complete)
      })
    },
    getImageInfo (imgInfo) {
      qiniu.exif(imgInfo.key, IMG_CDN_HOST).then(res => {
        console.log(res)
      })
    },
    getImgUrl (imgKey) {
      return IMG_CDN_HOST + imgKey
    },
    onDeleteImg (e) {
      console.log(e.target.getAttribute('data-index'))
    },
    onSubmit () {
      const { sTitle, sType, sContent, sDate, sLocation, sImgArr } = this
      if (!sTitle || !sDate || !sLocation || !sDate || !sImgArr.length) {
        alert('请填写内容，上传图片')
        return
      }
      this.postData({
        title: sTitle,
        type: sType || '0',
        content: sContent,
        location: sLocation,
        date: sDate,
        img_keys: JSON.stringify(sImgArr),
        img_host: IMG_CDN_HOST
      })
    },
    postData (data) {
      post(API_POST.CREATE, data).then(() => {
        alert('插入成功')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.form-box {
  width: 500px;
  margin: 20px;
  text-align: left;
}
input {
  width: 30em;
  height: 2.2em;
  font-size: 15px;
  padding: 0 .6em;
  border: 1px solid #ddd;
  border-radius: .3em;
  margin: 10px 0;

  &[type="date"] {
    width: 11.6em;
  }
}
.radio-group {
  font-size: 15px;
  width: 37em;
  input {
    visibility: hidden;
    margin: 0;
    width: 0;
    &:checked + span {
      background: rgb(21, 231, 161);
      color: #fff;
    }
  }
  span {
    display: inline-block;
    background: #efefef;
    color: #666;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 60px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
  }
}
.btn {
  position: relative;
  margin: 10px 0;
  text-align: center;
  width: 12.7em;
  height: 2.2em;
  font-size: 15px;
  line-height: 2.2em;
  border-radius: .3em;
  color: #fff;
  overflow: hidden;
  background-color: rgb(119, 178, 245);
  cursor: pointer;
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

.preview-img {
  position: relative;
  width: 100%;
  margin: 10px 0;

  &:hover::before {
    content: '点击删除';
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
}
.btn.btn-submit {
  background-color: rgb(1, 6, 14);
}
</style>
