import {ParleyBase, ParleyViewBase} from "./parley.common";
import {ParleyListener, ParleySslPinningListener} from "./parley";

import * as app from "tns-core-modules/application";

import ParleyNative = com.webuildapps.parleylib.Parley;
import ParleyNativeListener = com.webuildapps.parleylib.Parley.ParleyListener;
import ParleyNativeSslPinningListener = com.webuildapps.parleylib.Parley.ParleySslPinningListener;

import FrameLayout = android.widget.FrameLayout;
import LayoutParams = android.widget.FrameLayout.LayoutParams;
import View = android.view.View;
import FragmentManager = android.support.v4.app.FragmentManager;
import FragmentTransaction = android.support.v4.app.FragmentTransaction;
import Fragment = android.support.v4.app.Fragment;
import ChatFragment = com.webuildapps.parleylib.ui.fragment.ChatFragment;

export class Parley extends ParleyBase {

    private static instance: Parley;

    static getInstance(): Parley {
        if (!Parley.instance) {
            Parley.instance = new Parley();
        }

        return Parley.instance;
    }

    static init(listener: ParleyListener, appSecret: string): void {
        Parley.getInstance().setListener(listener);

        console.log("ParleyAndroid.init", listener, appSecret);

        ParleyNative.init(app.android.context, parleyNativeListener, appSecret, true);
        ParleyNative.getInstance().setToolbarEnabled(new java.lang.Boolean(false));
    }

    setBaseUrl(baseUrl: string): void {
        ParleyNative.getInstance().setBaseUrl(baseUrl);
    }

    setBasePath(basePath: string): void {
        ParleyNative.getInstance().setBasePath(basePath);
    }

    addHttpHeader(name: string, value: string): void {
        ParleyNative.getInstance().addHttpHeader(name, value);
    }

    removeHttpHeader(name: string): void {
        ParleyNative.getInstance().removeHttpHeader(name);
    }

    enableSslPinning(listener: ParleySslPinningListener, publicKeyOne: string, publicKeyTwo: string): void {
        // Values not needed for Android, those are defined in the xml, which is referred to via the manifest.
        // Thus: ignoring the key values
        Parley.getInstance().setSslPinningListener(listener);
        ParleyNative.getInstance().enableSslPinning(app.android.context, parleyNativeSslPinningListener, null); // The xml will be taken from the manifest
    }

    configure(): void {
        if (Parley.getInstance().getSslPinningListener()  != undefined) {
            ParleyNative.getInstance().configure(app.android.context);
        }
    }

    registerDevice(): void {
        ParleyNative.getInstance().registerDevice(this.deviceToken);
    }

    registerUser(userAuthorization: string): void {
        ParleyNative.getInstance().registerUser(userAuthorization, null);
    }

    deregisterUser(): void {
        ParleyNative.getInstance().unRegisterUser(this.deviceToken);
    }

    handlePushMessage(pushMessage: any): void {
        let pushMessageMap: java.util.Map<String, String> = new java.util.HashMap<String, String>();
        for (let key in pushMessage) {
            if (pushMessage.hasOwnProperty(key)) {
                pushMessageMap.put(key, pushMessage[key]);
            }
        }

        ParleyNative.getInstance().handlePushMessageSilent(pushMessageMap);
    }
}

export class ParleyView extends ParleyViewBase {

    public layoutId: number;

    createNativeView(): Object {
        this.layoutId = View.generateViewId();

        const nativeView: FrameLayout = new FrameLayout(this._context);
        nativeView.setId(this.layoutId);
        nativeView.setLayoutParams(new LayoutParams(
            LayoutParams.MATCH_PARENT,
            LayoutParams.MATCH_PARENT
        ));

        return nativeView;
    }

    showChat(): void {
        let fragmentManager: FragmentManager = this._context.getSupportFragmentManager();
        let fragmentTransaction: FragmentTransaction = fragmentManager.beginTransaction();
        fragmentTransaction.replace(this.layoutId, new ChatFragment() as Fragment)
            .commit();
    }
}

let parleyNativeListener = new ParleyNativeListener({

    onConfigureSuccess(): void  {
        // console.log("onConfigureSuccess");

        if (Parley.getInstance().getListener()) {
            Parley.getInstance().getListener().onConfigureSuccess();
        }
    },

    onConfigureFailed(param0: any, param1: any): void  {
        // console.log("onConfigureFailed");

        if (Parley.getInstance().getListener()) {
            Parley.getInstance().getListener().onConfigureFailed();
        }
    },

    onDeviceRegistrationSuccess(): void  {
        // console.log("onDeviceRegistrationSuccess");

        if (Parley.getInstance().getListener()) {
            Parley.getInstance().getListener().onDeviceRegistrationSuccess();
        }
    },

    onDeviceRegistrationFailed(param0: any): void  {
        // console.log("onDeviceRegistrationFailed");

        if (Parley.getInstance().getListener()) {
            Parley.getInstance().getListener().onDeviceRegistrationFailed();
        }
    },

    onUserUnauthorized(): void  {
        // console.log("onUserUnauthorized");

        if (Parley.getInstance().getListener()) {
            Parley.getInstance().getListener().onUserUnauthorized();
        }
    },

    onChatMessageSend(): void  {
        // console.log("onChatMessageSend");

        if (Parley.getInstance().getListener()) {
            Parley.getInstance().getListener().onChatMessageSend();
        }
    },

    onRequestFailed(param0: any, param1: any): void  {
        // console.log("onRequestFailed");
        // Note: Not available on iOS
    },
});

let parleyNativeSslPinningListener = new ParleyNativeSslPinningListener( {

    onEnableSslPinningSuccess(): void {
        // console.log("onEnableSslPinningSuccess");

        if (Parley.getInstance().getSslPinningListener()) {
            Parley.getInstance().getSslPinningListener().onEnableSslPinningSuccess();
        }

        Parley.getInstance().configure();
    },

    onEnableSslPinningFailed(message: string): void {
        // console.log("onEnableSslPinningFailed");

        if (Parley.getInstance().getSslPinningListener()) {
            Parley.getInstance().getSslPinningListener().onEnableSslPinningFailed(message);
        }
    }
});