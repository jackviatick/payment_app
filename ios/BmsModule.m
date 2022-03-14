#import "BmsModule.h"

static NSString* const EVENT_ON_BLUETOOTH_STATE_CHANGE = @"EVENT_ON_BLUETOOTH_STATE_CHANGE";


@implementation BmsModule {
  BmsController* bmsController;
}


- (NSArray<NSString *> *)supportedEvents {
  return @[
    EVENT_ON_BLUETOOTH_STATE_CHANGE,
  ];
}

- (void) sendEventOfBluetoothStateChanged {
  [self sendEventWithName:EVENT_ON_BLUETOOTH_STATE_CHANGE body:@{}];
}


RCT_EXPORT_MODULE(BmsModule);

RCT_REMAP_METHOD(initCtrl,
          initCtrlResolver:(RCTPromiseResolveBlock)resolve
          rejecter:(RCTPromiseRejectBlock)reject) {
          self->bmsController = BmsController.sharedInstance;
          resolve(@(true));
      }

RCT_REMAP_METHOD(initSdk,
                  id:(NSString* ) id
                 phone:(NSString* ) phone
                 email:(NSString* ) email
initSdkResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  printf("init sdk ------");
                  [bmsController initSdkWithIdentifier:id phone:phone email:email];
                 resolve(@(true));
       }

RCT_REMAP_METHOD(stopSdk,
                 stopSdkResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  printf("stop sdk ------");
                  [bmsController destroySDK];
                 resolve(@(true));
        }

@end
