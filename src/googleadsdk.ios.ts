import { Common, adCommon } from './googleadsdk.common';


declare var DFPBannerView
declare var GADBannerView
declare var GADRequest

export class Googleadsdk extends Common {

    constructor() {
        super();
        // this.showBanner();
        // this.hideBanner();
    }

    public showBanner(adUnitID: string){
        // wait for {n} to render root view
        setTimeout(() => {
            createBanner(adUnitID);
        }, 1000);
    }

    public removeBanner() {
        hideBanner();
    }

    destroyNativeView() {

    }

}

export function createBanner(adUnitID: string) {
    return new Promise(function (resolve, reject) {
        try {
            let defaultView = UIApplication.sharedApplication.keyWindow.rootViewController.view;
            var adWidth = defaultView.frame.size.width;
            var adHeight = adCommon.adSize.size.smartHeight;
    
            console.log(defaultView)
    
            var originX = (defaultView.frame.size.width - adWidth) / 2;
            var originY = defaultView.frame.size.height - adHeight;
            var origin = CGPointMake(originX, originY);
        
            adCommon.adView = DFPBannerView.alloc().initWithAdSizeOrigin(adCommon.adSize, origin);
    
            adCommon.adView.adUnitID = adUnitID;
    
            let adRequest = GADRequest.request();
    
            adCommon.adView.rootViewController = UIApplication.sharedApplication.keyWindow.rootViewController;
    
            adCommon.adView.loadRequest(adRequest);
    
            defaultView.addSubview(adCommon.adView);
            console.log('added subview adview')
            console.log(adCommon.adView)

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
        console.log(adCommon)
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
