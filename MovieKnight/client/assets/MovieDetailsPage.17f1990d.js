import{_ as m,d as v,q as _,P as g,l as f,c as h,a as s,b as t,t as r,i as o,u as w,o as d,A as x,p as u,m as p,j as n}from"./index.f4fcd78e.js";const y={setup(){const i=w();v(()=>{c()});async function c(){try{const e=i.params.id;await _.getMovieById(e)}catch(e){g.error(e),f.log(e)}}return{async addMovieToGroup(){},movie:h(()=>x.activeMovie)}}},l=i=>(u("data-v-1490f93d"),i=i(),p(),i),b={class:"bg-style"},k={class:"container-fluid p-5 align-content-center"},M={class:"row justify-content-evenly bg-smokey py-4"},I={class:"col-12 col-md-3 d-flex align-items-center"},S=["src"],R={class:"col-12 col-md-7 p-2 mt-2"},B=l(()=>t("section",{class:"row justify-content-end"},[t("div",{class:"col-12 col-md-3 d-flex justify-content-between"},[t("button",{class:"btn maroon fw-bold fs-5 mx-2","data-bs-toggle":"modal","data-bs-target":"#movieModal",type:"button"},"Add to guild"),t("button",{class:"btn maroon fw-bold fs-5 mx-2"},"Make Event")])],-1)),j={class:"row"},P={class:"col-12 col-md-9 p-2 mt-3 bg-dark card elevation-3"},A={class:"text-danger"},D=l(()=>t("h2",{class:"mt-5"},"Movie Overview:",-1)),N={class:"row"},V={key:0,class:"col-12 col-md-9 p-2 mt-3 bg-dark card elevation-3"},E=n('<h3 data-v-1490f93d>Rating: <i class="mdi mdi-star text-warning" data-v-1490f93d></i><i class="mdi mdi-star text-warning" data-v-1490f93d></i><i class="mdi mdi-star text-warning" data-v-1490f93d></i><i class="mdi mdi-star text-warning" data-v-1490f93d></i><i class="mdi mdi-star text-warning" data-v-1490f93d></i></h3>',1),q=[E],C={key:1,class:"col-12 col-md-9 p-2 mt-3 bg-dark card elevation-3"},G=n('<h3 data-v-1490f93d>Rating: <i class="mdi mdi-star text-warning" data-v-1490f93d></i><i class="mdi mdi-star text-warning" data-v-1490f93d></i><i class="mdi mdi-star text-warning" data-v-1490f93d></i><i class="mdi mdi-star text-warning" data-v-1490f93d></i><i class="mdi mdi-star-outline text-warning" data-v-1490f93d></i></h3>',1),O=[G],T={key:2,class:"col-12 col-md-9 p-2 mt-3 bg-dark card elevation-3"},z=n('<h3 data-v-1490f93d>Rating: <i class="mdi mdi-star text-warning" data-v-1490f93d></i><i class="mdi mdi-star text-warning" data-v-1490f93d></i><i class="mdi mdi-star text-warning" data-v-1490f93d></i><i class="mdi mdi-star-outline text-warning" data-v-1490f93d></i><i class="mdi mdi-star-outline text-warning" data-v-1490f93d></i></h3>',1),F=[z],H={key:3,class:"col-12 col-md-9 p-2 mt-3 bg-dark card elevation-3"},J=n('<h3 data-v-1490f93d>Rating: <i class="mdi mdi-star text-warning" data-v-1490f93d></i><i class="mdi mdi-star text-warning" data-v-1490f93d></i><i class="mdi mdi-star-outline text-warning" data-v-1490f93d></i><i class="mdi mdi-star-outline text-warning" data-v-1490f93d></i><i class="mdi mdi-star-outline text-warning" data-v-1490f93d></i></h3>',1),K=[J],L={key:4,class:"col-12 col-md-9 p-2 mt-3 bg-dark card elevation-3"},Q=n('<h3 data-v-1490f93d>Rating: <i class="mdi mdi-star text-warning" data-v-1490f93d></i><i class="mdi mdi-star-outline text-warning" data-v-1490f93d></i><i class="mdi mdi-star-outline text-warning" data-v-1490f93d></i><i class="mdi mdi-star-outline text-warning" data-v-1490f93d></i><i class="mdi mdi-star-outline text-warning" data-v-1490f93d></i></h3>',1),U=[Q];function W(i,c,e,a,X,Y){return d(),s("div",b,[t("div",k,[t("section",M,[t("div",I,[t("img",{class:"rounded elevation-5",src:a.movie.posterImg,alt:""},null,8,S)]),t("div",R,[B,t("section",j,[t("div",P,[t("h1",A,[t("u",null,r(a.movie.title),1)]),D,t("h3",null,r(a.movie.description),1)])]),t("section",N,[a.movie.rating>=90?(d(),s("div",V,q)):o("",!0),a.movie.rating>=80&&a.movie.rating<90?(d(),s("div",C,O)):o("",!0),a.movie.rating>=60&&a.movie.rating<80?(d(),s("div",T,F)):o("",!0),a.movie.rating>=40&&a.movie.rating<60?(d(),s("div",H,K)):o("",!0),a.movie.rating>=20&&a.movie.rating<40?(d(),s("div",L,U)):o("",!0)])])])])])}const $=m(y,[["render",W],["__scopeId","data-v-1490f93d"]]);export{$ as default};
