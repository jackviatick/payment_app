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
initSdkResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
                  [bmsController initSdk];
                 resolve(@(true));
       }


RCT_REMAP_METHOD(initCustomer,
                 id:(NSString* ) id
                 phone:(NSString* ) phone
                 email:(NSString* ) email
initCustomerResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
                [bmsController initCustomerWithId:id phone:phone email:email];
                 resolve(@(true));
       }

@end
