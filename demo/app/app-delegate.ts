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