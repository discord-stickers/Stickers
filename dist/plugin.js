(function(e,r,t){"use strict";const s=e.findByProps("getStickerSendability"),o=e.findByProps("isSendableSticker"),{getStickerAssetUrl:i}=e.findByProps("getStickerAssetUrl"),{ComponentDispatch:c}=e.findByProps("ComponentDispatch"),{closeExpressionPicker:n}=e.findByProps("closeExpressionPicker"),{getCurrentUser:d}=e.findByProps("getCurrentUser"),{input:a,disabled:u}=e.findByProps("disabled","tagLabel"),{stickerUnsendable:l}=e.findByProps("stickerUnsendable"),{stickerAsset:p}=e.findByProps("stickerAsset"),S=[];return{onLoad(){if(2==d().premiumType)return r.showToast({title:"Users with Nitro cannot use FreeStickers.",duration:5e3});S.push(t.injectCSS(`.${l} {\n            webkit-filter: grayscale(0%) !important;\n            filter: grayscale(0%) !important;\n        }`)),S.push(t.before("getStickerSendability",s,(([e])=>{if(document.querySelector(`.${p}:hover`))return 3==e.format_type||e?.sort_value?n():(n(),c.dispatchToLastSubscribed("INSERT_TEXT",{content:` ${i(e).replace(/=[0-9]{3}/g,"=160")}`}))}))),S.push(t.after("isSendableSticker",o,(()=>{(document.querySelector(`.${a}`)||document.querySelector(`.${u}`))&&(document.querySelector(`.${a}`)?.removeAttribute("disabled"),document.querySelector(`.${a}`).placeholder="Search for stickers",document.querySelector(`.${u}`)?.classList.remove(u))})))},onUnload(){S.forEach((e=>{e()}))}}})(cumcord.modules.webpackModules,cumcord.ui.toasts,cumcord.patcher);