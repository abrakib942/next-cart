import { MongoClient, ServerApiVersion } from "mongodb";
import { NextResponse } from "next/server";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.axi3z.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function GET(req: Request, res: Response) {
  try {
    await client.connect();
    const productCollection = client.db("next-cart").collection("products");

    const products = await productCollection.find({}).toArray();

    return NextResponse.json(
      { message: "Successful", products },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 400 });
  }
}

export async function POST(req: Request, res: Response) {
  try {
    await client.connect();
    const productCollection = client.db("next-cart").collection("products");

    const product = await req.json();

    const result = await productCollection.insertOne(product);

    return NextResponse.json(
      { message: "Successful", result },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 400 });
  }
}
