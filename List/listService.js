const { routeAdd, routeDelete, routeUpdate } = require("./listRepository");

function add(NameofList, Branch, con) {
  repoAdd(NameofList, Branch, con);
}

// function showAllItems(con) {
//   var sql = "SELECT * FROM Item";
//   con.query(sql, (err, result) => {
//     if (err) throw err;
//     return;
//   });
// }

function deleteList(ListId, con) {
  routeDelete(ListId, con);
}

function updateList(Branch, con) {
  routeUpdate(Branch, con);
}

module.exports = { add, deleteList, updateList };
