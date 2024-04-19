function routeAdd(ItemDesc, ItemPrice, StockQty, con) {
  const sql =
    "INSERT INTO Item (ItemDesc, ItemPrice, StockQty) VALUES (? , ?,?)";

  con.query(sql, [ItemDesc, StockQty, ItemPrice], (error, results) => {
    if (error) throw error;
    return;
  });
}

function routeDelete(ItemId, con) {
  const sqlDel = "DELETE FROM Item WHERE ItemId = ?";
  con.query(sqlDel, [ItemId], (error, results) => {
    if (error) {
      console.error("Error deleting record: " + error.message);
      return;
    }
  });
}

function routeUpdate(ItemId, ItemDesc, con) {
  var sqlUpt = "UPDATE Item SET ItemDesc = ? WHERE ItemId = ?";
  con.query(sqlUpt, [ItemDesc, ItemId], (err, result) => {
    if (err) throw err;
  });
}

module.exports = { routeAdd, routeDelete, routeUpdate };
