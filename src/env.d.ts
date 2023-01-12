/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module './assets/index.esm.js'{
  export default class CallApp: CallApp {
    private readonly options;
    private wxTagsList;
    constructor(options: CallappOptions);
    /**
     * 注册为方法
     * generateScheme | generateIntent | generateUniversalLink | generateYingYongBao | checkOpen
     */
    generateScheme(config: CallappConfig): string;
    generateIntent(config: CallappConfig): string;
    generateUniversalLink(config: CallappConfig): string;
    generateYingYongBao(config: CallappConfig): string;
    generateWxTag(config: CallappConfig & WxTagOption): string;
    checkOpen(failure: () => void): void;
    fallToAppStore(): void;
    fallToFbUrl(): void;
    fallToCustomCb(callback: () => void): void;
    bindClickEvent(): void;
    wxTagCalled(wxTagCalled: WxTagCalled | undefined): void;
    setWxTagConfig(options: (CallappConfig & WxTagOption) | Array<CallappConfig & WxTagOption>): void;
    registerWxTag(config: CallappConfig & WxTagOption): void;
    /**
     * 唤起客户端
     * 根据不同 browser 执行不同唤端策略
     */
    open(config: CallappConfig): void;
  }
}