webpackJsonp([1],{"1uuo":function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("7+uW"),o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var i=n("VU/8")({name:"App"},o,!1,function(t){n("gsu9")},null,null).exports,r=n("/ocq"),s={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hello"},[n("h1",[t._v(t._s(t.msg))]),t._v(" "),n("h2",[t._v("Essential Links")]),t._v(" "),t._m(0),t._v(" "),n("h2",[t._v("Ecosystem")]),t._v(" "),t._m(1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[n("a",{attrs:{href:"https://vuejs.org",target:"_blank"}},[t._v("\n        Core Docs\n      ")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank"}},[t._v("\n        Forum\n      ")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank"}},[t._v("\n        Community Chat\n      ")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank"}},[t._v("\n        Twitter\n      ")])]),t._v(" "),n("br"),t._v(" "),n("li",[n("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[t._v("\n        Docs for This Template\n      ")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[e("a",{attrs:{href:"http://router.vuejs.org/",target:"_blank"}},[this._v("\n        vue-router\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"http://vuex.vuejs.org/",target:"_blank"}},[this._v("\n        vuex\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"http://vue-loader.vuejs.org/",target:"_blank"}},[this._v("\n        vue-loader\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank"}},[this._v("\n        awesome-vue\n      ")])])])}]};var l=n("VU/8")({name:"HelloWorld",data:function(){return{msg:"Welcome to Your Vue.js App"}}},s,!1,function(t){n("1uuo")},"data-v-d8ec41bc",null).exports,u=n("9CKM"),p=n("aozt"),c=n.n(p),v="#1BA7DE",_="#FF0000",h="http://pdtqbf99x.bkt.clouddn.com/",d={name:"Upload",data:function(){return{logo:"//qiniu.staticfile.org/static/images/qiniu_logo.5249e634.png",title:"七牛云图片上传",btnText:"选择文件",uploadPercent:"0%",uploadOpacity:1,uploadColor:v,previewImg:""}},mounted:function(){var t=this;c.a.get("//webhostapi.000webhostapp.com/qiniu-api/upload-tokens.php").then(function(e){t.initFileInput(e.data)})},methods:{initFileInput:function(t){var e={useCdnDomain:!0,region:u.region.z2},n={fname:"",params:{},mimeType:null},a=this;$("#select").change(function(){var o=this.files[0],i=o.name,r=u.upload(o,i,t,n,e);a.uploadColor=v;r.subscribe(function(t){var e=t.total.percent+"%";a.uploadPercent=e,a.uploadOpacity=.6},function(){a.uploadPercent="100%",a.uploadOpacity=.4,a.uploadColor=_,a.btnText="网络错误请重试"},function(t){console.log(t),setTimeout(function(){a.uploadOpacity=0},1e3),a.getImageInfo(t),a.previewImg=h+t.key})})},getImageInfo:function(t){u.exif(t.key,h).then(function(t){console.log(t)})},onCopyImgUrl:function(){}}},m={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"upload-comp"},[n("img",{staticClass:"logo",attrs:{src:t.logo,alt:t.title}}),t._v(" "),n("h1",[t._v(t._s(t.title))]),t._v(" "),n("div",{staticClass:"upload-box"},[n("span",[t._v(t._s(t.btnText))]),t._v(" "),n("div",{staticClass:"file-progress",style:{width:t.uploadPercent,opacity:t.uploadOpacity,background:t.uploadColor}}),t._v(" "),n("input",{staticClass:"file-input",attrs:{type:"file",id:"select"}})]),t._v(" "),n("div",{staticClass:"preview-box"},[n("div",{staticClass:"preview-img",on:{click:t.onCopyImgUrl}},[n("img",{attrs:{src:t.previewImg,alt:t.previewImg,height:"100%"}})]),t._v(" "),n("p",[n("a",{attrs:{href:t.previewImg}},[t._v(t._s(t.previewImg))])])])])},staticRenderFns:[]};var g=n("VU/8")(d,m,!1,function(t){n("g8xu")},"data-v-79783ee0",null).exports;a.a.use(r.a);var f=new r.a({mode:"history",routes:[{path:"/",name:"HelloWorld",component:l},{path:"/upload",name:"Upload",component:g}]});a.a.config.productionTip=!1,new a.a({el:"#app",router:f,components:{App:i},template:"<App/>"})},g8xu:function(t,e){},gsu9:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.b9f8897e71317008995d.js.map