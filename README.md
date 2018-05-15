# NativeScript Parley plugin
NativeScript plugin for Parley messaging. You need an `appSecret` to use this plugin. The `appSecret` can be obtained on https://www.parley.nu/.

## Requirements
 - Android API Level 17+
 - iOS 9+
 - NativeScript 4.0.0

## Changes
### V1.0.0 (23 april 2018)
 * PARLEY-179 Release on GitHub and npm.

### V1.0.12 (15 mei 2018)
 * PARLEY-187 Disabled tool- and navigationbar manipulation.

## Getting started
The plugin offers a singleton called `Parley` and a view called `ParleyView`. The `Parley` singleton is the connection between your application and the plugin. The `ParleyView` represent a native Android and iOS view.

### Step 1: Prepare your project for the plugin
#### 1.1 Android
##### Step 1.1.1: Create an `AppCompatActivity`
The plugin needs an `AppCompatActivity` to work. Create the file `app/main-activity.android.ts` and add the following:

```typescript
import {setActivityCallbacks, AndroidActivityCallbacks} from "tns-core-modules/ui/frame";

declare const com: any;

@JavaProxy("__PACKAGE__.MainActivity")
class MainActivity extends android.support.v7.app.AppCompatActivity {
    private _callbacks: AndroidActivityCallbacks;

    protected onCreate(savedInstanceState: android.os.Bundle): void {
        if (!this._callbacks) {
            setActivityCallbacks(this);
        }

        this._callbacks.onCreate(this, savedInstanceState, super.onCreate);
    }

    protected onSaveInstanceState(outState: android.os.Bundle): void {
        this._callbacks.onSaveInstanceState(this, outState, super.onSaveInstanceState);
    }

    protected onStart(): void {
        this._callbacks.onStart(this, super.onStart);
    }

    protected onStop(): void {
        this._callbacks.onStop(this, super.onStop);
    }

    protected onDestroy(): void {
        this._callbacks.onDestroy(this, super.onDestroy);
    }

    public onBackPressed(): void {
        this._callbacks.onBackPressed(this, super.onBackPressed);
    }

    public onRequestPermissionsResult(requestCode: number, permissions: Array<String>, grantResults: Array<number>): void {
        this._callbacks.onRequestPermissionsResult(this, requestCode, permissions, grantResults, undefined /*TODO: Enable if needed*/);
    }

    protected onActivityResult(requestCode: number, resultCode: number, data: android.content.Intent): void {
        this._callbacks.onActivityResult(this, requestCode, resultCode, data, super.onActivityResult);
    }
}
```
*Replace `__PACKAGE__` by your package name*

##### Step 1.1.2: Configure `AppCompatActivity` in the `AndroidManifest`
Open the `AndroidManifest` (located in `App_Resources/Android/AndroidManifest.xml`) and replace `com.tns.NativeScriptActivity` by `__PACKAGE__.MainActivity`.

###### Example
Before
```xml
<activity
    android:name="com.tns.NativeScriptActivity"
    android:label="@string/title_activity_kimera"
    android:configChanges="keyboardHidden|orientation|screenSize"
    android:theme="@style/LaunchScreenTheme">
```

After
```xml
<activity
    android:name="__PACKAGE__.MainActivity"
    android:label="@string/title_activity_kimera"
    android:configChanges="keyboardHidden|orientation|screenSize"
    android:theme="@style/LaunchScreenTheme">
```

##### Step 1.1.3: Define support and firebase versions in `app.gradle`
To avoid conflicts when compiling the Android application we need to set the right `supportVersion` and `firebaseVersion`. Open `app/App_Resources/Android/app.gradle` and add:

```groovy
android {
  //

  project.ext {
    supportVersion = '27.1.1'
    firebaseVersion = '12.0.1'
  }
}
```

##### Step 1.1.4: Configure Firebase Cloud Messaging
The plugin uses remote messages to update the chat. You need to implement Firebase Cloud Messaging to receive remote messages in Android.

###### Step 1.1.4.1: Create a project in the firebase console
Firebase needs a `google-services.info` to work. You can retrieve this `google-service.info` by creating a project on https://console.firebase.google.com/.

Add the generated `google-services.info` to `app/App_Resources/Android`.

##### Step 1.1.4.2: Install the NativeScript Firebase plugin
```bash
tns plugin add nativescript-plugin-firebase
```
*Only enable Android and Firebase Messaging when installing the plugin.*

#### Step 1.1.4.3: Define Firebase Cloud Messaging services in the `AndroidManifest`
Open the `AndroidManifest` (located in `App_Resources/Android/AndroidManifest.xml`) and add the following Firebase Cloud Messaging services:
```xml
<manifest ... >
    <application ... >
        ...
        <service android:name="org.nativescript.plugins.firebase.MyFirebaseInstanceIDService">
            <intent-filter>
                <action android:name="com.google.firebase.INSTANCE_ID_EVENT"/>
            </intent-filter>
        </service>
        <service android:name="org.nativescript.plugins.firebase.MyFirebaseMessagingService">
            <intent-filter>
                <action android:name="com.google.firebase.MESSAGING_EVENT"/>
            </intent-filter>
        </service>
    </application>
</manifest>
```

### 1.2 iOS
#### Step 1.2.1: Create a before-prepare hook to delete the Firebase podfile
The NativeScript Firebase plugin adds a Podfile by default. Firebase is not needed for iOS because Parley uses APNs to receive Remote Messages. To bypass this create the file `hooks/before-prepare/remove-firebase-podfile.js` with the following content:

```javascript
let path = require('path');
let fs = require('fs');

module.exports = function() {
    let podFile = path.join(__dirname, "..", "..", "node_modules", "nativescript-plugin-firebase", "platforms", "ios", "Podfile");
    if (fs.existsSync(podFile)) {
        console.log('Delete nativeScript Firebase plugin Podfile.', podFile);

        fs.unlinkSync(podFile);
    }
};
```

#### Step 1.2.2: Configure Remote messages
To receive remote messages in iOS the application needs to add an `app.entitlements` file.

Create the file `app/App_Resources/iOS/app.entitlements` and add the following:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>aps-environment</key>
	<string>development</string>
</dict>
</plist>
```

Then install `nativescript-custom-entitlements` to copy the `app.entitlements` file when compiling the iOS project:
```bash
npm install nativescript-custom-entitlements --save-dev
```

## Step 2: Install the plugin
```bash
npm install nativescript-parley --save-dev
```

## Step 3: Register device and configure remote messages
### Step 3.1: Remove `app/app.ts`
To handle remote messages we need a platform specific configuration, so remove the file `app/app.ts`.

### 3.2 Android
#### Step 3.2.1: Create Android specific app
Create the file `app/app.android.ts` and add the following:
```typescript
import * as application from 'tns-core-modules/application';

const firebase = require("nativescript-plugin-firebase");
import {Message} from "nativescript-plugin-firebase";
import {Parley} from "nativescript-parley";

firebase.init({
    onMessageReceivedCallback: (message: Message) => {
        console.log("onMessageReceivedCallback: ", message.data);

        Parley.getInstance().handlePushMessage(message.data);
    },

    onPushTokenReceivedCallback: function(token) {
        console.log("onPushTokenReceivedCallback: ", token);

        Parley.getInstance().setDeviceToken(token);
    }
});

application.start({ moduleName: "main-page" });
```

### 3.3: iOS
#### Step 3.2.1: Create an AppDelegate
Create the file `app/app-delegate.ts` and add the following:
```typescript
import {Parley} from "nativescript-parley";

export class AppDelegate extends UIResponder implements UIApplicationDelegate {

    public static ObjCProtocols = [UIApplicationDelegate];

    applicationDidFailToRegisterForRemoteNotificationsWithError(application: UIApplication, error: NSError): void {
        console.log("Failed to register for remote notifications");
    }

    applicationDidReceiveRemoteNotification(application: UIApplication, userInfo: NSDictionary<any, any>): void {
        Parley.getInstance().handlePushMessage(userInfo);
    }

    applicationDidRegisterForRemoteNotificationsWithDeviceToken(application: UIApplication, deviceToken: NSData): void {
        let deviceTokenString = deviceToken.description;

        Parley.getInstance().setDeviceToken(deviceTokenString);
    }

    applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: NSDictionary<any, any>): boolean {
        application.registerForRemoteNotifications();

        return true;
    }
}
```

#### Step 3.2.1: Create iOS specific app
Create the file `app/app.ios.ts` and add the following:

```typescript
import * as application from 'tns-core-modules/application';
import {AppDelegate} from "./app-delegate";

application.ios.delegate = AppDelegate;

application.start({ moduleName: "main-page" });
```

### Step 4: Implement the Parley plugin in a Page (Finally 🎉)
#### 4.1: Configuring and using Parley
The Parley library provides listeners to notify the application. The configuration of Parley can be customised, such as modifying the base url and using SSL pinning.

The application itself is responsible for showing the chat when it is ready. This can be done by calling `parleyView.showChat()` when receiving the `onDeviceRegistrationSuccess` callback.

**Note:**
It is required to register the device before showing the chat. This means that the application is responsible for ensuring that the push token is set before attempting to initialise and use the Parley plugin.

##### Step 4.2.1: Create `ChatViewModel`
Create the file `app/chat-view-model.ts` and add the following:

```typescript
import {Parley, ParleyListener, ParleySslPinningListener, ParleyView} from "nativescript-parley";
import {Observable} from "tns-core-modules/data/observable";

export class ChatViewModel extends Observable implements ParleyListener {

    private parleyView: ParleyView;

    constructor() {
        super();

        Parley.init(this, "appSecret");
        // Add optional custom configuration here
        Parley.getInstance().configure();
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

        this.parleyView.showChat();
    }

    onUserUnauthorized() {
        console.log('onUserUnauthorized');
    }

    onChatMessageSend() {
        console.log('onChatMessageSend');
    }
}
```
*Replace `appSecret` by your `appSecret`. You can obtain an `appSecret` on https://www.parley.nu/*

#### Step 4.2: Configure chat view
Open the xml view for the chat and add `xmlns:Parley="nativescript-parley"` to the `Page` tag.

For example:
```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd" loaded="pageLoaded" class="page" xmlns:Parley="nativescript-parley">
```

Then add the `ParleyView` inside for example a StackLayout.
```xml
<Parley:ParleyView id="parleyView" width="100%" height="100%"/>
```

##### Step 4.3: Configure chat page
Open the page typescript file for the chat and add the following imports:

```typescript
import {Page} from "tns-core-modules/ui/page";
import {ChatViewModel} from "~/chat-view-model";
import {ParleyView} from "nativescript-parley";
```

After that add the following to your `pageLoaded` method:
```typescript
let initialised = false;

export function pageLoaded(args: EventData) {
    if (initialised) return;

    let page: Page = <Page>args.object;
    let parleyView: ParleyView = page.getViewById("parleyView");

    let chatViewModel = new ChatViewModel();
    chatViewModel.setParleyView(parleyView);
    page.bindingContext = chatViewModel;

    initialised = true;
}
```

### Custom configurations
Parley allows the use of custom configurations, such as specifying the base url and enabling SSL pinning. Pay attention: configuring is always done after the `init()` method and before the `configure()` method.


The available configuration methods are as follows:
```typescript
Parley.init(this, "0W4qcE5aXoKq9OzvHxj2");
Parley.getInstance().registerUser("ZGFhbnw5ZTA5ZjQ2NWMyMGNjYThiYjMxNzZiYjBhOTZmZDNhNWY0YzVlZjYzMGVhNGZmMWUwMjFjZmE0NTEyYjlmMDQwYTJkMTJmNTQwYTE1YmUwYWU2YTZjNTc4NjNjN2IxMmRjODNhNmU1ODNhODhkMmQwNzY2MGYxZTEzZDVhNDk1Mnw1ZDcwZjM5ZTFlZWE5MTM2YmM3MmIwMzk4ZDcyZjEwNDJkNzUwOTBmZmJjNDM3OTg5ZWU1MzE5MzdlZDlkYmFmNTU1YTcyNTUyZWEyNjllYmI5Yzg5ZDgyZGQ3MDYwYTRjZGYxMzE3NWJkNTUwOGRhZDRmMDA1MTEzNjlkYjkxNQ"); // Optional -- Read the user registration custom configuration!
Parley.getInstance().setBaseUrl("https://www.irischat.com"); // Optional
Parley.getInstance().setBasePath("/clientApi/v1.1/"); // Optional
Parley.getInstance().enableSslPinning(this , "N9YyJf13LbHgGv1kn9/YEXGFLJbleikrcpDORa896ok=", "aR6DUqN8qK4HQGhBpcDLVnkRAvOHH1behpQUU1Xl7fE="); // Optional -- Read the SSL pinning custom configuration!
Parley.getInstance().configure();
```
*(The values shown are the default values, modify them to your needs)*

#### Enable SSL pinning
To enable SSL pinning you must have a security config.

SSL pinning can be enabled by using the following configuration method:  `enableSslPinning(listener: ParleySslPinningListener, publicKeyOne: string, publicKeyTwo: string)`.
Example:
```typescript
// Parley.init(...);
Parley.getInstance().enableSslPinning(this , "N9YyJf13LbHgGv1kn9/YEXGFLJbleikrcpDORa896ok=", "aR6DUqN8qK4HQGhBpcDLVnkRAvOHH1behpQUU1Xl7fE="); // Default Parley keys
// Parley.getInstance().configure();
```

The first parameter expects a ParleySslPinningListener. This is used to receive the callbacks of the SSL pinning status and consists of the following methods:
```typescript
ParleySslPinningListener {
    public onEnableSslPinningSuccess(): void;
    public onEnableSslPinningFailed(message: string ): void;
}
```

##### Android
The configuration above is enough for iOS. Android needs a network security config. Create the file `app/App_Resources/Android/xml/network_security_config.xml` and add a network security config.

For example:
```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config>
        <domain includeSubdomains="false">www.irischat.com</domain>

        <pin-set expiration="2018-05-31">
            <pin digest="SHA-256">N9YyJf13LbHgGv1kn9/YEXGFLJbleikrcpDORa896ok=</pin>
            <pin digest="SHA-256">aR6DUqN8qK4HQGhBpcDLVnkRAvOHH1behpQUU1Xl7fE=</pin>
        </pin-set>
    </domain-config>
</network-security-config>
```

You also need to specify this network security config in the `AndroidManifest`. Open the `AndroidManifest` (located in `App_Resources/Android/AndroidManifest.xml`) and add the network security config as follows:
```xml
<application
    android:name="..."
    android:icon="..."
    android:roundIcon="..."
    android:label="..."
    android:theme="..."
    android:networkSecurityConfig="@xml/network_security_config">
```

#### Register user
Users can be registered to encrypt the data (and unregister when the user logs out). Registering a user requires the UserAuthentication token. Pay attention: `registerUser()` is always called after the `init()` method and before the `configure()` method. This is done by using `Parley.getInstance().registerUser(userAuthorization: string);` method as follows:
```typescript
// Parley.init(...);
Parley.getInstance().registerUser("ZGFhbnw5ZTA5ZjQ2NWMyMGNjYThiYjMxNzZiYjBhOTZmZDNhNWY0YzVlZjYzMGVhNGZmMWUwMjFjZmE0NTEyYjlmMDQwYTJkMTJmNTQwYTE1YmUwYWU2YTZjNTc4NjNjN2IxMmRjODNhNmU1ODNhODhkMmQwNzY2MGYxZTEzZDVhNDk1Mnw1ZDcwZjM5ZTFlZWE5MTM2YmM3MmIwMzk4ZDcyZjEwNDJkNzUwOTBmZmJjNDM3OTg5ZWU1MzE5MzdlZDlkYmFmNTU1YTcyNTUyZWEyNjllYmI5Yzg5ZDgyZGQ3MDYwYTRjZGYxMzE3NWJkNTUwOGRhZDRmMDA1MTEzNjlkYjkxNQ"); // Optional -- Parley example user
// Parley.getInstance().configure();
```

Additionally, a user can be deregistered (for example: when the user logs out). Note that this can be done after initialising. Deregistering can be done as follows:
```typescript
Parley.getInstance().deregisterUser();
```
