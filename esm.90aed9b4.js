function e(e){return e&&e.__esModule?e.default:e}function n(e,n,t,r){Object.defineProperty(e,n,{get:t,set:r,enumerable:!0,configurable:!0})}var t=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequire1f5d;t.register("8VMga",(function(r,o){var i;i=r.exports,Object.defineProperty(i,"__esModule",{value:!0,configurable:!0}),n(r.exports,"default",(()=>h),(e=>h=e));var a,c=t("3vRz3"),s=t("kyNvc"),l=t("5GDeN"),u=(a=function(e,n){return a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])},a(e,n)},function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function t(){this.constructor=e}a(e,n),e.prototype=null===n?Object.create(n):(t.prototype=n.prototype,new t)}),d=function(e,n,t,r){return new(t||(t=Promise))((function(o,i){function a(e){try{s(r.next(e))}catch(e){i(e)}}function c(e){try{s(r.throw(e))}catch(e){i(e)}}function s(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,c)}s((r=r.apply(e,n||[])).next())}))},f=function(e,n){var t,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(t)throw new TypeError("Generator is already executing.");for(;a;)try{if(t=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=n.call(e,a)}catch(e){i=[6,e],r=0}finally{t=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}},p=function(e){var n="function"==typeof Symbol&&Symbol.iterator,t=n&&e[n],r=0;if(t)return t.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")},h=function(e){function n(t){var r=e.call(this)||this;return r._network="mainnet-beta",r._provider=null,r._adapterInstance=null,r._element=null,r._iframe=null,r._connectHandler=null,r._flutterHandlerInterval=null,r._handleEvent=function(e){var n,t,o;switch(e.type){case"connect_native_web":return r._collapseIframe(),r._adapterInstance=new(0,s.default)(r._iframe,r._network,(null===(n=e.data)||void 0===n?void 0:n.provider)||r._provider||"https://solflare.com/provider"),r._adapterInstance.on("connect",r._webConnected),r._adapterInstance.on("disconnect",r._webDisconnected),r._adapterInstance.connect(),void r._setPreferredAdapter("native_web");case"connect":return r._collapseIframe(),r._adapterInstance=new(0,l.default)(r._iframe,(null===(t=e.data)||void 0===t?void 0:t.publicKey)||""),r._adapterInstance.connect(),r._setPreferredAdapter(null===(o=e.data)||void 0===o?void 0:o.adapter),r._connectHandler&&(r._connectHandler.resolve(),r._connectHandler=null),void r.emit("connect",r.publicKey);case"disconnect":return r._connectHandler&&(r._connectHandler.reject(),r._connectHandler=null),r._disconnected(),void r.emit("disconnect");case"collapse":return void r._collapseIframe();default:return}},r._handleMessage=function(e){var n;if("solflareIframeToWalletAdapter"===(null===(n=e.data)||void 0===n?void 0:n.channel)){var t=e.data.data||{};"event"===t.type?r._handleEvent(t.event):r._adapterInstance&&r._adapterInstance.handleMessage(t)}},r._removeElement=function(){null!==r._flutterHandlerInterval&&(clearInterval(r._flutterHandlerInterval),r._flutterHandlerInterval=null),r._element&&(r._element.remove(),r._element=null)},r._removeDanglingElements=function(){var e,n,t=document.getElementsByClassName("solflare-wallet-adapter-iframe");try{for(var r=p(t),o=r.next();!o.done;o=r.next()){var i=o.value;i.parentElement&&i.remove()}}catch(n){e={error:n}}finally{try{o&&!o.done&&(n=r.return)&&n.call(r)}finally{if(e)throw e.error}}},r._injectElement=function(){r._removeElement(),r._removeDanglingElements();var e="".concat(n.IFRAME_URL,"?cluster=").concat(encodeURIComponent(r._network),"&origin=").concat(encodeURIComponent(window.location.origin)),t=r._getPreferredAdapter();t&&(e+="&adapter=".concat(encodeURIComponent(t))),r._element=document.createElement("div"),r._element.className="solflare-wallet-adapter-iframe",r._element.innerHTML="\n      <iframe src='".concat(e,"' style='position: fixed; top: 0; bottom: 0; left: 0; right: 0; width: 100%; height: 100%; border: none; border-radius: 0; z-index: 99999; color-scheme: auto;' allowtransparency='true'></iframe>\n    "),document.body.appendChild(r._element),r._iframe=r._element.querySelector("iframe"),window.fromFlutter=r._handleMobileMessage,r._flutterHandlerInterval=setInterval((function(){window.fromFlutter=r._handleMobileMessage}),100),window.addEventListener("message",r._handleMessage,!1)},r._collapseIframe=function(){r._iframe&&(r._iframe.style.top="",r._iframe.style.right="",r._iframe.style.height="2px",r._iframe.style.width="2px")},r._getPreferredAdapter=function(){return localStorage&&localStorage.getItem("solflarePreferredWalletAdapter")||null},r._setPreferredAdapter=function(e){localStorage&&e&&localStorage.setItem("solflarePreferredWalletAdapter",e)},r._clearPreferredAdapter=function(){localStorage&&localStorage.removeItem("solflarePreferredWalletAdapter")},r._webConnected=function(){r._connectHandler&&(r._connectHandler.resolve(),r._connectHandler=null),r.emit("connect",r.publicKey)},r._webDisconnected=function(){r._connectHandler&&(r._connectHandler.reject(),r._connectHandler=null),r._disconnected(),r.emit("disconnect")},r._disconnected=function(){window.removeEventListener("message",r._handleMessage,!1),r._removeElement(),r._clearPreferredAdapter(),r._adapterInstance=null},r._handleMobileMessage=function(e){var n,t;null===(t=null===(n=r._iframe)||void 0===n?void 0:n.contentWindow)||void 0===t||t.postMessage({channel:"solflareMobileToIframe",data:e},"*")},(null==t?void 0:t.network)&&(r._network=null==t?void 0:t.network),(null==t?void 0:t.provider)&&(r._provider=null==t?void 0:t.provider),r}return u(n,e),Object.defineProperty(n.prototype,"publicKey",{get:function(){var e;return(null===(e=this._adapterInstance)||void 0===e?void 0:e.publicKey)||null},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"isConnected",{get:function(){var e;return!!(null===(e=this._adapterInstance)||void 0===e?void 0:e.connected)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"connected",{get:function(){return this.isConnected},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"autoApprove",{get:function(){return!1},enumerable:!1,configurable:!0}),n.prototype.connect=function(){return d(this,void 0,void 0,(function(){var e=this;return f(this,(function(n){switch(n.label){case 0:return this.connected?[2]:(this._injectElement(),[4,new Promise((function(n,t){e._connectHandler={resolve:n,reject:t}}))]);case 1:return n.sent(),[2]}}))}))},n.prototype.disconnect=function(){return d(this,void 0,void 0,(function(){return f(this,(function(e){switch(e.label){case 0:return this._adapterInstance?[4,this._adapterInstance.disconnect()]:[2];case 1:return e.sent(),this._disconnected(),this.emit("disconnect"),[2]}}))}))},n.prototype.signTransaction=function(e){return d(this,void 0,void 0,(function(){return f(this,(function(n){switch(n.label){case 0:if(!this.connected)throw new Error("Wallet not connected");return[4,this._adapterInstance.signTransaction(e)];case 1:return[2,n.sent()]}}))}))},n.prototype.signAllTransactions=function(e){return d(this,void 0,void 0,(function(){return f(this,(function(n){switch(n.label){case 0:if(!this.connected)throw new Error("Wallet not connected");return[4,this._adapterInstance.signAllTransactions(e)];case 1:return[2,n.sent()]}}))}))},n.prototype.signMessage=function(e,n){return void 0===n&&(n="utf8"),d(this,void 0,void 0,(function(){return f(this,(function(t){switch(t.label){case 0:if(!this.connected)throw new Error("Wallet not connected");return[4,this._adapterInstance.signMessage(e,n)];case 1:return[2,t.sent()]}}))}))},n.prototype.sign=function(e,n){return void 0===n&&(n="utf8"),d(this,void 0,void 0,(function(){return f(this,(function(t){switch(t.label){case 0:return[4,this.signMessage(e,n)];case 1:return[2,t.sent()]}}))}))},n.prototype.detectWallet=function(e){return void 0===e&&(e=10),d(this,void 0,void 0,(function(){return f(this,(function(t){return[2,new Promise((function(t){var r=null;function o(e){!function(){window.removeEventListener("message",a,!1),r&&(document.body.removeChild(r),r=null);i&&(clearTimeout(i),i=null)}(),t(e)}var i=setTimeout((function(){o(!1)}),1e3*e);function a(e){var n,t,r;"solflareDetectorToAdapter"===(null===(n=e.data)||void 0===n?void 0:n.channel)&&o(!!(null===(r=null===(t=e.data)||void 0===t?void 0:t.data)||void 0===r?void 0:r.detected))}window.addEventListener("message",a,!1),(r=document.createElement("div")).className="solflare-wallet-detect-iframe",r.innerHTML="\n        <iframe src='".concat(n.DETECT_IFRAME_URL,"?timeout=").concat(e,"' style='position: fixed; top: -9999px; left: -9999px; width: 0; height: 0; pointer-events: none; border: none;'></iframe>\n      "),document.body.appendChild(r)}))]}))}))},n.IFRAME_URL="https://connect.solflare.com/",n.DETECT_IFRAME_URL="https://connect.solflare.com/detect",n}(e(c))})),t.register("kyNvc",(function(e,r){n(e.exports,"default",(()=>u),(e=>u=e));var o,i=t("jJfRI"),a=t("lMzs9"),c=(o=function(e,n){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])},o(e,n)},function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function t(){this.constructor=e}o(e,n),e.prototype=null===n?Object.create(n):(t.prototype=n.prototype,new t)}),s=function(e,n,t,r){return new(t||(t=Promise))((function(o,i){function a(e){try{s(r.next(e))}catch(e){i(e)}}function c(e){try{s(r.throw(e))}catch(e){i(e)}}function s(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,c)}s((r=r.apply(e,n||[])).next())}))},l=function(e,n){var t,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(t)throw new TypeError("Generator is already executing.");for(;a;)try{if(t=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=n.call(e,a)}catch(e){i=[6,e],r=0}finally{t=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}},u=function(e){function n(n,t,r){var o=e.call(this)||this;return o._instance=null,o.handleMessage=function(e){},o._handleConnect=function(){o.emit("connect")},o._handleDisconnect=function(){window.clearInterval(o._pollTimer),o.emit("disconnect")},o._network=t,o._provider=r,o}return c(n,e),Object.defineProperty(n.prototype,"publicKey",{get:function(){return this._instance.publicKey||null},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"connected",{get:function(){return this._instance.connected||!1},enumerable:!1,configurable:!0}),n.prototype.connect=function(){return s(this,void 0,void 0,(function(){var e=this;return l(this,(function(n){switch(n.label){case 0:return this._instance=new(0,a.default)(this._provider,this._network),this._instance.on("connect",this._handleConnect),this._instance.on("disconnect",this._handleDisconnect),this._pollTimer=window.setInterval((function(){var n,t;!1!==(null===(t=null===(n=e._instance)||void 0===n?void 0:n._popup)||void 0===t?void 0:t.closed)&&e._handleDisconnect()}),200),[4,this._instance.connect()];case 1:return n.sent(),[2]}}))}))},n.prototype.disconnect=function(){return s(this,void 0,void 0,(function(){return l(this,(function(e){switch(e.label){case 0:if(!this.connected)throw new Error("Wallet not connected");return this._instance.removeAllListeners("connect"),this._instance.removeAllListeners("disconnect"),[4,this._instance.disconnect()];case 1:return e.sent(),[2]}}))}))},n.prototype.signTransaction=function(e){return s(this,void 0,void 0,(function(){return l(this,(function(n){switch(n.label){case 0:if(!this.connected)throw new Error("Wallet not connected");return[4,this._instance.signTransaction(e)];case 1:return[2,n.sent()]}}))}))},n.prototype.signAllTransactions=function(e){return s(this,void 0,void 0,(function(){return l(this,(function(n){switch(n.label){case 0:if(!this.connected)throw new Error("Wallet not connected");return[4,this._instance.signAllTransactions(e)];case 1:return[2,n.sent()]}}))}))},n.prototype.signMessage=function(e,n){return void 0===n&&(n="hex"),s(this,void 0,void 0,(function(){var t;return l(this,(function(r){switch(r.label){case 0:if(!this.connected)throw new Error("Wallet not connected");return[4,this._instance.sign(e,n)];case 1:return t=r.sent().signature,[2,Uint8Array.from(t)]}}))}))},n}(i.default)})),t.register("jJfRI",(function(r,o){n(r.exports,"default",(()=>l),(e=>l=e));var i,a=t("3vRz3"),c=(i=function(e,n){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])},i(e,n)},function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function t(){this.constructor=e}i(e,n),e.prototype=null===n?Object.create(n):(t.prototype=n.prototype,new t)}),s=function(e){function n(){return null!==e&&e.apply(this,arguments)||this}return c(n,e),n}(e(a)),l=s})),t.register("lMzs9",(function(r,o){n(r.exports,"default",(()=>s));var i=t("3vRz3"),a=t("gNDby"),c=t("bYkMz");var s=class extends(e(i)){constructor(n,t){var r,o;if(super(),r=this,this._handleMessage=e=>{if(this._injectedProvider&&e.source===window||e.origin===this._providerUrl.origin&&e.source===this._popup)if("connected"===e.data.method){const n=new(0,a.PublicKey)(e.data.params.publicKey);this._publicKey&&this._publicKey.equals(n)||(this._publicKey&&!this._publicKey.equals(n)&&this._handleDisconnect(),this._publicKey=n,this._autoApprove=!!e.data.params.autoApprove,this.emit("connect",this._publicKey))}else if("disconnected"===e.data.method)this._handleDisconnect();else if((e.data.result||e.data.error)&&this._responsePromises.has(e.data.id)){const[n,t]=this._responsePromises.get(e.data.id);e.data.result?n(e.data.result):t(new Error(e.data.error))}},this._handleConnect=()=>(this._handlerAdded||(this._handlerAdded=!0,window.addEventListener("message",this._handleMessage),window.addEventListener("beforeunload",this.disconnect)),this._injectedProvider?new Promise((e=>{this._sendRequest("connect",{}),e()})):(window.name="parent",this._popup=window.open(this._providerUrl.toString(),"_blank","location,resizable,width=460,height=675"),new Promise((e=>{this.once("connect",e)})))),this._handleDisconnect=()=>{this._handlerAdded&&(this._handlerAdded=!1,window.removeEventListener("message",this._handleMessage),window.removeEventListener("beforeunload",this.disconnect)),this._publicKey&&(this._publicKey=null,this.emit("disconnect")),this._responsePromises.forEach((([e,n],t)=>{this._responsePromises.delete(t),n("Wallet disconnected")}))},this._sendRequest=async function(e,n){if("connect"!==e&&!r.connected)throw new Error("Wallet not connected");const t=r._nextRequestId;return++r._nextRequestId,new Promise(((o,i)=>{r._responsePromises.set(t,[o,i]),r._injectedProvider?r._injectedProvider.postMessage({jsonrpc:"2.0",id:t,method:e,params:{network:r._network,...n}}):(r._popup.postMessage({jsonrpc:"2.0",id:t,method:e,params:n},r._providerUrl.origin),r.autoApprove||r._popup.focus())}))},this.connect=()=>(this._popup&&this._popup.close(),this._handleConnect()),this.disconnect=async function(){r._injectedProvider&&await r._sendRequest("disconnect",{}),r._popup&&r._popup.close(),r._handleDisconnect()},this.sign=async function(n,t){if(!(n instanceof Uint8Array))throw new Error("Data must be an instance of Uint8Array");const o=await r._sendRequest("sign",{data:n,display:t});return{signature:e(c).decode(o.signature),publicKey:new(0,a.PublicKey)(o.publicKey)}},this.signTransaction=async function(n){const t=await r._sendRequest("signTransaction",{message:e(c).encode(n.serializeMessage())}),o=e(c).decode(t.signature),i=new(0,a.PublicKey)(t.publicKey);return n.addSignature(i,o),n},this.signAllTransactions=async function(n){const t=await r._sendRequest("signAllTransactions",{messages:n.map((n=>e(c).encode(n.serializeMessage())))}),o=t.signatures.map((n=>e(c).decode(n))),i=new(0,a.PublicKey)(t.publicKey);return n=n.map(((e,n)=>(e.addSignature(i,o[n]),e)))},function(e){return"object"==typeof e&&null!==e}(o=n)&&function(e){return"function"==typeof e}(o.postMessage))this._injectedProvider=n;else{if(!function(e){return"string"==typeof e}(n))throw new Error("provider parameter must be an injected provider or a URL string.");this._providerUrl=new URL(n),this._providerUrl.hash=new URLSearchParams({origin:window.location.origin,network:t}).toString()}this._network=t,this._publicKey=null,this._autoApprove=!1,this._popup=null,this._handlerAdded=!1,this._nextRequestId=1,this._responsePromises=new Map}get publicKey(){return this._publicKey}get connected(){return null!==this._publicKey}get autoApprove(){return this._autoApprove}}})),t.register("5GDeN",(function(r,o){n(r.exports,"default",(()=>h),(e=>h=e));var i,a=t("gNDby"),c=t("jJfRI"),s=t("4Xk08"),l=t("bYkMz"),u=(i=function(e,n){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])},i(e,n)},function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function t(){this.constructor=e}i(e,n),e.prototype=null===n?Object.create(n):(t.prototype=n.prototype,new t)}),d=function(){return d=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var o in n=arguments[t])Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o]);return e},d.apply(this,arguments)},f=function(e,n,t,r){return new(t||(t=Promise))((function(o,i){function a(e){try{s(r.next(e))}catch(e){i(e)}}function c(e){try{s(r.throw(e))}catch(e){i(e)}}function s(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,c)}s((r=r.apply(e,n||[])).next())}))},p=function(e,n){var t,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(t)throw new TypeError("Generator is already executing.");for(;a;)try{if(t=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=n.call(e,a)}catch(e){i=[6,e],r=0}finally{t=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}},h=function(n){function t(e,t){var r,o=this;return(o=n.call(this)||this)._publicKey=null,o._messageHandlers={},o.handleMessage=function(e){if(o._messageHandlers[e.id]){var n=o._messageHandlers[e.id],t=n.resolve,r=n.reject;delete o._messageHandlers[e.id],e.error?r(e.error):t(e.result)}},o._sendMessage=function(e){if(!o.connected)throw new Error("Wallet not connected");return new Promise((function(n,t){var r,i,a=(0,s.v4)();o._messageHandlers[a]={resolve:n,reject:t},null===(i=null===(r=o._iframe)||void 0===r?void 0:r.contentWindow)||void 0===i||i.postMessage({channel:"solflareWalletAdapterToIframe",data:d({id:a},e)},"*")}))},o._iframe=e,o._publicKey=new(0,a.PublicKey)(null===(r=null==t?void 0:t.toString)||void 0===r?void 0:r.call(t)),o}return u(t,n),Object.defineProperty(t.prototype,"publicKey",{get:function(){return this._publicKey||null},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"connected",{get:function(){return!0},enumerable:!1,configurable:!0}),t.prototype.connect=function(){return f(this,void 0,void 0,(function(){return p(this,(function(e){return[2]}))}))},t.prototype.disconnect=function(){return f(this,void 0,void 0,(function(){return p(this,(function(e){switch(e.label){case 0:return[4,this._sendMessage({method:"disconnect"})];case 1:return e.sent(),[2]}}))}))},t.prototype.signTransaction=function(n){return f(this,void 0,void 0,(function(){var t,r,o,i;return p(this,(function(c){switch(c.label){case 0:if(!this.connected)throw new Error("Wallet not connected");c.label=1;case 1:return c.trys.push([1,3,,4]),[4,this._sendMessage({method:"signTransaction",params:{message:e(l).encode(n.serializeMessage())}})];case 2:return t=c.sent(),r=t.publicKey,o=t.signature,n.addSignature(new(0,a.PublicKey)(r),e(l).decode(o)),[2,n];case 3:throw i=c.sent(),console.log(i),new Error("Failed to sign transaction");case 4:return[2]}}))}))},t.prototype.signAllTransactions=function(n){return f(this,void 0,void 0,(function(){var t,r,o,i;return p(this,(function(c){switch(c.label){case 0:if(!this.connected)throw new Error("Wallet not connected");c.label=1;case 1:return c.trys.push([1,3,,4]),[4,this._sendMessage({method:"signAllTransactions",params:{messages:n.map((function(n){return e(l).encode(n.serializeMessage())}))}})];case 2:return t=c.sent(),r=t.publicKey,o=t.signatures,[2,n.map((function(n,t){return n.addSignature(new(0,a.PublicKey)(r),e(l).decode(o[t])),n}))];case 3:throw i=c.sent(),console.log(i),new Error("Failed to sign transactions");case 4:return[2]}}))}))},t.prototype.signMessage=function(n,t){return void 0===t&&(t="hex"),f(this,void 0,void 0,(function(){var r,o;return p(this,(function(i){switch(i.label){case 0:if(!this.connected)throw new Error("Wallet not connected");i.label=1;case 1:return i.trys.push([1,3,,4]),[4,this._sendMessage({method:"signMessage",params:{data:n,display:t}})];case 2:return r=i.sent(),[2,Uint8Array.from(e(l).decode(r))];case 3:throw o=i.sent(),console.log(o),new Error("Failed to sign message");case 4:return[2]}}))}))},t}(c.default)}));
//# sourceMappingURL=esm.90aed9b4.js.map
