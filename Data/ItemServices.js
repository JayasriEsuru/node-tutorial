function add(con, ItemDesc, ItemPrice, StockQty) {
  const sql =
    "INSERT INTO Item (ItemDesc, ItemPrice, StockQty) VALUES (? , ?,?)";

  con.query(sql, [ItemDesc, StockQty, ItemPrice], (error, results) => {
    if (error) throw error;
    return;
  });
}

// function showAllItems(con) {
//   var sql = "SELECT * FROM Item";
//   con.query(sql, (err, result) => {
//     if (err) throw err;
//     return;
//   });
// }

function deleteItem(ItemId, con) {
  const sqlDel = "DELETE FROM Item WHERE ItemId = ?";
  con.query(sqlDel, [ItemId], (error, results) => {
    if (error) {
      console.error("Error deleting record: " + error.message);
      return;
    }
  });
}

function updateItem(ItemId, ItemDesc, con) {
  var sqlUpt = "UPDATE Item SET ItemDesc = ? WHERE ItemId = ?";
  con.query(sqlUpt, [ItemDesc, ItemId], (err, result) => {
    if (err) throw err;
  });
}

module.exports = { add, deleteItem, updateItem };
