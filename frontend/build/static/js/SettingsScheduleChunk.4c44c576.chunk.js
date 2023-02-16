(this["webpackJsonpstart-react-typescript"]=this["webpackJsonpstart-react-typescript"]||[]).push([[17],{124:function(e,t,a){"use strict";a.d(t,"a",(function(){return u}));var s=a(0);function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(e[s]=a[s])}return e}).apply(this,arguments)}function n(e,t){if(null==e)return{};var a,s,r=function(e,t){if(null==e)return{};var a,s,r={},n=Object.keys(e);for(s=0;s<n.length;s++)a=n[s],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(s=0;s<n.length;s++)a=n[s],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var c=s.createElement("defs",null),o=s.createElement("path",{d:"M12 19.2a7.2 7.2 0 100-14.4 7.2 7.2 0 000 14.4zm0-12.96a5.76 5.76 0 110 11.52 5.76 5.76 0 010-11.52z"}),i=s.createElement("path",{d:"M11.52 13.2h3.12v-1.44h-2.4V8.88H10.8v3.6a.72.72 0 00.72.72z"});function l(e,t){var a=e.title,l=e.titleId,u=n(e,["title","titleId"]);return s.createElement("svg",r({xmlns:"http://www.w3.org/2000/svg",fill:"#000",viewBox:"4.8 4.8 14.4 14.4",ref:t,"aria-labelledby":l},u),a?s.createElement("title",{id:l},a):null,c,o,i)}var u=s.forwardRef(l);a.p},156:function(e,t,a){},199:function(e,t,a){"use strict";a.r(t);var s=a(0),r=a(2),n=a(3),c=a(136),o=a(13),i=a(7),l=(a(156),["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]),u={every_day:{value:"every_day",label:"Every day"},weekdays:{value:"weekdays",label:"Weekdays"},custom:{value:"custom",label:"Custom"}},d=a(31),m=a(20),b=a(124),f=a(1),v=function(){var e=Object(s.useRef)({}),t=Object(s.useState)(!0),a=Object(n.a)(t,2),v=a[0],j=a[1],y=Object(s.useState)({mode:"every_day",timeData:{everydayWeekdays:[],custom:[]}}),h=Object(n.a)(y,2),O=h[0],p=h[1];Object(i.b)((function(){o.a.getWorkTime().then((function(e){var t=e.data;p({mode:t.current_mode,timeData:{everydayWeekdays:[t.every_day_times],custom:t.custom_times}}),j(!1)})).catch(console.error)}));var g=Object(s.useMemo)((function(){for(var e=(new Date).setHours(0,0,0,0),t=[{value:"None",label:"None"}],a=0;a<24;a++){var s=new Date(e).toLocaleString("ru-RU",{hour:"2-digit",minute:"2-digit",hour12:!1}),r=new Date(e).toLocaleString("en-US",{hour:"2-digit",minute:"2-digit",hour12:true});t.push({value:s,label:r}),e+=36e5}return t.push({value:"24:00",label:"Midnight"}),t}),[]),_=function(e,t,a){if(("custom"===O.mode?O.timeData.custom:O.timeData.everydayWeekdays)[t][a]!==e){p((function(s){var n=Object(r.a)({},s),c="custom"===O.mode?n.timeData.custom:n.timeData.everydayWeekdays;return c[t]=function(t,a){if("to"===a)return Object(r.a)(Object(r.a)({},t),{},{to:e});var s=(new Date).setHours(+e.slice(0,2),+e.slice(3),0,0);return s>=(new Date).setHours(+t.to.slice(0,2),+t.to.slice(3),0,0)?Object(r.a)(Object(r.a)({},t),{},{from:e,to:new Date(s+36e5).toLocaleString("us-US",{hour:"2-digit",minute:"2-digit",hour12:!1})}):Object(r.a)(Object(r.a)({},t),{},{from:e})}(c[t],a),n}));var s={mode:O.mode,times:"custom"===O.mode?O.timeData.custom:O.timeData.everydayWeekdays[0]};o.a.setWorkTime(s).then((function(e){var t=e.data;p({mode:t.mode,timeData:{everydayWeekdays:[t.times_for_mode.everyday],custom:t.times_for_mode.custom}})})).catch(console.error)}},x=function(t){return{menu:function(a){var s=function(e){var t=window.innerHeight;return e.getBoundingClientRect().bottom+200>=t-95}(e.current[t]);return Object(r.a)(Object(r.a)({},a),{},{top:s?"auto":a.top,bottom:s?"100%":a.bottom})}}},D=function(e){return Object(f.jsx)("div",Object(r.a)(Object(r.a)({},e.innerProps),{},{className:"time-select__indicator time-select__dropdown-indicator",children:Object(f.jsx)(b.a,{})}))},w=function(e,t){return e.find((function(e){return e.value===t}))};return v?Object(f.jsx)("div",{className:"settings-schedule__spinner",children:Object(f.jsx)(m.a,{size:"150px"})}):Object(f.jsxs)("div",{className:"settings-schedule",children:[Object(f.jsxs)("div",{className:"settings-schedule__header",children:[Object(f.jsx)(d.a,{route:"/settings"}),Object(f.jsx)("h2",{className:"settings-schedule__title",children:"Schedule"})]}),Object(f.jsxs)("div",{className:"settings-schedule__main",children:[Object(f.jsxs)("div",{className:"settings-schedule__mode",children:[Object(f.jsx)("label",{className:"label",children:"Choose mode"}),Object(f.jsx)(c.a,{className:"mode-select",classNamePrefix:"mode-select",isSearchable:!1,value:u[O.mode],defaultValue:u.custom,options:Object.values(u),onChange:function(e){return e&&function(e){if(O.mode!==e){p((function(t){return Object(r.a)(Object(r.a)({},t),{},{mode:e})}));var t={mode:e,times:"custom"===e?O.timeData.custom:O.timeData.everydayWeekdays[0]};o.a.setWorkTime(t).then((function(e){var t=e.data;p({mode:t.mode,timeData:{everydayWeekdays:[t.times_for_mode.everyday],custom:t.times_for_mode.custom}})})).catch(console.error)}}(e.value)},components:{IndicatorSeparator:null}})]}),Object(f.jsx)("div",{className:"settings-schedule__fields",children:("custom"===O.mode?O.timeData.custom:O.timeData.everydayWeekdays).map((function(t,a){return Object(f.jsxs)("div",{className:"settings-schedule__field",ref:function(t){return e.current[a]=t},children:[Object(f.jsxs)("div",{className:"settings-schedule__field-wrap",children:[Object(f.jsx)("label",{className:"label",children:"custom"!==O.mode?"Start at":l[a]}),Object(f.jsx)(c.a,{className:"time-select",classNamePrefix:"time-select",isSearchable:!1,options:g.slice(0,g.length-1),defaultValue:g[17],maxMenuHeight:200,styles:x(a),value:w(g,t.from),onChange:function(e){return e&&_(e.value,a,"from")},components:{IndicatorSeparator:null,DropdownIndicator:D}})]}),"None"!==("custom"===O.mode?O.timeData.custom:O.timeData.everydayWeekdays)[a].from&&Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)("span",{className:"settings-schedule__time-divider"}),Object(f.jsxs)("div",{className:"settings-schedule__field-wrap",children:["custom"!==O.mode&&Object(f.jsx)("label",{className:"label",children:"Ends at"}),Object(f.jsx)(c.a,{className:"time-select",classNamePrefix:"time-select",isSearchable:!1,options:g.slice(2),defaultValue:g[33],maxMenuHeight:200,styles:x(a),value:w(g,t.to),onChange:function(e){return e&&_(e.value,a,"to")},isOptionDisabled:function(e){return function(e,t){var a=e.value,s=e.label,r=("custom"===O.mode?O.timeData.custom:O.timeData.everydayWeekdays)[t].from;return(new Date).setHours(+r.slice(0,2),+r.slice(3),0,0)>=(new Date).setHours(+a.slice(0,2),+a.slice(3),0,0)&&"24:00"!==s}(e,a)},components:{IndicatorSeparator:null,DropdownIndicator:D}})]})]})]},t.day)}))})]})]})};t.default=function(){return console.log("SettingsSchedule Render"),Object(f.jsx)(v,{})}}}]);
//# sourceMappingURL=SettingsScheduleChunk.4c44c576.chunk.js.map