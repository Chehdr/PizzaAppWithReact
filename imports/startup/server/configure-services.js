ServiceConfiguration.configurations.upsert({
  service: "google"
}, {
  $set: {
    "clientId": Meteor.settings.private.clientId,
    "secret": Meteor.settings.private.secret
  }
});
