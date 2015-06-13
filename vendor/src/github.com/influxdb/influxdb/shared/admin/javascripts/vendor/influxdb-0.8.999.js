!function(e,t,n){"undefined"!=typeof module&&module.exports?module.exports=n():"function"==typeof define&&define.amd?define(n):t[e]=n()}("reqwest",this,function(){function succeed(e){var t=protocolRe.exec(e.url);return t=t&&t[1]||window.location.protocol,httpsRe.test(t)?twoHundo.test(e.request.status):!!e.request.response}function handleReadyState(e,t,n){return function(){return e._aborted?n(e.request):e._timedOut?n(e.request,"Request is aborted: timeout"):(e.request&&4==e.request[readyState]&&(e.request.onreadystatechange=noop,succeed(e)?t(e.request):n(e.request)),void 0)}}function setHeaders(e,t){var n,r=t.headers||{};r.Accept=r.Accept||defaultHeaders.accept[t.type]||defaultHeaders.accept["*"];var i="function"==typeof FormData&&t.data instanceof FormData;t.crossOrigin||r[requestedWith]||(r[requestedWith]=defaultHeaders.requestedWith),r[contentType]||i||(r[contentType]=t.contentType||defaultHeaders.contentType);for(n in r)r.hasOwnProperty(n)&&"setRequestHeader"in e&&e.setRequestHeader(n,r[n])}function setCredentials(e,t){"undefined"!=typeof t.withCredentials&&"undefined"!=typeof e.withCredentials&&(e.withCredentials=!!t.withCredentials)}function generalCallback(e){lastValue=e}function urlappend(e,t){return e+(/\?/.test(e)?"&":"?")+t}function handleJsonp(e,t,n,r){var i=uniqid++,o=e.jsonpCallback||"callback",s=e.jsonpCallbackName||reqwest.getcallbackPrefix(i),a=new RegExp("((^|\\?|&)"+o+")=([^&]+)"),u=r.match(a),c=doc.createElement("script"),l=0,f=-1!==navigator.userAgent.indexOf("MSIE 10.0");return u?"?"===u[3]?r=r.replace(a,"$1="+s):s=u[3]:r=urlappend(r,o+"="+s),win[s]=generalCallback,c.type="text/javascript",c.src=r,c.async=!0,"undefined"==typeof c.onreadystatechange||f||(c.htmlFor=c.id="_reqwest_"+i),c.onload=c.onreadystatechange=function(){return c[readyState]&&"complete"!==c[readyState]&&"loaded"!==c[readyState]||l?!1:(c.onload=c.onreadystatechange=null,c.onclick&&c.onclick(),t(lastValue),lastValue=void 0,head.removeChild(c),l=1,void 0)},head.appendChild(c),{abort:function(){c.onload=c.onreadystatechange=null,n({},"Request is aborted: timeout",{}),lastValue=void 0,head.removeChild(c),l=1}}}function getRequest(e,t){var n,r=this.o,i=(r.method||"GET").toUpperCase(),o="string"==typeof r?r:r.url,s=r.processData!==!1&&r.data&&"string"!=typeof r.data?reqwest.toQueryString(r.data):r.data||null,a=!1;return"jsonp"!=r.type&&"GET"!=i||!s||(o=urlappend(o,s),s=null),"jsonp"==r.type?handleJsonp(r,e,t,o):(n=r.xhr&&r.xhr(r)||xhr(r),n.open(i,o,r.async===!1?!1:!0),setHeaders(n,r),setCredentials(n,r),win[xDomainRequest]&&n instanceof win[xDomainRequest]?(n.onload=e,n.onerror=t,n.onprogress=function(){},a=!0):n.onreadystatechange=handleReadyState(this,e,t),r.before&&r.before(n),a?setTimeout(function(){n.send(s)},200):n.send(s),n)}function Reqwest(e,t){this.o=e,this.fn=t,init.apply(this,arguments)}function setType(e){return e.match("json")?"json":e.match("javascript")?"js":e.match("text")?"html":e.match("xml")?"xml":void 0}function init(o,fn){function complete(e){for(o.timeout&&clearTimeout(self.timeout),self.timeout=null;self._completeHandlers.length>0;)self._completeHandlers.shift()(e)}function success(resp){var type=o.type||resp&&setType(resp.getResponseHeader("Content-Type"));resp="jsonp"!==type?self.request:resp;var filteredResponse=globalSetupOptions.dataFilter(resp.responseText,type),r=filteredResponse;try{resp.responseText=r}catch(e){}if(r)switch(type){case"json":try{resp=win.JSON?win.JSON.parse(r):eval("("+r+")")}catch(err){return error(resp,"Could not parse JSON in response",err)}break;case"js":resp=eval(r);break;case"html":resp=r;break;case"xml":resp=resp.responseXML&&resp.responseXML.parseError&&resp.responseXML.parseError.errorCode&&resp.responseXML.parseError.reason?null:resp.responseXML}for(self._responseArgs.resp=resp,self._fulfilled=!0,fn(resp),self._successHandler(resp);self._fulfillmentHandlers.length>0;)resp=self._fulfillmentHandlers.shift()(resp);complete(resp)}function timedOut(){self._timedOut=!0,self.request.abort()}function error(e,t,n){for(e=self.request,self._responseArgs.resp=e,self._responseArgs.msg=t,self._responseArgs.t=n,self._erred=!0;self._errorHandlers.length>0;)self._errorHandlers.shift()(e,t,n);complete(e)}this.url="string"==typeof o?o:o.url,this.timeout=null,this._fulfilled=!1,this._successHandler=function(){},this._fulfillmentHandlers=[],this._errorHandlers=[],this._completeHandlers=[],this._erred=!1,this._responseArgs={};var self=this;fn=fn||function(){},o.timeout&&(this.timeout=setTimeout(function(){timedOut()},o.timeout)),o.success&&(this._successHandler=function(){o.success.apply(o,arguments)}),o.error&&this._errorHandlers.push(function(){o.error.apply(o,arguments)}),o.complete&&this._completeHandlers.push(function(){o.complete.apply(o,arguments)}),this.request=getRequest.call(this,success,error)}function reqwest(e,t){return new Reqwest(e,t)}function normalize(e){return e?e.replace(/\r?\n/g,"\r\n"):""}function serial(e,t){var n,r,i,o,s=e.name,a=e.tagName.toLowerCase(),u=function(e){e&&!e.disabled&&t(s,normalize(e.attributes.value&&e.attributes.value.specified?e.value:e.text))};if(!e.disabled&&s)switch(a){case"input":/reset|button|image|file/i.test(e.type)||(n=/checkbox/i.test(e.type),r=/radio/i.test(e.type),i=e.value,(!(n||r)||e.checked)&&t(s,normalize(n&&""===i?"on":i)));break;case"textarea":t(s,normalize(e.value));break;case"select":if("select-one"===e.type.toLowerCase())u(e.selectedIndex>=0?e.options[e.selectedIndex]:null);else for(o=0;e.length&&o<e.length;o++)e.options[o].selected&&u(e.options[o])}}function eachFormElement(){var e,t,n=this,r=function(e,t){var r,i,o;for(r=0;r<t.length;r++)for(o=e[byTag](t[r]),i=0;i<o.length;i++)serial(o[i],n)};for(t=0;t<arguments.length;t++)e=arguments[t],/input|select|textarea/i.test(e.tagName)&&serial(e,n),r(e,["input","select","textarea"])}function serializeQueryString(){return reqwest.toQueryString(reqwest.serializeArray.apply(null,arguments))}function serializeHash(){var e={};return eachFormElement.apply(function(t,n){t in e?(e[t]&&!isArray(e[t])&&(e[t]=[e[t]]),e[t].push(n)):e[t]=n},arguments),e}function buildParams(e,t,n,r){var i,o,s,a=/\[\]$/;if(isArray(t))for(o=0;t&&o<t.length;o++)s=t[o],n||a.test(e)?r(e,s):buildParams(e+"["+("object"==typeof s?o:"")+"]",s,n,r);else if(t&&"[object Object]"===t.toString())for(i in t)buildParams(e+"["+i+"]",t[i],n,r);else r(e,t)}var win=window,doc=document,httpsRe=/^http/,protocolRe=/(^\w+):\/\//,twoHundo=/^(20\d|1223)$/,byTag="getElementsByTagName",readyState="readyState",contentType="Content-Type",requestedWith="X-Requested-With",head=doc[byTag]("head")[0],uniqid=0,callbackPrefix="reqwest_"+ +new Date,lastValue,xmlHttpRequest="XMLHttpRequest",xDomainRequest="XDomainRequest",noop=function(){},isArray="function"==typeof Array.isArray?Array.isArray:function(e){return e instanceof Array},defaultHeaders={contentType:"application/x-www-form-urlencoded",requestedWith:xmlHttpRequest,accept:{"*":"text/javascript, text/html, application/xml, text/xml, */*",xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript",js:"application/javascript, text/javascript"}},xhr=function(e){if(e.crossOrigin===!0){var t=win[xmlHttpRequest]?new XMLHttpRequest:null;if(t&&"withCredentials"in t)return t;if(win[xDomainRequest])return new XDomainRequest;throw new Error("Browser does not support cross-origin requests")}return win[xmlHttpRequest]?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")},globalSetupOptions={dataFilter:function(e){return e}};return Reqwest.prototype={abort:function(){this._aborted=!0,this.request.abort()},retry:function(){init.call(this,this.o,this.fn)},then:function(e,t){return e=e||function(){},t=t||function(){},this._fulfilled?this._responseArgs.resp=e(this._responseArgs.resp):this._erred?t(this._responseArgs.resp,this._responseArgs.msg,this._responseArgs.t):(this._fulfillmentHandlers.push(e),this._errorHandlers.push(t)),this},always:function(e){return this._fulfilled||this._erred?e(this._responseArgs.resp):this._completeHandlers.push(e),this},fail:function(e){return this._erred?e(this._responseArgs.resp,this._responseArgs.msg,this._responseArgs.t):this._errorHandlers.push(e),this},"catch":function(e){return this.fail(e)}},reqwest.serializeArray=function(){var e=[];return eachFormElement.apply(function(t,n){e.push({name:t,value:n})},arguments),e},reqwest.serialize=function(){if(0===arguments.length)return"";var e,t,n=Array.prototype.slice.call(arguments,0);return e=n.pop(),e&&e.nodeType&&n.push(e)&&(e=null),e&&(e=e.type),t="map"==e?serializeHash:"array"==e?reqwest.serializeArray:serializeQueryString,t.apply(null,n)},reqwest.toQueryString=function(e,t){var n,r,i=t||!1,o=[],s=encodeURIComponent,a=function(e,t){t="function"==typeof t?t():null==t?"":t,o[o.length]=s(e)+"="+s(t)};if(isArray(e))for(r=0;e&&r<e.length;r++)a(e[r].name,e[r].value);else for(n in e)e.hasOwnProperty(n)&&buildParams(n,e[n],i,a);return o.join("&").replace(/%20/g,"+")},reqwest.getcallbackPrefix=function(){return callbackPrefix},reqwest.compat=function(e,t){return e&&(e.type&&(e.method=e.type)&&delete e.type,e.dataType&&(e.type=e.dataType),e.jsonpCallback&&(e.jsonpCallbackName=e.jsonpCallback)&&delete e.jsonpCallback,e.jsonp&&(e.jsonpCallback=e.jsonp)),new Reqwest(e,t)},reqwest.ajaxSetup=function(e){e=e||{};for(var t in e)globalSetupOptions[t]=e[t]},reqwest}),function(e){if("function"==typeof bootstrap)bootstrap("promise",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makePromise=e}else"undefined"!=typeof window?window.Promise=e():global.Promise=e()}(function(){return function(e,t,n){function r(n,o){if(!t[n]){if(!e[n]){var s="function"==typeof require&&require;if(!o&&s)return s(n,!0);if(i)return i(n,!0);throw new Error("Cannot find module '"+n+"'")}var a=t[n]={exports:{}};e[n][0].call(a.exports,function(t){var i=e[n][1][t];return r(i?i:t)},a,a.exports)}return t[n].exports}for(var i="function"==typeof require&&require,o=0;o<n.length;o++)r(n[o]);return r}({1:[function(e,t){var n=t.exports={};n.nextTick=function(){var e="undefined"!=typeof window&&window.setImmediate,t="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(e)return function(e){return window.setImmediate(e)};if(t){var n=[];return window.addEventListener("message",function(e){if(e.source===window&&"process-tick"===e.data&&(e.stopPropagation(),n.length>0)){var t=n.shift();t()}},!0),function(e){n.push(e),window.postMessage("process-tick","*")}}return function(e){setTimeout(e,0)}}(),n.title="browser",n.browser=!0,n.env={},n.argv=[],n.binding=function(){throw new Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(){throw new Error("process.chdir is not supported")}},{}],2:[function(e,t){"use strict";function n(e){function t(e){return null===l?(d.push(e),void 0):(i(function(){var t=l?e.onFulfilled:e.onRejected;if(null===t)return(l?e.resolve:e.reject)(p),void 0;var n;try{n=t(p)}catch(r){return e.reject(r),void 0}e.resolve(n)}),void 0)}function o(e){f||s(e)}function s(e){if(null===l)try{if(e===h)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var t=e.then;if("function"==typeof t)return f=!0,t.call(e,s,u),void 0}l=!0,p=e,c()}catch(n){u(n)}}function a(e){f||u(e)}function u(e){null===l&&(l=!1,p=e,c())}function c(){for(var e=0,n=d.length;n>e;e++)t(d[e]);d=null}if(!(this instanceof n))return new n(e);if("function"!=typeof e)throw new TypeError("not a function");var l=null,f=!1,p=null,d=[],h=this;this.then=function(e,i){return new n(function(n,o){t(new r(e,i,n,o))})};try{e(o,a)}catch(m){a(m)}}function r(e,t,n,r){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.resolve=n,this.reject=r}var i=e("./lib/next-tick");t.exports=n},{"./lib/next-tick":4}],3:[function(e,t){"use strict";var n=e("./core.js"),r=e("./lib/next-tick");t.exports=n,n.from=function(e){return e instanceof n?e:new n(function(t){t(e)})},n.denodeify=function(e){return function(){var t=this,r=Array.prototype.slice.call(arguments);return new n(function(n,i){r.push(function(e,t){e?i(e):n(t)}),e.apply(t,r)})}},n.nodeify=function(e){return function(){var t=Array.prototype.slice.call(arguments),i="function"==typeof t[t.length-1]?t.pop():null;try{return e.apply(this,arguments).nodeify(i)}catch(o){if(null==i)return new n(function(e,t){t(o)});r(function(){i(o)})}}},n.all=function(){var e=Array.prototype.slice.call(1===arguments.length&&Array.isArray(arguments[0])?arguments[0]:arguments);return new n(function(t,n){function r(o,s){try{if(s&&("object"==typeof s||"function"==typeof s)){var a=s.then;if("function"==typeof a)return a.call(s,function(e){r(o,e)},n),void 0}e[o]=s,0===--i&&t(e)}catch(u){n(u)}}if(0===e.length)return t([]);for(var i=e.length,o=0;o<e.length;o++)r(o,e[o])})},n.prototype.done=function(){var e=arguments.length?this.then.apply(this,arguments):this;e.then(null,function(e){r(function(){throw e})})},n.prototype.nodeify=function(e){return null==e?this:(this.then(function(t){r(function(){e(null,t)})},function(t){r(function(){e(t)})}),void 0)}},{"./core.js":2,"./lib/next-tick":4}],4:[function(e,t){!function(e){"use strict";t.exports="function"==typeof setImmediate?function(e){setImmediate(e)}:"undefined"!=typeof e&&e&&"function"==typeof e.nextTick?function(t){e.nextTick(t)}:function(e){setTimeout(e,0)}}(e("__browserify_process"))},{__browserify_process:1}]},{},[3])(3)}),function(){var e,t=[].indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(t in this&&this[t]===e)return t;return-1};window.InfluxDB=e=function(){function e(e){var n;e||(e={}),this.host=e.host||"localhost",this.hosts=e.hosts||[this.host],this.port=e.port||8086,this.username=e.username||"root",this.password=e.password||"root",this.database=e.database,this.ssl=e.ssl||!1,this.isCrossOrigin=(n=window.location.host,t.call(this.hosts,n)<0),this.username=encodeURIComponent(this.username),this.password=encodeURIComponent(this.password)}return e.prototype.showDatabases=function(){return this.query("SHOW DATABASES")},e.prototype.createDatabase=function(e){return this.query("CREATE DATABASE "+e)},e.prototype.dropDatabase=function(e){return this.query("DROP DATABASE "+e)},e.prototype.showUsers=function(){return this.query("SHOW USERS")},e.prototype.createUser=function(e,t,n){return this.query("CREATE USER "+t+" WITH PASSWORD '"+n+"'")},e.prototype.dropUser=function(e,t){return this.query("DROP USER "+t)},e.prototype.showRetentionPolicies=function(e){return this.queryDatabase("SHOW RETENTION POLICIES "+e)},e.prototype.createRetentionPolicy=function(e,t,n,r,i){return this.query("CREATE RETENTION POLICY "+t+" ON "+e+" DURATION "+n+" REPLICATION "+r+(i?" DEFAULT":""))},e.prototype.deleteRetentionPolicy=function(e){return this.queryDatabase("DROP RETENTION POLICY "+e)},e.prototype.showContinuousQueries=function(){return this.query("SHOW CONTINUOUS QUERIES")},e.prototype.deleteContinuousQuery=function(e,t){return this.query("DROP CONTINUOUS QUERY "+t)},e.prototype.query=function(e,t){return this.get(this.path("query",{q:e}),t)},e.prototype.queryDatabase=function(e,t){return this.get(this.path("query",{q:e,db:this.database}),t)},e.prototype.get=function(e,t){return new Promise(function(n){return function(r,i){return reqwest({method:"get",type:"json",url:n.url(e),crossOrigin:n.isCrossOrigin,success:function(e){return r(e),t?t(n.formatPoints(e)):void 0},error:function(e){return i(e)}})}}(this))},e.prototype.post=function(e,t){return new Promise(function(n){return function(r,i){return reqwest({method:"post",type:"json",url:n.url(e),crossOrigin:n.isCrossOrigin,contentType:"application/json",data:"string"==typeof t?t:JSON.stringify(t),success:function(e){return r(e)},error:function(e){return i(e)}})}}(this))},e.prototype.formatPoints=function(e){return e.map(function(e){var t;return t={name:e.name,points:e.points.map(function(t){var n,r;return n={},e.columns.forEach(function(e,r){return n[e]=t[r]}),r=new Date(0),r.setUTCSeconds(Math.round(n.time/1e3)),n.time=r,n})}})},e.prototype.read=function(){return this.queryDatabase("SELECT value FROM cpu","foo")},e.prototype.write=function(e,t,n,r){var i,o,s,a,u;null==n&&(n={}),o={points:[],name:e,columns:[]},a=[];for(s in t)u=t[s],a.push(u),o.columns.push(s);return o.points.push(a),i=[o],this.post(this.path("db/"+this.database+"/series"),i,r)},e.prototype.writeJSON=function(e,t){return this.post(this.path("write",{db:this.database}),e,t)},e.prototype.writePoint=function(e,t,n,r){var i,o,s,a,u;null==n&&(n={}),o={points:[],name:e,columns:[]},a=[];for(s in t)u=t[s],a.push(u),o.columns.push(s);return o.points.push(a),i=[o],this.post(this.path("db/"+this.database+"/series"),i,r)},e.prototype.writeSeries=function(e,t){return this.post(this.path("db/"+this.database+"/series"),e,t)},e.prototype.path=function(e,t){var n;return n=""+e+"?u="+this.username+"&p="+this.password,null!=t&&t.q&&(n+="&q="+encodeURIComponent(t.q)),null!=t&&t.db&&(n+="&db="+encodeURIComponent(t.db)),n},e.prototype.url=function(e){var t;return t=this.hosts.shift(),this.hosts.push(t),""+(this.ssl?"https":"http")+"://"+t+":"+this.port+"/"+e},e}()}.call(this),window.InfluxDB.VERSION="0.0.16",function(){}.call(this);