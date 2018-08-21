import {Parley, ParleyListener, ParleySslPinningListener, ParleyView} from "nativescript-parley";
import {Observable} from "tns-core-modules/data/observable";

export class MainViewModel extends Observable implements ParleyListener, ParleySslPinningListener {

    private parleyView: ParleyView;

    constructor() {
        super();

        this.set("loading", true);

        Parley.init(this, "0W4qcE5aXoKq9OzvHxj2");
        Parley.getInstance().registerUser("ZGFhbnw5ZTA5ZjQ2NWMyMGNjYThiYjMxNzZiYjBhOTZmZDNhNWY0YzVlZjYzMGVhNGZmMWUwMjFjZmE0NTEyYjlmMDQwYTJkMTJmNTQwYTE1YmUwYWU2YTZjNTc4NjNjN2IxMmRjODNhNmU1ODNhODhkMmQwNzY2MGYxZTEzZDVhNDk1Mnw1ZDcwZjM5ZTFlZWE5MTM2YmM3MmIwMzk4ZDcyZjEwNDJkNzUwOTBmZmJjNDM3OTg5ZWU1MzE5MzdlZDlkYmFmNTU1YTcyNTUyZWEyNjllYmI5Yzg5ZDgyZGQ3MDYwYTRjZGYxMzE3NWJkNTUwOGRhZDRmMDA1MTEzNjlkYjkxNQ"); // Optional
        Parley.getInstance().setBaseUrl("https://www.irischat.com"); // Optional
        Parley.getInstance().setBasePath("/clientApi/v1.1/"); // Optional
        Parley.getInstance().enableSslPinning(this, "N9YyJf13LbHgGv1kn9/YEXGFLJbleikrcpDORa896ok=", "aR6DUqN8qK4HQGhBpcDLVnkRAvOHH1behpQUU1Xl7fE="); // Optional
        Parley.getInstance().configure();

        // Example for deregister for example, when using a logout button
        // setTimeout(function () {
        //     Parley.getInstance().deregisterUser();
        // }, 5000);
    }

    setParleyView(parleyView: ParleyView): void {
        this.parleyView = parleyView;
    }

    // ParleyListener
    onConfigureFailed() {
        console.log('onConfigureFailed');
    }

    onConfigureSuccess() {
        console.log('onConfigureSuccess');
        Parley.getInstance().registerDevice();
    }

    onDeviceRegistrationFailed() {
        console.log('onDeviceRegistrationFailed');
    }

    onDeviceRegistrationSuccess() {
        console.log('onDeviceRegistrationSuccess');

        this.set("loading", false);
        this.parleyView.showChat();
    }

    onUserUnauthorized() {
        console.log('onUserUnauthorized');
    }

    onChatMessageSend() {
        console.log('onChatMessageSend');
    }

    // ParleySslPinningListener (Optional)
    onEnableSslPinningFailed(message: string): void {
        console.log('onEnableSslPinningFailed: ' + message);
    }

    onEnableSslPinningSuccess(): void {
        console.log('onEnableSslPinningSuccess');
    }
}