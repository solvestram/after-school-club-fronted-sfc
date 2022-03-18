(function(){"use strict";var t={5671:function(t,s,e){e(6992),e(8674),e(9601),e(7727);var a=e(9567),o=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("nav",{staticClass:"navbar mb-4 navbar-dark bg-dark sticky-top"},[e("div",{staticClass:"container"},[e("span",{staticClass:"navbar-brand mb-0 h1",domProps:{textContent:t._s(t.sitename)}}),t.showCart?e("div",[e("button",{staticClass:"btn btn-outline-light btn-sm shadow-none",on:{click:function(s){return t.switchToMain()}}},[e("i",{staticClass:"fas fa-angle-left"}),t._v(" Go back ")])]):e("div",[e("button",{staticClass:"btn btn-outline-light btn-sm shadow-none",on:{click:function(s){return t.resetDatabase()}}},[e("i",{staticClass:"fas fa-sync"}),t._v(" Reset Database ")]),e("button",{staticClass:"btn btn-outline-light btn-sm shadow-none",attrs:{disabled:t.isCartDisabled},on:{click:function(s){return t.switchToCart()}}},[e("i",{staticClass:"fas fa-shopping-cart"}),t._v(" Shopping cart ("+t._s(t.cartItemsCount)+") ")])])])]),t.showCart?e("div",{attrs:{id:"cartPage"}},[e("checkout-form",{attrs:{cartItems:t.cartItems,apiUrl:t.apiUrl},on:{removeFromCart:t.removeFromCart}})],1):e("div",{attrs:{id:"mainPage"}},[e("lessons-list",{attrs:{lessons:t.lessons,apiUrl:t.apiUrl},on:{addToCart:t.addToCart}})],1)])},n=[],r=(e(1539),e(561),e(8862),function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",{staticClass:"container mb-4",attrs:{id:"lesson-cards"}},[e("div",{staticClass:"row row-cols-4 g-4"},t._l(t.lessons,(function(s){return e("div",{key:s.id,staticClass:"col"},[e("div",{staticClass:"card text-dark bg-light"},[e("figure",[e("img",{staticClass:"card-img-top",attrs:{height:"200",src:t.apiUrl+"/"+s.image}})]),e("div",{staticClass:"card-body"},[e("h5",{staticClass:"card-title",domProps:{textContent:t._s(s.subject)}}),e("p",{staticClass:"card-text mb-0"},[e("i",{staticClass:"fas fa-map-marker-alt"}),t._v(" Location: "+t._s(s.location)+" ")]),e("p",{staticClass:"card-text mb-0"},[e("i",{staticClass:"fas fa-dollar-sign"}),t._v(" Price: "+t._s(s.price)+" ")]),e("p",{staticClass:"card-text mb-0"},[e("i",{staticClass:"fas fa-users"}),t._v(" Number of spaces left: "+t._s(s.space)+" ")])]),e("button",{staticClass:"btn btn-dark shadow-none",attrs:{disabled:!(s.space>0)},on:{click:function(e){return t.addToCart(s)}}},[t._v(" Add to cart ")])])])})),0)])])}),i=[],c={name:"LessonsList",props:["lessons","apiUrl"],data:function(){return{sortOptions:["subject","location","price","space"],orderOptions:["ascending","descending"],sortBy:"subject",sortOrder:"ascending",searchInput:""}},methods:{addToCart:function(t){this.$emit("addToCart",t)}}},l=c,u=e(1001),d=(0,u.Z)(l,r,i,!1,null,null,null),h=d.exports,f=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",{staticClass:"container mb-4"},[e("p",{staticClass:"h3"},[t._v("Checkout")]),e("div",{attrs:{id:"checkout"}},[e("div",{staticClass:"form-row"},[e("label",{staticClass:"col col-form-label",attrs:{for:"checkoutName"}},[t._v("Name: ")]),e("div",{staticClass:"col w-25"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.checkoutName,expression:"checkoutName"}],staticClass:"form-control",attrs:{type:"text",id:"checkoutName"},domProps:{value:t.checkoutName},on:{input:function(s){s.target.composing||(t.checkoutName=s.target.value)}}})])]),e("div",{staticClass:"form-row"},[e("label",{staticClass:"col-auto col-form-label",attrs:{for:"checkoutPhone"}},[t._v("Phone number: ")]),e("div",{staticClass:"col w-25"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.checkoutPhone,expression:"checkoutPhone"}],staticClass:"form-control",attrs:{type:"tel",id:"checkoutPhone"},domProps:{value:t.checkoutPhone},on:{input:function(s){s.target.composing||(t.checkoutPhone=s.target.value)}}})])]),e("div",{staticClass:"form-row pt-3"},[e("div",{staticClass:"col"},[e("button",{staticClass:"btn btn-primary shadow-none",attrs:{disabled:!t.checkoutEnabled},on:{click:function(s){return t.checkout()}}},[t._v(" Check out ")])])]),t.orderConfirmed?e("div",{staticClass:"form-row pt-3"},[e("div",{staticClass:"col w-25 order-confirmation alert alert-success"},[t._v(" The order has been submitted ")])]):t._e()])]),e("div",{staticClass:"container mb-4"},[e("p",{staticClass:"h3"},[t._v("Shopping cart")]),e("div",{staticClass:"row row-cols-4 g-4"},t._l(t.cartItems,(function(s){return e("div",{key:s.id,staticClass:"col"},[e("div",{staticClass:"card text-dark bg-light"},[e("figure",[e("img",{staticClass:"card-img-top",attrs:{height:"200",src:t.apiUrl+"/"+s.image}})]),e("div",{staticClass:"card-body"},[e("h5",{staticClass:"card-title",domProps:{textContent:t._s(s.subject)}}),e("p",{staticClass:"card-text mb-0"},[e("i",{staticClass:"fas fa-map-marker-alt"}),t._v(" Location: "+t._s(s.location)+" ")]),e("p",{staticClass:"card-text mb-0"},[e("i",{staticClass:"fas fa-dollar-sign"}),t._v(" Price: "+t._s(s.price)+" ")])]),e("button",{staticClass:"btn btn-danger shadow-none",attrs:{disabled:t.orderConfirmed},on:{click:function(e){return t.removeFromCart(s)}}},[t._v(" Remove from cart ")])])])})),0)])])},m=[],p=(e(4747),e(4916),e(7601),{name:"CheckoutForm",props:["cartItems","apiUrl"],data:function(){return{checkoutName:"",checkoutPhone:"",orderConfirmed:!1}},methods:{checkout:function(){var t=this;this.cartItems.forEach((function(s){var e={name:t.checkoutName,phone_number:t.checkoutPhone,lesson_id:s._id,space:1};fetch(t.apiUrl+"/collections/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((function(t){return t.json()})).then((function(t){console.log("Success: ",t)}));var a={space:s.space};fetch(t.apiUrl+"/collections/lessons/"+s._id,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}).then((function(t){return t.json()})).then((function(t){console.log("Success: ",t)}))})),this.checkoutName="",this.checkoutPhone="",this.orderConfirmed=!0},removeFromCart:function(t){this.$emit("removeFromCart",t)}},computed:{checkoutEnabled:function(){return""!==this.checkoutName&&""!==this.checkoutPhone&&(!/[^a-z]/i.test(this.checkoutName)&&!!/^\d+$/.test(this.checkoutPhone))}}}),C=p,v=(0,u.Z)(C,f,m,!1,null,null,null),b=v.exports,g={name:"App",components:{LessonsList:h,CheckoutForm:b},data:function(){return{sitename:"After School Club",apiUrl:"https://cst3145-after-school-club.herokuapp.com",lessons:[],cartItems:[],showCart:!1}},methods:{loadAllLessons:function(){var t=this;fetch(this.apiUrl+"/collections/lessons").then((function(t){return t.json()})).then((function(s){t.lessons=s}))},switchToCart:function(){this.showCart=!0},switchToMain:function(){this.showCart=!1,this.orderConfirmed&&(this.cartItems=[],this.orderConfirmed=!1)},addToCart:function(t){this.cartItems.push(t),t.space>0&&(t.space-=1)},removeFromCart:function(t){var s=this.cartItems.indexOf(t);s>-1&&this.cartItems.splice(s,1),t.space+=1,this.cartItems.length<=0&&(this.showCart=!1)},resetDatabase:function(){var t=this;fetch(this.apiUrl+"/collections",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({reset:!0})}).then((function(){console.log("The database was reset"),t.loadAllLessons(),t.cartItems=[]}))}},computed:{isCartDisabled:function(){return this.cartItems.length<=0},cartItemsCount:function(){return this.cartItems.length}},created:function(){this.loadAllLessons()}},k=g,_=(0,u.Z)(k,o,n,!1,null,null,null),w=_.exports;a.Z.config.productionTip=!1,new a.Z({render:function(t){return t(w)}}).$mount("#app")}},s={};function e(a){var o=s[a];if(void 0!==o)return o.exports;var n=s[a]={exports:{}};return t[a](n,n.exports,e),n.exports}e.m=t,function(){var t=[];e.O=function(s,a,o,n){if(!a){var r=1/0;for(u=0;u<t.length;u++){a=t[u][0],o=t[u][1],n=t[u][2];for(var i=!0,c=0;c<a.length;c++)(!1&n||r>=n)&&Object.keys(e.O).every((function(t){return e.O[t](a[c])}))?a.splice(c--,1):(i=!1,n<r&&(r=n));if(i){t.splice(u--,1);var l=o();void 0!==l&&(s=l)}}return s}n=n||0;for(var u=t.length;u>0&&t[u-1][2]>n;u--)t[u]=t[u-1];t[u]=[a,o,n]}}(),function(){e.d=function(t,s){for(var a in s)e.o(s,a)&&!e.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:s[a]})}}(),function(){e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){e.o=function(t,s){return Object.prototype.hasOwnProperty.call(t,s)}}(),function(){var t={143:0};e.O.j=function(s){return 0===t[s]};var s=function(s,a){var o,n,r=a[0],i=a[1],c=a[2],l=0;if(r.some((function(s){return 0!==t[s]}))){for(o in i)e.o(i,o)&&(e.m[o]=i[o]);if(c)var u=c(e)}for(s&&s(a);l<r.length;l++)n=r[l],e.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return e.O(u)},a=self["webpackChunkafter_school_club_fronted_sfc"]=self["webpackChunkafter_school_club_fronted_sfc"]||[];a.forEach(s.bind(null,0)),a.push=s.bind(null,a.push.bind(a))}();var a=e.O(void 0,[998],(function(){return e(5671)}));a=e.O(a)})();
//# sourceMappingURL=app-legacy.2e153110.js.map