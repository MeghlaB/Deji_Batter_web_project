const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { Parser } = require("json2csv");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173","https://dejibattery-80307.web.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
async function generateBlogPost(topic) {
  const prompt = `Write a detailed blog post titled "${topic}". Also include a meta title and meta description for SEO.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices[0].message.content;
}

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

    app.patch("/products/:id", async (req, res) => {
      const id = req.params.id;

      if (!ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Invalid product ID" });
      }

      try {
        const updateData = { ...req.body };

        if (updateData._id) delete updateData._id;

        if (updateData.price) updateData.price = parseFloat(updateData.price);
        if (updateData.stock) updateData.stock = parseInt(updateData.stock);

        const updateDoc = { $set: updateData };

        const result = await productsCollection.updateOne(
          { _id: new ObjectId(id) },
          updateDoc
        );

        if (result.matchedCount === 0) {
          return res.status(404).send({ error: "Product not found" });
        }

        res.send({
          message: "Product updated successfully",
          modifiedCount: result.modifiedCount,
        });
      } catch (error) {
        console.error("Error updating product:", error);
        res
          .status(500)
          .send({ error: error.message || "Internal Server Error" });
      }
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

    app.patch("/inquiries/:id", async (req, res) => {
      const id = req.params.id;
      const { status } = req.body;
      const allowedStatuses = ["Processing", "Shipped", "Delivered"];

      if (!ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Invalid order ID" });
      }

      if (!allowedStatuses.includes(status)) {
        return res.status(400).send({ error: "Invalid status value" });
      }

      try {
        const result = await inquiriesCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { status } }
        );

        if (result.matchedCount === 0) {
          return res.status(404).send({ error: "Order not found" });
        }

        res.send({
          message: "Order status updated successfully",
          modifiedCount: result.modifiedCount,
        });
      } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).send({ error: "Internal Server Error" });
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

   
    // ............export-products csv
  app.get('/api/export-products', async (req, res) => {
  try {
    const products = await productsCollection.find({}).toArray();

    if (products.length === 0) {
      return res.status(404).send('No products found to export.');
    }

 
    const flattenedProducts = products.map((product) => {
      const specs = product.specifications || {};

      return {
        id: product._id,
        model: product.model,
        batteryType: product.batteryType,
        capacity: product.capacity,
        voltage: product.voltage,
        limitedVoltage: product.limitedVoltage,
        chargingTime: product.chargingTime,
        standbyTime: product.standbyTime,
        cycleTime: product.cycleTime,
        safety: product.safety,
        brand: product.brand,
        price: product.price,
        stock: product.stock,
        description: product.description,
        title: product.title,
        imageURL: product.imageURL,
        // specifications fields 
        spec_Model: specs.Model,
        spec_BatteryType: specs['Battery Type'],
        spec_Capacity: specs.Capacity,
        spec_Voltage: specs.Voltage,
        spec_LimitedVoltage: specs['Limited Voltage'],
        spec_ChargingTime: specs['Charging Time'],
        spec_StandbyTime: specs['Standby Time'],
        spec_CycleTime: specs['Cycle Time'],
        spec_Safety: specs.Safety,
        spec_Brand: specs.Brand,
      };
    });

    const parser = new Parser();
    const csv = parser.parse(flattenedProducts);

    res.header('Content-Type', 'text/csv');
    res.attachment('products.csv');
    return res.send(csv);
  } catch (error) {
    console.error('❌ CSV export failed:', error);
    res.status(500).send('Server error');
  }
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
