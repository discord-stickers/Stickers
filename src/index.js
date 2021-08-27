import { webpackModules } from "@cumcord/modules";
import { patcher } from "@cumcord";

// yeah
const getStickerSendability = webpackModules.findByProps("getStickerSendability"),
    { getStickerAssetUrl } = webpackModules.findByProps("getStickerAssetUrl"),
    { ComponentDispatch } = webpackModules.findByProps("ComponentDispatch"),
    { closeExpressionPicker } =  webpackModules.findByProps("closeExpressionPicker");

let pSendability,
    injectedCSS;

export default {
    onLoad() {
        // patch pSendability to send sticker url and inject CSS to remove grayscale
        pSendability = patcher.before("getStickerSendability", getStickerSendability, ([args]) => {
            if (document.querySelector(".drawerSizingWrapper-17Mss4")) {
                if (args.format_type == 1 || args.format_type == 2) {
                    closeExpressionPicker();
                    return ComponentDispatch.dispatchToLastSubscribed("INSERT_TEXT", {
                        content: " " + getStickerAssetUrl(args)
                    });
                }
            }
        });
        injectedCSS = patcher.injectCSS(`.stickerUnsendable-2q_h2B{webkit-filter: grayscale(0%) !important;filter: grayscale(0%) !important;}`);
    },
    onUnload() {
        // unpatch
        pSendability();
        injectedCSS();
    }
};