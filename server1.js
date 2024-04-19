var { add, deleteItem, updateItem } = require("./Data/ItemServices");

// Create
function item(app, con) {
  app.post("/Item/create", (req, res) => {
    //   const ItemDesc = req.params.ItemDesc;
    const data = req.body;
    const ItemDesc = data.ItemDesc;
    const StockQty = data.StockQty;
    const ItemPrice = data.ItemPrice;
    add(con, ItemDesc, ItemPrice, StockQty);
    res.send("Record created successfully");
  });

  //   //ShowAll
  //   app.get("/Item/showAll", (req, res) => {
  //     showAllItems(con, (err, result) => {
  //       if (err) throw err;
  //       res.json(result);
  //     });
  //   });

  //   // Delete

  app.get("/Item/delete/:ItemId", (req, res) => {
    const ItemId = req.params.ItemId;
    deleteItem(ItemId, con);
    res.send("Record deleted successfully");
  });

  //   //Update

  app.get("/Item/update/:ItemId/:ItemDesc", (req, res) => {
    const { ItemId, ItemDesc } = req.params;
    updateItem(ItemId, ItemDesc, con);
    res.send(`Updated record with ID: ${ItemId}`);
    console.log("1 record updated.");
  });
}

module.exports = { item };
