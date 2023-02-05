(this["webpackJsonpstart-react-typescript"]=this["webpackJsonpstart-react-typescript"]||[]).push([[18],{169:function(e,s,r){},201:function(e,s,r){"use strict";r.r(s);var t=r(0),a=r(3),n=r(11),o=r(19),c=r(14),i=r(16),l=r(10),d=(r(169),r(45)),p=r(17),u=r(23),b=r(31),j=r(1),m=function(e){var s=e.oldPassword,r=e.newPassword,t=e.passwordConfirmation,a={};return i.a.isEmpty(s)&&(a.oldPassword="Enter the password"),s&&i.a.isEmpty(r)&&(a.newPassword="Enter a new password"),s&&(null===r||void 0===r?void 0:r.length)<6&&(a.newPassword="The new password must be at least 6 characters"),s&&r&&i.a.isEmpty(t)&&(a.passwordConfirmation="Enter the new password again"),r&&(i.a.isEmpty(t)||r!==t)&&(a.passwordConfirmation="Passwords are not match"),a},w=function(){var e=Object(o.c)(),s=Object(t.useState)(!1),r=Object(a.a)(s,2),i=r[0],w=r[1],h=Object(t.useState)({}),O=Object(a.a)(h,2),f=O[0],g=O[1],x=function(){e(Object(l.d)(l.a.deleteAccountModal))};return Object(j.jsxs)("div",{className:"settings-security",children:[Object(j.jsxs)("div",{className:"settings-security__header",children:[Object(j.jsx)(b.a,{route:"/settings"}),Object(j.jsx)("h2",{className:"settings-security__title",children:"Security"})]}),Object(j.jsx)(n.b,{validate:m,onSubmit:function(s,r){w(!0),c.a.changePassword(s).then((function(){e(Object(l.d)(l.a.successPasswordChangeModal)),w(!1),g({}),r.reset()})).catch((function(e){w(!1),g(e.response.data.errors)}))},children:function(e){var s=e.handleSubmit,r=e.submitting;return Object(j.jsxs)("form",{onSubmit:s,className:"settings-security__form",children:[Object(j.jsxs)("div",{className:"form-group",children:[Object(j.jsx)("label",{className:"label label--required",children:"Your password"}),Object(j.jsx)(n.a,{name:"oldPassword",type:"password",className:"input",errorInputClass:"input--error",errorClass:"form-group__error",component:p.a,placeholder:"Select Password",serverErrors:f})]}),Object(j.jsxs)("div",{className:"form-group",children:[Object(j.jsx)("label",{className:"label label--required",children:"New password"}),Object(j.jsx)(n.a,{name:"newPassword",type:"password",className:"input",errorInputClass:"input--error",errorClass:"form-group__error",component:p.a,placeholder:"New Password",serverErrors:f})]}),Object(j.jsxs)("div",{className:"form-group",children:[Object(j.jsx)("label",{className:"label label--required",children:"Repeat password"}),Object(j.jsx)(n.a,{name:"passwordConfirmation",type:"password",className:"input",errorInputClass:"input--error",errorClass:"form-group__error",component:p.a,placeholder:"Repeat Password",serverErrors:f})]}),Object(j.jsxs)("button",{className:"settings-security__delete",type:"button",onClick:x,children:[Object(j.jsx)(d.a,{className:"settings-security__delete-icon"}),Object(j.jsx)("span",{children:"Delete Account"})]}),Object(j.jsx)(u.a,{type:"submit",className:"settings-security__save-btn btn btn--primary",spinnerSize:"18px",pending:i,disabled:r,children:"Save"})]})}})]})};s.default=function(){return console.log("SettingsSecurity Render"),Object(j.jsx)(w,{})}}}]);
//# sourceMappingURL=SettingsSecurityChunk.c21be680.chunk.js.map