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

In ionic react app add import the followig module onesignal-cordova-plugin. After this just add the function below

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


- author: Mark Oliv
- GitHub: https://github.com/markoliv