import {View} from "tns-core-modules/ui/core/view";

export declare class Parley {

    static getInstance(): Parley;

    static init(parleyListener: ParleyListener, appSecret: string): void;

    setBaseUrl(baseUrl: string): void;
    setBasePath(basePath: string): void;
    addHttpHeader(name: string, value: string): void;
    removeHttpHeader(name: string): void;
    enableSslPinning(listener: ParleySslPinningListener, publicKeyOne: string, publicKeyTwo: string): void;
    setDeviceToken(deviceToken: string): void;
    configure(): void;

    registerDevice(): void;
    registerUser(userAuthorization: string): void;
    deregisterUser(): void;
    setNotificationTarget(notificationTarget: string): void;
    handlePushMessage(pushMessage: any): void;
}

export declare interface ParleyListener {

    onConfigureSuccess(): void;
    onConfigureFailed(): void;

    onDeviceRegistrationSuccess(): void;
    onDeviceRegistrationFailed(): void;

    onUserUnauthorized(): void;

    onChatMessageSend(): void;
}

export declare interface ParleySslPinningListener {

    onEnableSslPinningSuccess(): void;
    onEnableSslPinningFailed(message: string): void;
}


export declare class ParleyView extends View {

    showChat(): void;
}