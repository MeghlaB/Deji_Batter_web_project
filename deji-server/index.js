// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");

// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const { Parser } = require("json2csv");
// require("dotenv").config();
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "https://dejibattery-80307.web.app"],
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     credentials: true,
//   })
// );
// app.use(express.json());
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// // MongoDB Configuration
// const uri = `mongodb+srv://dejiBattery:${process.env.DB_PASSWORD}@cluster0.rjxogi9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     await client.connect();

//     const db = client.db("DejiBattery");
//     const usersCollection = db.collection("users");
//     const productsCollection = db.collection("products");
//     const inquiriesCollection = db.collection("inquiries");
//     const contactCollection = db.collection("contacts");

//     // ---------- USER ROUTES ----------
//     app.post("/users", async (req, res) => {
//       const userData = req.body;
//       const existingUser = await usersCollection.findOne({
//         email: userData.email,
//       });
//       if (existingUser) {
//         return res.send({ message: "User already exists", insertedId: null });
//       }
//       const result = await usersCollection.insertOne(userData);
//       res.send(result);
//     });

//     app.get("/users", async (req, res) => {
//       const users = await usersCollection.find().toArray();
//       res.send(users);
//     });

//     app.get("/users/admin/:email", async (req, res) => {
//       const email = req.params.email;
//       const user = await usersCollection.findOne({ email });
//       res.send({ admin: user?.role === "admin" });
//     });

//     // ---------- PRODUCT ROUTES ----------
//     app.post("/add-products", async (req, res) => {
//       const productData = req.body;
//       const result = await productsCollection.insertOne(productData);
//       res.send(result);
//     });

//     app.get("/products", async (req, res) => {
//       const products = await productsCollection.find().toArray();
//       res.send(products);
//     });

//     app.get("/products/:id", async (req, res) => {
//       const id = req.params.id;
//       if (!ObjectId.isValid(id))
//         return res.status(400).send({ error: "Invalid product ID" });

//       const product = await productsCollection.findOne({
//         _id: new ObjectId(id),
//       });
//       if (!product) return res.status(404).send({ error: "Product not found" });

//       product.specifications = {
//         Model: product.model,
//         "Battery Type": product.batteryType,
//         Capacity: product.capacity,
//         Voltage: product.voltage,
//         "Limited Voltage": product.limitedVoltage,
//         "Charging Time": product.chargingTime,
//         "Standby Time": product.standbyTime,
//         "Cycle Time": product.cycleTime,
//         Safety: product.safety,
//         Brand: product.brand,
//       };

//       res.send([product]);
//     });

//     app.patch("/products/:id", async (req, res) => {
//       const id = req.params.id;
//       if (!ObjectId.isValid(id))
//         return res.status(400).send({ error: "Invalid product ID" });

//       try {
//         const updateData = { ...req.body };
//         delete updateData._id;

//         if (updateData.price) updateData.price = parseFloat(updateData.price);
//         if (updateData.stock) updateData.stock = parseInt(updateData.stock);

//         const updateDoc = { $set: updateData };

//         const result = await productsCollection.updateOne(
//           { _id: new ObjectId(id) },
//           updateDoc
//         );

//         if (result.matchedCount === 0) {
//           return res.status(404).send({ error: "Product not found" });
//         }

//         res.send({
//           message: "Product updated successfully",
//           modifiedCount: result.modifiedCount,
//         });
//       } catch (error) {
//         console.error("Error updating product:", error);
//         res
//           .status(500)
//           .send({ error: error.message || "Internal Server Error" });
//       }
//     });

//     // ---------- INQUIRY ROUTES ----------
//     app.post("/inquiries", async (req, res) => {
//       const data = req.body;
//       const result = await inquiriesCollection.insertOne(data);
//       res.send(result);
//     });

//     app.get("/inquiries", async (req, res) => {
//       const data = await inquiriesCollection.find().toArray();
//       res.send(data);
//     });

//     app.patch("/inquiries/:id", async (req, res) => {
//       const id = req.params.id;
//       const { status } = req.body;
//       const allowed = ["Processing", "Shipped", "Delivered"];

//       if (!ObjectId.isValid(id))
//         return res.status(400).send({ error: "Invalid order ID" });
//       if (!allowed.includes(status))
//         return res.status(400).send({ error: "Invalid status value" });

//       try {
//         const result = await inquiriesCollection.updateOne(
//           { _id: new ObjectId(id) },
//           { $set: { status } }
//         );
//         if (result.matchedCount === 0)
//           return res.status(404).send({ error: "Order not found" });
//         res.send({
//           message: "Status updated",
//           modifiedCount: result.modifiedCount,
//         });
//       } catch (error) {
//         console.error("Update failed:", error);
//         res.status(500).send({ error: "Internal Server Error" });
//       }
//     });

//     // ---------- CONTACT ROUTES ----------
//     app.post("/contact", async (req, res) => {
//       const contactData = req.body;
//       const result = await contactCollection.insertOne(contactData);
//       res.send(result);
//     });

//     app.get("/contacts", async (req, res) => {
//       const data = await contactCollection.find().toArray();
//       res.send(data);
//     });

//     // ---------- CSV EXPORT ROUTE ----------
//     app.get("/api/export-products", async (req, res) => {
//       try {
//         const products = await productsCollection.find({}).toArray();
//         if (products.length === 0)
//           return res.status(404).send("No products found");

//         const flattened = products.map((product) => {
//           const specs = product.specifications || {};
//           return {
//             id: product._id,
//             model: product.model,
//             batteryType: product.batteryType,
//             capacity: product.capacity,
//             voltage: product.voltage,
//             limitedVoltage: product.limitedVoltage,
//             chargingTime: product.chargingTime,
//             standbyTime: product.standbyTime,
//             cycleTime: product.cycleTime,
//             safety: product.safety,
//             brand: product.brand,
//             price: product.price,
//             stock: product.stock,
//             description: product.description,
//             title: product.title,
//             imageURL: product.imageURL,
//             spec_Model: specs.Model,
//             spec_BatteryType: specs["Battery Type"],
//             spec_Capacity: specs.Capacity,
//             spec_Voltage: specs.Voltage,
//             spec_LimitedVoltage: specs["Limited Voltage"],
//             spec_ChargingTime: specs["Charging Time"],
//             spec_StandbyTime: specs["Standby Time"],
//             spec_CycleTime: specs["Cycle Time"],
//             spec_Safety: specs.Safety,
//             spec_Brand: specs.Brand,
//           };
//         });

//         const parser = new Parser();
//         const csv = parser.parse(flattened);
//         res.header("Content-Type", "text/csv");
//         res.attachment("products.csv");
//         return res.send(csv);
//       } catch (error) {
//         console.error("CSV export failed:", error);
//         res.status(500).send("Server error");
//       }
//     });

//     // ---------- AI Blog Generation ----------

//     app.get("/models", async (req, res) => {
//       try {
//         const models = await genAI.listModels();
//         res.json(models);
//       } catch (error) {
//         res.status(500).json({ error: error.message });
//       }
//     });

//     app.post("/generate", async (req, res) => {
//       const { prompt } = req.body;

//       if (!prompt) return res.status(400).json({ error: "Prompt lagbe" });

//       try {
//         const model = genAI.getChatModel({ model: "models/chat-bison-001" });

//         const response = await model.chat.completions.create({
//           messages: [{ role: "user", content: prompt }],
//         });

//         const article = response.choices[0].message.content;
//         res.json({ article });
//       } catch (error) {
//         console.error("AI generation error:", error);
//         res.status(500).json({ error: error.message });
//       }
//     });
//   } catch (error) {
//     console.error("Server startup failed:", error);
//   }
// }

// run().catch(console.dir);

// app.get("/", (req, res) => {
//   res.send("Server is running...");
// });

// // Start server
// app.listen(port, () => {
//   console.log(`✅ Server listening on http://localhost:${port}`);
// });

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { Parser } = require("json2csv");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://dejibattery-80307.web.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
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
    await client.connect();

    const db = client.db("DejiBattery");
    const usersCollection = db.collection("users");
    const productsCollection = db.collection("products");
    const inquiriesCollection = db.collection("inquiries");
    const contactCollection = db.collection("contacts");
    const cartCollection = db.collection("carts");
    const newsArticlesCollection = db.collection("newsArticles");

    // ---------- USER ROUTES ----------
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

    app.get("/users", async (req, res) => {
      const users = await usersCollection.find().toArray();
      res.send(users);
    });

    app.get("/users/admin/:email", async (req, res) => {
      const email = req.params.email;
      const user = await usersCollection.findOne({ email });
      res.send({ admin: user?.role === "admin" });
    });

    // ---------- PRODUCT ROUTES ----------
    app.post("/add-products", async (req, res) => {
      const productData = req.body;
      const result = await productsCollection.insertOne(productData);
      res.send(result);
    });

    app.get("/products", async (req, res) => {
      const products = await productsCollection.find().toArray();
      res.send(products);
    });

    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      if (!ObjectId.isValid(id))
        return res.status(400).send({ error: "Invalid product ID" });

      const product = await productsCollection.findOne({
        _id: new ObjectId(id),
      });
      if (!product) return res.status(404).send({ error: "Product not found" });

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
      if (!ObjectId.isValid(id))
        return res.status(400).send({ error: "Invalid product ID" });

      try {
        const updateData = { ...req.body };
        delete updateData._id;

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

    // ---------- INQUIRY ROUTES ----------
    app.post("/inquiries", async (req, res) => {
      const data = req.body;
      const result = await inquiriesCollection.insertOne(data);
      res.send(result);
    });

    app.get("/inquiries", async (req, res) => {
      const data = await inquiriesCollection.find().toArray();
      res.send(data);
    });

    app.patch("/inquiries/:id", async (req, res) => {
      const id = req.params.id;
      const { status } = req.body;
      const allowed = ["Processing", "Shipped", "Delivered"];

      if (!ObjectId.isValid(id))
        return res.status(400).send({ error: "Invalid order ID" });
      if (!allowed.includes(status))
        return res.status(400).send({ error: "Invalid status value" });

      try {
        const result = await inquiriesCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { status } }
        );
        if (result.matchedCount === 0)
          return res.status(404).send({ error: "Order not found" });
        res.send({
          message: "Status updated",
          modifiedCount: result.modifiedCount,
        });
      } catch (error) {
        console.error("Update failed:", error);
        res.status(500).send({ error: "Internal Server Error" });
      }
    });

    // ---------- CONTACT ROUTES ----------
    app.post("/contact", async (req, res) => {
      const contactData = req.body;
      const result = await contactCollection.insertOne(contactData);
      res.send(result);
    });

    app.get("/contacts", async (req, res) => {
      const data = await contactCollection.find().toArray();
      res.send(data);
    });

    // news articles route
    // create news articles route
    app.post("/add-news", async (req, res) => {
      try {
        const newsData = req.body;
        const news = await newsArticlesCollection.insertOne(newsData);
        res.send(news);
      } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).send("Internal Server Error");
      }
    });
    // get all news articles
    app.get("/news", async (req, res) => {
      try {
        const news = await newsArticlesCollection.find().toArray();
        res.send(news);
      } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).send("Internal Server Error");
      }
    });
    // get single news article
    app.get("/news/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const news = await newsArticlesCollection.findOne({
          _id: new ObjectId(id),
        });
        res.send(news);
      } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).send("Internal Server Error");
      }
    });

    // delete news article
    app.delete("/news/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const result = await newsArticlesCollection.deleteOne({
          _id: new ObjectId(id),
        });
        res.send(result);
      } catch (error) {
        console.error("Error deleting news:", error);
        res.status(500).send("Internal Server Error");
      }
    });

    // update a single news article
    app.patch("/news/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const newsData = req.body;
        const result = await newsArticlesCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: newsData }
        );
        res.send(result);
      } catch (error) {
        console.error("Error updating news:", error);
        res.status(500).send("Internal Server Error");
      }
    });

    // ---------- CSV EXPORT ROUTE ----------
    app.get("/api/export-products", async (req, res) => {
      try {
        const products = await productsCollection.find({}).toArray();
        if (products.length === 0)
          return res.status(404).send("No products found");

        const flattened = products.map((product) => {
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
            spec_Model: specs.Model,
            spec_BatteryType: specs["Battery Type"],
            spec_Capacity: specs.Capacity,
            spec_Voltage: specs.Voltage,
            spec_LimitedVoltage: specs["Limited Voltage"],
            spec_ChargingTime: specs["Charging Time"],
            spec_StandbyTime: specs["Standby Time"],
            spec_CycleTime: specs["Cycle Time"],
            spec_Safety: specs.Safety,
            spec_Brand: specs.Brand,
          };
        });

        const parser = new Parser();
        const csv = parser.parse(flattened);
        res.header("Content-Type", "text/csv");
        res.attachment("products.csv");
        return res.send(csv);
      } catch (error) {
        console.error("CSV export failed:", error);
        res.status(500).send("Server error");
      }
    });

    // ---------- AI Blog Generation ----------

    app.get("/models", async (req, res) => {
      try {
        const models = await genAI.listModels();
        res.json(models);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.post("/generate", async (req, res) => {
      const { prompt } = req.body;

      if (!prompt) return res.status(400).json({ error: "Prompt lagbe" });

      try {
        const model = genAI.getChatModel({ model: "models/chat-bison-001" });

        const response = await model.chat.completions.create({
          messages: [{ role: "user", content: prompt }],
        });

        const article = response.choices[0].message.content;
        res.json({ article });
      } catch (error) {
        console.error("AI generation error:", error);
        res.status(500).json({ error: error.message });
      }
    });

    // ......ADD TO CART.....
    app.post("/cart", async (req, res) => {
      const items = req.body;
      const result = await cartCollection.insertOne(items);
      res.send(result);
    });

    app.get("/all-carts", async (req, res) => {
      const allItems = req.body;
      const result = await cartCollection.find().toArray();
      res.send(result);
    });

    app.get("/carts", async (req, res) => {
      const email = req.query.email;
      if (!email) {
        return res
          .status(400)
          .send({ message: "Email query parameter is required" });
      }

      try {
        const result = await cartCollection.find({ email }).toArray();
        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Failed to fetch cart items" });
      }
    });
  } catch (error) {
    console.error("Server startup failed:", error);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server listening on http://localhost:${port}`);
});
