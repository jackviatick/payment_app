#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface BmsModule : RCTEventEmitter<RCTBridgeModule, BluetoothControllerDelegate, ContactControllerDelegate>
@end

