(this["webpackJsonpcrypto-portfolio"]=this["webpackJsonpcrypto-portfolio"]||[]).push([[0],{44:function(e,t,n){},65:function(e,t,n){"use strict";n.r(t);var c=n(2),a=n.n(c),r=n(21),o=n.n(r),i=(n(44),n(27)),s=n(11),l=n(3),u=n(39),j=n.n(u),d=function(){var e=Object(c.useState)({loading:!1,data:null,error:!1}),t=Object(l.a)(e,2),n=t[0],a=t[1];return Object(c.useEffect)((function(){a({loading:!0,data:null,error:!1}),j.a.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=250&page=1&sparkline=false").then((function(e){a({loading:!1,data:e.data,error:!1})})).catch((function(){a({loading:!1,data:null,error:!0})}))}),[]),n},b=n(16),m=n(1),h=function(e){var t=e.coins,n=0;return t.length>0&&t.map((function(e){return void 0!==e.amount?n+=e.amount*e.current_price:null})),Object(m.jsxs)("div",{className:"header",children:[Object(m.jsx)("p",{children:"Portfolio Worth"}),Object(m.jsx)("h1",{style:{color:"#009E17"},children:new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR"}).format(n)}),Object(m.jsx)("p",{className:"note",children:"Note: everything is stored Locally on your Local Storage Nothing is Stored in server."})]})},p=n(13),g=function(e){var t=e.setShowForm,n=e.showForm;return Object(m.jsx)("div",{onClick:function(){t(!n)},children:Object(m.jsx)("button",{className:"add-txa-btnn",children:"Add coins"})})},f=function(e){var t=e.toggleForm,n=e.coin,a=e.updateCoin,r=Object(c.useState)(n.current_price),o=Object(l.a)(r,2),i=o[0],s=o[1],u=Object(c.useState)(""),j=Object(l.a)(u,2),d=j[0],h=j[1],g=Object(b.useTransition)(t,{from:{opacity:0},enter:{opacity:1},leave:{opacity:0}}),f=function(e){e.target.value.length>e.target.maxLength&&(e.target.value=e.target.value.slice(0,e.target.maxLength))},O=function(e){e.preventDefault(),!i|!d?alert("You forgot to input something!"):(t(),a({coin:n,cost:i,amount:d}),s(n.current_price),h(""))};return g((function(e,c){return c&&Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("div",{className:"form-mask",onClick:t}),Object(m.jsxs)(b.animated.form,{style:e,onSubmit:O,className:"form-container containerzz",children:[Object(m.jsx)(p.d,{className:"exit-form-btn",onClick:t}),Object(m.jsx)("p",{style:{fontWeight:"bold"},children:n.name}),Object(m.jsx)("label",{children:"Cost per coin:"}),Object(m.jsx)("input",{step:"any",className:"input-style",type:"number",maxLength:"10",value:i,onInput:f,onChange:function(e){s(e.target.value)}}),Object(m.jsx)("label",{children:"Amount bought:"}),Object(m.jsx)("input",{className:"input-style",type:"number",maxLength:"10",value:d,step:"any",onInput:f,onChange:function(e){h(e.target.value)}}),Object(m.jsx)("input",{type:"submit",value:"Add coin",className:"submit-btn"})]})]})}))},O=function(e){var t=e.coin,n=e.onDelete,a=e.updateCoin,r=Object(c.useState)(!1),o=Object(l.a)(r,2),i=o[0],s=o[1],u=t.current_price*t.amount,j=t.cost*t.amount,d=u-j,b=100*d/j,h=(t.price_change_percentage_24h,function(){s(!i)});return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("div",{className:"coin-container",onClick:function(){void 0!==t.cost|void 0!==t.amount&&h()},children:Object(m.jsxs)("div",{className:"coin font-weight-bold",children:[Object(m.jsx)("img",{src:t.image,alt:"",style:{height:"30px",width:"30px"}}),Object(m.jsx)("p",{className:"nothing",children:t.name}),Object(m.jsxs)("div",{className:"",children:[Object(m.jsx)("span",{className:"price font-weight-bold",children:"Current Price"}),Object(m.jsx)("p",{title:"Hooray!",children:new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR"}).format(t.current_price)})]}),void 0!==t.cost|void 0!==t.amount?Object(m.jsxs)("div",{className:"total-value",children:[Object(m.jsx)("span",{className:"price",children:"Total Value"}),Object(m.jsx)("p",{children:new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR"}).format(u)}),Object(m.jsx)("span",{className:"price",children:"No of Coin"}),Object(m.jsx)("p",{children:(new Intl.NumberFormat).format(t.amount)})]}):"",void 0!==t.cost|void 0!==t.amount?Object(m.jsxs)("div",{className:d>0?"profit":d<0?"loss":0===d&&"even",children:[Object(m.jsx)("span",{className:"price",children:"Profit / Loss"}),Object(m.jsx)("p",{children:new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR"}).format(d)}),Object(m.jsx)("span",{className:"price",children:"Profit / Loss Percent"}),Object(m.jsxs)("p",{children:[(new Intl.NumberFormat).format(b),"%"]})]}):"",void 0===t.cost&void 0===t.amount?Object(m.jsx)(g,{setShowForm:s,showForm:i}):"",Object(m.jsx)(p.a,{className:"trash-btn",onClick:function(){n(t.id)}})]})}),i&&Object(m.jsx)(f,{updateCoin:a,coin:t,toggleForm:h})]})},x=function(e){var t=e.coins,n=e.onDelete,c=e.updateCoin;return Object(m.jsx)("div",{className:"coin-list",children:t.map((function(e){return Object(m.jsx)(O,{updateCoin:c,coin:e,onDelete:n},e.id)}))})},v=function(e){var t=e.toggle,n=e.toggleSearch;return Object(m.jsx)("div",{className:"toggle-btn",onClick:t,children:n?Object(m.jsx)(p.c,{className:"btn-sign"}):Object(m.jsx)(p.b,{className:"btn-sign"})})},N=function(e){var t=e.searchCoin,n=e.toggle,c=e.onAdd;return Object(m.jsxs)("div",{className:"search-list-coin",onClick:function(){c(t),n()},children:[Object(m.jsx)("img",{src:t.image,alt:"",style:{height:"30px",width:"30px"}}),Object(m.jsx)("p",{children:t.name}),Object(m.jsx)("p",{children:t.symbol.toUpperCase()}),Object(m.jsx)("p",{children:new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR"}).format(t.current_price)})]})},y=function(){return Object(m.jsx)("div",{className:"loader"})},C=function(e){var t,n=e.apiCoins,a=e.toggle,r=e.onAdd,o=Object(c.useState)(""),i=Object(l.a)(o,2),s=i[0],u=i[1];return n.data&&(t=Object(m.jsxs)("div",{className:"search-container",children:[Object(m.jsx)("input",{className:"search-bar",type:"text",placeholder:"Search coin",onChange:function(e){u(e.target.value)}}),Object(m.jsx)("div",{className:"search-list",children:n.data.filter((function(e){return""===s||e.name.toLowerCase().includes(s.toLowerCase())?e:null})).map((function(e){return Object(m.jsx)(N,{onAdd:r,searchCoin:e,toggle:a},n.data.indexOf(e))}))})]})),n.loading&&(t=Object(m.jsx)(y,{})),n.error&&(t=Object(m.jsx)("p",{children:"There was an error fetching the API. Try again later."})),t};var I=function(){var e=Object(c.useState)([]),t=Object(l.a)(e,2),n=t[0],a=t[1],r=Object(c.useState)(!1),o=Object(l.a)(r,2),u=o[0],j=o[1],p=Object(b.useTransition)(u,{from:{y:800,opacity:0},enter:{y:50,opacity:1},leave:{y:800,opacity:0}}),g=d();Object(c.useEffect)((function(){O()}),[]),Object(c.useEffect)((function(){f(n)}),[n]);var f=function(e){localStorage.setItem("coins",JSON.stringify(e))},O=function(){if(null===localStorage.getItem("coins"))localStorage.setItem("coins",JSON.stringify([]));else{var e=JSON.parse(localStorage.getItem("coins"));a(e)}},N=function(){j(!u)},y=function(e){n.length>0&&n.find((function(t){return t.id===e.id}))?alert("Coin already added!"):a([].concat(Object(s.a)(n),[e]))};return function(){if(g.data&&null!==JSON.parse(localStorage.getItem("coins"))){for(var e=JSON.parse(localStorage.getItem("coins")),t=0;t<e.length;t++)for(var n=0;n<g.data.length;n++)g.data[n].id===e[t].id&&(e[t].current_price=g.data[n].current_price);f(e)}}(),Object(m.jsxs)("div",{className:"containerzz",children:[!u&&Object(m.jsx)(h,{coins:n}),p((function(e,t){return t&&Object(m.jsx)(b.animated.div,{className:"ani-div",style:e,children:Object(m.jsx)(C,{apiCoins:g,onAdd:y,toggle:N})})})),!u&&Object(m.jsx)(x,{updateCoin:function(e){var t=e.coin,c=e.cost,r=e.amount,o=Object(i.a)(Object(i.a)({},t),{},{cost:c,amount:r}),l=n.filter((function(t){return t.id!==e.coin.id}));a([].concat(Object(s.a)(l),[o]))},coins:n,apiCoins:g,onDelete:function(e){a(n.filter((function(t){return t.id!==e})))}}),Object(m.jsx)(v,{toggle:N,toggleSearch:u})]})},S=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,66)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,o=t.getTTFB;n(e),c(e),a(e),r(e),o(e)}))};o.a.render(Object(m.jsx)(a.a.StrictMode,{children:Object(m.jsx)(I,{})}),document.getElementById("root")),S()}},[[65,1,2]]]);
//# sourceMappingURL=main.74be1b9f.chunk.js.map