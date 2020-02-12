const {
  Stitch,
  StitchAppClientConfiguration,
  UserPasswordCredential
} = require("mongodb-stitch-server-sdk");

const appId = "userpass-check-fuyuo";

const client = Stitch.initializeDefaultAppClient(
  appId,
  new StitchAppClientConfiguration.Builder()
    .withBaseUrl("https://stitch-qa.mongodb.com")
    .build()
);

client.auth
  .loginWithCredential(
    new UserPasswordCredential("haikinhhoang@gmail.com", "password")
  )
  .then(user => {
    console.log(user);

    // client.callFunction("hey", ["Hello world!"]).then(echoedResult => {
    //   console.log(`Echoed result: ${echoedResult}`);
    // });

    client.close();
  })
  .catch(err => {
    console.log(err);
    client.close();
  });
