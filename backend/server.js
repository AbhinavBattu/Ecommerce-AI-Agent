// import express from "express";
// import dotenv from "dotenv";
// import path from "path";
// //allows you to change colors of output to terminal
// import colors from "colors";
// import morgan from "morgan";
// import cors from 'cors';
// //routes
// import productRoutes from "./routes/productRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";
// import agentRoutes from "./routes/agentRoutes.js";
// import { processUserInput } from "./controllers/agent.js";
// import connectDB from "./config/db.js";

// //middleware
// import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// dotenv.config();
// connectDB();
// const app = express();
// app.use(cors());
// //only run morgan in development
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

// //this will allow us to accept json data in the body
// app.use(express.json());

// //anything that comes to the route will be linked to productRoutes
// app.post('/api/agent', async (req, res) => {
//   try {
//     // console.log("Hello");
//     const user_input = req.body.user_input;
//     console.log(req.body);
//     const result = await processUserInput(user_input);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// // app.use("/api/agent",agentRoutes);
// app.use("/api/products", productRoutes);

// //anything that comes to the route will be linked to userRoutes
// app.use("/api/users", userRoutes);

// //anything that comes to the route will be linked to orderRoutes
// app.use("/api/orders", orderRoutes);

// app.use("/api/upload", uploadRoutes);

// //special route to access the paypal client id
// app.get("/api/config/paypal", (req, res) =>
//   res.send(process.env.PAYPAL_CLIENT_ID)
// );

// //we need to make the uploads folder static so the files are accessible on deploy
// //use path module to point to current directory (__dirname is only available with common JS modules, not ES6)
// //we can mimic this syntax by using path.resolve()
// //it just takes us to the folder and makes it static
// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// const root = path.join(__dirname, "frontend", "build");
// //added /taylor-ecommerce/ because of the < bug
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(root));
//   app.get("*", (req, res) => res.sendFile("index.html", { root }));
// } else {
//   app.get("/", (req, res) => {
//     res.send("API IS RUNNING......");
//   });
// }

// //if the route was not found, respond with a 404 not found
// app.use(notFound);

// //overwriting the default error handler
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(
//   PORT,
//   console.log(
//     `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
//   )
// );

// import express from "express";
// import dotenv from "dotenv";
// import path from "path";
// //allows you to change colors of output to terminal
// import colors from "colors";
// import morgan from "morgan";
// import cors from 'cors';
// //routes
// import productRoutes from "./routes/productRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";
// import agentRoutes from "./routes/agentRoutes.js";
// import {handleAgentRequest} from "./controllers/agentController.js";
// import connectDB from "./config/db.js";

// //middleware
// import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// dotenv.config();
// connectDB();
// const app = express();
// app.use(cors());
// //only run morgan in development
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

// //this will allow us to accept json data in the body
// app.use(express.json());

// //anything that comes to the route will be linked to productRoutes
// app.post('/api/agent', async (req, res) => {
//   try {
//     // console.log("Hello");
//     const user_input = req.body.userInput;
//     // console.log(typeof user_input);
//     const req = {
//       body: {
//         input: user_input
//       }
//     };
//     console.log(req);
//     const result = await handleAgentRequest(req);
//     // console.log(result);
//     res.json(result);
//     // res.json({"name":"hello"});
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// // app.use("/api/agent",agentRoutes);
// app.use("/api/products", productRoutes);

// //anything that comes to the route will be linked to userRoutes
// app.use("/api/users", userRoutes);

// //anything that comes to the route will be linked to orderRoutes
// app.use("/api/orders", orderRoutes);

// app.use("/api/upload", uploadRoutes);

// //special route to access the paypal client id
// app.get("/api/config/paypal", (req, res) =>
//   res.send(process.env.PAYPAL_CLIENT_ID)
// );

// //we need to make the uploads folder static so the files are accessible on deploy
// //use path module to point to current directory (__dirname is only available with common JS modules, not ES6)
// //we can mimic this syntax by using path.resolve()
// //it just takes us to the folder and makes it static
// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// const root = path.join(__dirname, "frontend", "build");
// //added /taylor-ecommerce/ because of the < bug
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(root));
//   app.get("*", (req, res) => res.sendFile("index.html", { root }));
// } else {
//   app.get("/", (req, res) => {
//     res.send("API IS RUNNING......");
//   });
// }

// //if the route was not found, respond with a 404 not found
// app.use(notFound);

// //overwriting the default error handler
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(
//   PORT,
//   console.log(
//     `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
//   )
// );
import express from "express";
import dotenv from "dotenv";
import path from "path";
import colors from "colors";
import morgan from "morgan";
import cors from 'cors';
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import { handleAgentRequest } from "./controllers/agentController.js";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.post('/api/agent', handleAgentRequest); // No need to manually construct req/res

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const root = path.join(__dirname, "frontend", "build");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(root));
  app.get("*", (req, res) => res.sendFile("index.html", { root }));
} else {
  app.get("/", (req, res) => {
    res.send("API IS RUNNING......");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

