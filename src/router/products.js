const express = require("express");
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");
const { products, addProduct } = require("../content/staticProduct");

const router = express.Router();

router.get("/add-products", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

router.post("/products", (req, res, next) => {
  const body = req.body;
  console.log(body);
  addProduct(body);
  fs.appendFile("./src/content/message.txt", `${JSON.stringify(body)}\r\n`, (err) => {
    if (err !== null) {
      console.log("error is coming", err);
    }
  });
  res.status(302).redirect("/admin/products");
});

router.get("/products", (req, res, next) => {
  console.log("coming here");
  let html = "";
  fs.readFile("./src/content/message.txt", "utf-8", (err, data) => {
    if (err) {
      console.log("error  reading file: ", err);
    }
    console.log(data);
    html += data;
  });

  console.log("products added already is ", products);
  res.sendFile(path.join(rootDir, "views", "product-listing.html"));
});

module.exports = router;
