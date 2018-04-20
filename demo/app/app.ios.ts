import * as application from 'tns-core-modules/application';
import {AppDelegate} from "./app-delegate";

application.ios.delegate = AppDelegate;

application.start({ moduleName: "main-page" });