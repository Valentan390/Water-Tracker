import{u as g,a as d,j as s,L as u,o as h,a3 as p,a4 as x}from"./index-HYLRZFnx.js";import{s as a}from"./AuthSigninForm.module-nYNwD-Mb.js";import{A as P,M as j}from"./MainAut-gCase2ir.js";const f=[{label:"Enter your email",name:"email",placeholder:"E-mail"}],b=()=>{const r=g(),{register:n,handleSubmit:t,formState:{errors:i},reset:l}=d({mode:"onTouched",resolver:h(x)}),m=async(e,o)=>{o.preventDefault(),console.log(e);try{await r(p(e)),l()}catch(c){console.log(c.message)}};return s.jsxs("div",{className:a.signinPageWraper,children:[s.jsxs("form",{className:a.signinPageForm,onSubmit:t(m),children:[s.jsx("h4",{className:a.signinPageTitle,children:"Forgot password"}),f.map((e,o)=>s.jsx(P,{label:e.label,name:e.name,placeholder:e.placeholder,register:n,errors:i},o)),s.jsx("button",{className:a.signinPageButton,name:"Signin",type:"submit",children:"Send"}),s.jsx(u,{className:a.signinPageLink,to:"/signin",children:"Sign In"})]}),s.jsx("div",{className:a.signinPageBottle})]})},N=()=>s.jsx(j,{children:s.jsx(b,{})});export{N as default};
