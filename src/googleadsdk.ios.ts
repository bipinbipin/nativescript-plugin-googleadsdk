import { Common, adCommon } from './googleadsdk.common';

declare var DFPBannerView;
declare var GADRequest;

export class Googleadsdk extends Common {

    constructor() {
        super();
    }

    public showBanner(adUnitID: string) {
        // wait for {n} to render root view
        setTimeout(() => {
            createAndDisplayBanner(adUnitID);
        }, 1000);
    }

    public showTestBanner() {
        this.showBanner('/6499/example/banner');
    }

    public removeBanner() {
        hideBanner();
    }

    destroyNativeView() {

    }

}

export function createAndDisplayBanner(adUnitID: string) {
    return new Promise(function (resolve, reject) {
        try {
            let defaultView = UIApplication.sharedApplication.keyWindow.rootViewController.view;
            let adWidth = defaultView.frame.size.width;
            let adHeight = adCommon.adSize.size.smartHeight;

            // console.log(defaultView);

            let originX = (defaultView.frame.size.width - adWidth) / 2;
            let originY = defaultView.frame.size.height - adHeight;
            let origin = CGPointMake(originX, originY);

            adCommon.adView = DFPBannerView.alloc().initWithAdSizeOrigin(adCommon.adSize, origin);

            adCommon.adView.adUnitID = adUnitID;

            let adRequest = GADRequest.request();

            adCommon.adView.rootViewController = UIApplication.sharedApplication.keyWindow.rootViewController;

            adCommon.adView.loadRequest(adRequest);

            defaultView.addSubview(adCommon.adView);
            // console.log('added subview adview');
            // console.log(adCommon.adView);

            resolve();
        } catch (ex) {
            console.log('Error in createBanner: ' + ex);
            reject(ex);
        }
    });
}

export function hideBanner(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        // console.log(adCommon);
        if (adCommon.adView !== null) {
          // adView.delegate = null;
          adCommon.adView.removeFromSuperview();
          adCommon.adView = null;
        }
        resolve();
      } catch (ex) {
        console.log("Error in hideBanner: " + ex);
        reject(ex);
      }
    });
  }
