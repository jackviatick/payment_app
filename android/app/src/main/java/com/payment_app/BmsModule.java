package com.payment_app;

import android.app.Activity;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.os.Build;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.viatick.bmsandroidsdk.controller.ViaBmsCtrl;
import com.viatick.bmsandroidsdk.helper.BmsEnvironment;
import com.viatick.bmsandroidsdk.model.BmsZone;
import com.viatick.bmsandroidsdk.model.BmsZoneRecord;
import com.viatick.bmsandroidsdk.model.IBeacon;
import com.viatick.bmsandroidsdk.model.ViaBmsUtil;
import com.viatick.bmsandroidsdk.model.ViaZone;

import java.util.ArrayList;
import java.util.List;



public class BmsModule extends ReactContextBaseJavaModule {
    private static final String TAG = "BmsModule";
    private static ReactApplicationContext reactContext;

    public final static String CHANNEL_ID = "Payment_app_proper";
    public final static String BMS_KEY = "71accb89baa13337fe200559bc30979c89099f5baead604f105d361625fe0a6d";

  public BmsModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

    @NonNull
    @Override
    public String getName() {
        return "BmsModule";
    }

  private static List<ViaZone> bmsZones = new ArrayList<>();
  private final static ViaBmsCtrl.ViaBmsCtrlDelegate bmsDelegate = new ViaBmsCtrl.ViaBmsCtrlDelegate() {
    @Override
    public void sdkInited(boolean success, List<ViaZone> zones) {
      Log.d(TAG, "1 sdk init " + success);
      Log.d(TAG, "Zone " + zones);
      if (success) {
        bmsZones = zones;
      }
    }

    @Override
    public void customerInited(boolean success) {
      Log.i(TAG, "2 customer init " + success);
      ViaBmsCtrl.startBmsService();
      Log.i(TAG, "Start Bms service ");

    }

    @Override
    public void checkin() {
      Log.d(TAG, "Checkin Callback");

    }

    @Override
    public void checkout() {
      Log.d(TAG, "Checkout Callback");
    }

    @Override
    public void onDistanceBeacons(List<IBeacon> list) {
      Log.i(TAG, "onDistanceBeacons called " + list.size());
    }

    // callback when device site is loaded succcessfully or failed, will
    // return error message code when it fails
    // Possible error code:
    // - INVALID_BMS_ENVIRONMENT: The BMS environment indicates in the device site
    // url doesn't match with the environment on the SDK settings
    // - INVALID_SERIAL_CODE: URL doesn't include serial code or serial code is of
    // invalid format
    // - SDK_NOT_INITIATED: openDeviceSite is called before the SDK is initiated
    // - NO_MINISITE_SCHEDULE: no minisite is attached with the device at the moment,
    // could be due to the serial code not existed or the device schedule isn't attached
    @Override
    public void deviceSiteLoaded(boolean loaded, String error) {
      Log.d(TAG, "deviceSiteLoaded Callback "+ loaded + " error "  + error);
    }


    // callback when there's new proximity alert (contact) been established
    @Override
    public void onNewProximityAlert(String s, int i, int i1, String s1) {
      Log.d(TAG, "onNewProximityAlert called " + s + " " + i + " " + i1 + " " + s1);
    }

    @Override
    public void onBluetoothStateOn() {}

    @Override
    public void onBluetoothStateOff() {}

    @Override
    public void onAddZoneRecord(String s, int i, int i1, List<ViaZone> list) {

    }

    @Override
    public void onMapInited(boolean b) {

    }

    @Override
    public void onZoneClicked(String s) {

    }

    @Override
    public void onZonesLoaded(List<BmsZone> list) {

    }

    @Override
    public void onProperZoneRecordsLoaded(List<BmsZoneRecord> list) {

    }
  };

  @ReactMethod
  public void isSdkInited(final Promise promise){
    Log.i(TAG, "Is inited sdk " + ViaBmsCtrl.isSdkInited());

     promise.resolve(ViaBmsCtrl.isSdkInited());
  }

  @ReactMethod
  public void stopSdk(final Promise promise){
    Log.i(TAG, "Is inited sdk " + ViaBmsCtrl.isSdkInited());
    ViaBmsCtrl.destroySDK(true);

//    return ViaBmsCtrl.isSdkInited();
  }

  @ReactMethod
  public void initCtrl(final Promise promise) {
    // Create the NotificationChannel, but only on API 26+ because
    // the NotificationChannel class is new and not in the support library
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      CharSequence name = "JarvisAppChannel";
      String description = "Jarvis payment app";
      int importance = NotificationManager.IMPORTANCE_DEFAULT;
      NotificationChannel channel = new NotificationChannel(CHANNEL_ID, name, importance);
      channel.setDescription(description);
      // Register the channel with the system; you can't change the importance
      // or other notification behaviors after this
      NotificationManager notificationManager = getCurrentActivity().getSystemService(NotificationManager.class);
      notificationManager.createNotificationChannel(channel);
    }

//    this.mainController = new MainController(reactContext.getApplicationContext(),
//      getCurrentActivity(), this);
//    this.ocrController = new OcrController(getCurrentActivity());
//    this.openCvController = new OpenCvController(reactContext);
//    this.ENVIRONMENT_NAME = envName;

    promise.resolve(true);
  }

  @ReactMethod
  public void initSdk() {
    List<IBeacon> requestDistanceBeacons = new ArrayList<>();
    // add beacon you want to track distance, only use this if you
    // specifically needs to use the onDistanceBeacons callback
//    IBeacon simBeacon = new IBeacon("A4130021-2F39-4717-B86F-0F65EDAE18B1",16808,19400);
//    IBeacon simBeacon2 = new IBeacon("1be9f53c-b784-40bb-9e97-65c61fe95eb8",1,2);
//
//    requestDistanceBeacons.add(simBeacon);
//    requestDistanceBeacons.add(simBeacon2);
    if(!ViaBmsCtrl.isSdkInited()) {
      ViaBmsCtrl.settings(
              true, // enableAlert: whether to show notification when a minisite is triggered
              true, // enableBackground: whether to enable beacon scanning in background mode
              true, // enableSite: whether to enable minisite feature
              ViaBmsUtil.MinisiteViewType.LIST, // minisitesView: choose either 'LIST' to display minisite list or "AUTO" to auto popup the latest minisite
              null, // autoSiteDuration: if minisite view mode is 'AUTO', this specifies number of seconds that the minisite will switch
              false, // tracking: whether to enable tracking feature and send tracking data to BMS
              false, // enableMQTT: whether to use MQTT or normal RESTful endpoint to send tracking data
              false, // attendance: whether to enable attendance feature
              5, // checkinDuration: duration of the device staying in the authorized zones to be considered "checked in"
              20, // checkoutDuration: duration of the device staying out of the authorized zones to be considered "checked out"
              requestDistanceBeacons, // requestDistanceBeacons: ibeacons that you want to return distance callback
              BmsEnvironment.PROD, //  bmsEnvironment: BMS environment, default is "PROD", other options are "DEV" and "CHINA"
              5D, // beaconRegionRange: range of beacon region that you want to filter, set it to 0 if you don't want it
              false, // beaconRegionUUIDFilter: when true, it will filter only the preset UUID broadcasted by the mobile device of this application
              false, // isBroadcasting: set it to true to broadcast as beacon (UUID, major, minor is generated by the system)
              false, // proximityAlert: set it to true to enable alert when proximity period with a filtered device exceed proximityAlertThreshold
              120, // proximityAlertThreshold: minimum how long is the proximity period, in seconds,
              60, // proximityAwayThreshold: minimum how long after proximity alert without proximity signals that the device will start to record for proximity alert again, in seconds,
              5D, // proximityRange: range of device proximity checking that you want to filter, set it to 0 if you don't want it, default value is 5
              1 // scanMode: scan mode, 0 for low-battery scan mode, 1 for balanced scan mode, 2 for low-latency scan mode
      );


      // method to attach delegate
      // 4 callbacks
      // sdkInited
      // customerInited
      // if attendance is enable
      // checkin and checkout
      ViaBmsCtrl.setDelegate(bmsDelegate);

      // this method must be called at first to do handshake with bms
      // sdkInited callback will be called after initialization
      // only call this after calling settings
      Log.i(TAG, "Start init SDK 1");
      ViaBmsCtrl.initSdk(this.getCurrentActivity(), BmsModule.BMS_KEY, null);
    }

  }

  @ReactMethod
  public void initCustomer(String identifier, String phone, String email) {
    ViaBmsCtrl.initCustomer(identifier, phone, email, bmsZones);
  }

  @ReactMethod
  public void startService() {
    boolean sdkInited = ViaBmsCtrl.isSdkInited();
    Log.d(TAG, "startBmsService sdkInited " + sdkInited);
    if(!ViaBmsCtrl.isSdkInited()) {
      initSdk();
    }
    else {
      Log.d(TAG, "startBmsService start Bms service ");

      if(!ViaBmsCtrl.isBmsRunning()) {
        ViaBmsCtrl.startBmsService();
      }
    }
  }

  @ReactMethod
  public void isServiceStarted(Promise promise) {
    Log.d(TAG, "is startBmsService started " + ViaBmsCtrl.isBmsRunning());
    promise.resolve(ViaBmsCtrl.isBmsRunning());
  }

//  @ReactMethod
//  public void testNotification() {
//    int notificationId = 1;
//    Intent intent = new Intent(this.getReactApplicationContext(), MainActivity.class);
//    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
//    PendingIntent pendingIntent = PendingIntent.getActivity(this.getReactApplicationContext(), 0, intent, 0);
//
//    NotificationCompat.Builder builder = new NotificationCompat.Builder(this.getCurrentActivity(), BmsModule.CHANNEL_ID)
//      .setSmallIcon(R.mipmap.ic_launcher)
//      .setContentTitle("Reminder")
//      .setContentText("Please submit your temperature in time")
//      .setPriority(NotificationCompat.PRIORITY_DEFAULT)
//      .setContentIntent(pendingIntent)
//      .setAutoCancel(true);
//
//    NotificationManagerCompat notificationManager = NotificationManagerCompat.from(this.getCurrentActivity());
//
//    // notificationId is a unique int for each notification that you must define
//    notificationManager.notify(notificationId, builder.build());
//  }
}
