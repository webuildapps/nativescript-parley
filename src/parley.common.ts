import {Parley, ParleyListener, ParleySslPinningListener} from "./parley";
import {View} from "tns-core-modules/ui/core/view";

export abstract class ParleyBase implements Parley {

    public static DEFAULT_BASE_URL = 'https://www.irischat.com';

    protected deviceToken: string;
    protected offlineMessagingEnabled = false;
    protected notificationTarget: string;

    private listener: ParleyListener;
    private sslPinningListener: ParleySslPinningListener;

    setOfflineMessagingEnabled(offlineMessagingEnabled: boolean): void {
        this.offlineMessagingEnabled = offlineMessagingEnabled;
    }

    setDeviceToken(deviceToken: string): void {
        let formattedDeviceToken = deviceToken.replace(/[<> ]?/g, "");
        this.deviceToken = formattedDeviceToken;
    }

    abstract setBaseUrl(baseUrl: string): void;

    abstract setBasePath(basePath: string): void;

    abstract addHttpHeader(name: string, value: string): void;

    abstract removeHttpHeader(name: string);

    abstract enableSslPinning(listener: ParleySslPinningListener, publicKeyOne: string, publicKeyTwo: string): void;

    abstract configure(): void;

    abstract registerDevice(): void;

    abstract registerUser(userAuthorization: string): void;

    abstract deregisterUser(): void;

    abstract handlePushMessage(pushMessage: any): void;

    setNotificationTarget(notificationTarget: string): void {
        this.notificationTarget = notificationTarget;
    }

    setListener(listener: ParleyListener): void {
        this.listener = listener;
    }

    getListener(): ParleyListener {
        return this.listener;
    }

    setSslPinningListener(listener: ParleySslPinningListener): void {
        this.sslPinningListener = listener;
    }

    getSslPinningListener(): ParleySslPinningListener {
        return this.sslPinningListener;
    }
}

export class ParleyViewBase extends View {

    //
}