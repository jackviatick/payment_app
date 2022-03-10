////
////  BmsController.swift
////  payment_app
////
////  Created by Hiếu on 2/25/22.
////
//
import Foundation
import BmsSDK


@objc public class BmsController: UIViewController {
    // Some codes...
  @objc public static let sharedInstance = BmsController();


    // declare instance of bms controller
    let viaBmsCtrl = ViaBmsCtrl.sharedInstance;
    let BMS_KEY = "71accb89baa13337fe200559bc30979c89099f5baead604f105d361625fe0a6d";
    var bmsZones:[ViaZone] = [];

    @objc public func initSdk() {
        // Some codes...
        print("Start init sdk --")
        var requestDistanceBeacons:[IBeacon] = [];
        // let beacon:IBeacon = IBeacon(uuid: "uuid", major: 40, minor: 50);

        // configure bms sdk settings at first
        viaBmsCtrl.setting(
        alert: true, // whether to show notification when a minisite is triggered
        background: true, // whether to enable beacon scanning in background mode
        site: true, // whether to enable minisite feature
        minisitesView: .LIST, // choose either 'LIST' to display
        autoSiteDuration: 0, // if minisite view mode is 'AUTO', this specifies number of
        tracking: false, // whether to enable tracking feature and send tracking data to BMS
        enableMQTT: false, // whether to use MQTT or normal RESTful endpoint to send tracking data
        attendance: false, // whether to enable attendance feature
        checkinDuration: 5, // duration of the device staying in the authorized zones to be considered "checked in"
        checkoutDuration: 20, // duration of the device staying out of the authorized zones to be considered "checked out"
        requestDistanceBeacons: requestDistanceBeacons, // ibeacons that you want to return distance callback
        bmsEnvironment: .PROD, // BMS environment, default is "PROD"
        beaconRegionRange: 10, // range of beacon region that you want to filter, set it to 0 if you don't want it
        beaconRegionUUIDFilter: true, // when true, it will filter only the preset UUID broadcasted by the mobile device of this application
        isBroadcasting: true, // set it to true to broadcast as beacon (UUID, major, minor is generated by the system)
        proximityAlert: true, // set it to true to enable alert when proximity period with a filtered device exceed proximityAlertThreshold
        proximityAlertThreshold: 120, // minimum how long is the proximity period, in seconds,
        proximityAwayThreshold: 120, // minimum how long is the period for a proximity device pair to be considered "away", in seconds,
        proximityRange: 5 // range of proximity that you want to filter, set it to 0 if you don't want it
        );

    // optional to attach delegate
        // 4 callbacks
        // sdkInited
        // customerInited
        // if attendance is enable
        // checkin and checkout
        viaBmsCtrl.delegate = self;

        // this method must be called at first to do handshake with bms
        // sdkInited callback will be called
      viaBmsCtrl.initSdk(uiViewController: self, sdk_key: self.BMS_KEY);

        // Some codes...
    }
  
  //init customer
  @objc public func initCustomer(id: String, phone: String, email: String) {
    viaBmsCtrl.initCustomer(identifier: id, email: email, phone: phone, authorizedZones: bmsZones as NSArray);
  }
 
    // start sdk service
    @objc public func startService(sender: UIButton) {
        // these methods are to check sdk initation and bms is running or not
        let bmsRunning = viaBmsCtrl.isBmsRunning();
        let sdkInited = viaBmsCtrl.isSdkInited();

        if (!bmsRunning && sdkInited) {
            // this method is to start bms service if it is not running
            // you can call this method to restart without calling initSdk again
            viaBmsCtrl.startBmsService();
        }
    }

    // end sdk service
    @objc public func stopService(sender: UIButton) {
        // this method is to stop the bms service
        viaBmsCtrl.stopBmsService();
    }

    // open a minisite url (from NFC Tag or others) as a minisite on the same app
    @objc public func destroySDK(sender: UIButton) {
        // destroy the SDK instance so it can be initiated again

        viaBmsCtrl.destroySDK();
    }

    // Some codes...
}

// implement delegate of bms here
extension BmsController: ViaBmsCtrlDelegate {
  public func onProximityAlert() {
    // do nothing
  }
  

    // this will be called when sdk is inited
    // list of zones in the sdk application is passed here
  public func sdkInited(inited status: Bool, zones: [ViaZone]) {
        print("sdk inited", status);
        if(status) {
          bmsZones = zones;
        }

        // this method must be called in order to enable attendance and tracking feature
        // authorizedZones is optional field
    }

  public func customerInited(inited: Bool) {
        print("customer inited", inited);
        viaBmsCtrl.startBmsService();
    }

  public func checkin() {
        print("check in callback");
    }

  public func checkout() {
        print("check out callback");
    }

    // it is callback of request tracking beacons
  public func onDistanceBeacons(beacons: [IBeacon]) {
    }

    // callback when a device site is loaded, error code will be returned if failed
  public func deviceSiteLoaded(loaded: Bool, error: String?) {

    }

    // call on applicationWillTerminate
  public func onDestroy() {
        print("onDestroy");
    }

    // callback when there's new proximity alert (contact) been established
  public func onNewProximityAlert(uuid: String, major: Int, minor: Int, deviceUUID: String) {

    }

    // callback when Bluetooth state is switched to on
  public func onBluetoothStateOn() {
    }

    // callback when Bluetooth state is switched to off
  public func onBluetoothStateOff() {
    }

    // callback when there's a new zone record added
    // returns the uuid, major, minor of the beacon as well as the zones that the beacon is associated to
  public func onAddZoneRecord(uuid: String?, major: Int, minor: Int, newZones: [ViaZone]?) {
    }

    // callback when the map is initiated
  public func onMapInited(status: Bool) {
    }

    // callback when a zone on the map is tapped/clicked
  public func onZoneClicked(zoneName: String) {
    }

    // returns the zones requested by getZones
    // zone Dictionary consists of name and zoneId parameters
  public func onZonesLoaded(zones: [Dictionary<String, Any>]) {
    }

    // return the zone records request getLastProperZoneRecords
    // zone record Dictionary consists of zoneRecordId, start, end, customer, zone parameters
    // customer parameter is a Dictionary consists of customerId, identifier, email, phone
    // zone parameter is a Dictionary consists of zoneId, name
  public func onProperZoneRecordsLoaded(zoneRecords: [Dictionary<String, Any>]) {
    }

}
