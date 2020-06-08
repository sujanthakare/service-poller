(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{236:function(e,t,n){e.exports=n(398)},398:function(e,t,n){"use strict";n.r(t);n(237);var r,a=n(0),c=n.n(a),u=n(33),i=n.n(u),o=n(73),l=n(99),s={services:[]},p=Object(l.b)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s,t=arguments.length>1?arguments[1]:void 0;return"LOAD_SERVICES"===t.type?{services:t.payload}:e})),d=n(412),f=n(15),v=n.n(f),m=n(19),b={Accept:"application/json, text/plain, */*","Content-Type":"application/json"},h={deleteService:function(){var e=Object(m.a)(v.a.mark((function e(){var t,n=arguments;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=n.length>0&&void 0!==n[0]?n[0]:""){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,fetch("/api/service/".concat(t),{method:"delete",headers:b});case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),editService:function(){var e=Object(m.a)(v.a.mark((function e(){var t,n,r=arguments;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=r.length>0&&void 0!==r[0]?r[0]:"",n=r.length>1?r[1]:void 0,t){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,fetch("/api/service/".concat(t),{method:"put",headers:b,body:JSON.stringify(n)});case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),createService:function(){var e=Object(m.a)(v.a.mark((function e(t){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/service",{method:"post",headers:b,body:JSON.stringify(t)});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),getServices:function(){var e=Object(m.a)(v.a.mark((function e(){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/service",{method:"get",headers:b});case 2:return t=e.sent,e.next=5,t.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},O=n(206),E=Object(O.a)((function(e){return e.services}),(function(e){return e})),j=function(){var e=Object(o.b)(),t=Object(o.c)(E);return{createService:Object(a.useCallback)(function(){var e=Object(m.a)(v.a.mark((function e(t){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.createService(t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[]),deleteService:Object(a.useCallback)(Object(m.a)(v.a.mark((function e(){var t,n=arguments;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:"",e.next=3,h.deleteService(t);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)}))),[]),editService:Object(a.useCallback)(Object(m.a)(v.a.mark((function e(){var t,n,r=arguments;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.length>0&&void 0!==r[0]?r[0]:"",n=r.length>1?r[1]:void 0,e.next=4,h.editService(t,n);case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)}))),[]),loadServices:Object(a.useCallback)(Object(m.a)(v.a.mark((function t(){var n;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,h.getServices();case 2:n=t.sent,e({type:"LOAD_SERVICES",payload:n});case 4:case"end":return t.stop()}}),t)}))),[e]),services:t}},w=n(26),S=n(23);!function(e){e.OK="OK",e.UNKNOWN="UNKNOWN",e.FAIL="FAIL"}(r||(r={}));var x,g=n(408),k=n(36),y=n(414),C=n(415),I=n(399),N=function(e){try{return new URL(e),!0}catch(t){return!1}},A=n(138),L=n(410),F=n(409),U=n(413),K=n(407),W=function(e){var t=e.onSave,n=e.data,r=void 0===n?{url:"",name:""}:n,u=e.open,i=e.loading,o=e.onCancel,l=e.error,s=e.title,p=Object(a.useState)({urlInput:r.url,nameInput:r.name}),d=Object(w.a)(p,2),f=d[0],b=d[1],h=function(e,t){b(Object(A.a)(Object(A.a)({},f),{},Object(S.a)({},e,t)))},O=function(){var e=Object(m.a)(v.a.mark((function e(){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t&&t({url:f.urlInput,name:f.nameInput});case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return c.a.createElement(L.a,{open:u,size:"mini"},s&&c.a.createElement(L.a.Header,null,s),c.a.createElement(L.a.Content,null,c.a.createElement(F.a,null,l&&c.a.createElement(U.a,{header:"Error",negative:!0,content:l}),c.a.createElement(F.a.Field,null,c.a.createElement("label",null,"Name"),c.a.createElement(K.a,{value:f.nameInput,onChange:function(e){return h("nameInput",e.target.value)},style:{width:"100%"},placeholder:"Some Name"})),c.a.createElement(F.a.Field,null,c.a.createElement("label",null,"URL"),c.a.createElement(K.a,{value:f.urlInput,onChange:function(e){return h("urlInput",e.target.value)},style:{width:"100%"},placeholder:"http://service.com"})))),c.a.createElement(L.a.Actions,null,c.a.createElement(I.a,{onClick:o},"Cancel"),c.a.createElement(I.a,{primary:!0,loading:i,onClick:O},"Save")))},D=function(e){var t=e.data,n=t.id,r=t.url,u=t.name,i=Object(a.useState)(!1),o=Object(w.a)(i,2),l=o[0],s=o[1],p=Object(a.useState)(""),d=Object(w.a)(p,2),f=d[0],b=d[1],h=Object(a.useState)(!1),O=Object(w.a)(h,2),E=O[0],S=O[1],x=j(),g=x.loadServices,k=x.editService,y=function(){var e=Object(m.a)(v.a.mark((function e(t){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!N(t.url)){e.next=10;break}return S(!0),e.next=4,k(n,t);case 4:return e.next=6,g();case 6:S(!1),s(!1),e.next=11;break;case 10:b("Invalid Url");case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return c.a.createElement(c.a.Fragment,null,c.a.createElement(I.a,{onClick:function(){s(!0)}},"Edit"),c.a.createElement(W,{title:"Edit service",error:f,data:{url:r,name:u},open:l,loading:E,onSave:y,onCancel:function(){return s(!1)}}))},J=(x={},Object(S.a)(x,r.OK,"green"),Object(S.a)(x,r.FAIL,"red"),Object(S.a)(x,r.UNKNOWN,"blue"),x),R=function(e){var t=e.data,n=t.id,r=t.status,u=t.name,i=t.url,o=t.createdAt,l=j(),s=l.deleteService,p=l.loadServices,d=Object(a.useState)(!1),f=Object(w.a)(d,2),b=f[0],h=f[1],O=function(){var e=Object(m.a)(v.a.mark((function e(){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(window.confirm("Are you sure?")){e.next=3;break}return e.abrupt("return");case 3:return h(!0),e.next=6,s(n);case 6:return h(!1),e.next=9,p();case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return c.a.createElement(C.a,{verticalAlign:"middle",columns:"equal",padded:!0,stackable:!0},c.a.createElement(C.a.Column,{width:"10"},c.a.createElement(g.a,{style:{flexDirection:"row",display:"flex",alignItems:"center"}},c.a.createElement(k.a,{size:"large",name:"circle",color:J[r]}),c.a.createElement(y.a,{style:{marginLeft:18}},u,c.a.createElement(y.a.Subheader,null,i),c.a.createElement(y.a.Subheader,null,o)))),c.a.createElement(C.a.Column,null,c.a.createElement(C.a,null,c.a.createElement(D,{data:t}),c.a.createElement(I.a,{color:"red",onClick:O,disabled:b},"Delete"))))},z=function(){var e=j(),t=e.services,n=e.loadServices;return Object(a.useEffect)((function(){n();var e=setInterval((function(){n()}),3e4);return function(){clearInterval(e)}}),[n]),c.a.createElement(d.a,{relaxed:!0,divided:!0},t.map((function(e){return c.a.createElement(d.a.Item,{key:e.id},c.a.createElement(R,{data:e}))})))},B=function(){var e=Object(a.useState)(!1),t=Object(w.a)(e,2),n=t[0],r=t[1],u=Object(a.useState)(""),i=Object(w.a)(u,2),o=i[0],l=i[1],s=Object(a.useState)(!1),p=Object(w.a)(s,2),d=p[0],f=p[1],b=j(),h=b.loadServices,O=b.createService,E=function(){var e=Object(m.a)(v.a.mark((function e(t){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!N(t.url)){e.next=10;break}return f(!0),e.next=4,O(t);case 4:return e.next=6,h();case 6:f(!1),r(!1),e.next=11;break;case 10:l("Invalid Url");case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return c.a.createElement(c.a.Fragment,null,c.a.createElement(I.a,{icon:!0,labelPosition:"right",onClick:function(){r(!0)}},"Create New Service",c.a.createElement(k.a,{name:"edit"})),c.a.createElement(W,{title:"New service",error:o,open:n,loading:d,onSave:E,onCancel:function(){return r(!1)}}))};var T=function(){return c.a.createElement(o.a,{store:p},c.a.createElement(g.a,{style:{paddingTop:100}},c.a.createElement(B,null),c.a.createElement(z,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(c.a.createElement(T,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[236,1,2]]]);
//# sourceMappingURL=main.259f0e28.chunk.js.map