const {
  Stitch,
  StitchAppClientConfiguration,
  AnonymousCredential
} = require("mongodb-stitch-server-sdk");

const appId = "qa-hfzkt";

const client = Stitch.initializeDefaultAppClient(
  appId,
  new StitchAppClientConfiguration.Builder()
    .withBaseUrl("https://stitch-qa.mongodb.com")
    .build()
);

client.auth
  .loginWithCredential(new AnonymousCredential())
  .then(user => {
    // console.log(user);

    client
      .callFunction("long_function", ["Hello world!"])
      .then(echoedResult => {
        console.log(`Echoed result: ${echoedResult}`);
      });

    client.close();
  })
  .catch(err => {
    console.log(err);
    client.close();
  });
