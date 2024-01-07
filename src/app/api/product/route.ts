import { MongoClient, ServerApiVersion } from "mongodb";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wh888.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run(req: any, res: any) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const productCollection = client.db("next-cart").collection("products");

    if (req.method === "GET") {
      const products = await productCollection.find({}).toArray();
      res.send({ message: "success", status: 200, data: products });
    }

    if (req.method === "POST") {
      const product = req.body;
      const result = await productCollection.insertOne(product);
      res.json(result);
    }
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

export default run;
