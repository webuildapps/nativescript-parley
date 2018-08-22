import {ParleyBase, ParleyViewBase} from "./parley.common";
import {ParleyListener, ParleySslPinningListener} from "./parley";
import {topmost} from "tns-core-modules/ui/frame";

export class Parley extends ParleyBase {

    private static instance: Parley;
    private sslPinningPublicKeyOne: string;
    private sslPinningPublicKeyTwo: string;
    private appSecret: string;

    static getInstance(): Parley {
        if (!Parley.instance) {
            Parley.instance = new Parley();
        }

        return Parley.instance;
    }

    static init(listener: ParleyListener, appSecret: string): void {
        Parley.getInstance().appSecret = appSecret;
        Parley.getInstance().setListener(listener);
    }

    enableSslPinning(listener: ParleySslPinningListener, publicKeyOne: string, publicKeyTwo: string): void {
        this.setSslPinningListener(listener);
        this.sslPinningPublicKeyOne = publicKeyOne;
        this.sslPinningPublicKeyTwo = publicKeyTwo;
    }

    configure(): void {
        IrisChatLib.sharedInstance().toolbarEnabled = false;

        if (this.sslPinningPublicKeyOne && this.sslPinningPublicKeyTwo) {
            IrisChatLib.initIrisChatLibraryWithSecretAndBaseUrlAndSslPinningKeyOneAndSslPinningKeyTwoAndSsLPinningErrorMessage(
                this.appSecret,
                this.baseUrl,
                this.sslPinningPublicKeyOne,
                this.sslPinningPublicKeyTwo,
                "Unsafe connection detected, the chat will be closed."
            );
        } else {
            // Also support not providing baseurl and pinning
            IrisChatLib.initIrisChatLibraryWithSecret(this.appSecret);
        }
    }

    registerDevice(): void {
        IrisChatLib.sharedInstance().applicationDidRegisterForRemoteNotificationsWithDeviceToken(this.deviceToken);

        this.getListener().onDeviceRegistrationSuccess();
    }

    registerUser(userAuthorization: string): void {
        IrisChatLib.sharedInstance().registerUserAdditionalInformation(userAuthorization, null);
    }

    deregisterUser(): void {
        IrisChatLib.sharedInstance().deregisterUser();
    }

    handlePushMessage(pushMessage: any): void {
        IrisChatLib.sharedInstance().applicationDidReceiveRemoteNotification(pushMessage);
    }
}

export class ParleyView extends ParleyViewBase {

    public nativeView: UIView;

    createNativeView(): Object {
        this.nativeView = UIView.new();
        this.nativeView.clipsToBounds = true;

        IrisChatLib.sharedInstance().delegate = new ParleyLibDelegate();

        return this.nativeView;
    }

    showChat(): void {
        let navigationViewController = ICChatViewController.new();
        navigationViewController.view.frame = this.nativeView.frame;

        let parentViewController = this.page.viewController;

        parentViewController.addChildViewController(navigationViewController);
        this.nativeView.addSubview(navigationViewController.view);
        navigationViewController.didMoveToParentViewController(parentViewController);
    }
}

class ParleyLibDelegate extends UIResponder implements IrisChatLibDelegate {

    public static ObjCProtocols = [IrisChatLibDelegate];

    irisChatLibDidRetrieveConfiguration(): void {
        // console.log("irisChatLibDidRetrieveConfiguration");

        if (Parley.getInstance().getSslPinningListener()) {
            Parley.getInstance().getSslPinningListener().onEnableSslPinningSuccess();
        }

        IrisChatLib.sharedInstance().prepareIrisChat();
    }

    irisChatLibDidStart(irisChatLib: IrisChatLib): void {
        // console.log("irisChatLibDidStart");

        if (Parley.getInstance().getListener()) {
            Parley.getInstance().getListener().onConfigureSuccess();
        }
    }

    irisChatLibFailedToStartWithError(irisChatLib: IrisChatLib, error: NSError): void {
        // console.log("irisChatLibFailedToStartWithError");

        if (Parley.getInstance().getListener()) {
            Parley.getInstance().getListener().onConfigureFailed();
        }
    }

    irisChatLibFailedToSubscribeDeviceWithError(irisChatLib: IrisChatLib, error: NSError): void {
        // console.log("irisChatLibFailedToSubscribeDeviceWithError");

        if (Parley.getInstance().getListener()) {
            Parley.getInstance().getListener().onDeviceRegistrationFailed();
        }
    }

    irisChatLibFailedToVerifySSLPin(irisChatLib: IrisChatLib, error: NSError): void {
        // console.log("irisChatLibFailedToVerifySSLPin");

        if (Parley.getInstance().getSslPinningListener()) {
            Parley.getInstance().getSslPinningListener().onEnableSslPinningFailed(error.description);
        }
    }

    userDidSentMessage(): void {
        // console.log("userDidSentMessage");

        if (Parley.getInstance().getListener()) {
            Parley.getInstance().getListener().onChatMessageSend();
        }
    }

    userIsNotAuthorized(): void {
        // console.log("userIsNotAuthorized");

        if (Parley.getInstance().getListener()) {
            Parley.getInstance().getListener().onUserUnauthorized();
        }
    }
}