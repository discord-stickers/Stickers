import { findByProps } from "@cumcord/modules/webpack";
import { showToast } from "@cumcord/ui/toasts";
import { before, after, injectCSS } from "@cumcord/patcher";

// yeah
const getStickerSendability = findByProps("getStickerSendability"),
    isSendableSticker = findByProps("isSendableSticker"),
    { getStickerAssetUrl } = findByProps("getStickerAssetUrl"),
    { ComponentDispatch } = findByProps("ComponentDispatch"),
    { closeExpressionPicker } = findByProps("closeExpressionPicker"),
    { getCurrentUser } = findByProps("getCurrentUser"),
    { input, disabled } = findByProps("disabled", "tagLabel"),
    { stickerUnsendable } = findByProps("stickerUnsendable"),
    { stickerAsset } = findByProps("stickerAsset"),
    unpatch = [];

export default {
    onLoad() {
        if (getCurrentUser().premiumType == 2) return showToast({
            "title": "Users with Nitro cannot use FreeStickers.",
            "duration": 5000
        });

        // inject CSS to remove grayscale
        unpatch.push(injectCSS(`.${stickerUnsendable} {
            webkit-filter: grayscale(0%) !important;
            filter: grayscale(0%) !important;
        }`));

        // patch getStickerSendability to send sticker url
        unpatch.push(before("getStickerSendability", getStickerSendability, ([args]) => {
            // first 2 checks are to fix bugs and 3rd check is to prevent official discord stickers from not working 'cause copyright
            if (document.activeElement.className == input) return document.querySelector(`.${input}`).blur();
            if (!document.querySelector(`.${stickerAsset}:hover`)) return;
            if (args.format_type == 3 || args?.sort_value) return closeExpressionPicker();
            closeExpressionPicker();
            return ComponentDispatch.dispatchToLastSubscribed("INSERT_TEXT", {
                content: ` ${getStickerAssetUrl(args).replace(/=[0-9]{3}/g, "=160")}`
            });
        }));
        
        // patch isSendableSticker to make search work
        unpatch.push(after("isSendableSticker", isSendableSticker, () => {
            if (!document.querySelector(`.${input}`) && !document.querySelector(`.${disabled}`)) return;
            document.querySelector(`.${input}`)?.removeAttribute("disabled");
            document.querySelector(`.${input}`).placeholder = "Search for stickers";
            document.querySelector(`.${disabled}`)?.classList.remove(disabled);
        }));
    },
    onUnload() {
        // unpatch
        unpatch.forEach(patch => {
            patch();
        });
    }
};