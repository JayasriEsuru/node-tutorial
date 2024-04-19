const path = require("path");

const express = require("express");
const app = express();
app.use(express.json());

var mysql = require("mysql");

// const fs = require("fs");
// database connection

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

con.connect(function (err) {
  if (err) err;
  console.log("connection Successful");
});

// function getTableName(callback) {
//   fs.readFile("tablename.cfg", "utf8", (err, data) => {
//     if (err) throw err;
//     callback(data.trim()); // Trim to remove any whitespace
//   });
// }

// function getColumnNames(callback) {
//   fs.readFile("columnNames.cfg", "utf8", (err, data) => {
//     if (err) throw err;
//     callback(data.trim().split("\n")); // Split by newline to get an array of column names
//   });
// }

// var sql =
//   "CREATE TABLE Item (ItemId CHAR(255) Primary Key, ItemDesc VARCHAR(255) not null, ItemPrice Real not null, StockQty int Default 1)";
// con.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("Table created");
// });

// var sql =
//   "INSERT INTO Item (ItemId, ItemDesc, ItemPrice, StockQty) VALUES ('1', 'Pepsi', '25', '5'), ('2', 'Fanta', '25', '4')";
// con.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("1 record inserted");
// });

app.listen(3000, () => {
  console.log(`Node api is running on port 3000`);
});

// app.get("/", (req, res) => {
//   res.send("hello");
// });/

// Create

app.post("/create", (req, res) => {
  //   const ItemDesc = req.params.ItemDesc;
  const data = req.body;
  const ItemDesc = data.ItemDesc;
  const StockQty = data.StockQty;
  const ItemPrice = data.ItemPrice;

  const sql =
    "INSERT INTO Item (ItemDesc, ItemPrice, StockQty) VALUES (? , ?,?)";

  con.query(sql, [ItemDesc, StockQty, ItemPrice], (error, results) => {
    if (error) throw error;
    res.send("Record created successfully");
  });
});

if (!ItemDesc) {
  console.log("Description not defined , please provide all the fields");
  return res.send({ alertMessage: "Please provide ItemDesc" });
}
// checking for duplication of description
const checkQuery = "SELECT * FROM Item WHERE ItemDesc = ?";
con.query(checkQuery, [ItemDesc], (checkErr, checkResult) => {
  if (checkErr) {
    console.log("Error checking for existing description:", checkErr);
    return res.send("Error checking for existing description");
  }

  if (checkResult.length > 0) {
    console.log("Description already exists.");
    return res.send({ alertMessage: "Description already exists." });
  }
});

//ShowAll

// app.get("/:tableName/showAll", (req, res) => {
//   console.log(req.body);
//   var sql = "SELECT * FROM Item";
//   con.query(sql, (err, result) => {
//     if (err) throw err;
//     res.json(result);
//   });
// });

app.get("/showAll/:ItemId", (req, res) => {
  const ItemId = req.params.ItemId;
  var sql = "SELECT * FROM Item WHERE ItemId = ?";
  con.query(sql, [ItemId], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Delete

app.get("/delete/:ItemId", (req, res) => {
  const ItemId = req.params.ItemId;

  const sqlDel = "DELETE FROM Item WHERE ItemId = ?";

  con.query(sqlDel, [ItemId], (error, results) => {
    if (error) {
      console.error("Error deleting record: " + error.message);
      res.status(500).send("Error deleting record");
      return;
    }
    res.send("Record deleted successfully");
  });
});

// app.get("/:tableName/delete/:ItemId", (req, res) => {
//   const ItemId = req.params.ItemId;
//   const requestedTableName = req.params.tableName;

//   getTableName((tableName) => {
//     if (requestedTableName !== tableName) {
//       res.send("Table Name Doesnot Match");
//     }

//     const sqlDel = `DELETE FROM ${tableName} WHERE ItemId = ?`;

//     con.query(sqlDel, [ItemId], (error, results) => {
//       if (error) {
//         console.error("Error deleting record: " + error.message);
//         res.status(500).send("Error deleting record");
//         return;
//       }
//       res.send("Record deleted successfully");
//     });
//   });

//   // res.sendFile(path.join(__dirname, "index.html"));
// });

// update

app.get("/update/:ItemId/:ItemDesc", (req, res) => {
  const { ItemId, ItemDesc } = req.params;
  var sqlUpt = "UPDATE Item SET ItemDesc = ? WHERE ItemId = ?";
  con.query(sqlUpt, [ItemDesc, ItemId], (err, result) => {
    if (err) throw err;
    res.send(`Updated record with ID: ${ItemId}`);
    console.log("1 record updated.");
  });
});

// app.post("/create/:tableName", (req, res) => {
//   const requestedTableName = req.params.tableName;
//   getTableName((tableName) => {
//     if (requestedTableName !== tableName) {
//       res
//         .status(400)
//         .send(
//           `Requested table '${requestedTableName}' does not match configured table '${tableName}'.`
//         );
//       return;
//     }

//     const data = req.body;

//     getTableName((tableName) => {
//       getColumnNames((columnNames) => {
//         const values = columnNames.map((column) => {
//           if (data.hasOwnProperty(column) && data[column] !== null) {
//             return data[column];
//           } else {
//             return "";
//           }
//         });

//         const sql = `INSERT INTO ${tableName} (${columnNames.join(
//           ", "
//         )}) VALUES (${Array(columnNames.length).fill("?").join(", ")})`;

//         con.query(sql, values, (err, result) => {
//           if (err) {
//             console.error("Error inserting record:", err);
//             res.status(500).send("Error inserting record");
//             return;
//           }
//           res.send("Record inserted successfully.");
//           console.log("1 row inserted.");
//         });
//       });
//     });
//   });
// });

// var sql =
// "INSERT INTO Item ( ItemDesc, ItemPrice, StockQty) VALUES ( ?, '25', '5')";
// con.query(sql, [ItemDesc], function (err, result) {
// if (err) throw err;
// console.log("1 record inserted");
// });
// res.send("success");
