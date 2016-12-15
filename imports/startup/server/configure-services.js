import { Accounts } from 'meteor/service-configuration'

ServiceConfiguration.configurations.upsert({
  service: "google"
}, {
  $set: {
    clientId: "*********************************************************",
    secret: "**********************"
  }
});
