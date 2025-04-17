import"./modulepreload-polyfill-B5Qt9EMX.js";const $=()=>{const t=new Set;return{subscribe:s=>t.add(s),notify:()=>t.forEach(s=>s())}},k=(t,e)=>{const{subscribe:n,notify:s}=$();let c={...t};const i=r=>{c={...c,...r},s()},a=()=>({...c}),o=Object.fromEntries(Object.entries(e).map(([r,d])=>[r,(...m)=>i(d(a(),...m))]));return{getState:a,setState:i,subscribe:n,actions:o}},R={products:[{id:"p1",name:"상품1",price:1e4,stock:50,bulkDiscountRate:.1},{id:"p2",name:"상품2",price:2e4,stock:30,bulkDiscountRate:.15},{id:"p3",name:"상품3",price:3e4,stock:20,bulkDiscountRate:.2},{id:"p4",name:"상품4",price:15e3,stock:0,bulkDiscountRate:.05},{id:"p5",name:"상품5",price:25e3,stock:10,bulkDiscountRate:.25}],lastSelectedProductId:null},u=k(R,{updateProduct:(t,e)=>({...t,products:t.products.map(n=>n.id===e.id?e:n)}),decreaseStock:(t,e)=>({...t,products:t.products.map(n=>n.id===e?{...n,stock:n.stock-1}:n)}),increaseStock:(t,e,n=1)=>({...t,products:t.products.map(s=>s.id===e?{...s,stock:s.stock+n}:s)}),setLastSelectedProductId:(t,e)=>({...t,lastSelectedProductId:e})}),E={OUT_OF_STOCK:"재고가 부족합니다."},y={OUT:0,SHORTAGE:5},l={BULK:{CART:{LOWER_LIMIT:30,RATE:.25},ITEM:{LOWER_LIMIT:10}},TUESDAY:{CODE:2,RATE:.1},FLASH:{RATE:.2},SUGGEST:{RATE:.05}},p=t=>t<=y.OUT,C=t=>t<y.SHORTAGE,b=(t,e,n=!1)=>n?Math.round(t*(1-e)):t*(1-e),L=()=>new Date().getDay()===l.TUESDAY.CODE,A={cartItems:[]},T=k(A,{addToCart:(t,e)=>{if(p(e.stock))return alert(E.OUT_OF_STOCK),t;const n=t.cartItems.find(c=>c.id===e.id);let s;if(n){const c=n.quantity+1;if(e.stock<c)return alert(E.OUT_OF_STOCK),t;s=t.cartItems.map(i=>i.id===e.id?{...i,quantity:c}:i)}else s=[...t.cartItems,{...e,quantity:1}];return u.actions.decreaseStock(e.id),u.actions.setLastSelectedProductId(e.id),{cartItems:s}},changeCartItemQuantity:(t,e,n)=>{const s=t.cartItems.find(a=>a.id===e.id);if(!s)return t;const c=s.quantity+n;return c<0?t:n>0&&p(e.stock)?(alert(E.OUT_OF_STOCK),t):(n>0?u.actions.decreaseStock(e.id):u.actions.increaseStock(e.id),{cartItems:t.cartItems.map(a=>a.id===e.id?{...a,quantity:c}:a).filter(a=>a.quantity>0)})},removeFromCart:(t,e)=>{const n=t.cartItems.find(c=>c.id===e);if(!n)return t;const s=t.cartItems.filter(c=>c.id!==e);return u.actions.increaseStock(e,n.quantity),{cartItems:s}}}),f={},h=t=>{const e=f[t.type];if(e){for(const n in e)if(t.target.matches(n)){e[n](t);break}}},M=(()=>{let t=!1;return()=>{t||(Object.keys(f).forEach(e=>{document.body.addEventListener(e,h)}),t=!0)}})(),I=(t,e,n)=>{f[t]||(f[t]={},document.body.addEventListener(t,h)),f[t][e]=n},D=t=>{let e=0,n=0,s=0;t.forEach(i=>{const{price:a,quantity:o,bulkDiscountRate:r}=i,d=a*o;e+=d,s+=o,n+=o>=l.BULK.ITEM.LOWER_LIMIT?b(d,r):d});let c=(e-n)/e||0;if(s>=l.BULK.CART.LOWER_LIMIT){const i=b(e,l.BULK.CART.RATE);i<n&&(n=i,c=l.BULK.CART.RATE)}return L()&&(n=b(n,l.TUESDAY.RATE),c=Math.max(c,l.TUESDAY.RATE)),{total:Math.round(n),discountRate:c,bonusPoint:Math.floor(n/1e3)}},U=()=>{const{changeCartItemQuantity:t,removeFromCart:e}=T.actions,n=`
    <h1 class="text-2xl font-bold">장바구니</h1>
    <div id="cart-items"></div>
    <div id="cart-total" class="text-xl font-bold my-4"></div>
  `,s=()=>{c()},c=()=>{const{products:o}=u.getState(),{cartItems:r}=T.getState(),d=document.getElementById("cart-items");d&&(d.innerHTML=i(r));const m=document.getElementById("cart-total");m&&(m.innerHTML=a(r)),I("click",".quantity-change",g=>{const{productId:S,change:v}=g.target.dataset,O=o.find(x=>x.id===S);t(O,Number(v))}),I("click",".remove-item",g=>{const{productId:S}=g.target.dataset;e(S)})},i=o=>o.map(r=>`
          <div id="${r.id}" class="flex justify-between items-center mb-2">
            <span>${r.name} - ${r.price}원 x ${r.quantity}</span>
            <div>
              <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${r.id}" data-change="-1">-</button>
              <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${r.id}" data-change="1">+</button>
              <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${r.id}">삭제</button>
            </div>
          </div>
      `).join(""),a=o=>{const{total:r,discountRate:d,bonusPoint:m}=D(o);return`
    <div id="cart-total" class="text-xl font-bold my-4">
      ${`총액: ${r}원${d>0?`<span class="text-green-500 ml-2">(${(d*100).toFixed(1)}% 할인 적용)</span>`:""}<span id="loyalty-points" class="text-blue-500 ml-2">(포인트: ${m})</span>`}
    </div>
    `};return{init:s,template:n,render:c}},P=()=>{let t=null;const e=`
    <select id="product-select" class="border rounded p-2 mr-2"></select>
    <button id="add-to-cart" class="bg-blue-500 text-white px-4 py-2 rounded">
      추가
    </button>
    <div id="stock-status" class="text-sm text-gray-500 mt-2"></div>
  `,n=()=>{I("click","#add-to-cart",()=>{const o=document.getElementById("product-select").value,r=u.getState().products.find(d=>d.id===o);T.actions.addToCart(r)}),I("change","#product-select",a=>{t=a.target.value}),s()},s=()=>{const{products:a}=u.getState(),o=document.getElementById("product-select");o&&(o.innerHTML=c(a),t&&(o.value=t));const r=document.getElementById("stock-status");r&&(r.innerHTML=i(a))},c=a=>a.map(o=>`
          <option value="${o.id}" ${p(o.stock)?"disabled":""}>${o.name} - ${o.price}원</option>
        `).join(""),i=a=>a.filter(o=>C(o.stock)).map(o=>`${o.name}: ${p(o.stock)?"품절":`재고 부족 (${o.stock}개 남음)`}`).join("<br/>");return{init:n,template:e,render:s}},w=()=>{const t=()=>{const{products:s}=u.getState(),c=s[Math.floor(Math.random()*s.length)];Math.random()<.3&&!p(c.stock)&&(alert(`번개세일! ${c.name}이(가) 20% 할인 중입니다!`),u.actions.updateProduct({...c,price:b(c.price,l.FLASH.RATE,!0)}))},e=()=>{const{lastSelectedProductId:s,products:c}=u.getState();if(s){const i=c.find(a=>a.id!==s&&!p(a.stock));i&&(alert(`${i.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`),u.actions.updateProduct({...i,price:b(i.price,l.SUGGEST.RATE,!0)}))}};return{init:()=>{setTimeout(()=>{setInterval(t,3e4)},Math.random()*1e4),setTimeout(()=>{setInterval(e,6e4)},Math.random()*2e4)}}},B=t=>{const e=U(),n=P(),s=`
    <div class="bg-gray-100 p-8">
      <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        ${e.template}
        ${n.template}
      </div>
    </div>
  `;t.innerHTML=s,n.init(),e.init(),w().init(),M(),u.subscribe(()=>{n.render()}),T.subscribe(()=>{e.render()})};B(document.getElementById("app"));
