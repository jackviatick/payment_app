package com.payment_app;

import android.app.Activity;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.os.Build;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.viatick.bmsandroidsdk.controller.ViaBmsCtrl;
import com.viatick.bmsandroidsdk.helper.BmsEnvironment;
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
    private static Activity activityContext;

  public BmsModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }
    @NonNull
    @Override
    public String getName() {
        return "BmsModule";
    }

  private final static ViaBmsCtrl.ViaBmsCtrlDelegate bmsDelegate = new ViaBmsCtrl.ViaBmsCtrlDelegate() {
    @Override
    public void sdkInited(boolean success, List<ViaZone> zones) {
      Log.d(TAG, "1 sdk init " + success);
//      if (success) {
//        Log.d(TAG, "Customer identifier >>>" + userIdentifier + " Customer userEmail >>>" + userEmail);
//        ViaBmsCtrl.initCustomer(userIdentifier, "", userEmail, zones);
//      } else {
//        startCallback.onDone(false);
//      }
    }

    @Override
    public void customerInited(boolean success) {
      Log.i(TAG, "2 customer init " + success);

//      if (success) {
//        startService();
//      } else {
//        startCallback.onDone(false);
//      }
    }

    @Override
    public void checkin() {

    }

    @Override
    public void checkout() {

    }

    @Override
    public void onDistanceBeacons(List<IBeacon> list) {
//      Log.i(TAG, "onDistanceBeacons called " + list.size());
    }

    @Override
    public void deviceSiteLoaded(boolean b, String s) {

    }

    @Override
    public void onNewProximityAlert(String s, int i, int i1, String s1) {
      Log.d(TAG, "onNewProximityAlert called " + s + " " + i + " " + i1 + " " + s1);
//      if (contactCallback != null && i > 0 && i1 > 0) {
//        Log.d(TAG, "onNewProximityAlert 2 called " + s + " " + i + " " + i1 + " " + s1);
//        contactCallback.onNewContact();
//      }
    }

    @Override
    public void onBluetoothStateOn() {}

    @Override
    public void onBluetoothStateOff() {}

    @Override
    public void onAddZoneRecord(String s, int i, int i1, List<ViaZone> list) {

    }
  };

  @ReactMethod
  public void initCtrl(final Promise promise) {
    // Create the NotificationChannel, but only on API 26+ because
    // the NotificationChannel class is new and not in the support library
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      CharSequence name = "JarvisChannel";
      String description = "Jarvis Healthcare";
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
//    requestDistanceBeacons.add(new IBeacon("uuid", major, minor));

    // Configure BMS sdk settings at first
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
      120,// proximityAlertThreshold: minimum how long is the proximity period, in seconds,
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
    ViaBmsCtrl.initSdk(this.getCurrentActivity(), BmsModule.BMS_KEY, BmsModule.CHANNEL_ID);
  }

//  @ReactMethod
//  public void initBluetooth(final Promise promise) {
//    Log.d(TAG, "initBluetooth test");
//    CustomerContactController.initSdk(getCurrentActivity(), this.ENVIRONMENT_NAME, this);
//    boolean success = this.mainController.initBluetooth();
//    Log.d(TAG, "initBluetooth test " + success);
//    promise.resolve(success);
//  }

}