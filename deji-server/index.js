const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const port = process.env.PORT || 5000;


// midleWare
app.use(
  cors({
    origin: [
      "http://localhost:5173",
     
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    credentials: true,
  })
);

app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.u2fu7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const uri = `mongodb+srv://dejiBattery:${process.env.DB_PASSWORD}@cluster0.rjxogi9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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
    const usersCollection = client.db("DejiBattery").collection("users");
   
  
  

    // users post collection api
    app.post("/users", async (req, res) => {
      const userData = req.body;
    
      const query = { email: userData.email };
      const exitingUser = await usersCollection.findOne(query);
      if (exitingUser) {
        return res.send({ message: "user already exits", instertedId: null });
      }
      const result = await usersCollection.insertOne(userData);
      
      res.send(result);
    });

    // user get collection api
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
   
      res.send(result);
    });


    app.get("/users-Admin",  async (req, res) => {
      const result = await usersCollection.find().toArray();
      // console.log(result);
      res.send(result);
    });

    // verify admin cheack
    app.get("/users/admin/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      res.send({ admin: user?.role === "admin" });
    });
   
    
  } finally {
   
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Loading..........");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
