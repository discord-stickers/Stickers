(function(){"use strict";const e={modules:window.cumcord.modules,patcher:window.cumcord.patcher},t=e.modules,r=e.patcher,o=t.webpackModules;t.commonModules;const i=o.findByProps("getStickerSendability"),{getStickerAssetUrl:s}=o.findByProps("getStickerAssetUrl"),{ComponentDispatch:n}=o.findByProps("ComponentDispatch"),{closeExpressionPicker:c}=o.findByProps("closeExpressionPicker");let a,d;return{onLoad(){a=r.before("getStickerSendability",i,(([e])=>{if(document.querySelector(".drawerSizingWrapper-17Mss4")&&(1==e.format_type||2==e.format_type))return c(),n.dispatchToLastSubscribed("INSERT_TEXT",{content:" "+s(e)})})),d=r.injectCSS(".stickerUnsendable-2q_h2B{webkit-filter: grayscale(0%) !important;filter: grayscale(0%) !important;}")},onUnload(){a(),d()}}})();