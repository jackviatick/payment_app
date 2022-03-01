#import "JarvisModule.h"

@implementation BmsModule {
BmsController* bmsController
}

RCT_EXPORT_MODULE();

RCT_EXPORT_MODULE(initSdk,
           initSdkResolver:(RCTPromiseResolveBlock)resolve
           rejecter:(RCTPromiseRejectBlock)reject) {
           [bmsController initSdk];
           resolve(@(true));
}

