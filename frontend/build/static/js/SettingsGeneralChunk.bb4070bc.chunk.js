(this["webpackJsonpstart-react-typescript"]=this["webpackJsonpstart-react-typescript"]||[]).push([[16],{155:function(e,t,r){},200:function(e,t,r){"use strict";r.r(t);var a=r(0),s=r(2),n=r(3),l=r(19),c=r(11),i=r(14),o=r(7),u=r(15),b=r(16),j=(r(155),r(45)),p=r(17),m=r(56),d=r(43),O=r(33),g=r(57),f=r(23),h=r(31),x=r(1),v=function(e){var t=e.name,r={};return b.a.isEmpty(t)&&(r.name="This field can`t be empty"),r},_=Object(l.b)((function(e){return{user:e.user.user}}))((function(e){var t=e.user,r=Object(a.useRef)(null),l=Object(a.useState)(!1),b=Object(n.a)(l,2),_=b[0],N=b[1],y=Object(a.useState)({}),C=Object(n.a)(y,2),S=C[0],R=C[1],U=Object(a.useState)(t.img),w=Object(n.a)(U,2),k=w[0],L=w[1],A=Object(a.useState)(null),E=Object(n.a)(A,2),I=E[0],P=E[1],D=Object(a.useState)({url:null,file:null}),F=Object(n.a)(D,2),T=F[0],W=F[1],G=Object(o.e)(!1),J=Object(n.a)(G,2),M=J[0],q=J[1],z=function(){window.confirm("Delete photo?")&&(T.url?W({url:null,file:null}):L(null))},V=function(e){if(e.target.files&&e.target.files.length>0){var t=e.target.files[0],r=new FileReader;r.onloadend=function(){t.type.startsWith("image")&&(B(t),q(!0))},r.readAsDataURL(t)}},B=function(e){var t=URL.createObjectURL(e);P(t),setTimeout((function(){W({file:e,url:t})}),500)},H=function(e){q(!1),W({file:e,url:URL.createObjectURL(e)})};return Object(x.jsxs)("div",{className:"settings-general",children:[Object(x.jsxs)("div",{className:"settings-general__header",children:[Object(x.jsx)(h.a,{route:"/settings"}),Object(x.jsx)("h2",{className:"settings-general__title",children:"General"})]}),Object(x.jsx)(c.b,{initialValues:Object(s.a)({},t),validate:v,onSubmit:function(e){N(!0),i.a.updateUser(Object(s.a)(Object(s.a)({},e),{},{img:T.file||k})).then((function(){N(!1)})).catch((function(e){N(!1),R(e.response.data.errors),console.error(e)}))},children:function(e){var a=e.handleSubmit,s=e.submitting;return Object(x.jsxs)("form",{onSubmit:a,children:[Object(x.jsx)(O.a,{isMount:M,delayUnmountTime:100,children:Object(x.jsx)("div",{className:Object(u.b)("settings-general-cropper",[M&&"open"]),children:Object(x.jsx)("div",{className:"settings-general-cropper__cropper",children:Object(x.jsx)(g.a,{image:I||"",onCrop:H,onCancel:function(){return q(!1)},aspect:1,cropShape:"round",classPrefix:"avatar-cropper"})})})}),Object(x.jsxs)("div",{className:"settings-general__avatar-select",children:[Object(x.jsxs)("div",{className:"settings-general__avatar",children:[Object(x.jsx)(d.a,{src:T.url||Object(u.c)({img:k,type:t.type}),classPrefix:"round-img",alt:"avatar"}),(T.url||k)&&Object(x.jsx)("button",{className:"settings-general__avatar-icon",type:"button",onClick:z,children:Object(x.jsx)(j.a,{})})]}),Object(x.jsxs)("div",{className:"settings-general__avatar-btn-wrap",children:[Object(x.jsx)("input",{type:"file",accept:"image/*",ref:r,onChange:V,onClick:function(){return r.current&&(r.current.value="")},style:{display:"none"}}),Object(x.jsx)("button",{className:"settings-general__avatar-btn",onClick:function(){var e;return null===(e=r.current)||void 0===e?void 0:e.click()},type:"button",children:"Choose Avatar"})]})]}),Object(x.jsxs)("div",{className:"form-group",children:[Object(x.jsx)("label",{className:"label label--required",children:1===t.type?"Full Name":"Agency Name"}),Object(x.jsx)(c.a,{name:"name",className:"input",errorInputClass:"input--error",errorClass:"form-group__error",component:p.a,placeholder:"Full Name",serverErrors:S})]}),Object(x.jsxs)("div",{className:"form-group",children:[Object(x.jsx)("label",{className:"label label--optional",children:"Phone"}),Object(x.jsx)(c.a,{name:"phone",type:"tel",className:"input",errorInputClass:"input--error",errorClass:"form-group__error",component:p.a,placeholder:"Phone number",serverErrors:S})]}),2===t.type&&Object(x.jsxs)("div",{className:"form-group",children:[Object(x.jsx)("label",{className:"label label--optional",children:"Website"}),Object(x.jsx)(c.a,{name:"url",className:"input",errorInputClass:"input--error",errorClass:"form-group__error",component:p.a,placeholder:"URL Website",serverErrors:S})]}),Object(x.jsxs)("div",{className:"form-group",children:[Object(x.jsx)("label",{className:"label label--optional",children:1===t.type?"About Me":"About Us"}),Object(x.jsx)(c.a,{name:"description",className:"settings-general__textarea textarea input",errorInputClass:"input--error",errorClass:"form-group__error",component:m.a,rows:3,placeholder:"Description",serverErrors:S})]}),Object(x.jsx)("div",{className:"settings-general__btns",children:Object(x.jsx)(f.a,{type:"submit",className:"btn btn--primary",spinnerSize:"18px",pending:_,disabled:s,children:"Save"})})]})}})]})}));t.default=function(){return console.log("SettingsGeneral Render"),Object(x.jsx)(_,{})}}}]);
//# sourceMappingURL=SettingsGeneralChunk.bb4070bc.chunk.js.map