function repoAdd(NameofList, Branch, con) {
  const qry = "INSERT INTO List(NameofList, Branch) VALUES (?, ?)";
  con.query(qry, [NameofList, Branch], (err, result) => {
    if (err) {
      console.error("Error inserting record:", err);
      return res.status(500).send("Error inserting record");
    }
    console.log("1 record inserted");
  });
}

function repoDelete(ListId, con) {
  const sqlDel = "DELETE FROM List WHERE ListId = ?";
  con.query(sqlDel, [ListId], (error, results) => {
    if (error) {
      console.error("Error deleting record: " + error.message);
      return;
    }
  });
}

function repoUpdate(ListId, Branch, con) {
  var sqlUpt = "UPDATE List SET Branch = ? WHERE ListId = ?";
  con.query(sqlUpt, [Branch, ListId], (err, result) => {
    if (err) throw err;
    console.log("1 record updated.");
  });
}

module.exports = { repoAdd, repoDelete, repoUpdate };
