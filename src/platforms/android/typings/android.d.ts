declare module com {
    export module webuildapps {
        export module parleylib {
            export module ui {
                export module fragment {
                    export class ChatFragment extends android.support.v4.app.Fragment { }
                }
            }
        }
    }
}

declare module com {
    export module webuildapps {
        export module parleylib {
            export class Parley {
                public constructor();
                public static getInstance(): com.webuildapps.parleylib.Parley;
                public static init(param0: android.content.Context, param1: com.webuildapps.parleylib.Parley.ParleyListener, param2: string, param3: boolean): void;
                public enableSslPinning(param0: android.content.Context, param1: com.webuildapps.parleylib.Parley.ParleySslPinningListener, param2: any): void;
                public configure(param0: android.content.Context): void;
                public registerDevice(param0: string): void;
                public registerUser(param0: string, param1: java.util.Map<String, String>): void;
                public unRegisterUser(param0: string): void;
                public handlePushMessageSilent(param0: java.util.Map<String, String>): void;
                public setToolbarEnabled(param0: java.lang.Boolean): void;
                public addHttpHeader(name: string, value: string): void;
                public removeHttpHeader(name: string): void;
            }
            export module Parley {
                export class ParleyListener {
                    public constructor(implementation: {
                        onConfigureSuccess(): void;
                        onConfigureFailed(param0: any, param1: any): void;
                        onDeviceRegistrationSuccess(): void;
                        onDeviceRegistrationFailed(param0: any): void;
                        onUserUnauthorized(): void;
                        onChatMessageSend(): void;
                        onRequestFailed(param0: any, param1: any): void;
                    });
                    public onDeviceRegistrationSuccess(): void;
                    public onConfigureSuccess(): void;
                    public onChatMessageSend(): void;
                    public onUserUnauthorized(): void;
                    public onConfigureFailed(param0: any, param1: any): void;
                    public onDeviceRegistrationFailed(param0: any): void;
                    public onRequestFailed(param0: any, param1: any): void;
                }
                export class ParleySslPinningListener {
                    public constructor(implementation: {
                        onEnableSslPinningSuccess(): void;
                        onEnableSslPinningFailed(message: string): void;
                    });
                    public onEnableSslPinningSuccess(): void;
                    public onEnableSslPinningFailed(message: string ): void;
                }
            }
        }
    }
}