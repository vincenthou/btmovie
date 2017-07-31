webpackJsonp([1],[,,,,,,,,,function(t,e,a){"use strict";var s=a(1),r=a(54),o=a(50),n=a.n(o),i=a(49),c=a.n(i);s.default.use(r.a),e.a=new r.a({routes:[{path:"/",name:"movies",component:c.a},{path:"/search",name:"search",component:n.a},{path:"/tvplays",name:"tvplays",component:c.a}]})},function(t,e){},,,function(t,e,a){function s(t){a(41)}var r=a(3)(a(33),a(52),s,null,null);t.exports=r.exports},,,,,,,,,,,,,,,,,,,function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(1),r=a(10),o=(a.n(r),a(11)),n=a.n(o),i=a(13),c=a.n(i),u=a(9),l=a(12),v=a.n(l);s.default.use(v.a),s.default.use(n.a),s.default.config.productionTip=!1,new s.default({el:"#app",router:u.a,render:function(t){return t(c.a)}})},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app",data:function(){return{activeTab:"movies"}},methods:{handleTabChange:function(t){var e=t;this.activeTab=t,"movies"===t&&(e="/"),this.$router.push(e)}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(14),r=a.n(s);e.default={data:function(){return{isLoaded:!1,movieRows:[],hasDataLoadErr:!1,hasCopySuccess:!1,hasCopyErr:!1}},created:function(){this.fetchData()},watch:{$route:"fetchData"},methods:{fetchData:function(){var t=this;r.a.get("/btmovie/static/"+this.$route.name+".json").then(function(e){t.loading=!1;var a=e.data.sort(function(t,e){return e.score-t.score}).reduce(function(t,e,a,s){var r=~~(a/4);return a%4?t[r].push(e):t[r]=[e],t},[]);t.movieRows=a}).catch(function(e){e&&t.showToast("hasDataLoadErr")})},onCopySuccess:function(){this.showToast("hasCopySuccess")},onCopyError:function(){this.showToast("hasCopySuccess")},showToast:function(t){var e=this;this[t]=!0,this.toastTimer&&clearTimeout(this.toastTimer),this.toastTimer=setTimeout(function(){e[t]=!1},2e3)}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"search",data:function(){return{msg:"This is search page"}}}},,,,,function(t,e){},function(t,e){},function(t,e){},,,,,,,function(t,e,a){function s(t){a(42)}var r=a(3)(a(34),a(53),s,"data-v-cc97d45a",null);t.exports=r.exports},function(t,e,a){function s(t){a(40)}var r=a(3)(a(35),a(51),s,"data-v-083f7ac6",null);t.exports=r.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("h1",[t._v(t._s(t.msg))])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("mu-tabs",{attrs:{value:t.activeTab},on:{change:t.handleTabChange}},[a("mu-tab",{attrs:{value:"search",icon:"search",title:"搜索"}}),t._v(" "),a("mu-tab",{attrs:{value:"movies",icon:"restore",title:"电影"}}),t._v(" "),a("mu-tab",{attrs:{value:"tvplays",icon:"favorite",title:"电视剧"}})],1),t._v(" "),a("transition",[a("router-view")],1)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"post"},[t.hasDataLoadErr?a("mu-toast",{attrs:{message:"没有找到好电影"}}):t._e(),t._v(" "),t.hasCopyErr?a("mu-toast",{attrs:{message:"复制地址失败"}}):t._e(),t._v(" "),t.hasCopySuccess?a("mu-toast",{attrs:{message:"复制地址成功"}}):t._e(),t._v(" "),t.isLoaded?a("div",{staticClass:"loading"},[a("mu-circular-progress",{attrs:{size:40}})],1):t._e(),t._v(" "),a("div",{staticClass:"movies-wrapper"},t._l(t.movieRows,function(e,s){return a("mu-row",{key:s,staticClass:"movie-row",attrs:{gutter:""}},t._l(e,function(e,s){return a("mu-col",{key:s,attrs:{width:"100",tablet:"50",desktop:"25"}},[a("mu-card",[a("mu-card-media",{attrs:{title:e.title,subTitle:e.type}},[a("img",{attrs:{height:"500",src:e.poster}})]),t._v(" "),a("mu-card-actions",[a("mu-chip",[t._v(t._s(e.year))]),t._v(" "),a("mu-chip",[t._v(t._s(e.tag))]),t._v(" "),a("mu-chip",{attrs:{backgroundColor:"yellow300"}},[t._v(t._s(e.score))]),t._v(" "),a("mu-divider",{staticClass:"action-divider"}),t._v(" "),a("mu-raised-button",{attrs:{label:"原始详情页面",target:"__blank","a:href":"movie.link",primary:""}}),t._v(" "),a("mu-raised-button",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.paths.join("\n"),expression:"movie.paths.join('\\n')",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:t.onCopySuccess,expression:"onCopySuccess",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:t.onCopyError,expression:"onCopyError",arg:"error"}],attrs:{label:"复制下载地址",primary:""}})],1)],1)],1)}))}))],1)},staticRenderFns:[]}}],[32]);
//# sourceMappingURL=app.18aa2ff48ccb0bdf19a2.js.map