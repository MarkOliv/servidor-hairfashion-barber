import { createClient } from "@supabase/supabase-js";
import * as OneSignal from "@onesignal/node-onesignal";

// Onesignal notifications configuration...
const ONESIGNAL_APP_ID = "be52199d-a047-430a-b3fd-e3ba2cb55d6d";
const ONESIGNAL_API_REST_KEY = {
  getToken() {
    return "ZGI5MjRlZTQtZjA4ZS00ODNkLWIyN2YtZDRkNzUyNGFkNTQ1";
  },
};
const configuration = OneSignal.createConfiguration({
  authMethods: {
    app_key: {
      tokenProvider: ONESIGNAL_API_REST_KEY,
    },
  },
});
const client = new OneSignal.DefaultApi(configuration);

const notification = new OneSignal.Notification();

notification.app_id = ONESIGNAL_APP_ID;
notification.included_segments = ["Subscribed Users"];
notification.name = "Novo Agendamento";
notification.subtitle = {
  en: "Novo Agendamento",
  pt: "Novo Agendamento",
};

//realtime notifications table configuration..
const SUPABASE_API_URL = "https://eikbnmphzjoeopujpnnt.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpa2JubXBoempvZW9wdWpwbm50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTcyOTc5NjcsImV4cCI6MTk3Mjg3Mzk2N30.3uHt44B6-yMoePwJ2fJryZDM2vMfYfciVyNaeg_SuWA";

const supabase = createClient(SUPABASE_API_URL, SUPABASE_API_KEY, {
  realtime: {
    params: {
      eventPerSecond: 10,
    },
  },
});

const channel = supabase.channel("notifications");

channel.on(
  "postgres_changes",
  {
    event: "INSERT",
    schema: "public",
    table: "notifications",
  },
  async (payload) => {
    console.log("receive a new schedule");
    console.log("...");
    notification.contents = {
      en:
        "Cliente fez um novo agendamento com você ! para data " +
        payload.new?.message,
      pt:
        "Cliente fez um novo agendamento com você ! para data " +
        payload.new?.message,
    };
    notification.include_external_user_ids = [
      //this is the barber_id
      payload.new?.for,
    ];

    //sendind the notification
    const { id } = await client.createNotification(notification);
    const response = await client
      .getNotification(ONESIGNAL_APP_ID, id)
      .then(() => {
        console.log("notification sent to barber id: " + payload.new?.for);
      });
  }
);

channel.subscribe((Status) => {
  if (Status === "SUBSCRIBED") {
    console.log("SUBSCRIBED");
  }
});
