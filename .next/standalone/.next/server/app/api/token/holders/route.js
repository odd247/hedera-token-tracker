"use strict";(()=>{var e={};e.id=170,e.ids=[170],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},9491:e=>{e.exports=require("assert")},2361:e=>{e.exports=require("events")},7147:e=>{e.exports=require("fs")},3685:e=>{e.exports=require("http")},5687:e=>{e.exports=require("https")},2037:e=>{e.exports=require("os")},1017:e=>{e.exports=require("path")},2781:e=>{e.exports=require("stream")},6224:e=>{e.exports=require("tty")},7310:e=>{e.exports=require("url")},3837:e=>{e.exports=require("util")},9796:e=>{e.exports=require("zlib")},2977:(e,t,r)=>{r.r(t),r.d(t,{headerHooks:()=>g,originalPathname:()=>x,patchFetch:()=>k,requestAsyncStorage:()=>p,routeModule:()=>c,serverHooks:()=>h,staticGenerationAsyncStorage:()=>d,staticGenerationBailout:()=>m});var o={};r.r(o),r.d(o,{GET:()=>l});var s=r(5419),a=r(9108),n=r(9678),i=r(8070),u=r(3949);async function l(e){let{searchParams:t}=new URL(e.url),r=t.get("tokenId"),o=t.get("limit")||"50";if(!r)return i.Z.json({error:"Token ID is required"},{status:400});try{var s;let e=(s=(s=r).trim().toLowerCase()).includes(".")?s:/^\d+$/.test(s)?`0.0.${s}`:s,t=`https://mainnet-public.mirrornode.hedera.com/api/v1/tokens/${e}/balances?limit=${o}&order=desc`;console.log("Fetching token holders from:",t);let a=await u.Z.get(t),n=a.data.balances.map(e=>({account:e.account,balance:e.balance,percentage:function(e,t){let r=BigInt(e),o=BigInt(t);return o===BigInt(0)?0:Number(r*BigInt(1e4)/o/BigInt(100))}(e.balance,a.data.total_supply)}));return console.log("Successfully fetched holders:",n.length),i.Z.json({holders:n,stats:{totalAccounts:a.data.balances.length.toString(),accountsAboveOne:n.filter(e=>Number(e.balance)>1).length}})}catch(e){return console.error("Error fetching token holders:",e.response?.data||e.message),i.Z.json({error:e.response?.data?.message||"Error fetching token holders"},{status:e.response?.status||500})}}let c=new s.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/token/holders/route",pathname:"/api/token/holders",filename:"route",bundlePath:"app/api/token/holders/route"},resolvedPagePath:"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/api/token/holders/route.ts",nextConfigOutput:"standalone",userland:o}),{requestAsyncStorage:p,staticGenerationAsyncStorage:d,serverHooks:h,headerHooks:g,staticGenerationBailout:m}=c,x="/api/token/holders/route";function k(){return(0,n.patchFetch)({serverHooks:h,staticGenerationAsyncStorage:d})}}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[638,823],()=>r(2977));module.exports=o})();