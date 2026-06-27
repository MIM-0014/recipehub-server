const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASS)}@cluster0.dmalja2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    await client.connect();

    console.log("✅ MongoDB Connected Successfully");

    return client.db("recipeHubDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error);
    process.exit(1);
  }
}

module.exports = connectDB;