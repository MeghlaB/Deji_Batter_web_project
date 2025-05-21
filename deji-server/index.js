const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173"], // আপনার frontend URL দিন
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());

// OpenAI Configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// MongoDB Configuration
const uri = `mongodb+srv://dejiBattery:${process.env.DB_PASSWORD}@cluster0.rjxogi9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect to DB
    await client.connect();

    const db = client.db("DejiBattery");
    const usersCollection = db.collection("users");
    const productsCollection = db.collection("products");
    const inquiriesCollection = db.collection("inquiries");
    const contactCollection = db.collection("contacts");

    // --- User APIs ---

    // Add new user
    app.post("/users", async (req, res) => {
      const userData = req.body;

      const existingUser = await usersCollection.findOne({
        email: userData.email,
      });
      if (existingUser) {
        return res.send({ message: "User already exists", insertedId: null });
      }

      const result = await usersCollection.insertOne(userData);
      res.send(result);
    });

    // Get all users
    app.get("/users", async (req, res) => {
      const users = await usersCollection.find().toArray();
      res.send(users);
    });

    // Check if user is admin
    app.get("/users/admin/:email", async (req, res) => {
      const email = req.params.email;
      const user = await usersCollection.findOne({ email: email });
      res.send({ admin: user?.role === "admin" });
    });

    // --- Products APIs ---

    // Add product
    app.post("/add-products", async (req, res) => {
      const productsData = req.body;
      const result = await productsCollection.insertOne(productsData);
      res.send(result);
    });

    // Get all products
    app.get("/products", async (req, res) => {
      const products = await productsCollection.find().toArray();
      res.send(products);
    });

    // Get product by ID with specifications
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;

      if (!ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Invalid product ID" });
      }

      const product = await productsCollection.findOne({
        _id: new ObjectId(id),
      });
      if (!product) {
        return res.status(404).send({ error: "Product not found" });
      }

      product.specifications = {
        Model: product.model,
        "Battery Type": product.batteryType,
        Capacity: product.capacity,
        Voltage: product.voltage,
        "Limited Voltage": product.limitedVoltage,
        "Charging Time": product.chargingTime,
        "Standby Time": product.standbyTime,
        "Cycle Time": product.cycleTime,
        Safety: product.safety,
        Brand: product.brand,
      };

      res.send([product]);
    });

    // --- Inquiries APIs ---

    // Add inquiry
    app.post("/inquiries", async (req, res) => {
      const inquiriesData = req.body;
      const result = await inquiriesCollection.insertOne(inquiriesData);
      res.send(result);
    });

    // Get all inquiries
    app.get("/inquiries", async (req, res) => {
      const inquiries = await inquiriesCollection.find().toArray();
      res.send(inquiries);
    });

    // --- OpenAI Article Generation API ---

    app.post("/generate-article", async (req, res) => {
      try {
        const { topic } = req.body;
        if (!topic) {
          return res.status(400).json({ error: "Topic is required" });
        }

        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: `Write a blog article about ${topic}` },
          ],
        });

        const article = response.choices[0].message.content;
        res.json({ article });
      } catch (error) {
        console.error("Error in /generate-article:", error);
        res
          .status(500)
          .json({ error: error.message || "Internal Server Error" });
      }
    });

    // ... contact api ....

    app.post("/contact", async (req, res) => {
      const contactData = req.body;
      const result = await contactCollection.insertOne(contactData);
      res.send(result);
    });

    app.get("/contacts", async (req, res) => {
      const contact = await contactCollection.find().toArray();
      res.send(contact);
    });
  } finally {
    // Do NOT close client here, keep connection alive
  }
}
run().catch(console.dir);

// Basic root route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
