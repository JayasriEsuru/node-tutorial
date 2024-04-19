const { routeAdd, routeDelete, routeUpdate } = require("./itemRepository");

function add(con, ItemDesc, ItemPrice, StockQty) {
  routeAdd(ItemDesc, ItemPrice, StockQty, con);
}

// function showAllItems(con) {
//   var sql = "SELECT * FROM Item";
//   con.query(sql, (err, result) => {
//     if (err) throw err;
//     return;
//   });
// }

function deleteItem(ItemId, con) {
  routeDelete(ItemId, con);
}

function updateItem(ItemId, ItemDesc, con) {
  routeUpdate(ItemId, ItemDesc, con);
}

module.exports = { add, deleteItem, updateItem };
