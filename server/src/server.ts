import express from "express";
import routes from "./routes/index.js";
import cors from "cors";
import sequelize from "./config/connection.js";
// import path from "path";
// import { fileURLToPath } from "url";
// import app from "./app.js";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;
const forceDatabaseRefresh = false;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true, 
}));

// Serves static files in the entire client's dist folder
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("../client/dist"));

app.use(routes);

console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});

// app.get('/', (_req, res) => {
//   res.sendFile('welcome to the p');
// });
