import { Common } from './googleadsdk.common';
export declare class Googleadsdk extends Common {
  constructor();
  showBanner(): void;
  removeBanner(): void;
  destroyNativeView(): void;
}
export declare function createBanner(): Promise<{}>;
export declare function hideBanner(): Promise<any>;
