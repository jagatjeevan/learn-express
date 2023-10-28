const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const rootDir = require("./utils/path");
const productRoutes = require("./router/products");
const shopRoutes = require("./router/shop");

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.set("title", "My custom application");
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("in the middleware 1");
  next();
});

app.use("/admin", productRoutes);
app.use(shopRoutes);

// Handling 404 page
app.use("/", (req, res, next) => {
  console.log("this is my root directory", rootDir);
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

app.listen(2020, () => {
  console.log("server starting with http://localhost:2020");
});
