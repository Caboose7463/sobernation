// Keeps people who aren't real visitors out of Google Analytics, so the stats wall counts real people only.
// The same file is in every site on the wall. It runs first in <head>, before any analytics code.
//
// Not counted: bots and crawlers (by user agent, plus headless and automated browsers, including Lighthouse),
// The owner's own devices (marked with the "not me" link), and testing (localhost, previews and any other host).
//
// The "not me" link: https://hireasauna.uk/?notme=1&chain=all marks this device on every site in turn, then
// shows a short note. ?notme=off undoes it on the site it's opened on.
export const NOT_COUNTED = `(function(){try{
var HOSTS=['hireasauna.uk','visitinghospitals.com','visitingcourts.com','www.dogparknearme.uk','www.visitsalisbury.uk','www.sobernation.co.uk','sharedshuttles.co.uk','www.curatorcontacts.com','visitingcarehomes.com','www.nearestbeach.uk'];
var SITES=HOSTS.map(function(h){return h.replace(/^www\\./,'')});
var IDS=['G-0XZLB2VFRP','G-1C34331S56','G-MM4P18JHVF','G-HQW00MXW88','G-RGCKFQLVLJ','G-QE8MH8W9YT','G-TG1ECW51LR','G-VVPM7KX8C7','G-LKH4XNFBD7'];
var K='notme',ls=null;try{ls=window.localStorage}catch(e){}
var host=location.hostname.replace(/^www\\./,''),q=new URLSearchParams(location.search),mark=q.get(K);
var live=SITES.indexOf(host)>-1;
var setCookie=function(v,age){document.cookie=K+'='+v+'; Max-Age='+age+'; Path=/; SameSite=Lax'+(live?'; Domain='+host:'')+(location.protocol==='https:'?'; Secure':'')};
if(mark==='off'){setCookie('',0);try{ls.removeItem(K);ls.removeItem('va-disable')}catch(e){}}
if(mark==='1'){
 setCookie('1',34560000);try{ls.setItem(K,'1');ls.setItem('va-disable','true')}catch(e){}
 var chain=q.get('chain');var done=(q.get('done')||'').split(',').filter(Boolean);if(done.indexOf(host)<0)done.push(host);
 var rest=(chain==='all'?SITES:(chain||'').split(',')).filter(function(s){return SITES.indexOf(s)>-1&&done.indexOf(s)<0});
 if(rest.length){location.replace('https://'+HOSTS[SITES.indexOf(rest[0])]+'/?notme=1&chain='+rest.slice(1).join(',')+'&done='+done.join(','));return}
 var note=function(){var d=document.createElement('div');d.setAttribute('role','status');d.style.cssText='position:fixed;left:12px;right:12px;bottom:12px;z-index:2147483647;background:#1f2a24;color:#fff;font:600 15px/1.45 system-ui,sans-serif;padding:14px 16px;border-radius:12px;box-shadow:0 6px 24px rgba(0,0,0,.25)';d.textContent='Done. This device is marked as yours on '+done.length+' sites and won\\'t be counted on the stats wall. Tap to close.';d.onclick=function(){d.remove()};document.body.appendChild(d)};
 if(document.body)note();else document.addEventListener('DOMContentLoaded',note);
 try{history.replaceState(null,'',location.pathname)}catch(e){}
}
var me=/(?:^|;\\s*)notme=1(?:;|$)/.test(document.cookie);try{me=me||ls.getItem(K)==='1'}catch(e){}
var ua=navigator.userAgent||'';
var bot=!!navigator.webdriver||/bot|crawl|spider|slurp|headless|lighthouse|pagespeed|gtmetrix|pingdom|uptime|monitor|phantom|puppeteer|playwright|selenium|python|curl|wget|httpclient|vercel|screenshot|prerender|preview/i.test(ua);
var test=!live;
if(!(me||bot||test))return;
window.__notCounted=me?'me':bot?'bot':'test';
for(var i=0;i<IDS.length;i++)window['ga-disable-'+IDS[i]]=true;
var hit=function(u){u=String(u||'');return u.indexOf('/g/collect')>-1||u.indexOf('google-analytics.com')>-1||u.indexOf('analytics.google.com')>-1};
var f=window.fetch;if(f)window.fetch=function(u,o){if(hit(u&&u.url?u.url:u))return Promise.resolve(new Response(null,{status:204}));return f.apply(this,arguments)};
var b=navigator.sendBeacon;if(b)navigator.sendBeacon=function(u){if(hit(u))return true;return b.apply(navigator,arguments)};
var x=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(m,u){if(hit(u))arguments[1]='data:,';return x.apply(this,arguments)};
var im=Object.getOwnPropertyDescriptor(HTMLImageElement.prototype,'src');if(im&&im.set)Object.defineProperty(HTMLImageElement.prototype,'src',{get:im.get,set:function(u){if(hit(u))return;im.set.call(this,u)},configurable:true});
}catch(e){}})();`;
