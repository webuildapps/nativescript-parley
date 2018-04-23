import * as observable from 'tns-core-modules/data/observable';
import * as pages from 'tns-core-modules/ui/page';
import {MainViewModel} from "./main-view-model";
import {Page} from "tns-core-modules/ui/page";
import {ParleyView} from "nativescript-parley";

let initialised = false;

export function pageLoaded(args: observable.EventData) {
    if (initialised) return;

    let page: Page = <pages.Page>args.object;
    let parleyView: ParleyView = page.getViewById("parleyView");

    let mainViewModel = new MainViewModel();
    mainViewModel.setParleyView(parleyView);
    page.bindingContext = mainViewModel;

    initialised = true;
}