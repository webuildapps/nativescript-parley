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