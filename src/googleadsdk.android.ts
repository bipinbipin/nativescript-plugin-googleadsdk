import { Common, adCommon } from './googleadsdk.common';
import * as appModule from "tns-core-modules/application";
import { topmost } from "tns-core-modules/ui/frame";
import { layout } from "tns-core-modules/utils/utils";

declare const com: any;
const googleAd = com.google.android.gms;


export const AD_SIZE = {
    SMART_BANNER: "SMART",
    LARGE_BANNER: "LARGE",
    BANNER: "BANNER",
    MEDIUM_RECTANGLE: "MEDIUM",
    FULL_BANNER: "FULL",
    LEADERBOARD: "LEADERBOARD",
    SKYSCRAPER: "SKYSCRAPER",
    FLUID: "FLUID"
  };

  export const BANNER_DEFAULTS = {
    margins: {
      top: -1,
      bottom: -1
    },
    testing: false,
    size: "SMART",
    view: undefined
  };

export class Googleadsdk extends Common {


    constructor() {
        super();
        // console.log(googleAd);
        // let mPublisherAdView = com.google.android.gms.ads.doubleclick.PublisherAdView;
        setTimeout(() => {
            this.showBanner('/6499/example/banner');
        }, 500);

        // adCommon.adView.loadAd(publisherAdRequest);

    }

    showBanner(adUnitId: string) {
        return new Promise((resolve, reject) => {
            try {

                console.log('Entering Show Banner: ' + adCommon.adView);
                // always close a previously opened banner
                if (adCommon.adView !== null && adCommon.adView !== undefined) {
                    const parent = adCommon.adView.getParent();
                    console.log(parent);
                    if (parent !== null) {
                        console.log('ad exists... closing before openning a new one.');
                        // parent.removeView(adCommon.adView);
                    }
                }

                // get ad view
                adCommon.adView = new com.google.android.gms.ads.AdView(appModule.android.foregroundActivity);
                // set adunitid and size
                adCommon.adView.setAdUnitId(adUnitId);
                adCommon.adView.setAdSize(com.google.android.gms.ads.AdSize.SMART_BANNER);

                // (can't find this.resolve or this.reject...
                // need these to support showing a banner more than once
                // this.resolve = resolve;
                // this.reject = reject;
                const BannerAdListener = com.google.android.gms.ads.AdListener.extend({
                    resolve: null,
                    reject: null,
                    onAdLoaded: () => console.log('onAdLoaded'),
                    onAdFailedToLoad: errorCode => console.log(errorCode)
                });
                adCommon.adView.setAdListener(new BannerAdListener());

                // build request and load into ad view
                const ad = this._buildAdRequest();
                adCommon.adView.loadAd(ad);

                console.log(adCommon.adView);

                const density = layout.getDisplayDensity(),
                top = -1 * density,
                bottom = -1 * density;
                console.log('density: ' + density + '  top: ' + top + '  bottom: ' + bottom);

                const relativeLayoutParams = new android.widget.RelativeLayout.LayoutParams(
                    android.widget.RelativeLayout.LayoutParams.MATCH_PARENT,
                    android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);

                if (bottom > -1) {
                    relativeLayoutParams.bottomMargin = bottom;
                    relativeLayoutParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
                } else {
                if (top > -1) {
                    relativeLayoutParams.topMargin = top;
                }
                relativeLayoutParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
                }

                const adViewLayout = new android.widget.RelativeLayout(appModule.android.foregroundActivity);
                adViewLayout.addView(adCommon.adView, relativeLayoutParams);

                const relativeLayoutParamsOuter = new android.widget.RelativeLayout.LayoutParams(
                    android.widget.RelativeLayout.LayoutParams.MATCH_PARENT,
                    android.widget.RelativeLayout.LayoutParams.MATCH_PARENT);

                setTimeout(() => {
                    const top = topmost();
                    console.log(top.currentPage);
                    if (top !== undefined && top.currentPage && top.currentPage.android && top.currentPage.android.getParent()) {
                        console.log('ADDING VIEW TO PARENT');
                        top.currentPage.android.getParent().addView(adViewLayout, relativeLayoutParamsOuter);
                    } else if (appModule.android && appModule.android.foregroundActivity) {
                        console.log('ADDING VIEW TO WINDOW');
                        appModule.android.foregroundActivity.getWindow().getDecorView().addView(adViewLayout, relativeLayoutParamsOuter);
                    } else {
                        console.log("Could not find a view to add the banner to");
                    }
                    }, 500);

                let publisherAdRequest = new com.google.android.gms.ads.doubleclick.PublisherAdRequest.Builder();
                // console.log(publisherAdRequest);
                // adCommon.adView.loadAd(publisherAdRequest);

            } catch (ex) {
                console.log("Error in google ad sdk showBanner: " + ex);
                reject(ex);
            }
        });
    }

    _buildAdRequest(): any {
        const builder = new com.google.android.gms.ads.AdRequest.Builder();
        builder.addTestDevice(com.google.android.gms.ads.AdRequest.DEVICE_ID_EMULATOR);
        const bundle = new android.os.Bundle();
        bundle.putInt("nativescript", 1);
        const adextras = new com.google.android.gms.ads.mediation.admob.AdMobExtras(bundle);
        // builder = builder.addNetworkExtras(adextras);
        return builder.build();
      }

    _getBannerType(size): any {
        if (size === AD_SIZE.BANNER) {
          return com.google.android.gms.ads.AdSize.BANNER;
        } else if (size === AD_SIZE.LARGE_BANNER) {
          return com.google.android.gms.ads.AdSize.LARGE_BANNER;
        } else if (size === AD_SIZE.MEDIUM_RECTANGLE) {
          return com.google.android.gms.ads.AdSize.MEDIUM_RECTANGLE;
        } else if (size === AD_SIZE.FULL_BANNER) {
          return com.google.android.gms.ads.AdSize.FULL_BANNER;
        } else if (size === AD_SIZE.LEADERBOARD) {
          return com.google.android.gms.ads.AdSize.LEADERBOARD;
        } else if (size === AD_SIZE.SMART_BANNER) {
          return com.google.android.gms.ads.AdSize.SMART_BANNER;
        } else {
          return null;
        }
      }
}
