webpackJsonp([1],{23:function(e,t,n){"use strict";var r=n(2),a=n(81),u=n(76),o=n.n(u),s=n(77),i=n.n(s);r.default.use(a.a),t.a=new a.a({routes:[{path:"/",name:"home",component:o.a},{path:"/search",name:"search",component:i.a}]})},26:function(e,t){},27:function(e,t,n){function r(e){n(74),n(75)}var a=n(14)(n(51),n(80),r,null,null);e.exports=a.exports},50:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(2),a=n(24),u=(n.n(a),n(26)),o=(n.n(u),n(25)),s=n.n(o),i=n(5),c=n.n(i),f=n(27),l=n.n(f),d=n(23);c.a.use(s.a),r.default.use(a.Menu),r.default.use(a.MenuItem),r.default.config.productionTip=!1,new r.default({el:"#app",router:d.a,render:function(e){return e(l.a)}})},51:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"app",data:function(){return{activeIndex:"1"}},methods:{navigate:function(){console.log(arguments)}}}},52:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"home",data:function(){return{msg:"This is homepage"}}}},53:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"search",data:function(){return{msg:"This is search page"}}}},72:function(e,t){},73:function(e,t){},74:function(e,t){},75:function(e,t){},76:function(e,t,n){function r(e){n(73)}var a=n(14)(n(52),n(79),r,"data-v-2c845194",null);e.exports=a.exports},77:function(e,t,n){function r(e){n(72)}var a=n(14)(n(53),n(78),r,"data-v-083f7ac6",null);e.exports=a.exports},78:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("h1",[e._v(e._s(e.msg))])},staticRenderFns:[]}},79:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("h1",[e._v(e._s(e.msg))])},staticRenderFns:[]}},80:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-menu",{attrs:{"default-active":e.activeIndex,mode:"horizontal"},on:{select:e.navigate}},[n("el-menu-item",{attrs:{index:"1"}},[n("router-link",{attrs:{to:"/"}},[e._v("最新")])],1),e._v(" "),n("el-menu-item",{attrs:{index:"2"}},[n("router-link",{attrs:{to:"search"}},[e._v("搜索")])],1)],1),e._v(" "),n("router-view")],1)},staticRenderFns:[]}}},[50]);
//# sourceMappingURL=app.03436a5ab402ea29a406.js.map