import { findByProps, find } from "@cumcord/modules/webpack";
import { showToast } from "@cumcord/ui/toasts";
import { before, instead, injectCSS } from "@cumcord/patcher";

// yeah
const { getCurrentUser } = findByProps("getCurrentUser"),
    { input, disabled } = findByProps("disabled", "tagLabel"),
    { stickerUnsendable } = findByProps("stickerUnsendable"),
    { ComponentDispatch } = findByProps("ComponentDispatch"),
    { closeExpressionPicker } = findByProps("closeExpressionPicker"),
    sticker = find((m) => m?.default?.displayName === "Sticker"),
    unpatch = [];

export default (data) => {
    return {
        onLoad() {
            if (getCurrentUser().premiumType == 2) return showToast({
                "title": "Users with Nitro cannot use FreeStickers.",
                "duration": 5000
            });

            // if (window["DiscordNative"]) {
            //     unpatch.push(instead("handleConnection", findByProps("handleConnection").__proto__, (args, orig) => {
            //         let ws = args[0]
            //         if ((ws.upgradeReq()).url == "/discord-stickers") {
            //             ws.on("message", (msg) => {
            //                 const info = JSON.parse(msg)
            //                 switch (info.message) {
            //                     case "INSTALL_PACK":
            //                         const packName = Object.keys(info.pack)[0],
            //                             stickers = info.pack[packName].stickers;
            //                         data.persist.store.packs[packName] = stickers;

            //                         console.log(packName, stickers, data.persist.store.packs)
            //                         ws.send(JSON.stringify({
            //                             "message": "SUCCESS"
            //                         }))
            //                         ws.close();
            //                         break;
            //                 }
            //             });
            //         } else {
            //             return orig(...args);
            //         }
            //     }))
            // }

            // inject CSS to remove grayscale
            unpatch.push(injectCSS(`.${stickerUnsendable} {
                webkit-filter: grayscale(0%) !important;
                filter: grayscale(0%) !important;
            }`));

            // patch Sticker component to send sticker url & fix search (in a hacky way)
            unpatch.push(before("default", sticker, ([args]) => {
                if (args?.sticker?.id && document.querySelector(`img[src*='${args?.sticker?.id}']`)) {
                    let img = document.querySelector(`img[src*='${args?.sticker?.id}']`);

                    document.querySelector(`.${input}`)?.removeAttribute("disabled");
                    document.querySelector(`.${input}`).placeholder = "Search for stickers";
                    document.querySelector(`.${disabled}`)?.classList.remove(disabled);
                    

                    img.onclick = () => {
                        closeExpressionPicker();
                        return ComponentDispatch.dispatchToLastSubscribed("INSERT_TEXT", {
                            content: ` ${img.src.replace(/=[0-9]{2}/g, "=160")}`
                        });
                    }
                }
            }));
        },
        onUnload() {
            // unpatch
            unpatch.forEach(patch => {
                patch();
            });
        }
    }
};