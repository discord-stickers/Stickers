(function(e,t,r){"use strict";const s=e.findByProps("getStickerSendability"),{getStickerAssetUrl:i}=e.findByProps("getStickerAssetUrl"),{ComponentDispatch:o}=e.findByProps("ComponentDispatch"),{closeExpressionPicker:n}=e.findByProps("closeExpressionPicker"),{getCurrentUser:c}=e.findByProps("getCurrentUser"),{stickerUnsendable:a}=e.findByProps("stickerUnsendable"),{stickerAsset:p}=e.findByProps("stickerAsset"),d=[];return{onLoad(){if(2==c().premiumType)return t.showToast({title:"Users with Nitro cannot use FreeStickers.",duration:5e3});d.push(r.patcher.before("getStickerSendability",s,(([e])=>{if(document.querySelector(`.${p}:hover`)&&3!=e.format_type)return n(),o.dispatchToLastSubscribed("INSERT_TEXT",{content:" "+i(e).replace(/=[0-9]{3}/g,"=160")})}))),d.push(r.patcher.injectCSS(`.${a}{webkit-filter: grayscale(0%) !important;filter: grayscale(0%) !important;}`))},onUnload(){d.forEach((e=>{e()}))}}})(cumcord.modules.webpackModules,cumcord.ui.toasts,cumcord);