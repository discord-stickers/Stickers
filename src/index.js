import { findByProps } from "@cumcord/modules/webpackModules";
import { showToast } from "@cumcord/ui/toasts";
import { patcher } from "@cumcord";

// yeah
const getStickerSendability = findByProps("getStickerSendability"),
    { getStickerAssetUrl } = findByProps("getStickerAssetUrl"),
    { ComponentDispatch } = findByProps("ComponentDispatch"),
    { closeExpressionPicker } = findByProps("closeExpressionPicker"),
    { getCurrentUser } = findByProps("getCurrentUser"),
    unpatch = [];

export default {
    onLoad() {
        if (getCurrentUser().premiumType == 2) return showToast({"title": "Users with Nitro cannot use FreeStickers.", "duration": 5000})

        // patch getStickerSendability to send sticker url and inject CSS to remove grayscale
        unpatch.push(patcher.before("getStickerSendability", getStickerSendability, ([args]) => {
            if (document.querySelector(".drawerSizingWrapper-17Mss4")) {
                if (args.format_type == 1 || args.format_type == 2) {
                    closeExpressionPicker();
                    return ComponentDispatch.dispatchToLastSubscribed("INSERT_TEXT", {
                        content: " " + getStickerAssetUrl(args).replace(/=[0-9]{3}/g, "=160")
                    });
                }
            }
        }));
        unpatch.push(patcher.injectCSS(`.stickerUnsendable-2q_h2B{webkit-filter: grayscale(0%) !important;filter: grayscale(0%) !important;}`));
    },
    onUnload() {
        // unpatch
        unpatch.forEach(patch => {
            patch()
        })
    }
};