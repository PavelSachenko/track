(this["webpackJsonpstart-react-typescript"]=this["webpackJsonpstart-react-typescript"]||[]).push([[6],{116:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var l=n(0);function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var l in n)Object.prototype.hasOwnProperty.call(n,l)&&(e[l]=n[l])}return e}).apply(this,arguments)}function c(e,t){if(null==e)return{};var n,l,r=function(e,t){if(null==e)return{};var n,l,r={},c=Object.keys(e);for(l=0;l<c.length;l++)n=c[l],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(l=0;l<c.length;l++)n=c[l],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var a=l.createElement("defs",null),s=l.createElement("path",{d:"M1.125 12.875c.25.25.5.375.875.375s.625-.125.875-.375L7 8.75l4.125 4.125c.25.25.625.375.875.375s.625-.125.875-.375c.5-.5.5-1.25 0-1.75L8.75 7l4.125-4.125c.5-.5.5-1.25 0-1.75s-1.25-.5-1.75 0L7 5.25 2.875 1.125c-.5-.5-1.25-.5-1.75 0s-.5 1.25 0 1.75L5.25 7l-4.125 4.125c-.5.5-.5 1.25 0 1.75z"});function o(e,t){var n=e.title,o=e.titleId,i=c(e,["title","titleId"]);return l.createElement("svg",r({xmlns:"http://www.w3.org/2000/svg",fill:"#000",viewBox:"0 0 14 14",ref:t,"aria-labelledby":o},i),n?l.createElement("title",{id:o},n):null,a,s)}var i=l.forwardRef(o);n.p},176:function(e,t,n){},188:function(e,t,n){"use strict";n.r(t);var l=n(19),r=n(13),c=n(21),a=(n(176),n(116)),s=n(23),o=n(1);t.default=function(e){var t=e.itemId,n=e.pending,i=e.setPending,d=e.closeModal,u=e.closeAgentModal,b=Object(l.c)();return Object(o.jsxs)("div",{className:"delete-agent-modal modal-wrap",children:[Object(o.jsx)("div",{className:"delete-agent-modal__icon-wrap",children:Object(o.jsx)("div",{className:"delete-agent-modal__icon",children:Object(o.jsx)(a.a,{})})}),Object(o.jsx)("h2",{className:"delete-agent-modal__header",children:"Delete Agent"}),Object(o.jsx)("div",{className:"delete-agent-modal__text",children:"Do you really want to delete your agent?'"}),Object(o.jsxs)("div",{className:"delete-agent-modal__btns",children:[Object(o.jsx)("button",{type:"button",className:"delete-agent-modal__close-btn btn btn--cancel",onClick:function(){return!n&&e.closeModal()},children:"Close"}),Object(o.jsx)(s.a,{type:"button",className:"btn btn--delete",spinnerSize:"18px",onClick:function(){return i(!0),r.a.unsubscribeAgent(t).then((function(){i(!1),b(Object(c.d)(t)),d(),u()})).catch(console.error)},children:"Delete"})]})]})}}}]);
//# sourceMappingURL=DeleteAgentModalChunk.80ff151f.chunk.js.map