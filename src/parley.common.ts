import {Parley, ParleyListener, ParleySslPinningListener} from "./parley";
import {View} from "tns-core-modules/ui/core/view";

export abstract class ParleyBase implements Parley {

    public static DEFAULT_BASE_URL = 'https://www.irischat.com';

    protected deviceToken: string;
    protected baseUrl = ParleyBase.DEFAULT_BASE_URL;
    protected basePath = '/clientApi/v1.1/';
    protected offlineMessagingEnabled = false;

    private listener: ParleyListener;
    private sslPinningListener: ParleySslPinningListener;

    setBaseUrl(baseUrl: string): void {
        this.baseUrl = baseUrl;
    }

    setBasePath(basePath: string): void {
        this.basePath = basePath;
    }

    setOfflineMessagingEnabled(offlineMessagingEnabled: boolean): void {
        this.offlineMessagingEnabled = offlineMessagingEnabled;
    }

    setDeviceToken(deviceToken: string): void {
        let formattedDeviceToken = deviceToken.replace(/[<> ]?/g, "");
        this.deviceToken = formattedDeviceToken;
    }

    abstract addHttpHeader(name: string, value: string): void;

    abstract removeHttpHeader(name: string);

    abstract enableSslPinning(listener: ParleySslPinningListener, publicKeyOne: string, publicKeyTwo: string): void;

    abstract configure(): void;

    abstract registerDevice(): void;

    abstract registerUser(userAuthorization: string): void;

    abstract deregisterUser(): void;

    abstract handlePushMessage(pushMessage: any): void;

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