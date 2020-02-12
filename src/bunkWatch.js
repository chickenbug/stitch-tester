const {
    AnonymousCredential,
    Stitch,
    StitchAppClientConfiguration,
    RemoteMongoClient,
  } = require("mongodb-stitch-server-sdk");
  
  const appId = "off-jroiz";
  
  const stitchApp = Stitch.initializeDefaultAppClient(
    appId,
    new StitchAppClientConfiguration.Builder()
      .withBaseUrl("https://stitch-qa.mongodb.com")
      .build()
  );

const mongodb = stitchApp.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
const itemsCollection = mongodb.db("store").collection("items");

async function watcher() {
    // Create a change stream that watches the collection
    const stream = await itemsCollection.watch();
    // Set up a change event handler function for the stream
    stream.onNext((event) => {
      // Handle the change events for all specified documents here
      console.log(event.fullDocument);
    });
}
  
stitchApp.auth
 .loginWithCredential(new AnonymousCredential())
 .then(() => {
   watcher()
 }).catch(err => {
   console.log(err);
   client.close();
 });
  