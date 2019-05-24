import {ParleyBase, ParleyViewBase} from "./parley.common";
import {ParleyListener, ParleySslPinningListener} from "./parley";

export class Parley extends ParleyBase {

    private static instance: Parley;
    private appSecret: string;
    private baseUrl: string;
    private sslPinningPublicKeyOne: string;
    private sslPinningPublicKeyTwo: string;
    private httpHeaders = NSMutableDictionary.dictionary();

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

    setBaseUrl(baseUrl: string): void {
        this.baseUrl = baseUrl;
        IrisChatLib.sharedInstance().setBaseUrl(this.baseUrl);
    }

    setBasePath(basePath: string): void {
        IrisChatLib.sharedInstance().setBasePath(basePath);
    }

    addHttpHeader(name: string, value: string): void {
        this.httpHeaders.setValueForKey(value, name);
        IrisChatLib.sharedInstance().setHttpHeaders(this.httpHeaders);
    }

    removeHttpHeader(name: string): void {
        this.httpHeaders.removeObjectForKey(name);
        IrisChatLib.sharedInstance().setHttpHeaders(this.httpHeaders);
    }

    enableSslPinning(listener: ParleySslPinningListener, publicKeyOne: string, publicKeyTwo: string): void {
        this.setSslPinningListener(listener);
        this.sslPinningPublicKeyOne = publicKeyOne;
        this.sslPinningPublicKeyTwo = publicKeyTwo;
    }

    configure(): void {
        IrisChatLib.sharedInstance().toolbarEnabled = false;

        if (this.sslPinningPublicKeyOne && this.sslPinningPublicKeyTwo) {
            IrisChatLib.initIrisChatLibraryWithSecretAndBaseUrlAndSslPinningKeyOneAndSslPinningKeyTwoAndSsLPinningErrorMessageAndHttpHeaders(
                this.appSecret,
                this.baseUrl || Parley.DEFAULT_BASE_URL,
                this.sslPinningPublicKeyOne,
                this.sslPinningPublicKeyTwo,
                "Unsafe connection detected, the chat will be closed.",
                this.httpHeaders
            );
        } else {
            // Also support not providing pinning
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
        let chatViewController = ICChatViewController.new();

        let size = this.nativeView.frame.size;
        chatViewController.view.frame = CGRectMake(0,0, size.width, size.height);

        let parentViewController = this.page.viewController;
        parentViewController.addChildViewController(chatViewController);
        this.nativeView.addSubview(chatViewController.view);
        chatViewController.didMoveToParentViewController(parentViewController);
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

    irisChatLibFailedToStartWithError?(irisChatLib: IrisChatLib, error: NSError): void {
        // console.log("irisChatLibFailedToStartWithError");

        if (Parley.getInstance().getListener()) {
            Parley.getInstance().getListener().onConfigureFailed();
        }
    }

    irisChatLibFailedToSubscribeDeviceWithError?(irisChatLib: IrisChatLib, error: NSError): void {
        // console.log("irisChatLibFailedToSubscribeDeviceWithError");

        if (Parley.getInstance().getListener()) {
            Parley.getInstance().getListener().onDeviceRegistrationFailed();
        }
    }

    irisChatLibFailedToVerifySSLPin?(irisChatLib: IrisChatLib, error: NSError): void {
        // console.log("irisChatLibFailedToVerifySSLPin");

        if (Parley.getInstance().getSslPinningListener()) {
            Parley.getInstance().getSslPinningListener().onEnableSslPinningFailed(error.description);
        }
    }

    userDidSentMessage?(): void {
        // console.log("userDidSentMessage");

        if (Parley.getInstance().getListener()) {
            Parley.getInstance().getListener().onChatMessageSend();
        }
    }

    userIsNotAuthorized?(): void {
        // console.log("userIsNotAuthorized");

        if (Parley.getInstance().getListener()) {
            Parley.getInstance().getListener().onUserUnauthorized();
        }
    }
}