import { Observable } from 'tns-core-modules/data/observable';
import * as app from 'tns-core-modules/application';
import * as dialogs from 'tns-core-modules/ui/dialogs';
import {ContentView} from 'tns-core-modules/ui/content-view';
import { device } from "tns-core-modules/platform";
import { DeviceType } from "tns-core-modules/ui/enums";

export class Common extends ContentView {
  public message: string;

  constructor() {
    super();
    this.message = Utils.SUCCESS_MSG();
  }

  public greet() {
    return "Hello, NS";
  }
}

export class Utils {
  public static SUCCESS_MSG(): string {
    let msg = `Your plugin is working on ${app.android ? 'Android' : 'iOS'}.`;

    return msg;
  }
}

export const testMessage = "Hello Google Ad SDK Plugin!";


//  test ad: "/6499/example/banner"
export const adCommon = {
  adView: undefined,
  adSize: {"size": {"width": 0, "height": 0, "smartHeight": (device.deviceType === DeviceType.Tablet) ? 90 : 50}, "flags": 18},
  adUnitId: "/6499/example/banner"
};
