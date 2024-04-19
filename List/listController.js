const { add, deleteItem, updateItem } = require("./listService");

// class ListType {
//   nameOfList: string;
//   branch: string;

// +++}

function list(app, con) {
  app.post("/list/create", (req, res) => {
    const data = req.body;
    // const data: ListType = req.body;
    const NameofList = data.NameofList;
    const Branch = data.Branch;
    add(NameofList, Branch, con);
    res.send({ message: "Record inserted successfully" });
  });

  app.get("/list/delete/:ListId", (req, res) => {
    const ListId = req.params.ListId;
    deleteItem(ListId, con);
    res.send("Record deleted successfully");

    // res.sendFile(path.join(__dirname, "index.html"));
  });

  app.get("/list/update/:ListId/:Branch", (req, res) => {
    const { ListId, Branch } = req.params;
    updateItem(ListId, Branch, con);
    res.send(`Updated record with ID: ${ListId}`);
  });

  // app.get("/list/showAll", (req, res) => {
  //   var sql = "SELECT * FROM List";
  //   con.query(sql, (err, result) => {
  //     if (err) throw err;
  //     res.json(result);
  //   });
  // });
}

module.exports = { list };

// 1. typescript project
// 2. convert all controller points to post
// 3.
