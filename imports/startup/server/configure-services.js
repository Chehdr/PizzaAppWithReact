import { Accounts } from 'meteor/service-configuration'

ServiceConfiguration.configurations.upsert({
  service: "google"
}, {
  $set: {
    clientId: "148541948041-o9ifs9erg3l63ciacvppd668ugk3eq6j.apps.googleusercontent.com",
    secret: "9-V4fWS7rmwGiTP0KGBTVfbn"
  }
});
