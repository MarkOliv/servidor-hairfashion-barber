# Node Realtime Server Monitor

## TECHS

- Node JS
- OneSignal with Firebase
- PostgreSQL Database

obs: to work add this in your package.json

```
 "type": "module",
```


### what it does ?

- basically the server is monitoring by realtime system a table of a postgre database, and when there is a insert send a notification to a especific user, in this case for a barber in the app.

# Client Side

In the ionic projetct use following the commands

- ionic capacitor add android
- npm install onesignal-cordova-plugin
- ionic capacitor build android
- npx cap sync



```
 import OneSignal from "onesignal-cordova-plugin";
 
 ...

 const OneSignalInit = () => {
    OneSignal.setAppId("HERE YOUR ONESIGNAL APP ID");
    OneSignal.removeExternalUserId();

    //here i'm setting the user id of aplicattion in supabase
    OneSignal.setExternalUserId("EXTERNAL_USER_ID TYPE UUIDV4");
    OneSignal.setNotificationOpenedHandler(function (jsonData) {
      console.log("notify " + JSON.stringify(jsonData));
    });
  };

```

## Important to build the apk !!!

In the Android Studio need update project settings to target Android 13. To do it, update compileSdkVersion to 33 and targetSdkVersion to 33.

read more in Step 4: https://documentation.onesignal.com/docs/ionic-sdk-setup

In addition, need to specify `android:exported=false` in the android manifest file. 

read more in: https://developer.android.com/about/versions/12/behavior-changes-12#exported


- author: Mark Oliv
- GitHub: https://github.com/markoliv
