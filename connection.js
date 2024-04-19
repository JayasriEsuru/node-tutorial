const express = require("express");
const app = express();
const { list } = require("./server2");
const { item } = require("./Item/itemController");
var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
  port: 3306,
});
const PORT = 3000;

con.connect(function (err) {
  if (err) err;
  console.log("connection Successful");
});
app.use(express.json());

list(app, con);
item(app, con);

app.listen(3000, () => {
  console.log(`Node api is running on port ${PORT}`);
});
