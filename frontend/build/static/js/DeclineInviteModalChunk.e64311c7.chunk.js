(this["webpackJsonpstart-react-typescript"]=this["webpackJsonpstart-react-typescript"]||[]).push([[4],{115:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var c=n(0);function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var c in n)Object.prototype.hasOwnProperty.call(n,c)&&(e[c]=n[c])}return e}).apply(this,arguments)}function l(e,t){if(null==e)return{};var n,c,i=function(e,t){if(null==e)return{};var n,c,i={},l=Object.keys(e);for(c=0;c<l.length;c++)n=l[c],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(c=0;c<l.length;c++)n=l[c],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var r=c.createElement("defs",null),a=c.createElement("path",{d:"M1.125 12.875c.25.25.5.375.875.375s.625-.125.875-.375L7 8.75l4.125 4.125c.25.25.625.375.875.375s.625-.125.875-.375c.5-.5.5-1.25 0-1.75L8.75 7l4.125-4.125c.5-.5.5-1.25 0-1.75s-1.25-.5-1.75 0L7 5.25 2.875 1.125c-.5-.5-1.25-.5-1.75 0s-.5 1.25 0 1.75L5.25 7l-4.125 4.125c-.5.5-.5 1.25 0 1.75z"});function s(e,t){var n=e.title,s=e.titleId,o=l(e,["title","titleId"]);return c.createElement("svg",i({xmlns:"http://www.w3.org/2000/svg",fill:"#000",viewBox:"0 0 14 14",ref:t,"aria-labelledby":s},o),n?c.createElement("title",{id:s},n):null,r,a)}var o=c.forwardRef(s);n.p},178:function(e,t,n){},190:function(e,t,n){"use strict";n.r(t);var c=n(19),i=n(14),l=n(26),r=(n(178),n(115)),a=n(23),s=n(1);t.default=function(e){var t=e.token,n=e.itemId,o=e.pending,d=e.setPending,u=e.closeModal,b=Object(c.c)();return Object(s.jsxs)("div",{className:"decline-invite-modal modal-wrap",children:[Object(s.jsx)("div",{className:"decline-invite-modal__icon-wrap",children:Object(s.jsx)("div",{className:"decline-invite-modal__icon",children:Object(s.jsx)(r.a,{})})}),Object(s.jsx)("h2",{className:"decline-invite-modal__header",children:"Decline Invitation"}),Object(s.jsx)("div",{className:"decline-invite-modal__text",children:"Are you sure you want to decline the invitation?"}),Object(s.jsxs)("div",{className:"decline-invite-modal__btns",children:[Object(s.jsx)("button",{type:"button",className:"decline-invite-modal__close-btn btn btn--cancel",onClick:function(){return!o&&e.closeModal()},children:"Close"}),Object(s.jsx)(a.a,{type:"button",className:"btn btn--delete",spinnerSize:"18px",onClick:function(){return d(!0),i.a.declineNotification(t).then((function(){d(!1),b(Object(l.f)([n])),u()})).catch(console.error)},children:"Decline"})]})]})}}}]);
//# sourceMappingURL=DeclineInviteModalChunk.e64311c7.chunk.js.map