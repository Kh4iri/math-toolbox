import{s as M,n as p,c as H,u as z,g as C,d as S,e as I}from"../chunks/scheduler.e108d1fd.js";import{S as L,i as T,e as g,a as u,f as d,g as _,h as v,x as j,k as f,s as b,r as P,j as B,c as x,u as D,y as $,v as E,d as k,t as y,w as O}from"../chunks/index.f227a42f.js";import{p as R}from"../chunks/stores.178dcacd.js";import{b as h}from"../chunks/paths.6ae2439f.js";const V=!0,X=Object.freeze(Object.defineProperty({__proto__:null,prerender:V},Symbol.toStringTag,{value:"Module"}));function q(o){let e,n='<div class="block sm:hidden">xs</div> <div class="hidden sm:block md:hidden">sm</div> <div class="hidden md:block lg:hidden">md</div> <div class="hidden lg:block xl:hidden">lg</div> <div class="hidden xl:block 2xl:hidden">xl</div> <div class="hidden 2xl:block">2xl</div>';return{c(){e=_("div"),e.innerHTML=n,this.h()},l(t){e=v(t,"DIV",{class:!0,"data-svelte-h":!0}),j(e)!=="svelte-1myao1z"&&(e.innerHTML=n),this.h()},h(){f(e,"class","fixed bottom-1 left-1 z-50 w-6 h-6 flex items-center justify-center rounded-full bg-primary text-primary-content font-mono text-xs")},m(t,i){u(t,e,i)},d(t){t&&d(e)}}}function A(o){let e,n=o[0]!=="production"&&q();return{c(){n&&n.c(),e=g()},l(t){n&&n.l(t),e=g()},m(t,i){n&&n.m(t,i),u(t,e,i)},p,i:p,o:p,d(t){t&&d(e),n&&n.d(t)}}}function U(o){const e="production";return console.log("Environment:",e),[e]}class F extends L{constructor(e){super(),T(this,e,U,A,M,{})}}function w(o){let e,n=`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"></path></svg>
      Back`;return{c(){e=_("a"),e.innerHTML=n,this.h()},l(t){e=v(t,"A",{href:!0,class:!0,"data-svelte-h":!0}),j(e)!=="svelte-136zy33"&&(e.innerHTML=n),this.h()},h(){f(e,"href",h+"/"),f(e,"class","mb-3 btn btn-sm")},m(t,i){u(t,e,i)},d(t){t&&d(e)}}}function G(o){let e,n,t,i,c,s=o[0].url.pathname!==`${h}/`&&w();const m=o[2].default,a=H(m,o,o[1],null);return i=new F({}),{c(){e=_("div"),s&&s.c(),n=b(),a&&a.c(),t=b(),P(i.$$.fragment),this.h()},l(l){e=v(l,"DIV",{class:!0});var r=B(e);s&&s.l(r),n=x(r),a&&a.l(r),t=x(r),D(i.$$.fragment,r),r.forEach(d),this.h()},h(){f(e,"class","container mx-auto max-w-xl px-4 py-6 lg:max-w-3xl lg:pt-10")},m(l,r){u(l,e,r),s&&s.m(e,null),$(e,n),a&&a.m(e,null),$(e,t),E(i,e,null),c=!0},p(l,[r]){l[0].url.pathname!==`${h}/`?s||(s=w(),s.c(),s.m(e,n)):s&&(s.d(1),s=null),a&&a.p&&(!c||r&2)&&z(a,m,l,l[1],c?S(m,l[1],r,null):C(l[1]),null)},i(l){c||(k(a,l),k(i.$$.fragment,l),c=!0)},o(l){y(a,l),y(i.$$.fragment,l),c=!1},d(l){l&&d(e),s&&s.d(),a&&a.d(l),O(i)}}}function J(o,e,n){let t;I(o,R,s=>n(0,t=s));let{$$slots:i={},$$scope:c}=e;return console.log("Page URL Pathname:",t.url.pathname),console.log("Route:",t.route),o.$$set=s=>{"$$scope"in s&&n(1,c=s.$$scope)},[t,c,i]}class Y extends L{constructor(e){super(),T(this,e,J,G,M,{})}}export{Y as component,X as universal};
