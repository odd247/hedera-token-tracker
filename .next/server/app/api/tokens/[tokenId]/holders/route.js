"use strict";(()=>{var e={};e.id=768,e.ids=[768],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},9491:e=>{e.exports=require("assert")},2361:e=>{e.exports=require("events")},7147:e=>{e.exports=require("fs")},3685:e=>{e.exports=require("http")},5687:e=>{e.exports=require("https")},2037:e=>{e.exports=require("os")},1017:e=>{e.exports=require("path")},2781:e=>{e.exports=require("stream")},6224:e=>{e.exports=require("tty")},7310:e=>{e.exports=require("url")},3837:e=>{e.exports=require("util")},9796:e=>{e.exports=require("zlib")},5585:(e,t,r)=>{r.r(t),r.d(t,{headerHooks:()=>m,originalPathname:()=>k,patchFetch:()=>x,requestAsyncStorage:()=>d,routeModule:()=>c,serverHooks:()=>h,staticGenerationAsyncStorage:()=>l,staticGenerationBailout:()=>g});var o={};r.r(o),r.d(o,{GET:()=>p});var s=r(5419),a=r(9108),n=r(9678),i=r(8070),u=r(3949);async function p(e,{params:t}){let r=t.tokenId,{searchParams:o}=new URL(e.url),s=o.get("limit")||"50";if(!r)return i.Z.json({error:"Token ID is required"},{status:400});try{var a;let e=(a=(a=r).trim().toLowerCase()).includes(".")?a:/^\d+$/.test(a)?`0.0.${a}`:a,t=`https://mainnet-public.mirrornode.hedera.com/api/v1/tokens/${e}/balances?limit=${s}&order=desc`,o=await u.Z.get(t),n=o.data.balances.map(e=>({account:e.account,balance:e.balance,percentage:function(e,t){let r=BigInt(e),o=BigInt(t);return o===BigInt(0)?0:Number(r*BigInt(1e4)/o/BigInt(100))}(e.balance,o.data.total_supply)}));return i.Z.json({holders:n,stats:{totalAccounts:o.data.balances.length.toString(),accountsAboveOne:n.filter(e=>Number(e.balance)>1).length}})}catch(e){return console.error("Error fetching token holders:",e.response?.data||e.message),i.Z.json({error:e.response?.data?.message||"Error fetching token holders"},{status:e.response?.status||500})}}let c=new s.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/tokens/[tokenId]/holders/route",pathname:"/api/tokens/[tokenId]/holders",filename:"route",bundlePath:"app/api/tokens/[tokenId]/holders/route"},resolvedPagePath:"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/api/tokens/[tokenId]/holders/route.ts",nextConfigOutput:"standalone",userland:o}),{requestAsyncStorage:d,staticGenerationAsyncStorage:l,serverHooks:h,headerHooks:m,staticGenerationBailout:g}=c,k="/api/tokens/[tokenId]/holders/route";function x(){return(0,n.patchFetch)({serverHooks:h,staticGenerationAsyncStorage:l})}}};var t=require("../../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[638,823],()=>r(5585));module.exports=o})();